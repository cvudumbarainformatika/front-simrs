import { defineStore } from 'pinia'

export const useAnamnesisRanapStore = defineStore('anamnesis-ranap-store', {
  state: () => ({
    form: {
      // ini untuk 4.1
      keluhanUtama: null,
      diagnosaMasuk: null,
      rwPenySkr: null,
      rwPenyDhl: null,
      rwPengobatan: null,
      rwPenyKlrg: null,
      rwPkrjDgZatBahaya: null,
      rwAlergi: [],
      ketRwAlergi: null,
      kajianNyeri: 'Wong Baker Face Scale',
      skorNyeri: 0,
      keluhanNyeri: null,
      ekspresiWajah: null,
      ekspresiWajahKet: null,
      gerakanTangan: null,
      gerakanTanganKet: null,
      kebutuhanVentilasi: null,
      kebutuhanVentilasiKet: null,
      sgd: { // skreening gizi dewasa
        bb: 0, // penurunan bb
        am: 0, // asupan makan
        kk: 0 // kondisi khusus
      },
      sgdSkor: 0,
      sgdKet: null

      // pemeriksaan fisik
      // keadaanUmum: null,
      // bb: 0,
      // tb: 0,
      // nadi: 0,
      // suhu: 0,
      // sistole: 0,
      // diastole: 0,
      // pernapasan: 0
    },

    adaTdk: ['Ada', 'Tidak Ada'],
    alergis: ['Obat', 'Makanan', 'Udara', 'Lain-lain', 'Tidak Ada Alergi'],
    pilihanNyeris: [{ text: 'Wong Baker Face Scale', value: 'a' }, { text: 'Behavioral Pain Scale (BPS)', value: 'b' }],
    ekspresiWajah: [
      { text: 'Santai, tanpa ketegangan', value: '1' },
      { text: 'Sedikit tegang, seperti dahi berkerut', value: '2' },
      { text: 'Sangat tegang, mata tertutup rapat', value: '3' },
      { text: 'Ekspresi menunjukkan nyeri parah, seperti menangis atau mengerutkan wajah', value: '4' }
    ],
    gerakanTangan: [
      { text: 'Tidak ada gerakan', value: '1' },
      { text: 'Ada gerakan ringan, seperti mengerutkan atau menggerakkan telapak tangan tanpa arah ', value: '2' },
      { text: 'Ada gerakan kuat, seperti menarik tangan atau berusaha melepas alat medis', value: '3' },
      { text: 'Gerakan tidak terkendali, seperti upaya melarikan diri', value: '4' }
    ],
    kebutuhanVentilasi: [
      { text: 'Toleran. tidak ada perlawanan', value: '1' },
      { text: 'Sedikit tidak toleran, batuk sekali atau melawan sedikit', value: '2' },
      { text: 'Sering batuk atau melawan ventilasi', value: '3' },
      { text: 'Tidak toleran sama sekali, melawan ventilasi secara konstan', value: '4' }
    ]
  }),
  getters: {
    doubleCount: (state) => state.counter * 2
  },
  actions: {

    initReset () {
      this.form = {
        // ini untuk 4.1
        keluhanUtama: null,
        diagnosaMasuk: null,
        rwPenySkr: null,
        rwPenyDhl: null,
        rwPengobatan: null,
        rwPenyKlrg: null,
        rwPkrjDgZatBahaya: null,
        rwAlergi: [],
        ketRwAlergi: null,
        kajianNyeri: 'Wong Baker Face Scale',
        skorNyeri: 0,
        keluhanNyeri: null,
        ekspresiWajah: null,
        ekspresiWajahKet: null,
        gerakanTangan: null,
        gerakanTanganKet: null,
        kebutuhanVentilasi: null,
        kebutuhanVentilasiKet: null,
        sgd: { // skreening gizi dewasa
          bb: 0, // penurunan bb
          am: 0, // asupan makan
          kk: 0 // kondisi khusus
        },
        sgdSkor: 0,
        sgdKet: null
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
