import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'

export const usePenjualanBebasFarmasiStore = defineStore('penjualan_bebas_farmasi', {
  state: () => ({
    loading: false,
    loadingPihakTiga: false,
    params: {
      q: ''
    },
    form: {
      kd_obat: ''
    },
    pihakTigas: []
  }),
  actions: {
    setParams (key, val) {
      this.params[key] = val
    },
    setForm (key, val) {
      this.form[key] = val
    },
    getPihakTiga (val) {
      this.loadingPihakTiga = true
      const param = {
        params: {
          q: val
        }
      }
      return new Promise(resolve => {
        api.get('v1/simrs/farmasinew/penjualanbebas/pihak-tiga', param)
          .then(resp => {
            console.log('pihak3', resp?.data)
            this.pihakTigas = resp?.data
            resolve(resp)
          })
          .catch(() => { this.loadingPihakTiga = false })
      })
    }
  }
})
