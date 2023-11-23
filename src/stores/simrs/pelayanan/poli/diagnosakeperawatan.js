import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
import { usePengunjungPoliStore } from './pengunjung'
import { notifErr, notifSuccess } from 'src/modules/utils'

export const useDiagnosaKeperawatan = defineStore('diagnosa-keperawatan', {
  state: () => ({
    diagnosas: [],
    selectDiagnosa: [],
    selectIntervensis: [],
    diagnosa: '',
    loadingSave: false
    // form: {
    //   norm: '',
    //   noreg: '',
    //   kddiagnosa: '',
    //   namadiagnosa: ''
    // }
  }),
  // getters: {
  //   doubleCount: (state) => state.counter * 2
  // },
  actions: {
    async getData() {
      const resp = await api.get('v1/simrs/pelayanan/diagnosakeperawatan')
      console.log('diagnosa keperawatan', resp)
      if (resp.status === 200) {
        this.diagnosas = resp.data
      }
    },

    setDiagnosa(val) {
      this.diagnosa = val
    },

    async simpanDiagnosadanIntervensi(pasien) {
      this.loadingSave = true
      let thumb = []
      if (this.selectDiagnosa.length) {
        thumb = this.selectDiagnosa.map(x => {
          return {
            norm: pasien?.norm,
            noreg: pasien?.noreg,
            kode: x?.kode,
            nama: x?.nama
          }
        })
      }

      let intv = []
      if (this.selectIntervensis.length) {
        intv = this.selectIntervensis.map(x => {
          return {
            intervensi_id: x?.split('||')[0],
            diagnosakeperawatan_kode: x?.split('||')[1]
          }
        })
      }

      const form = {
        diagnosa: thumb,
        intervensi: intv
      }

      try {
        const resp = await api.post('v1/simrs/pelayanan/simpandiagnosakeperawatan', form)
        console.log('simpan', resp)
        if (resp.status === 200) {
          const storePasien = usePengunjungPoliStore()
          const arr = resp.data.result
          // if (resp.data.result === 1) {
          //   this.form.rs4 = this.form.keluhanutama
          //   isi = this.form
          // }
          for (let i = 0; i < arr.length; i++) {
            const isi = arr[i]
            storePasien.injectDataPasien(pasien, isi, 'diagnosakeperawatan')
          }
          notifSuccess(resp)
          this.initReset()
          this.loadingSave = false
        }
        this.loadingSave = false
      } catch (error) {
        console.log(error)
        notifErr(error)
      }
    },

    async deleteDiagnosa(pasien, id) {
      const payload = { id }
      const resp = await api.post('v1/simrs/pelayanan/deletediagnosakeperawatan', payload)
      console.log('delete', resp)
      if (resp.status === 200) {
        const storePasien = usePengunjungPoliStore()
        storePasien.hapusDataDiagnosaKeperawatan(pasien, id)
        notifSuccess(resp)
      }
    },

    initReset() {
      this.diagnosa = ''
      this.selectDiagnosa = []
    }
  }
})
