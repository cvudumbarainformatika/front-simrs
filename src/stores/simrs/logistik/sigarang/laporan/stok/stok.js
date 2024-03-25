import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
import { notifSuccess } from 'src/modules/utils'

export const useStokStore = defineStore('stok_store', {
  state: () => ({
    loading: false,
    loadingGudang: false,
    loadingKartuStok: false,
    isOpen: false,
    allItems: [],
    items: [],
    meta: {},
    columns: [],
    columnHide: ['id', 'created_at', 'updated_at'],
    // customized data
    form: {
      kode_tempat: null,
      kode_rs: null,
      kode_108: null,
      kode_satuan: null,
      jumlah: null,
      selisih: 0
    },
    params: {
      search: '',
      q: '',
      page: 1,
      per_page: 10,
      order_by: 'kode_rs',
      sort: 'asc'
    },
    paramsDetail: {
      from: null,
      to: null
    },
    kode_tempat: 'semua',
    gudangDepo: [
      { nama: 'Semua', kode: 'semua' }
    ]

  }),
  actions: {
    resetForm() {
      this.form = {
        id: null,
        jumlah: null,
        selisih: 0
      }
    },
    setParamsDetails(key, val) {
      this.paramsDetail[key] = val
    },
    setOpen() {
      this.isOpen = !this.isOpen
    },
    // table function -- start
    setForm(key, val) {
      this.form[key] = val
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
    setTanggalKartuStok(val) {
      this.getDataByBarang()
    },
    setSearch(val) {
      this.params.q = val
      this.params.page = 1
      // console.log('kodet tempat', this.kode_tempat)
      if (this.kode_tempat === null || this.kode_tempat === 'semua') {
        this.getDataTable()
      } else {
        this.getDataByDepo()
      }
    },
    setOder(payload) {
      this.params.order_by = payload
      this.params.sort === 'desc'
        ? (this.params.sort = 'asc')
        : (this.params.sort = 'desc')
      if (this.kode_tempat !== null) {
        this.getDataByDepo()
      } else {
        this.getDataTable()
      }
    },
    setPage(payload) {
      // console.log('setPage', this.kode_tempat)
      this.params.page = payload
      if (this.kode_tempat === null || this.kode_tempat === 'semua') {
        this.getDataTable()
      } else {
        this.getDataByDepo()
      }
    },
    setPerPage(payload) {
      this.params.per_page = payload
      this.params.page = 1
      if (this.kode_tempat === null || this.kode_tempat === 'semua') {
        this.getDataTable()
      } else {
        this.getDataByDepo()
      }
    },
    setColumns(payload) {
      // if (!payload) return
      // const thumb = payload.map((x) => Object.keys(x))
      // this.columns = thumb[0]
      this.columns = ['tempat', 'kode_rs', 'barang', 'kode_108', 'uraian', 'totalStok', 'satuan']
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
      // console.log('edit', this.form)
      // kecuali yang ada di object user
      this.isOpen = !this.isOpen
    },
    // table function -- end
    // get initial data
    getInitialData() {
      this.getDataGudangDepo()
      if (this.kode_tempat === null || this.kode_tempat === 'semua') {
        this.getDataTable()
      } else {
        this.getDataByDepo()
      }
    },
    getDataGudangDepo() {
      this.gudangDepo = [
        { nama: 'semua', kode: 'semua' }
      ]
      this.loadingGudang = true
      return new Promise(resolve => {
        api.get('v1/stok/ruang-has-stok')
          .then(resp => {
            this.loadingGudang = false
            // console.log('data gudang', resp)
            const keys = Object.keys(resp.data)
            keys.forEach(key => {
              // console.log('ruang', resp.data[key])
              const data = {}
              data.nama = resp.data[key].depo ? resp.data[key].depo.nama : resp.data[key].ruang ? resp.data[key].ruang.uraian : '-'
              data.kode = resp.data[key].depo ? resp.data[key].depo.kode : resp.data[key].ruang ? resp.data[key].ruang.kode : '-'
              this.gudangDepo.push(data)
            })
            // console.log('ruangs', this.gudangDepo)
            resolve(resp)
          })
          .catch(() => {
            this.loadingGudang = false
          })
      })
    },
    getDataTable() {
      this.loading = true
      const data = {
        params: this.params
      }
      return new Promise(resolve => {
        // api.get('v1/stok/all-current-has-stok', data)
        api.get('v1/stok/stok-sekarang', data)
          .then(resp => {
            this.loading = false
            // console.log('data table', resp)
            this.setColumns()
            this.allItems = resp.data.data
            this.items = resp.data.data
            this.meta = resp.data.meta
            resolve(resp)
          })
          .catch(() => {
            this.loading = false
          })
      })
    },
    getDataByDepo() {
      this.loading = true
      const data = {
        params: this.params
      }
      return new Promise(resolve => {
        api.get('v1/stok/stok-by-ruang', data)
          .then(resp => {
            this.loading = false
            // console.log('data table', resp)
            this.items = resp.data.data
            this.meta = resp.data.meta
            resolve(resp)
          })
          .catch(() => {
            this.loading = false
          })
      })
    },
    getDataByBarang() {
      // console.log('get data by barang', this.paramsDetail)
      const data = { params: this.paramsDetail }
      this.loadingKartuStok = true
      return new Promise(resolve => {
        api.get('v1/stok/get-data-kartu-stok', data)
          .then(resp => {
            this.loadingKartuStok = false
            // console.log(resp.data)
            resolve(resp)
          })
          .catch(() => { this.loadingKartuStok = false })
      })
    },
    simpanOpname() {
      this.loading = true
      const data = {
        id: this.form.id,
        jumlah: this.form.jumlah,
        selisih: this.form.selisih
      }
      return new Promise(resolve => {
        api.post('v1/transaksi/opname/simpan-penyesuaian', data)
          .then(resp => {
            this.loading = false
            // console.log('resp', resp)
            notifSuccess(resp)
            if (this.kode_tempat === null || this.kode_tempat === 'semua') {
              this.getDataTable()
            } else {
              this.getDataByDepo()
            }
            this.resetForm()
            resolve(resp)
          })
          .catch(() => {
            this.loading = false
          })
      })
    }
  }
})
