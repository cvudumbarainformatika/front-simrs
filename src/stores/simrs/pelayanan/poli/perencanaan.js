import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
import { dateDbFormat } from 'src/modules/formatter'
import { notifErrVue, notifSuccess } from 'src/modules/utils'
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
    formRanap: {
      noka: '',
      noreg: '',
      norm: '',
      kodedokterdpjp: '',
      kddokter: '',
      dokter: '',
      tglrencanakontrol: '',
      tanggaloperasi: '',
      tglrencanakunjungan: '',
      tglupdate: '',
      jenistindakan: null,
      icd9: null,
      kodepolibpjs: '',
      polibpjs: '',
      keterangan: '',
      kdunit: '',
      kdruang: '',
      kdruangtujuan: '',
      kontakpasien: '',
      nama: '',
      kelamin: '',
      tgllahir: '',
      status: 'Tidak',
      planing: 'Rawat Inap'

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
      this.formKonsul.kodesistembayar = pasien?.kodesistembayar
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
      this.formRsLain.norm = pasien?.norm
      this.formRsLain.noreg = pasien?.noreg
      this.formRsLain.planing = 'Rumah Sakit Lain'
      this.formRsLain.kodesistembayar = pasien?.kodesistembayar
      this.loadingSave = true
      try {
        const resp = await api.post('v1/simrs/pelayanan/simpanplaningpasien', this.formRsLain)
        console.log('save rs lain', resp)
        if (resp.status === 200) {
          const storePasien = usePengunjungPoliStore()
          const isi = resp?.data?.result ?? false
          if (isi) {
            storePasien.injectDataPasien(pasien, isi, 'planning')
            notifSuccess(resp)
          } else {
            notifErrVue('Update Info Rujukan ke Rs lain Gagal')
          }
          this.loadingSave = false
        }
        this.loadingSave = false
      } catch (error) {
        console.log(error)
        this.loadingSave = false
      }
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
    initPasienRanap(pasien) {
      this.formRanap.norm = pasien?.norm
      this.formRanap.noka = pasien?.noka
      this.formRanap.noreg = pasien?.noreg
      this.formRanap.kodedokterdpjp = pasien?.datasimpeg?.kddpjp
      this.formRanap.kddokter = pasien?.datasimpeg?.kdpegsimrs
      this.formRanap.dokter = pasien?.datasimpeg?.nama
      this.formRanap.tglrencanakunjungan = pasien?.tgl_kunjungan
      this.formRanap.tglrencanakontrol = dateDbFormat(new Date())
      this.formRanap.tanggaloperasi = dateDbFormat(new Date())
      this.formRanap.tglupdate = dateDbFormat(new Date())
      this.formRanap.kodepolibpjs = pasien?.kodepolibpjs
      this.formRanap.polibpjs = pasien?.polibpjs
      this.formRanap.kdunit = pasien?.kdunit
      this.formRanap.kontakpasien = pasien?.nohp
      this.formRanap.nama = pasien?.nama_panggil
      this.formRanap.kelamin = pasien?.kelamin
      this.formRanap.tgllahir = pasien?.tgllahir
      this.formRanap.kdruang = pasien?.kodepoli
      this.formRanap.kodesistembayar = pasien?.kodesistembayar
      // this.formRanap.kdruangtujuan= pasien?.
      // this.formRanap.keterangan= pasien?.
      // this.formRanap.jenistindakan= pasien?.
      // this.formRanap.icd9= pasien?.
    },
    setFormRsLain(key, val) {
      this.formRsLain[key] = val
    },
    // ==================================================
    setFormPrb(key, val) {
      this.formPrb[key] = val
    },

    // ====================================================================================================================================================RUmah sakit lain
    setFormRanap(key, val) {
      this.formRanap[key] = val
    },
    async saveRanap(pasien) {
      this.loadingSave = true
      try {
        const resp = await api.post('v1/simrs/pelayanan/simpanplaningpasien', this.formRanap)
        console.log('ranap', resp)
        if (resp.status === 200) {
          const storePasien = usePengunjungPoliStore()
          const isi = resp?.data?.result ?? false
          if (isi) {
            storePasien.injectDataPasien(pasien, isi, 'planning')
            notifSuccess(resp)
          } else {
            notifErrVue('Update Rawat Inap gagal')
          }
          this.loadingSave = false
        }
        this.loadingSave = false
      } catch (error) {
        console.log(error)
        this.loadingSave = false
      }
    }
  }
})
