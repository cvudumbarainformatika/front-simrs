import { defineStore } from 'pinia'
import { api } from 'boot/axios'
// import { routerInstance } from 'src/boot/router'
import { notifErrVue } from 'src/modules/utils'
// import { Dialog } from 'quasar'

export const usePanggilStore = defineStore('panggil_antrian', {
  state: () => ({
    item: null,
    loading: false
  }),

  getters: {
    // getterColumns (state) {
    //   return state.columns.filter((el) => !state.columnHide.includes(el))
    // }
  },

  actions: {
    async callLayanan(val, unit, set) {
      this.loading = true
      if (unit === null) {
        return notifErrVue('Maaf Unit Tidak Boleh Kosong')
      }
      this.item = val
      this.item.unit_id = unit
      this.item.set = set
      try {
        const resp = await api.post('v1/call/calling-layanan', this.item)
        console.log('calling_layanan', resp)
        if (resp.status === 200) {
          const code = resp.data.code
          if (code === 202) {
            notifErrVue(resp.data.message)
          }
        }
        setTimeout(() => {
          this.loading = false
        }, 1000)
      } catch (error) {
        console.log(error)
        this.loading = false
      }
    }
  }
})
