import { defineStore } from 'pinia'
import { date } from 'quasar'
import { api } from 'src/boot/axios'
import { notifErrVue, notifSuccess } from 'src/modules/utils'
import { useListPermintaanStore } from './listpermintaan'

export const useFarmasiPermintaanDepoStore = defineStore('fermasi_permintaan_depo', {
  state: () => ({
    loading: false,
    loadingKunci: false,
    loadingObat: false,
    params: {
      kdgudang: '',
      kddepo: '',
      nama_obat: ''
    },
    form: {
      tgl_permintaan: date.formatDate(Date.now(), 'DD MMMM YYYY'),
      konsinyasi: 'non-konsinyasi'
    },
    disp: {
      tgl_permintaan: date.formatDate(Date.now(), 'DD MMMM YYYY')
    },
    floor: [ // racikan
      { kode: 'Gd-03010101' },
      { kode: 'Gd-04010101' }
    ],
    gudangs: [
      { nama: 'Gudang Farmasi ( Kamar Obat )', value: 'Gd-05010100' },
      { nama: 'Gudang Farmasi (Floor Stok)', value: 'Gd-03010100' }
    ],
    depos: [
      { nama: 'Floor Stock 1 (AKHP)', value: 'Gd-03010101' },
      { nama: 'Floor Stock 2 (Obat)', value: 'Gd-04010101' },
      { nama: 'Depo Rawat inap', value: 'Gd-04010102' },
      { nama: 'Depo OK', value: 'Gd-04010103' },
      { nama: 'Depo Rawat Jalan', value: 'Gd-05010101' }
    ],
    obats: [
      // {
      //   id: 20,
      //   kd_obat: '0000037-FAR',
      //   nama_obat: 'DIGOXIN 0,25 MG/ML 2 ML INJEKSI',
      //   merk: 'MEPROFARM',
      //   kandungan: 'Digoksin',
      //   jenis_perbekalan: 'Obat',
      //   bentuk_sediaan: 'INJEKSI',
      //   kode108: '1.1.7.01.04.01.001',
      //   uraian108: 'Obat Cair',
      //   kode50: '5.1.02.01.01.037',
      //   uraian50: 'BELANJA OBAT-OBATAN',
      //   satuan_b: 'Box',
      //   satuan_k: 'AMPUL',
      //   kelompok_psikotropika: '0',
      //   kelompok_penyimpanan: 'INJEKSI',
      //   kelompok_rko: 'Digoksin inj 0,25 mg/ml',
      //   status_generik: '1',
      //   status_forkid: '1',
      //   status_fornas: '1',
      //   kekuatan_dosis: '0,25 MG/ML',
      //   volumesediaan: '2 ML',
      //   kelas_terapi: '',
      //   nilai_kdn: 37.05,
      //   sertifikatkdn: '4956/SJ-IND.8/TKDN/10/2022',
      //   sistembayar: 'SEMUA',
      //   updated_at: '2023-09-06 10:41:37',
      //   created_at: '2023-09-04 15:16:56',
      //   deleted_at: null,
      //   stok: 20
      // },
      // {
      //   id: 21,
      //   kd_obat: '0000038-FAR',
      //   nama_obat: 'ENOXRIN 4000 INJEKSI',
      //   merk: 'LAPI LABORATORIES',
      //   kandungan: 'Enoksaparin sodium',
      //   jenis_perbekalan: 'Obat',
      //   bentuk_sediaan: 'INJEKSI',
      //   kode108: '1.1.7.01.04.01.001',
      //   uraian108: 'Obat Cair',
      //   kode50: '5.1.02.01.01.037',
      //   uraian50: 'BELANJA OBAT-OBATAN',
      //   satuan_b: 'Box',
      //   satuan_k: 'Prefilled Syringe',
      //   kelompok_psikotropika: '0',
      //   kelompok_penyimpanan: 'INJEKSI',
      //   kelompok_rko: 'Enoksaparin sodium inj 40 mg/0,4 ml',
      //   status_generik: '0',
      //   status_forkid: '1',
      //   status_fornas: '1',
      //   kekuatan_dosis: '10000 IU/ML',
      //   volumesediaan: '0,4 ML',
      //   kelas_terapi: '',
      //   nilai_kdn: 0.00,
      //   sertifikatkdn: 'IMPORT',
      //   sistembayar: 'SEMUA',
      //   updated_at: '2023-09-05 05:33:56',
      //   created_at: '2023-09-05 05:33:56',
      //   deleted_at: null,
      //   stok: 10
      // }

    ],
    details: [
      {
        id: 1,
        no_permintaan: 'dasda',
        kdobat: '0000037-FAR',
        stok_alokasi: 10,
        mak_stok: 20,
        jumlah_minta: 10,
        status_obat: '1'
      },
      {
        id: 1,
        no_permintaan: 'dasda',
        kdobat: '0000038-FAR',
        stok_alokasi: 10,
        mak_stok: 20,
        jumlah_minta: 10,
        status_obat: '1'
      },
      {
        id: 1,
        no_permintaan: 'dasda',
        kdobat: '0000039-FAR',
        stok_alokasi: 10,
        mak_stok: 20,
        jumlah_minta: 10,
        status_obat: '1'
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
    setParam(key, val) {
      this.params[key] = val
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
      this.setParam('nama_obat', val)
      if (this.params.kdgudang) {
        this.getListObat()
      } else {
        notifErrVue('gudang belum dipilih')
      }
    },
    getInitialData() {
      this.getListObat()
    },
    selesaiDanKunci(val) {
      this.kunci(this.form.no_permintaan)
    },
    kunci(val) {
      const data = {
        no_permintaan: val
      }
      this.loadingKunci = true
      return new Promise(resolve => {
        api.post('v1/simrs/farmasinew/penerimaan/kuncipenerimaan', data)
          .then(resp => {
            this.loadingKunci = false
            console.log('kunci penerimaan ', resp)
            notifSuccess(resp)
            const list = useListPermintaanStore()
            list.ambilPermintaan()
            resolve(resp)
          })
          .catch(() => { this.loadingKunci = false })
      })
    },
    getListObat() {
      this.loadingObat = true
      const param = { params: this.params }
      return new Promise(resolve => {
        api.get('v1/simrs/farmasinew/depo/lihatstokgudang', param)
          .then(resp => {
            this.loadingObat = false
            console.log('stok gudang', resp)
            if (resp.data.obat) {
              this.obats = resp.data.obat
            }
            resolve(resp)
          }).catch(() => {
            this.loadingObat = false
          })
      })
    }
  }
})
