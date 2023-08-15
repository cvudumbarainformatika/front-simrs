import { defineStore } from 'pinia'
import { api } from 'boot/axios'
// import { routerInstance } from 'src/boot/router'
import { notifErr, notifSuccess } from 'src/modules/utils'
// import { Dialog } from 'quasar'

export const useMasterPoliStore = defineStore('master_poli', {
  state: () => ({
    title: 'Master Unit',
    subtitle: 'Data Master Unit Antrean',
    items: [],
    meta: {},
    item: {},
    loading: false,
    params: {
      q: '',
      page: 1,
      per_page: 50,
      order_by: 'rs3',
      sort: 'desc'
    },
    columns: ['nama', 'max', 'max_ol', 'kode_bpjs'],
    columnHide: ['id'],

    form: {
      id: null,
      kode_simrs: null,
      kode_bpjs: null,
      nama: null,
      max: 30,
      max_ol: 20
    }
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
        await api.get('/v1/masterpoli/data', params)
          .then((resp) => {
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
        await api.post('/v1/masterpoli/destroy', params).then(resp => {
          notifSuccess(resp)
          this.getDataTable()
        })
      } catch (error) {
        console.log('err laborat', error.response)
        notifErr(error.response)
      }
    },

    async synch() {
      this.loading = true
      try {
        await api.get('/v1/masterpoli/synch')
          .then((resp) => {
            if (resp.status === 200) {
              console.log('synch', resp)
              this.loading = false
              this.getDataTable()
            } else {
              this.loading = false
            }
          })
      } catch (error) {
        this.loading = false
      }
    }
  }
})
