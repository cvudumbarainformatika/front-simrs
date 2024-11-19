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
      tgl: date.formatDate(Date.now(), 'YYYY-MM-DD'),
      tglx: date.formatDate(Date.now(), 'YYYY-MM-DD'),
      tahun: date.formatDate(Date.now(), 'YYYY'),
      levelberapa: '',
      jenisbukubesar: '',
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
    jenis: [
      { nama: 'Rekap Buku Besar', value: '1' },
      { nama: 'Rincian Buku Besar', value: '2' }
    ],
    level: [
      { nama: 'Akun', value: '0' },
      { nama: 'Kelompok', value: '3' },
      { nama: 'Jenis', value: '6' },
      { nama: 'Objek', value: '9' },
      { nama: 'Rincian Objek', value: '12' },
      { nama: 'SubRincian Objek', value: '17' }
    ],
    levelrinci: [
      { nama: 'Akun', value: '1' },
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
    allbukubesar: [],
    saldoawal: [],

    // HASIL MAPING GELONDONGAN//
    hasilmapsLevel6: [],
    hasilmapsLevel5: [],
    hasilmapsLevel1: [],
    hasilSal6: [],
    hasilSal5: [],
    hasilSal1: [],
    // REKENING //
    alllevel: [],

    // HASIL MAPING RINCIAN PER LEVEL //
    hasilRinci6: [],
    hasilRinci5: [],
    hasilRinci4: [],
    hasilRinci3: [],
    hasilRinci2: [],
    hasilRinci1: [],

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
            this.mapRincianBukubesar()
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
      for (let z = 0; z < this.alljurnal.length; z++) {
        const el = this.alljurnal[z]
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
        const unikkode = filters.map((x) => x.kode3)
        const setunik = unikkode.length ? [...new Set(unikkode)] : []
        const unikarr = []
        for (let a = 0; a < setunik.length; a++) {
          const el = setunik[a]
          const er = filters
          const obj = {
            tanggal: er?.filter((x) => x.kode3 === el)[0].tanggal,
            kodereqs: er?.filter((x) => x.kode3 === el)[0]?.kode3,
            kode: er?.filter((x) => x.kode3 === el)[0]?.kode4,
            uraian: er?.filter((x) => x.kode3 === el).map((x) => x.lvl4)[0]?.uraian,
            debit: er?.filter((x) => x.kode3 === el)?.map((x) => parseFloat(x.debit)).reduce((a, b) => a + b, 0),
            kredit: er?.filter((x) => x.kode3 === el)?.map((x) => parseFloat(x.kredit)).reduce((a, b) => a + b, 0)
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
    mapRincianBukubesar () {
      const saldosebelum = []
      const arrsaldoawal = this.saldoawal
      const salotom = this.salotom
      const salmanual = this.salmanual
      const salsebelum = this.salsebelum
      saldosebelum.push(...arrsaldoawal, ...salsebelum, ...salotom, ...salmanual)

      const saldo6sebelumnya = []
      const saldounik6 = saldosebelum.filter(x => x.kode6 === this.reqs.rekenings).map((x) => x.kode6)
      const setunik6 = saldounik6.length ? [...new Set(saldounik6)] : []
      for (let q = 0; q < setunik6.length; q++) {
        const el = setunik6[q] ?? 0
        const obj = {
          tanggal: '',
          kode1: saldosebelum.filter((x) => x.kode6 === el)[0]?.kode1,
          kode2: saldosebelum.filter((x) => x.kode6 === el)[0]?.kode2,
          kode3: saldosebelum.filter((x) => x.kode6 === el)[0]?.kode3,
          kode4: saldosebelum.filter((x) => x.kode6 === el)[0]?.kode4,
          kode5: saldosebelum.filter((x) => x.kode6 === el)[0]?.kode5,
          kode6: saldosebelum.filter((x) => x.kode6 === el)[0]?.kode6,
          uraian: saldosebelum.filter((x) => x.kode6 === el)[0]?.uraian,
          notrans: '',
          kegiatan: 'SALDO AWAL PERIODE',
          keterangan: '',
          debit: saldosebelum?.filter((x) => x.kode6 === el)?.map((x) => parseFloat(x.debit)).reduce((a, b) => a + b, 0),
          kredit: saldosebelum?.filter((x) => x.kode6 === el)?.map((x) => parseFloat(x.kredit)).reduce((a, b) => a + b, 0)
        }
        saldo6sebelumnya.push(obj)
      }

      const saldo5sebelumnya = []
      const saldounik5 = saldosebelum.filter(x => x.kode5 === this.reqs.rekenings).map((x) => x.kode5)
      const setunik5 = saldounik5.length ? [...new Set(saldounik5)] : []
      for (let q = 0; q < setunik5.length; q++) {
        const el = setunik5[q] ?? 0
        const obj = {
          tanggal: '',
          kode1: saldosebelum.filter((x) => x.kode5 === el)[0]?.kode1,
          kode2: saldosebelum.filter((x) => x.kode5 === el)[0]?.kode2,
          kode3: saldosebelum.filter((x) => x.kode5 === el)[0]?.kode3,
          kode4: saldosebelum.filter((x) => x.kode5 === el)[0]?.kode4,
          kode5: saldosebelum.filter((x) => x.kode5 === el)[0]?.kode5,
          kode6: saldosebelum.filter((x) => x.kode5 === el)[0]?.kode6,
          uraian: saldosebelum?.filter(x => x.kode5 === el).map((x) => x.lvl5)[0]?.uraian,
          notrans: '',
          kegiatan: 'SALDO AWAL PERIODE',
          keterangan: '',
          debit: saldosebelum?.filter((x) => x.kode5 === el)?.map((x) => parseFloat(x.debit)).reduce((a, b) => a + b, 0),
          kredit: saldosebelum?.filter((x) => x.kode5 === el)?.map((x) => parseFloat(x.kredit)).reduce((a, b) => a + b, 0)
        }
        saldo5sebelumnya.push(obj)
      }

      const saldo4sebelumnya = []
      const saldounik4 = saldosebelum.filter(x => x.kode4 === this.reqs.rekenings).map((x) => x.kode4)
      const setunik4 = saldounik4.length ? [...new Set(saldounik4)] : []
      for (let q = 0; q < setunik4.length; q++) {
        const el = setunik4[q] ?? 0
        const obj = {
          tanggal: '',
          kode1: saldosebelum.filter((x) => x.kode4 === el)[0]?.kode1,
          kode2: saldosebelum.filter((x) => x.kode4 === el)[0]?.kode2,
          kode3: saldosebelum.filter((x) => x.kode4 === el)[0]?.kode3,
          kode4: saldosebelum.filter((x) => x.kode4 === el)[0]?.kode4,
          kode5: saldosebelum.filter((x) => x.kode4 === el)[0]?.kode5,
          kode6: saldosebelum.filter((x) => x.kode4 === el)[0]?.kode6,
          uraian: saldosebelum?.filter(x => x.kode4 === el).map((x) => x.lvl4)[0]?.uraian,
          notrans: '',
          kegiatan: 'SALDO AWAL PERIODE',
          keterangan: '',
          debit: saldosebelum?.filter((x) => x.kode4 === el)?.map((x) => parseFloat(x.debit)).reduce((a, b) => a + b, 0),
          kredit: saldosebelum?.filter((x) => x.kode4 === el)?.map((x) => parseFloat(x.kredit)).reduce((a, b) => a + b, 0)
        }
        saldo4sebelumnya.push(obj)
      }

      const saldo3sebelumnya = []
      const saldounik3 = saldosebelum.filter(x => x.kode3 === this.reqs.rekenings).map((x) => x.kode3)
      const setunik3 = saldounik3.length ? [...new Set(saldounik3)] : []
      for (let q = 0; q < setunik3.length; q++) {
        const el = setunik3[q] ?? 0
        const obj = {
          tanggal: '',
          kode1: saldosebelum.filter((x) => x.kode3 === el)[0]?.kode1 ?? '',
          kode2: saldosebelum.filter((x) => x.kode3 === el)[0]?.kode2 ?? '',
          kode3: saldosebelum.filter((x) => x.kode3 === el)[0]?.kode3 ?? '',
          kode4: saldosebelum.filter((x) => x.kode3 === el)[0]?.kode4 ?? '',
          kode5: saldosebelum.filter((x) => x.kode3 === el)[0]?.kode5 ?? '',
          kode6: saldosebelum.filter((x) => x.kode3 === el)[0]?.kode6 ?? '',
          uraian: saldosebelum?.filter(x => x.kode3 === el).map((x) => x.lvl3)[0]?.uraian ?? '',
          notrans: '',
          kegiatan: 'SALDO AWAL PERIODE',
          keterangan: '',
          debit: saldosebelum?.filter((x) => x.kode3 === el)?.map((x) => parseFloat(x.debit)).reduce((a, b) => a + b, 0) ?? 0,
          kredit: saldosebelum?.filter((x) => x.kode3 === el)?.map((x) => parseFloat(x.kredit)).reduce((a, b) => a + b, 0) ?? 0
        }
        saldo3sebelumnya.push(obj)
      }

      const saldo2sebelumnya = []
      const saldounik2 = saldosebelum.filter(x => x.kode2 === this.reqs.rekenings).map((x) => x.kode2)
      const setunik2 = saldounik2.length ? [...new Set(saldounik2)] : []
      for (let q = 0; q < setunik2.length; q++) {
        const el = setunik2[q] ?? 0
        const obj = {
          tanggal: '',
          kode1: saldosebelum.filter((x) => x.kode2 === el)[0]?.kode1,
          kode2: saldosebelum.filter((x) => x.kode2 === el)[0]?.kode2,
          kode3: saldosebelum.filter((x) => x.kode2 === el)[0]?.kode3,
          kode4: saldosebelum.filter((x) => x.kode2 === el)[0]?.kode4,
          kode5: saldosebelum.filter((x) => x.kode2 === el)[0]?.kode5,
          kode6: saldosebelum.filter((x) => x.kode2 === el)[0]?.kode6,
          uraian: saldosebelum?.filter(x => x.kode2 === el).map((x) => x.lvl2)[0]?.uraian,
          notrans: '',
          kegiatan: 'SALDO AWAL PERIODE',
          keterangan: '',
          debit: saldosebelum?.filter((x) => x.kode2 === el)?.map((x) => parseFloat(x.debit)).reduce((a, b) => a + b, 0),
          kredit: saldosebelum?.filter((x) => x.kode2 === el)?.map((x) => parseFloat(x.kredit)).reduce((a, b) => a + b, 0)
        }
        saldo2sebelumnya.push(obj)
      }
      const saldo1sebelumnya = []
      const saldounik1 = saldosebelum.filter(x => x.kode1 === this.reqs.rekenings).map((x) => x.kode1)
      const setunik1 = saldounik1.length ? [...new Set(saldounik1)] : []
      for (let q = 0; q < setunik1.length; q++) {
        const el = setunik1[q] ?? 0
        const obj = {
          tanggal: '',
          kode1: saldosebelum.filter((x) => x.kode1 === el)[0]?.kode1,
          kode2: saldosebelum.filter((x) => x.kode1 === el)[0]?.kode2,
          kode3: saldosebelum.filter((x) => x.kode1 === el)[0]?.kode3,
          kode4: saldosebelum.filter((x) => x.kode1 === el)[0]?.kode4,
          kode5: saldosebelum.filter((x) => x.kode1 === el)[0]?.kode5,
          kode6: saldosebelum.filter((x) => x.kode1 === el)[0]?.kode6,
          uraian: saldosebelum?.filter(x => x.kode1 === el).map((x) => x.lvl1)[0]?.uraian,
          notrans: '',
          kegiatan: 'SALDO AWAL PERIODE',
          keterangan: '',
          debit: saldosebelum?.filter((x) => x.kode1 === el)?.map((x) => parseFloat(x.debit)).reduce((a, b) => a + b, 0),
          kredit: saldosebelum?.filter((x) => x.kode1 === el)?.map((x) => parseFloat(x.kredit)).reduce((a, b) => a + b, 0)
        }
        saldo1sebelumnya.push(obj)
      }
      const saldonol = []
      const obj = {
        tanggal: '',
        kode1: '',
        kode2: '',
        kode3: '',
        kode4: '',
        kode5: '',
        kode6: '',
        uraian: '',
        notrans: '',
        kegiatan: 'SALDO AWAL PERIODE',
        keterangan: '',
        debit: parseFloat(0),
        kredit: parseFloat(0)
      }
      saldonol.push(obj)
      console.log('lll', saldonol)
      const arr6 = []
      const arr5 = []
      const arr4 = []
      const arr3 = []
      const arr2 = []
      const arr1 = []
      const arrotom = this.jurnalotoms
      const arrmanual = this.jurnalmanuals
      arr6.push(...saldo6sebelumnya, ...arrotom, ...arrmanual)
      arr5.push(...saldo5sebelumnya, ...arrotom, ...arrmanual)
      arr4.push(...saldo4sebelumnya, ...arrotom, ...arrmanual)
      arr3.push(...saldo3sebelumnya, ...arrotom, ...arrmanual)
      arr2.push(...saldo2sebelumnya, ...arrotom, ...arrmanual)
      arr1.push(...saldo1sebelumnya, ...arrotom, ...arrmanual)

      console.log('arrrray3', arr3)

      const arrjurnal = []
      arrjurnal.push(...arrotom, ...arrmanual)
      const kode6 = []
      for (let z = 0; z < arr6.length; z++) {
        const el = arr6[z]
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
      const filter6 = kode6.filter(x => x.kodereqs === this.reqs.rekenings)
      const sortByDate6 = (filter6) =>
        filter6.sort(({ tanggal: a }, { tanggal: b }) =>
          a < b ? -1 : a > b ? 1 : 0
        )
      const arrBuku6 = sortByDate6(filter6)
      if (!saldo6sebelumnya.length) {
        this.hasilRinci6 = this.hasilMapssaldo(saldonol.concat(arrBuku6))
      }
      else {
        this.hasilRinci6 = this.hasilMapssaldo(arrBuku6)
      }
      console.log('BUKU BESAR KODE6', this.hasilRinci6)

      const kode5 = []
      for (let z = 0; z < arr5.length; z++) {
        const el = arr5[z]
        const obj = {
          tanggal: el?.tanggal,
          notrans: el?.notrans,
          kodereqs: el?.kode5,
          kode: el?.kode6,
          kegiatan: el?.kegiatan,
          keterangan: el?.keterangan,
          debit: parseFloat(el?.debit),
          kredit: parseFloat(el?.kredit)
        }
        kode5.push(obj)
      }
      const filter5 = kode5.filter(x => x.kodereqs === this.reqs.rekenings)
      const sortByDate5 = (filter5) =>
        filter5.sort(({ tanggal: a }, { tanggal: b }) =>
          a < b ? -1 : a > b ? 1 : 0
        )
      const arrBuku5 = sortByDate5(filter5)
      if (!saldo5sebelumnya.length) {
        this.hasilRinci5 = this.hasilMapssaldo(saldonol.concat(arrBuku5))
      }
      else {
        this.hasilRinci5 = this.hasilMapssaldo(arrBuku5)
      }
      console.log('BUKU BESAR KODE5', this.hasilRinci5)

      const kode4 = []
      for (let z = 0; z < arr4.length; z++) {
        const el = arr4[z]
        const obj = {
          tanggal: el?.tanggal,
          notrans: el?.notrans,
          kodereqs: el?.kode4,
          kode: el?.kode5,
          kegiatan: el?.kegiatan,
          keterangan: el?.keterangan,
          debit: parseFloat(el?.debit),
          kredit: parseFloat(el?.kredit)
        }
        kode4.push(obj)
      }
      const filter4 = kode4.filter(x => x.kodereqs === this.reqs.rekenings)
      const sortByDate4 = (filter4) =>
        filter4.sort(({ tanggal: a }, { tanggal: b }) =>
          a < b ? -1 : a > b ? 1 : 0
        )
      const arrBuku4 = sortByDate4(filter4)
      if (!saldo4sebelumnya.length) {
        this.hasilRinci4 = this.hasilMapssaldo(saldonol.concat(arrBuku4))
      }
      else {
        this.hasilRinci4 = this.hasilMapssaldo(arrBuku4)
      }
      console.log('BUKU BESAR KODE4', this.hasilRinci4)

      const kode3 = []
      // const fil3 = arr3.map((x) => x.kode3)
      // const unik3 = fil3.length ? [...new Set(fil3)] : []
      for (let z = 0; z < arr3.length; z++) {
        const el = arr3[z]
        const obj = {
          tanggal: el?.tanggal,
          notrans: el?.notrans,
          kodereqs: el?.kode3,
          kode: el?.kode4,
          kegiatan: el?.kegiatan,
          keterangan: el?.keterangan,
          debit: parseFloat(el?.debit),
          kredit: parseFloat(el?.kredit)
        }
        kode3.push(obj)
      }
      // for (let z = 0; z < unik3.length; z++) {
      //   const el = unik3[z]
      //   const obj = {
      //     kodereqs: arr3?.filter(x => x.kode4 === el)[0]?.kode3,
      //     kode: arr3?.filter(x => x.kode4 === el)[0]?.kode4,
      //     uraian: arr3?.filter(x => x.kode4 === el).map((x) => x.lvl4)[0]?.uraian ?? arr3?.filter(x => x.kode4 === el)[0]?.uraian,
      //     debit: arrjurnal?.filter(x => x.kode4 === el).map((x) => parseFloat(x.debit)).reduce((a, b) => a + b, 0),
      //     kredit: arrjurnal?.filter(x => x.kode4 === el).map((x) => parseFloat(x.kredit)).reduce((a, b) => a + b, 0),
      //     rinci: arr3?.filter(x => x.kode4 === el).map((x) => {
      //       return {
      //         tanggal: x.tanggal,
      //         notrans: x.notrans,
      //         kegiatan: x?.kegiatan,
      //         keterangan: x?.keterangan,
      //         debit: parseFloat(x?.debit),
      //         kredit: parseFloat(x?.kredit)
      //       }
      //     })
      //   }
      //   kode3.push(obj)
      // }
      const filter3 = kode3.filter(x => x.kodereqs === this.reqs.rekenings)
      const sortByDate3 = (filter3) =>
        filter3.sort(({ kodereqs: a }, { kodereqs: b }) =>
          a < b ? -1 : a > b ? 1 : 0
        )
      const arrBuku3 = sortByDate3(filter3)
      // for (let a = 0; a < arrBuku3.length; a++) {
      //   const el = arrBuku3[a]
      //   const sumrinci = el.rinci
      //   this.hasilMapssaldo(sumrinci)
      // }
      if (!saldo3sebelumnya.length) {
        this.hasilRinci3 = this.hasilMapssaldo(saldonol.concat(arrBuku3))
      }
      else {
        this.hasilRinci3 = this.hasilMapssaldo(arrBuku3)
      }
      console.log('BUKU BESAR KODE3', this.hasilRinci3)

      const kode2 = []
      for (let z = 0; z < arr2.length; z++) {
        const el = arr2[z]
        const obj = {
          tanggal: el?.tanggal,
          notrans: el?.notrans,
          kodereqs: el?.kode2,
          kode: el?.kode3,
          kegiatan: el?.kegiatan,
          keterangan: el?.keterangan,
          debit: parseFloat(el?.debit),
          kredit: parseFloat(el?.kredit)
        }
        kode2.push(obj)
      }
      const filter2 = kode2.filter(x => x.kodereqs === this.reqs.rekenings)
      const sortByDate2 = (filter2) =>
        filter2.sort(({ tanggal: a }, { tanggal: b }) =>
          a < b ? -1 : a > b ? 1 : 0
        )
      const arrBuku2 = sortByDate2(filter2)
      if (!saldo2sebelumnya.length) {
        this.hasilRinci2 = this.hasilMapssaldo(saldonol.concat(arrBuku2))
      }
      else {
        this.hasilRinci2 = this.hasilMapssaldo(arrBuku2)
      }
      console.log('BUKU BESAR KODE2', this.hasilRinci2)

      const kode1 = []
      for (let z = 0; z < arr1.length; z++) {
        const el = arr1[z]
        const obj = {
          tanggal: el?.tanggal,
          notrans: el?.notrans,
          kodereqs: el?.kode1,
          kode: el?.kode2,
          kegiatan: el?.kegiatan,
          keterangan: el?.keterangan,
          debit: parseFloat(el?.debit),
          kredit: parseFloat(el?.kredit)
        }
        kode1.push(obj)
      }
      const filter1 = kode1.filter(x => x.kodereqs === this.reqs.rekenings)
      const sortByDate1 = (filter1) =>
        filter1.sort(({ tanggal: a }, { tanggal: b }) =>
          a < b ? -1 : a > b ? 1 : 0
        )
      const arrBuku1 = sortByDate1(filter1)
      if (!saldo1sebelumnya.length) {
        this.hasilRinci1 = this.hasilMapssaldo(saldonol.concat(arrBuku1))
      }
      else {
        this.hasilRinci1 = this.hasilMapssaldo(arrBuku1)
      }
      console.log('BUKU BESAR KODE1', this.hasilRinci1)
    },
    hasilMapssaldo (arr) {
      let total = 0
      if (arr.length) {
        for (let i = 0; i < arr.length; i++) {
          if (i === 0) {
            total = parseFloat(arr[0]?.debit) - parseFloat(arr[0]?.kredit)
            arr[0].total = total.toFixed(2)
          }
          else {
            const hinggaKeIndex = i + 1
            const arrBaru = arr.slice(1, hinggaKeIndex)
            const awal = parseFloat(arr[0]?.debit) - parseFloat(arr[0]?.kredit)
            const obj = arrBaru.map((x) => parseFloat(x.debit) - parseFloat(x.kredit))
            const skrg = obj?.reduce((a, b) => a + b, 0)
            arr[i].total = (awal + skrg).toFixed(2)
          }
        }
      }
      return arr
    }

  }
})
