import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
import { notifSuccess } from 'src/modules/utils'

export const saldoawalJurnal = defineStore('saldoawal_Jurnal', {
  state: () => ({
    loading: false,
    disabled: false,
    reqs: {
      q: ''
    },
    form: {
      kodepsap13: null,
      uraianpsap13: null,
      debit: 0,
      kredit: 0
    },
    saveform: [],
    akuns: []
  }),
  actions: {
    getRekening () {
      this.loading = true
      const params = { params: this.reqs }
      return new Promise((resolve) => {
        api.get('v1/akuntansi/saldoawal/akunsaldo', params).then((resp) => {
          // console.log('KodeRekening', resp)
          if (resp.status === 200) {
            this.akuns = resp.data
            console.log('KodeRekening', this.akuns)
            this.loading = false
            resolve(resp)
          }
        }).catch(() => { this.loading = false })
      })
    },
    saveSaldo () {
      this.loading = true
      console.log('fooorm', this.form)
      return new Promise((resolve) => {
        api.get('v1/akuntansi/saldoawal/save', this.form).then((resp) => {
          // console.log('KodeRekening', resp)
          if (resp.status === 200) {
            this.loading = false
            notifSuccess(resp)
            resolve(resp)
          }
        }).catch(() => { this.loading = false })
      })
    }
  }
})
