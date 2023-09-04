import { defineStore } from 'pinia'
import { date } from 'quasar'
import { api } from 'src/boot/axios'

export const useListPenerimaanStore = defineStore('list_penerimaan_store', {
  state: () => ({
    loading: false,
    items: [],
    meta: {},
    param: {
      nopenerimaan: '',
      per_page: 10,
      page: 1,
      tanggal: date.formatDate(Date.now(), 'YYYY-MM-DD')
    },
    columns: [
      'nopenerimaan',
      'tgl',
      'surat',
      'penyedia',
      'total'
    ],
    columnHide: []
  }),
  actions: {
    setParam(key, val) {
      this.param[key] = val
    },
    setSearch(payload) {
      this.setParam('nopenerimaan', payload)
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
      console.log('penerimaan ', this.param)
      const params = { params: this.param }
      return new Promise(resolve => {
        api.get('v1/simrs/farmasinew/penerimaan/listepenerimaan', params)
          .then(resp => {
            this.loading = false
            console.log('list penerimaan', resp)
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
