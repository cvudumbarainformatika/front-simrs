import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'

export const useListPemakaianObatKonsinyasiStore = defineStore('list_pemakaian_obat_konsinyasi', {
  state: () => ({
    loading: false,
    params: {
      q: '',
      page: 1,
      per_page: 50
    }
  }),
  actions: {
    getInitialData() {
      this.getData()
    },
    async getData() {
      this.loading = true
      const param = { params: this.params }
      await api.get('v1/simrs/penunjang/farmasinew/gudang/list-pemakaian-konsinyasi', param)
        .then(resp => {
          this.loading = false
          console.log('list kon', resp?.data)
        })
        .catch(() => {
          this.loading = false
        })
    }
  }
})
