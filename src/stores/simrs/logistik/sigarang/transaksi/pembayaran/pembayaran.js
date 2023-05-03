import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'

export const usePembayaranStore = defineStore('pembayaran_store', {
  state: () => ({
    loading: false,
    kontraks: [],
    kontrak: {},
    penerimaans: [],
    noBayar: 0,
    form: {},
    params: {
      q: ''
    }
  }),
  actions: {
    // local function
    setForm(key, val) {
      this.form[key] = val
    },
    setParam(key, val) {
      this.params[key] = val
    },
    kontrakSelected(val) {
      console.log('kontrak', val)
      this.setParam('kontrak', val)
      this.getPenerimaan()
      this.getKontrak()
      this.getNoBayar()
    },
    // api related function
    // ambil data kontrak
    getKontraks() {
      this.loading = true
      return new Promise(resolve => {
        api.get('v1/transaksi/pembayaran/cari-kontrak')
          .then(resp => {
            console.log('kontraks ', resp.data)
            this.loading = false
            this.kontraks = resp.data
            resolve(resp)
          })
          .catch(() => { this.loading = false })
      })
    },
    getKontrak() {
      this.loading = true
      const param = { params: this.params }
      return new Promise(resolve => {
        api.get('v1/transaksi/pembayaran/ambil-kontrak', param)
          .then(resp => {
            console.log('kontrak ', resp.data)
            console.log('ada ', Object.keys(resp.data))
            this.loading = false
            this.kontrak = resp.data
            resolve(resp)
          })
          .catch(() => { this.loading = false })
      })
    },
    getPenerimaan() {
      this.loading = true
      const param = { params: this.params }
      return new Promise(resolve => {
        api.get('v1/transaksi/pembayaran/ambil-penerimaan', param)
          .then(resp => {
            this.loading = false
            console.log('get penerimaan', resp.data)
            this.penerimaans = resp.data
            resolve(resp.data)
          })
          .catch(() => { this.loading = false })
      })
    },
    getNoBayar() {
      this.loading = true
      const param = { params: this.params }
      return new Promise(resolve => {
        api.get('v1/transaksi/pembayaran/ambil-no-bayar', param)
          .then(resp => {
            this.loading = false
            console.log('get no bayar', resp.data)
            this.noBayar = resp.data
            resolve(resp.data)
          })
          .catch(() => { this.loading = false })
      })
    },
    simpanPembayaran() {
      console.log('form', this.form)
    }
  }
})
