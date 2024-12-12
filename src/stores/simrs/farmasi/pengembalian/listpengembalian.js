import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
import { dateDbFormat } from 'src/modules/formatter'

export const useListPengembalianPinjamanStore = defineStore('list_pengembalian_pinjaman', {
  state: () => ({
    loading: true,
    items: [],
    meta: {},
    header: {
      periode: 'Bulan ini'
    },
    periods: ['Hari ini', 'Minggu ini', 'Bulan ini', 'Custom'],
    params: {
      q: '',
      page: 1,
      per_page: 10,
      to: dateDbFormat(new Date()),
      from: dateDbFormat(new Date())
    },
    columns: [
      'nomor',
      'pbf',
      'tgl',
      'status'
    ],
    columnHide: []
  }),
  actions: {
    setParame (key, val) {
      this.params[key] = val
    },
    setPage (val) {
      this.setParame('page', val)
      this.getDataTable()
    },
    setSearch (val) {
      this.setParame('q', val)
      this.setParame('page', 1)
      this.getDataTable()
    },
    setPerPage (val) {
      this.setParame('per_page', val)
      this.setParame('page', 1)
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
    },
    getDataTable () {
      this.loading = true
      const param = { params: this.params }
      return new Promise(resolve => {
        api.get('v1/simrs/penunjang/farmasinew/pengembalian/get-list', param)
          .then(resp => {
            this.loading = false
            console.log('resp list', resp?.data)
            this.items = resp?.data?.data ?? resp?.data
            this.meta = resp?.data?.meta ?? resp?.data
            resolve(resp)
          })
          .catch(() => { this.loading = false })
      })
    }
  }
})
