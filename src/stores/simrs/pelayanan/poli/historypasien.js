import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'

export const useHistoryPasien = defineStore('history-pasien', {
  state: () => ({
    items: [],
    meta: null,
    loading: false,
    params: {
      page: 1,
      per_page: 20,
      norm: ''
    }
  }),
  // getters: {
  //   doubleCount: (state) => state.counter * 2
  // },
  actions: {
    async getData(pasien) {
      this.loading = true
      try {
        this.params.norm = pasien?.norm
        const params = { params: this.params }
        const resp = await api.get('v1/simrs/historypasien/historypasienfull', params)
        console.log('history  ', resp)
        if (resp.status === 200) {
          this.items = resp?.data?.data
          this.meta = resp?.data
          this.loading = false
        }
        this.loading = false
      } catch (error) {
        this.loading = false
      }
    }
  }
})
