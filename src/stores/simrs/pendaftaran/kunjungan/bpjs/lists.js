import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
import { dateDbFormat } from 'src/modules/formatter'
import { notifSuccess } from 'src/modules/utils'

export const useListKunjunganBpjsStore = defineStore('list_kunjungan_bpjs', {
  state: () => ({
    items: [],
    meta: null,
    params: {
      q: '',
      per_page: 10,
      sort: 'DESC',
      page: 1,
      order_by: 'id',
      // tgl: dateDbFormat(new Date()),
      to: dateDbFormat(new Date()),
      from: dateDbFormat(new Date()),
      kdbayar: null
    },
    loading: false,
    loadingH: false,
    filters: false
  }),
  // getters: {
  //   doubleCount: (state) => state.counter * 2
  // },
  actions: {
    async getLists () {
      this.loading = true
      const params = { params: this.params }
      const resp = await api.get('/v1/simrs/pendaftaran/kunjunganpasienbpjs', params)
      if (resp.status === 200) {
        console.log('kunjungan', resp)
        this.items = resp.data.data
        this.meta = resp.data
        this.loading = false
      }
      this.loading = false
    },
    hapusPasien (pasien) {
      console.log('hapus', pasien)
      this.loadingH = true
      const form = {
        noreg: pasien.noreg,
        nosep: pasien.sep
      }
      return new Promise(resolve => {
        api.post('/v1/simrs/pendaftaran/hapuspasien', form)
          .then(resp => {
            this.loadingH = false
            notifSuccess(resp)
            this.getLists()
            resolve(resp)
          })
          .catch(() => {
            this.loadingH = false
          })
      })
    },
    setDate (payload) {
      this.params.page = 1
      // this.params.tgl = payload
      this.getLists()
    },
    setPeriodik (val) {
      const { to, from } = val
      this.params.to = to
      this.params.from = from
      console.log('periodik', to)
      this.getLists()
    },
    setTo (val) {
      this.params.to = val
    },
    setFrom (val) {
      this.params.from = val
    },
    setQ (payload) {
      this.params.page = 1
      this.params.q = payload
      this.getLists()
    },
    setTglAwal () {
      this.params.tgl = dateDbFormat(new Date())
    },
    setPage (payload) {
      this.params.page = payload
      this.getLists()
    },
    setPerPage (payload) {
      this.params.page = 1
      this.params.per_page = payload
      this.getLists()
    },
    setFilters () {
      this.filters = !this.filters
    },
    filterData (val) {
      const { to, from, q } = val // status
      this.params.to = to
      this.params.from = from
      this.params.q = q
      this.getLists()
    }
  }
})
