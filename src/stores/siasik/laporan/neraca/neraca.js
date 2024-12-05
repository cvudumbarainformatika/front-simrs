import { defineStore } from 'pinia'
import { date } from 'quasar'
import { api } from 'src/boot/axios'

export const useNeracaStore = defineStore('Neraca_Akuntansi', {
  state: () => ({
    loading: false,
    dialogCetak: false,
    exportExcel: false,
    loadingDownload: false,
    reqs: {
      q: '',
      page: 1,
      tgl: date.formatDate(Date.now(), 'YYYY-MM-DD'),
      tglx: date.formatDate(Date.now(), 'YYYY-MM-DD'),
      tahun: date.formatDate(Date.now(), 'YYYY')
    },
    display: {
      dari: date.formatDate(Date.now(), 'DD MMMM YYYY'),
      sampai: date.formatDate(Date.now(), 'DD MMMM YYYY'),
      sekarang: date.formatDate(Date.now(), 'DD MMMM YYYY')
    }
  }),
  actions: {
    setParameter (key, val) {
      this.reqs[key] = val
    },
    getDataNeraca () {
      this.loading = true
      const params = { params: this.reqs }
      return new Promise((resolve) => {
        api.get('v1/akuntansi/neraca/getneraca', params).then((resp) => {
          console.log('getData NERACA', resp?.data)
          if (resp.status === 200) {
            this.loading = false
            resolve(resp)
          }
        }).catch(() => { this.loading = false })
      })
    }
  }
})
