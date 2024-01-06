import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
import { useSatsetStore } from 'src/stores/satset/index'
// import { routerInstance } from 'src/boot/router'
// import * as storage from 'src/modules/storage'

export const useOrganisasiStore = defineStore('organisasi_store', {
  state: () => ({
    loading: false,
    items: [],
    params: {
      q: ''
    },
    dialogTambah: false,
    form: {
      nama: '',
      phone: '',
      email: 'rsud.probolinggokota@gmail.com',
      website: 'rsud.probolinggokota.go.id'
    },

    sender: {
      token: null,
      id: null
    }
  }),
  actions: {
    async getData() {
      this.loading = true
      const params = { params: this.params }
      const resp = await api.get('v1/satusehat/listOrganisasiRs', params)
      console.log(resp)
      if (resp?.status === 200) {
        this.items = resp.data
        this.loading = false
      } else {
        this.loading = false
      }
    },

    postData() {
      this.loading = true
      return new Promise((resolve, reject) => {
        api.post('v1/satusehat/postOrganisasiRs', this.form)
          .then(resp => {
            console.log(resp)
            this.loading = false
            resolve(resp)
          }).catch(err => {
            this.loading = false
            console.log(err)
          })
      })
    },
    async kirimSatset(item) {
      const satset = useSatsetStore()
      this.sender.token = satset.params.token
      this.sender.id = item?.id
      const params = { params: this.sender }

      const resp = await api.get('v1/satusehat/sendToSatset', params)
      console.log(resp)
    }
  }
})
