import { defineStore } from 'pinia'

export const usePemeriksaanUmumRanapStore = defineStore('pemeriksaan-umum-ranap-store', {
  state: () => ({
    form: {
      // ini untuk 4.1

      // pemeriksaan umum
      keadaanUmum: null,
      bb: 0,
      tb: 0,
      nadi: 0,
      suhu: 0,
      sistole: 0,
      diastole: 0,
      pernapasan: 0,
      spo: 0,
      tkKesadaran: 0,
      tkKesadaranKet: 'Sadar Baik/Alert',

      sosial: null,
      spiritual: null,
      // neurologis: null,
      // muakuloskeletal: null,
      statusPsikologis: 'Tidak ada kelainan',
      ansuransi: 'Ada',
      edukasi: [
        { label: 'Apakah pasien / keluarga tahu mengenai penyakit dan perawatannya?', value: null },
        { label: 'Apakah membutuhkan edukasi?', value: null }
      ],

      // kultural
      penyebabSakit: null,
      komunikasi: 'Normal',
      makananPokok: 'Nasi',
      makananPokokLain: null,
      pantanganMkanan: 'Tidak'

      // pemeriksaan fisik
    },

    keadaanUmums: ['Baik', 'Sedang', 'Lemah'],
    optionsTingkatkesadaran: [
      { value: 0, label: 'Sadar Baik/Alert' }, // 248234008
      { value: 1, label: 'Berespon denga kata-kata / Voice' }, // 300202002
      { value: 2, label: 'Hanya berespons jika dirangsang nyeri / Pain' }, // 450847001
      { value: 3, label: 'Pasien tidak sadar / Unresponsive' }, // 422768004
      { value: 4, label: 'Gelisah atau bingung' }, // 130987000
      { value: 5, label: 'Acute Confusional States' } // 2776000
    ],
    statusPsikologis: [
      { value: 'Tidak ada kelainan', label: 'Tidak ada kelainan' },
      { value: 'Cemas', label: 'Cemas' },
      { value: 'Takut', label: 'Takut' },
      { value: 'Marah', label: 'Marah' },
      { value: 'Sedih', label: 'Sedih' },
      { value: 'Lain-lain', label: 'Lain-lain' }
    ],
    penyebabs: ['Hukuman', 'Ujian', 'Takdir', 'Buatan Orang Lain', 'Keturunan'],
    komunikasi: ['Normal', 'Introvert', 'Extrovert'],
    makanans: ['Nasi', 'Selain Nasi'],
    yaTidaks: ['Ya', 'Tidak'],
    adaTidaks: ['Ada', 'Tidak Ada']

  }),
  getters: {
    doubleCount: (state) => state.counter * 2
  },
  actions: {

    initReset () {
      this.form = {
        // ini untuk 4.1

        // pemeriksaan umum
        keadaanUmum: null,
        bb: 0,
        tb: 0,
        nadi: 0,
        suhu: 0,
        sistole: 0,
        diastole: 0,
        pernapasan: 0
      }

      this.setKeteranganSkornyeri(0)
      this.hitungSkorSgd()
    },
    setKeteranganSkornyeri (val) {
      if (val === 0) {
        this.form.keluhanNyeri = 'tidak ada nyeri'
      }
      else if (val > 0 && val <= 3) {
        this.form.keluhanNyeri = 'nyeri ringan'
      }
      else if (val > 3 && val <= 6) {
        this.form.keluhanNyeri = 'nyeri sedang'
      }
      else if (val > 6 && val <= 10) {
        this.form.keluhanNyeri = 'nyeri berat'
      }
    },

    hitungSkorSgd () {
      const skor = parseInt(this.form.sgd.bb) + parseInt(this.form.sgd.am) + parseInt(this.form.sgd.kk)
      this.form.sgdSkor = skor
      this.setSgdKet(skor)
    },
    setSgdKet (nilai) {
      const skor = nilai || 0
      if (skor < 2) {
        this.form.sgdKet = 'tidak beresiko malnutrisi'
      }
      else {
        this.form.sgdKet = 'Beresiko malnutrisi'
      }
    }
  }
})
