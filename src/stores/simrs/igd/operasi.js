import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
import { notifSuccess } from 'src/modules/utils'
import { usePengunjungIgdStore } from './pengunjung'

export const useOperasiIgd = defineStore('operasi-igd', {
  state: () => ({
    notas: [],
    dokters: [],
    loadingSave: false,
    form: {
      noreg: '', // rs1
      nota: '', // rs2
      kodepoli: '', // rs10
      permintaan: '', // rs4
      kodesistembayar: ''
    },
    loadingOrder: false
  }),
  // getters: {
  //   doubleCount: (state) => state.counter * 2
  // },
  actions: {

    async saveOrder (pasien) {
      // if (!pasien?.kodedokter) {
      //   return notifErrVue('kode Dokter masih kosong, silahkan tutup dulu pasien ini kemudian tekan tombol refresh di pojok kanan atas')
      // }
      this.loadingSave = true
      this.form.noreg = pasien?.noreg
      this.form.kodepoli = pasien?.kodepoli
      // this.form.kodedokter = pasien?.kodedokter
      this.form.kodesistembayar = pasien?.kodesistembayar
      this.form.nota = this.form.nota === 'BARU' ? '' : this.form.nota
      try {
        const resp = await api.post('v1/simrs/penunjang/ok/permintaanoperasi', this.form)
        // console.log('save penunjang ok', resp)
        if (resp.status === 200) {
          const storePasien = usePengunjungIgdStore()
          const isi = resp?.data?.result
          storePasien.injectDataPasien(pasien, isi, 'ok')
          this.setNotas(resp?.data?.nota)
          notifSuccess(resp)
          this.loadingSave = false
          this.initReset()
        }
        this.loadingSave = false
      }
      catch (error) {
        this.loadingSave = false
      }
    },

    async getNota (pasien) {
      const payload = { params: { noreg: pasien?.noreg } }
      const resp = await api.get('v1/simrs/penunjang/ok/getnota', payload)
      // console.log('nota ok', resp)
      if (resp.status === 200) {
        this.setNotas(resp?.data)
      }
    },

    setNotas (array) {
      const arr = array.map(x => x.nota)
      this.notas = arr.length ? arr : []
      this.notas.push('BARU')
      this.form.nota = this.notas[0]
    },
    initReset () {
      this.form = {
        noreg: '', // rs1
        nota: this.notas?.length ? this.notas[0] : '', // rs2
        kodepoli: '', // rs10
        permintaan: '', // rs4
        kodesistembayar: ''
      }
      const pengunjung = usePengunjungIgdStore()
      this.dokters = pengunjung?.nakes?.filter(x => x?.kdgroupnakes === '1') ?? []
      return new Promise((resolve, reject) => {
        resolve()
      })
    },

    async hapusPermintaan (pasien, id) {
      const payload = { noreg: pasien?.noreg, id }
      try {
        const resp = await api.post('v1/simrs/penunjang/ok/hapuspermintaanok', payload)
        // console.log(resp)
        if (resp.status === 200) {
          const storePasien = usePengunjungIgdStore()
          storePasien.hapusDataOk(pasien, id)
          this.setNotas(resp?.data?.nota)
          notifSuccess(resp)
        }
      }
      catch (error) {
        // console.log(error)
      }
    }

  }
})
