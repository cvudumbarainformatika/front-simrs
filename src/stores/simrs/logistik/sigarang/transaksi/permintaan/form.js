import { defineStore } from 'pinia'
import { date } from 'quasar'
import { api } from 'src/boot/axios'
import { uniqueId } from 'src/modules/utils'
import { useTransaksiPermintaanTable } from './permintaan'

export const useTransaksiPermintaanForm = defineStore('form_transaksi_permintaan', {
  state: () => ({
    isOpen: true,
    loading: false,
    form: {
      tanggal: date.formatDate(Date.now(), 'YYYY-MM-DD')
    },
    nomor: null,
    nama: {
      penanggungjawab: 'pengguna belum dipilih',
      ruang: 'pengguna belum dipilih',
      gudang: 'barang belum dipilih',
      satuan: 'barang belum dipilih'
    },
    tanggal: date.formatDate(Date.now(), 'DD MMMM YYYY'),
    penggunas: [],
    penggunaruangs: [],
    penanggungjawabs: [],
    minMaxPenggunas: {},
    stok: {}
  }),
  actions: {
    setNoPermintaan() {
      const m = 'SPMT-' + uniqueId()
      this.nomor = m
      // this.setForm('no_permintaan', m)
    },
    setNewReff() {
      const baru = 'TPN-' + uniqueId()
      this.setForm('reff', baru)
      useTransaksiPermintaanTable().setParam('reff', baru)
    },
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
    // api related function
    getPenanggungJawabs() {
      return new Promise((resolve) => {
        api.get('v1/pengguna/penanggungjawab').then((resp) => {
          // console.log('Pj permintaan', resp.data)
          if (resp.status === 200) {
            this.penanggungjawabs = resp.data
            resolve(resp)
          }
        })
      })
    },
    getPenggunaRuang() {
      this.loading = true
      return new Promise((resolve) => {
        api.get('v1/penggunaruang/pengguna-ruang').then((resp) => {
          // console.log('pengguna Ruang', resp.data)
          this.loading = false
          if (resp.status === 200) {
            this.penggunaruangs = resp.data
            resolve(resp)
          }
        })
      })
    },
    getPenggunas() {
      this.loading = true
      return new Promise((resolve) => {
        api.get('v1/pengguna/pengguna-ruang').then((resp) => {
          this.loading = false
          // console.log('pengguna permintaan', resp.data)
          if (resp.status === 200) {
            this.penggunas = resp.data
            resolve(resp)
          }
        })
      })
    },

    // get data minMaxPengguna
    getMinMaxPengguna() {
      this.loading = true
      return new Promise(resolve => {
        // api.get('v1/minmaxpenggunastok/all')
        api.post('v1/minmaxpenggunastok/spesifik', this.form)
          .then(resp => {
            this.loading = false
            console.log('minmaxpengguna', resp)
            this.minMaxPenggunas = resp.data
            resolve(resp)
          })
          .catch(() => {
            this.loading = false
          })
      })
    }
  }
})
