import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
import { notifSuccess } from 'src/modules/utils'

export const formKontrakPekerjaan = defineStore('form_Kontrak', {
  state: () => ({
    loading: false,
    reqs: {
      q: ''
    },
    form: {
      nokontrak: null,
      tgltrans: null,
      tglmulaikontrak: null,
      tglakhirkontrak: null,
      // Perusahaan
      kodeperusahaan: null,
      namaperusahaan: null,
      kodemapingrs: null,
      namasuplier: null,
      // PPTK
      kodepptk: null,
      namapptk: null,
      kodeBagian: null,
      // Kegiatan
      kodekegiatanblud: null,
      kegiatanblud: null,

      nilaikontrak: 0,
      nokontrakx: null,
      termin: 1
    },
    pihaktigas: []
  }),
  actions: {
    resetFORM () {
      this.form = {}
      const columns = [
        'nokontrak',
        'tgltrans',
        'tglmulaikontrak',
        'tglakhirkontrak',
        'kodeperusahaan',
        'namaperusahaan',
        'kodepptk',
        'namapptk',
        'kodekegiatanblud',
        'kegiatanblud',
        'kodemapingrs',
        'namasuplier',
        'nilaikontrak',
        'kodeBagian',
        'nokontrakx',
        'termin']
      for (let i = 0; i < columns.length; i++) {
        this.setForm(columns[i], null)
      }
    },
    // newData () {
    //   this.resetFORM()
    //   this.edited = false
    // },
    // editData (val) {
    //   this.edited = true
    //   const keys = Object.keys(val)
    //   keys.forEach((key, index) => {
    //     this.setForm(key, val[key])
    //   })
    // },
    // setAmbils (key, val) {
    //   this.reqs[key] = val
    // },
    setForm (key, val) {
      this.form[key] = val
      // console.log('form', this.form)
    },
    emptyForm () {
      this.form = {}
    },
    getPihaktiga () {
      this.loading = true
      return new Promise((resolve) => {
        api.get('v1/transaksi/belanja_ls/perusahaan').then((resp) => {
          // console.log('pihaktiga', resp)
          if (resp.status === 200) {
            this.loading = false
            this.pihaktigas = resp.data
            resolve(resp)
          }
        })
          .catch(() => {
            this.loading = false
          })
      })
    },
    simpanKontrak () {
      console.log('fooorm', this.form)
      this.loading = true
      return new Promise((resolve, reject) => {
        api
          .get('/v1/transaksi/belanja_ls/simpankontrak', this.form)
          .then((resp) => {
            console.log('isian', resp)
            this.loading = false
            notifSuccess(resp)

            resolve(resp.data)
          })
          .catch((err) => {
            this.loading = false
            reject(err)
          })
      })
    }
  }
})
