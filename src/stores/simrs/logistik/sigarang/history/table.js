import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
import { changeArrayIndex, notifSuccess } from 'src/modules/utils'
import { useDetailHistoryTable } from './details'

export const useHistoryTable = defineStore('history_table', {
  state: () => ({
    loading: false,
    loadingItem: false,
    nama: '',
    items: [],
    meta: {},
    item: {},
    params: {
      q: '',
      page: 1,
      per_page: 5,
      order_by: 'created_at',
      sort: 'desc'
    },
    form: {},
    columns: [],
    columnHide: [
      'id',
      'uuid',
      'kode_penanggungjawab',
      'kode_penerima',
      'nama',
      'transaksi_gudang_id',
      'kontrak',
      'perusahaan',
      'kode_perusahaan',
      'reff',
      'details',
      'created_at',
      'updated_at',
      'kode_depo',
      'kode_pengguna',
      'kode_ruang',
      'penggunaruang',
      'ruangpengguna',
      'tanggal_serahterima',
      'flag_siasik',
      'updated_by',
      'created_by'
    ]
  }),
  getters: {
    getterColumns (state) {
      return state.columns.filter((el) => !state.columnHide.includes(el))
    }
  },
  actions: {
    // local table related function
    setDetails (data) {
      const detail = useDetailHistoryTable()
      detail.setData(data)
      detail.setOpen()
      console.log('data', data)
    },
    setParams (key, val) {
      this.params[key] = val
    },
    setForm(key, val) {
      this.form[key] = val
    },
    resetForm() {
      this.form = {}
    },
    pilihTransaksi (val) {
      this.selected = true
      this.nama = val.nama
      this.title = val.nama
      this.params.nama = val.nama
      console.log('dipilih ', val)

      this.getDataTransactions()
    },
    setSearch (val) {
      this.params.q = val
      this.getDataTransactions()
    },
    setOder (payload) {
      this.params.order_by = payload
      this.params.sort === 'desc'
        ? (this.params.sort = 'asc')
        : (this.params.sort = 'desc')
      this.getDataTransactions()
    },
    setPage (payload) {
      // console.log('setPage', payload)
      this.params.page = payload
      this.getDataTransactions()
    },
    setPerPage (payload) {
      this.params.per_page = payload
      this.params.page = 1
      this.getDataTransactions()
    },
    setColumns (payload) {
      const thumb = payload.map((x) => Object.keys(x))
      this.columns = thumb[0]
      changeArrayIndex(this.columns, 'perusahaan', 'total')
      changeArrayIndex(this.columns, 'depo', 'kode_depo')
      changeArrayIndex(this.columns, 'ruangan', 'no_permintaan')

      // console.log('columns', this.columns)
    },

    refreshTable () {
      this.params.page = 1
      this.getDataTransactions()
    },

    setData (data) {
      // console.log('data transaction', data)
      this.meta = data
      delete this.meta.data
      // console.log('data', this.rows)
      // console.log('meta', this.meta)
    },

    // api related function

    // ambil data
    getDataTransactions () {
      this.items = []
      const params = { params: this.params }
      return new Promise((resolve, reject) => {
        this.loading = true
        api.get('v1/history/index', params)
          .then(resp => {
            this.loading = false
            if (resp.status === 200) {
              console.log('resp history', resp.data)
              if (resp.data.data.length) {
                this.setColumns(resp.data.data)
                this.items = resp.data.data
              }
              this.setData(resp.data.meta)

              // this.meta = resp.data.meta
              // console.log('history ', resp.data)
              resolve(resp.data.data)
            }
          })
          .catch(err => {
            this.loading = false
            reject(err)
          })
      })
    },

    getItBackToVerif(val) {
      this.items[val].loading = true
      return new Promise(() => {
        api.post('v1/transaksi/permintaanruangan/tolak-permintaan', this.form)
          .then(() => {
            this.items[val].loading = false
            this.getDataTransactions()
          })
          .catch(() => {
            this.items[val].loading = false
          })
      })
    },
    deleteTransaction (params) {
      this.loading = true
      return new Promise((resolve, reject) => {
        api.post('v1/history/destroy', params)
          .then(resp => {
            this.loading = false
            console.log('hapus draft', resp)
            notifSuccess(resp)
            this.getDataTransactions()
            resolve(resp)
          })
          .catch(err => {
            this.loading = false
            reject(err)
          })
      })
    }
  }
})
