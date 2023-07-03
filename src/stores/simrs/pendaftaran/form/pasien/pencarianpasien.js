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
    // async searchPasien() {
    //   this.loading = true
    //   try {
    //     const params = { params: { search: this.search } }
    //     const resp = await api.get('/v1/simrs/pendaftaran/caripasien', params)
    //     if (resp.status === 200) {
    //       console.log('cariPasien', resp)
    //     }
    //   } catch (error) {
    //     this.loading = false
    //   }
    // }

    async filterOptions (val, update) {
      if (!val) {
        update(() => {
          this.options = []
        })
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
