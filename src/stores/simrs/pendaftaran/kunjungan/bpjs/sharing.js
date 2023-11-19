import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
import { dateDbFormat } from 'src/modules/formatter'
import { notifSuccess } from 'src/modules/utils'

export const usePasienSharingStore = defineStore('pasien_sharing', {
  state: () => ({
    loading: false,
    loadingSave: false,
    isOpen: false,
    meta: null,
    items: [],
    params: {
      q: '',
      per_page: 10,
      sort: 'DESC',
      page: 1,
      order_by: 'id',
      // tgl: dateDbFormat(new Date()),
      to: dateDbFormat(new Date()),
      from: dateDbFormat(new Date())
    },
    form: {}
  }),
  actions: {
    setForm(key, val) {
      this.form[key] = val
    },
    setOpen() {
      this.isOpen = !this.isOpen
    },
    setDate(payload) {
      this.params.page = 1
      // this.params.tgl = payload
      this.getData()
    },
    setPeriodik(val) {
      const { to, from } = val
      this.params.to = to
      this.params.from = from
      console.log('periodik', to)
      this.getData()
    },
    setTo(val) {
      this.params.to = val
    },
    setFrom(val) {
      this.params.from = val
    },
    setQ(payload) {
      this.params.page = 1
      this.params.q = payload
      this.params.cari = payload
      this.getData()
    },
    setTglAwal() {
      this.params.tgl = dateDbFormat(new Date())
    },
    setPage(payload) {
      this.params.page = payload
      this.getData()
    },
    setPerPage(payload) {
      this.params.page = 1
      this.params.per_page = payload
      this.getData()
    },
    setFilters() {
      this.filters = !this.filters
    },
    filterData(val) {
      const { to, from, q } = val // status
      this.params.to = to
      this.params.from = from
      this.params.cari = q
      this.getData()
    },
    getInitialData() {
      this.getData()
    },
    async getData(val) {
      this.loading = true
      const params = { params: this.params }
      await api.get('v1/simrs/pelayanan/listpermintaansharing', params)
        .then(resp => {
          this.loading = false
          console.log('List sharing', resp.data)
          this.items = resp?.data?.data ?? resp?.data
          this.meta = resp?.data
        })
        .catch(() => {
          this.loading = false
        })
    },
    simpan() {
      this.loadingSave = true
      return new Promise(resolve => {
        api.post('v1/simrs/pelayanan/updatesimpansharing', this.form)
          .then(resp => {
            this.loadingSave = false
            notifSuccess(resp)
            this.getData()
            resolve(resp.data)
          })
          .catch(() => {
            this.loadingSave = false
          })
      })
    }
  }
})
