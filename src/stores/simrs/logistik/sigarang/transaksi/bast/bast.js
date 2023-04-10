import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'

export const useTransaksiBastStore = defineStore('transaksi_bast', {
  state: () => ({
    loading: false,
    perusahaans: [],
    pemesanans: [],
    penerimaans: [],
    pemesanan: {},
    penerimaan: {},
    form: {},
    params: {}
  }),
  actions: {
    setForm(key, val) {
      this.form[key] = val
    },
    setParam(key, val) {
      this.params[key] = val
    },
    // autocomplete area
    // select perusahaan
    perusahaanSelected(val) {
      this.form = {}
      this.pemesanan = {}
      this.penerimaans = []
      this.penerimaan = {}
      this.setForm('kode_perusahaan', val)
      console.log('perusahaan selected', val)
      this.setParam('kode_perusahaan', val)

      this.getNomorPemesanan()
    },
    pemesananSelected(val) {
      this.penerimaans = []
      console.log('pemesanan selected', val)
      const temp = val.split('SP-')
      console.log('pemesanan temp', temp)
      if (temp.length > 1) {
        this.setForm('no_bast', temp[0] + 'BAST-' + temp[1])
      } else {
        this.setForm('no_bast', val + ' (BAST)')
      }
      this.setParam('nomor', val)
      this.getDataPemesanan()
    },
    /// //////////////////
    getInitialData() {
      this.getPerusahaan()
    },
    // api related function
    // ambil data perusahaan
    getPerusahaan() {
      this.loading = true
      return new Promise(resolve => {
        api.get('v1/transaksi/bast/perusahaan')
          .then(resp => {
            // console.log('resp perusahaan', resp.data)
            this.loading = false
            this.perusahaans = resp.data
            resolve(resp)
          })
          .catch(() => { this.loading = false })
      })
    },
    // ambil data pemesanan
    getNomorPemesanan() {
      const param = { params: this.params }
      this.loading = true
      return new Promise(resolve => {
        api.get('v1/transaksi/bast/nomor-pemesanan', param)
          .then(resp => {
            this.loading = false
            // console.log('nomor pemesanan', resp.data)
            this.pemesanans = resp.data
            resolve(resp)
          })
          .catch(() => { this.loading = false })
      })
    },
    // ambil data pemesanan dan penerimaan
    getDataPemesanan() {
      const param = { params: this.params }
      this.loading = true
      return new Promise(resolve => {
        api.get('v1/transaksi/bast/pemesanan', param)
          .then(resp => {
            this.loading = false
            console.log('pemesanan', resp.data)
            this.pemesanan = resp.data
            if (resp.data.penerimaan.length) {
              this.penerimaans = resp.data.penerimaan.map(data => {
                data.checked = false
                return data
              })

              console.log('penerimaan', resp.data.penerimaan)
            }
            resolve(resp)
          })
          .catch(() => {
            this.loading = false
          })
      })
    }
  }
})
