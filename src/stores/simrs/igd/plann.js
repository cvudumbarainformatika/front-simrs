import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
import { notifErrVue, notifSuccess } from 'src/modules/utils'
import { usePengunjungIgdStore } from './pengunjung'
import { date } from 'quasar'

export const usePlannStore = defineStore('plann-store', {
  state: () => ({
    panel: 'Rawat Inap',
    loadingOrder: false,
    loadingForm: false,
    loadingHistory: false,
    loadingSavePlann: false,
    notas: [],
    tab: 'SkalaTransfer',
    tabs: [
      { name: 'Skala Transfer', page: 'SkalaTransfer' },
      { name: 'Plann', page: 'Plann' }
    ],
    form: {
      panel: 'Rawat Inap'
    }
  }),
  actions: {
    async savePlan (pasien) {
      if (!pasien?.kodedokter) {
        return notifErrVue('kode Dokter masih kosong, silahkan tutup dulu pasien ini kemudian tekan tombol refresh di pojok kanan atas')
      }
      this.loadingSavePlann = true
      const formamb = this.form
      formamb.noreg = pasien?.noreg
      formamb.norm = pasien?.norm
      formamb.kodedokter = pasien?.kodedokter
      formamb.kodesistembayar = pasien?.kodesistembayar
      formamb.koderuang = pasien?.kodepoli
      try {
        const resp = await api.post('v1/simrs/planing/igd/simpanranap', formamb)
        if (resp.status === 200) {
          const storePasien = usePengunjungIgdStore()
          const isi = resp.data.result[0]
          storePasien.injectDataPasien(pasien, isi, 'planheder')
          notifSuccess(resp)
          this.initReset()
          this.loadingSavePlann = false
        }
      }
      catch (error) {
        // console.log(error)
        this.loadingSavePlann = false
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
    },
    formattanggal () {
      if (this.form.operasi === 0) {
        this.form.tgloperasi = ''
      }
      else {
        const sekarang = Date.now()
        this.form.tgloperasi = date.formatDate(sekarang, 'YYYY-MM-DD')
        this.form.tglrujukan = date.formatDate(sekarang, 'YYYY-MM-DD')
        this.form.tglrencanakunjungan = date.formatDate(sekarang, 'YYYY-MM-DD')
        this.form.tglmeninggal = date.formatDate(sekarang, 'YYYY-MM-DD')
        this.form.jammeninggal = date.formatDate(sekarang, 'H:m')
      }
    },
    initReset () {
      this.form.panel = 'Rawat Inap'
      this.form.operasi = ''
      this.form.jenisoperasi = ''
      this.form.tgloperasi = ''
      this.form.ruangtujuan = ''
      this.form.keterangan = ''
    }
  }
})
