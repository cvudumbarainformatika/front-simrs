import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'

export const useMasterDiagnosaKeperawatan = defineStore('master-diagnosa-keperawatan', {
  state: () => ({
    form: {
      kode: '',
      nama: ''
    }
  }),
  // getters: {
  //   doubleCount: (state) => state.counter * 2
  // },
  actions: {
    async saveData() {
      try {
        const resp = await api.post('v1/simrs/master/diagnosakeperawatan/store', this.form)
        console.log(resp)
      } catch (error) {
        console.log(error)
      }
    }
  }
})
