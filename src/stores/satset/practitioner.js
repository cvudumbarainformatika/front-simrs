import { defineStore } from 'pinia'

export const usePractitionerStore = defineStore('satset_practitioner_store', {
  state: () => ({
    loading: false,
    params: {
      q: ''
    },
    items: []
  }),
  actions: {

  }
})
