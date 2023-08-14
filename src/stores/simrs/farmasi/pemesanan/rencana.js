import { defineStore } from 'pinia'
import { date } from 'quasar'
import { api } from 'src/boot/axios'

export const useRencanaPemesananObatStore = defineStore('store_rencana_pemesanan_obat', {
  state: () => ({
    loading: false,
    items: [],
    param: {
      no_rencbeliobat: '',
      per_page: 10,
      tanggal: date.formatDate(Date.now(), 'YYYY-MM-DD')
    },
    form: {
      tanggal: date.formatDate(Date.now(), 'YYYY-MM-DD')
    },
    disp: {
      tanggal: date.formatDate(Date.now(), 'DD MMMM YYYY')
    },
    columns: [],
    columnHide: ['id', 'created_at', 'updated_at', 'deleted_at']

  }),
  actions: {
    setForm(key, val) {
      this.form[key] = val
    },
    setParam(key, val) {
      this.param[key] = val
    },

    getInitialData() {
      this.cariRencanaBeli()
    },
    //
    cariRencanaBeli() {
      this.loading = true
      console.log('rencana beli ', this.param)
      const params = { params: this.param }
      return new Promise(resolve => {
        api.get('v1/simrs/farmasinew/listrencanabeli', params)
          .then(resp => {
            this.loading = false
            console.log('list rencana', resp)
            resolve(resp)
          })
          .catch(() => {
            this.loading = false
          })
      })
    },
    enterCariRencanaBeli(evt) {
      const val = evt.target.value
      this.setParam('no_rencbeliobat', val)
      this.cariRencanaBeli()
    }
  }
})
