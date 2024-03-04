import { defineStore } from 'pinia'
import { date } from 'quasar'
import { api } from 'src/boot/axios'

export const useLaporanSigarangRekapPemasukanStore = defineStore('laporan_sigarang_rekap_pemasukan', {
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
      year: date.formatDate(Date.now(), 'YYYY'),
      kode_ruang: '',
      kode_rs: null,
      ruang: ''
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
    ruangs: [],
    columns: [
      'kode',
      'nama',
      'satuan',
      '01',
      '02',
      '03',
      '04',
      '05',
      '06',
      '07',
      '08',
      '09',
      '10',
      '11',
      '12',
      'Total'
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
      const bulan = [
        '01',
        '02',
        '03',
        '04',
        '05',
        '06',
        '07',
        '08',
        '09',
        '10',
        '11',
        '12'

      ]
      if (temp.length) {
        temp.forEach(item => {
          item.Total = 0
          item.satuan = item.satuan?.nama
          bulan.forEach(bul => {
            item[bul] = 0
            if (item.detail_distribusi_depo.length) {
              const it = item.detail_distribusi_depo.filter(f => date.formatDate(f?.tanggal, 'MM') === bul)
              if (it.length) {
                item[bul] = it.map(m => m.jumlah).reduce((a, b) => a + b, 0)
              }
            }
            // if (item.detail_distribusi_langsung.length) {
            //   const it = item.detail_distribusi_langsung.filter(f => date.formatDate(f?.tanggal, 'MM') === bul)
            //   if (it.length) {
            //     item[bul] = it.map(m => m.jumlah).reduce((a, b) => a + b, 0)
            //   }
            // }
            item.Total += item[bul]
            // console.log('bul sum', item.Total, item[bul])
          })
        })
      }

      this.total = temp.map(m => m.jumlah).reduce((a, b) => a + b, 0)
      this.items = temp
      console.log('items', this.items)
    },
    async getDataTable() {
      this.loading = true
      const param = { params: this.params }
      await api.get('v1/simrs/laporan/sigarang/lap-masuk-depo', param)
        .then(resp => {
          this.loading = false
          console.log('data tabel', resp?.data)
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
