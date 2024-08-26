import { defineStore } from 'pinia'

export const useTriageIgd = defineStore('triageigd', {
  state: () => ({
    loadingForm: false,
    loadingHistory: false,
    pasienhamil: 0,
    form: {

    }
  })
})
