import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
import { dateDbFormat } from 'src/modules/formatter'

export const useKasirRajalListKunjunganStore = defineStore('kasir_rajal_list_kunjungan_umum', {
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
    loading: false,
    rekapBill: {},
    notas: {}
  }),
  // getters: {
  //   doubleCount: (state) => state.counter * 2
  // },
  actions: {

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
    setTglAwal() {
      this.params.tgl = dateDbFormat(new Date())
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
    async getLists() {
      this.loading = true
      const params = { params: this.params }
      // const resp = await api.get('/v1/simrs/pendaftaran/umum/kunjunganpasienumum', params)
      const resp = await api.get('/v1/simrs/kasir/rajal/kunjunganpoli', params)
      if (resp.status === 200) {
        console.log('kunjungan', resp)
        this.items = resp.data.data
        this.meta = resp.data
        this.loading = false
      }
      this.loading = false
    },
    async getBill(val) {
      this.rekapBill = {}
      this.loading = true
      const params = { params: val }
      // const resp = await api.get('/v1/simrs/pendaftaran/umum/kunjunganpasienumum', params)
      const resp = await api.get('/v1/simrs/kasir/rajal/billbynoreg', params)
      if (resp.status === 200) {
        console.log('bill', resp.data)
        this.rekapBill = resp.data
        this.loading = false
      }
      this.loading = false
    },
    async getNotas(val) {
      this.notas = {}
      this.loading = true
      const params = { params: val }
      // const resp = await api.get('/v1/simrs/pendaftaran/umum/kunjunganpasienumum', params)
      const resp = await api.get('/v1/simrs/kasir/rajal/tagihanpergolongan', params)
      if (resp.status === 200) {
        console.log('resp notas ', resp.data)
        this.notas = resp.data
        this.loading = false
      }
      this.loading = false
    }
  }
})
