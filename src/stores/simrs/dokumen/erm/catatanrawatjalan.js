import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
import { notifErr } from 'src/modules/utils'

export const useCatatanRawatJalanStore = defineStore('erm_catatanrawatjalan', {
  state: () => ({
    loading: false,
    items: {},
    // $q: {
    //   loading: {}
    // },
    params: {
      tahunawal: {},
      tahunakhir: {},
      norm: {}
    }
  }),
  actions: {
    init(val) {
      this.params.norm = val
      this.getDataCatatan()
    },
    async getDataCatatan() {
      this.loading = true
      // console.log('load', this.loading)
      const params = { params: this.params }
      return new Promise(resolve => {
        api.get('v1/simrs/dokumen/rajal/catatanrawatjalan', params)
          .then(resp => {
            this.loading = false
            // console.log('loadx', this.loading)
            this.items = resp?.data
            resolve(resp)
          })
          .catch(() => {
            notifErr()
            this.loading = false
          })
      })
    }

  }
})
