import { defineStore } from 'pinia'
// import { api } from 'boot/axios'
// import { dateDbFormat } from 'src/modules/formatter'
// import { date } from 'quasar'

export const useBuatSepRanapStore = defineStore('buat-sep-ranap', {
  state: () => ({
    t_sep: {
      noKartu: '0001112230666',
      tglSep: '2017-10-18',
      ppkPelayanan: '0301R001',
      jnsPelayanan: '2',
      klsRawat: '3',
      noMR: '123456',
      rujukan: {
        asalRujukan: '1',
        tglRujukan: '2017-10-17',
        noRujukan: '1234567',
        ppkRujukan: '00010001'
      },
      catatan: 'test',
      diagAwal: 'A00.1',
      poli: {
        tujuan: 'INT',
        eksekutif: '0'
      },
      cob: {
        cob: '0'
      },
      katarak: {
        katarak: '0'
      },
      jaminan: {
        lakaLantas: '0',
        penjamin: {
          penjamin: '1',
          tglKejadian: '2018-08-06',
          keterangan: 'kll',
          suplesi: {
            suplesi: '0',
            noSepSuplesi: '0301R0010718V000001',
            lokasiLaka: {
              kdPropinsi: '03',
              kdKabupaten: '0050',
              kdKecamatan: '0574'
            }
          }
        }
      },
      skdp: {
        noSurat: '000002',
        kodeDPJP: '31661'
      },
      noTelp: '081919999',
      user: 'Coba Ws'
    }
  }),
  getters: {
    // doubleCount: (state) => state.counter * 2
  },
  actions: {

  }
})
