import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'

export const useListPembayaranPenerimaanStore = defineStore('list_pembayaran_penerimaan', {
  state: () => ({
    loading: false,
    items: [],
    meta: {},
    param: {
      q: '',
      page: 1,
      per_page: 10
    },
    columns: [
      'nomor',
      'tanggal',
      'info',
      'nilai',
      'oleh'
    ],
    columnHide: []
  }),
  actions: {
    setParam(key, val) {
      this.param[key] = val
    },
    setSearch(payload) {
      this.setParam('q', payload)
      this.setParam('page', 1)
      this.getListBast()
    },
    setPage(payload) {
      this.setParam('page', payload)
      this.getListBast()
    },
    setPerPage(payload) {
      this.setParam('per_page', payload)
      this.setParam('page', 1)
      this.getListBast()
    },
    refreshTable() {
      this.setParam('page', 1)
      this.getListBast()
    },

    getInitialData() {
      this.getListBast()
    },
    getListBast() {
      this.loading = true
      const param = { params: this.param }
      return new Promise(resolve => {
        api.get('v1/transaksi/pembayaran/list-bayar', param)
          .then(resp => {
            this.loading = false
            console.log('list bast', resp.data)
            this.items = resp.data.data
            this.meta = resp.data
            resolve(resp)
          })
          .catch(() => { this.loading = false })
      })
    }
  }
})
