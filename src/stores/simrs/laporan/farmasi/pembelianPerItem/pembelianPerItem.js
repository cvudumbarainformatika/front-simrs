import { defineStore } from 'pinia'
import { date } from 'quasar'

export const useLaporanPembelianPerItemStore = defineStore('laporan_pembelian_per_item', {
  state: () => ({
    loading: false,
    loadingDownload: false,
    items: [],
    params: {
      q: '',
      page: 1,
      per_page: 10,
      kode_ruang: 'all',
      bulan: date.formatDate(Date.now(), 'MM'),
      tahun: date.formatDate(Date.now(), 'YYYY')
    },
    fields: {},

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
      { nama: 'Semua', value: 'all' },
      { nama: 'Gudang Farmasi ( Kamar Obat )', value: 'Gd-05010100' },
      { nama: 'Gudang Farmasi (Floor Stok)', value: 'Gd-03010100' }
    ]
  }),
  actions: {
    setParams (key, val) {
      this.params[key] = val
    },
    setSearch (payload) {
      console.log(this.params.q)
      // this.setParams('q', payload)
      this.items = []
      this.setParams('page', 1)
      this.getDataTable()
    },
    getInitialData (val) {
      console.log('getInitialData', val)
    },
    getDataTable () {},
    fetch () {}
  }
})
