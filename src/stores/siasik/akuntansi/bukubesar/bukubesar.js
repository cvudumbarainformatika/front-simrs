/* eslint-disable no-unused-vars */
import { defineStore } from 'pinia'
import { date } from 'quasar'
import { api } from 'src/boot/axios'

export const useBukubesarStore = defineStore('Buku_besarakuntansi', {
  state: () => ({
    loading: false,
    reqs: {
      q: '',
      tgl: date.formatDate(Date.now(), 'YYYY-MM-DD'),
      tglx: date.formatDate(Date.now(), 'YYYY-MM-DD'),
      tahun: date.formatDate(Date.now(), 'YYYY'),
      levelberapa: '',
      rekenings: ''

    },
    display: {
      dari: date.formatDate(Date.now(), 'DD MMMM YYYY'),
      sampai: date.formatDate(Date.now(), 'DD MMMM YYYY'),
      sekarang: date.formatDate(Date.now(), 'DD MMMM YYYY')
    },
    akuns: {
      q: '',
      kode1: '',
      kode2: '',
      kode3: '',
      kode4: '',
      kode5: '',
      kode6: ''
    },
    form: {
      uraian: null,
      kode: null
    },
    reqlevels: null,
    level: [
      { nama: 'Akun', value: '1' },
      { nama: 'Kelompok', value: '2' },
      { nama: 'Jenis', value: '3' },
      { nama: 'Objek', value: '4' },
      { nama: 'Rincian Objek', value: '5' },
      { nama: 'SubRincian Objek', value: '6' }
    ],
    level1: [],
    level2: [],
    level3: [],
    level4: [],
    level5: [],
    level6: [],
    jurnalotoms: [],
    jurnalmanuals: [],
    alljurnal: [],
    hasilmapsLevel6: [],
    hasilmapsLevel5: [],
    hasilmapsLevel1: []
  }),
  actions: {
    setParameter (key, val) {
      this.reqs[key] = val
    },
    setFormRekening (key, val) {
      this.form[key] = val
    },
    getAkun () {
      this.loading = true
      const params = { params: this.reqs }
      return new Promise((resolve) => {
        api.get('v1/akuntansi/bukubesar/akun', params).then((resp) => {
          console.log('getakuns', resp.data)
          if (resp.status === 200) {
            this.level1 = []
            this.level2 = []

            this.level1 = resp.data.level1
            this.level2 = resp.data.level2
            this.level3 = resp.data.level3
            this.level4 = resp.data.level4
            this.level5 = resp.data.level5
            this.level6 = resp.data.level6
            this.loading = false

            resolve(resp.data)
          }
        }).catch(() => { this.loading = false })
      })
    },
    setLevel (val) {
      this.reqs.levelberapa = val
    },

    setRekening (val) {
      const rek = this.reqs.levelberapa
      // request untuk hasil bukubesar
      console.log('setRekening', rek)
    },
    getDataBukubesar () {
      this.loading = true
      const params = { params: this.reqs }
      return new Promise((resolve) => {
        api.get('v1/akuntansi/bukubesar/getbukubesar', params).then((resp) => {
          console.log('getBUKUbesar', resp.data)
          if (resp.status === 200) {
            this.jurnalotoms = resp.data.jurnalotom
            this.jurnalmanuals = resp.data.jurnalmanual
            // this.filterHasilMaps()
            this.mapBukubesar()
            this.loading = false
            resolve(resp)
          }
        }).catch(() => { this.loading = false })
      })
    },
    mapBukubesar () {
      const arr = []
      const buku6 = []
      const buku5 = []
      const buku4 = []
      const buku3 = []
      const buku2 = []
      const buku1 = []
      const arrotom = this.jurnalotoms
      const arrmanual = this.jurnalmanuals
      arr.push(...arrotom, ...arrmanual)
      this.alljurnal = arr
      console.log('arr all', this.alljurnal)
      const kode6 = []
      for (let z = 0; z < arr.length; z++) {
        const el = arr[z]
        const obj = {
          tanggal: el?.tanggal,
          notrans: el?.notrans,
          kodereqs: el?.kode6,
          kode: el?.kode6,
          kegiatan: el?.kegiatan,
          keterangan: el?.keterangan,
          debit: parseFloat(el?.debit),
          kredit: parseFloat(el?.kredit)
        }
        kode6.push(obj)
      }
      console.log('kode6', kode6)

      const kode5 = []
      const unik5 = this.alljurnal.map((x) => x.notrans)
      const set5 = unik5.length ? [...new Set(unik5)] : []
      for (let z = 0; z < set5.length; z++) {
        const el = set5[z]
        const arrs = this.alljurnal
        const filters = arrs.filter((x) => x.notrans === el).map((x) => x)
        // console.log('kkkk', filters)

        const unikkode = filters.map((x) => x.kode6)
        const setunik = unikkode.length ? [...new Set(unikkode)] : []
        const unikarr = []
        for (let a = 0; a < setunik.length; a++) {
          const el = setunik[a]
          const er = filters
          const obj = {
            tanggal: er?.filter((x) => x.kode6 === el)[0].tanggal,
            kodereqs: er?.filter((x) => x.kode6 === el)[0]?.kode5,
            kode: er?.filter((x) => x.kode6 === el)[0]?.kode6,
            uraian: er?.filter((x) => x.kode6 === el)[0]?.uraian,
            debit: er?.filter((x) => x.kode6 === el)?.map((x) => parseFloat(x.debit)).reduce((a, b) => a + b, 0),
            kredit: er?.filter((x) => x.kode6 === el)?.map((x) => parseFloat(x.kredit)).reduce((a, b) => a + b, 0)
          }
          unikarr.push(obj)
        }
        kode5.push(...unikarr)
      }
      // console.log('kode5', kode5)

      const kode4 = []
      const unik4 = this.alljurnal.map((x) => x.notrans)
      const set4 = unik4.length ? [...new Set(unik4)] : []
      for (let z = 0; z < set4.length; z++) {
        const el = set4[z]
        const arrs = this.alljurnal
        const filters = arrs.filter((x) => x.notrans === el).map((x) => x)
        // console.log('kkkk', filters)
        const unikkode = filters.map((x) => x.kode6)
        const setunik = unikkode.length ? [...new Set(unikkode)] : []
        const unikarr = []
        for (let a = 0; a < setunik.length; a++) {
          const el = setunik[a]
          const er = filters
          const obj = {
            tanggal: er?.filter((x) => x.kode6 === el)[0].tanggal,
            kodereqs: er?.filter((x) => x.kode6 === el)[0]?.kode4,
            kode: er?.filter((x) => x.kode6 === el)[0]?.kode5,
            uraian: er?.filter((x) => x.kode6 === el).map((x) => x.lvl5)[0]?.uraian,
            debit: er?.filter((x) => x.kode6 === el)?.map((x) => parseFloat(x.debit)).reduce((a, b) => a + b, 0),
            kredit: er?.filter((x) => x.kode6 === el)?.map((x) => parseFloat(x.kredit)).reduce((a, b) => a + b, 0)
          }
          unikarr.push(obj)
        }
        kode5.push(...unikarr)
      }
      const kode3 = []
      const unik3 = this.alljurnal.map((x) => x.notrans)
      const set3 = unik3.length ? [...new Set(unik3)] : []
      for (let z = 0; z < set3.length; z++) {
        const el = set3[z]
        const arrs = this.alljurnal
        const filters = arrs.filter((x) => x.notrans === el).map((x) => x)
        // console.log('kkkk', filters)
        const unikkode = filters.map((x) => x.kode6)
        const setunik = unikkode.length ? [...new Set(unikkode)] : []
        const unikarr = []
        for (let a = 0; a < setunik.length; a++) {
          const el = setunik[a]
          const er = filters
          const obj = {
            tanggal: er?.filter((x) => x.kode6 === el)[0].tanggal,
            kodereqs: er?.filter((x) => x.kode6 === el)[0]?.kode3,
            kode: er?.filter((x) => x.kode6 === el)[0]?.kode4,
            uraian: er?.filter((x) => x.kode6 === el).map((x) => x.lvl4)[0]?.uraian,
            debit: er?.filter((x) => x.kode6 === el)?.map((x) => parseFloat(x.debit)).reduce((a, b) => a + b, 0),
            kredit: er?.filter((x) => x.kode6 === el)?.map((x) => parseFloat(x.kredit)).reduce((a, b) => a + b, 0)
          }
          unikarr.push(obj)
        }
        kode5.push(...unikarr)
      }
      const kode2 = []
      const unik2 = this.alljurnal.map((x) => x.notrans)
      const set2 = unik2.length ? [...new Set(unik2)] : []
      for (let z = 0; z < set2.length; z++) {
        const el = set2[z]
        const arrs = this.alljurnal
        const filters = arrs.filter((x) => x.notrans === el).map((x) => x)
        // console.log('kkkk', filters)
        const unikkode = filters.map((x) => x.kode6)
        const setunik = unikkode.length ? [...new Set(unikkode)] : []
        const unikarr = []
        for (let a = 0; a < setunik.length; a++) {
          const el = setunik[a]
          const er = filters
          const obj = {
            tanggal: er?.filter((x) => x.kode6 === el)[0].tanggal,
            kodereqs: er?.filter((x) => x.kode6 === el)[0]?.kode2,
            kode: er?.filter((x) => x.kode6 === el)[0]?.kode3,
            uraian: er?.filter((x) => x.kode6 === el).map((x) => x.lvl3)[0]?.uraian,
            debit: er?.filter((x) => x.kode6 === el)?.map((x) => parseFloat(x.debit)).reduce((a, b) => a + b, 0),
            kredit: er?.filter((x) => x.kode6 === el)?.map((x) => parseFloat(x.kredit)).reduce((a, b) => a + b, 0)
          }
          unikarr.push(obj)
        }
        kode5.push(...unikarr)
      }
      const kode1 = []
      const unik1 = this.alljurnal.map((x) => x.notrans)
      const set1 = unik1.length ? [...new Set(unik1)] : []
      for (let z = 0; z < set1.length; z++) {
        const el = set1[z]
        const arrs = this.alljurnal
        const filters = arrs.filter((x) => x.notrans === el).map((x) => x)
        // console.log('kkkk', filters)
        const unikkode = filters.map((x) => x.kode6)
        const setunik = unikkode.length ? [...new Set(unikkode)] : []
        const unikarr = []
        for (let a = 0; a < setunik.length; a++) {
          const el = setunik[a]
          const er = filters
          const obj = {
            tanggal: er?.filter((x) => x.kode6 === el)[0].tanggal,
            kodereqs: er?.filter((x) => x.kode6 === el)[0]?.kode2,
            kode: er?.filter((x) => x.kode6 === el)[0]?.kode1,
            uraian: er?.filter((x) => x.kode6 === el).map((x) => x.lvl1)[0]?.uraian,
            debit: er?.filter((x) => x.kode6 === el)?.map((x) => parseFloat(x.debit)).reduce((a, b) => a + b, 0),
            kredit: er?.filter((x) => x.kode6 === el)?.map((x) => parseFloat(x.kredit)).reduce((a, b) => a + b, 0)
          }
          unikarr.push(obj)
        }
        kode1.push(...unikarr)
      }
      buku6.push(...kode6)
      const filter6 = buku6.filter(x => x.kodereqs === this.reqs.rekenings)
      const sortByDate = (filter6) =>
        filter6.sort(({ tanggal: a }, { tanggal: b }) =>
          a < b ? -1 : a > b ? 1 : 0
        )
      const arrJurnal = sortByDate(filter6)
      this.hasilmapsLevel6 = this.hasilMapssaldo(arrJurnal)
      console.log('HASIL LVL 6', this.hasilmapsLevel6)

      buku5.push(...kode5)
      // console.log('reksss', buku5)
      const filter5 = buku5.filter(x => x.kodereqs === this.reqs.rekenings)
      const filterunik5 = filter5.map((x) => x.kodereqs)
      const setfil5 = filterunik5.length ? [...new Set(filterunik5)] : []
      const setakhir5 = []
      for (let x = 0; x < setfil5.length; x++) {
        const el = setfil5[x]
        const es = filter5
        const obj = {
          kodereqs: es.filter((q) => q.kodereqs === el)[0]?.kodereqs,
          kode: es.filter((q) => q.kodereqs === el)[0]?.kode,
          uraian: es.filter((q) => q.kodereqs === el)[0]?.uraian,
          debit: es.filter((q) => q.kodereqs === el).map((x) => parseFloat(x.debit)).reduce((a, b) => a + b, 0),
          kredit: es.filter((q) => q.kodereqs === el).map((x) => parseFloat(x.kredit)).reduce((a, b) => a + b, 0)
        }
        setakhir5.push(obj)
      }
      console.log('filter5', setakhir5)
      const sortByDate5 = (setakhir5) =>
        setakhir5.sort(({ kode: a }, { kode: b }) =>
          a < b ? -1 : a > b ? 1 : 0
        )
      const arrJurnal5 = sortByDate5(setakhir5)
      this.hasilmapsLevel5 = this.hasilMapssaldo(arrJurnal5)
      console.log('HASIL LVL 5', this.hasilmapsLevel5)

      buku1.push(...kode1)
      console.log('buku1', buku1)
      // const filter1 = buku1.filter(x => x.kodereqs === this.reqs.rekenings)
      const filterunik1 = buku1.map((x) => x.kode)
      const setfil1 = filterunik1.length ? [...new Set(filterunik1)] : []
      const setakhir1 = []
      for (let x = 0; x < setfil1.length; x++) {
        const el = setfil1[x]
        const es = buku1
        const obj = {
          kodereqs: es.filter((q) => q.kode === el)[0]?.kodereqs,
          kode: es.filter((q) => q.kode === el)[0]?.kode,
          uraian: es.filter((q) => q.kode === el)[0]?.uraian,
          debit: es.filter((q) => q.kode === el).map((x) => parseFloat(x.debit)).reduce((a, b) => a + b, 0),
          kredit: es.filter((q) => q.kode === el).map((x) => parseFloat(x.kredit)).reduce((a, b) => a + b, 0)
        }
        setakhir1.push(obj)
      }
      // console.log('filter5', setakhir1)
      const sortByDate1 = (setakhir1) =>
        setakhir1.sort(({ kode: a }, { kode: b }) =>
          a < b ? -1 : a > b ? 1 : 0
        )
      const arrJurnal1 = sortByDate1(setakhir1)
      this.hasilmapsLevel1 = this.hasilMapssaldo(arrJurnal1)
      console.log('HASIL LVL 1', this.hasilmapsLevel1)
    },
    hasilMapssaldo (arr) {
      let total = 0
      if (arr.length) {
        for (let i = 0; i < arr.length; i++) {
          if (i === 0) {
            total = arr[0]?.debit - arr[0]?.kredit
            arr[0].total = total
          }
          else {
            const hinggaKeIndex = i + 1
            const arrBaru = arr.slice(1, hinggaKeIndex)
            const awal = arr[0]?.debit - arr[0]?.kredit
            const obj = arrBaru.map((x) => x.debit - x.kredit)
            const skrg = obj?.reduce((a, b) => a + b, 0)
            arr[i].total = awal + skrg
          }
        }
      }
      return arr
    }

    // filterRekening () {
    //   const data = this.hasilmaps?.length
    //     ? this.hasilmaps?.filter(x =>
    //       x.kode === this.reqs.rekenings
    //     )
    //     : []
    //   // console.log('dataaax', data)
    //   this.filterHasilMaps = data
    //   console.log('ddd', this.filterHasilMaps)
    // }
  }
})
