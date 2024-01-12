import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
// import { routerInstance } from 'src/boot/router'
// import * as storage from 'src/modules/storage'
import { useSatsetStore } from 'src/stores/satset/index'

export const useSatsetRajalStore = defineStore('satset_rajal_store', {
  state: () => ({
    loading: false,
    loadingSend: false,
    params: {
      q: '',
      jenis: 'rajal',
      page: 1,
      per_page: 20
    },
    pasiens: []
  }),
  actions: {
    async getData() {
      this.loading = true
      const params = { params: this.params }
      const resp = await api.get('v1/satusehat/listKunjungan', params)
      console.log(resp)
      if (resp.status === 200) {
        this.loading = false
        this.pasiens = resp?.data?.data
      } else {
        this.loading = false
      }
    },

    getSatsetId(pasien) {
      this.loading = true

      const satset = useSatsetStore()
      const params = pasien
      params.token = satset?.params.token

      return new Promise((resolve, reject) => {
        api.post('v1/satusehat/getPasienByNikSatset', params)
          .then((resp) => {
            // console.log(resp)
            this.loading = false
            this.getData()
          })
          .catch(err => {
            console.log(err)
            this.loading = false
          })
      })
    },

    async kirimKunjunganSatset(pasien) {
      this.loadingSend = true

      const satset = useSatsetStore()
      const params = pasien
      params.token = satset?.params.token

      return new Promise((resolve, reject) => {
        api.post('v1/satusehat/kirimKunjungan', params)
          .then((resp) => {
            console.log('kirim kunjungan', resp)
            this.loadingSend = false
            // this.getData()
          })
          .catch(err => {
            console.log(err)
            this.loadingSend = false
          })
      })
    }
  }
})
