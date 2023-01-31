import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'

export const useReportAbsensiStore = defineStore('report_absensi', {
  state: () => ({
    items: [],
    meta: {},
    item: {},
    total: 0,
    loading: false,
    params: {
      periode: null,
      filter_by: 1,
      q: '',
      page: 1,
      per_page: 20,
      order_by: 'pegawai_id',
      sort: 'desc'
    },
    columns: ['nama', 'ruangan', 'rekap'],
    columnHide: ['id']
  }),

  getters: {
    getterColumns (state) {
      return state.columns.filter((el) => !state.columnHide.includes(el))
    }
  },

  actions: {
    setPeriode(val) {
      this.params.periode = val
      this.getDataTable()
    },
    setSearch (val) {
      this.params.q = val
    },
    setFilterBy (val) {
      this.params.filter_by = val
    },
    enterSearch(val) {
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
      if (payload) {
        const thumb = payload.map(x => Object.keys(x))
        this.columns = thumb[0]
      }

      // console.log('columns', this.columns)
    },

    refreshTable() {
      this.params.page = 1
      this.getDataTable()
    },
    async getDataTable () {
      this.total = 0
      this.loading = true
      const params = { params: this.params }
      const resp = await api.get('/v1/pegawai/absensi/report', params)
      console.log('items', resp)
      if (resp.status === 200) {
        this.items = resp.data.data
        this.meta = resp.data
        // this.setColumns(resp.data.data)
        this.loading = false
      }
      this.loading = false
      // this.getTotalTable()
    }
  }
})
