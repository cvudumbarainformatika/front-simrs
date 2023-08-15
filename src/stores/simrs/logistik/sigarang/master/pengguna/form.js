import { defineStore } from 'pinia'
import { notifSuccess } from 'src/modules/utils'
import { api } from 'boot/axios'
import { useMasterPenggunaTable } from './table'
import { titleCase } from 'src/modules/formatter'

export const useMasterPenggunaForm = defineStore('master_Pengguna_form', {
  state: () => ({
    isOpen: false,
    form: {
      level_1: null,
      level_2: null,
      level_3: null,
      level_4: null,
      kode: null,
      jabatan: null
    },
    loading: false
  }),
  actions: {
    // local related actions
    resetFORM () {
      this.form = {}
      const columns = [
        'level_1',
        'level_2',
        'level_3',
        'level_4',
        'kode',
        'jabatan'
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
      })
      // kecuali yang ada di object user
      this.isOpen = !this.isOpen
    },
    setKode (lv1, lv2, lv3, lv4) {
      const tLv1 = lv1 === null ? '0' : typeof lv1 === 'string' ? lv1 : lv1.toString()
      const tLv2 = lv2 === null ? '0' : typeof lv2 === 'string' ? lv2 : lv2.toString()
      const tLv3 = lv3 === null ? '0' : typeof lv3 === 'string' ? lv3 : lv3.toString()
      const tlv4 = lv4 === null ? '0' : typeof lv4 === 'string' ? lv4 : lv4.toString()
      const rLv1 = tLv1.length === 1 ? '0' + tLv1 : tLv1
      const rLv2 = tLv2.length === 1 ? '0' + tLv2 : tLv2
      const rLv3 = tLv3.length === 1 ? '0' + tLv3 : tLv3
      const rLv4 = tlv4.length === 1 ? '0' + tlv4 : tlv4
      const kode = 'P-' + rLv1 + rLv2 + rLv3 + rLv4

      this.form.kode = kode

      // console.log('lv1', lv1)
      // console.log('lv2', lv2)
      // console.log('lv3', lv3)
      // console.log('lv4', lv4)
      // console.log('tLv1', tLv1.length)
      // console.log('tLv2', tLv2.length)
      // console.log('tlv3', tLv3.length)
      // console.log('tlv4', tlv4.length)
      // console.log('kode', kode)
      // console.log('kode', this.form.kode)
    },
    // api related actions

    // tambah
    saveForm () {
      const jabatan = titleCase(this.form.jabatan)
      this.form.jabatan = jabatan
      console.log('Jabatan ', jabatan)
      this.setKode(this.form.level_1, this.form.level_2, this.form.level_3, this.form.level_4)
      this.loading = true
      return new Promise((resolve, reject) => {
        api
          .post('v1/pengguna/store', this.form)
          .then((resp) => {
            // console.log('save data   ', resp)
            notifSuccess(resp)
            const table = useMasterPenggunaTable()
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
