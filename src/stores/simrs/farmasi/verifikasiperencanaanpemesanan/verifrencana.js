import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'

export const useVerifikasiRencanaPesanStore = defineStore('verifikasi_rencana_pemesanan', {
  state: () => ({
    loading: false,
    items: [],
    meta: {},
    params: {
      q: '',
      page: 1,
      per_page: 10,
      flag: ['1']
    }
  }),
  actions: {
    setForm(key, val) {
      this.form[key] = val
    },
    setParams(key, val) {
      this.params[key] = val
    },
    setFlag(val) {
      // console.log('flag', val)
      this.setParams('flag', val)
      this.setParams('page', 1)
      this.getDataTable()
    },
    setSearch(val) {
      this.setParams('q', val)
      this.setParams('page', 1)
      this.getDataTable()
    },
    setPerPage(val) {
      this.setParams('per_page', val)
      this.setParams('page', 1)
      this.getDataTable()
    },
    setPage(val) {
      this.setParams('page', val)
      this.getDataTable()
    },
    refresh() {
      this.setParams('page', 1)
      this.getDataTable()
    },
    async getDataTable() {
      const param = { params: this.params }
      this.loading = true
      await api.get('v1/simrs/farmasinew/list-verif', param)
        .then(resp => {
          this.loading = false
          console.log('rencana', resp.data)
          this.items = resp?.data?.data ?? resp.data
          this.meta = resp?.data?.data ? resp?.data : {}
        })
        .catch(() => { this.loading = false })
    }
  }
})
