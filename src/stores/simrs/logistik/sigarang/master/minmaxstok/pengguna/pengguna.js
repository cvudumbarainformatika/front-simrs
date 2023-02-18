import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
import { notifSuccess, waitLoad } from 'src/modules/utils'
import { useTransaksiPermintaanForm } from '../../../transaksi/permintaan/form'

export const useMinMaxPenggunaStockStore = defineStore('min_max_pengguna_store', {
  state: () => ({
    // table
    items: [],
    meta: {},
    item: {},
    params: {
      q: '',
      pengguna: '',
      barang: '',
      page: 1,
      per_page: 10,
      order_by: 'created_at',
      sort: 'desc'
    },
    columns: [],
    columnHide: [],

    // form
    loading: false,
    isOpen: false,
    form: {
      kode_rs: null,
      kode_pengguna: null,
      min_stok: 0,
      max_stok: 0
    },
    formRuangan: {
      kode_ruang: null,
      kode_rs: null,
      minta: 0,
      flag_minta: null,
      max_stok: 0
    },

    barangs: [],
    penggunas: [],
    gudangs: []
  }),
  actions: {
    // form
    resetFORM () {
      this.form = {}
      const columns = [
        'kode_rs',
        'kode_pengguna',
        'min_stok',
        'max_stok'
      ]
      for (let i = 0; i < columns.length; i++) {
        this.setForm(columns[i], null)
      }
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

    setBarangs(val) {
      this.barangs = val
    },

    sanitazeForm() {
      const formini = Object.keys(this.form)
      formini.forEach((data) => {
        if (this.form[data] === null) {
          delete this.form[data]
        }
      })
    },
    // table
    setSearch (val) {
      this.params.q = val
      this.getDataTable()
    },
    setOder (payload) {
      this.params.order_by = payload
      this.params.sort === 'desc'
        ? (this.params.sort = 'asc')
        : (this.params.sort = 'desc')
      this.getDataTable()
    },
    setPage (payload) {
      // console.log('setPage', payload)
      this.params.page = payload
      this.getDataTable()
    },
    setPerPage (payload) {
      this.params.per_page = payload
      this.params.page = 1
      this.getDataTable()
    },
    setColumns (payload) {
      // const thumb = payload.map((x) => Object.keys(x))
      // this.columns = thumb[0]
      this.columns = ['kode_rs', 'barang', 'pengguna', 'min_stok', 'max_stok']
      // console.log('columns', this.columns)
    },

    refreshTable () {
      this.params.page = 1
      this.getDataTable()
    },
    // initial data
    getInitialData() {
      this.getDataBarang()
    },

    // custom for this store

    setBarangSearch (val) {
      this.params.barang = val
      this.getDataTable()
    },
    setPenggunaSearch (val) {
      this.params.pengguna = val
      this.getDataTable()
    },
    // api
    // api related function

    // table

    getDataTable () {
      waitLoad('show')
      const params = { params: this.params }
      return new Promise((resolve, reject) => {
        api
          .get('v1/minmaxpenggunastok/index', params)
          .then((resp) => {
            waitLoad('done')
            // console.log(resp)
            if (resp.status === 200) {
              this.items = resp.data.data
              this.meta = resp.data.meta
              this.setColumns(resp.data.data)
              console.log(resp.data.data)
              resolve(resp.data.data)
            }
          })
          .catch((err) => {
            waitLoad('done')
            reject(err)
          })
      })
    },
    // delete
    deletesData (payload) {
      this.loading = true
      const params = { id: payload }
      return new Promise((resolve, reject) => {
        api
          .post('v1/minmaxpenggunastok/destroy', params)
          .then((resp) => {
            // console.log(resp)
            notifSuccess(resp)
            this.loading = false
            this.getDataTable()
            resolve(resp)
          })
          .catch((err) => {
            this.loading = false
            reject(err)
          })
      })
    },
    // form

    // tambah
    saveForm () {
      this.sanitazeForm()
      this.loading = true
      return new Promise((resolve, reject) => {
        api
          .post('v1/minmaxpenggunastok/store', this.form)
          .then((resp) => {
            // console.log('save data   ', resp)
            notifSuccess(resp)
            this.getDataTable()
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
    },
    // permintaan maks ruangan
    simpanPermintaanMaksRuangan() {
      this.loading = true
      console.log('form permintaan maks ruangan', this.formRuangan)
      return new Promise((resolve, reject) => {
        api
          .post('v1/minmaxpenggunastok/store', this.formRuangan)
          .then((resp) => {
            // console.log('save data   ', resp)
            const formPermintaan = useTransaksiPermintaanForm()
            formPermintaan.getMinMaxPengguna()
            notifSuccess(resp)
            this.loading = false
            resolve(resp)
          })
          .catch((err) => {
            this.isOpen = false
            this.loading = false
            reject(err)
          })
      })
      // this.formRuangan.flag_minta = null
    }
  }
})
