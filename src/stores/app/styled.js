import { defineStore } from 'pinia'

export const useStyledStore = defineStore('style_app', {
  state: () => ({
    componentfull: false
  }),
  actions: {
    setComponentFull() {
      this.componentfull = !this.componentfull
    }
  }
})
