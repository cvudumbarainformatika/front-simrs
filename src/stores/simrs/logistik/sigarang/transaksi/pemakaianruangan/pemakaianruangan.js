import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'

export const usePemakaianRuanganStore = defineStore('pemakaian_ruangan_store', {
  state: () => ({
    loading: false,
    mapingbarang: []
  }),
  actions: {
    getInitialData() {
      this.getDataMaping()
    },
    getDataMaping() {
      this.loading = true
      return new Promise(resolve => {
        api.get('v1/mapingbarang/maping')
          .then(resp => {
            this.loading = false
            console.log('maping', resp)
            this.mapingbarang = resp.data
            resolve(resp)
          }).catch(() => {
            this.loading = false
          })
      })
    }
  }
})
