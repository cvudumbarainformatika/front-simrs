import { defineStore } from 'pinia'
import { date } from 'quasar'
import { api } from 'src/boot/axios'

export const useLaporanSigarangPenerimaanGudangStore = defineStore('laporan_sigarang_penerimaan_gudang', {
  state: () => ({
    loading: false,
    items: [],
    meta: {},
    params: {
      q: '',
      page: 1,
      per_page: 10,
      from: date.formatDate(Date.now(), 'YYYY-MM-01 00:00:00'),
      to: date.formatDate(Date.now(), 'YYYY-MM-DD 23-59-59'),
      kode_ruang: '',
      kode_rs: ''
    },
    gudang: { nama: 'Gudang Habis Pakai', value: 'Gd-02010100' },
    columns: [
      'tanggal',
      'no_penerimaan',
      'surat_jalan',
      'faktur',
      'perusahaan',
      'kode_rs',
      'nama_barang',
      'qty',
      'harga',
      'nilai',
      'status'
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
    mapingItem(val) {
      if (val.length) {
        const total = []
        val.forEach(item => {
          if (item.monthly.length) {
            item.monthly.forEach(a => { a.total = a.totalStok * a.harga })
            item.subtotal = item.monthly.map(a => a.total).reduce((a, b) => a + b, 0)
            total.push(item.subtotal)
          } else if (item.recent.length) {
            item.recent.forEach(a => { a.total = a.totalStok * a.harga })
            item.subtotal = item.recent.map(a => a.total).reduce((a, b) => a + b, 0)
            total.push(item.subtotal)
          }
        })
        this.items = val
        // console.log('total', total)
        this.total = total.reduce((a, b) => a + b, 0)
      }
    },
    getInitialData() {
      this.getDataTable()
    },
    async getDataTable() {
      this.loading = true
      const param = { params: this.params }
      await api.get('v1/simrs/laporan/sigarang/lappenerimaan-gudang', param)
        .then(resp => {
          this.loading = false
          console.log('data tabel', resp.data)
          this.meta = resp.data
          this.mapingItem(resp.data)
        })
        .catch(() => { this.loading = false })
    }
  }
})
