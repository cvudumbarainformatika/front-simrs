import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
export const useDokumenpengkajianawalmedisrjStore = defineStore('dokumen_pengkajianawalmedisrj', {
  state: () => ({
    loading: false,
    items: [],
    item: {},
    meta: {},
    params: {
      noreg: ''
    }
  }),
  actions: {
    setParams(key, val) {
      this.params[key] = val
    },
    getData() {
      this.item = {}
      this.loading = true
      const param = { params: this.params }
      return new Promise(resolve => {
        api.get('v1/simrs/rajal/poli/datamrerajal', param)
          .then(resp => {
            this.loading = false
            console.log('resp resume', resp.data)
            this.item = resp.data
            resolve(resp)
          })
          .catch(() => { this.loading = false })
      })
    }
  }
})
