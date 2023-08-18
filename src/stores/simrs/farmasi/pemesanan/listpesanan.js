import { defineStore } from 'pinia'
import { date } from 'quasar'
import { api } from 'src/boot/axios'

export const useListPemesananStore = defineStore('list_pemesanan_store', {
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
    }
  }
})
