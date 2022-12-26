import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
import { notifSuccess } from 'src/modules/utils'

export const useStokOpnameStore = defineStore('stok_opnam_store', {
  state: () => ({
    loading: false,
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
      jumlah: null
    },
    params: {
      search: '',
      q: '',
      page: 1,
      per_page: 10,
      order_by: 'created_at',
      sort: 'asc'
    },
    gudangDepo: [
      { nama: 'semua', kode: null }
    ]

  }),
  actions: {

    // table function -- start

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
      this.columns = ['tanggal', 'tempat', 'kode_rs', 'barang', 'kode_108', 'uraian', 'sisa_stok', 'stok_fisik', 'selisih']
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
    // table function -- end
    // get initial data
    getInitialData() {
      this.getDataGudangDepo()
      this.getDataTable()
    },
    getDataGudangDepo() {
      this.gudangDepo = [
        { nama: 'semua', kode: null }
      ]
      this.loading = true
      return new Promise(resolve => {
        api.get('v1/transaksi/opname/gudangdepo')
          .then(resp => {
            this.loading = false
            console.log('data gudang', resp)
            resp.data.forEach(data => {
              this.gudangDepo.push(data)
            })
            resolve(resp)
          })
          .catch(() => {
            this.loading = false
          })
      })
    },
    getDataTable() {
      this.loading = true
      const data = {
        params: this.params
      }
      return new Promise(resolve => {
        api.get('v1/transaksi/opname/monthly-stok', data)
          .then(resp => {
            this.loading = false
            console.log('data table', resp)
            this.setColumns()
            this.items = resp.data.data
            this.meta = resp.data.meta
            resolve(resp)
          })
          .catch(() => {
            this.loading = false
          })
      })
    },
    simpanOpname() {
      this.loading = true

      return new Promise(resolve => {
        api.get('v1/transaksi/opname/store-opname')
          .then(resp => {
            this.loading = false
            notifSuccess(resp)
            this.getDataTable()
            resolve(resp)
          })
          .catch(() => {
            this.loading = false
          })
      })
    }
  }
})
