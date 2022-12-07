import { defineStore } from 'pinia'
import { notifSuccess } from 'src/modules/utils'
import { api } from 'boot/axios'
import { useMinMaxStokTable } from './table'

export const useMinMaxStokForm = defineStore('min_maks_stok_form', {
  state: () => ({
    isOpen: false,
    form: {
      kode_rs: null,
      kode_pengguna: null,
      kode_gudang: null,
      min_stok: 0,
      max_stok: 0
    },
    barangs: [],
    penggunas: [],
    gudangs: [],
    loading: false
  }),
  actions: {
    // local related actions
    resetFORM () {
      this.form = {}
      const columns = [
        'kode_rs',
        'kode_pengguna',
        'kode_gudang',
        'min_stok',
        'max_stok'
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
      this.getGedungsData()
    },
    newData () {
      this.resetFORM()
      this.edited = false
      this.isOpen = !this.isOpen
      // this.getGedungsData()
    },
    editData (val) {
      this.edited = true
      const keys = Object.keys(val)
      keys.forEach((key, index) => {
        this.setForm(key, val[key])
      })
      // kecuali yang ada di object user
      this.isOpen = !this.isOpen
    },

    sanitazeForm() {
      const formini = Object.keys(this.form)
      formini.forEach((data) => {
        if (this.form[data] === null) {
          delete this.form[data]
        }
      })
    },
    // api related actions
    // get autoComp data
    getDataBarang() {
      this.loading = true
      return new Promise(resolve => {
        api.get('v1/barangrs/barangrs')
          .then(resp => {
            this.loading = false
            console.log('barangrs', resp)
            this.barangs = resp.data
            resolve(resp)
          })
          .catch(() => {
            this.loading = false
          })
      })
    },
    getDataGudang() {
      this.loading = true
      return new Promise(resolve => {
        api.get('v1/gudang/gudang')
          .then(resp => {
            this.loading = false
            console.log('gudang', resp)
            this.gudangs = resp.data
            resolve(resp)
          })
          .catch(() => {
            this.loading = false
          })
      })
    },
    getDataPengguna() {
      this.loading = true
      return new Promise(resolve => {
        api.get('v1/pengguna/pengguna-ruang')
          .then(resp => {
            this.loading = false
            console.log('pengguna', resp)
            this.penggunas = resp.data
            resolve(resp)
          })
          .catch(() => {
            this.loading = false
          })
      })
    },
    // tambah
    saveForm () {
      this.sanitazeForm()
      this.loading = true
      return new Promise((resolve, reject) => {
        api
          .post('v1/minmaxstok/store', this.form)
          .then((resp) => {
            // console.log('save data   ', resp)
            notifSuccess(resp)
            const table = useMinMaxStokTable()
            table.getDataTable()
            this.loading = false
            this.isOpen = false
            this.resetFORM()
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
