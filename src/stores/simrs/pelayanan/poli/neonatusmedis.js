import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
// eslint-disable-next-line no-unused-vars
import { usePengunjungPoliStore } from './pengunjung'
// eslint-disable-next-line no-unused-vars
import { notifErr, notifSuccess } from 'src/modules/utils'

export const useNeonatusMedisStore = defineStore('neonatus-medis', {
  state: () => ({
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
    loadingSave: false
  }),
  actions: {

    initForm() {
      this.form.usiaKehamilanIbu = null
      this.form.anc = null
      this.form.ancLain = null
      this.form.rujukan = null
      this.form.rujukanLain = null
      this.form.riwayatPenyakitIbu = null
      this.form.riwayatPenyakitIbuAda = null
      this.form.riwayatKehamilan = []
      this.form.riwayatKehamilanSekarangG = null
      this.form.riwayatKehamilanSekarangP = null
      this.form.riwayatKehamilanSekarangAb = null
      this.form.riwayatPersalinan = null
      this.form.riwayatPersalinanFebris = null
      this.form.riwayatPersalinanLain = null
      this.form.induksiPersalinan = null
      this.form.anestesi = null
      this.form.caraKelahiran = null
      this.form.caraKelahiranLain = null
      this.form.indikasiPartus = null
      this.form.tempatPersalinan = null
      this.form.penolongPersalinan = null
      this.form.penolongPersalinanLain = null
      this.form.ketubanPecahDini = null
      this.form.ketubanPecahDiniJam = null
      this.form.jumlahKetuban = null
      this.form.warnaKetuban = null
      this.form.kekeruhan = null
      this.form.bau = null
      this.form.placenta = null
      this.form.obatSebelumBersalin = null
      this.form.obatSebelumBersalinYa = null
      // objective
      this.form.lahirTgl = null
      this.form.lahirJam = null
      this.form.resusitasi = null
      this.form.resusitasiJamMulai = null
      this.form.resusitasiJamSelesai = null
      this.form.skorApgar = null
      this.form.beratBadan = null
      this.form.beratBadanKat = null
      this.form.panjangBadan = null
      this.form.lingkarKepala = null
      this.form.lingkarKepalaKat = null
      this.form.usiaKehamilanBayi = null
      this.form.usiaKehamilanBayiKat = null
    },

    saveData(pasien) {
      this.form.noreg = pasien?.noreg
      this.form.norm = pasien?.norm
      this.loadingSave = true

      return new Promise((resolve, reject) => {
        api.post('v1/simrs/pelayanan/neonatusmedis', this.form)
          .then((resp) => {
            console.log('cb', resp)
            this.loadingSave = true
          })
          .catch((err) => {
            console.log(err)
            this.loadingSave = false
            reject(err)
          })
      })
    }
  }
})
