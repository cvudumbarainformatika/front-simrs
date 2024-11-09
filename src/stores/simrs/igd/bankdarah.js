import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
import { notifErrVue, notifSuccess } from 'src/modules/utils'
import { usePengunjungIgdStore } from './pengunjung'

export const useBankDarahStore = defineStore('bankdarah-store', {
  state: () => ({
    loadingOrder: false,
    loadingForm: false,
    loadingHistory: false,
    loadingSaveBankDarah: false,
    notas: [],
    form: {
      nota: ''
    }
  }),
  actions: {
    async saveOrderDarah (pasien) {
      if (!pasien?.kodedokter) {
        return notifErrVue('kode Dokter masih kosong, silahkan tutup dulu pasien ini kemudian tekan tombol refresh di pojok kanan atas')
      }
      this.loadingSaveBankDarah = true
      const formamb = this.form
      formamb.noreg = pasien?.noreg
      formamb.norm = pasien?.norm
      formamb.kodedokter = pasien?.kodedokter
      formamb.kodesistembayar = pasien?.kodesistembayar
      formamb.koderuang = pasien?.kodepoli

      try {
        const resp = await api.post('v1/simrs/penunjang/bankdarah/simpanbankdarah', formamb)
        if (resp.status === 200) {
          const storePasien = usePengunjungIgdStore()
          const isi = resp.data.data
          this.setNotas(resp?.data?.nota)
          storePasien.injectDataPasien(pasien, isi, 'bankdarah')
          notifSuccess(resp)
          this.initReset()
          this.loadingSaveBankDarah = false
        }
      }
      catch (error) {
        // console.log(error)
        this.loadingSaveBankDarah = false
      }
    },
    async getNota (pasien) {
      const payload = { params: { noreg: pasien?.noreg } }
      const resp = await api.get('v1/simrs/penunjang/bankdarah/getnota', payload)
      if (resp.status === 200) {
        this.setNotas(resp?.data)
        // const arr = resp.data.map(x => x.nota)
        // this.notalaborats = arr.length ? arr : []
        // this.notalaborats.push('BARU')
        // this.notalaborat = this.notalaborats[0]
      }
    },

    setNotas (array) {
      const arr = array.map(x => x.nota)
      this.notas = arr.length ? arr : []
      this.notas.push('BARU')
      this.form.nota = this.notas[0]
    },
    async hapusPermintaan (pasien, id) {
      const payload = { noreg: pasien?.noreg, id }
      try {
        const resp = await api.post('v1/simrs/penunjang/bankdarah/hapusdataIgd', payload)
        if (resp.status === 200) {
          const storePasien = usePengunjungIgdStore()
          storePasien.hapusDataBankdarah(pasien, id)
          this.setNotas(resp?.data?.nota)
          notifSuccess(resp)
        }
      }
      catch (error) {
        // console.log('hpus rad', error)
      }
    }
  }
})
