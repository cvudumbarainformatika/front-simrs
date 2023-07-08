import { defineStore } from 'pinia'

export const usePemesananObatStore = defineStore('pemesanan_obat_store', {
  state: () => ({
    loading: false,
    items: [],
    columns: [],
    columnHide: ['id', 'created_at', 'updated_at', 'deleted_at']
  }),
  actions: {}
})
