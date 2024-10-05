import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
import { notifSuccess } from 'src/modules/utils'

export const saldoawalJurnal = defineStore('saldoawal_Jurnal', {
  state: () => ({
    loading: false,
    deleteloading: false,
    disabled: false,
    dialogEdit: false,
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
    akuns: [],
    saldo: []
  }),
  actions: {
    setSearch (val) {
      this.reqs.q = val
      this.getRekening()
    },
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
    setFormSaldo (key, val) {
      this.form[key] = val
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
            this.nilaiSaldo()
            this.loading = false
            resolve(resp.data)
          }
        }).catch(() => { this.loading = false })
      })
    },
    nilaiSaldo () {
      const arr = {
        debit: (this.datasaldo.length ? this.datasaldo.map((x) => parseFloat(x.debit)) : []).reduce((a, b) => a + b, 0),
        kredit: (this.datasaldo.length ? this.datasaldo.map((x) => parseFloat(x.kredit)) : []).reduce((a, b) => a + b, 0)
      }
      this.saldo = arr
      console.log('nilai Saldo', this.saldo)
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
    },
    deleteSaldo (id) {
      const payload = id
      this.deleteloading = true
      return new Promise((resolve) => {
        api.post('v1/akuntansi/saldoawal/delete', payload).then((resp) => {
          if (resp.status === 200) {
            this.deleteloading = false
            console.log('delete', resp)
            notifSuccess(resp)
            this.refreshTable()
            resolve(resp)
          }
        }).catch(() => {
          this.deleteloading = false
        })
      })
    }
  }
})
