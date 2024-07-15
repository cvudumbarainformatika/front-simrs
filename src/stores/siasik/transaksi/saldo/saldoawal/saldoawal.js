import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
import { notifSuccess } from 'src/modules/utils'
// import { notifSuccessVue } from 'src/modules/utils'

export const useSaldoAwalStore = defineStore('transaksi_saldo_awal', {
  state: () => ({
    loading: false,
    items: [],
    meta: {},
    form: {
      // noregister: null,
      // tanggal: null,
      // rekening: null,
      // namaRek: null,
      // nilaisaldo: null
    },
    params: {
      q: '',
      page: 1,
      tahun: 2024,
      rowsPerPage: 10
      // per_page: 10,
    },
    rekeningbluds: [],
    saldobluds: []
    // arrayTanggal: [],
  }),

  actions: {
    setParams (key, val) {
      this.params[key] = val
    },
    setForm (key, val) {
      this.form[key] = val
    },
    emptyForm () {
      this.form = {}
    },
    getInitialData () {
      this.getSaldoBlud()
    },
    refreshTable () {
      this.params.page = 1
      this.getInitialData()
    },
    getRekeningBlud () {
      this.loading = true
      return new Promise((resolve) => {
        api.get('v1/transaksi/saldoawal_ppk/lihatrekening').then((resp) => {
          console.log('rekening', resp)
          if (resp.status === 200) {
            this.rekeningbluds = resp.data
            this.loading = false
            resolve(resp)
          }
        })
      })
    },
    simpanSaldo () {
      // cari nama bank
      const bank = this.rekeningbluds.find(
        (x) => x.noRek === this.form.rekening
      )
      const data = {
        tanggal: this.form.tanggal,
        nilaisaldo: this.form.nilaisaldo,
        rekening: this.form.rekening,
        namaRek: bank?.namaRek ?? '-'
      }
      this.loading = true
      return new Promise((resolve, reject) => {
        api
          .post('v1/transaksi/saldoawal_ppk/transsaldo', data)
          .then((resp) => {
            console.log('isian', resp)
            this.loading = false
            notifSuccess(resp)
            // notifSuccessVue(resp)
            // getRekeningBlud();
            this.refreshTable()
            resolve(resp.data)
          })
          .catch((err) => {
            this.loading = false
            reject(err)
          })
      })
    },
    getSaldoBlud () {
      this.loading = true
      const params = { params: this.params }
      // const resp = await api.get('v1/transaksi/saldoawal_ppk/tabelrek', params)
      // if (resp.status === 200) {
      //   console.log('SALDO', resp)
      //   this.loading = false
      //   this.saldobluds = resp.data
      //   // if (this.saldobluds.length) {
      //   //   this.saldobluds.forEach(it =>
      //   //     it
      //   //   )
      //   // }
      //   console.log('dataaaa', resp)
      //   this.loading = false
      // }
      // else {
      //   this.loading = false
      // }

      return new Promise((resolve, reject) => {
        api.get('v1/transaksi/saldoawal_ppk/tabelrek', params).then((resp) => {
          console.log('saldo', resp)
          if (resp.status === 200) {
            this.loading = false
            this.saldobluds = resp.data.data
            resolve(resp.data.data)
          }
          else {
            this.loading = false
          }
        })
      })
    },
    onRequest (props) {
      console.log('props', props)
      this.params.page = props?.pagination?.page ?? 1
      this.params.rowsPerPage = props?.pagination?.rowsPerPage ?? 5
      this.getInitialData()
    },
    setTahun (val) {
      this.params.tahun = val
    },

    goToPage (val) {
      this.params.page = val
      this.getInitialData()
    }
  }
})
