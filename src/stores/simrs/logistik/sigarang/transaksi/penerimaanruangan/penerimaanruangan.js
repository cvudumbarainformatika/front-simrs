import { defineStore } from 'pinia'
import { date } from 'quasar'
import { api } from 'src/boot/axios'
import { notifSuccess, uniqueId } from 'src/modules/utils'

export const usePenerimaanRuanganStore = defineStore('penerimaan_ruangan_store', {
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
    },
    // custom for this store
    permintaans: [],
    details: [],
    tanggal_distribusi: null
  }),
  actions: {
    resetFORM() {
      this.form = {}
      const columns = [
        'permintaan_id',
        'reff',
        'kode_penanggungjawab',
        'tanggal'
      ]

      for (let i = 0; i < columns.length; i++) {
        this.setForm(columns[i], null)
      }
      this.setForm('details', [])
      this.details = []
      this.tanggal_distribusi = null
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
    },
    // this custom store

    distribusiSelected(val) {
      // 'id',
      // 'reff',
      // 'kode_penanggungjawab',
      // 'tanggal',
      // 'details'
      const permintaan = this.permintaans.filter(data => { return data.id === val })

      if (permintaan.length) {
        this.setForm('permintaan_id', permintaan[0].id)
        this.setForm('reff', 'RRAGD-' + uniqueId())
        this.setForm('kode_penanggungjawab', permintaan[0].kode_penanggungjawab)
        this.setForm('kode_pengguna', permintaan[0].kode_pengguna)
        this.setForm('tanggal', date.formatDate(Date.now(), 'YYYY-MM-DD HH:mm:ss'))
        this.setForm('details', [])
        this.tanggal_distribusi = permintaan[0].tanggal_distribusi
        this.details = []
        permintaan[0].details.forEach((data, i) => {
          console.log('for each', data, i)
          const detils = {
            jumlah: data.jumlah_disetujui,
            kode_rs: data.kode_rs,
            barangrs: data.barangrs,
            kode_satuan: data.kode_satuan,
            kode_108: data.barangrs.mapingbarang.barang108.kode

          }
          const detil = {
            jumlah: data.jumlah_disetujui,
            kode_rs: data.kode_rs,
            kode_satuan: data.kode_satuan,
            kode_108: data.barangrs.mapingbarang.barang108.kode

          }
          this.details.push(detils)
          this.form.details.push(detil)
        })
      }
      console.log('distribusi selected', this.form)
    },
    // api related function
    // get data tabel
    getDataTable() {
      this.loading = true
      const params = { params: this.params }
      return new Promise((resolve, reject) => {
        api
          .get('v1/transaksi/penerimaanruangan/index', params)
          .then((resp) => {
            this.loading = false
            console.log('permintaan distributed', resp.data)
            this.permintaans = resp.data
            this.setColumns(resp.data)
            // this.meta = resp.data.meta
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
      this.loading = true
      return new Promise(resolve => {
        api.post('v1/transaksi/penerimaanruangan/store', this.form)
          .then(resp => {
            this.loading = false
            console.log('penerimaan ruangan', resp)
            notifSuccess(resp)
            this.getDataTable()
            resolve(resp)
          }).catch(() => {
            this.loading = false
          })
      })
    }
  }
})
