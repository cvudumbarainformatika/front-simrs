import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
import { notifErrVue } from 'src/modules/utils'

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
    },
    loadingSaveAmbulan: false
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
      if (!pasien?.kodedokter) {
        return notifErrVue('kode Dokter masih kosong, silahkan tutup dulu pasien ini kemudian tekan tombol refresh di pojok kanan atas')
      }
      const formamb = this.form
      formamb.noreg = pasien?.noreg
      formamb.norm = pasien?.norm
      formamb.kodedokter = pasien?.kodedokter
      formamb.kodesistembayar = pasien?.kodesistembayar
      formamb.koderuang = pasien?.kodepoli
      this.loadingSaveAmbulan = true
      console.log('sasasa', formamb)
      try {
        const resp = await api.post('v1/simrs/penunjang/ambulan/simpanreqambulan', formamb)
        console.log('sasasa', resp)
      }
      catch (error) {
        // console.log(error)
        this.loadingFormDiagnosa = false
      }
    }
  }
})
