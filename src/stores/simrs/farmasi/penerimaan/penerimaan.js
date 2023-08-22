import { defineStore } from 'pinia'

export const usePenerimaanFarmasiStore = defineStore('farmasi_penerimaan', {
  state: () => ({
    loading: false,
    form: {
      nopenerimaan: ''
    }
  }),
  actions: {
    getInitialData() {},
    selesaiDanKunci() {}
  }
})
