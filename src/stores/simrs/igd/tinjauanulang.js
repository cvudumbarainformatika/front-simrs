import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
import { notifErr } from 'src/modules/utils'

export const useTinjauanUlangStore = defineStore('tinjauan_ulang_store', {
  state: () => ({
    loadingForm: false,
    basic: false,
    form: {
      nadi: 0,
      pernapasanx: 0,
      sistole: 0,
      diastole: 0,
      suhu: 0,
      spo2: 0,

      scorenadi: 0,
      skorpernafasan: 0,
      skorsistole: 0,
      skordiastole: 0,
      skorsuhu: 0,
      skorspo2: 0,

      skornyeri: 0,
      keteranganscorenyeri: 'tidak ada nyeri'

    }
  }),
  actions: {
    async ambiltriage (noreg) {
      const params = { params: { noreg } }
      try {
        const resp = await api.get('v1/simrs/pelayanan/igd/getDataTriage', params)
        // console.log('history', resp)
        if (resp.status === 200) {
          if (resp.data?.length) {
            const arr = resp.data
            this.historyMeta = null
            this.historys = arr
          }
          else {
            this.historys = []
          }
        }
        this.loadingHistory = false
      }
      catch (error) {
        this.loadingHistory = false
        notifErr(error)
      }
    }
  }
})
