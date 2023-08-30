import { defineStore } from 'pinia'
import { dateDbFormat, formatJam } from 'src/modules/formatter'

export const usePenunjangPoli = defineStore('penunjang-poli', {
  state: () => ({
    tab: 'Laborat',
    tabs: ['Laborat', 'Radiologi', 'Cardio', 'EEG', 'Hemodialisa', 'USG 4 Dimensi', 'Thread Mill', 'Endoscope', 'Psikologi'],
    // laborat
    caripemeriksaanlab: '',
    caripemeriksaanradiologi: '',
    form: {
      norm: '',
      noreg: '',
      nama: '',
      nik: '',
      tanggallahir: '',
      jeniskelamin: '',
      jam: formatJam(new Date()),
      tanggal: dateDbFormat(new Date()),
      pasienpuasa: 'Tidak',
      cito: 'Tidak',
      dokterpengirim: '',
      // notelpdokter: '',
      unitpengirim: '',
      // diagnosa: '',
      catatan: ''
      // asalspesimenklinis: 5,
      // lokasispesimen: '',
      // jumlahspesimen: '',
      // volumespesimen:
    },
    pemeriksaanslab: [],
    pemeriksaansradiologi: []
  }),
  actions: {
    saveOrderLaborat(pasien) {
      console.log(pasien)
    }
  }
})
