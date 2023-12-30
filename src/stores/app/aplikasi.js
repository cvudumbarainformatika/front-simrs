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
    user: null,
    gudangs: null,
    polis: null,
    ruangs: null

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
    setGudang(val) {
      // console.log('set gudang', val)
      this.gudangs = val
    },
    setPoli(val) {
      // console.log('set poli', val)
      this.polis = val
    },
    setRuang(val) {
      // console.log('set poli', val)
      this.ruangs = val
    },
    setUser(val) {
      this.user = val
    },
    setUserKey(key, val) {
      console.log('key', key)
      console.log('val', val)
      this.user[key] = val
    },
    setAksesApps(val) {
      this.aksesApps = val
    },

    setCurrentApp(val) {
      this.currentApp = val
    }
  }

})
