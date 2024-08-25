import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
import { dateDbFormat, formatDouble } from 'src/modules/formatter'
import { notifErrVue } from 'src/modules/utils'

export const useLaporanPemakaianObatStore = defineStore('laporan_pemakaian_obat', {
  state: () => ({
    loading: false,
    loadingDownload: false,
    items: [],
    meta: {},
    params: {
      q: '',
      page: 1,
      per_page: 10,
      to: dateDbFormat(new Date()),
      from: dateDbFormat(new Date())
    },
    header: {
      periode: 'Bulan ini'
    },
    periods: ['Hari ini', 'Minggu ini', 'Bulan ini', 'Custom'],

    columns: [
      'obat',
      'jenis_belanja',
      'kode_108',
      'harga',
      'stok_awal',
      'masuk',
      'keluar',
      'stok_akhir'
      // 'keluar_umum',
      // 'keluar_bpjs',
      // 'keluar_sktm',
      // 'keluar_tagihan',
      // 'keluar_lain'
    ],
    sistemBayars: [],
    fields: {
      No: 'no',
      'Kode Obat': 'kd_obat',
      'Nama Obat': 'nama_obat',
      Jenis: 'bentuk_sediaan',
      Fornas: 'fornas',
      'Jenis Belanja': 'jenis_belanja',
      'Group Kode Barang': 'kode_108',
      Harga: 'harga',
      'Stok Awal': 'stok_awal',
      Masuk: 'masuk',
      'Keluar Umum': 'keluar_umum',
      'Keluar BPJS': 'keluar_bpjs',
      'Keluar SKTM': 'keluar_sktm',
      'Keluar Tagihan': 'keluar_tagihan',
      'Keluar Lain': 'keluar_lain',
      'Stok akhir': 'stok_akhir'
    }
  }),
  actions: {
    setParams (key, val) {
      this.params[key] = val
    },
    setSearch (val) {
      this.setParams('q', val)
      this.setParams('page', 1)
      this.getDataTable()
    },
    setPerPage (val) {
      this.setParams('per_page', val)
      this.setParams('page', 1)
      this.getDataTable()
    },
    setPage (val) {
      this.setParams('page', val)
      this.getDataTable()
    },
    refreshTable () {
      this.getDataTable()
    },

    setPeriode (val) {
      this.header.periode = val
      if (val === 'Hari ini') {
        this.hariIni()
      }
      else if (val === 'Minggu ini') {
        this.mingguIni()
      }
      else if (val === 'Bulan ini') {
        this.bulanIni()
      }
    },
    hariIni () {
      const cDate = new Date()
      this.params.to = dateDbFormat(cDate)
      this.params.from = dateDbFormat(cDate)
    },
    bulanIni () {
      const curr = new Date(), y = curr.getFullYear(), m = curr.getMonth()
      // const firstday = date.formatDate(curr, 'YYYY') + '-' + date.formatDate(curr, 'MM') + '-01'
      // const lastday = date.formatDate(curr, 'YYYY') + '-' + date.formatDate(curr, 'MM') + '-31'
      const firstday = curr.setFullYear(y, m, 1)
      const lastday = curr.setFullYear(y, m + 1, 0)
      this.params.from = dateDbFormat(firstday)
      this.params.to = dateDbFormat(lastday)
    },
    mingguIni () {
      const curr = new Date()
      const firstday = new Date(curr.setDate(curr.getDate() - curr.getDay()))
      const lastday = new Date(curr.setDate(curr.getDate() - curr.getDay() + 6))
      this.params.from = dateDbFormat(firstday)
      this.params.to = dateDbFormat(lastday)
    },

    getInitialData () {
      this.bulanIni()
      this.getDataTable()
      this.getSistembayars()
    },

    async fetch () {
      const param = { params: this.params }
      const data = []
      const resp = await api.get('v1/simrs/laporan/farmasi/pemakaian/get-all-pemakaian', param)
      // .then(resp => {
      const items = resp?.data?.data

      if (!items.length) return notifErrVue('Data tidak ditemukan')
      this.metaniitems(items)
      items.forEach((item, i) => {
        const temp = {}

        temp.no = i + 1
        temp.kd_obat = item?.kd_obat
        temp.nama_obat = item?.nama_obat
        temp.bentuk_sediaan = item?.bentuk_sediaan
        temp.fornas = item?.status_fornas === '1' ? 'Fronas' : ''
        temp.jenis_belanja = item?.kodebelanja?.uraianB
        temp.kode_108 = item?.kode108
        temp.harga = formatDouble(item?.harga, 2)
        temp.stok_awal = formatDouble(item?.stok_awal, 2)
        temp.masuk = formatDouble(item?.masuk, 2)
        temp.keluar_umum = formatDouble(item?.kelUmum, 2)
        temp.keluar_bpjs = formatDouble(item?.kelBpjs, 2)
        temp.keluar_sktm = formatDouble(item?.kelSktm, 2)
        temp.keluar_tagihan = formatDouble(item?.kelTagihan, 2)
        temp.keluar_lain = formatDouble(item?.kelLain, 2)
        temp.stok_akhir = formatDouble(item?.stok_akhir, 2)

        data.push(temp)
      })

      console.log('items', data)
      return data
      // })
    },
    startDownload () { this.loadingDownload = true },
    finishDownload () { this.loadingDownload = false },
    metaniitems (val) {
      const bpjs = this.sistemBayars?.filter(f => f.groups === '1')?.map(m => m.rs1)
      const umum = this.sistemBayars?.filter(f => f.groups === '2')?.map(m => m.rs1)
      const tag = this.sistemBayars?.filter(f => f.rs9 === 'TAGIHAN')?.map(m => m.rs1)
      const sktm = this.sistemBayars?.filter(f => f.rs9 === 'SKTM')?.map(m => m.rs1)

      if (val?.length) {
        val.forEach(ite => {
          ite.stok_awal = ite?.saldoawal?.reduce((a, b) => parseFloat(a) + parseFloat(b.jumlah), 0)
          ite.masuk = ite?.penerimaanrinci?.reduce((a, b) => parseFloat(a) + parseFloat(b.jumlah), 0)

          const lain = ite?.mutasikeluar?.reduce((a, b) => parseFloat(a) + parseFloat(b.jumlah), 0)
          ite.kelLain = isNaN(lain) ? 0 : lain
          // resep mutasikeluar resepkeluar resepkeluarracikan returpenjualan
          const resUm = ite?.resepkeluar?.filter(f => umum.includes(f.sistembayar))?.reduce((a, b) => parseFloat(a) + parseFloat(b.jumlah), 0)
          const resBP = ite?.resepkeluar?.filter(f => bpjs.includes(f.sistembayar))?.reduce((a, b) => parseFloat(a) + parseFloat(b.jumlah), 0)
          const resTg = ite?.resepkeluar?.filter(f => tag.includes(f.sistembayar))?.reduce((a, b) => parseFloat(a) + parseFloat(b.jumlah), 0)
          const ressK = ite?.resepkeluar?.filter(f => sktm.includes(f.sistembayar))?.reduce((a, b) => parseFloat(a) + parseFloat(b.jumlah), 0)

          const racUm = ite?.resepkeluarracikan?.filter(f => umum.includes(f.sistembayar))?.reduce((a, b) => parseFloat(a) + parseFloat(b.jumlah), 0)
          const racBP = ite?.resepkeluarracikan?.filter(f => bpjs.includes(f.sistembayar))?.reduce((a, b) => parseFloat(a) + parseFloat(b.jumlah), 0)
          const racTg = ite?.resepkeluarracikan?.filter(f => tag.includes(f.sistembayar))?.reduce((a, b) => parseFloat(a) + parseFloat(b.jumlah), 0)
          const racsK = ite?.resepkeluarracikan?.filter(f => sktm.includes(f.sistembayar))?.reduce((a, b) => parseFloat(a) + parseFloat(b.jumlah), 0)

          const retUm = ite?.returpenjualan?.filter(f => umum.includes(f.sistembayar))?.reduce((a, b) => parseFloat(a) + parseFloat(b.jumlah), 0)
          const retBP = ite?.returpenjualan?.filter(f => bpjs.includes(f.sistembayar))?.reduce((a, b) => parseFloat(a) + parseFloat(b.jumlah), 0)
          const retTg = ite?.returpenjualan?.filter(f => tag.includes(f.sistembayar))?.reduce((a, b) => parseFloat(a) + parseFloat(b.jumlah), 0)
          const retsK = ite?.returpenjualan?.filter(f => sktm.includes(f.sistembayar))?.reduce((a, b) => parseFloat(a) + parseFloat(b.jumlah), 0)

          ite.kelBpjs = (resBP + racBP - retBP)
          ite.kelUmum = (resUm + racUm - retUm)
          ite.kelTagihan = (resTg + racTg - retTg)
          ite.kelSktm = (ressK + racsK - retsK)
          ite.stok_akhir = ite.stok_awal + ite.masuk - ite.kelBpjs - ite.kelUmum - ite.kelTagihan - ite.kelSktm - ite.kelLain
          // console.log('lain', lain, ite.kelLain)
          // console.log('umum', resUm)
          // console.log('tag', resTg)
        })
      }
      // console.log('items', this.items)
    },
    getDataTable () {
      this.items = []
      this.loading = true
      const param = { params: this.params }
      return new Promise(resolve => {
        api.get('v1/simrs/laporan/farmasi/pemakaian/get-pemakaian', param)
          .then(resp => {
            this.loading = false
            console.log('master maping', resp?.data)
            this.items = resp?.data?.data ?? resp?.data
            this.meta = resp?.data?.meta ?? resp?.data
            this.metaniitems(this.items)
            resolve(resp)
          })
          .catch(() => { this.loading = false })
      })
    },
    async getSistembayars () {
      await api.get('v1/simrs/laporan/farmasi/pemakaian/get-sistembayar')
        .then(resp => {
          // console.log('sisba', resp?.data)
          this.sistemBayars = resp?.data
        })
    }
  }
})
