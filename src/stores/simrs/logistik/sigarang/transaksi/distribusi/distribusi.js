import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
// import { notifSuccess } from 'src/modules/utils'

export const useTransaksiDistribusiStore = defineStore('transaksi_distribusi', {
  state: () => ({
    loading: true,
    isOpen: false,
    items: [],
    meta: {},
    columns: [],
    columnHide: ['id', 'created_at', 'updated_at'],
    form: {},
    deleteId: null,
    params: {
      q: '',
      page: 1,
      per_page: 10,
      order_by: 'created_at',
      sort: 'asc'
    }
    // custom for this store
  }),
  actions: {
    resetFORM() {
      this.form = {}
      const columns = [
        'id'
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
    sebelumSimpan() {
      const setuju = false
      console.log(this.form)

      if (setuju === false) return false
    },
    getInitialData() {
      this.getDataTable()
    },
    // this custom store

    // api related function
    // get data tabel
    getDataTable() {
      this.loading = true
      const params = { params: this.params }
      return new Promise((resolve, reject) => {
        api
          .get('v1/transaksi/permintaanruangan/get-permintaan-verified', params)
          .then((resp) => {
            this.loading = false
            console.log('permintaan verified', resp.data)
            const dataTable = resp.data.data.data.map(apem => {
              const temp = apem
              temp.disableSend = true
              return temp
            })
            this.items = dataTable
            this.setColumns(resp.data)
            this.meta = resp.data.meta
            this.resetFORM()
            resolve(resp)
          })
          .catch((err) => {
            this.loading = false
            reject(err)
          })
      })
    },
    saveForm() {
      // if (this.sebelumSimpan()) {
      console.log('isik budhal lho..')
      console.log('form', this.form)
      // this.loading = true
      // return new Promise(resolve => {
      //   api.post('v1/transaksi/permintaanruangan/update-distribusi', this.form)
      //     .then(resp => {
      //       this.loading = false
      //       notifSuccess(resp)
      //       this.getDataTable()
      //       this.items.forEach(item => {
      //         delete item.highlight
      //       })
      //       resolve(resp)
      //     }).catch(() => {
      //       this.loading = false
      //     })
      // })
      // }
      // console.log('ora budhal wes..')
    }
  }
})
