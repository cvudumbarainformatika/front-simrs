import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'

export const useKartuStokBarangRusakStore = defineStore('kartu_stok_barang_rusak', {
  state: () => ({
    loading: false,
    items: [],
    meta: {},
    params: {
      q: '',
      kdobat: '',
      kdruang: '',
      page: 1,
      per_page: 10
    }
  }),
  actions: {
    setParams (key, val) {
      this.params[key] = val
    },
    async getItems () {
      this.loading = true
      this.items = []
      await api.get('/v1/simrs/penunjang/farmasinew/barangrusak/kartu-stok', { params: this.params })
        .then(resp => {
          this.loading = false
          console.log('kartu stok', resp?.data)
          this.items = resp.data.data
          this.meta = resp.data.meta
        })
        .catch(() => {
          console.log('error get data')

          this.loading = false
        })
    }
  }
})
