import { defineStore } from 'pinia'
import { date } from 'quasar'
import { api } from 'src/boot/axios'

export const useTransaksiPermintaanForm = defineStore('form_transaksi_permintaan', {
  state: () => ({
    isOpen: true,
    loading: false,
    form: {
      tanggal: date.formatDate(Date.now(), 'YYYY-MM-DD')
    },
    nama: {
      penanggungjawab: 'pengguna belum dipilih',
      ruang: 'pengguna belum dipilih'
    },
    tanggal: date.formatDate(Date.now(), 'DD MMMM YYYY'),
    penggunas: [],
    penggunaruangs: [],
    penanggungjawabs: []
  }),
  actions: {
    setForm(key, val) {
      this.form[key] = val
    },
    setNama(key, val) {
      this.nama[key] = val
    },
    newData() {},
    editData() {},

    setSearch(val) {},
    pilihPenanggungjawab(val) {},
    getPenanggungJawabs() {
      return new Promise((resolve) => {
        api.get('v1/pengguna/penanggungjawab').then((resp) => {
          console.log('Pj permintaan', resp.data)
          if (resp.status === 200) {
            this.penanggungjawabs = resp.data
            resolve(resp)
          }
        })
      })
    },
    getPenggunaRuang() {
      return new Promise((resolve) => {
        api.get('v1/penggunaruang/pengguna-ruang').then((resp) => {
          console.log('pengguna Ruang', resp.data)
          if (resp.status === 200) {
            this.penggunaruangs = resp.data
            resolve(resp)
          }
        })
      })
    },
    getPenggunas() {
      return new Promise((resolve) => {
        api.get('v1/pengguna/pengguna-ruang').then((resp) => {
          console.log('pengguna permintaan', resp.data)
          if (resp.status === 200) {
            this.penggunas = resp.data
            resolve(resp)
          }
        })
      })
    }
  }
})
