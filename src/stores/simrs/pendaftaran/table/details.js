import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'

export const useDetailPasien = defineStore('detail_pasien', {
  state: () => ({
    pasien: null,
    kunjunganPoli: [],
    kunjunganRanap: [],
    loading: false,
    dialogOpen: false,

    rajal: {
      current_page: 1,
      total_page: 1,
      per_page: 10,
      data: []
    },
    ranap: {
      current_page: 1,
      total_page: 1,
      per_page: 4,
      data: []
    }
  }),
  getters: {
    doubleCount: (state) => state.counter * 2
  },
  actions: {
    async getDetails(payload) {
      this.loading = true
      const resp = await api.get(`/v1/simrs/pendaftaran/historypasien?norm=${payload}`)
      if (resp.status === 200) {
        console.log('detail pasien', resp)
        const poli = resp.data.kunjunganpoli
        const ranap = resp.data.kunjunganranap
        const spoli = poli.sort((a, b) => a.tglkunjungan + b.tglkunjungan)
        const sranap = ranap.sort((a, b) => a.rs3 + b.rs3)
        this.kunjunganPoli = spoli
        this.kunjunganRanap = sranap
        this.paginasiRajal(spoli)
        this.paginasiRanap(sranap)
        this.loading = false
      }

      this.loading = false
    },

    setDialogOpen() {
      this.dialogOpen = !this.dialogOpen
      if (this.dialogOpen === false) {
        this.setAwal()
      }
    },

    paginasiRajal(val) {
      if (val.length > 0) {
        this.rajal.total_page = Math.ceil(val.length / this.rajal.per_page)
        const page = this.rajal.current_page
        const recordsperpage = this.rajal.per_page
        const from = page === this.rajal.total_page ? val.length : (page * recordsperpage)
        this.rajal.data = [] // ini membersihkan data
        for (let i = (page - 1) * recordsperpage; i < from; i++) {
          this.rajal.data.push(val[i])
        }
      }
    },
    paginasiRanap(val) {
      if (val.length > 0) {
        this.ranap.total_page = Math.ceil(val.length / this.ranap.per_page)
        const page = this.ranap.current_page
        const recordsperpage = this.ranap.per_page
        const from = page === this.ranap.total_page ? val.length : (page * recordsperpage)
        this.ranap.data = [] // ini membersihkan data
        for (let i = (page - 1) * recordsperpage; i < from; i++) {
          this.ranap.data.push(val[i])
        }
      }
    },

    setPageRajal(val) {
      const arr = this.kunjunganPoli
      this.rajal.current_page = val
      // this.loading = true
      // setTimeout(() => {
      this.paginasiRajal(arr)
      //   this.loading = false
      // }, 300)
    },
    setPageRanap(val) {
      const arr = this.kunjunganRanap
      this.ranap.current_page = val
      this.paginasiRanap(arr)
    },
    setAwal() {
      // if (this.dialogOpen === false) {
      this.rajal.current_page = 1
      this.rajal.data = []
      this.ranap.current_page = 1
      this.ranap.data = []
      // }
    }

  }

})
