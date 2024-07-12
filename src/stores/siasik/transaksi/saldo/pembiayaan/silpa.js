import { defineStore } from 'pinia'
import { date } from 'quasar'
import { api } from 'src/boot/axios'
import { notifSuccess, waitLoad } from 'src/modules/utils'

export const storeSisaAnggaran = defineStore('Sisa_Anggaran', {
  state: () => ({
    loading: false,
    items: [],
    meta: {},
    // form: {},
    params: {
      q: '',
      tgl: date.formatDate(Date.now(), 'YYYY-MM-DD'),
      tglx: date.formatDate(Date.now(), 'YYYY-MM-DD'),
      tahun: date.formatDate(Date.now(), 'YYYY'),
      page: 1,
      per_page: 10,
      order_by: 'tanggal',
      sort: 'desc'
    },
    columns: []
    // columnHide: []
  }),
  // getters: {
  //   getterColumns (state) {
  //     return state.columns.filter((el) => !state.columnHide.includes(el))
  //   }
  // },
  actions: {
    setSearch (val) {
      this.params.q = val
      this.getDataTable()
    },
    setOder (payload) {
      this.params.order_by = payload
      this.params.sort === 'desc'
        ? (this.params.sort = 'asc')
        : (this.params.sort = 'desc')
      this.getDataTable()
    },
    setPage (payload) {
      // console.log('setPage', payload)
      this.params.page = payload
      this.getDataTable()
    },
    setPerPage (payload) {
      this.params.per_page = payload
      this.params.page = 1
      this.getDataTable()
    },
    setColumns (payload) {
      const thumb = payload.map((x) => Object.keys(x))
      this.columns = thumb[0]
      // console.log('columns', this.columns)
    },
    refreshTable () {
      this.params.page = 1
      this.getDataTable()
    },
    getDataTable () {
      waitLoad('show')
      const params = { params: this.params }
      return new Promise((resolve, reject) => {
        api
          .get('/v1/transaksi/transaksi_anggaran/getsilpa', params)
          .then((resp) => {
            waitLoad('done')
            console.log('dataaaaa', resp)
            if (resp.status === 200) {
              // this.loading = false
              this.items = resp.data.data
              this.meta = resp.data.meta
              this.setColumns(resp.data.data)
              // console.log("xxxxx", resp.data.data);
              resolve(resp.data.data)
            }
          })
          .catch((err) => {
            waitLoad('done')
            reject(err)
          })
      })
    },
    deletesData (payload) {
      this.loading = true
      const params = { id: payload }
      return new Promise((resolve, reject) => {
        api.post('/v1/transaksi/transaksi_anggaran/hapussilpa', params)
          .then((resp) => {
            // console.log(resp)
            notifSuccess(resp)
            this.loading = false
            this.getDataTable()
            resolve(resp)
          })
          .catch((err) => {
            this.loading = false
            reject(err)
          })
      })
    }
  }
})
