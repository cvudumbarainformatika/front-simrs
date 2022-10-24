import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
import { dateDbFormat } from 'src/modules/formatter'

export const useDashboardLaborat = defineStore('dashboard_laborat', {
  state: () => ({
    itemLabs: [],
    itemLabLuars: [],
    labHariIni: 0,
    labLuarHariIni: 0,
    transLabHariIni: 0,
    transLabLuarHariIni: 0,
    loading: false
  }),
  // getters: {
  //   doubleCount: (state) => state.counter * 2
  // },
  actions: {
    async getLaboratDashboards () {
      this.loading = true
      try {
        await api.get('/v1/dashboard_laborat').then(resp => {
          console.log(resp)
          this.itemLabs = resp.data.lab
          this.itemLabLuars = resp.data.lab_luar
          this.jumlahLabHariIni(resp.data.lab) // jumlah pemeriksaan
          this.jumlahLabLuarHariIni(resp.data.lab_luar) // jumlah pemeriksaan luar
          this.jmlTransLabHariIni(resp.data.lab) // jumlah transaksi lab dalam
          this.jmlTransLabLuarHariIni(resp.data.lab_luar) // jumlah transaksi lab luar
          this.loading = false
          // console.log('mapping', this.itemLabs)
        })
      } catch (error) {
        this.loading = false
      }
    },
    // jumlah Pemeriksaan
    jumlahLabHariIni(arr) {
      let jml = 0
      const today = dateDbFormat(new Date())
      if (arr.length > 0) jml = arr.filter(item => item.x === today)[0].y ? arr.filter(item => item.x === today)[0].y : 0
      this.labHariIni = jml
    },
    jumlahLabLuarHariIni(arr) {
      let jml = 0
      const today = dateDbFormat(new Date())
      if (arr.length > 0) jml = arr.filter(item => item.x === today)[0].y ? arr.filter(item => item.x === today)[0].y : 0
      this.labLuarHariIni = jml
    },
    // Jumlah Transaksi
    jmlTransLabHariIni(arr) {
      let jml = 0
      const today = dateDbFormat(new Date())
      if (arr.length > 0) jml = arr.filter(item => item.x === today)[0].z ? arr.filter(item => item.x === today)[0].z : 0
      this.transLabHariIni = jml
    },
    jmlTransLabLuarHariIni(arr) {
      let jml = 0
      const today = dateDbFormat(new Date())
      if (arr.length > 0) jml = arr.filter(item => item.x === today)[0].z ? arr.filter(item => item.x === today)[0].z : 0
      this.transLabLuarHariIni = jml
    }
  }
})
