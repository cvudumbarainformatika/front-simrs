import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'

export const usePembayaranStore = defineStore('pembayaran_store', {
  state: () => ({
    loading: false,
    kontraks: [],
    kontrak: {},
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
      this.getKontrak()
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
    }
  }
})
