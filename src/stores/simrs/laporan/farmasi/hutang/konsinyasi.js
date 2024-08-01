import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
// import { filterDuplicateArrays } from 'src/modules/utils'

export const useLaporanHutangKonsinyasiFarmasiStore = defineStore('laporan_hutang_konsinyasi_farmasi', {
  state: () => ({
    loading: false,
    items: [],
    meta: {},
    params: {
      q: '',
      per_page: 10,
      page: 1
    },
    columns: ['PBF', 'Hutang'],
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
            this.metaniData(resp?.data)
          })
          .catch(() => { this.loading = false })
      })
    },
    metaniData (resp) {
      this.items = resp?.data
      this.meta = resp?.meta
      const dist = resp?.dist
      const list = resp?.list
      this.items?.forEach(it => {
        it.dist = dist.filter(fi => fi.kdpbf === it.kode)
        it.list = list.filter(fi => fi.kdpbf === it.kode)
        it.dist?.forEach(fr => {
          if (fr.sub === null) fr.sub = 0
          // it.details.push(fr)
        })
        it.list?.forEach(fr => {
          if (fr.sub === null) fr.sub = 0
          // it.details.push(fr)
        })
        const htDist = it.dist.reduce((a, b) => parseFloat(a) + parseFloat(b.sub), 0)
        const htList = it.list.reduce((a, b) => parseFloat(a) + parseFloat(b.sub), 0)
        it.Hutang = htDist + htList
      })

      console.log('items ', this.items)
    }
  }
})
