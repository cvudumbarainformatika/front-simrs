import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
// import { notifSuccess } from 'src/modules/utils'

export const useSettingsAplikasi = defineStore('settings_aplikasi', {
  state: () => ({
    items: [],
    loading: false
  }),
  // getters: {
  //   doubleCount: (state) => state.counter * 2
  // },
  actions: {
    async getData() {
      this.loading = true
      await api.get('/v1/settings/appmenu/aplikasi').then(resp => {
        console.log('settings aplikasi :', resp)
        this.loading = false
        // this.items = resp.data
      })
    }
  }
})