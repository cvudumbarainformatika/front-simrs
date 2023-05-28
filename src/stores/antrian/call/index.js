import { defineStore } from 'pinia'
import { api } from 'boot/axios'
// import { routerInstance } from 'src/boot/router'
import { notifErr, notifSuccess } from 'src/modules/utils'
// import { Dialog } from 'quasar'

export const useCallStore = defineStore('call_antrian', {
  state: () => ({
    title: 'Data Antrian',
    subtitle: 'Data Transaksi Panggil Antrean',
    items: [],
    meta: {},
    item: {},
    loading: false,
    params: {
      q: '',
      unit: '',
      page: 1,
      per_page: 50,
      order_by: 'rs3',
      sort: 'desc'
    },
    columns: ['namapasien', 'namapoli', 'nomorantrean', 'angkaantrean', 'status'],
    columnHide: ['id'],

    searchUnit: '',
    units: [],
    unit: null,
    settings: [
      { value: 1, label: 'Panggil Nomor' },
      { value: 2, label: 'Panggil Nama' },
      { value: 3, label: 'Panggil Nomor & Nama' }
    ],
    set: 1,

    tab: 'awal' // awal || table

  }),

  getters: {
    getterColumns (state) {
      return state.columns.filter((el) => !state.columnHide.includes(el))
    }
  },

  actions: {
    setSearch (val) {
      this.params.page = 1
      this.params.q = val
      this.getDataTable()
    },
    setOder (payload) {
      this.params.order_by = payload
      this.params.sort === 'desc' ? this.params.sort = 'asc' : this.params.sort = 'desc'
      this.getDataTable()
    },
    setPage (payload) {
      console.log('setPage', payload)
      this.params.page = payload
      this.getDataTable()
    },
    setPerPage (payload) {
      this.params.per_page = payload
      this.params.page = 1
      this.getDataTable()
    },
    setColumns (payload) {
      const thumb = payload.map(x => Object.keys(x))
      this.columns = thumb[0]
      // console.log('columns', this.columns)
    },

    enterSearch() {
      this.params.page = 1
      this.getDataTable()
    },

    refreshTable() {
      this.params.page = 1
      this.getDataTable()
    },
    async getDataTable () {
      this.loading = true
      const params = { params: this.params }
      try {
        await api.get('/v1/call/data', params)
          .then(resp => {
            console.log('call', resp)
            if (resp.status === 200) {
              this.items = resp.data.data
              this.meta = resp.data
              // this.setColumns(resp.data.data)
              this.loading = false
            }
            this.loading = false
          })
      } catch (error) {
        console.log('error', error)
        this.loading = false
      }
    },
    async deletesData (payload) {
      const params = { id: payload }
      try {
        await api.post('/v1/video/destroy', params).then(resp => {
          notifSuccess(resp)
          this.getDataTable()
        })
      } catch (error) {
        console.log('err laborat', error.response)
        notifErr(error.response)
      }
    },

    async getUnits () {
      try {
        await api.get('/v1/call/units')
          .then(resp => {
            console.log('units', resp)
            if (resp.status === 200) {
              this.units = resp.data
            }
          })
      } catch (error) {
        console.log('error', error)
      }
    },

    filterUnit(val) {
      this.searchUnit = val
    },
    setUnit(val) {
      this.unit = val
      this.params.unit = val
      this.tab = 'table'
      this.getDataTable()
    }
  }
})
