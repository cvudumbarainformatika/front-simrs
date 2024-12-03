import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
import { usePengunjungIgdStore } from './pengunjung'
import { notifErr, notifSuccess } from 'src/modules/utils'

export const useSkalaTransfer = defineStore('igd-skalatransfer', {
  state: () => ({
    form: {
      scorehaemodinamik: 0,
      scorecardio: 0,
      scoreecgmonitor: 0,
      scoreintravenusline: 0,
      scoreprovesionalpacemaker: 0,
      scorerespirasi: 0,
      scoreairways: 0,
      scorerespiratorysupport: 0,
      scorekesadaran: 0,
      scoreprematurias: 0,
      scorelanjutusia: 0,

      scoretotal: 0,
      drajattransfer: '0'
    }
  }),
  actions: {
    async saveData (pasien) {
      this.loadingForm = true
      this.form.noreg = pasien ? pasien.noreg : ''
      this.form.norm = pasien ? pasien.norm : ''

      try {
        const resp = await api.post('v1/simrs/pelayanan/igd/simpan', this.form)
        if (resp.status === 200) {
          const storePasien = usePengunjungIgdStore()
          const isi = resp.data.result
          storePasien.injectDataPasien(pasien, isi, 'skalatransfer')
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
    }
  }
})
