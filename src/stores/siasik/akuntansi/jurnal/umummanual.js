import { defineStore } from 'pinia'
import { date } from 'quasar'
import { api } from 'src/boot/axios'

export const usejurnalumummanual = defineStore('jurnal_umum_manual', {
  state: () => ({
    loading: false,
    items: [],
    tanggal: date.formatDate(Date.now(), 'DD MMMM YYYY'),
    rekening50: [],
    form: {
      tanggal: date.formatDate(Date.now(), 'YYYY-MM-DD'),
      koderekening: '',
      tahun: null
    },
    params: {
      tahuncari: null
    },
    tahun: []
  }),
  actions: {
    getRekenining50 () {
      this.loading = true
      const params = { params: this.reqs }
      return new Promise((resolve) => {
        api.get('v1/akuntansi/jurnalumum/permen50', params).then((resp) => {
          if (resp.status === 200) {
            this.rekening50 = resp.data
            this.loading = false
            resolve(resp.data)
          }
        }).catch(() => { this.loading = false })
      })
    },
    caritahun () {
      const max = new Date().getFullYear()
      const min = max - 2
      const years = []

      for (let i = max; i >= min; i--) {
        this.tahun.push(i)
      }
      console.log('sasasa', years)
    },
    async getJurnalUmum () {
      this.loading = true
      const params = { params: this.params }
      try {
        const resp = await api.get('v1/akuntansi/jurnalumum/jurnalumumotot', params)
        // console.log('masterlaborat', resp)
        if (resp.status === 200) {
          this.items = resp.data
          this.loading = false
          console.log('wew', this.items)
        }
        this.loading = false
      }
      catch (error) {
        this.loadingMasterLab = false
      }
    }
  }
})
