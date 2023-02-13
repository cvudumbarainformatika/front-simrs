import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'

export const useSettingsAplikasiStore = defineStore('settings_aplikasi', {
  state: () => ({
    aplikasi: [],
    loading: false
  }),
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
