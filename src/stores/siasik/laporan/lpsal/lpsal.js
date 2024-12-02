import { defineStore } from 'pinia'
import { date } from 'quasar'
import { api } from 'src/boot/axios'

export const useLPSALStore = defineStore('laporan_sal', {
  state: () => ({
    loading: false,
    dialogCetak: false,
    reqs: {
      q: '',
      tgl: date.formatDate(Date.now(), 'YYYY-MM-DD'),
      tglx: date.formatDate(Date.now(), 'YYYY-MM-DD'),
      tahun: date.formatDate(Date.now(), 'YYYY')
    },
    display: {
      dari: date.formatDate(Date.now(), 'DD MMMM YYYY'),
      sampai: date.formatDate(Date.now(), 'DD MMMM YYYY'),
      sekarang: date.formatDate(Date.now(), 'DD MMMM YYYY')
    },
    pendapatan: [],
    belanja: [],
    silpasikpa: 0,

    silpaskg: [],
    nilaisilpa: [],

    penggunaansal: [],
    biayatahunjln: [],
    inputbiaya: 0,

    koreksithnsblm: [],
    inputkoreksi: 0,
    lainlain: [],
    inputlainlain: 0
  }),
  actions: {
    setParameter (key, val) {
      this.reqs[key] = val
    },
    setBiaya () {
      return new Promise((resolve, reject) => {
        if (this.inputbiaya !== null || this.inputbiaya !== '') {
          this.biayatahunjln.nilai.push(parseFloat(this.inputbiaya))
        }
        resolve()
      })
    },
    setKoreksi () {
      return new Promise((resolve, reject) => {
        // if (this.inputkoreksi !== null || this.inputkoreksi !== '') {
        this.koreksithnsblm.nilai.push(parseFloat(this.inputkoreksi))
        // }
        resolve()
      })
    },
    setLainlain () {
      return new Promise((resolve, reject) => {
        // if (this.inputlainlain !== null || this.inputlainlain !== '') {
        this.lainlain.nilai.push(parseFloat(this.inputlainlain))
        // }
        resolve()
      })
    },
    getDataLap () {
      this.loading = true
      const params = { params: this.reqs }
      return new Promise((resolve) => {
        api.get('v1/laporan/lra/getlra', params).then((resp) => {
          console.log('data LRA', resp.data)
          if (resp.status === 200) {
            this.pendapatan = resp.data.pendapatan
            this.belanja = resp.data.belanja
            this.silpaskg = resp.data.silpaskg

            const realsilpa = this.silpaskg.map((x) => parseFloat(x.nilaiskg)).reduce((a, b) => a + b, 0)
            const saldoanggaran = {
              uraian: 'Saldo Anggaran Lebih Awal',
              nilai: isNaN(realsilpa) ? parseFloat(0) : realsilpa
            }
            this.nilaisilpa = saldoanggaran
            // console.log('SILPA', this.nilaisilpa.uraian)

            const penggunaansal = {
              uraian: 'Penggunaan Saldo Anggaran Lebih sebagai Penerimaan',
              nilai: isNaN(realsilpa) ? parseFloat(0) : realsilpa
            }
            this.penggunaansal = penggunaansal

            const pembiayaanthnjln = {
              uraian: 'Pembiayaan Tahun Berjalan',
              nilai: this.inputbiaya
            }
            this.biayatahunjln = pembiayaanthnjln
            console.log('biayatahunjln', this.biayatahunjln)

            const pendp = this.pendapatan.map((x) => parseFloat(x.subtotal)).reduce((a, b) => a + b, 0)
            const blj = this.belanja.map((x) => parseFloat(x.subtotalx)).reduce((a, b) => a + b, 0)
            const silp = this.silpaskg.map((x) => parseFloat(x.nilaiskg)).reduce((a, b) => a + b, 0)
            const objsilpasipka = {
              uraian: 'Penggunaan Saldo Anggaran Lebih sebagai Penerimaan',
              nilai: pendp - blj + silp
            }
            this.silpasikpa = objsilpasipka
            // console.log('nilai Akhir', this.silpasikpa)

            const koreksi = {
              uraian: 'Koreksi Kesalahan Pembukuan Tahun Sebelumnya',
              nilai: parseFloat(0)
            }
            this.koreksithnsblm = koreksi

            const lainlain = {
              uraian: 'Lain-lain',
              nilai: parseFloat(0)
            }
            this.lainlain = lainlain

            this.loading = false
            resolve(resp.data)
          }
        }).catch(() => { this.loading = false })
      })
    }
  }

})
