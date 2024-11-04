import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
import { usePengunjungIgdStore } from './pengunjung'
import { notifErr, notifSuccess } from 'src/modules/utils'

export const useHistoryPernikahanStore = defineStore('history-pernikahan-store', {
  state: () => ({
    fixed: false,
    loading: false,
    form: {

    }
  }),
  actions: {
    async saveData (pasien) {
      this.loading = true
      this.form.norm = pasien ? pasien.norm : ''
      this.form.noreg = pasien ? pasien.noreg : ''

      try {
        const resp = await api.post('v1/simrs/igd/anamnesis/simpanHistoryPerkawiananPasien', this.form)
        if (resp.status === 200) {
          // console.log('wew', resp.data.result)
          const storePasien = usePengunjungIgdStore()

          const isi = resp.data.result
          storePasien.injectDataPasien(pasien, isi, 'historyperkawinan')
          notifSuccess(resp)
          this.loading = false
          // this.initReset()
          // this.loadingForm = false
        }

        this.loading = false
      }
      catch (error) {
        // console.log('anamnesis err', error)
        this.loading = false
        notifErr(error)
      }
    },
    async deleteData (pasien, id) {
      const payload = { id }
      try {
        const resp = await api.post('v1/simrs/igd/anamnesis/hapusHistoryPerkawiananPasien', payload)
        if (resp.status === 200) {
          const storePasien = usePengunjungIgdStore()
          storePasien.hapusDataHistoryPerkawinan(pasien, id)
          notifSuccess(resp)
        }
      }
      catch (error) {
        notifErr(error)
      }
    }
  }
})
