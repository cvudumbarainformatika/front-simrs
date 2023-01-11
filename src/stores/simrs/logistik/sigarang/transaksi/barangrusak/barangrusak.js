import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
import { notifSuccess, uniqueId } from 'src/modules/utils'

export const useBarangRusakStore = defineStore('barang_rusak_store', {
  state: () => ({
    loading: true,
    isOpen: false,
    items: [],
    meta: {},
    columns: [],
    columnHide: ['id', 'created_at', 'updated_at'],
    deleteId: null,
    params: {
      q: '',
      page: 1,
      per_page: 10,
      order_by: 'created_at',
      sort: 'asc'
    },

    // custom for this store
    form: {
      reff: null,
      nama: 'BARANG RUSAK',
      kode_pengguna: null,
      status: 9,
      details: []
    },
    details: {
      kode_rs: null,
      kode_108: null,
      kode_satuan: null,
      jumlah: 0
    },
    displays: [],
    input: {
      nama: null,
      kode_108: null,
      uraian: null,
      satuan: null
    },
    barangrs: [],
    mapingBarangs: [],
    ruangans: [],
    ruangHasStok: [],
    barangHasStok: [],
    loadingStok: false
  }),
  actions: {
    resetFORM() {
      this.form = {}
      const columns = [
        'reff',
        'kode_pengguna',
        'jumlah'
      ]

      for (let i = 0; i < columns.length; i++) {
        this.setForm(columns[i], null)
      }
      this.form.details = []
    },
    resetAll() {
      this.resetFORM()
      this.details = {}
      this.displays = []
      this.input = {}
      this.setReff()
    },
    setForm(key, val) {
      this.form[key] = val
    },
    setDetail(key, val) {
      this.details[key] = val
    },

    setInput(key, val) {
      this.input[key] = val
    },
    resetInput() {
      this.input = {
        nama: null,
        kode_108: null,
        uraian: null,
        satuan: null
      }

      this.details = {
        kode_rs: null,
        kode_108: null,
        kode_satuan: null,
        jumlah: 0
      }
    },
    // get initial data
    getInitialData() {
      this.getBarangRs()
      this.getMappingbBarang()
      this.getDataRuangan().then(() => {
        this.getCurrentStokRuangan()
      })
      this.setReff()
    },
    // set reff
    setReff() {
      this.form.reff = 'RSK-' + uniqueId()
    },
    // get Stok ruangan
    // pending dulu. ini yang belum selsai adalah maping barang yang punya stok.
    // sehingga yang muncul hanya barang yang punya stok saja
    getCurrentStokRuangan() {
      this.loadingStok = true
      return new Promise(resolve => {
        api.get('v1/stok/current-ruangan')
          .then(resp => {
            this.loadingStok = false
            console.log('stok ruangan', resp.data)
            resolve(resp)
          })
          .catch(() => {
            this.loadingStok = false
          })
      })
    },
    // get barang rs
    getBarangRs() {
      this.loading = true
      return new Promise(resolve => {
        api.get('v1/barangrs/barangrs')
          .then(resp => {
            this.loading = false
            console.log('barangrs', resp)
            this.barangrs = resp.data
            resolve(resp)
          })
          .catch(() => {
            this.loading = false
          })
      })
    },
    // get mapping banrang
    getMappingbBarang() {
      this.loading = true
      return new Promise(resolve => {
        api.get('v1/mapingbarang/mapingwith')
          .then(resp => {
            this.loading = false
            console.log('maping barang', resp)
            this.mapingBarangs = resp.data
            resolve(resp)
          })
          .catch(() => {
            this.loading = false
          })
      })
    },
    // get data ruangan
    getDataRuangan() {
      this.loading = true
      return new Promise(resolve => {
        api.get('v1/ruang/all-ruang')
          .then(resp => {
            this.loading = false
            console.log('ruang', resp)
            this.ruangans = resp.data
            resolve(resp)
          })
          .catch(() => {
            this.loading = false
          })
      })
    },
    // simpan
    saveForm() {
      this.loading = true
      return new Promise(resolve => {
        api.post('v1/transaksi/pemakaianruangan/rusak', this.form)
          .then(resp => {
            this.loading = false
            notifSuccess(resp)
            resolve(resp)
          })
          .catch(() => {
            this.loading = false
          })
      })
    }
  }
})
