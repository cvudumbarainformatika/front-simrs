import { defineStore } from 'pinia'
import { date } from 'quasar'
import { api } from 'src/boot/axios'
import { uniqueId } from 'src/modules/utils'

export const useDistribusiDepoNewStore = defineStore('new_distribusi_depo_store', {
  state: () => ({
    loading: false,
    meta: {},
    items: [],
    columns: [],
    columnHide: ['id', 'created_at', 'updated_at'],
    form: {
      tanggal: date.formatDate(Date.now(), 'YYYY-MM-DD')
    },
    display: {
      tanggal: date.formatDate(Date.now(), 'DD MMMM YYYY')
    },
    params: {
      q: '',
      page: 1,
      per_page: 10,
      order_by: 'created_at',
      sort: 'asc'
    }
  }),
  actions: {
    setForm(key, val) {
      this.form[key] = val
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
    refreshTable() {
      this.params.page = 1
      this.getDataTable()
    },
    // data form related

    setColumns(payload) {
      this.columns = [
        'tanggal',
        'no_penerimaan',
        'kontrak',
        'faktur',
        'perusahaan',
        'aksi']
      // if (!payload) return
      // const thumb = payload.map((x) => Object.keys(x))
      // this.columns = thumb[0]
      // this.columns.sort()
      // this.columns.reverse()
      // console.log('columns', this.columns)
    },
    // initial data
    getInitialData() {
      this.getDataPenerimaan()
      this.setNoDistribusi()
    },
    // this custom store
    setNoDistribusi() {
      this.setForm('no_distribusi', 'DSTRDP-' + uniqueId())
      this.setForm('reff', 'reff-' + uniqueId())
    },
    setDepo() {
      this.items.forEach(item => {
        if (item.details.length) {
          item.details.forEach(det => {
            if (det.barangrs) {
              det.kode_depo = det.barangrs.kode_depo
              if (det.barangrs.depo) {
                det.depo = det.barangrs.depo.nama
                item.canSave = true
              }
            }
            // det.kode_depo = det.barangrs ? det.barangrs.kode_depo : '-'
            // det.depo = det.barangrs ? (det.barangrs.depo ? det.barangrs.depo.nama : '-') : '-'
          })
        }
      })
    },
    // api related function
    getDataPenerimaan() {
      this.loading = true
      const params = { params: this.params }
      return new Promise((resolve, reject) => {
        api
          .get('v1/transaksi/distribusidepo/penerimaan', params)
          .then((resp) => {
            this.loading = false
            console.log('data table', resp.data)
            this.items = resp.data.data
            this.setColumns(resp.data)
            this.setDepo()
            this.meta = resp.data.meta
            resolve(resp)
          })
          .catch((err) => {
            this.loading = false
            reject(err)
          })
      })
    }
  }
})
