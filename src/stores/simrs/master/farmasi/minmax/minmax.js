import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
import { findWithAttr } from 'src/modules/utils'

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
    form: {
      min: 0,
      max: 0
    },
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
        'kd_obat', 'kd_ruang'
      ]
      for (let i = 0; i < columns.length; i++) {
        this.setForm(columns[i], null)
      }
      this.setForm('min', 0)
      this.setForm('max', 0)
    },
    newData () {
      this.resetFORM()
      this.edited = false
      this.formOpen = !this.formOpen
    },
    editData (val) {
      this.edited = true
      const keys = Object.keys(val)
      console.log('val', val)
      keys.forEach((key, index) => {
        this.setForm(key, val[key])
      })
      this.setForm('kodeobat', val.kd_obat)
      this.setForm('koderuang', val.kd_ruang)
      const obatnya = findWithAttr(this.obats, 'kodeobat', val.kd_obat)
      if (obatnya < 0) {
        const obt = { kodeobat: val.obat.rs1, namaobat: val.obat.namaobat }
        this.obats.push(obt)
      }
      const ruangnya = findWithAttr(this.ruangs, 'kode', val.kd_ruang)
      if (ruangnya < 0) {
        const rua = { kode: val.ruanganx.kode, uraian: val.ruanganx.namaruangan }
        this.ruangs.push(rua)
      }
      this.formOpen = !this.formOpen
      console.log('obat', obatnya)
      console.log('ruang', ruangnya)
      console.log(this.form)
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
      // const thumb = payload.map((x) => Object.keys(x))
      // this.columns = thumb[0]
      this.columns = ['Obat', 'Ruangan', 'Min', 'Max']
      // console.log('columns', this.columns)
    },

    refreshTable () {
      this.params.page = 1
      this.getDataTable()
    },
    // local function

    obatSelected(val) {
      console.log('obat', val)
      this.form.kd_obat = val
      this.form.kodeobat = val
    },
    ruangSelected(val) {
      console.log('ruang', val)
      this.form.kd_ruang = val
      this.form.koderuang = val
    },
    // api relatec function

    // ambil
    getDataTable () {
      this.loading = true
      const params = { params: this.params }
      return new Promise((resolve, reject) => {
        api
          .get('v1/simrs/maping/carilistminmaxbyobat', params)
          .then((resp) => {
            this.loading = false
            // if (resp.status === 200) {
            //   this.items = resp.data.data
            //   this.meta = resp.data.meta
            //   this.setColumns(resp.data.data)
            //   console.log(resp.data.data)
            //   resolve(resp.data.data)
            // }
            if (resp.status === 200) {
              this.items = resp.data.data
              this.meta = resp.data
              this.setColumns(resp.data)
              console.log(resp.data)
              resolve(resp.data)
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
        api.get('v1/simrs/farmasi/master/listruangan', params)
          .then(resp => {
            this.loading = false
            this.ruangs = resp.data
            console.log('ruang', resp.data)
            resolve(resp)
          })
          .catch(() => { this.loading = false })
      })
    },
    // simpan
    simpanData() {
      this.loading = true
      return new Promise(resolve => {
        api.post('v1/simrs/maping/minmaxobat', this.form)
          .then(resp => {
            this.loading = false
            this.getDataTable()
            resolve(resp)
          })
          .catch(() => { this.loading = false })
      })
    }
  }
})
