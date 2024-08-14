import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'

export const useDialogCariPasienPendaftaranUmum = defineStore('dialog_cari_pasienPendaftaran_umum', {
  state: () => ({
    loading: false,
    meta: {},
    items: [],
    columns: ['norm', 'Nama', 'NIK', 'Alamat'],
    columnHide: [],
    params: {
      q: '',
      per_page: 10,
      page: 1
    }
  }),
  actions: {
    setParams (key, val) {
      this.params[key] = val
    },
    setPage (payload) {
      // console.log('setPage', payload)
      this.params.page = payload
      this.getDataPasien()
    },
    setPerPage (payload) {
      this.params.per_page = payload
      this.params.page = 1
      this.getDataPasien()
    },
    refreshTable () {
      this.params.page = 1
      this.getDataPasien()
    },
    setSearch (val) {
      this.params.q = val
      this.params.page = 1
      this.getDataPasien()
    },
    getInitialData () {
      // this.getDataPasien()
    },
    // api related function
    async getDataPasien () {
      this.loading = true
      const param = { params: this.params }
      await api.get('v1/simrs/master/pasienGetNoRM', param)
        .then(resp => {
          this.items = resp.data.data
          this.meta = resp.data
          this.loading = false
        })
        .catch(() => { this.loading = false })
    }
  }
})
