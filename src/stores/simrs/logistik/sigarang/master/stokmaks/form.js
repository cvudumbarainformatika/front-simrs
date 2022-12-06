import { defineStore } from 'pinia'
import { notifSuccess } from 'src/modules/utils'
import { api } from 'boot/axios'
import { useStokMaksTable } from './table'

export const useStokMaksForm = defineStore('stok_maks_form', {
  state: () => ({
    isOpen: false,
    form: {
      utama: null,
      depo: null,
      ruang: null,
      kode: null,
      nama: null
    },
    loading: false
  }),
  actions: {
    // local related actions
    resetFORM () {
      this.form = {}
      const columns = [
        'utama',
        'depo',
        'ruang',
        'nama'
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
    setKode (utama, depo, ruang) {
      const tGudang = utama === null ? '0' : typeof utama === 'string' ? utama : utama.toString()
      const tDepo = depo === null ? '0' : typeof depo === 'string' ? depo : depo.toString()
      const tRuang = ruang === null ? '0' : typeof ruang === 'string' ? ruang : ruang.toString()
      const rGudang = tGudang.length === 1 ? '0' + tGudang : tGudang
      const rDepo = tDepo.length === 1 ? '0' + tDepo : tDepo
      const rRuang = tRuang.length === 1 ? '00' + tRuang : tRuang.length === 2 ? '0' + tRuang : tRuang
      const kode = 'Gud-' + rGudang + rDepo + rRuang

      this.form.kode = kode

      // console.log('gudang', gedung)
      // console.log('lantai', lantai)
      // console.log('ruang', ruang)
      // console.log('tGedung', tGedung.length)
      // console.log('tLantai', tLantai.length)
      // console.log('tRuang', tRuang.length)
      // console.log('kode', kode)
      // console.log('kode', this.form.kode)
    },
    // api related actions

    // tambah
    saveForm () {
      const nama = this.form.nama.toUpperCase()
      this.form.nama = nama
      this.setKode(this.form.utama, this.form.depo, this.form.ruang)
      this.loading = true
      return new Promise((resolve, reject) => {
        api
          .post('v1/gudang/store', this.form)
          .then((resp) => {
            // console.log('save data   ', resp)
            notifSuccess(resp)
            const table = useStokMaksTable()
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
