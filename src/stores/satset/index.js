import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
// import { routerInstance } from 'src/boot/router'
import * as storage from 'src/modules/storage'

export const useSatsetStore = defineStore('satset_store', {
  state: () => ({
    auth: null,
    loading: false
  }),
  persist: true,
  actions: {
    async getAuth() {
      const resp = await api.get('v1/satusehat/auhorization')
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
      setTimeout(() => {
        this.loading = false
      }, 2000)
    },
    async getData() {
      // const resp = await api.get('v1/satusehat/percobaan')
      // console.log('percobaan', resp)
    }
  }
})
