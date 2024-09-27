import { defineStore } from 'pinia'
import { date } from 'quasar'
import { api } from 'src/boot/axios'
// import { filterDuplicateArrays } from 'src/modules/utils'

export const useLaporanHutangKonsinyasiFarmasiStore = defineStore('laporan_hutang_konsinyasi_farmasi', {
  state: () => ({
    loading: false,
    items: [],
    meta: {},
    detail: [],
    tanggal: {
      from: date.formatDate(Date.now(), 'DD MMMM YYYY'),
      to: date.formatDate(Date.now(), 'DD MMMM YYYY')
    },
    params: {
      q: '',
      tgldari: date.formatDate(Date.now(), 'YYYY-MM-DD'),
      tglsampai: date.formatDate(Date.now(), 'YYYY-MM-DD'),
      jenisreport: '5'
    },
    columns: ['NoBASTKonsinyasi', 'TanggalBAST', 'Suplier', 'FlagTerbayar', 'TotalBast'],
    columnHide: ['id']
  }),
  actions: {
    setParams (key, val) {
      this.params[key] = val
    },
    setPerPage (payload) {
      this.params.per_page = payload
      this.params.page = 1
      this.getDataTable()
    },
    refreshTable () {
      this.params.page = 1
      this.getDataTable()
    },
    setPage (payload) {
      this.params.page = payload
      this.getDataTable()
    },
    setSearch (payload) {
      this.params.q = payload
      this.params.page = 1
      this.getDataTable()
    },
    getDataTable () {
      this.loading = true
      const par = {
        params: this.params
      }
      return new Promise(resolve => {
        api.get('v1/simrs/laporan/farmasi/hutang/get-hutang-konsinyasi', par)
          .then(resp => {
            this.loading = false
            console.log('resp', resp?.data)
            // this.metaniData(resp?.data)
            this.olahdata(resp?.data)
          })
          .catch(() => { this.loading = false })
      })
    },
    // metaniData (resp) {
    //   this.items = resp?.data
    //   this.meta = resp?.meta
    //   const dist = resp?.dist
    //   const list = resp?.list
    //   this.items?.forEach(it => {
    //     it.dist = dist.filter(fi => fi.kdpbf === it.kode)
    //     it.list = list.filter(fi => fi.kdpbf === it.kode)
    //     it.dist?.forEach(fr => {
    //       if (fr.sub === null) fr.sub = 0
    //       // it.details.push(fr)
    //     })
    //     it.list?.forEach(fr => {
    //       if (fr.sub === null) fr.sub = 0
    //       // it.details.push(fr)
    //     })
    //     const htDist = it.dist.reduce((a, b) => parseFloat(a) + parseFloat(b.sub), 0)
    //     const htList = it.list.reduce((a, b) => parseFloat(a) + parseFloat(b.sub), 0)
    //     it.Hutang = htDist + htList
    //   })
    // },
    olahdata (val) {
      console.log('asli', val)
      const hasilglobal = []
      val.forEach(x => {
        const total = x.rinci.reduce((x, y) => parseFloat(x) + parseFloat(y.subtotal), 0)
        const hasil = {
          notranskonsi: x?.notranskonsi,
          NoBASTKonsinyasi: x?.nobast,
          TanggalBAST: x?.tgl_bast,
          Suplier: x?.penyedia?.nama,
          FlagTerbayar: x?.flag_bayar,
          TotalBast: total
        }
        hasilglobal.push(hasil)
      })
      this.items = hasilglobal.sort(({ tgl_bast: a }, { tgl_bast: b }) => b - a)
      console.log('aslixx', this.items)
      this.items.forEach(sasa => {
        sasa.rinci = []
        const notranskonsi = sasa?.notranskonsi
        const caririnci = val.filter(ft => ft.notranskonsi === notranskonsi)
        caririnci.forEach(i => {
          const rincix = i?.rinci
          rincix.forEach(rincis => {
            sasa.rinci.push(rincis)
          })
        })
      })
      this.totalall = this.items.reduce((a, b) => parseFloat(a) + parseFloat(b.TotalBast), 0)
      this.loading = false
    }
  }
})
