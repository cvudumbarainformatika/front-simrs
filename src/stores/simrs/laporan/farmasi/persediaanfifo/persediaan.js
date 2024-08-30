import { defineStore } from 'pinia'
import { date } from 'quasar'
import { api } from 'src/boot/axios'

export const useLaporanPersediaanFiFoFarmasiStore = defineStore('laporan_persediaan_fifo_farmasi', {
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

      { nama: 'Rumah Sakit', value: 'all' },
      // { nama: 'Gudang dan Depo', value: 'gudep' },
      { nama: 'Gudang Farmasi ( Kamar Obat )', value: 'Gd-05010100' },
      { nama: 'Gudang Farmasi (Floor Stok)', value: 'Gd-03010100' },
      { nama: 'Floor Stock 1 (AKHP)', value: 'Gd-03010101' },
      { nama: 'Depo Rawat inap', value: 'Gd-04010102' },
      { nama: 'Depo OK', value: 'Gd-04010103' },
      { nama: 'Depo Rawat Jalan', value: 'Gd-05010101' },
      { nama: 'Depo IGD', value: 'Gd-02010104' }

    ],
    total: 0,
    tTotal: 0,
    htotal: 0,
    htTotal: 0
  }),
  actions: {
    setParams (key, val) {
      this.params[key] = val
    },
    setSearch (payload) {
      console.log(this.params.q)
      // this.setParams('q', payload)
      this.setParams('page', 1)
      this.getDataTable()
    },
    setPage (payload) {
      this.setParams('page', payload)
      this.getDataTable()
    },
    setPerPage (payload) {
      this.setParams('per_page', payload)
      this.setParams('page', 1)
      this.getDataTable()
    },
    refreshTable () {
      this.setParams('page', 1)
      this.getDataTable()
    },
    mapingItem (val) {
      this.items = val

      val.forEach(it => {
        const bulanIni = date.formatDate(Date.now(), 'MM')
        console.log('bulanIni', bulanIni)
        if (bulanIni !== this.params.bulan) {
          it.stok = []
          it.stok = it?.saldoawal
        }

        if (it?.stok.length) {
          it?.stok.forEach(s => {
            if (s.sub === null) {
              let sub = 0
              if ((parseFloat(s.jumlah) > 0 && parseFloat(s.harga) > 0)) sub = s.jumlah * s.harga
              s.sub = sub
            }
            if (isNaN(parseFloat(s.sub))) console.log('st', s, parseFloat(s.harga))
          })
          it.subtotal = it?.stok.reduce((a, b) => parseFloat(a) + parseFloat(b.sub), 0)
        }
        else it.subtotal = 0
      })
      this.total = val.reduce((a, b) => parseFloat(a) + parseFloat(b.subtotal), 0)
      console.log('metani items', this.total)
    },
    getInitialData () {
      this.getDataTable()
    },
    async getDataTable () {
      this.meta = {}
      this.items = []
      this.loading = true
      const param = { params: this.params }
      await api.get('v1/simrs/laporan/farmasi/pemakaian/get-persediaan', param)
        .then(resp => {
          this.loading = false
          // console.log('data tabel', resp.data)
          this.meta = resp.data?.meta
          // this.items = resp?.data?.data
          this.mapingItem(resp?.data?.data)
        })
        .catch(() => { this.loading = false })
    }
  }
})
