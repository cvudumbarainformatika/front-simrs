import { defineStore } from 'pinia'
import { date } from 'quasar'
import { api } from 'src/boot/axios'

export const useListRencanaPemesananStore = defineStore('list_rencana_pemesanan', {
  state: () => ({
    loading: false,
    items: [],
    meta: {},
    param: {
      no_rencbeliobat: '',
      per_page: 10,
      page: 1,
      tanggal: date.formatDate(Date.now(), 'YYYY-MM-DD')
    },
    form: {},
    columns: [
      'no_rencbeliobat',
      'tgl'
    ],
    columnHide: []
  }),
  actions: {
    setParam(key, val) {
      this.param[key] = val
    },
    setForm(key, val) {
      this.form[key] = val
    },
    setSearch(payload) {
      this.setParam('no_rencbeliobat', payload)
      this.setParam('page', 1)
      this.cariRencanaBeli()
    },
    setPage(payload) {
      this.setParam('page', payload)
      this.cariRencanaBeli()
    },
    setPerPage(payload) {
      this.setParam('per_page', payload)
      this.setParam('page', 1)
      this.cariRencanaBeli()
    },
    refreshTable() {
      this.setParam('page', 1)
      this.cariRencanaBeli()
    },
    setEdit(row, rin) {
      rin.edit = true
      console.log('row', row)
      console.log('rin', rin)
    },
    getInitialData() {
      this.cariRencanaBeli()
    },
    cariRencanaBeli() {
      this.loading = true
      console.log('rencana beli ', this.param)
      const params = { params: this.param }
      return new Promise(resolve => {
        api.get('v1/simrs/farmasinew/listrencanabeli', params)
          .then(resp => {
            this.loading = false
            console.log('list rencana', resp)
            this.items = resp.data.data
            this.meta = resp.data
            resolve(resp)
          })
          .catch(() => {
            this.loading = false
          })
      })
    },
    simpan(row, rin) {
      rin.edit = false
      console.log('row', row)
      console.log('rin', rin)
    }
  }
})
