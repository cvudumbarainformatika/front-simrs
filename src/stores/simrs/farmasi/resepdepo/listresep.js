import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
import { notifSuccess } from 'src/modules/utils'

export const useListResepDepoStore = defineStore('list_resep_depo', {
  state: () => ({
    loading: false,
    loadingHapus: false,
    params: {
      page: 1,
      per_page: 10,
      q: ''
    },
    items: [],
    meta: {},
    columns: [
      'pasien',
      'resep',
      'tagihan',
      'ina',
      'diagnosa'
    ]
  }),
  actions: {
    setParam (key, val) {
      this.params[key] = val
    },
    setParams (key, val) {
      this.params[key] = val
    },
    setSearch (payload) {
      this.setParam('q', payload)
      this.setParam('page', 1)
      this.getData()
    },
    setPage (payload) {
      this.setParam('page', payload)
      this.getData()
    },
    setPerPage (payload) {
      this.setParam('per_page', payload)
      this.setParam('page', 1)
      this.getData()
    },
    refreshTable () {
      this.setParam('page', 1)
      this.getData()
    },
    getInitialData () {
      this.getData()
    },
    getData () {
      this.loading = true
      const param = {
        params: this.params
      }
      return new Promise(resolve => {
        api.get('v1/simrs/farmasinew/depo/listresep', param)
          .then(resp => {
            this.loading = false
            console.log('list resep', resp.data)
            this.items = resp?.data?.data ?? resp.data
            this.meta = resp?.data?.data ? resp.data : {}
            console.log('meta', this.meta)
            resolve(resp)
          })
          .catch(() => { this.loading = false })
      })
    },
    hapusResep (row, rin) {
      console.log('hpus', row, rin)
      this.loadingHapus = true
      const form = {
        kdobat: rin?.kdobat,
        koderuang: row?.depo,
        nota: row?.nota
      }
      console.log('form', form)
      return new Promise(resolve => {
        api.post('v1/simrs/farmasinew/depo/hapusobat', form)
          .then(resp => {
            this.loadingHapus = false
            notifSuccess(resp)
            this.getData()
            resolve(resp)
          })
          .catch(() => {
            this.loadingHapus = false
          })
      })
    }
  }
})
