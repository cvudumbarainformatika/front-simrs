import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'

export const usePencarianPasienStore = defineStore('pencarian_pasien_store', {
  state: () => ({
    options: [],
    search: '',
    loading: false
  }),
  getters: {
    doubleCount: (state) => state.counter * 2
  },
  actions: {
    setSearch (payload) {
      this.search = payload
    },

    async filterOptions (val, update, abort) {
      if (!val) {
        update(() => {
          this.options = []
        })
        return
      }
      if (val.length < 3) {
        abort()
        return
      }
      const params = {
        params: {
          q: val
        }
      }
      // console.log('q :', val)
      const resp = await api.get('/v1/simrs/pendaftaran/caripasien', params)
      console.log('cari', resp)
      update(
        () => (this.options = resp.data),
        ref => {
          if (val !== '' && ref.options.length) {
            ref.setOptionIndex(-1)
            ref.moveOptionSelection(1, true)
          }
        }
      )
    }
  }
})
