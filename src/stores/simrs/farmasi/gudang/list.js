import { defineStore } from 'pinia'

export const useListReturPenyediaStore = defineStore('list_retur_penyedia', {
  state: () => ({
    loading: false,
    items: [],
    param: {
      per_page: 10
    },
    form: {
      nopemesanan: ''
    }
  }),
  actions: {
    getInitialData() {}
  }
})
