import { defineStore } from 'pinia'
import { notifSuccess } from 'src/modules/utils'
import { api } from 'boot/axios'
import { useMasterMapingBarangTable } from './table'

export const useMasterMapingBarangForm = defineStore('master_maping_barang_form', {
  state: () => ({
    isOpen: false,
    form: {
      kode_108: null,
      kode_rs: null,
      kode_satuan: null
    },
    satuans: [],
    barang108s: [],
    barangrses: [],
    loading: false
  }),
  actions: {
    // local related actions
    resetFORM () {
      this.form = {}
      const columns = [
        'kode_108', 'kode_rs', 'kode_satuan'
      ]
      for (let i = 0; i < columns.length; i++) {
        this.setForm(columns[i], null)
      }
    },
    setToday () {
      const date = new Date()
      const year = date.getFullYear()
      const month = ('0' + (date.getMonth() + 1)).slice(-2)
      const day = ('0' + date.getDate()).slice(-2)
      const formatDb = year + '-' + month + '-' + day
      this.form.tanggal_lahir = formatDb
    },
    setForm (nama, val) {
      this.form[nama] = val
    },
    setOpen () {
      this.isOpen = !this.isOpen
    },
    newData () {
      this.resetFORM()
      this.edited = false
      this.isOpen = !this.isOpen
    },
    editData (val) {
      this.edited = true
      const keys = Object.keys(val)
      keys.forEach((key, index) => {
        this.setForm(key, val[key])
        console.log('key', key, 'val', val[key])
      })
      // kecuali yang ada di object user
      this.isOpen = !this.isOpen
    },
    // api related actions
    // get options value
    getDataBarang108 () {
      return new Promise(resolve => {
        api.get('v1/barang108/barang108')
          .then(resp => {
            this.barang108s = resp.data
            // console.log('barang 108', resp.data.data)
            resolve(resp)
          })
      })
    },
    getDataBarangRs () {
      return new Promise(resolve => {
        api.get('v1/barangrs/barangrs')
          .then(resp => {
            this.barangrses = resp.data
            // console.log('barang rs', resp.data)
            resolve(resp)
          })
      })
    },
    getDataSatuan () {
      return new Promise(resolve => {
        api.get('v1/satuan/satuan')
          .then(resp => {
            this.satuans = resp.data
            // console.log('satuan', resp.data.data)
            resolve(resp)
          })
      })
    },

    // tambah
    saveForm () {
      this.loading = true
      return new Promise((resolve, reject) => {
        api
          .post('v1/mapingbarang/store', this.form)
          .then((resp) => {
            // console.log('save data   ', resp)
            notifSuccess(resp)
            const table = useMasterMapingBarangTable()
            table.getDataTable()
            this.loading = false
            this.isOpen = false
            resolve(resp)
          })
          .catch((err) => {
            this.isOpen = false
            this.loading = false
            reject(err)
          })
      })
    }
  }
})
