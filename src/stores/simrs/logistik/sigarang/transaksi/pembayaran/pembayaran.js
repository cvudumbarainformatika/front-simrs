import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'

export const usePembayaranStore = defineStore('pembayaran_store', {
  state: () => ({
    loading: false,
    kontraks: [],
    form: {}
  }),
  actions: {
    // local function
    setForm(key, val) {
      this.form[key] = val
    },
    kontrakSelected(val) {
      console.log('kontrak', val)
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
    }
  }
})
