import { defineStore } from 'pinia'

export const useBeritaStore = defineStore('berita_table', {
  state: () => ({
    form: {
      title: null,
      slug: null,
      content: null,
      kategori: null,
      image: null
    }
  }),
  getters: {
    doubleCount: (state) => state.counter * 2
  },
  actions: {
    increment () {
      this.counter++
    }
  }
})
