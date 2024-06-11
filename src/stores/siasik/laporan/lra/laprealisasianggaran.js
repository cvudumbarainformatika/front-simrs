/* eslint-disable space-before-function-paren */
import { defineStore } from 'pinia'
import { date } from 'quasar'
import { api } from 'src/boot/axios'

export const useLaporanLraLaprealisasianggaranStore = defineStore('laporan_realisasi_anggaran', {
  state: () => ({
    loading: false,
    items: [],
    meta: {},
    params: {
      q: '',
      page: 1,
      tgl: date.formatDate(Date.now(), 'YYYY-MM-01'),
      tglx: date.formatDate(Date.now(), 'YYYY-MM-DD'),
      tahun: date.formatDate(Date.now(), 'YYYY'),
      bidang: '',
      kegiatan: ''
    },
    bidangs: [],
    paguAnggaran: [],
    mapRekening: []
    // kegiatans: []

  }),
  actions: {
    setParam (key, val) {
      this.params[key] = val
    },
    setForm(key, val) {
      this.params[key] = val
    },
    emptyForm() {
      this.params.bidang = {}
      this.params.kegiatan = {}
    },

    // eslint-disable-next-line space-before-function-paren
    getDataBidang() {
      this.loading = true
      return new Promise((resolve) => {
        api.get('v1/laporan/lra/bidang').then((resp) => {
          console.log('bidang', resp)
          if (resp.status === 200) {
            this.bidangs = resp.data
            this.loading = false
            const data = this.bidangs === resp.data
            const bid = data.reduce((acc, curr) => {
              const kodesama = acc.find(x => x.kodebidang === curr.kodebidang)
              if (!kodesama) {
                acc.push(curr)
              }
              return acc
            }, [])
            // const bid = [...new Set(this.bidangs?.map(x => x.kodebidang))]
            // const unique = Object.groupBy(bid, (obj) => obj.kodebidang)
            console.log('cc', bid)
            resolve(resp)
          }
        }).catch(() => { this.loading = false })
      })
    },
    // getBidang() {
    //   this.getDataBidang()
    // },

    getDataRealisasi() {
      this.loading = true
      const params = { params: this.params }
      return new Promise(resolve => {
        api.get('v1/laporan/lra/laplra', params).then(resp => {
          console.log('realisasi', resp)
          if (resp.status === 200) {
            this.items = []
            // this.items = resp.data
            this.paguAnggaran(resp.data.data)
            this.mapRekening(resp.data)
            this.loading = false
            resolve(resp)
          }
        }).catch(() => { this.loading = false })
      })
    },

    paguAnggaran (val) {
      // this.items = []
      // const Anggaran = []
      for (let i = 0; i < val?.length; i++) {
        const el = val[i].anggaran
        const ls = val[i].npdls_rinci
        const pjr = val[i].spjpanjar
        const cp = val[i].cp
        // const pagu = {
        //   totalPagu: el.map((x) => parseInt(x.pagu)).reduce((a, b) => a + b, 0)
        // }
        val[i].totalPagu = el.map((x) => parseInt(x.pagu)).reduce((a, b) => a + b, 0)
        val[i].sumLS = ls.map((x) => parseInt(x.nominalpembayaran)).reduce((a, b) => a + b, 0)
        val[i].sumPanjar = pjr.map((x) => parseInt(x.jumlahbelanjapanjar)).reduce((a, b) => a + b, 0)
        val[i].sumCP = cp.map((x) => parseInt(x.nominalcontrapost)).reduce((a, b) => a + b, 0)
        val[i].totalRealisasi = val[i].sumLS + val[i].sumPanjar - val[i].sumCP
        // console.log('xxxx', pagu)
        // Anggaran.push(pagu)
        // this.items = pagu
        this.items = val
      }
      // val = Anggaran
      // console.log('paguuuu', val)
      // return this.items
    },
    mapRekening (val) {
      const pagu = this.items.map((x) => x.totalPagu)
      const real = this.items.map((x) => x.totalRealisasi)
      const all = {
        kodeall3: this.items?.map((x) => x.akun).reduce((a, b) => {
          if (!a.includes(b)) {
            a.push(b)
          }
          return a
        }),
        uraian: 'BELANJA DAERAH',
        totalPagu: pagu.reduce((a, b) => a + b, 0),
        totalRealisasi: real.reduce((a, b) => a + b, 0)
      }

      // const kode2 = {
      //   kodeall3: this.items?.map((x) => x.akun + '.' + x.kelompok).reduce((a, b) => {
      //     if (!a.includes(b)) {
      //       a.push(b)
      //     }
      //     return a
      //   }),
      //   uraian: 'BELANJA gg',
      //   totalPagu: 0,
      //   totalRealisasi: 0
      // }

      const kode = this.items?.map((x) => x.akun + '.' + x.kelompok)
      const kelm = kode.reduce((a, b) => {
        if (!a.includes(b)) {
          a.push(b)
        }
        return a
      }, [])
      const kode2 = []
      for (let i = 0; i < kelm?.length; i++) {
        const kodkelompok = {
          kodeall3: kelm[i],
          totalPagu: 0,
          totalRealisasi: 0
        }
        kode2.push(kodkelompok)
      }

      const kod = this.items?.map((x) => x.akun + '.' + x.kelompok + '.' + x.jenis)
      const jns = kod.reduce((a, b) => {
        if (!a.includes(b)) {
          a.push(b)
        }
        return a
      }, [])
      const kode3 = []
      for (let i = 0; i < jns?.length; i++) {
        const kodkelompok = {
          kodeall3: jns[i],
          totalPagu: 0,
          totalRealisasi: 0
        }
        kode3.push(kodkelompok)
      }
      this.items?.push(all, kode2, kode3)
    },

    ambilDataUnik (x, f) {
      // eslint-disable-next-line no-sequences
      const unique = Object.values(x.reduce((a, b) => ((a[f(b)] = b), a), {}))
      return unique
    },
    totalAnggaran (arr) {
      return arr
        .map((x) => x.pagu)
        .reduce((x, y) => parseInt(x) + parseInt(y), 0)
    }

  }
})
