import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
import { notifErr, notifSuccess } from 'src/modules/utils'
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
      per_page: 20,
      to: '',
      from: ''
    },
    pasiens: [],
    meta: null
  }),
  actions: {
    async getData () {
      this.loading = true
      const params = { params: this.params }
      const resp = await api.get('v1/satusehat/listKunjungan', params)
      console.log(resp)
      if (resp.status === 200) {
        this.loading = false
        this.meta = resp.data
        this.pasiens = resp?.data?.data
      }
      else {
        this.loading = false
      }
    },

    goToPage (val) {
      this.params.page = val
      this.getData()
    },

    getSatsetId (pasien) {
      this.loading = true

      const satset = useSatsetStore()
      const params = pasien
      params.token = satset?.params.token

      return new Promise((resolve, reject) => {
        api.post('v1/satusehat/getPasienByNikSatset', params)
          .then((resp) => {
            console.log(resp)
            this.loading = false
            this.getData()
            if (resp.data.message === 'failed' && resp.data.data.response.issue[0].code === 'invalid-access-token') {
              // harus login lagi
              console.log('token expired')
              satset.DELETE_TOKEN_SATSET()
              return
            }
            if (resp.data.message === 'failed') {
              // harus login lagi
              notifErr(resp)
              return
            }
            if (resp.data.message === 'success') {
              notifSuccess(resp)
            }
            else {
              notifErr(resp)
            }
          })
          .catch(err => {
            console.log(err)
            this.loading = false
            notifErr(err)
          })
      })
    },

    async kirimKunjunganSatset (pasien) {
      this.loadingSend = true

      const satset = useSatsetStore()
      const params = pasien
      params.token = satset?.params.token

      return new Promise((resolve, reject) => {
        api.post('v1/satusehat/kirimKunjungan', params)
          .then((resp) => {
            console.log('kirim kunjungan', resp)
            this.loadingSend = false

            if (resp.data.message === 'failed' && resp.data.data.response.issue[0].code === 'invalid-access-token') {
              // harus login lagi
              console.log('token expired')
              satset.DELETE_TOKEN_SATSET()
              return
            }

            this.getData()
            if (resp.data.message === 'success') {
              notifSuccess(resp)
            }
            else {
              notifErr(resp)
            }
          })
          .catch(err => {
            console.log(err)
            this.loadingSend = false
            notifErr(err)
          })
      })
    }
  }
})
