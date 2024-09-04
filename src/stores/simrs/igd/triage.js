import { defineStore } from 'pinia'
import { date } from 'quasar'
import { api } from 'src/boot/axios'
import { notifErr } from 'src/modules/utils'
import { usePengunjungIgdStore } from './pengunjung'

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
      eye: '',
      verbal: '',
      motorik: '',
      doa: [],
      scorenadi: 0,
      scorepernapasanx: 0,
      scorespo2: 0,
      scoresuhu: 0,
      scoresistole: 0,
      scorediastole: 0,
      scorekesadaran: 0,
      scorenyeri: 0,
      scorelochea: 0,
      scoreproteinurin: 0
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
        const resp = await api.post('v1/simrs/pelayanan/igd/simpantriage', this.form)
        if (resp.status === 200) {
          const storePasien = usePengunjungIgdStore()
          let isi = resp.data.result
          isi = this.form
          console.log('resp', isi)
          storePasien.injectDataPasien(pasien, isi, 'triage')

          // const storePasien = usePengunjungIgdStore()
          // let isi = resp.data.result
          // if (resp.data.result === 1) {
          //   this.form.rs4 = this.form.keluhanutama
          //   isi = this.form
          // }
          // storePasien.injectDataPasien(pasien, isi, 'anamnesis')
          // notifSuccess(resp)
          // this.initReset()
          // this.loadingForm = false
        }
        this.loadingForm = false
      }
      catch (error) {
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
