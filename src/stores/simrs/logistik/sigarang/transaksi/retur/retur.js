import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
import { notifSuccess, uniqueId } from 'src/modules/utils'

export const useReturStore = defineStore('retur_store', {
  state: () => ({
    loading: true,
    isOpen: false,

    // custom for this store
    gudangOptions: [
      { nama: 'Gudang', value: 'gudang' },
      { nama: 'Penyedia', value: 'penyedia' }
    ],
    form: {
      reff: null,
      nama: 'BARANG RUSAK',
      kode_pengguna: null,
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
    ruangans: []
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
      this.getDataRuangan()
      this.setReff()
    },
    // set reff
    setReff() {
      this.form.reff = 'RTR-' + uniqueId()
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
        api.post('v1/transaksi/pemakaianruangan/rusa', this.form)
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
