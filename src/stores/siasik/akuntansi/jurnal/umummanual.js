import { defineStore } from 'pinia'
import { date } from 'quasar'
import { api } from 'src/boot/axios'

export const usejurnalumummanual = defineStore('jurnal_umum_manual', {
  state: () => ({
    loading: false,
    dialog: false,
    fixed: false,
    totald: 0,
    totalk: 0,
    items: [],
    tanggal: date.formatDate(Date.now(), 'DD MMMM YYYY'),
    rekening50: [],
    form: {
      tanggal: date.formatDate(Date.now(), 'YYYY-MM-DD'),
      koderekening: '',
      uraian: '',
      tahun: null
    },
    params: {
      tahuncari: new Date().getFullYear()
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
        this.loadingMasterLab = false
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
    rekening50selected (val) {
      console.log('val', val)
    }
  }
})
