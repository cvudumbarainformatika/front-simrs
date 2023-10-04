import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
import { dateDbFormat } from 'src/modules/formatter'
import { notifSuccess } from 'src/modules/utils'
import { usePengunjungPoliStore } from './pengunjung'

export const usePerencanaanPoliStore = defineStore('perencanaan-poli', {
  state: () => ({
    plannings: [],
    poli: [],
    plann: '',
    loadingSaveKonsul: false,
    formKonsul: {
      noreg_lama: '',
      norm: '',
      tgl_kunjungan: '',
      tgl_rencana_konsul: dateDbFormat(new Date()),
      kdpoli_asal: '',
      kdpoli_tujuan: '',
      kddokter_asal: ''
    },

    formRsLain: {
      norm: '',
      noka: '',
      nosep: '',
      tglrujukan: '',
      tglrencanakunjungan: '',
      ppkdirujuk: '',
      jenispelayanan: '',
      catatan: '',
      diagnosarujukan: '',
      tiperujukan: '',
      polirujukan: ''
    },
    formPrb: {
      norm: '',
      noka: '',
      nosep: '',
      tglrujukan: '',
      tglrencanakunjungan: '',
      ppkdirujuk: '',
      jenispelayanan: '',
      catatan: '',
      diagnosarujukan: '',
      tiperujukan: '',
      polirujukan: ''
    },
    loadingSave: false
  }),
  // getters: {
  //   doubleCount: (state) => state.counter * 2
  // },
  actions: {
    async getMasterPlanning() {
      const resp = await api.get('v1/simrs/pelayanan/mpalningrajal')
      if (resp.status === 200) {
        this.plannings = resp?.data
      }
      console.log('master plann', resp)
    },
    async getMasterPoli() {
      const resp = await api.get('v1/simrs/pelayanan/mpoli')
      if (resp.status === 200) {
        this.poli = resp?.data
      }
      console.log('master poli', resp)
    },

    setFormKonsul(key, val) {
      this.formKonsul[key] = val
    },
    async saveKonsul(pasien) {
      this.loadingSaveKonsul = true
      console.log(pasien)
      this.formKonsul.norm = pasien?.norm
      this.formKonsul.noreg_lama = pasien?.noreg
      this.formKonsul.noreg = pasien?.noreg
      this.formKonsul.tgl_kunjungan = pasien?.tgl_kunjungan
      this.formKonsul.kdpoli_asal = pasien?.kodepoli
      this.formKonsul.kddokter_asal = pasien?.kodedokter
      this.formKonsul.planing = 'Konsultasi'

      try {
        const resp = await api.post('v1/simrs/pelayanan/simpanplaningpasien', this.formKonsul)
        console.log(resp)
        if (resp.status === 200) {
          const storePasien = usePengunjungPoliStore()
          const isi = resp?.data?.result
          storePasien.injectDataPasien(pasien, isi, 'planning')
          notifSuccess(resp)
          this.loadingSaveKonsul = false
        }
        this.loadingSaveKonsul = false
      } catch (error) {
        console.log(error)
        this.loadingSaveKonsul = false
      }
    },

    async hapusItem(pasien, id) {
      const payload = { noreg: pasien?.noreg, id }
      try {
        const resp = await api.post('v1/simrs/pelayanan/hapusplaningpasien', payload)
        console.log(resp)
        if (resp.status === 200) {
          const storePasien = usePengunjungPoliStore()
          storePasien.hapusDataPlanning(pasien, id)
          notifSuccess(resp)
        }
      } catch (error) {
        console.log(error)
      }
    },

    // ====================================================================================================================================================RUmah sakit lain
    async saveRsLain(pasien) {
      this.formKonsul.norm = pasien?.norm
      this.formKonsul.noreg = pasien?.noreg
      this.formKonsul.planing = 'Rumah Sakit Lain'
    },
    initPasien(pasien) {
      this.formRsLain.norm = pasien?.norm
      this.formPrb.norm = pasien?.norm
      this.formRsLain.noka = pasien?.noka
      this.formPrb.noka = pasien?.noka
      this.formRsLain.nosep = pasien?.sep
      this.formPrb.nosep = pasien?.sep
      this.formRsLain.norujukan = pasien?.norujukan
      this.formPrb.norujukan = pasien?.norujukan
      this.formRsLain.tglrujukan = dateDbFormat(new Date())
      this.formPrb.tglrujukan = dateDbFormat(new Date())
      this.formRsLain.tglrencanakunjungan = dateDbFormat(new Date())
      this.formPrb.tglrencanakunjungan = dateDbFormat(new Date())
      this.formRsLain.tiperujukan = '2'
      this.formPrb.tiperujukan = '1'
    },
    setFormRsLain(key, val) {
      this.formRsLain[key] = val
    },
    setFormPrb(key, val) {
      this.formPrb[key] = val
    }
  }
})
