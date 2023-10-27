import { defineStore } from 'pinia'
import { date } from 'quasar'
import { api } from 'src/boot/axios'

export const useLaporanSigarangPenerimaanDepoStore = defineStore('laporan_sigarang_penerimaan_depo', {
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
      kode_ruang: 'all',
      kode_rs: ''
    },
    display: {
      from: date.formatDate(Date.now(), '01 MMMM YYYY'),
      to: date.formatDate(Date.now(), 'DD MMMM YYYY')
    },
    gudangs: [
      { nama: 'Semua Depo', value: 'all' },
      { nama: 'Depo PNM', value: 'Gd-02010101' },
      { nama: 'Depo Gizi', value: 'Gd-02010102' },
      { nama: 'Depo Habis Pakai', value: 'Gd-02010103' }],
    columns: [
      'kode',
      'nama',
      'satuan',
      'qty',
      'harga',
      'sub_total'
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
    },
    mapingItem(val) {
      const temp = val
      if (temp.length) {
        temp.forEach(bar => {
          bar.qty = 0
          bar.harga = 0
          bar.sub_total = 0
          bar.satuan = bar.satuan?.nama
          if (bar.detail_distribusi_depo.length) {
            bar.detail_distribusi_depo.forEach(det => {
              const har = det.recent.filter(a => a.kode_rs === det.kode_rs)
              det.harga = 0
              det.sub = 0
              if (har.length) {
                det.harga = har[0].harga
                det.sub = det.jumlah * det.harga
              }
              bar.harga = det.harga
            })
            bar.qty = bar.detail_distribusi_depo.map(v => v.jumlah).reduce((a, b) => a + b, 0)
            bar.sub_total = bar.detail_distribusi_depo.map(v => v.sub).reduce((a, b) => a + b, 0)
          }
        })
      }
      this.total = temp.map(su => su.sub_total).reduce((a, b) => a + b, 0)
      this.items = temp
    },
    async getDataTable() {
      this.loading = true
      const param = { params: this.params }
      await api.get('v1/simrs/laporan/sigarang/lappenerimaan-depo-new', param)
        .then(resp => {
          this.loading = false
          console.log('data tabel', resp.data)
          this.meta = resp.data
          this.mapingItem(resp.data.data)
          // this.items = resp.data.data
          // this.total = this.items.map(a => a.sub_total).reduce((a, b) => a + b, 0)
        })
        .catch(() => { this.loading = false })
    }
  }
})
