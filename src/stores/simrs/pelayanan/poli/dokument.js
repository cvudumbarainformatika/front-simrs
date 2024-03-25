import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'

// eslint-disable-next-line no-unused-vars
export const useDokumen = defineStore('dokument', {
  state: () => ({
    meta: null,
    items: [],
    noreg: null
  }),
  actions: {
    getinit(val) {
      this.noreg = val
      this.getdata()
    },
    async getdata() {
      this.loading = true
      const noreg = { noreg: this.noreg }
      await api.get('/v1/simrs/rajal/poli/terimapasien', noreg)
        .then((resp) => {
          this.loading = false
          if (resp.status === 200) {
            this.meta = resp.data.table
            this.items = resp.data.table.data
          }
        }).catch((err) => {
          console.log(err)
          this.loading = false
        })
    }
  }
})
