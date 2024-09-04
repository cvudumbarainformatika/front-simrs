import { defineStore } from 'pinia'

export const useAsesmentAwalKeperawatanRanapStore = defineStore('asesment-awal-keperawatan-ranap', {
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
      skorNyeri: 0,
      keluhanNyeri: null,

      // pemeriksaan fisik
      keadaanUmum: null,
      bb: 0,
      tb: 0,
      nadi: 0,
      suhu: 0,
      sistole: 0,
      diastole: 0,
      pernapasan: 0
    },

    adaTdk: ['Ada', 'Tidak Ada'],
    alergis: ['Obat', 'Makanan', 'Udara', 'Lain-lain', 'Tidak Ada Alergi']
  }),
  getters: {
    doubleCount: (state) => state.counter * 2
  },
  actions: {
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
    }
  }
})
