import { defineStore } from 'pinia'
import { date } from 'quasar'
import { api } from 'src/boot/axios'

export const useListPermintaanStore = defineStore('list_permintaan_store', {
  state: () => ({
    loading: false,
    items: [],
    meta: {},
    param: {
      cari: '',
      per_page: 10,
      page: 1,
      tanggal: date.formatDate(Date.now(), 'YYYY-MM-DD')
    },
    columns: [
      'no_permintaan',
      'tgl_permintaan',
      'dari',
      'tujuan'
    ],
    columnHide: []
  }),
  actions: {
    setParam(key, val) {
      this.param[key] = val
    },
    setSearch(payload) {
      this.setParam('cari', payload)
      this.setParam('page', 1)
      this.ambilPermintaan()
    },
    setPage(payload) {
      this.setParam('page', payload)
      this.ambilPermintaan()
    },
    setPerPage(payload) {
      this.setParam('per_page', payload)
      this.setParam('page', 1)
      this.ambilPermintaan()
    },
    refreshTable() {
      this.setParam('page', 1)
      this.ambilPermintaan()
    },
    getInitialData() {
      this.ambilPermintaan()
    },
    ambilPermintaan() {
      this.loading = true
      console.log('penerimaan ', this.param)
      const params = { params: this.param }
      return new Promise(resolve => {
        api.get('v1/simrs/farmasinew/depo/listpermintaandepo', params)
          .then(resp => {
            this.loading = false
            console.log('list permintaan', resp.data)
            this.items = resp.data
            // this.meta = resp.data
            resolve(resp)
          })
          .catch(() => {
            this.loading = false
          })
      })
    }
  }
})
