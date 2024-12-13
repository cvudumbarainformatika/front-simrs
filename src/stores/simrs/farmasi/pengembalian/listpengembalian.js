import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
import { dateDbFormat } from 'src/modules/formatter'
import { notifSuccess } from 'src/modules/utils'

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
      'nopem',
      'noperkem',
      'pbf',
      'tgl',
      'status'
    ],
    columnHide: [],
    gudangs: [
      { nama: 'Gudang Farmasi ( Kamar Obat )', value: 'Gd-05010100' },
      { nama: 'Gudang Farmasi (Floor Stok)', value: 'Gd-03010100' }
    ]
  }),
  actions: {
    setParams (key, val) {
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
            if (this.items?.length > 0) {
              this.items.forEach(item => {
                if (item?.rincian?.length > 0) {
                  item.rincian.forEach(rincian => {
                    rincian.jmlstok = rincian?.stok?.reduce((a, b) => parseFloat(a) + parseFloat(b.jumlah), 0)
                  })
                }
              })
            }
            resolve(resp)
          })
          .catch(() => { this.loading = false })
      })
    },
    kunciPengembalian (item) {
      item.loadingKunci = true
      const form = {
        id: item.id
      }
      return new Promise(resolve => {
        api.post('v1/simrs/penunjang/farmasinew/pengembalian/kunci', form)
          .then(resp => {
            console.log('kunci', resp?.data)
            item.loadingKunci = false
            notifSuccess(resp)
            resolve(resp)
          })
          .catch(() => {
            item.loadingKunci = false
          })
      })
    },
    hapusHeader (item) {
      item.loadingHapus = true
      const form = {
        id: item.id
      }
      return new Promise(resolve => {
        api.post('v1/simrs/penunjang/farmasinew/pengembalian/hapus-header', form)
          .then(resp => {
            console.log('hapus head', resp?.data)
            item.loadingHapus = false

            const indexRow = this.items?.findIndex(x => x.id === item?.id)
            if (indexRow >= 0) this.items.splice(indexRow, 1)
            notifSuccess(resp)
            resolve(resp)
          })
          .catch(() => {
            item.loadingHapus = false
          })
      })
    },
    hapusRinci (item, rowId) {
      item.loadingHapus = true

      const form = {
        id: item.id
      }
      return new Promise(resolve => {
        api.post('v1/simrs/penunjang/farmasinew/pengembalian/hapus-rinci', form)
          .then(resp => {
            item.loadingHapus = false
            const indexRow = this.items?.findIndex(x => x.id === rowId)

            if (indexRow >= 0) {
              const indexRinci = this.items[indexRow]?.rincian?.findIndex(x => x.id === item.id)

              if (indexRinci >= 0) this.items[indexRow]?.rincian?.splice(indexRinci, 1)
              if (resp?.data?.hapusHead === 'ya') this.items.splice(indexRow, 1)
            }
            notifSuccess(resp)
            resolve(resp)
          })
          .catch(() => {
            item.loadingHapus = false
          })
      })
    }
  }
})
