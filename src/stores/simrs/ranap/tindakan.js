import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
// import { useInacbgPoli } from './inacbg'
import { notifErrVue, notifSuccess } from 'src/modules/utils'
// import { useAplikasiStore } from 'src/stores/app/aplikasi'
import { usePengunjungRanapStore } from 'src/stores/simrs/ranap/pengunjung'
import { useInacbgPoli } from '../pelayanan/poli/inacbg'
// import { api } from 'src/boot/axios'

export const useTindakanRanapStore = defineStore('tindakan-ranap-store', {
  state: () => ({

    // diagnosa
    // items: {
    //   ranap: [],
    //   igd: []
    // },

    // searchdiagnosa: '',
    // listDiagnosa: [],
    // loadingFormDiagnosa: false,
    // formdiagnosa: {
    //   kddiagnosa: '',
    //   diagnosa: '',
    //   keterangan: '',
    //   kasus: '',
    //   tipediagnosa: '',
    //   dtd: ''
    // },

    // tindakan
    listTindakan: [],
    listPetugas: [],
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
      pelaksanaSatu: [],
      pelaksanaDua: [],
      keterangan: ''
    },
    loadingFormTindakan: false,
    //= === Prosedur (icd 9) ===
    optionsIcd9: [],
    loadingIcd: false,
    loadingSaveIcd: false,
    formicd: {
      kdprocedure: ''
    },

    stringOptions: [
      'Google', 'Facebook', 'Twitter', 'Apple', 'Oracle', 'Fafashion'
    ]

  }),
  // getters: {
  //   doubleCount: (state) => state.counter * 2
  // },
  actions: {

    async getTindakanDropdown () {
      const resp = await api.get('v1/simrs/pelayanan/dialogtindakanpoli')
      // console.log('list tindakan', resp)
      if (resp.status === 200) {
        this.listTindakan = resp.data
      }
    },
    async getAllPetugas () {
      const resp = await api.get('v1/simrs/ranap/ruangan/allNakes')
      // console.log('list pegawai', resp)
      if (resp.status === 200) {
        this.listPetugas = resp.data
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

    setKdTindakan (val) {
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

      // console.log('setKdTindakana', this.formtindakan)
      return new Promise((resolve, reject) => {
        resolve()
      })
    },

    // ==================================================================================== TINDAKAN =========================================================================

    async getTindakan (pasien) {
      try {
        const resp = await api.get('v1/simrs/ranap/layanan/tindakan/listtindakanranap', { params: { noreg: pasien?.noreg } })
        // console.log('tindakan', resp)
        if (resp.status === 200) {
          const storePasien = usePengunjungRanapStore()

          for (let i = 0; i < resp.data.length; i++) {
            const isi = resp.data[i]
            storePasien.injectDataPasien(pasien?.noreg, isi, 'tindakan')
          }
        }
      }
      catch (error) {
        console.log('err tindakan', error)
      }
    },
    async saveTindakan (pasien) {
      if (!pasien?.kddokter) {
        return notifErrVue('kode Dokter masih kosong, silahkan tutup dulu pasien ini kemudian tekan tombol refresh di pojok kanan atas')
      }

      const pelaksanaSatu = this.formtindakan?.pelaksanaSatu?.length ? this.formtindakan?.pelaksanaSatu?.join(';') : '' // this.formtindakan.pelaksanaSatu
      const pelaksanaDua = this.formtindakan?.pelaksanaDua?.length ? this.formtindakan?.pelaksanaDua?.join(';') : '' // this.formtindakan.pelaksanaSatu

      this.loadingFormTindakan = true

      const form = this.formtindakan
      form.noreg = pasien.noreg
      form.norm = pasien.norm
      form.kdpoli = pasien?.kodepoli
      form.kodedokter = pasien?.kddokter
      form.kdsistembayar = pasien?.kodesistembayar
      form.pelaksanaSatu = pelaksanaSatu
      form.pelaksanaDua = pelaksanaDua
      form.kddpjp = pasien?.kddokter
      form.nota = (this.notaTindakan === 'BARU' || this.notaTindakan === '' ||
        this.notaTindakan === 'SEMUA' || this.notaTindakan === null
      )
        ? ''
        : this.notaTindakan //

      return new Promise((resolve, reject) => {
        api.post('v1/simrs/ranap/layanan/tindakan/simpantindakanranap', form)
          .then((resp) => {
            if (resp.status === 200) {
              this.setNotas(resp?.data?.nota)
              const storePasien = usePengunjungRanapStore()
              const isi = resp?.data?.result
              isi.mastertindakan = { rs2: form.tindakan }
              storePasien.injectDataPasien(pasien?.noreg, isi, 'tindakan')
              this.loadingFormTindakan = false
              notifSuccess(resp)
            }
            else {
              this.loadingFormTindakan = false
            }
            resolve(resp)
          })
          .catch((err) => {
            this.loadingFormTindakan = false
            reject(err)
          })
      })
    },

    setNotas (array) {
      const arr = array.map(x => x.nota)
      this.notaTindakans = arr.length ? arr : []
      this.notaTindakans.unshift('SEMUA')
      this.notaTindakans.push('BARU')
      this.notaTindakan = this.notaTindakans[0]
    },

    async getNota (pasien) {
      const params = {
        params: {
          noreg: pasien?.noreg
        }
      }

      const resp = await api.get('v1/simrs/pelayanan/notatindakan', params)
      // console.log('notas', resp)
      if (resp.status === 200) {
        const arr = resp.data.map(x => x.nota)
        this.notaTindakans = arr.length ? arr : []
        this.notaTindakans.unshift('SEMUA')
        this.notaTindakans.push('BARU')
        this.notaTindakan = this.notaTindakans[0]
      }
    },

    uploadImages (file, id, pasien) {
      const files = file
      // console.log('store upload image', id)
      const data = new FormData()
      for (let i = 0; i < files.length; i++) {
        const images = files[i]
        data.append(`images[${i}]`, images)
      }
      data.append('rs73_id', id)
      return new Promise((resolve, reject) => {
        api.post('v1/simrs/pelayanan/simpandokumentindakanpoli', data, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
          .then(res => {
            // console.log('uploads', res)
            if (res.status === 200) {
              const storePasien = usePengunjungRanapStore()
              const tindakan = res?.data?.result
              storePasien.injectDokumenTindakan(pasien, tindakan)
            }
            // const objIndex = this.items.findIndex(obj => obj.id === res?.data?.result?.id)
            // if (objIndex > -1) {
            //   this.items[objIndex] = res?.data?.result
            // }
            notifSuccess(res)
            resolve(res)
          }).catch(err => {
            console.log('upload err', err)
          })
      })
    },

    hapusDokumen (pasien, id) {
      // hapusdokumentindakan
      const payload = { id }

      return new Promise((resolve, reject) => {
        api.post('v1/simrs/pelayanan/hapusdokumentindakan', payload)
          .then((resp) => {
            if (resp.status === 200) {
              const storePasien = usePengunjungRanapStore()
              const tindakan = resp?.data?.result
              storePasien.injectDokumenTindakan(pasien, tindakan)
              notifSuccess(resp)
              resolve(resp)
            }
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    async hapusTindakan (pasien, id) {
      const payload = { id, noreg: pasien?.noreg }

      try {
        const resp = await api.post('v1/simrs/pelayanan/hapustindakanpoli', payload)
        // console.log(resp)
        if (resp.status === 200) {
          const storePasien = usePengunjungRanapStore()
          storePasien.hapusDataInjectan(pasien, id, 'tindakan')
          this.setNotas(resp?.data?.nota)
          notifSuccess(resp)
        }
      }
      catch (error) {
        console.log('hapus tindakan poli', error)
      }
    },

    initReset (x) {
      // return new Promise((resolve, reject) => {
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
        pelaksanaSatu: [],
        pelaksanaDua: [],
        keterangan: ''
      }
      // icd
      this.formicd = {
        kdprocedure: ''
      }

      // resolve()
      // })
    },
    // =====
    setFormIcd (key, val) {
      this.formicd[key] = val
    },
    saveIcd (pasien) {
      this.loadingSaveIcd = true
      // this.setFormIcd('noreg', pasien?.noreg)
      // console.log('form icd', this.formicd)
      return new Promise(resolve => {
        api.post('v1/simrs/pelayanan/simpanprocedure', this.formicd)
          .then(resp => {
            this.loadingSaveIcd = false
            if (resp.status === 200) {
              const storePasien = usePengunjungRanapStore()
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
    getListProsedur (pasien) {
      const payload = {
        params: { noreg: pasien?.noreg }
      }
      return new Promise(resolve => {
        api.get('v1/simrs/pelayanan/simpanprocedure', payload)
          .then(resp => {
            // console.log('list', resp.data)
            resolve(resp)
          })
      })
    },
    hapusProsedur (pasien, id) {
      this.loadingSaveIcd = true
      const payload = { id, noreg: pasien?.noreg }
      return new Promise(resolve => {
        api.post('v1/simrs/pelayanan/hapusprocedure', payload)
          .then(resp => {
            this.loadingSaveIcd = false
            const storePasien = usePengunjungRanapStore()
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
