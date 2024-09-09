import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
import { notifErrVue, notifSuccess } from 'src/modules/utils'

export const usePenjualanBebasFarmasiStore = defineStore('penjualan_bebas_farmasi', {
  state: () => ({
    loadingSimpan: false,
    loadingPihakTiga: false,
    loadingKaryawan: false,
    loadingPasien: false,
    loadingKunjungan: false,
    params: {
      q: ''
    },
    form: {
      details: []
    },
    tempObat: {},
    pihakTigas: [],
    karyawans: [],
    pasiens: [],
    kunjungans: [],
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
            // console.log('pihak3', resp?.data)
            this.pihakTigas = resp?.data
            resolve(resp)
          })
          .catch(() => { this.loadingPihakTiga = false })
      })
    },
    getKaryawan (val) {
      this.loadingKaryawan = true
      const param = {
        params: {
          q: val
        }
      }
      return new Promise(resolve => {
        api.get('v1/simrs/farmasinew/penjualanbebas/karyawan', param)
          .then(resp => {
            this.loadingKaryawan = false
            // console.log('pihak3', resp?.data)
            this.karyawans = resp?.data
            resolve(resp)
          })
          .catch(() => { this.loadingKaryawan = false })
      })
    },
    getPasien (val) {
      this.loadingPasien = true
      const param = {
        params: {
          q: val
        }
      }
      return new Promise(resolve => {
        api.get('v1/simrs/farmasinew/penjualanbebas/pesien', param)
          .then(resp => {
            this.loadingPasien = false
            // console.log('pihak3', resp?.data)
            this.pasiens = resp?.data
            resolve(resp)
          })
          .catch(() => { this.loadingPasien = false })
      })
    },
    getKunjungan (val) {
      this.loadingKunjungan = true
      const param = {
        params: {
          q: val
        }
      }
      return new Promise(resolve => {
        api.get('v1/simrs/farmasinew/penjualanbebas/daftar-kunj', param)
          .then(resp => {
            this.loadingKunjungan = false
            // console.log('pihak3', resp?.data)
            this.kunjungans = resp?.data
            resolve(resp)
          })
          .catch(() => { this.loadingKunjungan = false })
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
      if (!this.form.details.length) return notifErrVue('Tidak Ada Rincian untuk disimpan')
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
            // console.log(item)
          })
      })
    }
  }
})
