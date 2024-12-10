import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'

export const usePengembalianPinjamanStore = defineStore('spjopname', {
  state: () => ({
    loading: false,
    loadingNoper: false,
    params: {
      q: '',
      page: 1,
      per_page: 10
    },
    form: {},
    penyedias: [],
    nopenerimaans: []
  }),
  actions: {
    setParams (key, val) {
      this.params[key] = val
    },
    setForm (key, val) {
      this.form[key] = val
    },
    getInitialData () {
      this.getPenyedias()
    },
    getPenyedias () {
      return new Promise(resolve => {
        this.loading = true
        api.get('v1/simrs/penunjang/farmasinew/pengembalian/get-pbf')
          .then(resp => {
            this.loading = false
            console.log('resp', resp?.data)

            this.penyedias = resp?.data?.data ?? []
            resolve(resp)
          })
          .catch(() => { this.loading = false })
      })
    },
    getNopenerimaans () {
      const param = { params: this.params }
      return new Promise(resolve => {
        this.loadingNoper = true
        api.get('v1/simrs/penunjang/farmasinew/pengembalian/get-noper', param)
          .then(resp => {
            this.loadingNoper = false
            console.log('resp', resp?.data)

            this.nopenerimaans = resp?.data?.data ?? []
            resolve(resp)
          })
          .catch(() => { this.loadingNoper = false })
      })
    }

  }
})
