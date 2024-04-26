import { defineStore } from 'pinia'

export const useFormBarangRusakStore = defineStore('form_barang_rusak', {
  state: () => ({
    loading: false,
    params: {
      per_page: 10
    },
    form: {}
  }),
  actions: {
    setParams(key, val) {
      this.params[key] = val
    },
    setForm(key, val) {
      this.form[key] = val
    },

    getInitialData() {
      // this.getPerusahan()
    }
  }
})
