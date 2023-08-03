import { defineStore } from 'pinia'

export const useStyledStore = defineStore('style_app', {
  state: () => ({
    componentfull: false,
    rightDrawer: false
  }),
  actions: {
    setComponentFull() {
      this.componentfull = !this.componentfull
    },
    setRightDrawer() {
      this.rightDrawer = !this.rightDrawer
    }
  }
})
