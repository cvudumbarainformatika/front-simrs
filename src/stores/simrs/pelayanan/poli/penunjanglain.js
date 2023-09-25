import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'

export const usePenunjangLainPoliStore = defineStore('penunjang-lain-poli', {
  state: () => ({
    penunjangs: [],
    form: {
      noreg: '', // rs1
      nota: '', // rs2
      kodepoli: '', // rs10
      kodepenunjang: '', // rs13
      keterangan: '',
      kdsistembayar: ''
    }
  }),
  // getters: {
  //   doubleCount: (state) => state.counter * 2
  // },
  actions: {
    async getPenunjangLain() {
      const resp = await api.get('v1/simrs/penunjang/lain/penunjanglain')
      console.log('penunjang lain', resp)
      if (resp.status === 200) {
        this.penunjangs = resp.data
      }
    }
  }
})
