import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'

export const useListReturGudangStore = defineStore('list_retur_gudang', {
  state: () => ({
    loading: false,
    meta: {},
    items: [],
    params: {
      q: '',
      page: 1,
      per_page: 10
    },

    columns: [
      'no_retur',
      'tgl_retur',
      'depo',
      'gudang',
      'user',
      'status'
    ],
    columnsHide: []
  }),
  actions: {
    setParams (key, val) {
      this.params[key] = val
    },
    setSearch (val) {
      this.setParams('q', val)
      this.setParams('page', 1)
      this.getDataTable()
    },
    setPage (val) {
      this.setParams('page', val)
      this.getDataTable()
    },
    setPerPage (val) {
      this.setParams('per_page', val)
      this.setParams('page', 1)
      this.getDataTable()
    },
    refreshTable (val) {
      this.setParams('page', 1)
      this.getDataTable()
    },

    async getDataTable () {
      this.loading = true
      const param = { params: this.params }
      await api.get('v1/simrs/penunjang/farmasinew/gudang/list-retur', param)
        .then(resp => {
          this.loading = false
          console.log('list retur', resp?.data)
          this.items = resp?.data?.data ?? resp?.data
          this.meta = resp?.data?.meta ?? resp?.data
        })
    }
  }
})
