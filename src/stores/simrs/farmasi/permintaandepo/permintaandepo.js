import { defineStore } from 'pinia'
import { date } from 'quasar'

export const useFarmasiPermintaanDepoStore = defineStore('fermasi_permintaan_depo', {
  state: () => ({
    loading: false,
    loadingKunci: false,
    loadingObat: false,
    form: {
      tanggal: date.formatDate(Date.now(), 'DD MMMM YYYY'),
      konsinyasi: 'non-konsinyasi'
    },
    disp: {
      tanggal: date.formatDate(Date.now(), 'DD MMMM YYYY')
    },
    floor: [ // racikan
      { kode: 'Gd-03010101' },
      { kode: 'Gd-04010101' }
    ],
    gudangs: [
      { nama: 'Gudang Farmasi ( Kamar Obat )', value: 'Gd-05010100' },
      { nama: 'Gudang Farmasi (Floor Stok)', value: 'Gd-03010100' }
    ],
    obats: [
      {
        id: 20,
        kd_obat: '0000037-FAR',
        nama_obat: 'DIGOXIN 0,25 MG/ML 2 ML INJEKSI',
        merk: 'MEPROFARM',
        kandungan: 'Digoksin',
        jenis_perbekalan: 'Obat',
        bentuk_sediaan: 'INJEKSI',
        kode108: '1.1.7.01.04.01.001',
        uraian108: 'Obat Cair',
        kode50: '5.1.02.01.01.037',
        uraian50: 'BELANJA OBAT-OBATAN',
        satuan_b: 'Box',
        satuan_k: 'AMPUL',
        kelompok_psikotropika: '0',
        kelompok_penyimpanan: 'INJEKSI',
        kelompok_rko: 'Digoksin inj 0,25 mg/ml',
        status_generik: '1',
        status_forkid: '1',
        status_fornas: '1',
        kekuatan_dosis: '0,25 MG/ML',
        volumesediaan: '2 ML',
        kelas_terapi: '',
        nilai_kdn: 37.05,
        sertifikatkdn: '4956/SJ-IND.8/TKDN/10/2022',
        sistembayar: 'SEMUA',
        updated_at: '2023-09-06 10:41:37',
        created_at: '2023-09-04 15:16:56',
        deleted_at: null,
        stok: 20
      },
      {
        id: 21,
        kd_obat: '0000038-FAR',
        nama_obat: 'ENOXRIN 4000 INJEKSI',
        merk: 'LAPI LABORATORIES',
        kandungan: 'Enoksaparin sodium',
        jenis_perbekalan: 'Obat',
        bentuk_sediaan: 'INJEKSI',
        kode108: '1.1.7.01.04.01.001',
        uraian108: 'Obat Cair',
        kode50: '5.1.02.01.01.037',
        uraian50: 'BELANJA OBAT-OBATAN',
        satuan_b: 'Box',
        satuan_k: 'Prefilled Syringe',
        kelompok_psikotropika: '0',
        kelompok_penyimpanan: 'INJEKSI',
        kelompok_rko: 'Enoksaparin sodium inj 40 mg/0,4 ml',
        status_generik: '0',
        status_forkid: '1',
        status_fornas: '1',
        kekuatan_dosis: '10000 IU/ML',
        volumesediaan: '0,4 ML',
        kelas_terapi: '',
        nilai_kdn: 0.00,
        sertifikatkdn: 'IMPORT',
        sistembayar: 'SEMUA',
        updated_at: '2023-09-05 05:33:56',
        created_at: '2023-09-05 05:33:56',
        deleted_at: null,
        stok: 10
      }

    ]
  }),
  actions: {
    setForm(key, val) {
      this.form[key] = val
    },
    setDisp(key, val) {
      this.disp[key] = val
    },
    obatSelected(val) {
      this.setForm('kdobat', val)
      console.log('obat ', val)
      const anu = this.obats.filter(a => a.kd_obat === val)
      if (anu.length) {
        const obat = anu[0]
        console.log('obat ketemu', obat)
        // this.setForm()
      }
    },
    clearObat(val) {
      this.setForm('kdobat', null)
    },
    cariObat(val) {
      console.log('cari obat ', val)
    },
    getInitialData() {},
    selesaiDanKunci() {}
  }
})
