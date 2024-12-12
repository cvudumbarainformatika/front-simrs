import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'

export const useListPengembalianPinjamanStore = defineStore('list_pengembalian_pinjaman', {
  state: () => ({
    loading: true,
    items: [],
    meta: {},
    params: {
      q: '',
      page: 1,
      per_page: 10
    }
  }),
  actions: {
    setParame (key, val) {
      this.params[key] = val
    },
    setPage (val) {
      this.setParame('page', val)
      this.getDataTable()
    },
    setSearch (val) {
      this.setParame('q', val)
      this.setParame('page', 1)
      this.getDataTable()
    },
    setPerPage (val) {
      this.setParame('per_page', val)
      this.setParame('page', 1)
      this.getDataTable()
    },
    refreshTable () {
      this.getDataTable()
    },
    getInitialData () {
      this.getDataTable()
    },
    getDataTable () {
      this.loading = true
      const param = { params: this.params }
      return new Promise(resolve => {
        api.get('v1/simrs/penunjang/farmasinew/pengembalian/get-list', param)
          .then(resp => {
            this.loading = false
            console.log('resp list', resp?.data)
            resolve(resp)
          })
          .catch(() => { this.loading = false })
      })
    }
  }
})
