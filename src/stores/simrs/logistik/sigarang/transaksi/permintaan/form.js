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
      penanggungjawab: 'ruangan pengguna belum dipilih',
      ruang: 'ruangan pengguna belum dipilih',
      gudang: 'barang belum dipilih',
      satuan: 'barang belum dipilih',
      pengguna: 'ruangan pengguna belum dipilih'
    },
    tanggal: date.formatDate(Date.now(), 'DD MMMM YYYY'),
    penggunas: [],
    penggunaruangs: [],
    penanggungjawabs: [],
    minMaxPenggunas: {},
    stok: {},
    params: {
      kode_rs: '',
      kode_ruangan: ''
    },
    barang: {}
  }),
  actions: {
    setParams(key, val) {
      this.params[key] = val
    },
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
    // get data stok by barang
    getStokByBarang() {
      this.loading = true
      const param = {
        params: this.params
      }
      return new Promise(resolve => {
        api.get('v1/stok/get-ruangan-by-barang', param)
          .then(resp => {
            this.loading = false
            console.log('stok by barang', resp)
            this.barang = resp.data

            resolve(resp)
          })
          .catch(() => {
            this.loading = false
          })
      })
    },

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
          this.loading = false
          if (resp.status === 200) {
            this.penggunaruangs = resp.data.map(apem => {
              apem.uraian = apem.ruang.uraian
              return apem
            })
            console.log('pengguna Ruang', this.penggunaruangs)
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
