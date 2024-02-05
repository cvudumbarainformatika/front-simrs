import { defineStore } from 'pinia'

export const useListVerifikasiRencanaPesanStore = defineStore('list_verifikasi_rencana_pemesanan', {
  state: () => ({
    loading: false,
    items: [],
    meta: {},
    params: {
      q: '',
      page: 1,
      per_page: 10
    }
  }),
  actions: {
    setForm(key, val) {
      this.form[key] = val
    },
    setParams(key, val) {
      this.params[key] = val
    }
  }
})
