import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
// eslint-disable-next-line no-unused-vars
import { usePengunjungPoliStore } from './pengunjung'
// eslint-disable-next-line no-unused-vars
import { notifErr, notifSuccess } from 'src/modules/utils'

export const useNeonatusMedisStore = defineStore('neonatus-medis', {
  state: () => ({
    neonatusmedis: null,

    anteNatalCares: ['Tidak', 'Puskesmas', 'RSUD', 'Bidan', 'Dokter Umum', 'Dokter Sp.A', 'Lain-lain'],
    rujukans: ['Datang sendiri', 'Puskesmas', 'Bidan', 'Dokter Umum', 'Dokter Sp.A', 'Lain-lain'],
    riwayatPenyakitIbus: ['Tidak ada', 'Ada'],
    riwayatPersalinans: ['PER/PEB/Eklamasi', 'Pendarahan Antepartum', 'Anemi', 'Febris', 'Partus lama/kasep', 'Lain-lain'],
    induksiPersalinans: ['Tidak', 'Ya'],
    anestesis: ['Tidak', 'Ya'],
    caraKelahirans: ['Spt-B', 'Su-Bracht', 'Su-Man-aid', 'SC', 'Vakum', 'Forsep', 'Lain-lain'],
    penolongPersalinans: ['Bidan', 'Dokter Umum', 'Dokter Sp-OG', 'Dukun', 'Lain-lain'],
    ketubanPecahDinis: ['Tidak', 'Ya'],
    jumlahKetubans: ['Normal', 'Oligohidramnion', 'Polihidramnion', '(-) / tidak ada'],
    kekeruhans: ['Jernih', 'Keruh'],
    baus: ['Tidak', 'Ya'],
    obatSebelumBersalins: ['Tidak', 'Ya'],
    resusitasis: ['Tidak', 'Ya'],
    beratBadans: ['Normal', 'BBLR', 'BBLSR', 'BBLASR'],
    lingkarKepalas: ['Normal', 'Ikrosefali', 'Makrosefali'],
    usiaKehamilanBayis: ['SMK', 'KMK', 'BMK'],
    form: {},
    modalRiwayat: false,
    formRiwayat: {},
    riwayatKehamilan: [],
    loadingSave: false
  }),
  actions: {

    initForm (pasien) {
      this.form.usiaKehamilanIbu = this.neonatusmedis?.usiaKehamilanIbu ?? null
      this.form.anc = this.neonatusmedis?.anc ?? null
      this.form.ancLain = this.neonatusmedis?.ancLain ?? null
      this.form.rujukan = this.neonatusmedis?.rujukan ?? null
      this.form.rujukanLain = this.neonatusmedis?.rujukanLain ?? null
      this.form.riwayatPenyakitIbu = this.neonatusmedis?.riwayatPenyakitIbu ?? null
      this.form.riwayatPenyakitIbuAda = this.neonatusmedis?.riwayatPenyakitIbuAda ?? null
      this.form.riwayatKehamilan = this.riwayatKehamilan ?? []
      this.form.riwayatKehamilanSekarangG = this.neonatusmedis?.riwayatKehamilanSekarangG ?? null
      this.form.riwayatKehamilanSekarangP = this.neonatusmedis?.riwayatKehamilanSekarangP ?? null
      this.form.riwayatKehamilanSekarangAb = this.neonatusmedis?.riwayatKehamilanSekarangAb ?? null
      this.form.riwayatPersalinan = this.neonatusmedis?.riwayatPersalinan ?? null
      this.form.riwayatPersalinanFebris = this.neonatusmedis?.riwayatPersalinanFebris ?? null
      this.form.riwayatPersalinanLain = this.neonatusmedis?.riwayatPersalinanLain ?? null
      this.form.induksiPersalinan = this.neonatusmedis?.induksiPersalinan ?? null
      this.form.anestesi = this.neonatusmedis?.anestesi ?? null
      this.form.caraKelahiran = this.neonatusmedis?.caraKelahiran ?? null
      this.form.caraKelahiranLain = this.neonatusmedis?.caraKelahiranLain ?? null
      this.form.indikasiPartus = this.neonatusmedis?.indikasiPartus ?? null
      this.form.tempatPersalinan = this.neonatusmedis?.tempatPersalinan ?? null
      this.form.penolongPersalinan = this.neonatusmedis?.penolongPersalinan ?? null
      this.form.penolongPersalinanLain = this.neonatusmedis?.penolongPersalinanLain ?? null
      this.form.ketubanPecahDini = this.neonatusmedis?.ketubanPecahDini ?? null
      this.form.ketubanPecahDiniJam = this.neonatusmedis?.ketubanPecahDiniJam ?? null
      this.form.jumlahKetuban = this.neonatusmedis?.jumlahKetuban ?? null
      this.form.warnaKetuban = this.neonatusmedis?.warnaKetuban ?? null
      this.form.kekeruhan = this.neonatusmedis?.kekeruhan ?? null
      this.form.bau = this.neonatusmedis?.bau ?? null
      this.form.placenta = this.neonatusmedis?.placenta ?? null
      this.form.obatSebelumBersalin = this.neonatusmedis?.obatSebelumBersalin ?? null
      this.form.obatSebelumBersalinYa = this.neonatusmedis?.obatSebelumBersalinYa ?? null
      // objective
      this.form.lahirTgl = this.neonatusmedis?.lahirTgl ?? null
      this.form.lahirJam = this.neonatusmedis?.lahirJam ?? null
      this.form.resusitasi = this.neonatusmedis?.resusitasi ?? null
      this.form.resusitasiJamMulai = this.neonatusmedis?.resusitasiJamMulai ?? null
      this.form.resusitasiJamSelesai = this.neonatusmedis?.resusitasiJamSelesai ?? null
      this.form.skorApgar = this.neonatusmedis?.skorApgar ?? null
      this.form.beratBadan = this.neonatusmedis?.beratBadan ?? null
      this.form.beratBadanKat = this.neonatusmedis?.beratBadanKat ?? null
      this.form.panjangBadan = this.neonatusmedis?.panjangBadan ?? null
      this.form.lingkarKepala = this.neonatusmedis?.lingkarKepala ?? null
      this.form.lingkarKepalaKat = this.neonatusmedis?.lingkarKepalaKat ?? null
      this.form.usiaKehamilanBayi = this.neonatusmedis?.usiaKehamilanBayi ?? null
      this.form.usiaKehamilanBayiKat = this.neonatusmedis?.usiaKehamilanBayiKat ?? null
    },

    initFormRiwayat () {
      this.formRiwayat.kehamilanNo = null
      this.formRiwayat.penyulitKehamilan = null
      this.formRiwayat.macamPersalinan = null
      this.formRiwayat.lp = null
      this.formRiwayat.hidupmati = null
      this.formRiwayat.umursekarang = null
      this.formRiwayat.sebabKematian = null
    },

    getData (pasien) {
      const params = { params: { norm: pasien?.norm } }

      return new Promise((resolve, reject) => {
        api.get('v1/simrs/pelayanan/neonatusmedis/neonatusmedis-by-norm', params)
          .then((resp) => {
            if (resp.status === 200) {
              console.log('neonatusmedis :', resp.data)
              this.neonatusmedis = resp.data ?? null
              this.initForm(pasien)
            }
            resolve(resp)
          })
          .catch((err) => {
            console.log(err)
            reject(err)
          })
      })
    },

    saveData (pasien) {
      this.form.noreg = pasien?.noreg
      this.form.norm = pasien?.norm
      this.loadingSave = true

      return new Promise((resolve, reject) => {
        api.post('v1/simrs/pelayanan/neonatusmedis/store', this.form)
          .then((resp) => {
            // console.log(resp)
            if (resp.status === 200) {
              // const storePasien = usePengunjungPoliStore()
              // const isi = resp.data
              // storePasien.injectDataPasien(pasien, isi, 'neonatusmedis')
              this.neonatusmedis = resp.data ?? null
              notifSuccess(resp)
              this.initForm()
              this.loadingSave = false
            }
            this.loadingSave = false
          })
          .catch((err) => {
            console.log(err)
            this.loadingSave = false
            reject(err)
          })
      })
    },

    deleteData (pasien, id) {
      const payload = { id }
      return new Promise((resolve, reject) => {
        api.post('v1/simrs/pelayanan/neonatusmedis/deletedata', payload)
          .then((resp) => {
            // console.log('del', resp)
            if (resp.status === 200) {
              const storePasien = usePengunjungPoliStore()
              storePasien.hapusDataNeonatusmedis(pasien, id)
              notifSuccess(resp)
            }
          })
          .catch((err) => {
            console.log(err)
            reject(err)
          })
      })
    },
    getRiwayatKehamilan (pasien) {
      const params = { params: { norm: pasien?.norm } }
      return new Promise((resolve, reject) => {
        api.get('v1/simrs/pelayanan/neonatusmedis/riwayatKehamilan', params)
          .then((resp) => {
            console.log('get Riwayat', resp)
            if (resp.status === 200) {
              this.riwayatKehamilan = resp.data
            }
          })
          .catch((err) => {
            console.log(err)
            reject(err)
          })
      })
    },
    saveRiwayat (pasien) {
      this.formRiwayat.noreg = pasien?.noreg
      this.formRiwayat.norm = pasien?.norm
      this.loadingSave = true
      return new Promise((resolve, reject) => {
        api.post('v1/simrs/pelayanan/neonatusmedis/storeRiwayatKehamilan', this.formRiwayat)
          .then((resp) => {
            // console.log(resp)
            if (resp.status === 200) {
              this.loadingSave = false
              this.riwayatKehamilan.push(resp.data)
            }
            this.initFormRiwayat()
            this.loadingSave = false
            this.modalRiwayat = false
            resolve()
          })
          .catch((err) => {
            console.log(err)
            this.loadingSave = false
            reject(err)
          })
      })
    },
    deleteRiwayat (id) {
      const payload = { id }
      return new Promise((resolve, reject) => {
        api.post('v1/simrs/pelayanan/neonatusmedis/deleteRiwayatKehamilan', payload)
          .then((resp) => {
            // console.log('del', resp)
            if (resp.status === 200) {
              const data = this.riwayatKehamilan
              const pos = data.findIndex(el => el.id === id)
              if (pos >= 0) { data.splice(pos, 1) }
              notifSuccess(resp)
            }
          })
          .catch((err) => {
            console.log(err)
            reject(err)
          })
      })
    }
  }
})
