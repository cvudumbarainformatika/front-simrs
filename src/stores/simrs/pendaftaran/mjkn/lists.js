import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
import { dateDbFormat } from 'src/modules/formatter'

export const useListBpjsAntrianStore = defineStore('list_mjkn_antrian', {
  state: () => ({
    items: [],
    meta: null,
    params: {
      q: '',
      per_page: 10,
      sort: 'DESC',
      page: 1,
      order_by: 'id',
      tgl: dateDbFormat(new Date())
    },
    loading: false
  }),
  // getters: {
  //   doubleCount: (state) => state.counter * 2
  // },
  actions: {
    async getLists() {
      this.loading = true
      const params = { params: this.params }
      try {
        const resp = await api.get('/v1/simrs/pendaftaran/antrianmobilejkn', params)
        if (resp.status === 200) {
          console.log('antrianmobilejkn', resp)
          this.items = resp.data.data
          this.meta = resp.data
          this.loading = false
        }
        this.loading = false
      } catch (error) {
        this.loading = false
      }
    },

    setDate(payload) {
      this.params.page = 1
      this.params.tgl = payload
      this.getLists()
    },
    setQ(payload) {
      this.params.page = 1
      this.params.q = payload
      this.getLists()
    },
    setPage(payload) {
      this.params.page = payload
      this.getLists()
    },
    setPerPage(payload) {
      this.params.page = 1
      this.params.per_page = payload
      this.getLists()
    },
    setTglAwal() {
      this.params.tgl = dateDbFormat(new Date())
    }
  }
})
