import { defineStore } from 'pinia'
// import { api } from 'src/boot/axios'
import * as storage from 'src/modules/storage'

export const useAplikasiStore = defineStore('aplikasiX', {
  state: () => ({
    loading: false,
    items: [],
    aksesApps: [],
    aksesMenus: [],
    aksesSubs: [],

    currentApp: null,
    user: null

  }),
  persist: true,
  getters: {
  },
  actions: {
    getItems() {
      this.loading = true
      this.items = storage.getApps('apps') ? storage.getApps('apps') : []
      this.loading = false
    },

    setItems(val) {
      this.items = val
    },
    setUser(val) {
      this.user = val
    },
    setAksesApps(val) {
      this.aksesApps = val
    },

    setCurrentApp(val) {
      this.currentApp = val
    }
  }

})
