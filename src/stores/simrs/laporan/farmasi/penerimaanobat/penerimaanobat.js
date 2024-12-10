import { defineStore } from 'pinia'
import { date } from 'quasar'
import { api } from 'src/boot/axios'

export const useLaporanPenerimaanObatStore = defineStore('laporan_pemakaian_obat', {
  state: () => ({
    loading: false,
    loadingDownload: true,
    items: [],
    pihakTigas: [],
    meta: {},
    detail: [],
    kolom: ['NoPenerimaan', 'NoPemesanan', 'Jenis Penerimaan', 'Gudang', 'TglPenerimaan', 'TglSurat', 'BatasBayar', 'NoSurat', 'JenisSurat', 'NoFaktur', 'Suplier', 'Total'],
    totalall: 0,
    tanggal: {
      from: date.formatDate(Date.now(), 'DD MMMM YYYY'),
      to: date.formatDate(Date.now(), 'DD MMMM YYYY')
    },
    params: {
      tgldari: date.formatDate(Date.now(), 'YYYY-MM-DD'),
      tglsampai: date.formatDate(Date.now(), 'YYYY-MM-DD'),
      jenisreport: '1',
      gudang: 'Semua Gudang',
      jenispenerimaan: 'Semua Penerimaan',
      pihakketiga: 'Semua PBF'
      // ruangan: ''
    }
  }),
  actions: {
    async getPihakKetiga () {
      return new Promise(resolve => {
        api.get('v1/transaksi/belanja_ls/perusahaan')
          .then(resp => {
            console.log('pihak tiga', resp.data)
            this.pihakTigas = resp.data
            resolve(resp)
          })
      })
    },
    async initAmbilData () {
      this.laporanRekapPenerimaanObat()
    },
    async laporanRekapPenerimaanObat () {
      this.loading = true
      this.kolom = ['NoPenerimaan', 'NoPemesanan', 'JenisPenerimaan', 'Gudang', 'TglPenerimaan', 'TglSurat', 'BatasBayar', 'NoSurat', 'JenisSurat', 'Suplier', 'Total']
      const params = { params: this.params }
      await api.get('v1/simrs/laporan/farmasi/hutang/caripenerimaanobat', params)
        .then((resp) => {
          if (resp.status === 200) {
            const datahasil = resp?.data
            this.sethasil(datahasil)
            this.loading = false
          }
        })
        .catch((err) => {
          console.log(err)
          this.loading = false
        })
    },
    sethasil (val) {
      const hasilglobal = []
      val.forEach(x => {
        const hasil = {
          NoPenerimaan: x?.nopenerimaan,
          NoPemesanan: x?.nopemesanan,
          JenisPenerimaan: x?.jenis_penerimaan,
          Gudang: x?.gudang?.nama,
          TglPenerimaan: x?.tglpenerimaan,
          TglSurat: x?.tglsurat,
          BatasBayar: x?.batasbayar ?? '-',
          NoSurat: x?.nomorsurat,
          JenisSurat: x?.jenissurat,
          Suplier: x?.pihakketiga?.nama,
          Total: x?.total_faktur_pbf
        }
        hasilglobal.push(hasil)
      })
      this.items = hasilglobal.sort(({ tglpenerimaan: a }, { tglpenerimaan: b }) => b - a)
      this.totalall = this.items.reduce((a, b) => parseFloat(a) + parseFloat(b.Total), 0)
    }
  }
})
