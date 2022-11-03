import { defineStore } from 'pinia'
import { notifSuccess } from 'src/modules/utils'
import { api } from 'boot/axios'
import { useMasterBarangRSTable } from './table'

export const useMasterBarangRSForm = defineStore('master_barangrs_form', {
  state: () => ({
    isOpen: false,
    form: {
      nama: null,
      kode: null,
      kode_satuan: null
    },
    input_kode: null,
    loading: false,
    satuans: []
  }),
  actions: {
    // local related actions
    resetFORM () {
      this.form = {}
      const columns = [
        'nama',
        'kode',
        'kode_satuan'
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
    setKode () {
      const temp = this.input_kode.split('')
      const apem = temp.length
      apem === 5 ? this.form.kode = 'RS-' + this.input_kode
        : apem === 4 ? this.form.kode = 'RS-0' + this.input_kode
          : apem === 3 ? this.form.kode = 'RS-00' + this.input_kode
            : apem === 2 ? this.form.kode = 'RS-000' + this.input_kode
              : apem === 1 ? this.form.kode = 'RS-0000' + this.input_kode : this.form.kode = 'RS-00000'

      console.log('apem', apem)
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
    // ambil data satuan
    getDataSatuans () {
      return new Promise(resolve => {
        api.get('v1/satuan/satuan')
          .then(resp => {
            if (resp.status === 200) {
              this.satuans = resp.data.data
              // console.log('satuan', resp.data)
            }
          })
      })
    },
    // tambah
    saveForm () {
      this.loading = true
      return new Promise((resolve, reject) => {
        api
          .post('v1/barangrs/store', this.form)
          .then((resp) => {
            // console.log('save data   ', resp)
            notifSuccess(resp)
            const table = useMasterBarangRSTable()
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
