import { defineStore } from 'pinia'

export const useIdentityStore = defineStore('identity_store', {
  state: () => ({
    qrCode: 'RSUD MOH SALEH'
  }),

  actions: {
    makeid(length) {
      let result = ''
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
      const charactersLength = characters.length
      let counter = 0
      while (counter < length) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength))
        counter += 1
      }
      return result
    },
    makeQr() {
      const uid = Date.now().toString(36) + Math.random().toString(36)
      this.qrCode = `${uid}/${this.makeid(3)}`
    }
  }
})
