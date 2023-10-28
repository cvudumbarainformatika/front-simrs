import { defineStore } from 'pinia'
import { date } from 'quasar'
import { api } from 'src/boot/axios'

export const useLaporanSigarangPengeluaranStore = defineStore('laporan_sigarang_pengeluaran', {
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
      'kode',
      'nama',
      'satuan',
      'jumlah',
      'jumlah_disetujui',
      'jumlah_distribusi'
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
    mapingitem(val) {
      const temp = val ?? []

      if (temp.length) {
        temp.forEach(item => {
          item.jumlah = 0
          item.jumlah_distribusi = 0
          item.jumlah_disetujui = 0
          item.satuan = item.satuan?.nama
          if (item.detail_permintaanruangan.length) {
            item.jumlah = item.detail_permintaanruangan.map(m => m.jumlah).reduce((a, b) => a + b, 0)
            item.jumlah_disetujui = item.detail_permintaanruangan.map(m => m.jumlah_disetujui).reduce((a, b) => a + b, 0)
            item.jumlah_distribusi = item.detail_permintaanruangan.map(m => m.jumlah_distribusi).reduce((a, b) => a + b, 0)
          }
          if (item.detail_distribusi_langsung.length) {
            item.jumlah_distribusi = item.detail_distribusi_langsung.map(m => m.jumlah_distribusi).reduce((a, b) => a + b, 0)
            item.jumlah_disetujui = item.jumlah_distribusi
            item.jumlah = item.jumlah_distribusi
          }
        })
      }

      this.total = temp.map(m => m.jumlah_distribusi).reduce((a, b) => a + b, 0)
      this.items = temp
    },
    async getDataTable() {
      this.loading = true
      const param = { params: this.params }
      await api.get('v1/simrs/laporan/sigarang/pengeluaran-depo-new', param)
        .then(resp => {
          this.loading = false
          console.log('data tabel', resp)
          this.meta = resp.data
          this.mapingitem(resp.data.data)
          // this.items = resp.data.data ?? []
          // console.log('type', typeof this.items)
          // if (this.items.length) {
          //   this.total = this.items.map(a => {
          //     if (a.jumlah_distribusi > 0) {
          //       return a.jumlah_distribusi
          //     } else if (a.jumlah_distribusi_l > 0) {
          //       return a.jumlah_distribusi_l
          //     } else { return 0 }
          //   }).reduce((a, b) => a + b, 0)
          // }
          // console.log('total', this.total)
        })
        .catch(() => { this.loading = false })
    }
  }
})
