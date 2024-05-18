import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
import { notifErrVue, notifSuccess } from 'src/modules/utils'
import { usePengunjungIgdStore } from './pengunjung'

export const useJenazahIgd = defineStore('jenazah-igd', {
  state: () => ({
    notas: [],
    form: {
      noreg: '', // rs1
      norm: '', // rs2
      kodepoli: '', // rs10
      permintaan: '',
      kodesistembayar: '',
      nota: '',
      kodedokter: ''
    },
    loadingOrder: false,
    loadingHapus: false
  }),
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
      this.form.norm = pasien?.norm
      this.form.nota = pasien?.nota
      try {
        const resp = await api.post('v1/simrs/penunjang/jenazah/permintaanperawatanjenazah', this.form)
        // console.log('save penunjang fisio', resp.data)
        if (resp.status === 200) {
          const storePasien = usePengunjungIgdStore()
          const isi = resp?.data?.result
          storePasien.injectDataPasien(pasien, isi, 'jenazah')
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
    initReset() {
      this.form = {
        noreg: '', // rs1
        norm: '',
        kodepoli: '', // rs10
        permintaan: '', // rs4
        kodesistembayar: '',
        kodedokter: ''
      }

      return new Promise((resolve, reject) => {
        resolve()
      })
    },
    async getNota(pasien) {
      const payload = { params: { noreg: pasien?.noreg } }
      const resp = await api.get('v1/simrs/penunjang/jenazah/getnota', payload)
      // console.log('nota fisio', resp.data)
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
