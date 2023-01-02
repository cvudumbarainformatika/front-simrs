import { defineStore } from 'pinia'
import { date } from 'quasar'
import { api } from 'src/boot/axios'
import { notifSuccess } from 'src/modules/utils'

export const usePenerimaanDepoStore = defineStore('penerimaan_depo_store', {
  state: () => ({
    loading: true,
    isOpen: false,
    items: [],
    meta: {},
    columns: [],
    columnHide: ['id', 'created_at', 'updated_at'],
    deleteId: null,
    params: {
      q: '',
      page: 1,
      per_page: 10,
      order_by: 'created_at',
      sort: 'asc'
    },
    // custom for this store
    form: {
      id: null
    },
    toDistribute: [],
    display: {},
    tanggalDisplay: null,
    minMaxDepos: [],
    stoks: []
  }),
  actions: {
    resetFORM() {
      this.form = {}
      const columns = [
        'id'
      ]

      for (let i = 0; i < columns.length; i++) {
        this.setForm(columns[i], null)
      }
    },
    setForm(key, payload) {
      this.form[key] = payload
    },
    setParam(key, payload) {
      this.params[key] = payload
    },

    // initial data
    getInitialData() {
      this.setTanggal()
      this.getToDistributed()
      this.getMinMaxDepo()
      this.getCurrentStok()
    },
    setTanggal() {
      const tanggal = Date.now()
      this.tanggalDisplay = date.formatDate(tanggal, 'DD MMMM YYYY')
    },
    // api related function
    // get data distribusi yang belum di terima
    getToDistributed() {
      this.loading = true
      const params = { params: this.params }
      return new Promise((resolve, reject) => {
        api
          .get('v1/transaksi/distribusidepo/to-distribute', params)
          .then((resp) => {
            this.loading = false
            // console.log('data disribusi', resp.data)
            this.toDistribute = resp.data
            resolve(resp)
          })
          .catch((err) => {
            this.loading = false
            reject(err)
          })
      })
    },

    // get data minMaxDepo
    getMinMaxDepo() {
      this.loading = true
      return new Promise(resolve => {
        api.get('v1/minmaxdepostok/all')
          .then(resp => {
            this.loading = false
            // console.log('minmaxdepo', resp)
            this.minMaxDepos = resp.data
            resolve(resp)
          })
          .catch(() => {
            this.loading = false
          })
      })
    },
    // get data stok
    getCurrentStok() {
      this.loading = true
      return new Promise(resolve => {
        api.get('v1/stok/all-current')
          .then(resp => {
            this.loading = false
            console.log('stok', resp)
            this.stoks = resp.data

            resolve(resp)
          })
          .catch(() => {
            this.loading = false
          })
      })
    },
    saveForm() {
      console.log('form', this.form)
      this.loading = true
      return new Promise(resolve => {
        api.post('v1/transaksi/distribusidepo/terima-depo', this.form)
          .then(resp => {
            this.loading = false
            notifSuccess(resp)
            this.getToDistributed()
            resolve(resp)
          })
          .catch(() => {
            this.loading = false
          })
      })
    }
  }
})