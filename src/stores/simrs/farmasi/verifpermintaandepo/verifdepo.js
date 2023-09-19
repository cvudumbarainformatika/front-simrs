import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'

export const useVerifPermintaanDepoStore = defineStore('verif_permintaan_depo', {
  state: () => ({
    loading: false,
    items: [],
    params: {
      page: 1,
      q: '',
      per_page: 10,
      no_permintaan: ''
    },
    form: {}
  }),
  actions: {
    setForm(key, val) {
      this.form[key] = val
    },

    getInitialData() {
      this.getPermintaanDepo()
    },
    getPermintaanDepo() {
      this.loading = true
      const param = { params: this.params }
      return new Promise(resolve => {
        api.get('v1/simrs/farmasinew/gudang/distribusi/listpermintaandepo', param)
          .then(resp => {
            this.loading = false
            console.log('list PErmintaan depo', resp.data)
            resolve(resp)
          })
          .catch(() => { this.loading = false })
      })
    }
  }
})
