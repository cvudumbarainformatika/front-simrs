import { defineStore } from 'pinia'
import { date } from 'quasar'
import { api } from 'src/boot/axios'
import { notifSuccess } from 'src/modules/utils'

export const UseProtaAbsensiLiburStore = defineStore('prota_absensi_libur', {
  state: () => ({
    loading: false,
    isOpen: false, // for open / close modal
    items: [],
    meta: {},
    columns: [],
    columnHide: ['id', 'created_at', 'updated_at'],
    form: {},
    tanggal: null,
    tahuns: [],
    deleteId: null,
    params: {
      q: '',
      page: 1,
      per_page: 10,
      order_by: 'created_at',
      sort: 'desc',
      tahun: date.formatDate(new Date(), 'YYYY')
    }
  }),
  actions: {
    resetFORM() {
      this.form = {}
      const columns = ['nama', 'tgl_libur']
      for (let i = 0; i < columns.length; i++) {
        this.setForm(columns[i], null)
      }
    },
    setTanggal(payload) {
      this.setForm('tgl_libur', payload)
      // this.tanggal = payload
      // const tahunIni = date.formatDate(this.form.tgl_libur, 'YYYY')
      // const adaTahun = this.tahuns.filter(data => {
      //   return data === tahunIni
      // })
      // console.log('tahun ', this.tahuns)
      // console.log('tahun ini ', date.formatDate(this.form.tgl_libur, 'YYYY'))
      // console.log('ada tahun ', adaTahun)
      // const t = date.formatDate(new Date(payload), 'YYYY-MM-DD')
      // console.log('tanggal DB', this.form.tgl_libur)
    },
    setParam(key, payload) {
      this.params[key] = payload
    },
    pilihTahun(payload) {
      this.setParam('tahun', payload)
      console.log('select tahun', payload)
      this.getProta()
    },
    setMeta(payload) {
      delete payload.data
      this.meta = payload
    },
    setItems(payload) {
      this.items = payload
    },
    setOpen() {
      this.isOpen = !this.isOpen
    },
    setForm(key, payload) {
      this.form[key] = payload
    },
    deletesData(payload) {
      this.deleteId = payload
      // console.log('id', payload)
      this.deleteProta()
    }, // local table related function
    setSearch(val) {
      this.params.q = val
      this.getProta()
    },
    setOder(payload) {
      this.params.order_by = payload
      this.params.sort === 'desc'
        ? (this.params.sort = 'asc')
        : (this.params.sort = 'desc')
      this.getProta()
    },
    setPage(payload) {
      // console.log('setPage', payload)
      this.params.page = payload
      this.getProta()
    },
    setPerPage(payload) {
      this.params.per_page = payload
      this.params.page = 1
      this.getProta()
    },
    setColumns(payload) {
      if (!payload) return
      const thumb = payload.map((x) => Object.keys(x))
      this.columns = thumb[0]
      // console.log('columns', this.columns)
    },

    refreshTable() {
      this.params.page = 1
      this.getProta()
    },

    // data form related

    newData() {
      this.resetFORM()
      this.edited = false
      this.isOpen = !this.isOpen
    },
    editData(val) {
      this.edited = true
      const keys = Object.keys(val)
      keys.forEach((key, index) => {
        this.setForm(key, val[key])
      })
      // kecuali yang ada di object user
      this.isOpen = !this.isOpen
    },

    // api related function
    getProta() {
      this.loading = true
      const params = { params: this.params }
      return new Promise((resolve, reject) => {
        api
          .get('v1/pegawai/absensi/prota/index', params)
          .then((resp) => {
            this.loading = false
            const data = resp.data.data
            console.log('get Prota', resp)
            // console.log('data Prota', data)
            this.setColumns(data)
            this.setItems(data)
            resolve(resp)
            this.setMeta(resp.data)
          })
          .catch((err) => {
            this.loading = false
            reject(err)
          })
      })
    },
    getTahunProta() {
      this.loading = true
      return new Promise((resolve, reject) => {
        api
          .get('v1/pegawai/absensi/prota/tahun')
          .then((resp) => {
            this.loading = false
            this.tahuns = resp.data
            console.log('tahuns', this.tahuns)
            resolve(resp)
          })
          .catch((err) => {
            this.loading = false
            reject(err)
          })
      })
    },
    saveProta() {
      this.loading = true
      // remove null
      const formini = Object.keys(this.form)
      formini.forEach((data) => {
        if (this.form[data] === null) {
          delete this.form[data]
        }
      })
      return new Promise((resolve, reject) => {
        api
          .post('v1/pegawai/absensi/prota/store', this.form)
          .then((resp) => {
            this.loading = false
            console.log('save Prota', resp)
            notifSuccess(resp)
            this.getProta()
            this.resetFORM()
            resolve(resp)
          })
          .catch((err) => {
            this.loading = false
            reject(err)
          })
      })
    },
    deleteProta() {
      this.loading = true
      const data = { id: this.deleteId }
      return new Promise((resolve, reject) => {
        api
          .post('v1/pegawai/absensi/prota/destroy', data)
          .then((resp) => {
            this.loading = false
            notifSuccess(resp)
            this.getProta()
            resolve(resp)
          })
          .catch((err) => {
            this.loading = false
            reject(err)
          })
      })
    }
  }
})
