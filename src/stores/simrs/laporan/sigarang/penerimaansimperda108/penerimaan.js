import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'

export const useSimrsLaporanSigarangPenerimaanSimperda108Store = defineStore('laporan_penerimaan_simperda_108_sigarang', {
  state: () => ({
    loading: false,
    items: [],
    params: {
      q: '',
      per_page: 10,
      page: 1
    }
  }),
  actions: {
    setParam(key, val) {
      this.params[key] = val
    },

    getInitialData() {
      this.getDataPenerimaan()
    },
    getDataPenerimaan() {
      this.loading = true
      const param = { params: this.params }
      return new Promise(resolve => {
        api.get('v1/simrs/laporan/sigarang/lappenerimaan', param)
          .then(resp => {
            this.loading = false
            console.log('laporan penerimaan', resp.data)
            resolve(resp)
          })
          .catch(() => { this.loading = false })
      })
    }
  }
})
