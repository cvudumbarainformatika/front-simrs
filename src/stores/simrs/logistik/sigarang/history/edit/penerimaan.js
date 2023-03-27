import { defineStore } from 'pinia'

export const useEditPenerimaanStore = defineStore('edit_penerimaan', {
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
