import { defineStore } from 'pinia'
import { notifSuccess } from 'src/modules/utils'
import { api } from 'boot/axios'
import { useMasterPenggunaRuangTable } from './table'
// import { titleCase } from 'src/modules/formatter'

export const useMasterPenggunaRuangForm = defineStore('master_Pengguna_ruang_form', {
  state: () => ({
    isOpen: false,
    form: {
      kode_ruang: null,
      kode_penanggungjawab: null,
      kode_pengguna: null
    },
    ruangs: [],
    penggunas: [],
    loading: false
  }),
  actions: {
    // local related actions
    resetFORM () {
      this.form = {}
      const columns = [
        'kode_ruang',
        'kode_penanggungjawab',
        'kode_pengguna'
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
      // this.form.kode = 'PR-' + uniqueId()
      this.isOpen = !this.isOpen
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
    // api related actions
    // ambil data options
    getDataRuangs () {
      return new Promise(resolve => {
        api.get('v1/ruang/ruang')
          .then(resp => {
            this.ruangs = resp.data.data
            // console.log('ruangs', resp)
            resolve(resp)
          })
      })
    },
    getDataPenggunas () {
      return new Promise(resolve => {
        api.get('v1/pengguna/pengguna')
          .then(resp => {
            this.penggunas = resp.data.data
            // console.log('penggunas', resp)
            resolve(resp)
          })
      })
    },
    // tambah
    saveForm () {
      // const jabatan = titleCase(this.form.jabatan)
      // this.form.jabatan = jabatan
      // console.log('Jabatan ', jabatan)
      this.loading = true
      return new Promise((resolve, reject) => {
        api
          .post('v1/penggunaruang/store', this.form)
          .then((resp) => {
            // console.log('save data   ', resp)
            notifSuccess(resp)
            const table = useMasterPenggunaRuangTable()
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
