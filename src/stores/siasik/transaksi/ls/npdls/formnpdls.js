import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
import { notifSuccess } from 'src/modules/utils'

export const formNotaPermintaanDanaLS = defineStore('form_NPD_LS', {
  state: () => ({
    loading: false,
    reqs: {
      q: '',
      kodebidang: null,
      kodekegiatan: null
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
      biayatransfer: 0,
      rincians: []
    },
    rinci:
    {
      nonpdls: null,

      // Rekening 50
      koderek50: null,
      rincianbelanja: null,
      // Rekening 108
      koderek108: null,
      uraian108: null,
      itembelanja: null,

      nopenerimaan: null,

      // id serahterima
      idserahterima_rinci: null,
      tglentry: null,
      userentry: null,

      // PAGU
      volume: null,
      satuan: null,
      harga: null,
      total: null,

      // Belanja
      volumels: null,
      hargals: null,
      totalls: null,
      nominalpembayaran: null
    },

    serahterimas: [
      { ket: 'Ya', value: '1' },
      { ket: 'Tidak', value: '2' }
    ],
    anggarans: {},
    rekening50: {},
    itembelanja: [],
    // bastfarmasis: [],
    openDialogCariSerahterima: false
  }),
  actions: {
    resetFORM () {
      // this.form = {
      //   nonpdls: '',
      //   tglnpdls: '',

      //   // PPTK
      //   kodepptk: '',
      //   pptk: '',
      //   kodebidang: '',
      //   bidang: '',

      //   // Data Kontrak
      //   serahterimapekerjaan: '',
      //   noserahterima: '',
      //   nokontrak: '',

      //   triwulan: '',

      //   // kegiatan
      //   kodekegiatanblud: '',
      //   kegiatanblud: '',

      //   // pihak ketiga
      //   kodepenerima: '',
      //   penerima: '',
      //   bank: '',
      //   rekening: '',
      //   npwp: '',

      //   keterangan: '',
      //   biayatransfer: 0,
      //   rincians: ''
      // }

      const forms = Object.keys(this.form)
      for (let i = 0; i < forms.length; i++) {
        const el = forms[i]
        this.setForm(el, null)
      }
      const keys = Object.keys(this.rinci)
      for (let i = 0; i < keys.length; i++) {
        const el = keys[i]
        this.setForm(el, null)
      }
    },
    setParams (key, val) {
      this.reqs[key] = val
    },
    setForm (key, val) {
      this.form[key] = val
      this.rinci[key] = val
      // console.log('form', this.form)
    },
    emptyForm () {
      this.form = {}
      this.rinci = {}
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
            // this.form.rincians = []
            resolve(resp.data)
          })
          .catch((err) => {
            this.loading = false
            reject(err)
          })
      })
    },
    getRincianBelanja () {
      // console.log('pagu', this.anggarans)
      this.loading = true
      const params = { params: this.reqs }
      return new Promise((resolve) => {
        api.get('/v1/transaksi/belanja_ls/anggaran', params)
          .then((resp) => {
            if (resp.status === 200) {
              console.log('anggaran', resp.data)
              this.loading = false
              this.anggarans = resp.data
              this.rekening50 = resp.data
              this.filterRekening50(resp.data)
              this.itembelanja = resp.data
              this.filterItem(resp.data)
              resolve(resp.data)
            }
            else {
              this.loading = false
            }
          })
          .catch(() => {
            this.loading = false
          })
      })
    },
    filterRekening50 () {
      const data = this.rekening50?.length
        ? this.rekening50?.map((x) => {
          return {
            rincianbelanja: x.uraian50,
            rek50: x.koderek50
          }
        })
        : []
      const rek = data.reduce((a, b) => {
        const yangsama = a.find(x => x.rek50 === b.rek50)
        if (!yangsama) {
          a.push(b)
        }
        return a
      }, [])
      this.rekening50 = rek
      console.log('rincianbelanjaxxx', this.rekening50)
    },
    filterItem () {
      const data = this.itembelanja?.length
        ? this.itembelanja?.map((x) => {
          return {
            item: x.usulan,
            harga: x.harga,
            satuan: x.satuan,
            volume: x.volume,
            pagu: x.pagu
          }
        })
        : []
      // const rek = data.reduce((a, b) => {
      //   const yangsama = a.find(x => x.rek50 === b.rek50)
      //   if (!yangsama) {
      //     a.push(b)
      //   }
      //   return a
      // }, [])
      this.itembelanja = data
      console.log('itembelanja', this.itembelanja)
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
