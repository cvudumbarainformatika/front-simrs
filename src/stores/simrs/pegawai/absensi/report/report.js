import { defineStore } from 'pinia'

export const useReportAbsensiStore = defineStore('report_absensi', {
  state: () => ({
    loading: true,
    isOpen: false,
    items: [],
    meta: {},
    columns: [],
    columnHide: ['id', 'created_at', 'updated_at'],
    form: {},
    deleteId: null,
    params: {
      q: '',
      page: 1,
      per_page: 10,
      order_by: 'created_at',
      sort: 'asc'
    }
    // custom for this store
  }),
  actions: {
    // table related function
  }
})
