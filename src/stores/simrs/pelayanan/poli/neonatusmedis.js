import { defineStore } from 'pinia'

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
    form: {}
  }),
  actions: {

    initForm() {
      this.form.usiaKehamilan = null
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
    }
  }
})
