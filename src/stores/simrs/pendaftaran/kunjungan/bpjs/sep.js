import { defineStore } from 'pinia'

export const useSepBpjsStore = defineStore('sep_bpjs', {
  state: () => ({
    loading: false,
    isOpen: false
  }),
  actions: {
    setOpen() {
      this.isOpen = !this.isOpen
    }
  }
})
