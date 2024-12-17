import { defineStore } from 'pinia'
import { date } from 'quasar'
import { api } from 'src/boot/axios'
// import { api } from 'src/boot/axios'

export const useLPEStore = defineStore('laporan_PerubahanEkuitas', {
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
    dataekuitas: [],
    datapendapatans: [],
    datakoreksi: [],

    ekuitasawal: [],
    surplusdefisit: [],
    hasilkoreksi: []
  }),
  actions: {
    setParameter (key, val) {
      this.reqs[key] = val
    },
    getDataLap () {
      this.loading = true
      const params = { params: this.reqs }
      return new Promise((resolve) => {
        api.get('v1/laporan/lpe/getlpe', params).then((resp) => {
          console.log('data LPE', resp.data)
          if (resp.status === 200) {
            this.dataekuitas = resp.data.ekuitas
            this.datapendapatans = resp.data.pendapatan
            this.datakoreksi = resp.data.koreksi

            // const objekuitas = []
            const datekuitas = this.dataekuitas.map((x) => {
              return {
                uraian: 'Ekuitas',
                nilai: (x?.saldoawal.map((x) => parseFloat(x.saldo)).reduce((a, b) => a + b, 0) +
                x?.jurnalotom.map((x) => parseFloat(x.totaljurnal)).reduce((a, b) => a + b, 0) +
                x?.penyesuaianx.map((x) => parseFloat(x.totalpenyesuaian)).reduce((a, b) => a + b, 0))
              }
            })
            const nilaiekuitas = {
              kode: '3.1.01',
              uraian: 'Ekuitas',
              nilai: datekuitas.map((x) => parseFloat(x.nilai)).reduce((a, b) => a + b, 0).toFixed(2)
            }
            this.ekuitasawal = nilaiekuitas
            console.log('ekuitasawal', this.ekuitasawal)

            const surplsdef = this.datapendapatans.map((x) => {
              return {
                uraian: 'Surplus / Defisit LO',
                nilai: parseFloat(x.realisasi) + x.penyesuaian.map((x) => parseFloat(x.totalpenyesuaian)).reduce((a, b) => a + b, 0)
              }
            })
            const nilaisurplusdef = {
              kode: '3.1.01',
              uraian: 'Surplus / Defisit LO',
              nilai: surplsdef.map((x) => parseFloat(x.nilai)).reduce((a, b) => a + b, 0).toFixed(2)
            }
            this.surplusdefisit = nilaisurplusdef
            console.log('surplusdefisit', this.surplusdefisit)

            const objkoreksi = []
            for (let i = 0; i < this.datakoreksi.length; i++) {
              const el = this.datakoreksi[i]
              const saldoawal = el?.saldoawal.map((x) => parseFloat(x.saldo)).reduce((a, b) => a + b, 0)
              const jurnal = el?.jurnalotom.map((x) => parseFloat(x.totaljurnal)).reduce((a, b) => a + b, 0)
              const penyesuaian = el?.penyesuaianx.map((x) => parseFloat(x.totalpenyesuaian)).reduce((a, b) => a + b, 0)

              const koreksi = {
                kode: el.kodeall3,
                uraian: el.uraian,
                nilai: saldoawal + jurnal + penyesuaian
              }
              objkoreksi.push(koreksi)
            }
            this.hasilkoreksi = objkoreksi
            console.log('hasilkoreksi', objkoreksi)

            // console.log('mappeny', mappeny)
            this.loading = false
            resolve(resp.data)
          }
        }).catch(() => { this.loading = false })
      })
    }
  }
})
