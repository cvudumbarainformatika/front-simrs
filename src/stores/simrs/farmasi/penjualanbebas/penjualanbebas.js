import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
import { notifSuccess } from 'src/modules/utils'

export const usePenjualanBebasFarmasiStore = defineStore('penjualan_bebas_farmasi', {
  state: () => ({
    loadingSimpan: false,
    loadingPihakTiga: false,
    params: {
      q: ''
    },
    form: {
      details: []
    },
    tempObat: {},
    pihakTigas: [],
    signas: [],
    fromSigna: {}
  }),
  actions: {
    setParams (key, val) {
      this.params[key] = val
    },
    setForm (key, val) {
      this.form[key] = val
    },
    setTemp (key, val) {
      this.tempObat[key] = val
    },
    resetForm () {
      this.setForm('details', [])
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
    },
    async getSigna (val, update, abort) {
      // this.loadingSigna = true
      // await api.get('v1/simrs/farmasinew/depo/get-signa')
      // if (val?.length < 1) {
      //   abort()
      //   return
      // }
      const params = {
        params: {
          q: val ?? ''
        }
      }
      const resp = await api.get('v1/simrs/master/signa/get-signa-autocomplete', params)
      if (update !== undefined) {
        update(() => {
          this.signas = resp.data ?? []
        })
      }
      else {
        this.signas = resp.data
      }

      // .then(resp => {
      //   // this.loadingSigna = false
      //   // console.log('signa', resp?.data)
      //   this.signas = resp?.data
      // })
      // .catch(() => { this.loadingSigna = false })
    },
    simpan () {
      this.loadingSimpan = true
      return new Promise(resolve => {
        api.post('v1/simrs/farmasinew/penjualanbebas/simpan', this.form)
          .then(resp => {
            this.loadingSimpan = false
            console.log('simpan bebas', resp?.data)
            notifSuccess(resp)
            // this.resetForm()
            resolve(resp)
          })
          .catch((err) => {
            this.loadingSimpan = false
            const data = err?.response?.data?.items
            const item = data.filter(f => f.errors)
            if (item?.length) {
              item.forEach(it => {
                const det = this.form?.details.find(f => f.kodeobat === it.kodeobat)
                if (det) det.alokasi = it.alokasi
              })
            }
            console.log(item)
          })
      })
    }
  }
})
