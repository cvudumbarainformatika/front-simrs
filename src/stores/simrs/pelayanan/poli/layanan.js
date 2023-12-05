import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
import { usePengunjungPoliStore } from './pengunjung'
import { useInacbgPoli } from './inacbg'
import { notifErrVue, notifSuccess } from 'src/modules/utils'
// import { api } from 'src/boot/axios'

export const useLayananPoli = defineStore('layanan-poli', {
  state: () => ({
    tab: 'Diagnosa Medik',
    tabs: ['Diagnosa Medik', 'Tindakan Medik', 'Prosedur (Icd 9)', 'Diagnosa Keperawatan'],
    // diagnosa
    searchdiagnosa: '',
    listDiagnosa: [],
    listTindakan: [],
    loadingFormDiagnosa: false,
    formdiagnosa: {
      kddiagnosa: '',
      diagnosa: '',
      keterangan: '',
      kasus: '',
      tipediagnosa: '',
      dtd: ''
    },
    // tindakan
    searchtindakan: '',
    notaTindakans: [],
    notaTindakan: 'BARU',
    formtindakan: {
      kdtindakan: '',
      tindakan: '',
      biaya: 0,
      hargasarana: 0,
      tarif: 0,
      hargapelayanan: 0,
      jmltindakan: 1,
      subtotal: 0,
      // pelaksana: '',
      keterangan: ''
    },
    loadingFormTindakan: false,
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

    async getDiagnosaDropdown() {
      const resp = await api.get('v1/simrs/pelayanan/listdiagnosa')
      if (resp.status === 200) {
        this.listDiagnosa = resp.data
      }
    },
    async getTindakanDropdown() {
      const resp = await api.get('v1/simrs/pelayanan/dialogtindakanpoli')
      // console.log('list tindakan', resp)
      if (resp.status === 200) {
        this.listTindakan = resp.data
      }
    },

    //= ===
    async cariIcd9(val) {
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
    setFormTindakan(key, val) {
      this.formtindakan[key] = val
    },
    //= ===
    setKode(val) {
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

    setFormDianosa(key, val) {
      this.formdiagnosa[key] = val
    },

    setKdTindakan(val) {
      this.formtindakan.kdtindakan = val
      const ada = this.listTindakan.length > 0
      if (ada) {
        const target = this.listTindakan.filter(x => x.kdtindakan === val)
        target.length
          ? this.formtindakan.tindakan = target[0].tindakan
          : this.formtindakan.tindakan = ''
        target.length
          ? this.formtindakan.tarif = target[0].tarif
          : this.formtindakan.tarif = 0
        target.length
          ? this.formtindakan.hargasarana = target[0].sarana
          : this.formtindakan.sarana = 0
        target.length
          ? this.formtindakan.hargapelayanan = target[0].pelayanan
          : this.formtindakan.pelayanan = 0
        target.length
          ? this.formtindakan.biaya = (parseInt(target[0].pelayanan) + parseInt(target[0].sarana))
          : this.formtindakan.biaya = 0
        target.length
          ? this.formtindakan.subtotal = parseInt(this.formtindakan.biaya) * this.formtindakan.jumlah
          : this.formtindakan.subtotal = 0
      }

      console.log('setKdTindakana', this.formtindakan)
      return new Promise((resolve, reject) => {
        resolve()
      })
    },

    async simpanDiagnosa(pasien) {
      if (!pasien?.kodedokter) {
        return notifErrVue('kode Dokter masih kosong, silahkan tutup dulu pasien ini kemudian tekan tombol refresh di pojok kanan atas')
      }
      const form = this.formdiagnosa
      form.noreg = pasien?.noreg
      form.norm = pasien?.norm
      form.kodedokter = pasien?.kodedokter
      form.ruangan = pasien?.kodepoli
      console.log('sdiag', form)

      this.loadingFormDiagnosa = true
      try {
        const resp = await api.post('v1/simrs/pelayanan/simpandiagnosa', form)
        console.log(resp)
        if (resp.status === 200) {
          console.log('simpan diagnosa', resp)
          const storePasien = usePengunjungPoliStore()
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
          storePasien.injectDataPasien(pasien, isi, 'diagnosa')
          notifSuccess(resp)
          this.loadingFormDiagnosa = false
          this.initReset()

          if (resp.data.inacbg?.metadata?.code === 200) {
            const storeIna = useInacbgPoli()
            storeIna.setIna(resp.data.inacbg?.response)
            storeIna.setSpecialOption(resp.data.inacbg)
          }

          return new Promise((resolve, reject) => {
            resolve()
          })
        }
        this.loadingFormDiagnosa = false
      } catch (error) {
        console.log(error)
        this.loadingFormDiagnosa = false
      }
    },

    async deleteDiagnosa(pasien, id) {
      const payload = { id }
      const resp = await api.post('v1/simrs/pelayanan/hapusdiagnosa', payload)
      if (resp.status === 200) {
        const storePasien = usePengunjungPoliStore()
        const storeIna = useInacbgPoli()
        storePasien.hapusDataDiagnosa(pasien, id)
        storeIna.getDataIna(pasien)
        notifSuccess(resp)
      }
    },

    editFormDiagnosa(val) {
      this.formdiagnosa = {
        id: val.id,
        kddiagnosa: val.rs3,
        diagnosa: val.masterdiagnosa?.rs4,
        keterangan: val.rs6,
        dtd: val.rs9,
        kasus: val.rs7,
        tipediagnosa: val.rs4
      }
      console.log('form', this.form)
      console.log('xxx', val)
    },

    // ==================================================================================== TINDAKAN =========================================================================

    async saveTindakan(pasien) {
      if (!pasien?.kodedokter) {
        return notifErrVue('kode Dokter masih kosong, silahkan tutup dulu pasien ini kemudian tekan tombol refresh di pojok kanan atas')
      }
      this.loadingFormTindakan = true

      const form = this.formtindakan
      form.noreg = pasien.noreg
      form.norm = pasien.norm
      form.kdpoli = pasien?.kodepoli
      form.kodedokter = pasien?.kodedokter
      form.kdsistembayar = pasien?.kodesistembayar
      form.nota = this.notaTindakan === 'BARU' || this.notaTindakan === '' ? '' : this.notaTindakan //
      try {
        const resp = await api.post('v1/simrs/pelayanan/simpantindakanpoli', form)
        console.log('simpan tindakan', resp)
        if (resp.status === 200) {
          const storePasien = usePengunjungPoliStore()
          const isi = resp?.data?.result
          isi.mastertindakan = { rs2: form.tindakan }
          storePasien.injectDataPasien(pasien, isi, 'tindakan')
          this.setNotas(resp?.data?.nota)
          notifSuccess(resp)
          this.loadingFormTindakan = false
          this.initReset('Tindakan Medik')
        }
        this.loadingFormTindakan = false
      } catch (error) {
        this.loadingFormTindakan = false
      }
    },

    async getNota(pasien) {
      const params = {
        params: {
          noreg: pasien?.noreg
        }
      }

      const resp = await api.get('v1/simrs/pelayanan/notatindakan', params)
      console.log('notas', resp)
      if (resp.status === 200) {
        const arr = resp.data.map(x => x.nota)
        this.notaTindakans = arr.length ? arr : []
        this.notaTindakans.push('BARU')
        this.notaTindakan = this.notaTindakans[0]
      }
    },

    async hapusTindakan(pasien, id) {
      const payload = { id, noreg: pasien?.noreg }

      try {
        const resp = await api.post('v1/simrs/pelayanan/hapustindakanpoli', payload)
        console.log(resp)
        if (resp.status === 200) {
          const storePasien = usePengunjungPoliStore()
          storePasien.hapusDataTindakan(pasien, id)
          this.setNotas(resp?.data?.nota)
          notifSuccess(resp)
        }
      } catch (error) {
        console.log('hapus tindakan poli', error)
      }
    },

    setNotas(array) {
      const arr = array.map(x => x.nota)
      this.notaTindakans = arr.length ? arr : []
      this.notaTindakans.push('BARU')
      this.notaTindakan = this.notaTindakans[0]
    },

    initReset(x) {
      const tabbed = x ?? 'Diagnosa Medik'
      return new Promise((resolve, reject) => {
        this.tab = tabbed
        this.tabs = ['Diagnosa Medik', 'Tindakan Medik', 'Prosedur (Icd 9)', 'Diagnosa Keperawatan']

        this.searchdiagnosa = ''
        this.formdiagnosa = {
          kddiagnosa: '',
          diagnosa: '',
          keterangan: '',
          // kasus: '',
          tipediagnosa: '',
          dtd: ''
        }
        // tindakan
        this.searchtindakan = ''
        this.formtindakan = {
          kdtindakan: '',
          tindakan: '',
          biaya: 0,
          hargasarana: 0,
          tarif: 0,
          hargapelayanan: 0,
          jmltindakan: 1,
          subtotal: 0,
          // pelaksana: '',
          keterangan: ''
        }
        // icd
        this.formicd = {
          kdprocedure: ''
        }

        resolve()
      })
    },
    // =====
    setFormIcd(key, val) {
      this.formicd[key] = val
    },
    saveIcd(pasien) {
      this.loadingSaveIcd = true
      this.setFormIcd('noreg', pasien?.noreg)
      console.log('form icd', this.formicd)
      return new Promise(resolve => {
        api.post('v1/simrs/pelayanan/simpanprocedure', this.formicd)
          .then(resp => {
            this.loadingSaveIcd = false
            if (resp.status === 200) {
              const storePasien = usePengunjungPoliStore()
              const isi = resp?.data?.result
              storePasien.injectDataPasien(pasien, isi, 'prosedur')
              const storeIna = useInacbgPoli()
              storeIna.getDataIna(pasien)
              this.initReset('Prosedur (Icd 9)')
            }
            resolve(resp)
          })
          .catch(() => {
            this.loadingSaveIcd = false
          })
      })
    },
    hapusProsedur(pasien, id) {
      this.loadingSaveIcd = true
      const payload = { id, noreg: pasien?.noreg }
      return new Promise(resolve => {
        api.post('v1/simrs/pelayanan/hapusprocedure', payload)
          .then(resp => {
            this.loadingSaveIcd = false
            const storePasien = usePengunjungPoliStore()
            storePasien.hapusDataProsedur(pasien, id)
            const storeIna = useInacbgPoli()
            storeIna.getDataIna(pasien)
            notifSuccess(resp)
            resolve(resp)
          })
          .catch(() => {
            this.loadingSaveIcd = false
          })
      })
    }

  }
})
