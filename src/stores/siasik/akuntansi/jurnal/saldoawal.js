import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
import { notifSuccess } from 'src/modules/utils'

export const saldoawalJurnal = defineStore('saldoawal_Jurnal', {
  state: () => ({
    loading: false,
    disabled: false,
    reqs: {
      q: '',
      simpanform: []
    },
    form: {
      kodepsap13: null,
      uraianpsap13: null,
      debetkredit: null,
      debit: 0,
      kredit: 0
    },
    datasaldo: [],
    akuns: []
  }),
  actions: {
    emptyForm () {
      this.form.kodepsap13 = ''
      this.form.uraianpsap13 = ''
      this.form.debetkredit = ''
      this.form.debit = 0
      this.form.kredit = 0
    },
    getDataTable () {
      this.getSaldoAwal()
    },
    refreshTable () {
      this.getDataTable()
    },
    getSaldoAwal () {
      this.loading = true
      const params = { params: this.reqs }
      return new Promise((resolve) => {
        api.get('v1/akuntansi/saldoawal/index', params).then((resp) => {
          console.log('saldoAwal', resp.data)
          if (resp.status === 200) {
            this.datasaldo = resp.data
            // console.log('KodeRekening', this.datasaldo)
            this.loading = false
            resolve(resp.data)
          }
        }).catch(() => { this.loading = false })
      })
    },
    getRekening () {
      this.loading = true
      const params = { params: this.reqs }
      return new Promise((resolve) => {
        api.get('v1/akuntansi/saldoawal/akunsaldo', params).then((resp) => {
          console.log('KodeRekening', resp)
          if (resp.status === 200) {
            this.akuns = resp.data
            // console.log('KodeRekening', this.akuns)
            this.loading = false
            resolve(resp)
          }
        }).catch(() => { this.loading = false })
      })
    },
    saveSaldo () {
      this.loading = true
      return new Promise((resolve) => {
        api.post('v1/akuntansi/saldoawal/save', this.form).then((resp) => {
          console.log('SIMPAN', resp)
          if (resp.status === 200) {
            this.loading = false
            notifSuccess(resp)
            this.refreshTable()
            resolve(resp)
          }
        }).catch(() => { this.loading = false })
      })
    }
  }
})
