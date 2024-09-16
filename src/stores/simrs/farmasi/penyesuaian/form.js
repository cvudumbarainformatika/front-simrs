import { defineStore } from 'pinia'
import { date } from 'quasar'
import { api } from 'src/boot/axios'

export const usePenyesuaianFarmasiStore = defineStore('form_penyesuaian_farmasi', {
  state: () => ({
    loading: false,
    loadingGetObat: false,
    loadingGetRinci: false,
    loadingGetTr: false,
    form: {
      kdruang: '',
      tgl_penyesuaian: date.formatDate(Date.now(), 'YYYY-MM-DD HH:mm:ss')
    },
    params: {
      kdobat: '',
      tglopname: '',
      kdruang: ''
    },
    obats: [],
    trans: {},
    rinci: []
  }),
  actions: {
    setForm (key, val) {
      this.form[key] = val
    },
    setparams (key, val) {
      this.params[key] = val
    },
    getObat (val) {
      this.loadingGetObat = true
      const param = {
        params: {
          q: val
        }
      }
      return new Promise(resolve => {
        api.get('v1/simrs/farmasinew/penyesuaian/get-obat', param)
          .then(resp => {
            this.loadingGetObat = false
            this.obats = resp?.data
            resolve(resp)
          })
          .catch(() => {
            this.loadingGetObat = false
          })
      })
    },
    getTransaksi () {
      const param = { params: this.params }
      this.loadingGetTr = true
      return new Promise(resolve => {
        api.get('v1/simrs/farmasinew/penyesuaian/transaksi', param)
          .then(resp => {
            this.loadingGetTr = false
            console.log('tr', resp?.data)
          })
          .catch(() => {
            this.loadingGetTr = false
          })
      })
    },
    getRincianTransaksi () {},
    simpan () {
      this.loading = true
      return new Promise(resolve => {
        // jam di tgl_penyesuaian ditambahkan di back end
        api.post('v1', this.form)
          .then(resp => {
            this.loading = false
            console.log('sudah simpan', resp)
            resolve(resp)
          })
          .catch(() => {
            this.loading = false
          })
      })
    }
  }
})
