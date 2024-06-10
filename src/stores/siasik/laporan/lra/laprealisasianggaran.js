/* eslint-disable space-before-function-paren */
import { defineStore } from 'pinia'
import { date } from 'quasar'
import { api } from 'src/boot/axios'

export const useLaporanLraLaprealisasianggaranStore = defineStore('laporan_realisasi_anggaran', {
  state: () => ({
    loading: false,
    items: [],
    meta: {},
    params: {
      q: '',
      page: 1,
      tgl: date.formatDate(Date.now(), 'YYYY-MM-01'),
      tglx: date.formatDate(Date.now(), 'YYYY-MM-DD'),
      tahun: date.formatDate(Date.now(), 'YYYY'),
      bidang: '',
      kegiatan: ''
    },
    bidangs: []
    // kegiatans: []

  }),
  actions: {
    setParam (key, val) {
      this.params[key] = val
    },
    setForm(key, val) {
      this.params[key] = val
    },
    emptyForm() {
      this.params.bidang = {}
      this.params.kegiatan = {}
    },

    // eslint-disable-next-line space-before-function-paren
    getDataBidang() {
      this.loading = true
      return new Promise((resolve) => {
        api.get('v1/laporan/lra/bidang').then((resp) => {
          console.log('bidang', resp)
          if (resp.status === 200) {
            this.bidangs = resp.data
            this.loading = false
            resolve(resp)
          }
        }).catch(() => { this.loading = false })
      })
    },
    getBidang() {
      this.bidangs = []
      for (let i = 0; i < this.bidangs.data.length; i++) {
        const el = this.bidangs?.data
        const xx = el[i].length
          ? this.ambilDataUnik(el[i].map((x) => {
            return {
              kode: x.kodebidang,
              bidang: x.bidang
            }
          }), (k) => k?.kodebidang
          )
          : []
        console.log('kyiujdf', xx)
      }
    },

    getDataRealisasi() {
      this.loading = true
      const params = { params: this.params }
      return new Promise(resolve => {
        api.get('v1/laporan/lra/laplra', params).then(resp => {
          console.log('realisasi', resp)
          if (resp.status === 200) {
            this.items = []
            this.items = resp.data
            this.loading = false
            resolve(resp)
          }
        }).catch(() => { this.loading = false })
      })
    },

    // mapItems () {
    //   console.log('kkkkkk')
    //   this.bidangs = []

    //   // const bidang = data.filter(a => a.data.length)
    //   // console.log('jauuuuh', bidang)
    // },

    ambilDataUnik (x, f) {
      // eslint-disable-next-line no-sequences
      const unique = Object.values(x.reduce((a, b) => ((a[f(b)] = b), a), {}))
      return unique
    }
  }
})
