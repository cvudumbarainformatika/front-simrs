import { defineStore } from 'pinia'
import { date } from 'quasar'

export const useTriageIgd = defineStore('triageigd', {
  state: () => ({
    loadingForm: false,
    loadingHistory: false,
    form: {
      pasienhamil: 0,
      haid: ''
    }
  }),
  actions: {
    formattanggal () {
      const sekarang = Date.now()
      this.form.haid = date.formatDate(sekarang, 'YYYY-MM-DD')
    }
  }
})
