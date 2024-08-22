import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'

export const useMapingKfaStore = defineStore('store_maping_kfa', {
  state: () => ({
    items: [],
    loading: false,
    loadingSimpan: false,
    meta: {},
    params: {
      q: '',
      page: 1,
      per_page: 10
    },
    form: {
      kd_obat: ''
    },
    columns: ['kd_obat', 'nama_obat', 'satset_uuid']
  }),
  actions: {
    setForm (key, val) {
      this.form[key] = val
    },
    setParams (key, val) {
      this.params[key] = val
    },
    setSearch (val) {
      this.setParams('q', val)
      this.setParams('page', 1)
      this.getDataTable()
    },
    setPerPage (val) {
      this.setParams('per_page', val)
      this.setParams('page', 1)
      this.getDataTable()
    },
    setPage (val) {
      this.setParams('page', val)
      this.getDataTable()
    },
    refreshTable () {
      this.getDataTable()
    },

    getDataTable () {
      this.loading = true
      const param = { params: this.params }
      return new Promise(resolve => {
        api.get('v1/satusehat/mapingkfa/master-obat', param)
          .then(resp => {
            this.loading = false
            console.log('master maping', resp?.data)
            this.items = resp?.data?.data ?? resp?.data
            this.meta = resp?.data?.meta ?? resp?.data
            resolve(resp)
          })
          .catch(() => { this.loading = false })
      })
    }
  }
})
