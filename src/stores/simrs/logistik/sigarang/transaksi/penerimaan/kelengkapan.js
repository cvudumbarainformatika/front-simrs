import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
import { notifSuccessVue } from 'src/modules/utils'

export const useKelengkapanSuratPenerimaan = defineStore('kelengkapan_surat_penerimaan', {
  state: () => ({
    loading: false,
    items: [],
    pemesanans: [],
    penerimaans: [],
    form: {},
    temp: {
      pemesanan: '',
      penerimaan: ''
    },
    params: {
      nama: 'Penerimaan',
      q: '',
      page: 1,
      per_page: 10,
      order_by: 'created_at',
      sort: 'desc'
    }
  }),
  actions: {
    // local related function
    setForm(key, val) {
      this.form[key] = val
    },
    emptyForm() {
      this.form = {}
    },
    pemesananSelected(val) {
      this.items = this.penerimaans.filter(data => {
        let a = ''
        if (data.nomor === val) { a = data }
        return a
      })
      // console.log(this.items)
    },
    penerimaanSelected(val) {
      // console.log(val)
    },
    // api related function
    getDataPenerimaan() {
      this.loading = true
      const params = { params: this.params }
      return new Promise((resolve, reject) => {
        api.get('v1/transaksi/penerimaan/surat-belum-lengkap', params)
          .then(resp => {
            this.loading = false
            // console.log('penerimaan', resp)
            if (resp.status === 200) {
              this.penerimaans = resp.data
            }
            resolve(resp.data)
          })
          .catch(err => {
            this.loading = false
            reject(err)
          })
      })
    },
    getDataPemesanan() {
      this.loading = true
      const params = { params: this.params }
      return new Promise((resolve, reject) => {
        api.get('v1/transaksi/pemesanan/ada-penerimaan', params)
          .then(resp => {
            this.loading = false
            // console.log('pemesanan', resp.data)
            if (resp.status === 200) {
              this.pemesanans = resp.data
            }
            resolve(resp.data)
          })
          .catch(err => {
            this.loading = false
            reject(err)
          })
      })
    },
    simpanSurat() {
      const data = {
        reff: this.form.reff,
        faktur: this.form.faktur,
        surat_jalan: this.form.surat_jalan,
        tanggal_surat: this.form.tanggal_surat,
        tanggal_faktur: this.form.tanggal_faktur,
        tempo: this.form.tempo
      }
      this.loading = true
      return new Promise((resolve, reject) => {
        api.post('v1/transaksi/penerimaan/lengkapi-surat', data)
          .then(resp => {
            this.loading = false
            notifSuccessVue(resp)
            this.getDataPemesanan()
            this.getDataPenerimaan().then(() => {
              this.pemesananSelected(this.temp.pemesanan)
            })
            resolve(resp)
          })
          .catch(err => {
            this.loading = false
            reject(err)
          })
      })
    }
  }
})
