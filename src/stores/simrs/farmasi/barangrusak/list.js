import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'

export const useListBarangRusakStore = defineStore('list_barang_rusak', {
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
      'obat',
      'nomor',
      'tanggal',
      'penyedia',
      'jumlah',
      'harga',
      'nilai'
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
      this.getList()
    },
    setPage(payload) {
      this.setParam('page', payload)
      this.getList()
    },
    setPerPage(payload) {
      this.setParam('per_page', payload)
      this.setParam('page', 1)
      this.getList()
    },
    refreshTable() {
      this.setParam('page', 1)
      this.getList()
    },
    getInitialData() {
      this.getList()
    },
    getList() {
      this.loading = true
      const param = { params: this.param }
      return new Promise(resolve => {
        api.get('v1/simrs/penunjang/farmasinew/barangrusak/list-sudah', param)
          .then(resp => {
            this.loading = false
            console.log('list retur', resp.data)
            this.items = resp.data.data
            this.meta = resp.data.meta

            resolve(resp)
          })
          .catch(() => { this.loading = false })
      })
    }
  }
})
