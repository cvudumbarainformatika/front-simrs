import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
import { notifSuccess } from 'src/modules/utils'

export const useStokOpnameStore = defineStore('stok_opnam_store', {
  state: () => ({
    loading: false,
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
      order_by: 'created_at',
      sort: 'asc'
    },
    kode_tempat: null,
    gudangDepo: [
      { nama: 'Semua', kode: null }
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
    setSearch(val) {
      this.params.q = val
      if (this.form.kode_tempat !== null) {
        this.getDataByDepo()
      } else {
        this.getDataTable()
      }
    },
    setOder(payload) {
      this.params.order_by = payload
      this.params.sort === 'desc'
        ? (this.params.sort = 'asc')
        : (this.params.sort = 'desc')
      if (this.form.kode_tempat !== null) {
        this.getDataByDepo()
      } else {
        this.getDataTable()
      }
    },
    setPage(payload) {
      // console.log('setPage', payload)
      this.params.page = payload
      if (this.form.kode_tempat !== null) {
        this.getDataByDepo()
      } else {
        this.getDataTable()
      }
    },
    setPerPage(payload) {
      this.params.per_page = payload
      this.params.page = 1
      if (this.form.kode_tempat !== null) {
        this.getDataByDepo()
      } else {
        this.getDataTable()
      }
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
      console.log('edit', this.form)
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
        api.get('v1/transaksi/opname/opname-by-depo', data)
          .then(resp => {
            this.loading = false
            console.log('data table', resp)
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
      const data = {
        id: this.form.id,
        jumlah: this.form.jumlah,
        selisih: this.form.selisih
      }
      return new Promise(resolve => {
        api.post('v1/transaksi/opname/simpan-penyesuaian', data)
          .then(resp => {
            this.loading = false
            console.log('resp', resp)
            notifSuccess(resp)
            if (this.form.kode_tempat !== null) {
              this.getDataByDepo()
            } else {
              this.getDataTable()
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
