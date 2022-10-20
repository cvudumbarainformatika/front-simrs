import { defineStore } from 'pinia'

export const useTransaksiPermintaanTable = defineStore('table_transaksi_permintaan', {
  state: () => ({
    loading: false,
    items: [],
    meta: {},
    columns: [],
    columnHide: [],
    form: {},
    params: {
      q: '',
      page: 1,
      per_page: 10,
      order_by: 'id',
      sort: 'desc'
    }
  }),
  actions: {
    setPage(val) {},
    setPerPage(val) {},
    refreshTable() {},
    setSearch(val) {},
    setOder(val) {},
    deletesData(val) {}
  }
})
