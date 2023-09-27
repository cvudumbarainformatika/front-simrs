import { defineStore } from 'pinia'
import { date } from 'quasar'
import { api } from 'src/boot/axios'
import { notifErrVue } from 'src/modules/utils'
// import { notifErrVue, notifSuccess } from 'src/modules/utils'
// import { useListPermintaanRuanganStore } from './listpermintaan'

export const useFarmasiPermintaanRuanganStore = defineStore('fermasi_permintaan_ruangan', {
  state: () => ({
    loading: false,
    loadingKunci: false,
    loadingObat: false,
    loadingMax: false,
    params: {
      kdgudang: '',
      kddepo: '',
      nama_obat: ''
    },
    form: {
      tgl_permintaan: date.formatDate(Date.now(), 'YYYY-MM-DD'),
      status_obat: 'non-konsinyasi',
      no_permintaan: '',
      dari: '',
      tujuan: ''
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
      { nama: 'Floor Stock 2 (Obat)', value: 'Gd-04010101' }
      // { nama: 'Depo Rawat inap', value: 'Gd-04010102' },
      // { nama: 'Depo OK', value: 'Gd-04010103' },
      // { nama: 'Depo Rawat Jalan', value: 'Gd-05010101' }
    ],
    stokDewe: [],
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
      // {
      //   id: 1,
      //   no_permintaan: 'dasda',
      //   kdobat: '0000037-FAR',
      //   nama_obat: 'nama',
      //   stok_alokasi: 10,
      //   mak_stok: 20,
      //   jumlah_minta: 10,
      //   status_obat: '1'
      // },
      // {
      //   id: 1,
      //   no_permintaan: 'dasda',
      //   kdobat: '0000038-FAR',
      //   nama_obat: 'nama',
      //   stok_alokasi: 10,
      //   mak_stok: 20,
      //   jumlah_minta: 10,
      //   status_obat: '1'
      // },
      // {
      //   id: 1,
      //   no_permintaan: 'dasda',
      //   kdobat: '0000039-FAR',
      //   nama_obat: 'nama',
      //   stok_alokasi: 10,
      //   mak_stok: 20,
      //   jumlah_minta: 10,
      //   status_obat: '1'
      // }
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
      this.setForm('jumlah_minta', 0)
      console.log('obat ', val)
      const anu = this.obats.filter(a => a.kd_obat === val)
      if (anu.length) {
        const obat = anu[0]
        console.log('obat ketemu', obat)
        this.setForm('stok_alokasi', obat.stokalokasi)
        console.log('form', this.form)
        if (this.form.dari) {
          const aMax = obat.minmax.filter(a => a.kd_obat === val && a.kd_ruang === this.form.dari)
          if (aMax.length) {
            const max = aMax[0]
            this.setForm('mak_stok', max.max)
          } else {
            this.setForm('mak_stok', null)
          }
        }
      }
      if (this.form.dari) {
        const dar = this.stokDewe.filter(a => a.kdobat === val && a.kdruang === this.form.dari)
        if (dar.length) {
          const stok = dar[0]
          this.setForm('stok', stok.jumlah)
        } else {
          this.setForm('stok', 0)
        }
      } else {
        notifErrVue('Depo belum dipilih')
      }
    },
    clearObat() {
      this.setForm('kdobat', null)
      this.setForm('stok_alokasi', 0)
      this.setForm('mak_stok', 0)
      this.setForm('jumlah_minta', 0)
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
      // this.getListObat()
    },
    selesaiDanKunci(val) {
      this.kunci(this.form.no_permintaan)
    },
    kunci(val) {
      console.log('kuinci', val)
      // const data = {
      //   no_permintaan: val
      // }
      // this.loadingKunci = true
      // return new Promise(resolve => {
      //   api.post('v1/simrs/farmasinew/depo/kuncipermintaan', data)
      //     .then(resp => {
      //       this.loadingKunci = false
      //       console.log('kunci permintaan ', resp)
      //       notifSuccess(resp)
      //       const list = useListPermintaanRuanganStore()
      //       list.ambilPermintaan()
      //       this.details = []
      //       resolve(resp)
      //     })
      //     .catch(() => { this.loadingKunci = false })
      // })
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
            if (resp.data.stokdewe) {
              this.stokDewe = resp.data.stokdewe
            }
            resolve(resp)
          }).catch(() => {
            this.loadingObat = false
          })
      })
    },
    simpan() {
      console.log('simpan', this.form)
      // this.loading = true
      // return new Promise(resolve => {
      //   api.post('v1/simrs/farmasinew/depo/simpanpermintaandepo', this.form)
      //     .then(resp => {
      //       this.loading = false
      //       console.log('simpan permintaan depo', resp.data)

      //       if (resp.data.notrans) {
      //         this.setForm('no_permintaan', resp.data.notrans)
      //       }
      //       if (resp.data.rinci) {
      //         const rinc = resp.data.rinci
      //         if (rinc.kdobat) {
      //           const anu = this.obats.filter(a => a.kd_obat === rinc.kdobat)
      //           if (anu.length) {
      //             const obat = anu[0]
      //             rinc.nama_obat = obat.nama_obat
      //           }
      //           this.details.push(rinc)
      //         }
      //       }
      //       this.clearObat()
      //       resolve(resp)
      //     })
      //     .catch(() => { this.loading = false })
      // })
    },
    simpanMintaMax(val) {
      console.log('simpan minta', val)
      // this.loadingMax = true
      // return new Promise(resolve => {
      //   api.post('v1/simrs/farmasinew/simpanminta', val)
      //     .then(resp => {
      //       this.loadingMax = false
      //       console.log('max', resp.data)
      //       notifSuccess(resp)
      //       resolve(resp)
      //     }).catch(() => { this.loadingMax = false })
      // })
    }
  }
})
