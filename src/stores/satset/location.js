import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
// eslint-disable-next-line no-unused-vars
import { notifErr, notifErrVue, notifSuccess } from 'src/modules/utils'
// eslint-disable-next-line no-unused-vars
import { useSatsetStore } from '.'
// import { routerInstance } from 'src/boot/router'
// import * as storage from 'src/modules/storage'

export const useLocationSatsetStore = defineStore('satset_location_store', {
  state: () => ({
    item: null,
    dialogOpen: false,
    ruanganRajals: [],
    ruanganRanaps: [],
    ruangans: [],
    ruangan: null,
    dialogFormRuangan: false,
    loading: false,
    type: 'rajal',

    search: '',

    organization_id: '100026342',
    departement: null,
    connects: ['Semua', 'Terkoneksi', 'Tidak Terkoneksi'],
    connect: 'Semua'

  }),
  actions: {
    setItem (item) {
      this.item = null
      this.item = item
      this.dialogOpen = true
    },
    setRuangan (val, type) {
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

      this.ruangan.type = type
      this.dialogFormRuangan = true
      console.log('ruangan', this.ruangan)
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
      // console.log('ruangan ranap', resp)

      if (resp.status === 200) {
        this.ruanganRanaps = resp.data
        this.loading = false
      }
      else {
        this.loading = false
      }
    },
    async getRuanganByGroup (group) {
      this.ruangans = []
      this.loading = true
      const params = { params: { group } }
      const resp = await api.get('v1/satusehat/list-ruangan-by-group', params)
      console.log('ruangan' + group, resp)
      if (resp.status === 200) {
        this.ruangans = resp.data
        this.loading = false
      }
      else {
        this.loading = false
      }
    },

    async updateDataRuangan () {
      this.loading = true
      // const satset = useSatsetStore()
      // this.ruangan.token = satset.params.token

      // console.log('post ruangan', this.ruangan)
      return new Promise((resolve, reject) => {
        api.post('v1/satusehat/updateLocation', this.ruangan)
          .then(resp => {
            console.log('resp location', resp)

            // if (resp.data.message === 'failed' && resp.data.data.response.issue[0].code === 'invalid-access-token') {
            //   satset.DELETE_TOKEN_SATSET()
            //   return
            // }
            this.loading = false
            if (resp.data?.message === 'failed') {
              notifErrVue(resp?.data?.data?.response?.issue[0]?.code ?? 'Gagal Update Location Ke satu sehat')
              return
            }

            const items = this.ruangans
            const fn = items.findIndex(x => x.id === this.ruangan.id)
            items[fn].satset_uuid = resp.data?.data?.uuid
            this.ruangans = items

            notifSuccess(resp)
            resolve(resp)
          }).catch(err => {
            console.log(err)
            this.loading = false
            // notifErr(err)
            reject(err)
          })
      })
    }

  }
})
