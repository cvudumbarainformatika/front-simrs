import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
import { notifSuccess } from 'src/modules/utils'
import { usePengunjungPoliStore } from './pengunjung'

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
      this.form.kodedokter = pasien?.kodedokter
      this.form.kodesistembayar = pasien?.kodesistembayar
      this.form.nota = this.form.nota === 'BARU' ? '' : this.form.nota
      try {
        const resp = await api.post('v1/simrs/penunjang/lain/simpanpenunjanglain', this.form)
        console.log('save penunjang lain', resp)
        if (resp.status === 200) {
          const storePasien = usePengunjungPoliStore()
          const isi = resp?.data?.result
          storePasien.injectDataPasien(pasien, isi, 'penunjanglain')
          this.setNotas(resp?.data?.nota)
          notifSuccess(resp)
          this.loadingOrder = false
          this.initReset()
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
    },

    async hapusPermintaan(pasien, id) {
      const payload = { noreg: pasien?.noreg, id }
      try {
        const resp = await api.post('v1/simrs/penunjang/lain/hapuspermintaan', payload)
        console.log(resp)
        if (resp.status === 200) {
          const storePasien = usePengunjungPoliStore()
          storePasien.hapusDataPenunjangLain(pasien, id)
          this.setNotas(resp?.data?.nota)
          notifSuccess(resp)
        }
      } catch (error) {
        console.log(error)
      }
    },

    initReset() {
      this.form = {
        noreg: '', // rs1
        nota: this.notas?.length ? this.notas[0] : '', // rs2
        kodepoli: '', // rs10
        kodedokter: '', // rs8
        kodepenunjang: '', // rs13
        keterangan: '', // rs7
        kodesistembayar: ''
      }

      return new Promise((resolve, reject) => {
        resolve()
      })
    }
  }
})
