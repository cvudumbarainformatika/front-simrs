import { defineStore } from 'pinia'
import { notifSuccess } from 'src/modules/utils'
import { api } from 'boot/axios'
import { useMasterMerkTable } from './table'

export const useMasterMerkForm = defineStore('master_Merk_form', {
  state: () => ({
    isOpen: false,
    form: {
      merk: null
    },
    gedungs: [],
    loading: false
  }),
  actions: {
    // local related actions
    resetFORM () {
      this.form = {}
      const columns = [
        'merk'
      ]
      for (let i = 0; i < columns.length; i++) {
        this.setForm(columns[i], null)
      }
      // this.setForm('isi', 1)
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
          .post('v1/simrs/farmasi/master/simpanmerk', this.form)
          .then((resp) => {
            // console.log('save data   ', resp)
            notifSuccess(resp)
            const table = useMasterMerkTable()
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
