import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
import { notifSuccess } from 'src/modules/utils'

export const useTransaksiBastFarmasiStore = defineStore('transaksi_bast_farmasi', {
  state: () => ({
    loading: false,
    loadingNomor: false,
    perusahaans: [],
    kontraks: [],
    pemesanans: [],
    penerimaans: [],
    tampilPenerimaans: [],
    newPenerimaans: [],
    pemesanan: {},
    penerimaan: {},
    form: {},
    params: {}
  }),
  actions: {
    setForm (key, val) {
      this.form[key] = val
    },
    setParam (key, val) {
      this.params[key] = val
    },
    // autocomplete area
    // select perusahaan
    perusahaanSelected (val) {
      this.form = {}
      this.pemesanan = {}
      this.penerimaans = []
      this.pemesanans = []
      this.newPenerimaans = []
      this.tampilPenerimaans = []
      this.penerimaan = {}
      this.setForm('kdpbf', val)
      console.log('perusahaan selected', val)
      this.setParam('kdpbf', val)

      this.getPemesanan()
    },
    kontrakSelected (val) {
      this.pemesanans = []
      this.newPenerimaans = []
      this.penerimaans = []
      this.tampilPenerimaans = []
      // console.log('kontrak selected', val)
      this.setParam('nopemesanan', val)

      this.getDataPenerimaan()
    },
    pemesananSelected (val) {
    },
    /// //////////////////
    getInitialData () {
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
    getPerusahaan () {
      this.loading = true
      return new Promise(resolve => {
        api.get('v1/simrs/penunjang/farmasinew/bast/perusahaan')
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
    getPemesanan () {
      const param = { params: this.params }
      this.loading = true
      return new Promise(resolve => {
        api.get('v1/simrs/penunjang/farmasinew/bast/pemesanan', param)
          .then(resp => {
            this.loading = false
            this.kontraks = resp.data
            resolve(resp)
          })
          .catch(() => { this.loading = false })
      })
    },

    getDataPenerimaan () {
      const param = { params: this.params }
      this.loading = true
      return new Promise(resolve => {
        api.get('v1/simrs/penunjang/farmasinew/bast/penerimaan', param)
          .then(resp => {
            this.loading = false
            const temp = resp.data
            temp.forEach(anu => {
              anu.checked = false
              anu.penerimaanrinci.forEach(det => {
                det.adaPPN = false
                if (parseFloat(det.ppn) > 0) det.adaPPN = true
                det.checked = false
                const nilaiRetur = !parseFloat(det.nilai_retur) ? 0 : parseFloat(det.nilai_retur)
                det.afterRetur = parseFloat(det.subtotal) - nilaiRetur
                det.nilai_retur = nilaiRetur
                // det.subtotalx = det.subtotal
              })
              anu.subtotal_bast = anu.penerimaanrinci.map(a => parseFloat(a.afterRetur)).reduce((a, b) => a + b, 0)
              anu.subtotal_retur = anu.penerimaanrinci.map(a => parseFloat(a.nilai_retur)).reduce((a, b) => a + b, 0)
            })

            this.newPenerimaans = temp
            this.form.jumlah_bast = 0
            console.log('pemesanan', this.newPenerimaans)

            resolve(resp)
          })
          .catch(() => {
            this.loading = false
          })
      })
    },
    // simpan
    simpanBast () {
      console.log('simpan', this.form)
      this.loading = true
      return new Promise(resolve => {
        api.post('v1/simrs/penunjang/farmasinew/bast/simpan', this.form)
          .then(resp => {
            this.loading = false
            notifSuccess(resp)
            this.form = {}
            this.pemesanan = {}
            this.pemesanans = []
            this.newPenerimaans = []
            this.penerimaans = []
            this.tampilPenerimaans = []
            this.kontraks = []
            this.penerimaan = {}
            this.getPerusahaan()
            resolve(resp)
          })
          .catch(() => { this.loading = false })
      })
    }
  }
})
