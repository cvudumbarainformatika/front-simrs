import { defineStore } from 'pinia'

export const useEdukasiPoliStore = defineStore('edukasi-poli', {
  state: () => ({
    counter: 0
  }),
  getters: {
    doubleCount: (state) => state.counter * 2
  },
  actions: {
    getMaster() {
      //
    }
  }
})
