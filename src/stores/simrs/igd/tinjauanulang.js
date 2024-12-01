import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
import { notifErr, notifSuccess } from 'src/modules/utils'
import { usePengunjungIgdStore } from './pengunjung'

export const useTinjauanUlangStore = defineStore('tinjauan_ulang_store', {
  state: () => ({
    loadingForm: false,
    basic: false,
    pasienhamil: '',

    nilaiekspresiwajahnips: 0,
    nilaimenangis: 0,
    nilaipolanafas: 0,
    nilailengan: 0,
    nilaikaki: 0,
    nilairangsangan: 0,

    form: {
      nadi: '',
      pernapasanx: '',
      sistole: '',
      diastole: '',
      suhu: '',
      spo2: '',

      scorenadi: 0,
      scorepernapasanx: 0,
      scoresistole: 0,
      scorediastole: 0,
      scoresuhu: 0,
      scorespo2: 0,

      skornyeri: 0,
      keteranganscorenyeri: 'tidak ada nyeri',

      metodenyeri: '',

      ekspresiwajahnips: '',
      menangis: '',
      polanafas: '',
      lengan: '',
      kaki: '',
      keadaanrangsangan: '',
      scroenips: '',
      ketscorenips: '',
      colorscorenips: 'green',

      scroebps: 0,
      ketscorebps: '',
      colorscorebps: 'green'

    }
  }),
  actions: {
    async ambiltriage (noreg) {
      const params = { params: { noreg } }
      try {
        const resp = await api.get('v1/simrs/pelayanan/igd/getDataTriage', params)
        // console.log('history', resp)
        if (resp.status === 200) {
          if (resp.data?.length) {
            this.pasienhamil = resp.data[0]?.flaghamil
          }
          else {
            this.pasienhamil = ''
          }
        }
        this.loadingHistory = false
      }
      catch (error) {
        this.loadingHistory = false
        notifErr(error)
      }
    },
    async ambilanamnese (noreg) {
      const params = { params: { noreg } }
      try {
        const resp = await api.get('v1/simrs/igd/anamnesis/listanamnesebynoreg', params)
        // console.log('history', resp)
        if (resp.status === 200) {
          if (resp.data?.length) {
            if (resp.data[0]?.anamnesebps !== null) {
              this.form.metodenyeri = 'bps'
            }
            else if (resp.data[0]?.anamnesenips !== null) {
              this.form.metodenyeri = 'nips'
            }
            else {
              this.form.metodenyeri = 'nrs'
            }
          }
          else {
            this.metodenyeri = ''
          }
        }
        this.loadingHistory = false
      }
      catch (error) {
        this.loadingHistory = false
        notifErr(error)
      }
    },
    async saveData (pasien) {
      this.loadingForm = true
      this.form.norm = pasien ? pasien.norm : ''
      this.form.noreg = pasien ? pasien.noreg : ''

      try {
        const resp = await api.post('v1/simrs/igd/peninjauanulang/simpanpeninjauanulang', this.form)
        if (resp.status === 200) {
          // console.log('simpan anamnesis', resp)
          const storePasien = usePengunjungIgdStore()
          const isi = resp.data.result[0]
          storePasien.injectDataPasien(pasien, isi, 'tinjauanulang')
          notifSuccess(resp)
          this.initReset()
          this.loadingForm = false
        }

        this.loadingForm = false
      }
      catch (error) {
        // console.log('anamnesis err', error)
        this.loadingForm = false
        notifErr(error)
      }
    },
    initReset () {
      this.form = {
        keluhan: '',
        nadi: ''
      }
    },
    setKeteranganSkornyeri (val) {
      if (val === 0) {
        this.form.keteranganscorenyeri = 'tidak ada nyeri'
      }
      else if (val > 0 && val <= 3) {
        this.form.keteranganscorenyeri = 'nyeri ringan'
      }
      else if (val > 3 && val <= 6) {
        this.form.keteranganscorenyeri = 'nyeri sedang'
      }
      else if (val > 6 && val <= 10) {
        this.form.keteranganscorenyeri = 'nyeri berat'
      }
    }

  }
})
