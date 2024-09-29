import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
import { notifErr } from 'src/modules/utils'

export const usePenilaianAnamnesisIgd = defineStore('penilaian_anamnesis_igd', {
  state: () => ({
    loadingForm: false,
    loadingHistory: false,
    items: [],
    usia: {},
    formpenilaians: [],
    olahform: []
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
    caripenilaian (usia, itemform) {
      const usiaarr = usia.split(' ')
      const usiatahun = usiaarr[0]

      if (usiatahun <= 18) {
        this.formpenilaians = itemform.find(({ kode }) => kode === 'humpty-dumpty')
      }
      else if (usiatahun > 18 && usiatahun <= 60) {
        this.formpenilaians = itemform.find(({ kode }) => kode === 'morse-fall')
      }
      else {
        this.formpenilaians = itemform.find(({ kode }) => kode === 'ontario')
      }
      // console.log('test', this.olahform)
      // const xxx = this.olahform.form
      // xxx.forEach((x) => {
      //   console.log('test', x)
      //   const hasil = {
      //     kode: x.kode,
      //     label: x.label
      //   }
      //   console.log('hasil', hasil)
      // })
    },
    setForm (key, val) {
      this.form[key] = val
    }
  }
})
