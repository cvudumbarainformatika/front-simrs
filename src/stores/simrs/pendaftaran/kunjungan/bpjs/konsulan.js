import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
import { dateDbFormat } from 'src/modules/formatter'

export const usePasienKonsulanStore = defineStore('pasien_konsulan', {
  state: () => ({
    loading: false,
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
    }
  }),
  actions: {
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
      this.params.q = q
      this.getData()
    },
    getInitialData() {
      this.getData()
    },
    async getData(val) {
      this.loading = true
      console.log('form', val)
      await api.get('v1/simrs/pendaftaran/listkonsulantarpoli', val)
        .then(resp => {
          this.loading = false
          console.log('List konsulan', resp)
          this.items = resp.data
        })
        .catch(() => {
          this.loading = false
        })
    }
  }
})
