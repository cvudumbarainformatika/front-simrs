import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
import { dateDbFormat } from 'src/modules/formatter'
import { notifSuccess } from 'src/modules/utils'

export const usePerencanaanPoliStore = defineStore('perencanaan-poli', {
  state: () => ({
    plannings: [],
    poli: [],
    plann: '',
    loadingSaveKonsul: false,
    formKonsul: {
      noreg_lama: '',
      norm: '',
      tgl_kunjungan: '',
      tgl_rencana_konsul: dateDbFormat(new Date()),
      kdpoli_asal: '',
      kdpoli_tujuan: '',
      kddokter_asal: ''
    }
  }),
  // getters: {
  //   doubleCount: (state) => state.counter * 2
  // },
  actions: {
    async getMasterPlanning() {
      const resp = await api.get('v1/simrs/pelayanan/mpalningrajal')
      if (resp.status === 200) {
        this.plannings = resp?.data
      }
      console.log('master plann', resp)
    },
    async getMasterPoli() {
      const resp = await api.get('v1/simrs/pelayanan/mpoli')
      if (resp.status === 200) {
        this.poli = resp?.data
      }
      console.log('master poli', resp)
    },

    setFormKonsul(key, val) {
      this.formKonsul[key] = val
    },
    async saveKonsul(pasien) {
      this.loadingSaveKonsul = true
      console.log(pasien)
      this.formKonsul.norm = pasien?.norm
      this.formKonsul.noreg_lama = pasien?.noreg
      this.formKonsul.noreg = pasien?.noreg
      this.formKonsul.tgl_kunjungan = pasien?.tgl_kunjungan
      this.formKonsul.kdpoli_asal = pasien?.kodepoli
      this.formKonsul.kddokter_asal = pasien?.kodedokter
      this.formKonsul.planing = 'Konsultasi'

      try {
        const resp = await api.post('v1/simrs/pelayanan/simpanplaningpasien', this.formKonsul)
        console.log(resp)
        if (resp.status === 200) {
          notifSuccess(resp)
          this.loadingSaveKonsul = false
        }
        this.loadingSaveKonsul = false
      } catch (error) {
        console.log(error)
        this.loadingSaveKonsul = false
      }
    }
  }
})
