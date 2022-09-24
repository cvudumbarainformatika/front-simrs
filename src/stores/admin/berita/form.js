import { defineStore } from 'pinia'

export const useBeritaForm = defineStore('berita_form', {
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
