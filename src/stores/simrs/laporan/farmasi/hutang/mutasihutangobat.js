import { defineStore } from 'pinia'
import { date } from 'quasar'
import { api } from 'src/boot/axios'

export const useLapMutasiHutangObatStore = defineStore('lap-mutasi-hutang-obat', {
  state: () => ({
    loading: false,
    items: [],
    detail: [],
    meta: {},
    kolom: ['NamaPbf', 'SaldoAwal', 'PenambahanHutang', 'Pembayaran', 'Saldo'],
    tanggal: {
      from: date.formatDate(Date.now(), 'DD MMMM YYYY'),
      to: date.formatDate(Date.now(), 'DD MMMM YYYY')
    },
    params: {
      tgldari: date.formatDate(Date.now(), 'YYYY-MM-DD'),
      tglsampai: date.formatDate(Date.now(), 'YYYY-MM-DD'),
      jenisreport: '3'
      // ruangan: ''
    }
  }),
  actions: {
    async initAmbilData () {
      this.lapMutasiHutangObat()
    },
    async lapMutasiHutangObat () {
      this.loading = true
      this.kolom = ['NamaPbf', 'SaldoAwal', 'PenambahanHutang', 'Pembayaran', 'Saldo']
      const params = { params: this.params }
      await api.get('v1/simrs/laporan/farmasi/hutang/reportMutasiHutangObat', params)
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
      console.log('asil', val)
      // const wew = []
      val.forEach(satu => {
        const saldoHpenerimaan = satu?.penerimaanobat
        // const kodepbf = satu?.kode
        // const pbf = satu?.nama

        saldoHpenerimaan?.forEach(dua => {
          // const saldoHpenerimaanx = saldoHpenerimaan.reduce((x, y) => parseFloat(x) + parseFloat(y.subtotal), 0)
          console.log('xxx', dua)
          // saldoHpenerimaanxsaldoHpenerimaan?.forEach(tiga => {
          //   const subtotalsaldoRpenerimaan = saldoHpenerimaanx.reduce((x, y) => parseFloat(x) + parseFloat(y.subtotal), 0)
          //   const xxx = {
          //     saldoHpenerimaanx,
          //     subtotalsaldoRpenerimaan
          //   }
          //   wew.push(xxx)
          //
          // })
        })
        // const saldotagihan = []
        // saldoHpenerimaan?.forEach(dua => {
        //   const saldoRpenerimaan = dua?.penerimaanrinci
        //   const subtotalsaldoRpenerimaan = saldoRpenerimaan.reduce((x, y) => parseFloat(x) + parseFloat(y.subtotal), 0)
        //   const a = {
        //     kodepbf,
        //     subtotalsaldoRpenerimaan
        //   }
        //   saldotagihan.push(a)
        //   console.log('xxx', saldoRpenerimaan)

        // })
      })

      this.loading = false
    }
  }
})
