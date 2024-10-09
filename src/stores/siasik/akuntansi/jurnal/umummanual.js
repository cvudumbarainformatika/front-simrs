import { defineStore } from 'pinia'
import { date } from 'quasar'
import { api } from 'src/boot/axios'
import { notifErr, notifSuccess } from 'src/modules/utils'

export const usejurnalumummanual = defineStore('jurnal_umum_manual', {
  state: () => ({
    loading: false,
    dialog: false,
    fixed: false,
    totald: 0,
    totalk: 0,
    items: [],
    rincis: [],
    tanggal: date.formatDate(Date.now(), 'YYYY-MM-DD'),
    rekening50: [],
    form: {
      nobukti: null,
      tanggal: date.formatDate(Date.now(), 'YYYY-MM-DD'),
      koderekening: '',
      uraian: '',
      tahun: new Date().getFullYear()
    },
    params: {
      tahuncari: new Date().getFullYear()
    },
    paramsrinci: {
      nobukti: ''
    },
    tahun: []
  }),
  actions: {
    getRekenining50 () {
      // this.loading = true
      const params = { params: this.reqs }
      return new Promise((resolve) => {
        api.get('v1/akuntansi/jurnalumum/permen50', params).then((resp) => {
          if (resp.status === 200) {
            this.rekening50 = resp.data
            // this.loading = false
            resolve(resp.data)
          }
        }).catch(() => { this.loading = false })
      })
    },
    async getJurnalUmum () {
      this.loading = true
      const params = { params: this.params }
      try {
        const resp = await api.get('v1/akuntansi/jurnalumum/jurnalumumotot', params)
        // console.log('masterlaborat', resp)
        if (resp.status === 200) {
          this.items = resp.data
          this.loading = false
          this.gettotal(this.items)
        }
        this.loading = false
      }
      catch (error) {
        this.loading = false
      }
    },
    async gettotal (val) {
      const hasil = []
      val.forEach(x => {
        const rinci = x?.rincianjurnalumum
        const totald = rinci.reduce((x, y) => parseFloat(x) + parseFloat(y.debet), 0)
        const totalk = rinci.reduce((x, y) => parseFloat(x) + parseFloat(y.kredit), 0)
        const totals = {
          totdebet: totald,
          totkredit: totalk
        }
        hasil.push(totals)
      })
      this.totald = hasil.reduce((a, b) => parseFloat(a) + parseFloat(b.totdebet), 0)
      this.totalk = hasil.reduce((a, b) => parseFloat(a) + parseFloat(b.totkredit), 0)
    },
    async saveData () {
      this.loading = true
      try {
        const resp = await api.post('v1/akuntansi/jurnalumum/simpanjurnalmanual', this.form)
        if (resp.status === 200) {
          this.form.nobukti = resp?.data?.nobukti
          this.paramsrinci.nobukti = resp?.data?.nobukti
          notifSuccess(resp)
          this.resetformrinci()
          this.getrincians()
          this.loading = false
        }
        this.loadingForm = false
      }
      catch (error) {
        this.loading = false
        notifErr(error)
      }
    },
    resetformrinci () {
      this.form.koderekening = ''
      this.form.uraian = ''
      this.form.jenis = ''
    },
    async getrincians () {
      this.loading = true
      const params = { params: this.paramsrinci }
      try {
        const resp = await api.get('v1/akuntansi/jurnalumum/getrincian', params)
        // console.log('masterlaborat', resp)
        if (resp.status === 200) {
          this.rincis = resp.data
          this.loading = false
        }
        this.loading = false
      }
      catch (error) {
        this.loading = false
      }
    }
  }
})
