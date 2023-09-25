import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'

export const usePenunjangLainPoliStore = defineStore('penunjang-lain-poli', {
  state: () => ({
    penunjangs: [],
    notas: [],
    form: {
      noreg: '', // rs1
      nota: '', // rs2
      kodepoli: '', // rs10
      kodepenunjang: '', // rs13
      keterangan: '', // rs7
      kodesistembayar: ''
    },
    loadingOrder: false
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
    },

    async saveOrder(pasien) {
      this.loadingOrder = true
      this.form.noreg = pasien?.noreg
      this.form.kodepoli = pasien?.kodepoli
      this.form.kodesistembayar = pasien?.kodesistembayar
      try {
        const resp = await api.post('v1/simrs/penunjang/lain/simpanpenunjanglain', this.form)
        console.log(resp)
        if (resp.status === 200) {
          this.setNotas(resp?.data?.nota)
          this.loadingOrder = false
        }
        this.loadingOrder = false
      } catch (error) {
        this.loadingOrder = false
      }
    },

    async getNota(pasien) {
      const payload = { params: { noreg: pasien?.noreg } }
      const resp = await api.get('v1/simrs/penunjang/lain/getnota', payload)
      console.log('nota lain', resp)
      if (resp.status === 200) {
        this.setNotas(resp?.data)
      }
    },

    setNotas(array) {
      const arr = array.map(x => x.nota)
      this.notas = arr.length ? arr : []
      this.notas.push('BARU')
      this.form.nota = this.notas[0]
    }
  }
})
