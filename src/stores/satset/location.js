import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
import { notifErr, notifSuccess } from 'src/modules/utils'
import { useSatsetStore } from '.'
// import { routerInstance } from 'src/boot/router'
// import * as storage from 'src/modules/storage'

export const useLocationSatsetStore = defineStore('satset_location_store', {
  state: () => ({
    item: null,
    dialogOpen: false,
    ruanganRajals: [],
    ruanganRanaps: [],
    ruangan: null,
    dialogFormRuangan: false,
    loading: false,

    organization_id: '100026342'

  }),
  actions: {
    setItem (item) {
      this.item = null
      this.item = item
      this.dialogOpen = true
    },
    setRuangan (val) {
      this.ruangan = null
      this.ruangan = val

      this.ruangan.phone = '(0335) 433119,421118'
      this.ruangan.fax = '-'
      this.ruangan.email = 'rsudprob@probolinggokota.go.id'
      this.ruangan.web = 'https://rsud.probolinggokota.go.id'
      this.ruangan.alamat = 'Jl. Mayjen Panjaitan No.65 Kota Probolinggo'
      this.ruangan.rt = '-'
      this.ruangan.rw = '-'
      this.ruangan.longitude = '-7.744970846652828'
      this.ruangan.latitude = '113.21050988068147'
      this.dialogFormRuangan = true
    },

    async getRuanganRajal () {
      this.loading = true
      const resp = await api.get('v1/satusehat/listRuanganRajal')
      console.log('ruangan rajal', resp)

      if (resp.status === 200) {
        this.ruanganRajals = resp.data
        this.loading = false
      }
      else {
        this.loading = false
      }
    },
    async getRuanganRanap () {
      this.loading = true
      const resp = await api.get('v1/satusehat/listRuanganRanap')
      console.log('ruangan ranap', resp)

      if (resp.status === 200) {
        this.ruanganRanaps = resp.data
        this.loading = false
      }
      else {
        this.loading = false
      }
    },

    async updateDataRuangan () {
      this.loading = true
      const satset = useSatsetStore()
      this.ruangan.token = satset.params.token
      return new Promise((resolve, reject) => {
        api.post('v1/satusehat/updateLocation', this.ruangan)
          .then(resp => {
            // console.log(resp)
            if (resp.data.message === 'failed' && resp.data.data.response.issue[0].code === 'invalid-access-token') {
              satset.DELETE_TOKEN_SATSET()
              return
            }
            if (resp.data.message === 'failed') {
              notifErr(resp)
            }
            this.loading = false
            notifSuccess(resp)
            resolve(resp)
          }).catch(err => {
            console.log(err)
            this.loading = false
            notifErr(err)
            reject(err)
          })
      })
    }

  }
})
