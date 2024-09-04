import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
import { notifSuccess } from 'src/modules/utils'

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
    columns: ['kd_obat', 'nama_obat', 'kode_kfa', 'kode_kfa_93']
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
      this.items = []
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
    },
    simpan (val) {
      val.loading = true
      return new Promise(resolve => {
        api.post('v1/satusehat/mapingkfa/simpan-maping-kfa', val)
          .then(resp => {
            val.loading = false
            notifSuccess(resp)
            console.log('simpan', resp?.data)
            resolve(resp)
          })
          .catch(() => { val.loading = false })
      })
    },
    simpanKFA (val) {
      val.loadingKfa = true
      return new Promise(resolve => {
        api.post('v1/satusehat/mapingkfa/get-kfa', val)
          .then(resp => {
            val.loadingKfa = false
            notifSuccess(resp)
            val.kfa = resp?.data?.simpan
            console.log('simpan', resp?.data)
            resolve(resp)
          })
          .catch(() => { val.loadingKfa = false })
      })
    }
  }
})
