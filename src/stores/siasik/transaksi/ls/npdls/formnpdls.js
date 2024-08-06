import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
import { notifSuccess } from 'src/modules/utils'

export const formNotaPermintaanDanaLS = defineStore('form_NPD_LS', {
  state: () => ({
    loading: false,
    reqs: {
      q: ''
      // page: 1,
      // rowsPerPage: 10,
      // rowsNumber: 0
    },
    form: {
      nonpdls: null,
      tglnpdls: null,

      // PPTK
      kodepptk: null,
      pptk: null,
      kodebidang: null,
      bidang: null,

      // Data Kontrak
      serahterimapekerjaan: null,
      noserahterima: null,
      nokontrak: null,

      triwulan: null,

      // kegiatan
      kodekegiatanblud: null,
      kegiatanblud: null,

      // pihak ketiga
      kodepenerima: null,
      penerima: null,
      bank: null,
      rekening: null,
      npwp: null,

      keterangan: null,
      biayatransfer: 0
    },
    serahterimas: [
      { ket: 'Ya', value: '1' },
      { ket: 'Tidak', value: '2' }
    ],
    // bastfarmasis: [],
    openDialogCariSerahterima: false
  }),
  actions: {
    resetFORM () {
      this.form = {}
      const columns = [
        'nonpdls',
        'tglnpdls',
        'kodepptk',
        'pptk',
        'kodebidang',
        'bidang',
        'serahterimapekerjaan',
        'noserahterima',
        'nokontrak',
        'triwulan',
        'kodekegiatanblud',
        'kegiatanblud',
        'kodepenerima',
        'penerima',
        'bank',
        'rekening',
        'npwp',
        'keterangan',
        'biayatransfer'
      ]
      for (let i = 0; i < columns.length; i++) {
        this.setForm(columns[i], null)
      }
    },
    setForm (key, val) {
      this.form[key] = val
      // console.log('form', this.form)
    },
    emptyForm () {
      this.form = {}
    },
    // onRequest (props) {
    //   console.log('props', props)
    //   this.reqs.page = props?.pagination?.page ?? 1
    //   this.reqs.rowsPerPage = props?.pagination?.rowsPerPage ?? 20
    //   this.getInitialData()
    // },
    // goToPage (val) {
    //   this.reqs.page = val
    //   this.getInitialData()
    // },
    simpanNpdls () {
      console.log('fooorm', this.form)
      this.loading = true
      return new Promise((resolve, reject) => {
        api.post('/v1/transaksi/belanja_ls/simpannpd', this.form)
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
    // getDataBast () {
    //   this.selectbastFarmasi()
    // },
    // selectbastFarmasi () {
    //   this.loading = true
    //   return new Promise((resolve, reject) => {
    //     api.get('/v1/transaksi/belanja_ls/bastfarmasi')
    //       .then((resp) => {
    //         if (resp.status === 200) {
    //           console.log('farmasi', resp.data)
    //           this.loading = false
    //           this.bastfarmasis = resp.data

    //           resolve(resp.data)
    //         }
    //       })
    //       .catch((err) => {
    //         this.loading = false
    //         reject(err)
    //       })
    //   })
    // }
  }
})
