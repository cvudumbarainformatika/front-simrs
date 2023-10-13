import { defineStore } from 'pinia'
import { date } from 'quasar'
import { api } from 'src/boot/axios'

export const useLaporanKeuanganInacbgStore = defineStore('laporan_keuangan_inacbg', {
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
      rawat: ''
    },
    display: {
      from: date.formatDate(Date.now(), '01 MMMM YYYY'),
      to: date.formatDate(Date.now(), 'DD MMMM YYYY')
    },
    gudangs: [{ nama: 'Gudang Habis Pakai', value: 'Gd-02010100' }],
    columns: [
      'sep',
      'nama',
      'diagnosa_rs',
      'tindakan_rs',
      'icd10_utama',
      'icd9',
      'tarif'
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
    async getDataTable() {
      this.loading = true
      const param = { params: this.params }
      await api.get('v1/simrs/laporan/sigarang/lappenerimaan-gudang', param)
        .then(resp => {
          this.loading = false
          console.log('data tabel', resp.data)
          this.meta = resp.data
          this.items = resp.data.data
          this.total = this.items.map(a => a.sub_total).reduce((a, b) => a + b, 0)
          // this.mapingItem(resp.data)
        })
        .catch(() => { this.loading = false })
    }
  }
})
