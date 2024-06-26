import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'

export const useAmbulanStore = defineStore('ambulan-store', {
  state: () => ({
    loadingForm: false,
    loadingHistory: false,
    tujuanambulan: '',
    listperawat: '',
    form: {
      tujuan: '',
      keterangan: '',
      pelsupir: '',
      pelperawat: '',
      perawatpendamping1: '',
      perawatpendamping2: '',
      dokterikut: ''
    }
  }),
  actions: {
    async getTujuanAmbulan () {
      const resp = await api.get('v1/simrs/penunjang/ambulan/gettujuanambulan')
      if (resp.status === 200) {
        this.tujuanambulan = resp.data
      }
    },
    async getperawatpedamping () {
      const resp = await api.get('v1/simrs/master/nakes/selaindokter')
      if (resp.status === 200) {
        this.listperawat = resp.data
      }
    },
    async saveOrderAmbulan (pasien) {

    }
  }
})
