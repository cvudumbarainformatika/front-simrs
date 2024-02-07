import { defineStore } from 'pinia'
import { date } from 'quasar'
import { api } from 'src/boot/axios'

export const useLaporanSigarangMutasiDepoStore = defineStore('laporan_sigarang_mutasi_depo', {
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
      kode_ruang: 'all',
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
      { nama: 'Semua Depo', value: 'all' },
      { nama: 'Depo PNM', value: 'Gd-02010101' },
      { nama: 'Depo Gizi', value: 'Gd-02010102' },
      { nama: 'Depo Habis Pakai', value: 'Gd-02010103' }
    ],
    columns: [
      'kode_108',
      'uraian_108',
      'kode',
      'nama',
      'awal',
      'masuk',
      'keluar',
      'sisa',
      'satuan',
      'hawal',
      'hmasuk',
      'hkeluar',
      'hsisa'

    ],
    columnsHide: [
      'hawal',
      'hmasuk',
      'hkeluar',
      'hsisa'

    ],
    total: 0,
    tTotal: 0,
    htotal: 0,
    htTotal: 0
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
          const pakai = item.detail_permintaanruangan.length ? item.detail_permintaanruangan.map(a => a.total).reduce((a, b) => a + b, 0).toFixed(2) : null
          item.keluar = lang ?? pakai ?? 0

          if (item.detail_distribusi_langsung.length) {
            item.detail_distribusi_langsung.forEach(pak => {
              pak.rtotalRp = 0
              if (pak.stokruangan.length) {
                const har = pak.stokruangan.filter(a => a.no_penerimaan === pak.no_penerimaan && a.kode_rs === pak.kode_rs)
                if (har.length) {
                  pak.harga = har[0].harga
                  pak.rtotalRp = har[0].harga * pak.total
                }
              }
              // if (item.stok_awal.length) {
              //   const har = item.stok_awal.filter(a => a.no_penerimaan === pak.no_penerimaan && a.kode_rs === pak.kode_rs)
              //   if (har.length) {
              //     pak.harga = har[0].harga
              //     pak.atotalRp = har[0].harga * pak.total
              //   }
              // }
              // if (item.monthly.length) {
              //   const har = item.monthly.filter(a => a.no_penerimaan === pak.no_penerimaan && a.kode_rs === pak.kode_rs)
              //   if (har.length) {
              //     pak.harga = har[0].harga
              //     pak.mtotalRp = har[0].harga * pak.total
              //   }
              // }
              pak.totalRp = pak.rtotalRp
            })
          }

          if (item.detail_permintaanruangan.length) {
            item.detail_permintaanruangan.forEach(pak => {
              pak.rtotalRp = 0
              pak.trmQty = 0
              pak.harga = []
              const trm = pak?.permintaanruangan?.penerimaan
              if (trm.length) {
                const temp = trm.filter(anu => anu.kode_rs === pak.kode_rs)
                const terHar = []
                if (temp.length) {
                  temp.forEach(ter => {
                    if (ter.stokruangan.length) {
                      const har = ter.stokruangan.filter(a => a.no_penerimaan === ter.no_penerimaan && a.kode_rs === ter.kode_rs)
                      if (har.length) {
                        pak.harga.push(har[0].harga)
                        terHar.push(har[0].harga * ter.jumlah)
                      }
                    }
                  })
                  pak.rtotalRp = terHar.length ? terHar.reduce((a, b) => a + b, 0) : 0
                  pak.trmQty = temp.map(c => c.jumlah).reduce((a, b) => a + b, 0)
                }
              }
              // if (item.stok_awal.length) {
              //   const har = item.stok_awal.filter(a => a.no_penerimaan === pak.no_penerimaan && a.kode_rs === pak.kode_rs)
              //   if (har.length) {
              //     pak.harga = har[0].harga
              //     pak.atotalRp = har[0].harga * pak.total
              //   }
              // }
              // if (item.monthly.length) {
              //   const har = item.monthly.filter(a => a.no_penerimaan === pak.no_penerimaan && a.kode_rs === pak.kode_rs)
              //   if (har.length) {
              //     pak.harga = har[0].harga
              //     pak.mtotalRp = har[0].harga * pak.total
              //   }
              // }
              pak.totalRp = pak.rtotalRp
            })
          }
          if (item.detail_distribusi_depo.length) {
            item.detail_distribusi_depo.forEach(pak => {
              pak.rtotalRp = 0
              if (pak.recent.length) {
                const har = pak.recent.filter(a => a.no_penerimaan === pak.no_penerimaan && a.kode_rs === pak.kode_rs)
                if (har.length) {
                  pak.harga = har[0].harga
                  pak.rtotalRp = har[0].harga * pak.total
                }
              }
              // if (item.stok_awal.length) {
              //   const har = item.stok_awal.filter(a => a.no_penerimaan === pak.no_penerimaan && a.kode_rs === pak.kode_rs)
              //   if (har.length) {
              //     pak.harga = har[0].harga
              //     pak.atotalRp = har[0].harga * pak.total
              //   }
              // }
              // if (item.monthly.length) {
              //   const har = item.monthly.filter(a => a.no_penerimaan === pak.no_penerimaan && a.kode_rs === pak.kode_rs)
              //   if (har.length) {
              //     pak.harga = har[0].harga
              //     pak.mtotalRp = har[0].harga * pak.total
              //   }
              // }
              pak.totalRp = pak.rtotalRp
            })
          }

          const hlang = item.detail_distribusi_langsung.length ? item.detail_distribusi_langsung.map(a => a.totalRp).reduce((a, b) => a + b, 0).toFixed(2) : null
          const hpakai = item.detail_permintaanruangan.length ? item.detail_permintaanruangan.map(a => a.totalRp).reduce((a, b) => a + b, 0).toFixed(2) : null
          item.hKeluar = hlang ?? hpakai ?? 0

          item.trmru = item.detail_permintaanruangan.length ? item.detail_permintaanruangan.map(a => a.trmQty).reduce((a, b) => a + b, 0).toFixed(2) : null

          item.awal = item.stok_awal.length ? item.stok_awal.map(a => a.totalStok).reduce((a, b) => a + b, 0).toFixed(2) : 0
          item.hAwal = item.stok_awal.length ? item.stok_awal.map(a => a.totalRp).reduce((a, b) => a + b, 0).toFixed(2) : 0

          item.masuk = item.detail_distribusi_depo.length ? item.detail_distribusi_depo.map(a => a.total).reduce((a, b) => a + b, 0).toFixed(2) : 0
          item.hMasuk = item.detail_distribusi_depo.length ? item.detail_distribusi_depo.map(a => a.totalRp).reduce((a, b) => a + b, 0).toFixed(2) : 0

          item.akhir = parseFloat(item.awal) + parseFloat(item.masuk) - parseFloat(item.keluar)
          item.hAkhir = parseFloat(item.hAwal) + parseFloat(item.hMasuk) - parseFloat(item.hKeluar)
        })
        this.items = val
        this.total = val.map(a => a.akhir).reduce((a, b) => a + b, 0)
        this.tTotal = val.map(a => parseFloat(a.tAkhir)).reduce((a, b) => a + b, 0)
        this.htotal = val.map(a => a.hAkhir).reduce((a, b) => a + b, 0)
        this.htTotal = val.map(a => parseFloat(a.htAkhir)).reduce((a, b) => a + b, 0)
        console.log('items', val)
      }
    },
    getInitialData() {
      this.getDataTable()
    },
    async getDataTable() {
      this.meta = {}
      this.items = []
      this.loading = true
      const param = { params: this.params }
      await api.get('v1/simrs/laporan/sigarang/lap-mutasi-depo', param)
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
