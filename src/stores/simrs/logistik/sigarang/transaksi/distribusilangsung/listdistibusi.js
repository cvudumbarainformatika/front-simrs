import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'

export const useListTransaksiDistribusiLangsung = defineStore('list_transaksi_distribusi_langsung', {
  state: () => ({
    loading: false,
    items: [],
    meta: {},
    params: {
      q: '',
      per_page: 10
    },
    columns: ['no_distribusi', 'tanggal', 'tujuan', 'pegawai']
  }),
  actions: {
    setParam(key, val) {
      this.params[key] = val
    },
    setSearch(payload) {
      this.setParam('q', payload)
      this.setParam('page', 1)
      this.getDataTabel()
    },
    setPage(payload) {
      this.setParam('page', payload)
      this.getDataTabel()
    },
    setPerPage(payload) {
      this.setParam('per_page', payload)
      this.setParam('page', 1)
      this.getDataTabel()
    },
    refreshTable() {
      this.setParam('page', 1)
      this.getDataTabel()
    },
    getInitialData() {
      this.getDataTabel()
    },
    //
    async getDataTabel() {
      this.loading = true
      const param = { params: this.params }
      await api('v1/transaksi/distribusilangsung/index', param)
        .then(resp => {
          console.log('res table', resp.data)
          this.items = resp.data.data
          this.meta = resp.data.meta
          this.loading = false
        })
        .catch(() => { this.loading = false })
    }
  }
})
