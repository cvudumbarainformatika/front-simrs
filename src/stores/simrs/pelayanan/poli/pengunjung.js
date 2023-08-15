import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
import { dateDbFormat } from 'src/modules/formatter'

export const usePengunjungPoliStore = defineStore('pengunjung-poli-store', {
  state: () => ({
    items: [],
    meta: null,
    loading: false,

    params: {
      // tgl: dateDbFormat(new Date())
      // tgl: '2023-07-07',
      page: 1,
      q: '',
      to: dateDbFormat(new Date()),
      from: dateDbFormat(new Date()),
      per_page: 100
    },
    pageTindakan: false,
    filters: false
  }),
  // getters: {
  //   doubleCount: (state) => state.counter * 2
  // },
  actions: {
    async getData() {
      this.loading = true
      const params = { params: this.params }
      await api.get('/v1/simrs/rajal/poli/kunjunganpoli', params)
        .then((resp) => {
          console.log('kunjungan poli', resp)
          this.loading = false
          if (resp.status === 200) {
            this.meta = resp.data
            this.items = resp.data.data
          }
        }).catch((err) => {
          console.log(err)
          this.loading = false
        })
    },
    togglePageTindakan() {
      this.pageTindakan = !this.pageTindakan
    },
    setDate(val) {
      this.params.tgl = val
    },
    setQ(val) {
      this.params.page = 1
      this.params.q = val
    },
    setTo(val) {
      this.params.to = val
    },
    setFrom(val) {
      this.params.from = val
    },
    setPeriodik(val) {
      this.params.page = 1
      const { to, from } = val
      this.params.to = to
      this.params.from = from
      console.log('periodik', to)
      this.getData()
    },
    filterData(val) {
      this.params.page = 1
      const { to, from, q } = val // status
      this.params.to = to
      this.params.from = from
      this.params.q = q
      this.getData()
    },
    setPage(payload) {
      this.params.page = payload
      this.getData()
    },
    setFilters() {
      this.filters = !this.filters
    }
  }
})
