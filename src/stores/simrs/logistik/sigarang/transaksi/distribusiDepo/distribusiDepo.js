import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
import { notifSuccess, uniqueId } from 'src/modules/utils'

export const useDistribusiDepoStore = defineStore('distribusi_depo_store', {
  state: () => ({
    loading: true,
    isOpen: false,
    items: [],
    meta: {},
    columns: [],
    columnHide: ['id', 'created_at', 'updated_at'],
    deleteId: null,
    params: {
      q: '',
      page: 1,
      per_page: 10,
      order_by: 'created_at',
      sort: 'asc'
    },
    // custom for this store
    form: {
      no_distribusi: null,
      kode_depo: null
    },
    input: {
      kode_barang: null,
      jumlah: 0
    },
    displays: [],
    depos: [],
    barangrses: [],
    mappingBarangs: [],
    minmMxDepos: []
  }),
  actions: {
    resetFORM() {
      this.form = {}
      const columns = [
        'no_distribusi',
        'kode_depo'
      ]

      for (let i = 0; i < columns.length; i++) {
        this.setForm(columns[i], null)
      }
    },

    setForm(key, payload) {
      this.form[key] = payload
    },
    setParam(key, payload) {
      this.params[key] = payload
    },
    setOpen() {
      this.isOpen = !this.isOpen
    },
    setMeta(payload) {
      delete payload.data
      this.meta = payload
    },
    setItems(payload) {
      this.items = payload
    },
    deletesData(payload) {
      this.deleteId = payload
      // console.log('id', payload)
      this.deleteData()
    },
    // local table related function
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
      // if (!payload) return
      // const thumb = payload.map((x) => Object.keys(x))
      // this.columns = thumb[0]
      this.columns = ['tanggal', 'tanggal_distribusi', 'no_distribusi', 'no_permintaan', 'tanggal_verif', 'pengguna', 'pj', 'status', 'aksi']
      // this.columns.sort()
      // this.columns.reverse()
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
      console.log('edit', val)
      // kecuali yang ada di object user
      this.isOpen = !this.isOpen
    },
    sanitazeForm() {
      const formini = Object.keys(this.form)
      formini.forEach((data) => {
        if (this.form[data] === null) {
          delete this.form[data]
        }
      })
    },
    getInitialData() {
      this.getDataTable()
      this.getDataDepo()
      this.setNoDistribusi()
      this.getBarangRs()
      this.getMappingBarang()
      this.getMinMaxDepo()
    },
    // this custom store
    setNoDistribusi() {
      this.setForm('no_distribusi', 'DSTRDP-' + uniqueId())
    },
    resetInput() {
      this.input = {}
    },
    // api related function
    // get data tabel
    getDataTable() {
      this.loading = true
      const params = { params: this.params }
      return new Promise((resolve, reject) => {
        api
          .get('v1/transaksi/distribusidepo/get-permintaan-verified', params)
          .then((resp) => {
            this.loading = false
            console.log('data table', resp.data)
            this.items = resp.data.data.data
            this.setColumns(resp.data)
            this.meta = resp.data.meta
            resolve(resp)
          })
          .catch((err) => {
            this.loading = false
            reject(err)
          })
      })
    },
    // get data depo
    getDataDepo() {
      this.loading = true
      return new Promise(resolve => {
        api.get('v1/gudang/depo')
          .then(resp => {
            this.loading = false
            console.log('depo', resp)
            this.depos = resp.data
            resolve(resp)
          })
          .catch(() => {
            this.loading = false
          })
      })
    },
    // get data barang rs
    getBarangRs() {
      this.loading = true
      return new Promise(resolve => {
        api.get('v1/barangrs/barangrs')
          .then(resp => {
            this.loading = false
            console.log('barangrs', resp)
            this.barangrses = resp.data
            resolve(resp)
          })
          .catch(() => {
            this.loading = false
          })
      })
    },
    // get data mapping barang
    getMappingBarang() {
      this.loading = true
      return new Promise(resolve => {
        api.get('v1/mapingbarang/mapingwith')
          .then(resp => {
            this.loading = false
            console.log('maping barang', resp)
            this.mappingBarangs = resp.data
            resolve(resp)
          })
          .catch(() => {
            this.loading = false
          })
      })
    },
    // get data minMaxDepo
    getMinMaxDepo() {
      this.loading = true
      return new Promise(resolve => {
        api.get('v1/minmaxdepostok/all')
          .then(resp => {
            this.loading = false
            console.log('minmaxdepo', resp)
            this.minmMxDepos = resp.data
            resolve(resp)
          })
          .catch(() => {
            this.loading = false
          })
      })
    },
    // save
    saveForm() {
      this.loading = true
      return new Promise(resolve => {
        api.post('v1/transaksi/distribusidepo/update-distribusi', this.form)
          .then(resp => {
            this.loading = false
            notifSuccess(resp)
            this.getDataTable()
            this.items.forEach(item => {
              delete item.highlight
            })
            resolve(resp)
          }).catch(() => {
            this.loading = false
          })
      })
    }
  }
})
