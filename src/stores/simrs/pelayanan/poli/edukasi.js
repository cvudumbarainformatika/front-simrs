import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'

export const useEdukasiPoliStore = defineStore('edukasi-poli', {
  state: () => ({
    mpenerimaedukasi: [],
    mkebutuhanedukasi: [],
    selectKebutuhanEdukasi: [],
    form: {
      noreg: '',
      norm: '',
      edukasi: '',
      koderuang: '', // kodepoli
      kepada: '',
      perlupenerjemah: 'Tidak',
      bahasaisyarat: 'Tidak',
      caraedukasi: '',
      kesediaan: '',
      kebutuhanedukasi: ''
    },
    loadingSave: false
  }),
  getters: {
    doubleCount: (state) => state.counter * 2
  },
  actions: {
    async getMasterPenerimaEdukasi() {
      const resp = await api.get('v1/simrs/pelayanan/mpenerimaedukasi')
      console.log('mpenerimaedukasi', resp)
      if (resp?.status === 200) {
        this.mpenerimaedukasi = resp?.data
      }
    },
    async getMasterKebutuhanEdukasi() {
      const resp = await api.get('v1/simrs/pelayanan/mkebutuhanedukasi')
      console.log('mkebutuhanedukasi', resp)
      if (resp?.status === 200) {
        this.mkebutuhanedukasi = resp?.data
      }
    }
  }
})
