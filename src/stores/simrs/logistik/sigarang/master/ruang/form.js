import { defineStore } from 'pinia'
import { notifSuccess } from 'src/modules/utils'
import { api } from 'boot/axios'
import { useMasterRuangTable } from './table'

export const useMasterRuangForm = defineStore('master_ruang_form', {
  state: () => ({
    isOpen: false,
    form: {
      gedung: null,
      lantai: null,
      ruang: null,
      kode: null,
      uraian: null
    },
    gedungs: [],
    lantais: [
      { id: '0', nama: 'Dasar' },
      { id: '1', nama: 'Satu' },
      { id: '2', nama: 'Dua' },
      { id: '3', nama: 'Tiga' },
      { id: '4', nama: 'Empat' }
    ],
    loading: false
  }),
  actions: {
    // local related actions
    resetFORM () {
      this.form = {}
      const columns = [
        'gedung',
        'lantai',
        'ruang',
        'uraian'
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
    setKode (gedung, lantai, ruang) {
      const tGedung = gedung === null ? '0' : typeof gedung === 'string' ? gedung : gedung.toString()
      const tLantai = lantai === null ? '0' : typeof lantai === 'string' ? lantai : lantai.toString()
      const tRuang = ruang === null ? '0' : typeof ruang === 'string' ? ruang : ruang.toString()
      const rGedung = tGedung.length === 1 ? '0' + tGedung : tGedung
      const rLantai = tLantai.length === 1 ? '0' + tLantai : tLantai
      const rRuang = tRuang.length === 1 ? '00' + tRuang : tRuang.length === 2 ? '0' + tRuang : tRuang
      const kode = 'R-' + rGedung + rLantai + rRuang

      this.form.kode = kode

      // console.log('gedung', gedung)
      // console.log('lantai', lantai)
      // console.log('ruang', ruang)
      // console.log('tGedung', tGedung.length)
      // console.log('tLantai', tLantai.length)
      // console.log('tRuang', tRuang.length)
      // console.log('kode', kode)
      // console.log('kode', this.form.kode)
    },
    getGedungsData (val) {
      this.loading = true
      const params = {
        params: {
          q: val,
          per_page: 10
        }
      }
      return new Promise((resolve, reject) => {
        api.get('v1/gedung/gedung', params)
          .then(resp => {
            console.log(resp)
            this.gedungs = resp.data
            this.loading = false
            resolve(resp)
          })
          .catch(err => {
            this.loading = false
            resolve(err)
          })
      })
    },
    // api related actions

    // tambah
    saveForm () {
      const uraian = this.form.uraian.toUpperCase()
      this.form.uraian = uraian
      this.setKode(this.form.gedung, this.form.lantai, this.form.ruang)
      this.loading = true
      return new Promise((resolve, reject) => {
        api
          .post('v1/ruang/store', this.form)
          .then((resp) => {
            // console.log('save data   ', resp)
            notifSuccess(resp)
            const table = useMasterRuangTable()
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
