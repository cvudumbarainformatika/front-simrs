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
    user: {},
    gudangs: [],
    polis: [],
    ruangs: [],
    depos: [
      { nama: 'Floor Stock 1 (AKHP)', value: 'Gd-03010101' },
      { nama: 'Depo Rawat inap', value: 'Gd-04010102' },
      { nama: 'Depo OK', value: 'Gd-04010103' },
      { nama: 'Depo Rawat Jalan', value: 'Gd-05010101' },
      { nama: 'Depo IGD', value: 'Gd-02010104' }
    ]

  }),
  persist: true,
  getters: {
  },
  actions: {
    getItems () {
      this.loading = true
      this.items = storage.getApps('apps') ? storage.getApps('apps') : []
      this.loading = false
    },

    setItems (val) {
      // console.log('set items', val)
      this.items = val
    },
    setGudang (val) {
      // console.log('set gudang', val)
      this.gudangs = val
    },
    setPoli (val) {
      // console.log('set poli', val)
      this.polis = val
    },
    setRuang (val) {
      // console.log('set poli', val)
      this.ruangs = val
    },
    setUser (val) {
      this.user = val
    },
    setUserKey (key, val) {
      // console.log('set user key', val)
      this.user[key] = val
    },
    setAksesApps (val) {
      this.aksesApps = val
      // console.log('set akses apps', val, this.user)
    },
    setCurrentApp (val) {
      return new Promise((resolve, reject) => {
        try {
          this.currentApp = val
          resolve(true)
        }
        catch (error) {
          reject(error)
        }
      })
    }
  }

})
