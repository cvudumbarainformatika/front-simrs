import { defineStore } from 'pinia'
import { date } from 'quasar'
import { api } from 'src/boot/axios'
import { notifSuccess } from 'src/modules/utils'

export const useMasterCutiPegawaiStore = defineStore('master_cuti_pegawai', {
  state: () => ({
    loading: false,
    isOpen: false, // for open / close modal
    items: [],
    meta: {},
    columns: [],
    columnHide: ['id', 'created_at', 'updated_at', 'jenispegawai_id'],
    form: {},
    jenisPegawaies: [],
    pegawaies: [],
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
      const columns = ['nama', 'jenispegawai_id, jumlah']
      for (let i = 0; i < columns.length; i++) {
        this.setForm(columns[i], null)
      }
    },
    setParam(key, payload) {
      this.params[key] = payload
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
    }, // local table related function
    setSearch(val) {
      this.params.q = val
      this.getDataTable()
    },
    setOder(payload) {
      this.params.order_by = payload
      this.params.sort === 'desc'
        ? (this.params.sort = 'asc')
        : (this.params.sort = 'desc')
      this.getDataTable()
    },
    setPage(payload) {
      // console.log('setPage', payload)
      this.params.page = payload
      this.getDataTable()
    },
    setPerPage(payload) {
      this.params.per_page = payload
      this.params.page = 1
      this.getDataTable()
    },
    setColumns(payload) {
      if (!payload) return
      const thumb = payload.map((x) => Object.keys(x))
      this.columns = thumb[0]
      this.columns.sort()
      // console.log('columns', this.columns)
    },

    refreshTable() {
      this.params.page = 1
      this.getDataTable()
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
    deletesData(payload) {
      this.deleteId = payload
      // console.log('id', payload)
      this.deleteData()
    },
    // autocomplete jenis pegawai
    jenisPegawaiSelected(val) {
      this.setForm('jenispegawai_id', val)
    },
    jenisPegawaiCleared() {
      this.setForm('jenispegawai_id', null)
    },

    // api related function
    getDataTable() {
      this.loading = true
      const params = { params: this.params }
      return new Promise((resolve, reject) => {
        api
          .get('v1/pegawai/master/index', params)
          .then((resp) => {
            this.loading = false
            const data = resp.data.data
            console.log('get master', resp)
            console.log('data master', data)
            if (data.length) {
              this.setColumns(data)
              this.setItems(data)
            }
            resolve(resp)
            this.setMeta(resp.data)
          })
          .catch((err) => {
            this.loading = false
            reject(err)
          })
      })
    },
    getJenisPegawai() {
      this.loading = true
      return new Promise((resolve, reject) => {
        api
          .get('v1/pegawai/master/jenis-pegawai')
          .then((resp) => {
            this.loading = false
            console.log('jenis pegawai', resp)
            this.jenisPegawaies = resp.data
            resolve(resp)
          })
          .catch((err) => {
            this.loading = false
            reject(err)
          })
      })
    },
    getPegawai() {
      this.loading = true
      return new Promise((resolve, reject) => {
        api
          .get('v1/pegawai/master/pegawai')
          .then((resp) => {
            this.loading = false
            console.log('pegawai', resp)
            this.pegawaies = resp.data
            resolve(resp)
          })
          .catch((err) => {
            this.loading = false
            reject(err)
          })
      })
    },
    saveForm() {
      const jeneng = this.form.nama.toUpperCase()
      this.setForm('nama', jeneng)
      this.loading = true
      return new Promise((resolve, reject) => {
        api
          .post('v1/pegawai/master/store', this.form)
          .then((resp) => {
            this.loading = false
            console.log('save master', resp)
            notifSuccess(resp)
            this.resetFORM()
            this.getDataTable()
            resolve(resp)
          })
          .catch((er) => {
            this.loading = false
            reject(er)
          })
      })
    },
    deleteData() {
      this.loading = true
      const data = { id: this.deleteId }
      return new Promise((resolve, reject) => {
        api
          .post('v1/pegawai/master/destroy', data)
          .then((resp) => {
            this.loading = false
            notifSuccess(resp)
            this.getDataTable()
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
