const { defineStore } = require('pinia')

export const useListResepDokterStore = defineStore('lits_resep_dokter', {
  state: () => ({
    loading: false,
    items: [],
    meta: {}
  }),
  actions: {

    getInitialData() {},
    getData() {}
  }
})
