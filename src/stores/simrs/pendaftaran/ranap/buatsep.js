import { defineStore } from 'pinia'
// import { api } from 'boot/axios'
// import { dateDbFormat } from 'src/modules/formatter'
// import { date } from 'quasar'

export const useBuatSepRanapStore = defineStore('buat-sep-ranap', {
  state: () => ({
    t_sep: {
      noKartu: '',
      tglSep: '',
      ppkPelayanan: '',
      jnsPelayanan: '',
      klsRawat: '',
      noMR: '',
      rujukan: {
        asalRujukan: '',
        tglRujukan: '',
        noRujukan: '',
        ppkRujukan: ''
      },
      catatan: '',
      diagAwal: '',
      poli: {
        tujuan: '',
        eksekutif: ''
      },
      cob: {
        cob: ''
      },
      katarak: {
        katarak: ''
      },
      jaminan: {
        lakaLantas: '',
        penjamin: {
          penjamin: '',
          tglKejadian: '',
          keterangan: '',
          suplesi: {
            suplesi: '',
            noSepSuplesi: '',
            lokasiLaka: {
              kdPropinsi: '',
              kdKabupaten: '',
              kdKecamatan: ''
            }
          }
        }
      },
      skdp: {
        noSurat: '',
        kodeDPJP: ''
      },
      noTelp: '',
      user: ''
    },

    loading: false,
    errors: [],
    jnsPelayanans: [
      { label: 'Rawat Inap', value: '1' },
      { label: 'Rawat Jalan', value: '2' }
    ],
    klsRawats: [
      { label: 'Kelas 1', value: '1' },
      { label: 'Kelas 2', value: '2' },
      { label: 'Kelas 3', value: '3' }
    ],
    asalRujukans: [
      { label: 'Faskes 1', value: '1' },
      { label: 'Faskes 2(Rs)', value: '2' }
    ],
    eksekutifs: [
      { label: 'Tidak', value: '0' },
      { label: 'Ya', value: '1' }
    ],
    cobs: [
      { label: 'Tidak', value: '0' },
      { label: 'Ya', value: '1' }
    ],
    kataraks: [
      { label: 'Tidak', value: '0' },
      { label: 'Ya', value: '1' }
    ],
    lakaLantas: [
      { label: 'Tidak', value: '0' },
      { label: 'Ya', value: '1' }
    ],
    penjamins: [
      { label: 'Jasa Raharja PT', value: '1' },
      { label: 'BPJS Ketenagakerjaan', value: '2' },
      { label: 'Taspen PT', value: '3' },
      { label: 'ASABRI PT', value: '4' }
    ],
    suplesis: [
      { label: 'Tidak', value: '0' },
      { label: 'Ya', value: '1' }
    ]
  }),
  getters: {
    // doubleCount: (state) => state.counter * 2
  },
  actions: {
    updateForm (pasien) {
      console.log('from RS', pasien)

      this.t_sep.noKartu = pasien.noKartu
    }
  }
})
