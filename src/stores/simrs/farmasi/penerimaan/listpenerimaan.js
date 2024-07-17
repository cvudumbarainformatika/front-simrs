import { defineStore } from 'pinia'
// import { date } from 'quasar'
import { api } from 'src/boot/axios'
import { dateDbFormat } from 'src/modules/formatter'

export const useListPenerimaanStore = defineStore('list_penerimaan_store', {
  state: () => ({
    loading: false,
    loadingcetak: false,
    items: [],
    meta: {},
    header: {
      periode: 'Bulan ini'
    },
    periods: ['Hari ini', 'Minggu ini', 'Bulan ini', 'Custom'],
    param: {
      cari: '',
      per_page: 10,
      page: 1,
      to: dateDbFormat(new Date()),
      from: dateDbFormat(new Date()),
    },
    columns: [
      'nopenerimaan',
      'tgl',
      'surat',
      'penyedia',
      'total'
    ],
    cetaks: [],
    columnHide: [],
    gudangs: [
      { nama: 'Gudang Farmasi ( Kamar Obat )', value: 'Gd-05010100' },
      { nama: 'Gudang Farmasi (Floor Stok)', value: 'Gd-03010100' }
    ],
    jenisPenerimaans: [
      { nama: 'Pesanan' },
      { nama: 'Pembelian langsung' },
      { nama: 'Pinjaman' },
      { nama: 'Konsinyasi' },
      { nama: 'APBD' },
      { nama: 'APBN' },
      { nama: 'penggantian barang' },
      { nama: 'Hibah' }

    ],
  }),
  actions: {
    setParam (key, val) {
      this.param[key] = val
    },
    setSearch (payload) {
      this.setParam('cari', payload)
      this.setParam('page', 1)
      this.cariRencanaBeli()
    },
    setPage (payload) {
      this.setParam('page', payload)
      this.cariRencanaBeli()
    },
    setPerPage (payload) {
      this.setParam('per_page', payload)
      this.setParam('page', 1)
      this.cariRencanaBeli()
    },
    refreshTable () {
      this.setParam('page', 1)
      this.cariRencanaBeli()
    },
    clearJenisPenerimaan () {
      this.setParam('jenispenerimaan', null)
      this.setParam('page', 1)
      this.cariRencanaBeli()
    },
    jenisPenerimaanSelected (val) {
      this.setParam('jenispenerimaan', val)
      this.setParam('page', 1)
      this.cariRencanaBeli()
      
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
      this.param.to = dateDbFormat(cDate)
      this.param.from = dateDbFormat(cDate)
    },
    bulanIni () {
      const curr = new Date(), y = curr.getFullYear(), m = curr.getMonth()
      // const firstday = date.formatDate(curr, 'YYYY') + '-' + date.formatDate(curr, 'MM') + '-01'
      // const lastday = date.formatDate(curr, 'YYYY') + '-' + date.formatDate(curr, 'MM') + '-31'
      const firstday = curr.setFullYear(y, m, 1)
      const lastday = curr.setFullYear(y, m + 1, 0)
      this.param.from = dateDbFormat(firstday)
      this.param.to = dateDbFormat(lastday)
    },
    mingguIni () {
      const curr = new Date()
      const firstday = new Date(curr.setDate(curr.getDate() - curr.getDay()))
      const lastday = new Date(curr.setDate(curr.getDate() - curr.getDay() + 6))
      this.param.from = dateDbFormat(firstday)
      this.param.to = dateDbFormat(lastday)
    },
    getInitialData () {
      this.bulanIni()
      this.cariRencanaBeli()
    },
    cariRencanaBeli () {
      this.loading = true
      console.log('penerimaan ', this.param)
      const params = { params: this.param }
      return new Promise(resolve => {
        api.get('v1/simrs/farmasinew/penerimaan/listepenerimaan', params)
          .then(resp => {
            this.loading = false
            console.log('list penerimaan', resp)
            this.items = resp.data.data.data
            this.meta = resp.data.data
            resolve(resp)
          })
          .catch(() => {
            this.loading = false
          })
      })
    },
    getPenerimaanBynomor (val) {
      this.loadingcetak = true
      const nomor = {
        nomorpenerimaan: val
      }
      console.log('penerimaan ', nomor)
      const params = { params: nomor }
      return new Promise(resolve => {
        api.get('v1/simrs/farmasinew/penerimaan/listepenerimaanBynomor', params)
          .then(resp => {
            this.loadingcetak = false
            console.log('list penerimaan', resp)
            this.cetaks = resp.data
            // this.meta = resp.data
            // resolve(resp)
          })
          .catch(() => {
            this.loadingcetak = false
          })
      })
    }
  }
})
