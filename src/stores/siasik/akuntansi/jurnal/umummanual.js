import { defineStore } from 'pinia'
import { date } from 'quasar'
import { api } from 'src/boot/axios'

export const usejurnalumummanual = defineStore('jurnal_umum_manual', {
  state: () => ({
    loading: false,
    tanggal: date.formatDate(Date.now(), 'DD MMMM YYYY'),
    rekening50: [],
    form: {
      tanggal: date.formatDate(Date.now(), 'YYYY-MM-DD'),
      koderekening: ''
    }
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
    }
  }
})
