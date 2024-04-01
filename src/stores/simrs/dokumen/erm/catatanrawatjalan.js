import { defineStore } from 'pinia'

export const useCatatanRawatJalanStore = defineStore('erm_catatanrawatjalan', {
  state: () => ({
    loading: false,
    items: {},
    params: {

    },
    paramshistory: {
      tahunawal: [],
      tahunakhir: [],
      norm: {}
    }
  }),
  actions: {
    carikunjungan(val) {
      if (val) {
        this.paramshistory.tahunawal = val
      }
    }

  }
})
