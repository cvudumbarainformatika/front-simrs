import { defineStore } from 'pinia'
import { date } from 'quasar'
import { api } from 'src/boot/axios'

export const useLaporanSigarangPemakaianStore = defineStore('laporan_sigarang_pemakaian', {
  state: () => ({
    loading: false,
    items: [],
    meta: {},
    params: {
      q: '',
      page: 1,
      per_page: 10,
      from: date.formatDate(Date.now(), 'YYYY-MM-01'),
      to: date.formatDate(Date.now(), 'YYYY-MM-DD'),
      kode_ruang: '',
      kode_rs: null
    },
    display: {
      from: date.formatDate(Date.now(), '01 MMMM YYYY'),
      to: date.formatDate(Date.now(), 'DD MMMM YYYY')
    },
    gudangs: [
      { nama: 'Semua Depo', value: '' },
      { nama: 'Depo PNM', value: 'Gd-02010101' },
      { nama: 'Depo Gizi', value: 'Gd-02010102' },
      { nama: 'Depo Habis Pakai', value: 'Gd-02010103' }
    ],
    columns: [
      'ruang',
      'kode_rs',
      'nama',
      'satuan',
      'jumlah'
    ],
    total: 0
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
      // this.getBarang()
    },
    async getDataTable() {
      this.loading = true
      const param = { params: this.params }
      await api.get('v1/simrs/laporan/sigarang/pemakaian-ruangan', param)
        .then(resp => {
          this.loading = false
          console.log('data tabel', resp.data)
          this.meta = resp.data
          this.items = resp.data.data
          this.total = this.items.map(a => a.jumlah).reduce((a, b) => a + b, 0)
          console.log('total', this.total)
        })
        .catch(() => { this.loading = false })
    }
  }
})
