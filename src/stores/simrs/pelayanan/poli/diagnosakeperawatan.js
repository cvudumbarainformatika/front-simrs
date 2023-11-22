import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'

export const useDiagnosaKeperawatan = defineStore('diagnosa-keperawatan', {
  state: () => ({
    diagnosas: [],
    selectDiagnosa: [],
    selectIntervensis: [],
    diagnosa: ''
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

    simpanDiagnosadanIntervensi(pasien) {
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
      console.log('saved', form)
    },

    initReset() {
      this.diagnosa = ''
      this.selectDiagnosa = []
    }
  }
})
