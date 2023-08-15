import { defineStore } from 'pinia'
import { notifSuccess } from 'src/modules/utils'
import { api } from 'boot/axios'
import { useUserTable } from './table'
import { routerInstance } from 'src/boot/router'
// import { Dialog } from "quasar";
// import { useProdukFormStore } from "../produk/form";

export const useUserFormStore = defineStore('user_form', {
  state: () => ({
    isOpen: false,
    form: {
      nama: ''
    },
    loading: false
  }),
  actions: {
    // local related actions
    resetFORM () {
      this.form = {}
      const columns = ['nama']
      for (let i = 0; i < columns.length; i++) {
        this.setForm(columns[i], '')
      }
      this.setForm('nama', '')
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
      routerInstance.replace({ name: 'sigarang.admin.pegawai' })
    },
    editData (val) {
      this.edited = true
      const keys = Object.keys(val)
      keys.forEach((key, index) => {
        this.setForm(key, val[key])
      })
      // kecuali yang ada di object user
      this.isOpen = !this.isOpen
      console.log(this.form)
    },
    // tambah
    saveForm () {
      this.loading = true
      return new Promise((resolve, reject) => {
        api
          .post('v1/user/update', this.form)
          .then((resp) => {
            // console.log('save data', resp)
            notifSuccess(resp)
            const table = useUserTable()
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
