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
