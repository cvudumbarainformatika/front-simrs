import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
import { notifErrVue, notifSuccess } from 'src/modules/utils'
import { usePengunjungPoliStore } from './pengunjung'

export const useFisioPoli = defineStore('fisio-poli', {
  state: () => ({
    notas: [],
    form: {
      noreg: '', // rs1
      nota: '', // rs2
      kodepoli: '', // rs10
      permintaan: '', // rs4
      kodesistembayar: '',
      kodedokter: ''
    },
    loadingOrder: false,
    loadingHapus: false
  }),
  // getters: {
  //   doubleCount: (state) => state.counter * 2
  // },
  actions: {

    async saveOrder(pasien) {
      if (!pasien?.kodedokter) {
        return notifErrVue('kode Dokter masih kosong, silahkan tutup dulu pasien ini kemudian tekan tombol refresh di pojok kanan atas')
      }
      this.loadingOrder = true
      this.form.noreg = pasien?.noreg
      this.form.kodepoli = pasien?.kodepoli
      this.form.kodedokter = pasien?.kodedokter
      this.form.kodesistembayar = pasien?.kodesistembayar
      this.form.nota = this.form.nota === 'BARU' ? '' : this.form.nota
      try {
        const resp = await api.post('v1/simrs/penunjang/fisioterapi/permintaanfisioterapipoli', this.form)
        console.log('save penunjang fisio', resp.data)
        if (resp.status === 200) {
          const storePasien = usePengunjungPoliStore()
          const isi = resp?.data?.result
          storePasien.injectDataPasien(pasien, isi, 'fisio')
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
      const resp = await api.get('v1/simrs/penunjang/fisioterapi/getnota', payload)
      console.log('nota fisio', resp.data)
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
      this.loadingHapus = true
      const payload = { noreg: pasien?.noreg, id }
      try {
        const resp = await api.post('v1/simrs/penunjang/fisioterapi/hapuspermintaan', payload)
        this.loadingHapus = false
        console.log(resp)
        if (resp.status === 200) {
          const storePasien = usePengunjungPoliStore()
          storePasien.hapusDataFisio(pasien, id)
          this.setNotas(resp?.data?.nota)
          notifSuccess(resp)
        }
      } catch (error) {
        this.loadingHapus = false
        console.log(error)
      }
    },

    initReset() {
      this.form = {
        noreg: '', // rs1
        nota: this.notas?.length ? this.notas[0] : '', // rs2
        kodepoli: '', // rs10
        permintaan: '', // rs4
        kodesistembayar: '',
        kodedokter: ''
      }

      return new Promise((resolve, reject) => {
        resolve()
      })
    }
  }
})
