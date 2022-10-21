import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'

export const useTableMenu = defineStore('table_menu', {
  state: () => ({
    items: [],
    form: {
      nama: null
    },
    dialog: false,
    loading: false
  }),
  // getters: {
  //   doubleCount: (state) => state.counter * 2
  // },
  actions: {
    async getData() {
      await api.get('/v1/menus').then(resp => {
        console.log('menus', resp)
        this.items = resp.data
      })
    },

    addNew() {
      this.dialog = true
    },

    async saveForm() {
      this.loading = true
      await api.post('/v1/store_menu', this.form).then((resp) => {
        console.log('form', resp)
        if (resp.status === 201) {
          this.form.nama = null
          this.loading = false
          this.getData()
        }

        this.loading = false
      })
    }
  }
})
