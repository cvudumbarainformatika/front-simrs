/* eslint-disable no-unused-vars */
import { defineStore } from 'pinia'
import { date } from 'quasar'
import { api } from 'src/boot/axios'

export const useBukubesarStore = defineStore('Buku_besarakuntansi', {
  state: () => ({
    loading: false,
    dialogCetak: false,
    exportExcel: false,
    loadingDownload: false,
    reqs: {
      q: '',
      page: 1,
      per_page: 50,
      tgl: date.formatDate(Date.now(), 'YYYY-MM-DD'),
      tglx: date.formatDate(Date.now(), 'YYYY-MM-DD'),
      tahun: date.formatDate(Date.now(), 'YYYY'),
      levelberapa: '',
      rekenings: '',
      uraian: ''

    },
    display: {
      dari: date.formatDate(Date.now(), 'DD MMMM YYYY'),
      sampai: date.formatDate(Date.now(), 'DD MMMM YYYY'),
      sekarang: date.formatDate(Date.now(), 'DD MMMM YYYY')
    },
    form: {
      uraian: null,
      kode: null
    },
    reqlevels: null,
    level: [
      { nama: 'Akun', value: '0' },
      { nama: 'Kelompok', value: '3' },
      { nama: 'Jenis', value: '6' },
      { nama: 'Objek', value: '9' },
      { nama: 'Rincian Objek', value: '12' },
      { nama: 'SubRincian Objek', value: '17' }
    ],
    ttd: [],
    optionrekening: [],
    // DATA AWAL JURNAL//
    jurnalotoms: [],
    jurnalmanuals: [],
    alljurnal: [],
    saldoawal: [],

    // HASIL MAPING //
    hasilmapsLevel6: [],
    hasilmapsLevel5: [],
    hasilmapsLevel1: [],
    hasilSal6: [],
    hasilSal5: [],
    hasilSal1: [],
    // REKENING //
    alllevel: [],

    // DATA SALDOSEBELUMNYA
    salotom: [],
    salmanual: [],
    salsebelum: [],
    hasilbukuBesar: [],

    allsaldosebelum: [],
    fields: {}
  }),
  actions: {
    setParameter (key, val) {
      this.reqs[key] = val
    },
    setFormRekening (key, val) {
      this.form[key] = val
    },
    setPerPage (payload) {
      this.reqs.per_page = payload
      this.reqs.page = 1
      this.getAkun()
    },
    getAkun () {
      this.loading = true
      const params = { params: this.reqs }
      return new Promise((resolve) => {
        api.get('v1/akuntansi/bukubesar/akun', params).then((resp) => {
          console.log('getakuns', resp.data)
          if (resp.status === 200) {
            this.alllevel = []
            this.alllevel = resp.data

            this.loading = false

            resolve(resp.data)
          }
        }).catch(() => { this.loading = false })
      })
    },
    getTtd () {
      this.loading = true
      return new Promise((resolve) => {
        api.get('v1/akuntansi/bukubesar/getpa').then((resp) => {
          console.log('tandatangan', resp.data)
          if (resp.status === 200) {
            this.ttd = resp.data
            this.loading = false

            resolve(resp.data)
          }
        }).catch(() => { this.loading = false })
      })
    },
    setField () {
      if (this.params.jenis === 'rekap') {
        this.fields = {
          Kode: 'kode',
          Uraian: 'uraian',
          Debit: 'debit',
          Kredit: 'kredit',
          Saldo: 'total'
        }
      }
      else {
        this.fields = {
          Tanggal: 'tanggal',
          Nobukti: 'notrans',
          Uraian: 'uraian',
          Debit: 'debit',
          Kredit: 'kredit',
          Saldo: 'total',
          'Keterangan ': 'keterangan',
          'Kegiatan ': 'keterangan'
        }
      }
    },
    startDownload () { this.loadingDownload = true },
    finishDownload () { this.loadingDownload = false },
    getDataBukubesar () {
      this.loading = true
      const params = { params: this.reqs }
      return new Promise((resolve) => {
        api.get('v1/akuntansi/bukubesar/getbukubesar', params).then((resp) => {
          console.log('getBUKUbesar', resp?.data)
          if (resp.status === 200) {
            this.jurnalotoms = resp?.data?.jurnalotom
            this.jurnalmanuals = resp?.data?.jurnalmanual
            this.saldoawal = resp?.data?.saldoawal
            this.salotom = resp?.data?.sajurnalotom
            this.salmanual = resp?.data?.sajurnalmanual
            this.salsebelum = resp?.data?.saldosebelum
            // this.filterHasilMaps()
            this.hasilmapsLevel6 = []
            this.hasilmapsLevel5 = []
            this.hasilmapsLevel1 = []
            this.NilaiSebelumnya()
            this.mapBukubesar()

            this.loading = false
            resolve(resp)
          }
        }).catch(() => { this.loading = false })
      })
    },
    NilaiSebelumnya () {
      const arr = []
      const buku6 = []
      const buku5 = []
      const bukuSaldo5 = []
      const arrotom = this.salotom
      const arrmanual = this.salmanual
      const arrsaldoawal = this.salsebelum
      arr.push(...arrotom, ...arrmanual, ...arrsaldoawal)
      this.allsaldosebelum = arr
      // SALDO AWAL ALL//
      const kode6 = []
      for (let z = 0; z < arr.length; z++) {
        const el = arr[z]
        const obj = {
          tanggal: el?.tanggal,
          notrans: '',
          kodereqs: el?.kode6,
          kode: el?.kode6,
          kegiatan: 'SALDO AWAL PERIODE',
          keterangan: '',
          debit: parseFloat(el?.debit),
          kredit: parseFloat(el?.kredit)
        }
        kode6.push(obj)
      }
      const kode5 = []
      const unik5 = this.allsaldosebelum.map((x) => x.notrans)
      const set5 = unik5.length ? [...new Set(unik5)] : []
      for (let z = 0; z < set5.length; z++) {
        const el = set5[z]
        const arrs = this.allsaldosebelum
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
            kode: '',
            uraian: 'SALDO AWAL PERIODE',
            debit: er?.filter((x) => x.kode6 === el)?.map((x) => parseFloat(x.debit)).reduce((a, b) => a + b, 0),
            kredit: er?.filter((x) => x.kode6 === el)?.map((x) => parseFloat(x.kredit)).reduce((a, b) => a + b, 0)
          }
          unikarr.push(obj)
        }
        kode5.push(...unikarr)
      }
      // console.log('kode5', kode5)

      const kode4 = []
      const unik4 = this.allsaldosebelum.map((x) => x.notrans)
      const set4 = unik4.length ? [...new Set(unik4)] : []
      for (let z = 0; z < set4.length; z++) {
        const el = set4[z]
        const arrs = this.allsaldosebelum
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
            kode: '',
            uraian: 'SALDO AWAL PERIODE',
            debit: er?.filter((x) => x.kode6 === el)?.map((x) => parseFloat(x.debit)).reduce((a, b) => a + b, 0),
            kredit: er?.filter((x) => x.kode6 === el)?.map((x) => parseFloat(x.kredit)).reduce((a, b) => a + b, 0)
          }
          unikarr.push(obj)
        }
        kode4.push(...unikarr)
      }
      const kode3 = []
      const unik3 = this.allsaldosebelum.map((x) => x.notrans)
      const set3 = unik3.length ? [...new Set(unik3)] : []
      for (let z = 0; z < set3.length; z++) {
        const el = set3[z]
        const arrs = this.allsaldosebelum
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
            kode: '',
            uraian: 'SALDO AWAL PERIODE',
            debit: er?.filter((x) => x.kode6 === el)?.map((x) => parseFloat(x.debit)).reduce((a, b) => a + b, 0),
            kredit: er?.filter((x) => x.kode6 === el)?.map((x) => parseFloat(x.kredit)).reduce((a, b) => a + b, 0)
          }
          unikarr.push(obj)
        }
        kode3.push(...unikarr)
      }
      const kode2 = []
      const unik2 = this.allsaldosebelum.map((x) => x.notrans)
      const set2 = unik2.length ? [...new Set(unik2)] : []
      for (let z = 0; z < set2.length; z++) {
        const el = set2[z]
        const arrs = this.allsaldosebelum
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
            kode: '',
            uraian: 'SALDO AWAL PERIODE',
            debit: er?.filter((x) => x.kode6 === el)?.map((x) => parseFloat(x.debit)).reduce((a, b) => a + b, 0),
            kredit: er?.filter((x) => x.kode6 === el)?.map((x) => parseFloat(x.kredit)).reduce((a, b) => a + b, 0)
          }
          unikarr.push(obj)
        }
        kode2.push(...unikarr)
      }

      // HASIL NILAI SALDO SEBELUMNYA LEVEL 6//
      buku6.push(...kode6)
      const filter6 = buku6.filter(x => x.kodereqs === this.reqs.rekenings)
      const setakhir6 = []
      const filterunik6 = filter6.map((x) => x.kodereqs)
      const setfil6 = filterunik6.length ? [...new Set(filterunik6)] : []
      for (let x = 0; x < setfil6.length; x++) {
        const el = setfil6[x]
        const es = filter6
        const obj = {
          kodereqs: es.filter((q) => q.kodereqs === el)[0]?.kodereqs,
          kode: '',
          kegiatan: 'SALDO AWAL PERIODE',
          debit: es.filter((q) => q.kodereqs === el).map((x) => parseFloat(x.debit)).reduce((a, b) => a + b, 0),
          kredit: es.filter((q) => q.kodereqs === el).map((x) => parseFloat(x.kredit)).reduce((a, b) => a + b, 0)
        }
        setakhir6.push(obj)
      }
      this.hasilSal6 = setakhir6
      console.log('SALDO 6', this.hasilSal6)

      // HASIL NILAI SALDO SEBELUMNYA LEVEL 5 kebawah//
      buku5.push(...kode5, ...kode4, ...kode3, ...kode2)
      const filter5 = buku5.filter(x => x.kodereqs === this.reqs.rekenings)
      // console.log('reksss', filter5)
      const filterunik5 = filter5.map((x) => x.kodereqs)
      const setfil5 = filterunik5.length ? [...new Set(filterunik5)] : []
      const setakhir5 = []
      for (let x = 0; x < setfil5.length; x++) {
        const el = setfil5[x]
        const es = filter5
        const obj = {
          kodereqs: es.filter((q) => q.kodereqs === el)[0]?.kodereqs,
          kode: '',
          uraian: 'SALDO AWAL PERIODE',
          debit: es.filter((q) => q.kodereqs === el).map((x) => parseFloat(x.debit)).reduce((a, b) => a + b, 0),
          kredit: es.filter((q) => q.kodereqs === el).map((x) => parseFloat(x.kredit)).reduce((a, b) => a + b, 0)
        }
        setakhir5.push(obj)
      }
      this.hasilSal5 = setakhir5
      console.log('SALDO 5', this.hasilSal5)
    },

    mapBukubesar () {
      const arr = []
      const buku6 = []
      const buku5 = []
      const buku1 = []
      const bukuSaldo6 = []
      const bukuSaldo5 = []
      const bukuSaldo1 = []
      const arrotom = this.jurnalotoms
      const arrmanual = this.jurnalmanuals
      const arrsaldoawal = this.saldoawal
      arr.push(...arrotom, ...arrmanual)
      this.alljurnal = arr
      // console.log('arr all', this.alljurnal)
      // SALDO AWAL//
      const Salbefore6 = this.hasilSal6
      const saldo6 = []
      for (let z = 0; z < arrsaldoawal.length; z++) {
        const el = arrsaldoawal[z]
        const obj = {
          tanggal: '',
          notrans: '',
          kodereqs: el?.kode6,
          kode: el?.kode6,
          kegiatan: 'SALDO AWAL PERIODE',
          keterangan: '',
          debit: parseFloat(el?.debit),
          kredit: parseFloat(el?.kredit)
        }
        saldo6.push(obj)
      }
      saldo6.push(...Salbefore6)
      // console.log('coba saldo', saldo6)
      const saldo5 = []
      const unsaldo5 = arrsaldoawal.map((x) => x.kode6)
      const setsal5 = unsaldo5.length ? [...new Set(unsaldo5)] : []
      for (let x = 0; x < setsal5.length; x++) {
        const el = setsal5[x]
        const arrs = this.saldoawal

        const obj = {
          tanggal: arrs?.filter((x) => x.kode6 === el)[0].tanggal,
          kodereqs: arrs?.filter((x) => x.kode6 === el)[0].kode5,
          kode: arrs?.filter((x) => x.kode6 === el)[0].kode6,
          uraian: arrs?.filter((x) => x.kode6 === el)[0].uraian,
          debit: arrs?.filter((x) => x.kode6 === el)?.map((x) => parseFloat(x.debit)).reduce((a, b) => a + b, 0),
          kredit: arrs?.filter((x) => x.kode6 === el)?.map((x) => parseFloat(x.kredit)).reduce((a, b) => a + b, 0)
        }
        saldo5.push(obj)
      }
      const saldo4 = []
      const unsaldo4 = arrsaldoawal.map((x) => x.kode6)
      const setsal4 = unsaldo4.length ? [...new Set(unsaldo4)] : []
      for (let x = 0; x < setsal4.length; x++) {
        const el = setsal4[x]
        const arrs = this.saldoawal

        const obj = {
          tanggal: arrs?.filter((x) => x.kode6 === el)[0].tanggal,
          kodereqs: arrs?.filter((x) => x.kode6 === el)[0].kode4,
          kode: arrs?.filter((x) => x.kode6 === el)[0].kode5,
          uraian: arrs?.filter((x) => x.kode6 === el).map((x) => x.lvl5)[0]?.uraian,
          debit: arrs?.filter((x) => x.kode6 === el)?.map((x) => parseFloat(x.debit)).reduce((a, b) => a + b, 0),
          kredit: arrs?.filter((x) => x.kode6 === el)?.map((x) => parseFloat(x.kredit)).reduce((a, b) => a + b, 0)
        }
        saldo4.push(obj)
      }

      const saldo3 = []
      const unsaldo3 = arrsaldoawal.map((x) => x.kode6)
      const setsal3 = unsaldo3.length ? [...new Set(unsaldo3)] : []
      for (let x = 0; x < setsal3.length; x++) {
        const el = setsal3[x]
        const arrs = this.saldoawal

        const obj = {
          tanggal: arrs?.filter((x) => x.kode6 === el)[0].tanggal,
          kodereqs: arrs?.filter((x) => x.kode6 === el)[0].kode3,
          kode: arrs?.filter((x) => x.kode6 === el)[0].kode4,
          uraian: arrs?.filter((x) => x.kode6 === el).map((x) => x.lvl4)[0]?.uraian,
          debit: arrs?.filter((x) => x.kode6 === el)?.map((x) => parseFloat(x.debit)).reduce((a, b) => a + b, 0),
          kredit: arrs?.filter((x) => x.kode6 === el)?.map((x) => parseFloat(x.kredit)).reduce((a, b) => a + b, 0)
        }
        saldo3.push(obj)
      }
      const saldo2 = []
      const unsaldo2 = arrsaldoawal.map((x) => x.kode6)
      const setsal2 = unsaldo2.length ? [...new Set(unsaldo2)] : []
      for (let x = 0; x < setsal2.length; x++) {
        const el = setsal2[x]
        const arrs = this.saldoawal

        const obj = {
          tanggal: arrs?.filter((x) => x.kode6 === el)[0].tanggal,
          kodereqs: arrs?.filter((x) => x.kode6 === el)[0].kode2,
          kode: arrs?.filter((x) => x.kode6 === el)[0].kode3,
          uraian: arrs?.filter((x) => x.kode6 === el).map((x) => x.lvl3)[0]?.uraian,
          debit: arrs?.filter((x) => x.kode6 === el)?.map((x) => parseFloat(x.debit)).reduce((a, b) => a + b, 0),
          kredit: arrs?.filter((x) => x.kode6 === el)?.map((x) => parseFloat(x.kredit)).reduce((a, b) => a + b, 0)
        }
        saldo2.push(obj)
      }

      const saldo1 = []
      const unsaldo1 = arrsaldoawal.map((x) => x.kode6)
      const setsal1 = unsaldo1.length ? [...new Set(unsaldo1)] : []
      for (let x = 0; x < setsal1.length; x++) {
        const el = setsal1[x]
        const arrs = this.saldoawal

        const obj = {
          tanggal: arrs?.filter((x) => x.kode6 === el)[0].tanggal,
          kodereqs: arrs?.filter((x) => x.kode6 === el)[0].kode2,
          kode: arrs?.filter((x) => x.kode6 === el)[0].kode1,
          uraian: arrs?.filter((x) => x.kode6 === el).map((x) => x.lvl1)[0]?.uraian,
          debit: arrs?.filter((x) => x.kode6 === el)?.map((x) => parseFloat(x.debit)).reduce((a, b) => a + b, 0),
          kredit: arrs?.filter((x) => x.kode6 === el)?.map((x) => parseFloat(x.kredit)).reduce((a, b) => a + b, 0)
        }
        saldo1.push(obj)
      }
      // HASIL DATA SALDO AWAL LEVEL 6//
      // bukuSaldo6.push(...saldo6)
      // const filtersaldo6 = bukuSaldo6.filter(x => x.kodereqs === this.reqs.rekenings)
      // const sortByDatesaldo6 = (filtersaldo6) =>
      //   filtersaldo6.sort(({ tanggal: a }, { tanggal: b }) =>
      //     a < b ? -1 : a > b ? 1 : 0
      //   )
      // const arrSaldoawal = sortByDatesaldo6(filtersaldo6)
      // this.saldoawalmaps6 = arrSaldoawal
      // console.log('saldo Awal 6', this.saldoawalmaps6)

      // HASIL DATA SALDO AWAL LEVEL 5 kebawah//
      const salsebelum5 = this.hasilSal5
      if (this.hasilSal5.length === 0) {
        bukuSaldo5.push(...saldo5, ...saldo4, ...saldo3, ...saldo2)
      }
      else {
        bukuSaldo5.push(...salsebelum5, ...saldo5, ...saldo4, ...saldo3, ...saldo2)
      }

      const filtersaldo5 = bukuSaldo5.filter(x => x.kodereqs === this.reqs.rekenings)
      const set5akhir = []
      const uniksal5 = filtersaldo5.map((x) => x.kodereqs)
      const setsaldo5 = uniksal5.length ? [...new Set(uniksal5)] : []
      for (let x = 0; x < setsaldo5.length; x++) {
        const el = setsaldo5[x]
        const es = filtersaldo5
        const obj = {
          kodereqs: es.filter((q) => q.kodereqs === el)[0]?.kodereqs,
          kode: '',
          uraian: 'SALDO AWAL PERIODE',
          debit: es.filter((q) => q.kodereqs === el).map((x) => parseFloat(x.debit)).reduce((a, b) => a + b, 0),
          kredit: es.filter((q) => q.kodereqs === el).map((x) => parseFloat(x.kredit)).reduce((a, b) => a + b, 0)
        }
        set5akhir.push(obj)
      }
      const sortByDateSal5 = (set5akhir) =>
        set5akhir.sort(({ kode: a }, { kode: b }) =>
          a < b ? -1 : a > b ? 1 : 0
        )
      const arrSaldo5 = sortByDateSal5(set5akhir)
      // this.saldoawalmaps5 = this.hasilMapssaldo(arrSaldo5)
      // console.log('HASIL SALDO AWAL LVL5 kebwah', this.saldoawalmaps5)

      // JURNAL//
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
        kode4.push(...unikarr)
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
        kode3.push(...unikarr)
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
        kode2.push(...unikarr)
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

      // HASIL DATA BUKU BESAR LEVEL 6//
      buku6.push(...saldo6, ...kode6)
      const filter6 = buku6.filter(x => x.kodereqs === this.reqs.rekenings)
      const sortByDate = (filter6) =>
        filter6.sort(({ tanggal: a }, { tanggal: b }) =>
          a < b ? -1 : a > b ? 1 : 0
        )
      const arrJurnal = sortByDate(filter6)

      this.hasilmapsLevel6 = this.hasilMapssaldo(arrJurnal)

      console.log('HASIL LVL 6', this.hasilmapsLevel6)

      // HASIL DATA BUKU BESAR LEVEL 5 kebawah//
      buku5.push(...kode5, ...kode4, ...kode3, ...kode2)
      const filter5 = buku5.filter(x => x.kodereqs === this.reqs.rekenings)
      // console.log('reksss', filter5)
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

      const sortByDate5 = (setakhir5) =>
        setakhir5.sort(({ kode: a }, { kode: b }) =>
          a < b ? -1 : a > b ? 1 : 0
        )
      const arrJurnal5 = sortByDate5(setakhir5)
      this.hasilmapsLevel5 = this.hasilMapssaldo(arrSaldo5.concat(arrJurnal5))
      console.log('HASIL LVL5 kebwah', this.hasilmapsLevel5)

      // HASIL DATA BUKU BESAR LEVEL 1 JURNAL + SALDO AWAL//
      buku1.push(...kode1, ...saldo1)
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
          kredit: es.filter((q) => q.kode === el).map((x) => parseFloat(x.kredit)).reduce((a, b) => a + b, 0),
          total: es.filter((q) => q.kode === el).map((x) => parseFloat(x.debit)).reduce((a, b) => a + b, 0) -
          es.filter((q) => q.kode === el).map((x) => parseFloat(x.kredit)).reduce((a, b) => a + b, 0)
        }
        setakhir1.push(obj)
      }
      const sortByDate1 = (setakhir1) =>
        setakhir1.sort(({ kode: a }, { kode: b }) =>
          a < b ? -1 : a > b ? 1 : 0
        )
      const arrJurnal1 = sortByDate1(setakhir1)
      this.hasilmapsLevel1 = arrJurnal1
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

  }
})
