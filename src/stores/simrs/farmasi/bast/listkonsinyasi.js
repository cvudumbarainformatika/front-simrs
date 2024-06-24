import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'

export const useListBastKonsinyasiFarmasiStore = defineStore('list_bast_konsinyasi_farmasi', {
  state: () => ({
    loading: false,
    items: [],
    meta: {},
    params: {
      q: '',
      page: 1,
      per_page: 10
    },
    columns: [
      'penyedia',
      'nomor',
      'tanggal',
      'total',
      'oleh'
    ],
    columnHide: []
  }),
  actions: {

    setParams (key, val) {
      this.params[key] = val
    },
    refreshTable () {
      this.setParams('page', 1)
      this.getData()
    },
    setPage (val) {
      this.setParams('page', val)
      this.getData()
    },
    setPerPage (val) {
      this.setParams('per_page', val)
      this.setParams('page', 1)
      this.getData()
    },
    setSearch (val) {
      this.setParams('q', val)
      this.setParams('page', 1)
      this.getData()
    },
    getInitialData () {
      this.getData()
    },
    async getData () {
      this.items = []
      this.loading = true
      const param = { params: this.params }
      await api.get('v1/simrs/penunjang/farmasinew/bast-konsi/bast-konsi', param)
        .then(resp => {
          this.loading = false
          console.log('list kon', resp?.data)
          this.items = resp?.data?.data ?? resp?.data
          this.meta = resp?.data?.meta ?? resp?.data
        })
        .catch(() => {
          this.loading = false
        })
    }
  }
})
