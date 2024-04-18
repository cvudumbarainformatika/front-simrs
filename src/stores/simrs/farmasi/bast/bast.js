import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'

export const useTransaksiBastFarmasiStore = defineStore('transaksi_bast_farmasi', {
  state: () => ({
    loading: false,
    loadingNomor: false,
    perusahaans: [],
    kontraks: [],
    pemesanans: [],
    penerimaans: [],
    tampilPenerimaans: [],
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
      this.pemesanans = []
      this.tampilPenerimaans = []
      this.penerimaan = {}
      this.setForm('kdpbf', val)
      console.log('perusahaan selected', val)
      this.setParam('kdpbf', val)

      this.getPemesanan()
    },
    kontrakSelected(val) {
      this.pemesanans = []
      this.penerimaans = []
      this.tampilPenerimaans = []
      // console.log('kontrak selected', val)
      this.setParam('nopemesanan', val)

      this.getDataPenerimaan()
    },
    pemesananSelected(val) {
    },
    /// //////////////////
    getInitialData() {
      this.getPerusahaan()
    },
    // api related function
    // ambil data perusahaan
    // getNoBast() {
    //   const param = { params: this.params }
    //   this.loadingNomor = true
    //   return new Promise(resolve => {
    //     api.get('v1/simrs/farmasinew/bast/no-bast', param)
    //       .then(resp => {
    //         console.log('resp no bast', resp.data)
    //         this.loadingNomor = false
    //         resolve(resp.data)
    //       })
    //       .catch(() => { this.loadingNomor = false })
    //   })
    // },
    // ambil data perusahaan
    getPerusahaan() {
      this.loading = true
      return new Promise(resolve => {
        api.get('v1/simrs/farmasinew/bast/perusahaan')
          .then(resp => {
            // console.log('resp perusahaan', resp.data)
            this.loading = false
            this.perusahaans = resp.data
            resolve(resp)
          })
          .catch(() => { this.loading = false })
      })
    },
    // ambil data Kontrak
    getPemesanan() {
      const param = { params: this.params }
      this.loading = true
      return new Promise(resolve => {
        api.get('v1/simrs/farmasinew/bast/pemesanan', param)
          .then(resp => {
            this.loading = false
            this.kontraks = resp.data
            resolve(resp)
          })
          .catch(() => { this.loading = false })
      })
    },

    getDataPenerimaan() {
      const param = { params: this.params }
      this.loading = true
      return new Promise(resolve => {
        api.get('v1/simrs/farmasinew/bast/penerimaan', param)
          .then(resp => {
            this.loading = false
            const temp = resp.data
            temp.forEach(anu => {
              anu.checked = false
              anu.penerimaanrinci.forEach(det => {
                det.checked = false
              })
            })

            this.pemesanans = temp
            console.log('pemesanan', this.pemesanans)

            resolve(resp)
          })
          .catch(() => {
            this.loading = false
          })
      })
    },
    // simpan
    simpanBast() {
      console.log('simpan', this.form)
      this.loading = true
      return new Promise(resolve => {
        api.post('v1/transaksi/bast/', this.form)
          .then(resp => {
            this.loading = false
            this.form = {}
            this.pemesanan = {}
            this.pemesanans = []
            this.penerimaans = []
            this.tampilPenerimaans = []
            this.penerimaan = {}
            this.getPerusahaan()
            resolve(resp)
          })
          .catch(() => { this.loading = false })
      })
    }
  }
})
