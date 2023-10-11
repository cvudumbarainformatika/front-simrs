import { defineStore } from 'pinia'
import { date } from 'quasar'
import { api } from 'src/boot/axios'

export const useLaporanSigarangPersediaanFifoStore = defineStore('laporan_sigarang_persediaan_fifo', {
  state: () => ({
    loading: false,
    items: [],
    meta: {},
    params: {
      q: '',
      per_page: 10,
      page: 1,
      bulan: date.formatDate(Date.now(), 'MM'),
      tahun: date.formatDate(Date.now(), 'YYYY'),
      kode_ruang: '',
      kode_rs: ''
    },
    bulans: [
      { nama: 'January', value: '01' },
      { nama: 'February', value: '02' },
      { nama: 'Maret', value: '03' },
      { nama: 'April', value: '04' },
      { nama: 'Mei', value: '05' },
      { nama: 'February', value: '06' },
      { nama: 'Juni', value: '06' },
      { nama: 'Juli', value: '07' },
      { nama: 'Agustus', value: '08' },
      { nama: 'September', value: '09' },
      { nama: 'Oktober', value: '10' },
      { nama: 'November', value: '11' },
      { nama: 'Desember', value: '12' }
    ],
    gudangs: [
      { nama: 'Semua Depo', value: '' },
      { nama: 'Gudang Habis Pakai', value: 'Gd-02010100' },
      { nama: 'Depo PNM', value: 'Gd-02010101' },
      { nama: 'Depo Gizi', value: 'Gd-02010102' },
      { nama: 'Depo Habis Pakai', value: 'Gd-02010103' }
    ],
    columns: [
      'kode',
      'nama',
      'satuan',
      'qty'
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
      await api.get('v1/simrs/laporan/sigarang/lappersediaan', param)
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
