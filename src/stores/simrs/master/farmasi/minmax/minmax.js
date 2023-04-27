import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'

export const useMasterFarmasiMinMaxObatStore = defineStore('master_farmasi_minmax_obat', {
  state: () => ({
    formOpen: false,
    loading: false,
    items: [],
    obats: [],
    ruangs: [],
    item: {},
    meta: {},
    params: {
      q: '',
      page: 1,
      per_page: 10,
      order_by: 'created_at',
      sort: 'desc'
    },
    filterObat: '',
    filterRuang: '',
    columns: [],
    columnHide: ['id', 'uuid', 'akun', 'kelompok', 'jenis', 'objek', 'rincian_objek', 'sub_rincian_objek', 'sub_sub_rincian_objek', 'created_at', 'updated_at'],
    form: {},
    edited: false

  }),
  actions: {
    // local table related function

    setForm (nama, val) {
      this.form[nama] = val
    },
    setOpen () {
      this.formOpen = !this.formOpen
    },
    resetFORM () {
      this.form = {}
      const columns = [
        'kodeobat', 'koderuang', 'min', 'max'
      ]
      for (let i = 0; i < columns.length; i++) {
        this.setForm(columns[i], null)
      }
    },
    newData () {
      this.resetFORM()
      this.edited = false
      this.formOpen = !this.formOpen
    },
    editData (val) {
      this.edited = true
      const keys = Object.keys(val)
      keys.forEach((key, index) => {
        this.setForm(key, val[key])
      })
      this.formOpen = !this.formOpen
    },
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
      const thumb = payload.map((x) => Object.keys(x))
      this.columns = thumb[0]
      // console.log('columns', this.columns)
    },

    refreshTable () {
      this.params.page = 1
      this.getDataTable()
    },
    // local function

    obatSelected(val) {
      console.log('obat', val)
      this.form.kodeobat = val
    },
    ruangSelected(val) {
      console.log('ruang', val)
      this.form.koderuang = val
    },
    // api relatec function

    // ambil
    getDataTable () {
      this.loading = true
      const params = { params: this.params }
      return new Promise((resolve, reject) => {
        api
          .get('v1/barang108/index', params)
          .then((resp) => {
            this.loading = false
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
            this.loading = false
            reject(err)
          })
      })
    },
    // cari obat
    getDataObat() {
      this.loading = true
      const params = { params: { q: this.filterObat } }
      return new Promise(resolve => {
        api.get('v1/simrs/master/cariObat', params)
          .then(resp => {
            this.loading = false
            this.obats = resp.data
            console.log(resp)
            resolve(resp)
          })
          .catch(() => { this.loading = false })
      })
    },
    // cari ruang
    getDataRuang() {
      this.loading = true
      const params = { params: { q: this.filterRuang } }
      return new Promise(resolve => {
        api.get('v1/ruang/cari-ruang', params)
          .then(resp => {
            this.loading = false
            this.ruangs = resp.data
            console.log('ruang', resp.data)
            resolve(resp)
          })
          .catch(() => { this.loading = false })
      })
    }
  }
})
