import { defineStore } from 'pinia'
import { notifSuccess } from 'src/modules/utils'
import { api } from 'boot/axios'
import { useMasterBarang108Table } from './table'

export const useMasterBarang108Form = defineStore('master_barang108_form', {
  state: () => ({
    isOpen: false,
    form: {
      akun: null,
      kelompok: null,
      jenis: null,
      objek: null,
      rincian_objek: null,
      sub_rincian_objek: null,
      sub_sub_rincian_objek: null,
      kode: null,
      uraian: null
    },
    loading: false
  }),
  actions: {
    // local related actions
    resetFORM () {
      this.form = {}
      const columns = [
        'akun', 'kode', 'kelompok', 'jenis', 'objek', 'rincian_objek', 'sub_rincian_objek', 'sub_sub_rincian_objek', 'uraian'
      ]
      for (let i = 0; i < columns.length; i++) {
        this.setForm(columns[i], null)
      }
    },
    setKode () {
      console.log('set kode')
      this.form.kode = this.form.akun + '.' + this.form.kelompok + '.' + this.form.jenis + '.' + this.form.objek + '.' + this.form.rincian_objek + '.' + this.form.sub_rincian_objek + '.' + this.form.sub_sub_rincian_objek
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
      })
      // kecuali yang ada di object user
      this.isOpen = !this.isOpen
    },
    // api related actions

    // tambah
    saveForm () {
      this.loading = true
      return new Promise((resolve, reject) => {
        api
          .post('v1/barang108/store', this.form)
          .then((resp) => {
            // console.log('save data   ', resp)
            notifSuccess(resp)
            const table = useMasterBarang108Table()
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
