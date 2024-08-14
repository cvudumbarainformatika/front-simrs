import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
import { routerInstance } from 'src/boot/router'
import * as storage from 'src/modules/storage'

export const useSatsetStore = defineStore('satset_store', {
  state: () => ({
    auth: null,
    loading: false,
    params: {
      token: null,
      q: ''
    },
    dialogTambah: false
  }),
  persist: true,
  actions: {
    async getAuth () {
      const resp = await api.get('v1/satusehat/authorization')
      console.log('percobaan', resp)
      if (resp.status === 200) {
        storage.setTokenSatset(resp.data)
        const hdd = storage.getAuthSatset()
        if (hdd) {
          this.SET_TOKEN_SATSET(hdd)
        }
      }
    },

    SET_TOKEN_SATSET (token) {
      this.auth = token
      this.params.token = this.auth?.access_token
      setTimeout(() => {
        this.loading = false
      }, 2000)
    },

    DELETE_TOKEN_SATSET () {
      storage.delAuthSatset()
      this.auth = null
      this.params.token = null
      routerInstance.push({ path: '/' })
    },
    async getOrganisasi () {
      const params = { params: this.params }
      const resp = await api.get('v1/satusehat/organization', params)
      console.log('organization', resp)
    }
  }
})
