import { defineStore } from 'pinia'

export const useTransitionStore = defineStore('transition', {
  state: () => ({
    effect: 'default',
    pageTransition: {
      name: 'router-view',
      mode: 'in-out'
    }
  }),
  // getters: {
  //   doubleCount: (state) => state.counter * 2
  // },
  actions: {
    setPageTransition (payload) {
      if (payload === 'default') {
        this.pageTransition.name = 'router-view'
        this.pageTransition.mode = 'in-out'
      }
      else {
        this.pageTransition.mode = 'router-view-back'
        this.pageTransition.mode = ''
      }
    }
  }
})
