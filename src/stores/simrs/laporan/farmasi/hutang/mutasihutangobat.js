import { defineStore } from 'pinia'
import { date } from 'quasar'
import { api } from 'src/boot/axios'
import { filterDuplicateArrays } from 'src/modules/utils'

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
      this.kolom = ['kodepbf', 'SaldoAwal', 'PenambahanHutang', 'Pembayaran', 'Saldo']
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
      this.items = []
      console.log('asil', val)
      const tsaldoawal = []
      const tsaldoawalkonsi = []
      const tutangsekarang = []
      const tutangsekarangkonsi = []
      val.forEach(satu => {
        // -----utang sekarang konsinyasi-----//
        const utangsekarangkonsi = satu?.penerimaanobatkonsinyasiperiodeskrng
        utangsekarangkonsi?.forEach(duautaksekkonsi => {
          const utangsekarangkonsix = duautaksekkonsi?.rinci.reduce((x, y) => parseFloat(x) + parseFloat(y.subtotal), 0)
          const hasilutangsekarangkonsi = {
            kodepbfskx: satu?.kode,
            pbfskx: satu?.nama,
            total: utangsekarangkonsix
          }
          tutangsekarangkonsi.push(hasilutangsekarangkonsi)
        })
        // -----utang sekarang non konsinyasi-----//
        const utangsekarang = satu?.penerimaanobatperiodeskrng
        utangsekarang?.forEach(duautangsek => {
          const utangsekarangx = duautangsek?.penerimaanrinci.reduce((x, y) => parseFloat(x) + parseFloat(y.subtotal), 0)
          const hasilutangsekarang = {
            kodepbfsk: satu?.kode,
            pbfsk: satu?.nama,
            total: utangsekarangx
          }

          tutangsekarang.push(hasilutangsekarang)
        })
        // -----saldo awal konsinyasi-----//
        const saldokonsi = satu?.penerimaanobatkonsinyasi
        saldokonsi?.forEach(duakonsi => {
          const penerimaanrincikonsi = duakonsi?.rinci.reduce((x, y) => parseFloat(x) + parseFloat(y.subtotal), 0)

          const hasilkonsi = {
            kodepbf: satu?.kode,
            pbf: satu?.nama,
            total: penerimaanrincikonsi
          }
          tsaldoawalkonsi.push(hasilkonsi)
        })
        // -----saldo awal -----//
        const saldoHpenerimaan = satu?.penerimaanobat

        saldoHpenerimaan?.forEach(dua => {
          const penerimaanrinci = dua.penerimaanrinci.reduce((x, y) => parseFloat(x) + parseFloat(y.subtotal), 0)
          const hasil = {
            kodepbf: satu?.kode,
            pbf: satu?.nama,
            total: penerimaanrinci
          }
          tsaldoawal.push(hasil)
        })
      })
      // -----saldo awal -----//
      const kodepbfkonsi = filterDuplicateArrays(tsaldoawalkonsi.map(m => m.kodepbf))
      kodepbfkonsi.forEach(xxxkonsi => {
        const subtotalfixkonsi = tsaldoawalkonsi.filter(fi => fi.kodepbf === xxxkonsi).reduce((x, y) => parseFloat(x) + parseFloat(y.total), 0)
        const hasilfixkonsi = {
          kodepbf: xxxkonsi,
          SaldoAwal: subtotalfixkonsi
        }

        const ada = this.items.find(ter => ter.kodepbf === xxxkonsi)
        if (ada) {
          ada.SaldoAwal += subtotalfixkonsi
        }
        else {
          this.items.push(hasilfixkonsi)
        }
      })
      const kodepbfz = filterDuplicateArrays(tsaldoawal.map(m => m.kodepbf))

      kodepbfz.forEach(xxx => {
        const subtotalfix = tsaldoawal.filter(fi => fi.kodepbf === xxx).reduce((x, y) => parseFloat(x) + parseFloat(y.total), 0)
        const hasilfix = {
          kodepbf: xxx,
          SaldoAwal: subtotalfix
        }
        const adax = this.items.find(terx => terx.kodepbf === xxx)
        if (adax) {
          adax.SaldoAwal += subtotalfix
        }
        else {
          this.items.push(hasilfix)
        }
      })

      // -----penambahan hutang-----//
      const kodepbfutang = filterDuplicateArrays(tutangsekarang.map(m => m.kodepbfsk))
      kodepbfutang.forEach(xxxutangsekarang => {
        const subtotalutangsek = tutangsekarang.filter(tut => tut.kodepbfsk === xxxutangsekarang).reduce((x, y) => parseFloat(x) + parseFloat(y.total), 0)
        const hasilfixhutang = {
          kodepbf: xxxutangsekarang,
          PenambahanHutang: subtotalutangsek
        }
        const adaxi = this.items.find(terx => terx.kodepbf === xxxutangsekarang)

        if (adaxi) {
          adaxi.PenambahanHutang = subtotalutangsek
        }
        else {
          this.items.push(hasilfixhutang)
        }
      })

      const kodepbfhutangkonsi = filterDuplicateArrays(tutangsekarangkonsi.map(k => k.kodepbfskx))
      kodepbfhutangkonsi.forEach(xxxutangsekarangkonsi => {
        const subtotalhutangsekarangkonsi = tutangsekarangkonsi.filter(sasa => sasa.kodepbfskx === xxxutangsekarangkonsi).reduce((x, y) => parseFloat(x) + parseFloat(y.total))
        const hasilfixhutangkonsi = {
          kodepbf: xxxutangsekarangkonsi,
          PenambahanHutang: subtotalhutangsekarangkonsi
        }
        const adaxikonsi = this.items.find(terx => terx.kodepbf === xxxutangsekarangkonsi)

        if (adaxikonsi) {
          adaxikonsi.PenambahanHutang = subtotalhutangsekarangkonsi
        }
        else {
          this.items.push(hasilfixhutangkonsi)
        }
      })
      console.log('hahahahaha', kodepbfhutangkonsi)

      this.items.forEach(tot => {
        const saldoawal = tot.SaldoAwal ?? 0
        const PenambahanHutang = tot.PenambahanHutang ?? 0
        const saldoakhir = saldoawal + PenambahanHutang
        tot.Saldo = saldoakhir
      })
      this.loading = false
    }
  }
})
