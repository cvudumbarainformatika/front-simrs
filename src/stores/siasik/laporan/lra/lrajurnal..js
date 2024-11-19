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
      jenislra: '',
      levelberapa: ''
    },
    display: {
      dari: date.formatDate(Date.now(), 'DD MMMM YYYY'),
      sampai: date.formatDate(Date.now(), 'DD MMMM YYYY'),
      sekarang: date.formatDate(Date.now(), 'DD MMMM YYYY')
    },
    jenis: [
      { nama: 'PP71', value: '1' },
      { nama: 'PSAP 13', value: '2' }
    ],
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
    datapendpsblm: [],
    pagubelanjas: [],
    databelanjas: [],
    belanjasblm: [],
    pagusilpa: [],
    silpasblm: [],
    silpaskg: [],

    hasilpendapatan: [],
    hasilbelanja: [],
    hasilsilpa: []
  }),
  actions: {
    setParameter (key, val) {
      this.reqs[key] = val
    },
    getDataLap () {
      this.loading = true
      const params = { params: this.reqs }
      return new Promise((resolve) => {
        api.get('v1/laporan/lra/getlra', params).then((resp) => {
          console.log('data LRA', resp.data)
          if (resp.status === 200) {
            this.pagupendapatans = []
            this.datapendapatans = []
            this.datapendpsblm = []
            this.pagubelanjas = []
            this.databelanjas = []
            this.belanjasblm = []
            this.pagusilpa = []
            this.silpasblm = []
            this.silpaskg = []
            this.pagupendapatans = resp.data.pagupendapatan
            this.datapendapatans = resp.data.pendapatan
            this.datapendpsblm = resp.data.pendapatansblm
            this.pagubelanjas = resp.data.pagu
            this.databelanjas = resp.data.belanja
            this.belanjasblm = resp.data.belanjasblm
            this.pagusilpa = resp.data.pagusilpa
            this.silpasblm = resp.data.silpasblm
            this.silpaskg = resp.data.silpaskg

            this.mapData()

            this.loading = false
            resolve(resp.data)
          }
        }).catch(() => { this.loading = false })
      })
    },
    mapData () {
      const pendsblm = this.datapendpsblm
      const pendapatan = this.datapendapatans
      const pagupendapatan = this.pagupendapatans
      const kode6 = []
      const kode5 = []
      const kode4 = []
      const kode3 = []
      const kode2 = []
      const kode1 = []
      for (let i = 0; i < pendapatan.length; i++) {
        const el = pendapatan[i] ?? 0
        const sblm = pendsblm[i] ?? 0

        const pagup = pagupendapatan[i]
        const nilaip = el?.penyesuaian?.length ? el?.penyesuaian?.map(x => parseFloat(x?.totalpenyesuaian)) : 0
        const nilaipseblm = sblm?.penyesuaian?.length ? sblm?.penyesuaian?.map(x => parseFloat(x?.totalpenyesuaian)) : 0

        const obj6 = {
          kode: el?.kode6,
          uraian: el?.uraian,
          nilaiskg: parseFloat(el?.subtotal) + parseFloat(nilaip),
          pagupend: parseFloat(pagup?.pagupendapatan),
          nilaisblm: (sblm ? parseFloat(sblm?.pendpsebelumnya) : 0) + parseFloat(nilaipseblm),
          nilaisemua: parseFloat(el?.subtotal) + parseFloat(nilaip) + (sblm.length ? parseFloat(sblm?.pendpsebelumnya) : 0),
          selisih: parseFloat(pagup?.pagupendapatan) - (parseFloat(el?.subtotal) + parseFloat(nilaip) + (sblm.length ? parseFloat(sblm?.pendpsebelumnya) : 0)),
          persen: ((parseFloat(el?.subtotal) + parseFloat(nilaip) + (sblm.length ? parseFloat(sblm?.pendpsebelumnya) : 0)) / parseFloat(pagup?.pagupendapatan) * 100).toFixed(2)
        }
        const obj5 = {
          kode: el?.kode5,
          uraian: el?.lvl5?.uraian,
          nilaiskg: parseFloat(el?.subtotal) + parseFloat(nilaip),
          pagupend: parseFloat(pagup?.pagupendapatan),
          nilaisblm: (sblm ? parseFloat(sblm?.pendpsebelumnya) : 0) + parseFloat(nilaipseblm),
          nilaisemua: parseFloat(el?.subtotal) + parseFloat(nilaip) + (sblm.length ? parseFloat(sblm?.pendpsebelumnya) : 0),
          selisih: parseFloat(pagup?.pagupendapatan) - (parseFloat(el?.subtotal) + parseFloat(nilaip) + (sblm.length ? parseFloat(sblm?.pendpsebelumnya) : 0)),
          persen: ((parseFloat(el?.subtotal) + parseFloat(nilaip) + (sblm.length ? parseFloat(sblm?.pendpsebelumnya) : 0)) / parseFloat(pagup?.pagupendapatan) * 100).toFixed(2)
        }
        const obj4 = {
          kode: el?.kode4,
          uraian: el?.lvl4?.uraian,
          nilaiskg: parseFloat(el?.subtotal) + parseFloat(nilaip),
          pagupend: parseFloat(pagup?.pagupendapatan),
          nilaisblm: (sblm ? parseFloat(sblm?.pendpsebelumnya) : 0) + parseFloat(nilaipseblm),
          nilaisemua: parseFloat(el?.subtotal) + parseFloat(nilaip) + (sblm.length ? parseFloat(sblm?.pendpsebelumnya) : 0),
          selisih: parseFloat(pagup?.pagupendapatan) - (parseFloat(el?.subtotal) + parseFloat(nilaip) + (sblm.length ? parseFloat(sblm?.pendpsebelumnya) : 0)),
          persen: ((parseFloat(el?.subtotal) + parseFloat(nilaip) + (sblm.length ? parseFloat(sblm?.pendpsebelumnya) : 0)) / parseFloat(pagup?.pagupendapatan) * 100).toFixed(2)
        }
        const obj3 = {
          kode: el?.kode3,
          uraian: el?.lvl3?.uraian,
          nilaiskg: parseFloat(el?.subtotal) + parseFloat(nilaip),
          pagupend: parseFloat(pagup?.pagupendapatan),
          nilaisblm: (sblm ? parseFloat(sblm?.pendpsebelumnya) : 0) + parseFloat(nilaipseblm),
          nilaisemua: parseFloat(el?.subtotal) + parseFloat(nilaip) + (sblm.length ? parseFloat(sblm?.pendpsebelumnya) : 0),
          selisih: parseFloat(pagup?.pagupendapatan) - (parseFloat(el?.subtotal) + parseFloat(nilaip) + (sblm.length ? parseFloat(sblm?.pendpsebelumnya) : 0)),
          persen: ((parseFloat(el?.subtotal) + parseFloat(nilaip) + (sblm.length ? parseFloat(sblm?.pendpsebelumnya) : 0)) / parseFloat(pagup?.pagupendapatan) * 100).toFixed(2)
        }
        const obj2 = {
          kode: el?.kode2,
          uraian: el?.lvl2?.uraian,
          nilaiskg: parseFloat(el?.subtotal) + parseFloat(nilaip),
          pagupend: parseFloat(pagup?.pagupendapatan),
          nilaisblm: (sblm ? parseFloat(sblm?.pendpsebelumnya) : 0) + parseFloat(nilaipseblm),
          nilaisemua: parseFloat(el?.subtotal) + parseFloat(nilaip) + (sblm.length ? parseFloat(sblm?.pendpsebelumnya) : 0),
          selisih: parseFloat(pagup?.pagupendapatan) - (parseFloat(el?.subtotal) + parseFloat(nilaip) + (sblm.length ? parseFloat(sblm?.pendpsebelumnya) : 0)),
          persen: ((parseFloat(el?.subtotal) + parseFloat(nilaip) + (sblm.length ? parseFloat(sblm?.pendpsebelumnya) : 0)) / parseFloat(pagup?.pagupendapatan) * 100).toFixed(2)
        }
        const obj1 = {
          kode: el?.kode1,
          uraian: el?.lvl1?.uraian,
          nilaiskg: parseFloat(el?.subtotal) + parseFloat(nilaip),
          pagupend: parseFloat(pagup?.pagupendapatan),
          nilaisblm: (sblm ? parseFloat(sblm?.pendpsebelumnya) : 0) + parseFloat(nilaipseblm),
          nilaisemua: parseFloat(el?.subtotal) + parseFloat(nilaip) + (sblm.length ? parseFloat(sblm?.pendpsebelumnya) : 0),
          selisih: parseFloat(pagup?.pagupendapatan) - (parseFloat(el?.subtotal) + parseFloat(nilaip) + (sblm.length ? parseFloat(sblm?.pendpsebelumnya) : 0)),
          persen: ((parseFloat(el?.subtotal) + parseFloat(nilaip) + (sblm.length ? parseFloat(sblm?.pendpsebelumnya) : 0)) / parseFloat(pagup?.pagupendapatan) * 100).toFixed(2)
        }
        kode6.push(obj1, obj2, obj3, obj4, obj5, obj6)
        kode5.push(obj1, obj2, obj3, obj4, obj5)
        kode4.push(obj1, obj2, obj3, obj4)
        kode3.push(obj1, obj2, obj3)
        kode2.push(obj1, obj2)
        kode1.push(obj1)
      } console.log('PENDAPATAN', kode6)

      const belanja = this.pagubelanjas
      const nilaiskg = this.databelanjas
      const nilaisblm = this.belanjasblm
      console.log('belanja', belanja)
      const belanja6 = []
      const belanja5 = []
      const belanja4 = []
      const belanja3 = []
      const belanja2 = []
      const belanja1 = []

      const fil6 = belanja.map((x) => x.kode6)
      const unik6 = fil6.length ? [...new Set(fil6)] : []
      for (let i = 0; i < unik6.length; i++) {
        const el = unik6[i]
        const obj6 = {
          kode: belanja.filter((x) => x.kode6 === el)[0].kode6,
          uraian: belanja.filter((x) => x.kode6 === el)[0].uraian,
          pagu: belanja.filter((x) => x.kode6 === el).map((x) => parseFloat(x.pagu)).reduce((a, b) => a + b, 0),
          nilaiskg: nilaiskg.filter((x) => x.kode6 === el).map((x) => parseFloat(x.subtotalx)).reduce((a, b) => a + b, 0),
          nilaisblm: nilaisblm.filter((x) => x.kode6 === el).map((x) => parseFloat(x.nilaisebelumnya)).reduce((a, b) => a + b, 0),
          nilaisemua: nilaiskg.filter((x) => x.kode6 === el).map((x) => parseFloat(x.subtotalx)).reduce((a, b) => a + b, 0) + nilaisblm.filter((x) => x.kode6 === el).map((x) => parseFloat(x.nilaisebelumnya)).reduce((a, b) => a + b, 0),
          selisih: belanja.filter((x) => x.kode6 === el).map((x) => parseFloat(x.pagu)).reduce((a, b) => a + b, 0) - (nilaiskg.filter((x) => x.kode6 === el).map((x) => parseFloat(x.subtotalx)).reduce((a, b) => a + b, 0) + nilaisblm.filter((x) => x.kode6 === el).map((x) => parseFloat(x.nilaisebelumnya)).reduce((a, b) => a + b, 0)),
          persen: ((nilaiskg.filter((x) => x.kode6 === el).map((x) => parseFloat(x.subtotalx)).reduce((a, b) => a + b, 0) + nilaisblm.filter((x) => x.kode6 === el).map((x) => parseFloat(x.nilaisebelumnya)).reduce((a, b) => a + b, 0)) / belanja.filter((x) => x.kode6 === el).map((x) => parseFloat(x.pagu)).reduce((a, b) => a + b, 0) * 100).toFixed(2)
        }
        belanja6.push(obj6)
      }

      const fil5 = belanja.map((x) => x.kode5)
      const unik5 = fil5.length ? [...new Set(fil5)] : []
      for (let i = 0; i < unik5.length; i++) {
        const el = unik5[i]
        const obj = {
          kode: belanja.filter((x) => x.kode5 === el)[0].kode5,
          uraian: belanja.filter((x) => x.kode5 === el).map((x) => x.lvl5)[0]?.uraian,
          pagu: belanja.filter((x) => x.kode5 === el)?.map((x) => parseFloat(x.pagu)).reduce((a, b) => a + b, 0),
          nilaiskg: nilaiskg.filter((x) => x.kode5 === el).map((x) => parseFloat(x.subtotalx)).reduce((a, b) => a + b, 0),
          nilaisblm: nilaisblm.filter((x) => x.kode5 === el).map((x) => parseFloat(x.nilaisebelumnya)).reduce((a, b) => a + b, 0),
          nilaisemua: nilaiskg.filter((x) => x.kode5 === el).map((x) => parseFloat(x.subtotalx)).reduce((a, b) => a + b, 0) + nilaisblm.filter((x) => x.kode5 === el).map((x) => parseFloat(x.nilaisebelumnya)).reduce((a, b) => a + b, 0),
          selisih: belanja.filter((x) => x.kode5 === el).map((x) => parseFloat(x.pagu)).reduce((a, b) => a + b, 0) - (nilaiskg.filter((x) => x.kode5 === el).map((x) => parseFloat(x.subtotalx)).reduce((a, b) => a + b, 0) + nilaisblm.filter((x) => x.kode5 === el).map((x) => parseFloat(x.nilaisebelumnya)).reduce((a, b) => a + b, 0)),
          persen: ((nilaiskg.filter((x) => x.kode5 === el).map((x) => parseFloat(x.subtotalx)).reduce((a, b) => a + b, 0) + nilaisblm.filter((x) => x.kode5 === el).map((x) => parseFloat(x.nilaisebelumnya)).reduce((a, b) => a + b, 0)) / belanja.filter((x) => x.kode5 === el).map((x) => parseFloat(x.pagu)).reduce((a, b) => a + b, 0) * 100).toFixed(2)
        }
        belanja5.push(obj)
      }

      const fil4 = belanja.map((x) => x.kode4)
      const unik4 = fil4.length ? [...new Set(fil4)] : []
      for (let i = 0; i < unik4.length; i++) {
        const el = unik4[i]
        const obj = {
          kode: belanja.filter((x) => x.kode4 === el)[0].kode4,
          uraian: belanja.filter((x) => x.kode4 === el).map((x) => x.lvl4)[0]?.uraian,
          pagu: belanja.filter((x) => x.kode4 === el)?.map((x) => parseFloat(x.pagu)).reduce((a, b) => a + b, 0),
          nilaiskg: nilaiskg.filter((x) => x.kode4 === el).map((x) => parseFloat(x.subtotalx)).reduce((a, b) => a + b, 0),
          nilaisblm: nilaisblm.filter((x) => x.kode4 === el).map((x) => parseFloat(x.nilaisebelumnya)).reduce((a, b) => a + b, 0),
          nilaisemua: nilaiskg.filter((x) => x.kode4 === el).map((x) => parseFloat(x.subtotalx)).reduce((a, b) => a + b, 0) + nilaisblm.filter((x) => x.kode4 === el).map((x) => parseFloat(x.nilaisebelumnya)).reduce((a, b) => a + b, 0),
          selisih: belanja.filter((x) => x.kode4 === el).map((x) => parseFloat(x.pagu)).reduce((a, b) => a + b, 0) - (nilaiskg.filter((x) => x.kode4 === el).map((x) => parseFloat(x.subtotalx)).reduce((a, b) => a + b, 0) + nilaisblm.filter((x) => x.kode4 === el).map((x) => parseFloat(x.nilaisebelumnya)).reduce((a, b) => a + b, 0)),
          persen: ((nilaiskg.filter((x) => x.kode4 === el).map((x) => parseFloat(x.subtotalx)).reduce((a, b) => a + b, 0) + nilaisblm.filter((x) => x.kode4 === el).map((x) => parseFloat(x.nilaisebelumnya)).reduce((a, b) => a + b, 0)) / belanja.filter((x) => x.kode4 === el).map((x) => parseFloat(x.pagu)).reduce((a, b) => a + b, 0) * 100).toFixed(2)
        }
        belanja4.push(obj)
      }

      const fil3 = belanja.map((x) => x.kode3)
      const unik3 = fil3.length ? [...new Set(fil3)] : []
      for (let i = 0; i < unik3.length; i++) {
        const el = unik3[i]
        const obj = {
          kode: belanja.filter((x) => x.kode3 === el)[0].kode3,
          uraian: belanja.filter((x) => x.kode3 === el).map((x) => x.lvl3)[0]?.uraian,
          pagu: belanja.filter((x) => x.kode3 === el)?.map((x) => parseFloat(x.pagu)).reduce((a, b) => a + b, 0),
          nilaiskg: nilaiskg.filter((x) => x.kode3 === el).map((x) => parseFloat(x.subtotalx)).reduce((a, b) => a + b, 0),
          nilaisblm: nilaisblm.filter((x) => x.kode3 === el).map((x) => parseFloat(x.nilaisebelumnya)).reduce((a, b) => a + b, 0),
          nilaisemua: nilaiskg.filter((x) => x.kode3 === el).map((x) => parseFloat(x.subtotalx)).reduce((a, b) => a + b, 0) + nilaisblm.filter((x) => x.kode3 === el).map((x) => parseFloat(x.nilaisebelumnya)).reduce((a, b) => a + b, 0),
          selisih: belanja.filter((x) => x.kode3 === el).map((x) => parseFloat(x.pagu)).reduce((a, b) => a + b, 0) - (nilaiskg.filter((x) => x.kode3 === el).map((x) => parseFloat(x.subtotalx)).reduce((a, b) => a + b, 0) + nilaisblm.filter((x) => x.kode3 === el).map((x) => parseFloat(x.nilaisebelumnya)).reduce((a, b) => a + b, 0)),
          persen: ((nilaiskg.filter((x) => x.kode3 === el).map((x) => parseFloat(x.subtotalx)).reduce((a, b) => a + b, 0) + nilaisblm.filter((x) => x.kode3 === el).map((x) => parseFloat(x.nilaisebelumnya)).reduce((a, b) => a + b, 0)) / belanja.filter((x) => x.kode3 === el).map((x) => parseFloat(x.pagu)).reduce((a, b) => a + b, 0) * 100).toFixed(2)
        }
        belanja3.push(obj)
      }

      const fil2 = belanja.map((x) => x.kode2)
      const unik2 = fil2.length ? [...new Set(fil2)] : []
      for (let i = 0; i < unik2.length; i++) {
        const el = unik2[i]
        const obj = {
          kode: belanja.filter((x) => x.kode2 === el)[0].kode2,
          uraian: belanja.filter((x) => x.kode2 === el).map((x) => x.lvl2)[0]?.uraian,
          pagu: belanja.filter((x) => x.kode2 === el)?.map((x) => parseFloat(x.pagu)).reduce((a, b) => a + b, 0),
          nilaiskg: nilaiskg.filter((x) => x.kode2 === el).map((x) => parseFloat(x.subtotalx)).reduce((a, b) => a + b, 0),
          nilaisblm: nilaisblm.filter((x) => x.kode2 === el).map((x) => parseFloat(x.nilaisebelumnya)).reduce((a, b) => a + b, 0),
          nilaisemua: nilaiskg.filter((x) => x.kode2 === el).map((x) => parseFloat(x.subtotalx)).reduce((a, b) => a + b, 0) + nilaisblm.filter((x) => x.kode2 === el).map((x) => parseFloat(x.nilaisebelumnya)).reduce((a, b) => a + b, 0),
          selisih: belanja.filter((x) => x.kode2 === el).map((x) => parseFloat(x.pagu)).reduce((a, b) => a + b, 0) - (nilaiskg.filter((x) => x.kode2 === el).map((x) => parseFloat(x.subtotalx)).reduce((a, b) => a + b, 0) + nilaisblm.filter((x) => x.kode2 === el).map((x) => parseFloat(x.nilaisebelumnya)).reduce((a, b) => a + b, 0)),
          persen: ((nilaiskg.filter((x) => x.kode2 === el).map((x) => parseFloat(x.subtotalx)).reduce((a, b) => a + b, 0) + nilaisblm.filter((x) => x.kode2 === el).map((x) => parseFloat(x.nilaisebelumnya)).reduce((a, b) => a + b, 0)) / belanja.filter((x) => x.kode2 === el).map((x) => parseFloat(x.pagu)).reduce((a, b) => a + b, 0) * 100).toFixed(2)
        }
        belanja2.push(obj)
      }

      const fil1 = belanja.map((x) => x.kode1)
      const unik1 = fil1.length ? [...new Set(fil1)] : []
      for (let i = 0; i < unik1.length; i++) {
        const el = unik1[i]
        const obj = {
          kode: belanja.filter((x) => x.kode1 === el)[0].kode1,
          uraian: belanja.filter((x) => x.kode1 === el).map((x) => x.lvl1)[0]?.uraian,
          pagu: belanja.filter((x) => x.kode1 === el)?.map((x) => parseFloat(x.pagu)).reduce((a, b) => a + b, 0),
          nilaiskg: nilaiskg.filter((x) => x.kode1 === el).map((x) => parseFloat(x.subtotalx)).reduce((a, b) => a + b, 0),
          nilaisblm: nilaisblm.filter((x) => x.kode1 === el).map((x) => parseFloat(x.nilaisebelumnya)).reduce((a, b) => a + b, 0),
          nilaisemua: nilaiskg.filter((x) => x.kode1 === el).map((x) => parseFloat(x.subtotalx)).reduce((a, b) => a + b, 0) + nilaisblm.filter((x) => x.kode1 === el).map((x) => parseFloat(x.nilaisebelumnya)).reduce((a, b) => a + b, 0),
          selisih: belanja.filter((x) => x.kode1 === el).map((x) => parseFloat(x.pagu)).reduce((a, b) => a + b, 0) - (nilaiskg.filter((x) => x.kode1 === el).map((x) => parseFloat(x.subtotalx)).reduce((a, b) => a + b, 0) + nilaisblm.filter((x) => x.kode1 === el).map((x) => parseFloat(x.nilaisebelumnya)).reduce((a, b) => a + b, 0)),
          persen: ((nilaiskg.filter((x) => x.kode1 === el).map((x) => parseFloat(x.subtotalx)).reduce((a, b) => a + b, 0) + nilaisblm.filter((x) => x.kode1 === el).map((x) => parseFloat(x.nilaisebelumnya)).reduce((a, b) => a + b, 0)) / belanja.filter((x) => x.kode1 === el).map((x) => parseFloat(x.pagu)).reduce((a, b) => a + b, 0) * 100).toFixed(2)
        }
        belanja1.push(obj)
      }

      belanja6.push(...belanja1, ...belanja2, ...belanja3, ...belanja4, ...belanja5)
      const sortbelanja6 = (belanja6) =>
        belanja6.sort(({ kode: a }, { kode: b }) =>
          a < b ? -1 : a > b ? 1 : 0
        )
      const level6 = sortbelanja6(belanja6)

      belanja5.push(...belanja1, ...belanja2, ...belanja3, ...belanja4)
      const sortbelanja5 = (belanja5) =>
        belanja5.sort(({ kode: a }, { kode: b }) =>
          a < b ? -1 : a > b ? 1 : 0
        )
      const level5 = sortbelanja5(belanja5)

      belanja4.push(...belanja1, ...belanja2, ...belanja3)
      const sortbelanja4 = (belanja4) =>
        belanja4.sort(({ kode: a }, { kode: b }) =>
          a < b ? -1 : a > b ? 1 : 0
        )
      const level4 = sortbelanja4(belanja4)

      belanja3.push(...belanja1, ...belanja2)
      const sortbelanja3 = (belanja3) =>
        belanja3.sort(({ kode: a }, { kode: b }) =>
          a < b ? -1 : a > b ? 1 : 0
        )
      const level3 = sortbelanja3(belanja3)

      belanja2.push(...belanja1)
      const sortbelanja2 = (belanja2) =>
        belanja2.sort(({ kode: a }, { kode: b }) =>
          a < b ? -1 : a > b ? 1 : 0
        )
      const level2 = sortbelanja2(belanja2)

      const sortbelanja1 = (belanja1) =>
        belanja1.sort(({ kode: a }, { kode: b }) =>
          a < b ? -1 : a > b ? 1 : 0
        )
      const level1 = sortbelanja1(belanja1)

      const pagusilpas = this.pagusilpa
      const silpasblms = this.silpasblm
      const silpaskgs = this.silpaskg
      const silpa6 = []
      const silpa5 = []
      const silpa4 = []
      const silpa3 = []
      const silpa2 = []
      const silpa1 = []
      for (let i = 0; i < pagusilpas.length; i++) {
        const el = pagusilpas[i]
        const sblm = silpasblms[i] ?? 0
        const skg = silpaskgs[i] ?? 0

        const obj6 = {
          kode: el?.kode6,
          uraian: el?.uraian,
          pagu: parseFloat(el?.pagu),
          nilaisblm: sblm ? parseFloat(sblm?.nilaisblm) : 0,
          nilaiskg: skg ? parseFloat(skg?.nilaiskg) : 0,
          nilaisemua: (sblm ? parseFloat(sblm?.nilaisblm) : 0) + (skg ? parseFloat(skg?.nilaiskg) : 0),
          selisih: parseFloat(el?.pagu) - (sblm ? parseFloat(sblm?.nilaisblm) : 0) + (skg ? parseFloat(skg?.nilaiskg) : 0),
          persen: (((sblm ? parseFloat(sblm?.nilaisblm) : 0) + (skg ? parseFloat(skg?.nilaiskg) : 0)) / parseFloat(el?.pagu) * 100).toFixed(2)
        }
        const obj5 = {
          kode: el?.kode5,
          uraian: el?.lvl5?.uraian,
          pagu: parseFloat(el?.pagu),
          nilaisblm: sblm ? parseFloat(sblm?.nilaisblm) : 0,
          nilaiskg: skg ? parseFloat(skg?.nilaiskg) : 0,
          nilaisemua: (sblm ? parseFloat(sblm?.nilaisblm) : 0) + (skg ? parseFloat(skg?.nilaiskg) : 0),
          selisih: parseFloat(el?.pagu) - (sblm ? parseFloat(sblm?.nilaisblm) : 0) + (skg ? parseFloat(skg?.nilaiskg) : 0),
          persen: (((sblm ? parseFloat(sblm?.nilaisblm) : 0) + (skg ? parseFloat(skg?.nilaiskg) : 0)) / parseFloat(el?.pagu) * 100).toFixed(2)
        }
        const obj4 = {
          kode: el?.kode4,
          uraian: el?.lvl4?.uraian,
          pagu: parseFloat(el?.pagu),
          nilaisblm: sblm ? parseFloat(sblm?.nilaisblm) : 0,
          nilaiskg: skg ? parseFloat(skg?.nilaiskg) : 0,
          nilaisemua: (sblm ? parseFloat(sblm?.nilaisblm) : 0) + (skg ? parseFloat(skg?.nilaiskg) : 0),
          selisih: parseFloat(el?.pagu) - (sblm ? parseFloat(sblm?.nilaisblm) : 0) + (skg ? parseFloat(skg?.nilaiskg) : 0),
          persen: (((sblm ? parseFloat(sblm?.nilaisblm) : 0) + (skg ? parseFloat(skg?.nilaiskg) : 0)) / parseFloat(el?.pagu) * 100).toFixed(2)
        }
        const obj3 = {
          kode: el?.kode3,
          uraian: el?.lvl3?.uraian,
          pagu: parseFloat(el?.pagu),
          nilaisblm: sblm ? parseFloat(sblm?.nilaisblm) : 0,
          nilaiskg: skg ? parseFloat(skg?.nilaiskg) : 0,
          nilaisemua: (sblm ? parseFloat(sblm?.nilaisblm) : 0) + (skg ? parseFloat(skg?.nilaiskg) : 0),
          selisih: parseFloat(el?.pagu) - (sblm ? parseFloat(sblm?.nilaisblm) : 0) + (skg ? parseFloat(skg?.nilaiskg) : 0),
          persen: (((sblm ? parseFloat(sblm?.nilaisblm) : 0) + (skg ? parseFloat(skg?.nilaiskg) : 0)) / parseFloat(el?.pagu) * 100).toFixed(2)
        }
        const obj2 = {
          kode: el?.kode2,
          uraian: el?.lvl2?.uraian,
          pagu: parseFloat(el?.pagu),
          nilaisblm: sblm ? parseFloat(sblm?.nilaisblm) : 0,
          nilaiskg: skg ? parseFloat(skg?.nilaiskg) : 0,
          nilaisemua: (sblm ? parseFloat(sblm?.nilaisblm) : 0) + (skg ? parseFloat(skg?.nilaiskg) : 0),
          selisih: parseFloat(el?.pagu) - (sblm ? parseFloat(sblm?.nilaisblm) : 0) + (skg ? parseFloat(skg?.nilaiskg) : 0),
          persen: (((sblm ? parseFloat(sblm?.nilaisblm) : 0) + (skg ? parseFloat(skg?.nilaiskg) : 0)) / parseFloat(el?.pagu) * 100).toFixed(2)
        }
        const obj1 = {
          kode: el?.kode1,
          uraian: el?.lvl1?.uraian,
          pagu: parseFloat(el?.pagu),
          nilaisblm: sblm ? parseFloat(sblm?.nilaisblm) : 0,
          nilaiskg: skg ? parseFloat(skg?.nilaiskg) : 0,
          nilaisemua: (sblm ? parseFloat(sblm?.nilaisblm) : 0) + (skg ? parseFloat(skg?.nilaiskg) : 0),
          selisih: parseFloat(el?.pagu) - (sblm ? parseFloat(sblm?.nilaisblm) : 0) + (skg ? parseFloat(skg?.nilaiskg) : 0),
          persen: (((sblm ? parseFloat(sblm?.nilaisblm) : 0) + (skg ? parseFloat(skg?.nilaiskg) : 0)) / parseFloat(el?.pagu) * 100).toFixed(2)
        }
        silpa6.push(obj1, obj2, obj3, obj4, obj5, obj6)
        silpa5.push(obj1, obj2, obj3, obj4, obj5)
        silpa4.push(obj1, obj2, obj3, obj4)
        silpa3.push(obj1, obj2, obj3)
        silpa2.push(obj1, obj2)
        silpa1.push(obj1)
      } console.log('SILPA', silpa6)

      if (this.reqs.levelberapa === 6) {
        this.hasilpendapatan = kode6
        this.hasilbelanja = level6
        this.hasilsilpa = silpa6
      }
      else if (this.reqs.levelberapa === 5) {
        this.hasilpendapatan = kode5
        this.hasilbelanja = level5
        this.hasilsilpa = silpa5
      }
      else if (this.reqs.levelberapa === 4) {
        this.hasilpendapatan = kode4
        this.hasilbelanja = level4
        this.hasilsilpa = silpa4
      }
      else if (this.reqs.levelberapa === 3) {
        this.hasilpendapatan = kode3
        this.hasilbelanja = level3
        this.hasilsilpa = silpa3
      }
      else if (this.reqs.levelberapa === 2) {
        this.hasilpendapatan = kode2
        this.hasilbelanja = level2
        this.hasilsilpa = silpa2
      }
      else {
        this.hasilpendapatan = kode1
        this.hasilbelanja = level1
        this.hasilsilpa = silpa1
      }
    }
  }
})
