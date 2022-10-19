import { defineStore } from 'pinia'

export const useTransitionStore = defineStore('transition', {
  state: () => ({
    pageTransition: {
      name: 'router-view',
      mode: 'in-out'
    }
  }),
  // getters: {
  //   doubleCount: (state) => state.counter * 2
  // },
  actions: {
    setPageTransition(payload) {
      if (payload === 'default') {
        this.pageTransition.mode = 'in-out'
      } else {
        this.pageTransition.mode = ''
      }
      // if (payload === 'default') {
      //   // app.set(state, 'pageTransition', {
      //   //   name: 'router-view',
      //   //   mode: 'in-out'
      //   // })
      //   this.pageTransition.name = 'router-view',
      //   this.pageTransition.mode = 'in-out',
      // }
      // if (payload === 'back') {
      //   this.pageTransition.name = 'router-view',
      //   this.pageTransition.mode = '',
      // }
    }
  }
})
