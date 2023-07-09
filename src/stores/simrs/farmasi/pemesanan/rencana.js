import { defineStore } from 'pinia'
import { date } from 'quasar'

export const useRencanaPemesananObatStore = defineStore('store_rencana_pemesanan_obat', {
  state: () => ({
    loading: false,
    items: [],
    form: {
      tanggal: date.formatDate(Date.now(), 'YYYY-MM-DD')
    },
    disp: {
      tanggal: date.formatDate(Date.now(), 'DD MMMM YYYY')
    },
    columns: [],
    columnHide: ['id', 'created_at', 'updated_at', 'deleted_at'],
    obats: [
      {
        id: 1,
        anu: '00001-FAR',
        anu1: 'obat anu 24 MG 10 ML KAPSUL',
        anu2: 'sanbal',
        anu3: 'allopurinol',
        anu4: 'BMHP',
        anu5: 'KAPSUL',
        anu6: '1.1.7.01.04.01.001',
        anu7: 'Obat Cair',
        anu8: '5.1.02.01.01.037',
        anu9: 'BELANJA OBAT-OBATAN',
        anu10: 'sch',
        anu11: 'Papan',
        anu12: '0',
        anu13: 'Rak dalam',
        anu14: 'Albumin serum normal (human albumin) inj 20% 100 ml',
        anu15: '0',
        anu16: '1',
        anu17: '1',
        anu18: '24 MG',
        anu19: '10 ML',
        anu20: 'kellas bulu',
        anu21: 12312.00,
        anu22: 'asdasdas',
        anu23: 'UMUM',
        anu24: '2023-06-25 10:16:22',
        anu25: '2023-06-24 02:38:43',
        anu26: null
      },
      {
        id: 2,
        anu: '00007-FAR',
        anu1: 'wew 24 MG 120 PUFF LARUTAN sanpo',
        anu2: 'sanpo',
        anu3: 'Akarbose',
        anu4: 'Alkes Habis Pakai',
        anu5: 'LARUTAN',
        anu6: '1.1.7.01.04.01.002',
        anu7: 'Obat Padat',
        anu8: '5.1.02.01.01.037',
        anu9: 'BELANJA OBAT-OBATAN',
        anu10: 'Gelas',
        anu11: 'belum ada satuan',
        anu12: '0',
        anu13: 'Salep-salepan',
        anu14: 'Albumin serum normal (human albumin) inj 20% 100 ml',
        anu15: '0',
        anu16: '1',
        anu17: '1',
        anu18: '24 MG',
        anu19: '120 PUFF',
        anu20: 'kelas anu',
        anu21: 0.00,
        anu22: 'ddddd',
        anu23: 'SEMUA',
        anu24: '2023-06-25 10:16:09',
        anu25: '2023-06-24 16:50:16',
        anu26: null
      },
      {
        id: 3,
        anu: '00008-FAR',
        anu1: 'wew 250 MG 5 GRAM TABLET',
        anu2: 'kalbe',
        anu3: 'Akarbose',
        anu4: 'Obat',
        anu5: 'TABLET',
        anu6: '1.1.7.01.04.01.002',
        anu7: 'Obat Padat',
        anu8: '5.1.02.01.01.037',
        anu9: 'BELANJA OBAT-OBATAN',
        anu10: 'Gelas',
        anu11: 'cup',
        anu12: '1',
        anu13: 'Rak dalam',
        anu14: 'Albendazol tab 400 mg',
        anu15: '1',
        anu16: '1',
        anu17: '1',
        anu18: '250 MG',
        anu19: '5 GRAM',
        anu20: 'kelas anak',
        anu21: 0.00,
        anu22: 'ddddd',
        anu23: 'BPJS',
        anu24: '2023-06-25 10:15:57',
        anu25: '2023-06-24 16:51:15',
        anu26: null
      },
      {
        id: 4,
        anu: '00009-FAR',
        anu1: 'wewea wew 20 MG 15 GRAM LARUTAN Mercon',
        anu2: 'Mercon',
        anu3: 'aminophilin',
        anu4: 'Reagen',
        anu5: 'LARUTAN',
        anu6: '1.1.7.01.04.01.001',
        anu7: 'Obat Cair',
        anu8: '5.1.02.01.01.037',
        anu9: 'BELANJA OBAT-OBATAN',
        anu10: 'jrigen',
        anu11: 'Tube',
        anu12: '1',
        anu13: 'Rak dalam',
        anu14: 'Albendazol tab 400 mg',
        anu15: '1',
        anu16: '1',
        anu17: '1',
        anu18: '20 MG',
        anu19: '15 GRAM',
        anu20: 'kelas anak',
        anu21: 0.00,
        anu22: 'ddddd',
        anu23: 'SEMUA',
        anu24: '2023-06-26 07:35:42',
        anu25: '2023-06-24 17:04:10',
        anu26: null
      },
      {
        id: 5,
        anu: '00010-FAR',
        anu1: 'coab baru 400 MG 5 GRAM TABLET',
        anu2: 'Mercon',
        anu3: 'amidaron',
        anu4: 'Obat',
        anu5: 'TABLET',
        anu6: '1.1.7.01.04.01.002',
        anu7: 'Obat Padat',
        anu8: '5.1.02.01.01.037',
        anu9: 'BELANJA OBAT-OBATAN',
        anu10: 'belum ada satuan',
        anu11: 'sch',
        anu12: '0',
        anu13: 'Rak dalam',
        anu14: 'Albendazol susp 200 mg/5 ml',
        anu15: '0',
        anu16: '0',
        anu17: '0',
        anu18: '400 MG',
        anu19: '5 GRAM',
        anu20: 'KElas berat',
        anu21: 34234.00,
        anu22: 'dsadas',
        anu23: 'UMUM',
        anu24: '2023-06-26 07:37:03',
        anu25: '2023-06-26 07:37:03',
        anu26: null
      },
      {
        id: 6,
        anu: '00012-FAR',
        anu1: 'VACUM BLOOD COCTION TUBE CLOT AKTIVATOR 2 MG 3 ML LARUTAN ARKAN',
        anu2: 'ARKAN',
        anu3: 'Abakavir',
        anu4: 'Alkes Habis Pakai',
        anu5: 'LARUTAN',
        anu6: '1.1.7.01.06.01.003',
        anu7: 'PERSEDIAAN UNTUK TUJUAN STRATEGI BERJAGA-JAGA',
        anu8: '5.1.02.01.01.042',
        anu9: 'PERSEDIAAN UNTUK TUJUAN STRATEGI BERJAGA-JAGA',
        anu10: 'Box',
        anu11: 'Pcs',
        anu12: '1',
        anu13: 'RAK ALKES',
        anu14: 'Albumin serum normal (human albumin) inj 20% 100 ml',
        anu15: '1',
        anu16: '1',
        anu17: '1',
        anu18: '2 MG',
        anu19: '3 ML',
        anu20: 'Kelas ringan',
        anu21: 90.00,
        anu22: '909',
        anu23: 'SEMUA',
        anu24: '2023-06-27 09:12:39',
        anu25: '2023-06-27 09:11:51',
        anu26: null
      },
      {
        id: 7,
        anu: '00013-FAR',
        anu1: 'Wew asdas TABLET',
        anu2: '',
        anu3: '',
        anu4: '',
        anu5: 'TABLET',
        anu6: '',
        anu7: '',
        anu8: '',
        anu9: '',
        anu10: '',
        anu11: '',
        anu12: '',
        anu13: '',
        anu14: '',
        anu15: '',
        anu16: '',
        anu17: '',
        anu18: '',
        anu19: '',
        anu20: '',
        anu21: 0.00,
        anu22: '',
        anu23: '',
        anu24: '2023-06-27 10:11:10',
        anu25: '2023-06-27 10:11:10',
        anu26: null
      },
      {
        id: 8,
        anu: '00014-FAR',
        anu1: 'KLINDAMISIN  150 MG KAPSUL',
        anu2: 'DEXA MEDICA',
        anu3: 'Klindamisin',
        anu4: 'Obat',
        anu5: 'KAPSUL',
        anu6: '1.1.7.01.04.01.002',
        anu7: 'Obat Padat',
        anu8: '5.1.02.01.01.037',
        anu9: 'BELANJA OBAT-OBATAN',
        anu10: 'Box',
        anu11: 'Kapsul',
        anu12: '0',
        anu13: 'RAK TABLET',
        anu14: 'Klindamisin kaps 150 mg',
        anu15: '1',
        anu16: '1',
        anu17: '1',
        anu18: '150 MG',
        anu19: '-',
        anu20: 'Antibiotik',
        anu21: 33.30,
        anu22: '4468/SJ-IND.8/TKDN/9/2022',
        anu23: 'SEMUA',
        anu24: '2023-06-27 16:45:28',
        anu25: '2023-06-27 16:45:28',
        anu26: null
      },
      {
        id: 9,
        anu: '00017-FAR',
        anu1: 'Obat baru saja 50 MG 1 GRAM LARUTAN',
        anu2: 'sanbal',
        anu3: 'ampicillin',
        anu4: 'Obat',
        anu5: 'LARUTAN',
        anu6: '1.1.7.01.04.01.001',
        anu7: 'Obat Cair',
        anu8: '5.1.02.01.01.037',
        anu9: 'BELANJA OBAT-OBATAN',
        anu10: 'Sisir',
        anu11: 'sch',
        anu12: '0',
        anu13: 'RAK TABLET',
        anu14: 'Albumin serum normal (human albumin) inj 20% 100 ml',
        anu15: '1',
        anu16: '1',
        anu17: '1',
        anu18: '50 MG',
        anu19: '1 GRAM',
        anu20: 'KElas berat',
        anu21: 13.00,
        anu22: 'sfsads',
        anu23: 'SEMUA',
        anu24: '2023-07-03 03:24:21',
        anu25: '2023-07-03 03:24:21',
        anu26: null
      },
      {
        id: 10,
        anu: '00020-FAR',
        anu1: 'anu',
        anu2: '',
        anu3: '',
        anu4: 'Obat',
        anu5: '',
        anu6: '',
        anu7: '',
        anu8: '',
        anu9: '',
        anu10: '',
        anu11: '',
        anu12: '',
        anu13: '',
        anu14: '',
        anu15: '',
        anu16: '',
        anu17: '',
        anu18: '',
        anu19: '',
        anu20: '',
        anu21: 0.00,
        anu22: '',
        anu23: '',
        anu24: '2023-07-03 14:36:58',
        anu25: '2023-07-03 14:36:58',
        anu26: null
      },
      {
        id: 11,
        anu: '00022-FAR',
        anu1: 'obat',
        anu2: '',
        anu3: '',
        anu4: '',
        anu5: '',
        anu6: '',
        anu7: '',
        anu8: '',
        anu9: '',
        anu10: '',
        anu11: '',
        anu12: '',
        anu13: '',
        anu14: '',
        anu15: '',
        anu16: '',
        anu17: '',
        anu18: '',
        anu19: '',
        anu20: '',
        anu21: 0.00,
        anu22: '',
        anu23: '',
        anu24: '2023-07-03 14:37:54',
        anu25: '2023-07-03 14:37:54',
        anu26: null
      },
      {
        id: 12,
        anu: '00024-FAR',
        anu1: 'terapi',
        anu2: '',
        anu3: '',
        anu4: '',
        anu5: '',
        anu6: '',
        anu7: '',
        anu8: '',
        anu9: '',
        anu10: '',
        anu11: '',
        anu12: '',
        anu13: '',
        anu14: '',
        anu15: '',
        anu16: '',
        anu17: '',
        anu18: '',
        anu19: '',
        anu20: '',
        anu21: 0.00,
        anu22: '',
        anu23: '',
        anu24: '2023-07-04 11:02:14',
        anu25: '2023-07-04 11:02:14',
        anu26: null
      },
      {
        id: 13,
        anu: '00026-FAR',
        anu1: 'anu',
        anu2: '',
        anu3: '',
        anu4: '',
        anu5: '',
        anu6: '',
        anu7: '',
        anu8: '',
        anu9: '',
        anu10: '',
        anu11: '',
        anu12: '',
        anu13: '',
        anu14: '',
        anu15: '',
        anu16: '',
        anu17: '',
        anu18: '',
        anu19: '',
        anu20: '',
        anu21: 0.00,
        anu22: '',
        anu23: '',
        anu24: '2023-07-04 11:05:55',
        anu25: '2023-07-04 11:05:55',
        anu26: null
      },
      {
        id: 14,
        anu: '00028-FAR',
        anu1: 'sada',
        anu2: '',
        anu3: '',
        anu4: '',
        anu5: '',
        anu6: '',
        anu7: '',
        anu8: '',
        anu9: '',
        anu10: '',
        anu11: '',
        anu12: '',
        anu13: '',
        anu14: '',
        anu15: '',
        anu16: '',
        anu17: '',
        anu18: '',
        anu19: '',
        anu20: '',
        anu21: 0.00,
        anu22: '',
        anu23: '',
        anu24: '2023-07-03 00:08:12',
        anu25: '2023-07-03 00:08:12',
        anu26: null
      },
      {
        id: 15,
        anu: '00029-FAR',
        anu1: 'Klindamisin 150 MG KAPSUL',
        anu2: 'Contoh',
        anu3: 'Klindamisin',
        anu4: 'Obat',
        anu5: 'KAPSUL',
        anu6: '1.1.7.01.04.01.002',
        anu7: 'Obat Padat',
        anu8: '5.1.02.01.01.037',
        anu9: 'BELANJA OBAT-OBATAN',
        anu10: 'Box',
        anu11: 'Kapsul',
        anu12: '0',
        anu13: 'RAK TABLET',
        anu14: 'Klindamisin kaps 150 mg',
        anu15: '1',
        anu16: '1',
        anu17: '1',
        anu18: '150 MG',
        anu19: '',
        anu20: '',
        anu21: 3.00,
        anu22: '',
        anu23: 'SEMUA',
        anu24: '2023-07-05 14:42:16',
        anu25: '2023-07-05 14:42:16',
        anu26: null
      }
    ],
    stoksGudangs: [],
    stoksRSes: [],
    stoksMaksRs: 0
  }),
  actions: {
    setForm(key, val) {
      this.form[key] = val
    }
  }
})