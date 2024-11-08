import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
import { notifErrVue, notifSuccess } from 'src/modules/utils'
import { usePengunjungIgdStore } from './pengunjung'

export const useAmbulanStore = defineStore('ambulan-store', {
  state: () => ({
    loadingOrder: false,
    loadingForm: false,
    loadingHistory: false,
    tujuanambulan: '',
    listperawat: '',
    notas: [],
    form: {
      notaambulan: '',
      tujuan: '',
      keterangan: '',
      pelsupir: '',
      pelperawat: '',
      perawatpendamping1: '',
      perawatpendamping2: '',
      dokterikut: ''
    },
    loadingSaveAmbulan: false
  }),
  actions: {
    async getTujuanAmbulan () {
      const resp = await api.get('v1/simrs/penunjang/ambulan/gettujuanambulan')
      if (resp.status === 200) {
        this.tujuanambulan = resp.data
      }
    },
    async getperawatpedamping () {
      const resp = await api.get('v1/simrs/master/nakes/selaindokter')
      if (resp.status === 200) {
        this.listperawat = resp.data
      }
    },
    async saveOrderAmbulan (pasien) {
      if (!pasien?.kodedokter) {
        return notifErrVue('kode Dokter masih kosong, silahkan tutup dulu pasien ini kemudian tekan tombol refresh di pojok kanan atas')
      }
      const formamb = this.form
      formamb.noreg = pasien?.noreg
      formamb.norm = pasien?.norm
      formamb.kodedokter = pasien?.kodedokter
      formamb.kodesistembayar = pasien?.kodesistembayar
      formamb.koderuang = pasien?.kodepoli
      this.loadingSaveAmbulan = true

      try {
        const resp = await api.post('v1/simrs/penunjang/ambulan/simpanreqambulan', formamb)
        if (resp.status === 200) {
          const storePasien = usePengunjungIgdStore()
          const isi = resp.data.data[0]
          console.log('isi', isi)
          this.setNotas(resp?.data?.nota)
          storePasien.injectDataPasien(pasien, isi, 'ambulan')
          notifSuccess(resp)
          this.initReset()
          this.loadingForm = false
        }
      }
      catch (error) {
        // console.log(error)
        this.loadingFormDiagnosa = false
      }
    },
    async getNota (pasien) {
      const payload = { params: { noreg: pasien?.noreg } }
      const resp = await api.get('v1/simrs/penunjang/ambulan/getnota', payload)
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
      this.form.notaambulan = this.notas[0]
    }
  }
})
