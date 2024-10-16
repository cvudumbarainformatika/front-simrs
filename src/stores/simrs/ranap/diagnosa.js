import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
// import { useInacbgPoli } from './inacbg'
import { notifErrVue, notifSuccess } from 'src/modules/utils'
// import { useAplikasiStore } from 'src/stores/app/aplikasi'
import { usePengunjungRanapStore } from 'src/stores/simrs/ranap/pengunjung'
// import { api } from 'src/boot/axios'

export const useDiagnosaStore = defineStore('diagnosa-store', {
  state: () => ({

    // diagnosa
    items: {
      ranap: [],
      igd: []
    },

    searchdiagnosa: '',
    listDiagnosa: [],
    // listTindakan: [],
    loadingFormDiagnosa: false,
    formdiagnosa: {
      kddiagnosa: '',
      diagnosa: '',
      keterangan: '',
      kasus: 'Baru',
      tipediagnosa: '',
      dtd: ''
    },
    // tindakan
    // searchtindakan: '',
    // notaTindakans: [],
    // notaTindakan: 'BARU',
    // formtindakan: {
    //   kdtindakan: '',
    //   tindakan: '',
    //   biaya: 0,
    //   hargasarana: 0,
    //   tarif: 0,
    //   hargapelayanan: 0,
    //   jmltindakan: 1,
    //   subtotal: 0,
    //   // pelaksana: '',
    //   keterangan: ''
    // },
    // loadingFormTindakan: false,
    //= === Prosedur (icd 9) ===
    optionsIcd9: [],
    loadingIcd: false,
    loadingSaveIcd: false,
    formicd: {
      kdprocedure: ''
    }

  }),
  // getters: {
  //   doubleCount: (state) => state.counter * 2
  // },
  actions: {

    async getDiagnosaDropdown () {
      const resp = await api.get('v1/simrs/pelayanan/listdiagnosa')
      console.log('list diagnosa', resp)

      if (resp.status === 200) {
        this.listDiagnosa = resp.data
      }
    },

    async getData (pasien) {
      const params = {
        params: {
          noreg: pasien?.noreg
        }
      }
      const resp = await api.get('v1/simrs/ranap/layanan/diagnosa/getDiagnosaByNoreg', params)
      // console.log('resp', resp)
      if (resp.status === 200) {
        this.items = resp.data
        this.PISAH_DATA_RANAP_IGD(resp.data, pasien)
      }
    },

    //= ===
    async cariIcd9 (val) {
      if (val.length < 3) {
        return
      }
      this.loadingIcd = true
      const params = {
        params: {
          q: val
        }
      }
      await api.get('v1/simrs/ranap/ruangan/mastericd9', params)
        .then(response => {
          this.loadingIcd = false
          if (response?.data.length) {
            this.optionsIcd9 = response?.data
            return Promise.resolve(response)
          }
        })
        .catch(() => {
          this.loadingIcd = false
        })
    },
    setFormTindakan (key, val) {
      this.formtindakan[key] = val
    },
    //= ===
    setKode (val) {
      this.formdiagnosa.kddiagnosa = val
      const ada = this.listDiagnosa.length > 0
      if (ada) {
        const target = this.listDiagnosa.filter(x => x.kode === val)
        target.length
          ? this.formdiagnosa.diagnosa = target[0].keterangan
          : this.formdiagnosa.diagnosa = ''
        target.length
          ? this.formdiagnosa.dtd = target[0].dtd ? target[0].dtd : ''
          : this.formdiagnosa.dtd = ''
      }
    },

    setFormDianosa (key, val) {
      this.formdiagnosa[key] = val
    },

    async simpanDiagnosa (pasien) {
      if (pasien?.kddokter === null || pasien?.kddokter === '') {
        return notifErrVue('kode Dokter masih kosong, silahkan tutup dulu pasien ini kemudian tekan tombol refresh di pojok kanan atas')
      }
      const form = this.formdiagnosa
      form.noreg = pasien?.noreg
      form.norm = pasien?.norm
      form.kodedokter = pasien?.kodedokter ?? pasien?.kddokter ?? null
      form.ruangan = pasien?.kodepoli

      // console.log('sdiag', form)

      this.loadingFormDiagnosa = true
      try {
        const resp = await api.post('v1/simrs/ranap/layanan/diagnosa/simpandiagnosa', form)
        // console.log(resp)
        if (resp.status === 200) {
          // console.log('simpan diagnosa', resp)
          const storePasien = usePengunjungRanapStore()
          let isi = resp.data.result
          if (resp.data.result === 1) {
            form.rs3 = form.kddiagnosa
            form.rs4 = form.tipediagnosa
            form.rs6 = form.keterangan
            form.rs7 = form.kasus
            form.rs9 = form.dtd
            form.masterdiagnosa = { rs4: form.diagnosa }
            isi = form
          }
          isi.masterdiagnosa = { rs4: form.diagnosa }
          storePasien.injectDataPasien(pasien?.noreg, isi, 'diagnosamedis')
          notifSuccess(resp)
          this.loadingFormDiagnosa = false
          this.initReset()

          if (resp.data.inacbg?.metadata?.code === 200) {
            // const storeIna = useInacbgPoli()
            // storeIna.setIna(resp.data.inacbg?.response)
            // storeIna.setSpecialOption(resp.data.inacbg)
          }

          return new Promise((resolve, reject) => {
            resolve()
          })
        }
        this.loadingFormDiagnosa = false
      }
      catch (error) {
        // console.log(error)
        this.loadingFormDiagnosa = false
      }
    },

    PISAH_DATA_RANAP_IGD (arr, pasien) {
      // const auth = useAplikasiStore()

      const igd = arr?.filter(x => x?.rs13 === 'POL014') ?? []
      const ranap = arr?.filter(x => x?.rs13 !== 'POL014') ?? []
      // const isianKeperawatan = arr?.filter(x => x?.kdruang !== 'POL014' && x?.nakes === '2') ?? []

      this.items.igd = igd
      this.items.ranap = ranap

      // console.log('items', this.items, ranap)

      const pengunjung = usePengunjungRanapStore()
      ranap?.forEach(x => {
        pengunjung.injectDataPasien(pasien?.noreg, x, 'diagnosamedis')
      })

      this.initReset(pasien)
      // console.log('pasien stelah di inject', pasien)
    },

    SPLICE_ITEMS_RANAP (arr) {
      const idx = arr?.findIndex(x => x.id === null)
      this.items.ranap = arr.splice(1, idx)
    },

    async deleteDiagnosa (pasien, id) {
      const payload = { id }
      const resp = await api.post('v1/simrs/ranap/layanan/diagnosa/hapusdiagnosa', payload)
      if (resp.status === 200) {
        const storePasien = usePengunjungRanapStore()
        // const storeIna = useInacbgPoli()
        storePasien.hapusDataInjectan(pasien, id, 'diagnosamedis')
        // storeIna.getDataIna(pasien)
        notifSuccess(resp)
      }
    },

    editFormDiagnosa (val) {
      this.formdiagnosa = {
        id: val.id,
        kddiagnosa: val.rs3,
        diagnosa: val.masterdiagnosa?.rs4,
        keterangan: val.rs6,
        dtd: val.rs9,
        kasus: val.rs7,
        tipediagnosa: val.rs4
      }
      // console.log('form', this.form)
      // console.log('xxx', val)
    },

    // ==================================================================================== TINDAKAN =========================================================================

    initReset (pasien) {
      return new Promise((resolve, reject) => {
        this.searchdiagnosa = ''
        this.formdiagnosa = {
          kddiagnosa: '',
          diagnosa: '',
          keterangan: '',
          kasus: 'Baru',
          tipediagnosa: pasien?.diagnosamedis?.length ? 'Sekunder' : 'Primer',
          dtd: ''
        }

        resolve()
      })
    },
    // =====
    setFormIcd (key, val) {
      this.formicd[key] = val
    }

  }
})
