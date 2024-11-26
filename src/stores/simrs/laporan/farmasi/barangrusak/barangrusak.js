import { defineStore } from 'pinia'
import { date } from 'quasar'
import { api } from 'src/boot/axios'

export const useLaporanBarangRusakStore = defineStore('laporan_barang_rusak', {
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
      kode_ruang: 'all'
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
      { nama: 'Semua', value: 'all' },
      { nama: 'Gudang Farmasi ( Kamar Obat )', value: 'Gd-05010100' },
      { nama: 'Gudang Farmasi (Floor Stok)', value: 'Gd-03010100' }
    ]
  }),
  actions: {
    setParams (key, val) {
      this.params[key] = val
    },
    setPage (val) {
      this.setParams('page', val)
      this.getData()
    },
    setSearch (val) {
      this.setParams('q', val)
      this.getData()
    },
    getData () {
      return new Promise(resolve => {
        this.loading = true
        api.get('v1/simrs/laporan/farmasi/barangrusak/get-data', { params: this.params })
          .then(res => {
            console.log('res laporan barang rusak', res)
            this.loading = false
            this.items = res.data.data
            this.meta = res.data.meta
            resolve(res)
          })
          .catch(() => { this.loading = false })
      })
    }
  }
})
