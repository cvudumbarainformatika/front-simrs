import { defineStore } from 'pinia'

export const useTransaksiDistribusiLangsung = defineStore('transaksi_distribusi_langsung', {
  state: () => ({
    loading: false,
    form: {}
  }),
  actions: {
    setForm(index, val) {
      this.form[index] = val
    }
  }
})
