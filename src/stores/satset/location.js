import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
// import { routerInstance } from 'src/boot/router'
// import * as storage from 'src/modules/storage'

export const useLocationSatsetStore = defineStore('satset_location_store', {
  state: () => ({
    item: null,
    dialogOpen: false,
    ruanganRajals: [],
    ruangan: null,
    dialogFormRuangan: false,
    loading: false,

    organization_id: '100026342'

  }),
  persist: true,
  actions: {
    setItem(item) {
      this.item = null
      this.item = item
      this.dialogOpen = true
    },
    setRuangan(val) {
      this.ruangan = null
      this.ruangan = val
      this.dialogFormRuangan = true
    },

    async getRuanganRajal() {
      this.loading = true
      const resp = await api.get('v1/satusehat/listRuanganRajal')
      console.log('ruangan rajal', resp)

      if (resp.status === 200) {
        this.ruanganRajals = resp.data
        this.loading = false
      } else {
        this.loading = false
      }
    },

    async updateDataRuangan() {
      this.loading = true
      return new Promise((resolve, reject) => {
        api.post('v1/satusehat/postLocation', this.ruangan)
          .then(resp => {
            console.log(resp)
          })
      })
    }

  }
})
