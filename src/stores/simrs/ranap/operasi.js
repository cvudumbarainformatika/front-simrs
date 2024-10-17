import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
import { usePengunjungRanapStore } from './pengunjung'
// eslint-disable-next-line no-unused-vars
import { notifErrVue, notifSuccess } from 'src/modules/utils'

export const usePermintaanOperasiRanapStore = defineStore('permintaan-operasi-ranap-store', {
  state: () => ({
    notas: [],
    form: {
      noreg: '', // rs1
      nota: null, // rs2
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

    async getData (pasien) {
      const resp = await api.get(`v1/simrs/penunjang/operasi/getdata?noreg=${pasien?.noreg}`)
      console.log('permintaan operasi', resp)
      // console.log('nota fisio', resp.data)
      if (resp.status === 200) {
        // this.setNotas(resp?.data)
        const data = resp?.data
        const storeRanap = usePengunjungRanapStore()
        for (let i = 0; i < data.length; i++) {
          const isi = data[i]
          storeRanap.injectDataPasien(pasien?.noreg, isi, 'operasi')
        }
      }
    },

    async saveOrder (pasien) {
      if (!pasien?.kodedokter) {
        return notifErrVue('kode Dokter masih kosong, silahkan tutup dulu pasien ini kemudian tekan tombol refresh di pojok kanan atas')
      }
      this.loadingOrder = true
      this.form.noreg = pasien?.noreg
      this.form.kodepoli = pasien?.kodepoli
      this.form.kodedokter = pasien?.kodedokter
      this.form.kodesistembayar = pasien?.kodesistembayar
      this.form.kdgroup_ruangan = pasien?.kdgroup_ruangan
      this.form.nota = (this.form.nota === 'BARU' || this.form.nota === 'SEMUA') ? null : this.form.nota
      // this.form.isRanap = isRanap

      console.log(this.form)

      try {
        const resp = await api.post('v1/simrs/penunjang/operasi/permintaanoperasi', this.form)
        // console.log('save permintaan operasi', resp.data)
        if (resp.status === 200) {
          // const storePasien = usePengunjungPoliStore()
          const storeRanap = usePengunjungRanapStore()
          const isi = resp?.data?.result
          // storePasien.injectDataPasien(pasien, isi, 'fisio')
          storeRanap.injectDataPasien(pasien?.noreg, isi, 'operasi')
          this.setNotas(resp?.data?.nota)
          notifSuccess(resp)
          this.loadingOrder = false
          this.initReset()
        }
        this.loadingOrder = false
      }
      catch (error) {
        this.loadingOrder = false
      }
    },

    async getNota (pasien) {
      const payload = { params: { noreg: pasien?.noreg } }
      const resp = await api.get('v1/simrs/penunjang/operasi/getnota', payload)
      // console.log('nota fisio', resp.data)
      if (resp.status === 200) {
        this.setNotas(resp?.data)
      }
    },

    setNotas (array) {
      const arr = array.map(x => x.nota)
      this.notas = arr.length ? arr : []
      this.notas.push('BARU')
      this.notas.unshift('SEMUA')
      this.form.nota = this.notas[0]
    },

    async hapusPermintaan (pasien, id) {
      this.loadingHapus = true
      const payload = { noreg: pasien?.noreg, id }
      try {
        const resp = await api.post('v1/simrs/penunjang/operasi/hapuspermintaan', payload)
        this.loadingHapus = false
        // console.log(resp)
        if (resp.status === 200) {
          // const storePasien = usePengunjungPoliStore()
          const storeRanap = usePengunjungRanapStore()
          // storePasien.hapusDataFisio(pasien, id)
          storeRanap.hapusDataInjectan(pasien, id, 'operasi')
          this.setNotas(resp?.data?.nota)
          notifSuccess(resp)
        }
      }
      catch (error) {
        this.loadingHapus = false
        // console.log(error)
      }
    },

    initReset () {
      this.form = {
        noreg: '', // rs1
        nota: this.notas?.length ? this.notas[0] : 'SEMUA', // rs2
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
