import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'

export const useBpjsHttpResponseList = defineStore('bpjs_http_response_list', {
  state: () => ({
    items: [],
    meta: null,
    loading: false,
    params: {
      per_page: 50
    }
  }),
  getters: {
    doubleCount: (state) => state.counter * 2
  },
  actions: {
    async getData() {
      this.loading = true
      const params = { params: this.params }
      await api.get('/v1/simrs/history/bpjs_respon/data', params)
        .then(resp => {
          console.log('bpjs_http_respon', resp)
          this.loading = false
          if (resp.status === 200) {
            this.meta = resp.data
            this.items = resp.data.data
          }
        })
        .catch(err => {
          console.log(err)
          this.loading = false
        })
    }
  }
})
