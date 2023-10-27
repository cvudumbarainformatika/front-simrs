import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'

export const useLaporanSigarangHutangStore = defineStore('laporan_sigarang_hutang', {
  state: () => ({
    loading: false,
    items: [],
    meta: {},
    params: {
      q: '',
      per_page: 10,
      page: 1
    },
    columns: [
      'penyedia',
      'nilai'
    ],
    total: 0,
    tTotal: 0
  }),
  actions: {
    setParams(key, val) {
      this.params[key] = val
    },
    setSearch(payload) {
      this.setParams('q', payload)
      this.setParams('page', 1)
      this.getDataTable()
    },
    setPage(payload) {
      this.setParams('page', payload)
      this.getDataTable()
    },
    setPerPage(payload) {
      this.setParams('per_page', payload)
      this.setParams('page', 1)
      this.getDataTable()
    },
    refreshTable() {
      this.setParams('page', 1)
      this.getDataTable()
    },
    getInitialData() {
      this.getDataTable()
    },
    mapingData(val) {
      const temp = val
      if (temp.length) {
        temp.forEach(item => {
          item.nilai = 0
          if (item.penerimaan.length) {
            item.nilai = item.penerimaan.map(c => {
              return c.nilai_tagihan > 0 ? c.nilai_tagihan : c.total
            }).reduce((a, b) => a + b, 0)
          }
        })
        this.total = temp.map(c => c.nilai).reduce((a, b) => a + b, 0)
      }
      this.items = temp
    },
    async getDataTable() {
      this.loading = true
      const param = { params: this.params }
      await api.get('v1/simrs/laporan/sigarang/laphutang', param)
        .then(resp => {
          this.loading = false
          console.log('data tabel', resp.data)
          this.mapingData(resp.data)
        })
        .catch(() => { this.loading = false })
    }
  }
})
