import { defineStore } from 'pinia'
import { date } from 'quasar'
import { api } from 'src/boot/axios'

export const useLaporanSigarangMutasiStore = defineStore('laporan_sigarang_mutasi', {
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
      'kode_108',
      'uraian_108',
      'kode',
      'nama',
      'satuan',
      'awal',
      'masuk',
      'keluar',
      'akhir'
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
    mapingItem(val) {
      if (val.length) {
        val.forEach(item => {
          const month = item.monthly.length ? item.monthly.map(a => a.totalStok).reduce((a, b) => a + b, 0).toFixed(2) : null
          const recen = item.recent.length ? item.recent.map(a => a.totalStok).reduce((a, b) => a + b, 0).toFixed(2) : null
          const hmonth = item.monthly.length ? item.monthly.map(a => a.totalRp).reduce((a, b) => a + b, 0).toFixed(2) : null
          const hrecen = item.recent.length ? item.recent.map(a => a.totalRp).reduce((a, b) => a + b, 0).toFixed(2) : null
          item.tAkhir = month ?? recen ?? 0
          item.htAkhir = hmonth ?? hrecen ?? 0

          const lang = item.detail_distribusi_langsung.length ? item.detail_distribusi_langsung.map(a => a.total).reduce((a, b) => a + b, 0).toFixed(2) : null
          const pakai = item.detail_pemakaianruangan.length ? item.detail_pemakaianruangan.map(a => a.total).reduce((a, b) => a + b, 0).toFixed(2) : null
          item.keluar = lang ?? pakai ?? 0

          if (item.detail_distribusi_langsung.length) {
            item.detail_distribusi_langsung.forEach(pak => {
              if (item.recent.length) {
                const har = item.recent.filter(a => a.no_penerimaan === pak.no_penerimaan && a.kode_rs === pak.kode_rs)
                if (har.length) {
                  pak.totalRp = har[0].harga * parseFloat(pak.total.toFixed(2))
                } else {
                  pak.totalRp = 0
                }
              }
            })
          }

          if (item.detail_pemakaianruangan.length) {
            item.detail_pemakaianruangan.forEach(pak => {
              if (item.recent.length) {
                const har = item.recent.filter(a => a.no_penerimaan === pak.no_penerimaan && a.kode_rs === pak.kode_rs)
                if (har.length) {
                  pak.totalRp = har[0].harga * pak.total
                } else {
                  pak.totalRp = 0
                }
              }
            })
          }

          const hlang = item.detail_distribusi_langsung.length ? item.detail_distribusi_langsung.map(a => a.totalRp).reduce((a, b) => a + b, 0).toFixed(2) : null
          const hpakai = item.detail_pemakaianruangan.length ? item.detail_pemakaianruangan.map(a => a.totalRp).reduce((a, b) => a + b, 0).toFixed(2) : null
          item.hKeluar = hlang ?? hpakai ?? 0

          item.awal = item.stok_awal.length ? item.stok_awal.map(a => a.totalStok).reduce((a, b) => a + b, 0).toFixed(2) : 0
          item.hAwal = item.stok_awal.length ? item.stok_awal.map(a => a.totalRp).reduce((a, b) => a + b, 0).toFixed(2) : 0

          item.masuk = item.detail_penerimaan.length ? item.detail_penerimaan.map(a => a.total).reduce((a, b) => a + b, 0).toFixed(2) : 0
          item.hMasuk = item.detail_penerimaan.length ? item.detail_penerimaan.map(a => a.totalRp).reduce((a, b) => a + b, 0).toFixed(2) : 0

          item.akhir = parseFloat(item.awal) + parseFloat(item.masuk) - parseFloat(item.keluar)
          item.hAkhir = parseFloat(item.hAwal) + parseFloat(item.hMasuk) - parseFloat(item.hKeluar)
        })
        this.items = val
        this.total = val.map(a => a.hAkhir).reduce((a, b) => a + b, 0)
        this.tTotal = val.map(a => parseFloat(a.htAkhir)).reduce((a, b) => a + b, 0)
        console.log('items', val)
      }
    },
    getInitialData() {
      this.getDataTable()
    },
    async getDataTable() {
      this.loading = true
      const param = { params: this.params }
      await api.get('v1/simrs/laporan/sigarang/lap-mutasi', param)
        .then(resp => {
          this.loading = false
          // console.log('data tabel', resp.data)
          this.meta = resp.data
          this.mapingItem(resp.data)
        })
        .catch(() => { this.loading = false })
    }
  }
})
