import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'

export const useListPasien = defineStore('list_pasien', {
  state: () => ({
    items: [],
    meta: {},
    item: {},
    loading: false,
    params: {
      q: '',
      page: 1,
      per_page: 15,
      order_by: 'norm',
      sort: 'desc'
    },
    columns: ['norm', 'nama', 'alamat', 'tgllahir', 'templahir'],
    columnHide: ['id']
  }),
  getters: {
    getterColumns (state) {
      return state.columns.filter((el) => !state.columnHide.includes(el))
    }
  },
  actions: {
    setSearch (val) {
      this.params.q = val
      this.params.page = 1
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

    refreshTable() {
      this.params.page = 1
      this.getDataTable()
    },
    async getDataTable () {
      this.loading = true
      const params = { params: this.params }
      const resp = await api.get('/v1/simrs/pendaftaran/masterpasien', params)
      console.log('list_pasien', resp)
      if (resp.status === 200) {
        this.items = resp.data.data
        this.meta = resp.data
        this.loading = false
        // this.setColumns(resp.data.data)
      }
      this.loading = false
    }
  }
})
