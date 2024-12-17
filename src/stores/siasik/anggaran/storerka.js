import { defineStore } from 'pinia'
// eslint-disable-next-line no-unused-vars
import { date } from 'quasar'
import { api } from 'src/boot/axios'

export const useRkaStore = defineStore('store_rka_siasik', {
  state: () => ({
    loading: false,
    reqs: {
      q: '',
      bidang: '',
      kegiatan: '',
      tahun: '',
      kodebidang: null
    },
    display: {
      sekarang: date.formatDate(Date.now(), 'DD MMMM YYYY'),
      tahunsekarang: date.formatDate(Date.now(), 'YYYY')
    },
    dialogCetak: false,
    mapbidangptk: [],
    bidangs: [],
    kegiatans: [],
    ptks: [],

    kegiatanblud: '',

    totalPagukegiatan: [],
    dataanggaran: [],
    datarka: [],

    capaiankegiatan: '',
    targetcapaian: '',
    masukan: '',
    targetmasukan: '',
    keluaran: '',
    targetkeluaran: '',
    hasil: '',
    targethasil: ''
  }),
  actions: {
    setParameter (key, val) {
      this.reqs[key] = val
    },
    setForm (key, val) {
      this.reqs[key] = val
    },
    emptyForm () {
      // this.reqs.bidang = ''
      this.reqs.kegiatan = ''
    },
    getDataBidang () {
      this.loading = true
      const params = { params: this.reqs }
      return new Promise((resolve) => {
        api.get('v1/siasik/anggaran/getbidangkegiatan', params).then((resp) => {
          // console.log('bidang', resp)
          if (resp.status === 200) {
            this.mapbidangptk = resp.data
            // this.bidangs = resp.data
            // this.kegiatans = resp.data
            // this.ptks = resp.data
            this.loading = false
            this.filterBidang()
            this.filterKegiatan()
            this.filterPtk()
            resolve(resp)
          }
        }).catch(() => { this.loading = false })
      })
    },
    filterBidang () {
      const data = this.mapbidangptk?.length
        ? this.mapbidangptk?.map((x) => {
          return {
            kodebidang: x.kodebidang,
            bidang: x.bidang
          }
        })
        : []
      const bid = data.reduce((acc, curr) => {
        const kodesama = acc.find(x => x.kodebidang === curr.kodebidang)
        if (!kodesama) {
          acc.push(curr)
        }
        return acc
      }, [])
      this.bidangs = bid
      // console.log('bidangfilt', this.params.bidang)
    },
    filterPtk () {
      const data = this.mapbidangptk?.length
        ? this.mapbidangptk?.map((x) => {
          return {
            nip: x.kodepptk,
            nama: x.namapptk,
            kodeBagian: x.kodebidang,
            bagian: x.bidang
          }
        })
        : []
      const ptk = data.reduce((acc, curr) => {
        const kodesama = acc.find(x => x.nip === curr.nip)
        if (!kodesama) {
          acc.push(curr)
        }
        return acc
      }, [])
      this.ptks = ptk
      // console.log('pptk', this.ptks)
    },
    filterKegiatan () {
      const data = this.mapbidangptk?.length
        ? this.mapbidangptk?.filter(x =>
          x.kodebidang === this.reqs.kodebidang
        )
        : []
      this.kegiatans = data
      console.log('kegiatans', this.kegiatans)
    },
    getAnggaran () {
      this.loading = true
      const params = { params: this.reqs }
      return new Promise((resolve) => {
        api.get('v1/siasik/anggaran/getanggaran', params).then((resp) => {
          console.log('Data Anggaran', resp)
          if (resp.status === 200) {
            this.dataanggaran = resp.data
            // this.bidangs = resp.data
            // this.kegiatans = resp.data
            // this.ptks = resp.data
            this.mapingData()
            this.loading = false
            resolve(resp)
          }
        }).catch(() => { this.loading = false })
      })
    },
    mapingData () {
      const rka = []
      const totalrka = []
      const uniq1 = this.dataanggaran.map((x) => x.kode1)
      const fils1 = uniq1.length ? [...new Set(uniq1)] : []
      for (let i = 0; i < fils1.length; i++) {
        const el = fils1[i]
        const obj = {
          kode: this.dataanggaran.filter((x) => x.kode1 === el)[0].kode1,
          uraian: this.dataanggaran.filter((x) => x.kode1 === el).map((x) => x.lvl1)[0]?.uraian,
          pagu: this.dataanggaran.filter((x) => x.kode1 === el).map((x) => parseFloat(x.pagu)).reduce((a, b) => a + b, 0),
          rincian: []
        }
        rka.push(obj)
        totalrka.push(obj)
      }
      console.log('totalpagukegiatan', totalrka)
      const uniq2 = this.dataanggaran.map((x) => x.kode2)
      const fils2 = uniq2.length ? [...new Set(uniq2)] : []
      for (let i = 0; i < fils2.length; i++) {
        const el = fils2[i]
        const obj = {
          kode: this.dataanggaran.filter((x) => x.kode2 === el)[0].kode2,
          uraian: this.dataanggaran.filter((x) => x.kode2 === el).map((x) => x.lvl2)[0]?.uraian,
          pagu: this.dataanggaran.filter((x) => x.kode2 === el).map((x) => parseFloat(x.pagu)).reduce((a, b) => a + b, 0),
          rincian: []
        }
        rka.push(obj)
      }
      const uniq3 = this.dataanggaran.map((x) => x.kode3)
      const fils3 = uniq3.length ? [...new Set(uniq3)] : []
      for (let i = 0; i < fils3.length; i++) {
        const el = fils3[i]
        const obj = {
          kode: this.dataanggaran.filter((x) => x.kode3 === el)[0].kode3,
          uraian: this.dataanggaran.filter((x) => x.kode3 === el).map((x) => x.lvl3)[0]?.uraian,
          pagu: this.dataanggaran.filter((x) => x.kode3 === el).map((x) => parseFloat(x.pagu)).reduce((a, b) => a + b, 0),
          rincian: []
        }
        rka.push(obj)
      }
      const uniq4 = this.dataanggaran.map((x) => x.kode4)
      const fils4 = uniq4.length ? [...new Set(uniq4)] : []
      for (let i = 0; i < fils4.length; i++) {
        const el = fils4[i]
        const obj = {
          kode: this.dataanggaran.filter((x) => x.kode4 === el)[0].kode4,
          uraian: this.dataanggaran.filter((x) => x.kode4 === el).map((x) => x.lvl4)[0]?.uraian,
          pagu: this.dataanggaran.filter((x) => x.kode4 === el).map((x) => parseFloat(x.pagu)).reduce((a, b) => a + b, 0),
          rincian: []
        }
        rka.push(obj)
      }
      const uniq5 = this.dataanggaran.map((x) => x.kode5)
      const fils5 = uniq5.length ? [...new Set(uniq5)] : []
      for (let i = 0; i < fils5.length; i++) {
        const el = fils5[i]
        const obj = {
          kode: this.dataanggaran.filter((x) => x.kode5 === el)[0].kode5,
          uraian: this.dataanggaran.filter((x) => x.kode5 === el).map((x) => x.lvl5)[0]?.uraian,
          pagu: this.dataanggaran.filter((x) => x.kode5 === el).map((x) => parseFloat(x.pagu)).reduce((a, b) => a + b, 0),
          rincian: []
        }
        rka.push(obj)
      }
      const uniq6 = this.dataanggaran.map((x) => x.kode)
      const fils6 = uniq6.length ? [...new Set(uniq6)] : []
      for (let i = 0; i < fils6.length; i++) {
        const el = fils6[i]
        const obj = {
          kode: this.dataanggaran.filter((x) => x.kode === el)[0].kode,
          uraian: this.dataanggaran.filter((x) => x.kode === el)[0].uraian,
          pagu: this.dataanggaran.filter((x) => x.kode === el).map((x) => parseFloat(x.pagu)).reduce((a, b) => a + b, 0),
          rincian: this.dataanggaran.filter((x) => x.kode === el).map((x) => {
            return {
              kode108: x.koderek108,
              usulan: x.usulan,
              volume: x.volume,
              harga: x.harga,
              satuan: x.satuan,
              pagu: x.pagu
            }
          })
        }
        rka.push(obj)
      }

      const sortAnggaran = (rka) =>
        rka.sort(({ kode: a }, { kode: b }) =>
          a < b ? -1 : a > b ? 1 : 0
        )
      const dataRKA = sortAnggaran(rka)
      this.datarka = dataRKA
      console.log('DATA RKA', this.datarka)

      this.totalPagukegiatan = totalrka
    }
  }
})
