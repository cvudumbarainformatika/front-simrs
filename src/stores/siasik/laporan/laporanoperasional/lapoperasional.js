import { defineStore } from 'pinia'
import { date } from 'quasar'
import { api } from 'src/boot/axios'

export const useLaporanOperasionalStore = defineStore('Laporan_Operasional', {
  state: () => ({
    loading: false,
    dialogCetak: false,
    reqs: {
      q: '',
      tgl: date.formatDate(Date.now(), 'YYYY-MM-DD'),
      tglx: date.formatDate(Date.now(), 'YYYY-MM-DD'),
      tahun: date.formatDate(Date.now(), 'YYYY'),
      levelberapa: ''
    },
    display: {
      dari: date.formatDate(Date.now(), 'DD MMMM YYYY'),
      sampai: date.formatDate(Date.now(), 'DD MMMM YYYY'),
      sekarang: date.formatDate(Date.now(), 'DD MMMM YYYY')
    },
    level: [
      { nama: 'Akun', value: '1' },
      { nama: 'Kelompok', value: '2' },
      { nama: 'Jenis', value: '3' },
      { nama: 'Objek', value: '4' },
      { nama: 'Rincian Objek', value: '5' },
      { nama: 'SubRincian Objek', value: '6' }
    ],
    datapendapatans: [],
    databebans: [],
    hasilpendapatan: [],
    hasilbeban: []
  }),
  actions: {
    setParameter (key, val) {
      this.reqs[key] = val
    },
    getDataLap () {
      this.loading = true
      const params = { params: this.reqs }
      return new Promise((resolve) => {
        api.get('v1/laporan/lapoperasional/getlo', params).then((resp) => {
          console.log('data LO', resp.data)
          if (resp.status === 200) {
            this.datapendapatans = resp.data.pendapatan
            this.databebans = resp.data.beban
            this.mapData()

            this.loading = false
            resolve(resp.data)
          }
        }).catch(() => { this.loading = false })
      })
    },
    mapData () {
      const pendapatan = this.datapendapatans
      const kode6 = []
      const kode5 = []
      const kode4 = []
      const kode3 = []
      const kode2 = []
      const kode1 = []
      for (let i = 0; i < pendapatan.length; i++) {
        const el = pendapatan[i]
        const nilaip = el?.penyesuaian.map(x => parseFloat(x.totalpenyesuaian))
        // console.log('nilaip', nilaip)
        const obj6 = {
          kode: el?.kode6,
          uraian: el?.uraian,
          nilai: parseFloat(el?.subtotal) + parseFloat(nilaip)
        }
        const obj5 = {
          kode: el?.kode5,
          uraian: el?.lvl5?.uraian,
          nilai: parseFloat(el?.subtotal) + parseFloat(nilaip)
        }
        const obj4 = {
          kode: el?.kode4,
          uraian: el?.lvl4?.uraian,
          nilai: parseFloat(el?.subtotal) + parseFloat(nilaip)
        }
        const obj3 = {
          kode: el?.kode3,
          uraian: el?.lvl3?.uraian,
          nilai: parseFloat(el?.subtotal) + parseFloat(nilaip)
        }
        const obj2 = {
          kode: el?.kode2,
          uraian: el?.lvl2?.uraian,
          nilai: parseFloat(el?.subtotal) + parseFloat(nilaip)
        }
        const obj1 = {
          kode: el?.kode1,
          uraian: el?.lvl1?.uraian,
          nilai: parseFloat(el?.subtotal) + parseFloat(nilaip)
        }
        kode6.push(obj1, obj2, obj3, obj4, obj5, obj6)
        kode5.push(obj1, obj2, obj3, obj4, obj5)
        kode4.push(obj1, obj2, obj3, obj4)
        kode3.push(obj1, obj2, obj3)
        kode2.push(obj1, obj2)
        kode1.push(obj1)
      }

      const beban = this.databebans
      const beban6 = []
      const beban5 = []
      const beban4 = []
      const beban3 = []
      const beban2 = []
      const beban1 = []

      for (let i = 0; i < beban.length; i++) {
        const el = beban[i]
        const obj6 = {
          kode: el?.kode6,
          uraian: el?.uraian,
          nilai: parseFloat(el?.subtotalx)
        }
        beban6.push(obj6)
      }

      const fil5 = beban.map((x) => x.kode5)
      const unik5 = fil5.length ? [...new Set(fil5)] : []
      for (let i = 0; i < unik5.length; i++) {
        const el = unik5[i]
        const obj = {
          kode: beban.filter((x) => x.kode5 === el)[0].kode5,
          uraian: beban.filter((x) => x.kode5 === el).map((x) => x.lvl5)[0]?.uraian,
          nilai: beban.filter((x) => x.kode5 === el)?.map((x) => parseFloat(x.subtotalx)).reduce((a, b) => a + b, 0)
        }
        beban5.push(obj)
      }

      const fil4 = beban.map((x) => x.kode4)
      const unik4 = fil4.length ? [...new Set(fil4)] : []
      for (let i = 0; i < unik4.length; i++) {
        const el = unik4[i]
        const obj = {
          kode: beban.filter((x) => x.kode4 === el)[0].kode4,
          uraian: beban.filter((x) => x.kode4 === el).map((x) => x.lvl4)[0]?.uraian,
          nilai: beban.filter((x) => x.kode4 === el)?.map((x) => parseFloat(x.subtotalx)).reduce((a, b) => a + b, 0)
        }
        beban4.push(obj)
      }

      const fil3 = beban.map((x) => x.kode3)
      const unik3 = fil3.length ? [...new Set(fil3)] : []
      for (let i = 0; i < unik3.length; i++) {
        const el = unik3[i]
        const obj = {
          kode: beban.filter((x) => x.kode3 === el)[0].kode3,
          uraian: beban.filter((x) => x.kode3 === el).map((x) => x.lvl3)[0]?.uraian,
          nilai: beban.filter((x) => x.kode3 === el)?.map((x) => parseFloat(x.subtotalx)).reduce((a, b) => a + b, 0)
        }
        beban3.push(obj)
      }

      const fil2 = beban.map((x) => x.kode2)
      const unik2 = fil2.length ? [...new Set(fil2)] : []
      for (let i = 0; i < unik2.length; i++) {
        const el = unik2[i]
        const obj = {
          kode: beban.filter((x) => x.kode2 === el)[0].kode2,
          uraian: beban.filter((x) => x.kode2 === el).map((x) => x.lvl2)[0]?.uraian,
          nilai: beban.filter((x) => x.kode2 === el)?.map((x) => parseFloat(x.subtotalx)).reduce((a, b) => a + b, 0)
        }
        beban2.push(obj)
      }

      const fil1 = beban.map((x) => x.kode1)
      const unik1 = fil1.length ? [...new Set(fil1)] : []
      for (let i = 0; i < unik1.length; i++) {
        const el = unik1[i]
        const obj = {
          kode: beban.filter((x) => x.kode1 === el)[0].kode1,
          uraian: beban.filter((x) => x.kode1 === el).map((x) => x.lvl1)[0]?.uraian,
          nilai: beban.filter((x) => x.kode1 === el)?.map((x) => parseFloat(x.subtotalx)).reduce((a, b) => a + b, 0)
        }
        beban1.push(obj)
      }

      beban6.push(...beban1, ...beban2, ...beban3, ...beban4, ...beban5)
      const sortBeban6 = (beban6) =>
        beban6.sort(({ kode: a }, { kode: b }) =>
          a < b ? -1 : a > b ? 1 : 0
        )
      const level6 = sortBeban6(beban6)
      console.log('level6', level6)

      beban5.push(...beban1, ...beban2, ...beban3, ...beban4)
      const sortBeban5 = (beban5) =>
        beban5.sort(({ kode: a }, { kode: b }) =>
          a < b ? -1 : a > b ? 1 : 0
        )
      const level5 = sortBeban5(beban5)
      console.log('level5', level5)

      beban4.push(...beban1, ...beban2, ...beban3)
      const sortBeban4 = (beban4) =>
        beban4.sort(({ kode: a }, { kode: b }) =>
          a < b ? -1 : a > b ? 1 : 0
        )
      const level4 = sortBeban4(beban4)
      console.log('level4', level4)

      beban3.push(...beban1, ...beban2)
      const sortBeban3 = (beban3) =>
        beban3.sort(({ kode: a }, { kode: b }) =>
          a < b ? -1 : a > b ? 1 : 0
        )
      const level3 = sortBeban3(beban3)
      console.log('level3', level3)

      beban2.push(...beban1)
      const sortBeban2 = (beban2) =>
        beban2.sort(({ kode: a }, { kode: b }) =>
          a < b ? -1 : a > b ? 1 : 0
        )
      const level2 = sortBeban2(beban2)
      console.log('level2', level2)

      if (this.reqs.levelberapa === 6) {
        this.hasilpendapatan = kode6
        this.hasilbeban = beban6
      }
      else if (this.reqs.levelberapa === 5) {
        this.hasilpendapatan = kode5
        this.hasilbeban = beban5
      }
      else if (this.reqs.levelberapa === 4) {
        this.hasilpendapatan = kode4
        this.hasilbeban = beban4
      }
      else if (this.reqs.levelberapa === 3) {
        this.hasilpendapatan = kode3
        this.hasilbeban = beban3
      }
      else if (this.reqs.levelberapa === 2) {
        this.hasilpendapatan = kode2
        this.hasilbeban = beban2
      }
      else {
        this.hasilpendapatan = kode1
        this.hasilbeban = beban1
      }
    }
  }
})
