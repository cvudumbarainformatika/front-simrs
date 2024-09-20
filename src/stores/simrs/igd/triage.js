import { defineStore } from 'pinia'
import { date } from 'quasar'
import { api } from 'src/boot/axios'
import { notifErr, notifSuccess } from 'src/modules/utils'
import { usePengunjungIgdStore } from './pengunjung'

export const useTriageIgd = defineStore('triageigd', {
  state: () => ({
    loadingForm: false,
    loadingHistory: false,
    norm: '',
    noreg: '',
    doak: ['Tidak Ada Nafas', 'Tidak Ada Nadi', 'ECG Flat', 'Pupil Medriasis', 'Reflek Cahaya Pupil'],
    doax: [],
    hiddenall: 'HIDUP',
    form: {
      id: null,
      pasienhamil: 0,
      nadi: 0,
      pernapasan: '',
      pernapasanx: 0,
      sistole: 0,
      diastole: 0,
      suhu: 0,
      spo2: 0,
      kesadaran: '',
      eye: '',
      verbal: '',
      motorik: '',
      scorenadi: 0,
      scorepernapasanx: 0,
      scorespo2: 0,
      scoresuhu: 0,
      scoresistole: 0,
      scorediastole: 0,
      scorekesadaran: 0,
      scorenyeri: 0,
      scorelochea: 0,
      scoreproteinurin: 0,
      totalscore: 0,
      kategoritriage: '',
      hasilprimarysurve: '',
      hasilsecondsurve: '',
      falsetriage: false
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
    async saveData (pasien, hasilsecondsurve) {
      // console.log('noreg', pasien.noreg)
      this.loadingForm = true
      this.form.noreg = pasien ? pasien.noreg : ''
      this.form.norm = pasien ? pasien.norm : ''

      this.form.hasilsecondsurve = hasilsecondsurve
      try {
        const resp = await api.post('v1/simrs/pelayanan/igd/simpantriage', this.form)
        if (resp.status === 200) {
          const storePasien = usePengunjungIgdStore()
          const isi = resp.data.result
          storePasien.injectDataPasien(pasien, isi, 'triage')
          notifSuccess(resp)
          this.initReset()
          this.loadingForm = false
        }
        this.loadingForm = false
      }
      catch (error) {
        this.loadingForm = false
        notifErr(error)
      }
    },
    initReset () {
      this.form = null
      return new Promise((resolve, reject) => {
        this.form = {
          falsetriage: false,
          doa: '',
          pasienhamil: 0
        }
        this.selection = []

        resolve()
      })
    },
    setForm (key, val) {
      this.form[key] = val
    },
    // hitungscore () {
    //   asdasd
    // }
    async deleteData (pasien, id) {
      const payload = { id }
      try {
        const resp = await api.post('v1/simrs/pelayanan/igd/hapustriage', payload)
        // console.log(resp)
        if (resp.status === 200) {
          const storePasien = usePengunjungIgdStore()
          storePasien.hapusDataTriage(pasien, id)
          notifSuccess(resp)
        }
      }
      catch (error) {
        notifErr(error)
      }
    }

  }

})
