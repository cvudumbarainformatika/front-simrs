import { defineStore } from 'pinia'

export const useTinjauanUlangStore = defineStore('tinjauan_ulang_store', {
  state: () => ({
    loadingForm: false,
    basic: false,
    form: {
      skornadi: 0,
      pernafasan: 0,
      sistole: 0,
      distole: 0,
      suhu: 0,
      spo2: 0

    }
  }),
  actions: {

  }
})
