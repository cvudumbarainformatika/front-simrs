import { defineStore } from 'pinia'
import { api } from 'boot/axios'
// import { routerInstance } from 'src/boot/router'
import { notifErrVue } from 'src/modules/utils'
// import { Dialog } from 'quasar'

export const usePanggilStore = defineStore('panggil_antrian', {
  state: () => ({
    item: null

  }),

  getters: {
    // getterColumns (state) {
    //   return state.columns.filter((el) => !state.columnHide.includes(el))
    // }
  },

  actions: {
    async callLayanan(val, unit, set) {
      if (unit === null) {
        return notifErrVue('Maaf Unit Tidak Boleh Kosong')
      }
      this.item = val
      this.item.unit_id = unit
      this.item.set = set
      try {
        const resp = await api.post('v1/call/calling-layanan', this.item)
        console.log('calling_layanan', resp)
      } catch (error) {
        console.log(error)
      }
    }
  }
})
