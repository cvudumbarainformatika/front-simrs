import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'

export const useDashboardLaborat = defineStore('dashboard_laborat', {
  state: () => ({
    itemLabs: [],
    itemLabLuars: [],
    loading: false
  }),
  // getters: {
  //   doubleCount: (state) => state.counter * 2
  // },
  actions: {
    async getLaboratDashboards () {
      this.loading = true
      try {
        await api.get('/v1/dashboard_laborat').then(resp => {
          console.log(resp)
          this.itemLabs = resp.data.lab
          this.itemLabLuars = resp.data.lab_luar
          this.loading = false
          // console.log('mapping', this.itemLabs)
        })
      } catch (error) {
        this.loading = false
      }
    }
  }
})
