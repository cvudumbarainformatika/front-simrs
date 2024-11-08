import { defineStore } from 'pinia'
import { date } from 'quasar'
import { api } from 'src/boot/axios'

export const useLRAjurnalStore = defineStore('lap_realisasi_anggaran', {
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
    pagupendapatans: [],
    datapendapatans: [],
    databelanjas: [],
    dataqitem: [],

    hasilpendapatan: [],
    hasilqitem: []
  }),
  actions: {
    getDataLap () {
      this.loading = true
      const params = { params: this.reqs }
      return new Promise((resolve) => {
        api.get('v1/laporan/lra/getlra', params).then((resp) => {
          console.log('data LRA', resp.data)
          if (resp.status === 200) {
            this.dataqitem = resp.data.qitem
            this.pagupendapatans = resp.data.pagupendapatan
            this.datapendapatans = resp.data.pendapatan
            this.databelanjas = resp.data.belanja
            this.mapData()

            this.loading = false
            resolve(resp.data)
          }
        }).catch(() => { this.loading = false })
      })
    },
    mapData () {
      const pendapatan = this.datapendapatans
      const pagupendapatan = this.pagupendapatans

      const realsebelumnya = this.datapendapatans?.filter((x) => {
        const tgl = new Date(x?.tanggal).getTime()
        return tgl < new Date(this.reqs.tgl).getTime()
      }).map((x) => x)
      console.log('subtotal', realsebelumnya)
      const kode6 = []
      const kode5 = []
      const kode4 = []
      const kode3 = []
      const kode2 = []
      const kode1 = []
      for (let i = 0; i < pendapatan.length; i++) {
        const el = pendapatan[i]
        const pagup = pagupendapatan[i]
        const nilaip = el?.penyesuaian.map(x => parseFloat(x.totalpenyesuaian))
        // console.log('nilaip', nilaip)
        const obj6 = {
          kode: el?.kode6,
          uraian: el?.uraian,
          nilai: parseFloat(el?.subtotal) + parseFloat(nilaip),
          pagupend: parseFloat(pagup?.pagupendapatan)
        }
        const obj5 = {
          kode: el?.kode5,
          uraian: el?.lvl5?.uraian,
          nilai: parseFloat(el?.subtotal) + parseFloat(nilaip),
          pagupend: parseFloat(pagup?.pagupendapatan)
        }
        const obj4 = {
          kode: el?.kode4,
          uraian: el?.lvl4?.uraian,
          nilai: parseFloat(el?.subtotal) + parseFloat(nilaip),
          pagupend: parseFloat(pagup?.pagupendapatan)
        }
        const obj3 = {
          kode: el?.kode3,
          uraian: el?.lvl3?.uraian,
          nilai: parseFloat(el?.subtotal) + parseFloat(nilaip),
          pagupend: parseFloat(pagup?.pagupendapatan)
        }
        const obj2 = {
          kode: el?.kode2,
          uraian: el?.lvl2?.uraian,
          nilai: parseFloat(el?.subtotal) + parseFloat(nilaip),
          pagupend: parseFloat(pagup?.pagupendapatan)
        }
        const obj1 = {
          kode: el?.kode1,
          uraian: el?.lvl1?.uraian,
          nilai: parseFloat(el?.subtotal) + parseFloat(nilaip),
          pagupend: parseFloat(pagup?.pagupendapatan)
        }
        kode6.push(obj1, obj2, obj3, obj4, obj5, obj6)
        kode5.push(obj1, obj2, obj3, obj4, obj5)
        kode4.push(obj1, obj2, obj3, obj4)
        kode3.push(obj1, obj2, obj3)
        kode2.push(obj1, obj2)
        kode1.push(obj1)
      } console.log('kode6', kode6)

      const qitem = this.dataqitem
      const qitem6 = []
      const qitem5 = []
      const qitem4 = []
      const qitem3 = []
      const qitem2 = []
      const qitem1 = []

      for (let i = 0; i < qitem.length; i++) {
        const el = qitem[i]
        const obj6 = {
          kode: el?.kode6,
          uraian: el?.uraian50,
          nilai: parseFloat(el?.subtotal)
        }
        qitem6.push(obj6)
      }

      const fil5 = qitem.map((x) => x.kode5)
      const unik5 = fil5.length ? [...new Set(fil5)] : []
      for (let i = 0; i < unik5.length; i++) {
        const el = unik5[i]
        const obj = {
          kode: qitem.filter((x) => x.kode5 === el)[0].kode5,
          uraian: qitem.filter((x) => x.kode5 === el).map((x) => x.lvl5)[0]?.uraian,
          nilai: qitem.filter((x) => x.kode5 === el)?.map((x) => parseFloat(x.subtotal)).reduce((a, b) => a + b, 0)
        }
        qitem5.push(obj)
      }

      const fil4 = qitem.map((x) => x.kode4)
      const unik4 = fil4.length ? [...new Set(fil4)] : []
      for (let i = 0; i < unik4.length; i++) {
        const el = unik4[i]
        const obj = {
          kode: qitem.filter((x) => x.kode4 === el)[0].kode4,
          uraian: qitem.filter((x) => x.kode4 === el).map((x) => x.lvl4)[0]?.uraian,
          nilai: qitem.filter((x) => x.kode4 === el)?.map((x) => parseFloat(x.subtotal)).reduce((a, b) => a + b, 0)
        }
        qitem4.push(obj)
      }

      const fil3 = qitem.map((x) => x.kode3)
      const unik3 = fil3.length ? [...new Set(fil3)] : []
      for (let i = 0; i < unik3.length; i++) {
        const el = unik3[i]
        const obj = {
          kode: qitem.filter((x) => x.kode3 === el)[0].kode3,
          uraian: qitem.filter((x) => x.kode3 === el).map((x) => x.lvl3)[0]?.uraian,
          nilai: qitem.filter((x) => x.kode3 === el)?.map((x) => parseFloat(x.subtotal)).reduce((a, b) => a + b, 0)
        }
        qitem3.push(obj)
      }

      const fil2 = qitem.map((x) => x.kode2)
      const unik2 = fil2.length ? [...new Set(fil2)] : []
      for (let i = 0; i < unik2.length; i++) {
        const el = unik2[i]
        const obj = {
          kode: qitem.filter((x) => x.kode2 === el)[0].kode2,
          uraian: qitem.filter((x) => x.kode2 === el).map((x) => x.lvl2)[0]?.uraian,
          nilai: qitem.filter((x) => x.kode2 === el)?.map((x) => parseFloat(x.subtotal)).reduce((a, b) => a + b, 0)
        }
        qitem2.push(obj)
      }

      const fil1 = qitem.map((x) => x.kode1)
      const unik1 = fil1.length ? [...new Set(fil1)] : []
      for (let i = 0; i < unik1.length; i++) {
        const el = unik1[i]
        const obj = {
          kode: qitem.filter((x) => x.kode1 === el)[0].kode1,
          uraian: qitem.filter((x) => x.kode1 === el).map((x) => x.lvl1)[0]?.uraian,
          nilai: qitem.filter((x) => x.kode1 === el)?.map((x) => parseFloat(x.subtotal)).reduce((a, b) => a + b, 0)
        }
        qitem1.push(obj)
      }

      qitem6.push(...qitem1, ...qitem2, ...qitem3, ...qitem4, ...qitem5)
      const sortqitem6 = (qitem6) =>
        qitem6.sort(({ kode: a }, { kode: b }) =>
          a < b ? -1 : a > b ? 1 : 0
        )
      const level6 = sortqitem6(qitem6)
      console.log('level6', level6)

      qitem5.push(...qitem1, ...qitem2, ...qitem3, ...qitem4)
      const sortqitem5 = (qitem5) =>
        qitem5.sort(({ kode: a }, { kode: b }) =>
          a < b ? -1 : a > b ? 1 : 0
        )
      const level5 = sortqitem5(qitem5)
      console.log('level5', level5)

      qitem4.push(...qitem1, ...qitem2, ...qitem3)
      const sortqitem4 = (qitem4) =>
        qitem4.sort(({ kode: a }, { kode: b }) =>
          a < b ? -1 : a > b ? 1 : 0
        )
      const level4 = sortqitem4(qitem4)
      console.log('level4', level4)

      qitem3.push(...qitem1, ...qitem2)
      const sortqitem3 = (qitem3) =>
        qitem3.sort(({ kode: a }, { kode: b }) =>
          a < b ? -1 : a > b ? 1 : 0
        )
      const level3 = sortqitem3(qitem3)
      console.log('level3', level3)

      qitem2.push(...qitem1)
      const sortqitem2 = (qitem2) =>
        qitem2.sort(({ kode: a }, { kode: b }) =>
          a < b ? -1 : a > b ? 1 : 0
        )
      const level2 = sortqitem2(qitem2)
      console.log('level2', level2)

      if (this.reqs.levelberapa === 6) {
        this.hasilpendapatan = kode6
        this.hasilqitem = qitem6
      }
      else if (this.reqs.levelberapa === 5) {
        this.hasilpendapatan = kode5
        this.hasilqitem = qitem5
      }
      else if (this.reqs.levelberapa === 4) {
        this.hasilpendapatan = kode4
        this.hasilqitem = qitem4
      }
      else if (this.reqs.levelberapa === 3) {
        this.hasilpendapatan = kode3
        this.hasilqitem = qitem3
      }
      else if (this.reqs.levelberapa === 2) {
        this.hasilpendapatan = kode2
        this.hasilqitem = qitem2
      }
      else {
        this.hasilpendapatan = kode1
        this.hasilqitem = qitem1
      }
    }
  }
})
