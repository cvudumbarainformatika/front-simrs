import { defineStore } from 'pinia'
import { api } from 'boot/axios'
// import { routerInstance } from 'src/boot/router'
// import { notifErr, notifSuccess } from 'src/modules/utils'
// import { Dialog } from 'quasar'

export const useTransaksiLaboratTable = defineStore('transaksi_laborat_table', {
  state: () => ({
    items: [],
    meta: {},
    item: {},
    total: 0,
    loading: false,
    params: {
      periode: 1,
      filter_by: 1,
      q: '',
      page: 1,
      per_page: 12,
      order_by: 'rs3',
      sort: 'desc'
    },
    // columns: ['pasien', 'detail', 'rs3', 'rs2', 'rs1', 'norm', 'nama', 'rs23', 'tipe', 'dokter', 'Kunci'],
    columns: ['pasien', 'detail', 'dokter', 'status'],
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
      const resp = await api.get('/v1/transaksi_laborats', params)
      console.log('items', resp)
      if (resp.status === 200) {
        this.items = resp.data.data
        this.meta = resp.data
        // this.setColumns(resp.data.data)
        this.loading = false
      }
      this.loading = false
      this.getTotalTable()
    },
    async getTotalTable() {
      const params = { params: this.params }
      const resp = await api.get('/v1/transaksi_laborats/total', params)
      console.log('total', resp)
      if (resp.status === 200) {
        this.total = resp.data
      }
    }
    // async deletesData (payload) {
    //   const params = { id: payload }
    //   try {
    //     await api.post('/v1/laborat/destroy', params).then(resp => {
    //       notifSuccess(resp)
    //       this.getDataTable()
    //     })
    //   } catch (error) {
    //     console.log('err laborat', error.response)
    //     notifErr(error.response)
    //   }
    // }
  }
})
