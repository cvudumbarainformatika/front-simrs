import { defineStore } from 'pinia'
import { date } from 'quasar'
import { api } from 'src/boot/axios'
import { notifErr, notifErrVue, notifSuccess } from 'src/modules/utils'

export const usejurnalumummanual = defineStore('jurnal_umum_manual', {
  state: () => ({
    loading: false,
    loadingverif: false,
    dialog: false,
    fixed: false,
    totald: 0,
    totalk: 0,
    totalrincid: 0,
    totalrincik: 0,
    items: [],
    transall: [],
    rincis: [],
    tanggal: date.formatDate(Date.now(), 'DD MMMM YYYY'),
    rekening50: [],
    flagVerif: '',
    form: {
      nobukti: '',
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
      console.log('no', this.form.nobukti)
      this.loading = true
      try {
        const resp = await api.post('v1/akuntansi/jurnalumum/simpanjurnalmanual', this.form)
        if (resp.status === 200) {
          this.form.nobukti = resp?.data?.nobukti
          this.paramsrinci.nobukti = resp?.data?.nobukti
          notifSuccess(resp)
          this.resetformrinci()
          this.getrincians()
          this.getJurnalUmum()
          // this.loading = false
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
        if (resp.status === 200) {
          this.transall = resp.data
          const hasilglobal = []
          this.loading = false
          this.transall?.forEach(x => {
            const nobukti = x?.nobukti
            const verif = x?.verif
            // const rincisx = x?.rincianjurnalumum
            const debet = x?.rincianjurnalumum.reduce((x, y) => parseFloat(x) + parseFloat(y.debet), 0)
            const kredit = x?.rincianjurnalumum?.reduce((a, b) => parseFloat(a) + parseFloat(b.kredit), 0)
            const hasil = {
              nobukti,
              verif,
              debet,
              kredit

            }
            this.totalrincid = hasil?.debet
            this.totalrincik = hasil?.kredit

            hasilglobal.push(hasil)
          })
        }
      }
      catch (error) {
        this.loading = false
      }
    },
    async hapusrincians (val) {
      this.loading = true
      const id = { id: val?.id, nobukti: val?.nobukti }
      try {
        const resp = await api.post('v1/akuntansi/jurnalumum/hapusrincians', id)
        if (resp.status === 200) {
          notifSuccess(resp)
          this.form.nobukti = resp?.data?.nobukti
          this.paramsrinci.nobukti = resp?.data?.nobukti
          this.getrincians()
        }
        this.loadingForm = false
      }
      catch (error) {
        this.loading = false
        notifErr(error)
      }
    },
    editForm (val) {
      this.dialog = true
      this.form.nobukti = val?.nobukti
      this.form.tanggal = val?.tanggal
      this.form.keterangan = val?.keterangan
      this.paramsrinci.nobukti = val?.nobukti
      this.flagVerif = val?.verif
      this.getrincians()
    },
    async VerifData (val, debet, kredit) {
      this.loadingverif = true
      if (debet !== kredit) {
        notifErrVue('Maaf Debet Dan Kredit Harus Balance')
        this.loadingverif = false
      }
      else {
        const nobukti = { nobukti: val }
        try {
          const resp = await api.post('v1/akuntansi/jurnalumum/VerifData', nobukti)
          if (resp.status === 200) {
            notifSuccess(resp)
            this.flagVerif = '1'
            this.paramsrinci.nobukti = val
            this.getrincians()
            this.loadingverif = false
          }
        }
        catch (error) {
          this.loadingverif = false
          notifErr(error)
        }
      }
    }
  }
})
