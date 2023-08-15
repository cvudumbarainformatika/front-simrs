import { defineStore } from 'pinia'
import { api } from 'boot/axios'
import { notifSuccess } from 'src/modules/utils'
// import { routerInstance } from 'src/boot/router'
// import { notifErr, notifSuccess } from 'src/modules/utils'
// import { Dialog } from 'quasar'

export const usePermintaanLuarLaboratTable = defineStore('permintaan_luar_laborat_table', {
  state: () => ({
    items: [],
    meta: {},
    item: {},
    loading: false,
    params: {
      periode: 1,
      q: '',
      page: 1,
      per_page: 12,
      order_by: 'rs3',
      sort: 'desc'
    },
    columns: ['atas-nama', 'permintaan', 'perusahaan', 'status', 'akhirx'],
    // columns: ['pasien', 'detail', 'dokter', 'status'],
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
      // this.getDataTable()
    },
    enterSearch(val) {
      // this.params.q = val
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
      this.loading = true
      const params = { params: this.params }
      const resp = await api.get('/v1/transaksi_laborat_luar', params)
      console.log('items lab_luar', resp)
      if (resp.status === 200) {
        this.items = resp.data.data
        this.meta = resp.data
        // this.setColumns(resp.data.data)
        this.loading = false
      }
      this.loading = false
    },
    async deleteData (payload) {
      const params = { nota: payload }
      try {
        await api.post('/v1/transaksi_laborat_luar/destroy', params).then(resp => {
          notifSuccess(resp)
          this.getDataTable()
        })
      } catch (error) {
        console.log('err laborat_luar', error.response)
      }
    }
  }
})
