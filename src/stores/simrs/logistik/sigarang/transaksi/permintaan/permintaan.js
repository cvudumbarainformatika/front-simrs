import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'

export const useTransaksiPermintaanTable = defineStore('table_transaksi_permintaan', {
  state: () => ({
    loading: false,
    items: [],
    meta: {},
    columns: [],
    columnHide: [],
    form: {},
    nama: {
      satuan: 'barang belum dipilih',
      gudang: 'barang belum dipili'
    },
    depos: [],
    mapingDepos: [],
    ruangs: [],
    params: {
      q: '',
      page: 1,
      per_page: 10,
      order_by: 'id',
      sort: 'desc'
    }
  }),
  actions: {
    setForm(key, val) {
      this.form[key] = val
    },
    setNama(key, val) {
      this.nama[key] = val
    },
    setPage(payload) {
      // console.log('setPage', payload)
      this.params.page = payload
      // this.getDataTable()
    },
    setPerPage(payload) {
      this.params.per_page = payload
      this.params.page = 1
      // this.getDataTable()
    },
    refreshTable() {
      this.params.page = 1
      // this.getDataTable()
    },
    setSearch(val) {
      this.params.q = val
      // this.getDataTable()
    },
    setOder(payload) {
      this.params.order_by = payload
      this.params.sort === 'desc'
        ? (this.params.sort = 'asc')
        : (this.params.sort = 'desc')
      // this.getDataTable()
    },
    deletesData(val) {},
    // api related function
    getDepo() {
      this.loading = true
      return new Promise((resolve, reject) => {
        api.get('v1/gudang/depo')
          .then(resp => {
            this.loading = false
            console.log('depo', resp)
            if (resp.status === 200) {
              this.depos = resp.data
            }
            resolve(resp)
          })
          .catch(err => {
            this.loading = false
            reject(err)
          })
      })
    },
    getRuang() {
      this.loading = true
      return new Promise((resolve, reject) => {
        api.get('v1/ruang/all-ruang')
          .then(resp => {
            this.loading = false
            console.log('depo', resp)
            if (resp.status === 200) {
              this.ruangs = resp.data
            }
            resolve(resp)
          })
          .catch(err => {
            this.loading = false
            reject(err)
          })
      })
    },
    getMapingDepo() {
      this.loading = true
      return new Promise((resolve, reject) => {
        api.get('v1/mapingdepo/maping')
          .then(resp => {
            this.loading = false
            console.log('mapingDepo', resp)
            if (resp.status === 200) {
              this.mapingDepos = resp.data
            }
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
