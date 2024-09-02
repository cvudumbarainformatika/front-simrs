import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'

export const useMappingTindakanStore = defineStore('mapping-tindakan-store', {
  state: () => ({
    items: [],
    meta: null,
    loading: false,

    params: {
      q: '',
      page: 1,
      per_page: 20,
      sort: 'nama',
      kodepoli: null,
      koderuangan: null
    }
  }),
  // getters: {
  //   doubleCount: (state) => state.counter * 2
  // },
  actions: {
    async getTindakans () {
      console.log('getTindakans')
      const params = { params: this.params }
      this.loading = true
      await api.get('v1/simrs/rekammedik/mapping/tindakan', params)
        .then((resp) => {
          console.log('resp tindakan', resp)
          if (resp.status === 200) {
            this.meta = resp?.data
            this.items = this.meta?.data
          }
        })
        .catch((err) => {
          console.log(err)
        })
        .finally(() => {
          this.loading = false
        })
    }
  }
})
