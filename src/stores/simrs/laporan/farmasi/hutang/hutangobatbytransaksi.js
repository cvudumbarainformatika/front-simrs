import { defineStore } from 'pinia'
import { date } from 'quasar'
import { api } from 'src/boot/axios'

export const useHutangObatByTransaksi = defineStore('laporan_hutang_obat_by_transaksi', {
  state: () => ({
    loading: false,
    items: [],
    detail: [],
    meta: {},
    totalall: 0,
    kolom: ['NoPenerimaan', 'TglPenerimaan', 'Suplier', 'NoDokumen', 'JenisDokumen', 'TglSurat', 'TglJatuhTempo', 'Total'],
    tanggal: {
      from: date.formatDate(Date.now(), 'DD MMMM YYYY'),
      to: date.formatDate(Date.now(), 'DD MMMM YYYY')
    },
    params: {
      tgldari: date.formatDate(Date.now(), 'YYYY-MM-DD'),
      tglsampai: date.formatDate(Date.now(), 'YYYY-MM-DD'),
      jenisreport: '4'
      // ruangan: ''
    }
  }),
  actions: {
    async initAmbilData () {
      this.laporanobatbytransaksi()
    },
    async laporanobatbytransaksi () {
      this.loading = true
      this.kolom = ['NoPenerimaan', 'TglPenerimaan', 'Suplier', 'NoDokumen', 'JenisDokumen', 'TglSurat', 'TglJatuhTempo', 'Total']
      const params = { params: this.params }
      await api.get('v1/simrs/laporan/farmasi/hutang/reportHutangByTransaksi', params)
        .then((resp) => {
          if (resp.status === 200) {
            const datahasil = resp?.data
            this.sethasil(datahasil)
          }
        })
        .catch((err) => {
          console.log(err)
          this.loading = false
        })
    },
    async sethasil (val) {
      console.log('asli', val)
      const hasilglobal = []
      val.forEach(x => {
        const nopenerimaan = x?.nopenerimaan
        const tglpenerimaan = x?.tglpenerimaan
        const pbf = x?.pihakketiga?.nama
        const nomorsurat = x?.nomorsurat
        const jenisdokumen = x?.jenissurat
        const tglsurat = x?.tglsurat
        const batasbayar = x?.batasbayar
        const total = x.penerimaanrinci.reduce((x, y) => parseFloat(x) + parseFloat(y.subtotal), 0)
        const hasil = {
          NoPenerimaan: nopenerimaan,
          tglpenerimaan,
          pbf,
          nomorsurat,
          jenisdokumen,
          tglsurat,
          batasbayar,
          total
        }
        hasilglobal.push(hasil)
        this.items = hasilglobal.sort(({ tglpenerimaan: a }, { tglpenerimaan: b }) => b - a)
      })
      // console.log('wew', hasilglobal)
      // this.items = hasilglobal.sort(({ tglpenerimaan: a }, { tglpenerimaan: b }) => b - a)
      console.log('wew', hasilglobal)
      this.loading = false
    }
  }
})
