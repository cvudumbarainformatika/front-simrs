import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'

export const useKartuStokFarmasiStore = defineStore('kartu_stok_farmasi', {
  state: () => ({
    meta: null,
    items: [],
    params: {
      q: '',
      bulan: '01',
      tahun: 2024,
      per_page: 20,
      page: 1
    },
    loading: false
  }),
  actions: {
    async getData() {
      this.loading = true
      const params = { params: this.params }
      const resp = await api.get('v1/simrs/farmasinew/kartustok/listobat', params)
      if (resp.status === 200) {
        this.loading = false
        this.meta = resp.data
        this.items = resp.data.data
        // console.log('kjkjsdfs', this.items)
        console.log('kjkjsdfs', resp)
      } else {
        this.loading = false
      }
    },
    setTahun(val) {
      this.params.tahun = val
    }

  }
})
