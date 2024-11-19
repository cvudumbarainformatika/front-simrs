import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
import { usePengunjungIgdStore } from './pengunjung'
import { notifErr, notifSuccess } from 'src/modules/utils'

export const useAnamneseKebidananStore = defineStore('anamnese-kebidanan-store', {
  state: () => ({
    loadingForm: false,
    selection: [],
    selectionginekologis: [],
    selectionkeluhanhamils: [],
    alergis: ['Obat', 'Makanan', 'Udara', 'Lain-lain', 'Tidak ada Alergi'],
    ginekologis: ['Infertilitas Kanker', 'Infeksi Virus', 'Polip Serviks', 'PMS', 'Myoma', 'Endometriosis', 'Lain-lain'],
    asupanantenatals: ['Dokter Kandungan', 'Dokter Umum', 'Bidan', 'Lain-Lain'],
    keluhanhamils: ['Mual', 'Muntah', 'Perdarahan', 'Pusing', 'Lain-lain'],
    pilihnyerihilang: [],
    selectionasupanantenatal: [],
    form: {
      ketmetodeskrininggizi: 'Pasien Dengan Masalah Ginekologi/Onkologi',
      optionskriniggizi: 1,
      skreeninggizi: 0,
      asupanmakan: 0,
      kondisikhusus: '',
      skorkondisikhusus: 0,
      skor: 0,

      asupanmakanberkurang: 0,
      metabolisme: 0,
      penambahanbb: 0,
      nilaihbberkurang: 0,
      skorgizix: 0,

      metodenyeri: 'nrt',
      keteranganscorenyeri: 'tidak ada nyeri',
      skornyeri: 0,

      scroebps: 0,
      ketscorebps: 0,
      ketcolorbps: 'light-green',

      scroenips: 0,
      ketscorenips: 0,
      ketcolornips: 'light-green',

      nyerihilang: ''

    },
    nilaiekspresiwajah: 0,
    nilaigerakantangan: 0,
    nilaikepatuhanventilasi: 0,

    nilaiekspresiwajahnips: 0,
    nilaimenangis: 0,
    nilaipolanafas: 0,
    nilailengan: 0,
    nilaikaki: 0,
    nilairangsangan: 0

  }),
  actions: {
    keteranganSkorGizi (nilai) {
      const skor = nilai || 0
      if (skor < 2) {
        return 'tidak beresiko malnutrisi'
      }
      else {
        return 'Beresiko malnutrisi'
      }
    },
    setForm (key, val) {
      this.form[key] = val
    },
    hitungNilaiSkor () {
      const skorKondKhusus = this.form.skorkondisikhusus
      const skor = parseInt(this.form.skreeninggizi) + parseInt(this.form.asupanmakan) + parseInt(skorKondKhusus)
      this.form.skor = skor
    },
    setKeteranganSkornyeri (val) {
      if (val === 0) {
        this.form.keteranganscorenyeri = 'tidak ada nyeri'
      }
      else if (val > 0 && val <= 3) {
        this.form.keteranganscorenyeri = 'nyeri ringan'
      }
      else if (val > 3 && val <= 6) {
        this.form.keteranganscorenyeri = 'nyeri sedang'
      }
      else if (val > 6 && val <= 10) {
        this.form.keteranganscorenyeri = 'nyeri berat'
      }
    },
    async saveData (pasien) {
      this.loadingForm = true
      this.form.norm = pasien ? pasien.norm : ''
      this.form.noreg = pasien ? pasien.noreg : ''

      console.log('ini form', this.form)

      try {
        const resp = await api.post('v1/simrs/igd/anamnesis/simpanananamesiskebidanan', this.form)
        if (resp.status === 200) {
          // console.log('simpan anamnesis', resp)
          const storePasien = usePengunjungIgdStore()

          if (resp.data.result === 1) {
            this.form.rs4 = this.form.keluhanutama
          }
          const isi = resp.data.result
          storePasien.injectDataPasien(pasien, isi, 'anamnesekebidanan')
          notifSuccess(resp)
          this.initReset()
          this.loadingForm = false
        }

        this.loadingForm = false
      }
      catch (error) {
        // console.log('anamnesis err', error)
        this.loadingForm = false
        notifErr(error)
      }
    },
    initGpa (val) {
      this.form.gravida = val.gravida
      this.form.haid = val.haid
      this.form.partus = val.partus
      this.form.abortus = val.abortus
    }
  }
})
