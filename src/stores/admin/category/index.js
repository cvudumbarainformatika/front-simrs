import { defineStore } from 'pinia'
import { api } from 'boot/axios'
// import { routerInstance } from 'src/boot/router'
// import { notifErr, notifSuccess } from 'src/modules/utils'
// import { Dialog } from 'quasar'

export const useCategoryStore = defineStore('category_index', {
  state: () => ({
    items: [],
    loading: false
  }),

  // getters: {
  //   getterColumns (state) {
  //     return state.columns.filter((el) => !state.columnHide.includes(el))
  //   }
  // },

  actions: {
    async getAll () {
      this.loading = true
      const resp = await api.get('/v1/categories')
      console.log('categories', resp)
      this.items = resp.data
      this.loading = false
    }
  }
})
