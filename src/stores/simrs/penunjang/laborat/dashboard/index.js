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
          console.log('dashboard', resp)
          this.itemLabs = resp.data.lab
          this.itemLabLuars = resp.data.lab_luar
          this.jumlahLabHariIni(this.itemLabs) // jumlah pemeriksaan
          this.jumlahLabLuarHariIni(this.itemLabLuars) // jumlah pemeriksaan luar
          // console.log('mapping', this.labLuarHariIni)
          // this.transLabHariIni = this.jmlTransLabHariIni(resp.data.lab) // jumlah transaksi lab dalam
          // this.transLabLuarHariIni = this.jmlTransLabLuarHariIni(resp.data.lab_luar) // jumlah transaksi lab luar
          this.loading = false
        })
      } catch (error) {
        this.loading = false
      }
    },
    // jumlah Pemeriksaan
    jumlahLabHariIni(arr) {
      // let jml = 0
      const today = dateDbFormat(new Date())
      if (arr.length > 0) {
        this.labHariIni = arr.filter(item => item.x === today)[0].y
        this.transLabHariIni = arr.filter(item => item.x === today)[0].z
      } else {
        this.labHariIni = 0
        this.transLabHariIni = 0
      }
    },
    jumlahLabLuarHariIni(arr) {
      const today = dateDbFormat(new Date())
      if (arr.length > 0) {
        this.labLuarHariIni = arr.filter(item => item.x === today)[0].y
        this.transLabLuarHariIni = arr.filter(item => item.x === today)[0].z
      } else {
        this.labLuarHariIni = 0
        this.transLabLuarHariIni = 0
      }
    }
    // Jumlah Transaksi
    // jmlTransLabHariIni(arr) {
    //   let jml = 0
    //   const today = dateDbFormat(new Date())
    //   if (arr.length > 0) jml = arr.filter(item => item.x === today) ? arr.filter(item => item.x === today)[0].z : 0
    //   return jml
    //   // console.log('transLabHariIni', jml)
    // },
    // jmlTransLabLuarHariIni(arr) {
    //   let jml = 0
    //   const today = dateDbFormat(new Date())
    //   if (arr.length > 0) jml = arr.filter(item => item.x === today) ? arr.filter(item => item.x === today)[0].z : 0
    //   return jml
    //   // console.log('transLabLuarHariIni', jml)
    // }
  }
})
