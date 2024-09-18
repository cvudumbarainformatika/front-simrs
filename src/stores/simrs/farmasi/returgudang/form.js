import { defineStore } from 'pinia'
import { date } from 'quasar'
import { api } from 'src/boot/axios'

export const useReturGudangFormStore = defineStore('form_retur_gudang', {
  state: () => ({
    loading: false,
    form: {
      gudang: '',
      depo: '',
      no_retur: '',
      tgl_retur: date.formatDate(Date.now(), 'YYYY-MM-DD'),
      details: []
    },
    dispForm: {
      kd_obat: '',
      alasan: '',
      jumlah_retur: 0

    },
    gudangs: [
      { nama: 'Gudang Farmasi ( Floor Stok )', kode: 'Gd-03010100' },
      { nama: 'Gudang Farmasi ( Kamar Obat )', kode: 'Gd-05010100' }
    ],
    obats: [],
    model: null
  }),
  actions: {
    setForm (key, val) {
      this.form[key] = val
    },
    setDispForm (key, val) {
      this.dispForm[key] = val
    },
    resetObat () {
      this.setDispForm('kd_obat', null)
      this.setDispForm('jumlah_retur', 0)
      this.setDispForm('alasan', null)
      this.model = null
    },
    resetForm () {
      this.form = {
        gudang: '',
        depo: '',
        no_retur: '',
        tgl_retur: date.formatDate(Date.now(), 'YYYY-MM-DD'),
        kd_obat: '',
        jumlah_retur: 0,
        details: []
      }
    },
    getObat (val) {
      this.obats = []
      this.loadingGetObat = true
      const param = {
        params: {
          q: val,
          kdruang: this.form.depo,
          per_page: 10
        }
      }
      return new Promise(resolve => {
        api.get('v1/simrs/farmasinew/penerimaan/list-stok-sekarang', param)
          .then(resp => {
            this.loadingGetObat = false
            this.obats = resp?.data?.data ?? resp?.data
            resolve(resp)
          })
          .catch(() => {
            this.loadingGetObat = false
          })
      })
    }
  }
})
