import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'

export const useDiagnosaKeperawatan = defineStore('diagnosa-keperawatan', {
  state: () => ({
    diagnosas: [],
    selectDiagnosa: [],
    form: {
      norm: '',
      noreg: '',
      kddiagnosa: '',
      namadiagnosa: ''
    }
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
    }
  }
})
