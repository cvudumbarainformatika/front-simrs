import { defineStore } from 'pinia'

export const usePrintIdResepStore = defineStore('print_id_resep', {
  state: () => ({
    isOpen: false,
    data: {}
  })
})
