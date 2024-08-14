import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
import { useSatsetStore } from 'src/stores/satset/index'
import { notifErr, notifSuccess } from 'src/modules/utils'
// import { routerInstance } from 'src/boot/router'
// import * as storage from 'src/modules/storage'

export const useOrganisasiStore = defineStore('organisasi_store', {
  state: () => ({
    loading: false,
    loadingSatset: false,
    loadingPost: false,
    items: [],
    item: null,
    params: {
      q: ''
    },
    dialogTambah: false,
    dialogSatset: false,
    dialogRuangan: false,
    form: {
      nama: '',
      phone: '(0335) 433119,421118',
      email: 'rsudprob@probolinggokota.go.id',
      website: 'rsud.probolinggokota.go.id',
      level: 3
    },

    sender: {
      token: null,
      id: null
    },

    search: ''
  }),
  actions: {
    async getData () {
      this.loading = true
      const params = { params: this.params }
      const resp = await api.get('/v1/satusehat/listOrganisasiRs', params)
      console.log('organisasi', resp)
      if (resp?.status === 200) {
        this.items = resp.data
        this.loading = false
      }
      else {
        this.loading = false
      }
    },

    postData () {
      this.loading = true
      return new Promise((resolve, reject) => {
        api.post('/v1/satusehat/postOrganisasiRs', this.form)
          .then(resp => {
            // console.log(resp)
            this.loading = false
            notifSuccess(resp)
            resolve(resp)
          }).catch(err => {
            this.loading = false
            console.log(err)
            notifErr(err)
          })
      })
    },
    async updateDataRs () {
      // console.log(this.item)
      this.loading = true
      return new Promise((resolve, reject) => {
        api.post('/v1/satusehat/postOrganisasiRs', this.item)
          .then(resp => {
            // console.log(resp)
            this.loading = false
            notifSuccess(resp)
            this.getData()
            // this.dialogSatset = false
            resolve(resp)
          }).catch(err => {
            this.loading = false
            console.log(err)
            notifErr(err)
          })
      })
    },
    async kirimSatset (item) {
      this.loadingSatset = true
      const satset = useSatsetStore()
      this.sender.token = satset.params.token
      this.sender.id = item?.id
      const params = { params: this.sender }

      try {
        const resp = await api.get('/v1/satusehat/sendToSatset', params)
        console.log(resp)
        if (resp.status === 200) {
          if (resp.data.message === 'failed' && resp.data.data.response.issue[0].code === 'invalid-access-token') {
          // harus login lagi
            console.log('token expired')
            satset.DELETE_TOKEN_SATSET()
            return
          }
          this.dialogSatset = false
          this.loadingSatset = false
          this.dialogTambah = false
          this.getData()
        }
        else {
          this.loadingSatset = false
        }
      }
      catch (error) {
        console.log('error send to satset', error)
        this.loadingSatset = false
      }
    },

    setItem (item) {
      this.item = null
      this.item = item
      this.dialogSatset = true

      console.log('pilih item', this.item)
    }
  }
})
