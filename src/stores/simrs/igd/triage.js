import { defineStore } from 'pinia'
import { date } from 'quasar'
import { api } from 'src/boot/axios'
import { notifErr, notifSuccess } from 'src/modules/utils'

export const useTriageIgd = defineStore('triageigd', {
  state: () => ({
    loadingForm: false,
    loadingHistory: false,
    norm: '',
    noreg: '',
    hiddenall: 'HIDUP',
    form: {
      pasienhamil: 0,
      nadi: 0,
      pernapasan: '',
      pernapasanx: 0,
      sistole: 0,
      diastole: 0,
      suhu: 0,
      spo2: 0,
      kesadaran: '',
      gcs: '',
      doa: []
    }
  }),
  actions: {
    formattanggal () {
      if (this.form.pasienhamil === 0) {
        this.form.haid = ''
      }
      else {
        const sekarang = Date.now()
        this.form.haid = date.formatDate(sekarang, 'YYYY-MM-DD')
      }
    },
    async saveData (pasien) {
      this.loadingForm = true
      this.noreg = pasien ? pasien.noreg : ''
      this.norm = pasien ? pasien.norm : ''

      try {
        const resp = await api.post('v1/simrs/pelayanan/triage', this.form)
        this.loadingForm = false
        notifSuccess(resp)
      }
      catch (error) {
        // console.log('anamnesis err', error)
        this.loadingForm = false
        notifErr(error)
      }
    },
    setForm (key, val) {
      this.form[key] = val
    }
    // hitungscore () {
    //   asdasd
    // }

  }
})
