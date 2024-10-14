import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
import { notifErr, notifSuccess } from 'src/modules/utils'

export const usePenilaianAnamnesisIgd = defineStore('penilaian_anamnesis_igd', {
  state: () => ({
    loadingForm: false,
    loadingHistory: false,
    items: [],
    skortotal: '',
    usia: {},
    formpenilaians: {},
    humpty_dumpty: [],
    morse_fall: [],
    form: {
      noreg: '',
      norm: '',
      barthel: '',
      norton: '',
      ontario: {},
      morse_fall: {},
      humpty_dumpty: {},
      kdruang: 'POL014'
    }
  }),
  actions: {
    async masterpenilaian () {
      this.loadingHistory = true
      try {
        const resp = await api.get('v1/simrs/master/penilaian')
        if (resp.status === 200) {
          if (resp.data?.length) {
            this.items = resp.data
            this.caripenilaian(this.usia, this.items)
          }
          else {
            this.items = []
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
      // console.log('noreg', pasien.noreg)
      this.loadingForm = true
      this.form.noreg = pasien ? pasien.noreg : ''
      this.form.norm = pasien ? pasien.norm : ''

      try {
        const resp = await api.post('v1/simrs/ranap/layanan/pemeriksaan/penilaian/simpan', this.form)
        if (resp.status === 200) {
          // const storePasien = usePengunjungIgdStore()
          // const isi = resp.data.result
          // storePasien.injectDataPasien(pasien, isi, 'triage')
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
    caripenilaian (usia, itemform) {
      const usiaarr = usia.split(' ')
      const usiatahun = usiaarr[0]

      if (usiatahun <= 18) {
        this.formpenilaians = itemform.find(({ kode }) => kode === 'humpty_dumpty')
        this.form.ontario = null
        this.form.morse_fall = null
      }
      else if (usiatahun > 18 && usiatahun <= 60) {
        this.formpenilaians = itemform.find(({ kode }) => kode === 'morse_fall')
        this.form.ontario = null
        this.form.humpty_dumpty = null
      }
      else {
        this.formpenilaians = itemform.find(({ kode }) => kode === 'ontario')
        this.form.morse_fall = null
        this.form.humpty_dumpty = null
      }
      this.formpenilaians.form.forEach(x => {
        this.form[this.formpenilaians.kode][x.kode] = {}
        if (x?.submenu?.length > 0) {
          x?.submenu?.forEach(y => {
            this.form[this.formpenilaians.kode][x.kode][y.kode] = {}
          })
        }
      })
    },
    setForm (key, val) {
      this.form[key] = val
    },
    initReset () {
      this.form = null
      return new Promise((resolve, reject) => {
        this.form = {
          noreg: '',
          norm: '',
          barthel: '',
          norton: '',
          ontario: {},
          morse_fall: {},
          humpty_dumpty: {},
          kdruang: ''
        }
        this.selection = []

        resolve()
      })
    }
  }
})
