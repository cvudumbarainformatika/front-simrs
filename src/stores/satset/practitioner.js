import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
import { notifErr } from 'src/modules/utils'
import { useSatsetStore } from 'src/stores/satset/index'

export const usePractitionerStore = defineStore('satset_practitioner_store', {
  state: () => ({
    loading: false,
    loadingSend: false,
    meta: null,
    params: {
      q: '',
      status: 'Semua',
      per_page: 30,
      page: 1
    },
    items: []
  }),
  actions: {
    async getData() {
      this.loading = true
      const params = { params: this.params }
      const resp = await api.get('v1/satusehat/listPractitioner', params)

      console.log(resp)
      if (resp.status === 200) {
        this.meta = resp.data
        this.items = resp.data.data
        this.loading = false
      } else {
        this.loading = false
      }
    },

    whereStatus() {
      this.params.page = 1
      this.getData()
    },

    searchData(val) {
      this.params.page = 1
      this.params.q = val
      this.getData()
    },

    goToPage(val) {
      this.params.page = val
      this.getData()
    },

    async sendToSatset(id) {
      this.loadingSend = true
      const satset = useSatsetStore()
      const params = {
        id,
        token: satset.params.token
      }

      try {
        const resp = await api.post('v1/satusehat/getPractitionerSatset', params)
        console.log(resp)
        this.loadingSend = false
        if (resp.data.message === 'success') {
          this.getData()
          return
        }

        if (resp.data.message === 'failed' && resp.data.data.response.issue[0].code === 'invalid-access-token') {
          // harus login lagi
          console.log('token expired')
          satset.DELETE_TOKEN_SATSET()
          return
        }

        notifErr(resp)
      } catch (error) {
        this.loadingSend = false
        notifErr(error)
        console.log(error)
      }
    }
  }
})
