import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'

export const useFarmasiPemakaianRuanganStore = defineStore('farmasi_pemakaian_ruangan', {
  state: () => ({
    loading: false,
    meta: {},
    items: [],
    params: {
      q: '',
      page: 1,
      per_page: 10,
      kdruang: ''
    },
    form: {}
  }),
  actions: {
    setParam(key, val) {
      this.params[key] = val
    },
    setForm(key, val) {
      this.form[key] = val
    },
    setSearch(val) {
      this.setParam('q', val)
      this.setParam('page', 1)
      this.getStokRuangan()
    },
    setPerPage(val) {
      this.setParam('per_page', val)
      this.setParam('page', 1)
      this.getStokRuangan()
    },
    setPage(val) {
      this.setParam('page', val)
      this.getStokRuangan()
    },
    refresh() {
      this.setParam('page', 1)
      this.getStokRuangan()
    },

    getInitialData() {
      this.getStokRuangan()
    },
    async getStokRuangan() {
      const param = { params: this.params }
      this.loading = true
      await api.get('v1/simrs/penunjang/farmasinew/ruangan/get-stok-ruangan', param)
        .then(resp => {
          this.loading = false
          console.log('stok ruangan', resp.data)
          this.items = resp?.data?.data ?? resp?.data
          this.meta = resp?.data?.data ? resp?.data : {}
        })
        .catch(() => { this.loading = false })
    }
  }
})
