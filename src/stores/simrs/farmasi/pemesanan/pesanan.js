import { defineStore } from 'pinia'
import { date } from 'quasar'

export const usePemesananObatStore = defineStore('pemesanan_obat_store', {
  state: () => ({
    loading: false,
    items: [],
    param: {
      no_rencbeliobat: '',
      per_page: 10,
      tanggal: date.formatDate(Date.now(), 'YYYY-MM-DD')
    },
    form: {
      tanggal: date.formatDate(Date.now(), 'YYYY-MM-DD'),
      no_rencbeliobat: ''
    },
    disp: {
      tanggal: date.formatDate(Date.now(), 'DD MMMM YYYY')
    },
    columns: [],
    columnHide: ['id', 'created_at', 'updated_at', 'deleted_at']
  }),
  actions: {
    getInitialData() {}
  }
})
