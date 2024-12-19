import { defineStore } from 'pinia'
import { date } from 'quasar'
import { api } from 'src/boot/axios'

export const useLaporanBkuPpkStore = defineStore('laporan_bkuppk', {
  state: () => ({
    loading: false,
    items: [],
    meta: {},
    params: {
      q: '',
      page: 1,
      bulan: date.formatDate(Date.now(), 'MM'),
      tahun: date.formatDate(Date.now(), 'YYYY')
      // defaultEndDate: new Date(`${(new Date()).getFullYear()}-${(new Date()).getMonth()}-${(new Date()).getDate()}`)
      // per_page: 10,
    },

    display: {
      sekarang: date.formatDate(Date.now(), 'DD MMMM YYYY')
    },
    bulans: [
      { nama: 'Januari', value: '01' },
      { nama: 'Februari', value: '02' },
      { nama: 'Maret', value: '03' },
      { nama: 'April', value: '04' },
      { nama: 'Mei', value: '05' },
      { nama: 'Juni', value: '06' },
      { nama: 'Juli', value: '07' },
      { nama: 'Agustus', value: '08' },
      { nama: 'September', value: '09' },
      { nama: 'Oktober', value: '10' },
      { nama: 'November', value: '11' },
      { nama: 'Desember', value: '12' }
    ],
    npkls: [],
    hasilArray: [],
    arrayTanggal: [],
    pegawais: [],
    saldoakhir: 0,

    sebelumsaldo: [],
    sebelumsilpa: [],
    sebelumsetor: [],
    sebelumkaskecil: [],
    sebelumspm: [],
    sebelumspmgu: [],
    sebelumnihil: [],
    sebelumnpkls: [],

    dialogCetak: false
  }),

  actions: {
    setParams (key, val) {
      this.params[key] = val
    },
    // defaultEndDate () {
    //   console.log('defaultEndDate', this.reqs.defaultEndDate)
    //   const now = new Date()
    //   now.setMonth(now.getMonth() - 1)
    //   return new Date(now.toJSON().slice(0, 10))
    // },
    getInitialData () {
      this.getDataTable()
    },
    async getDataTable () {
      this.loading = true
      const params = { params: this.params }
      await api
        .get('v1/laporan/laporan_bku/bkuppk', params)
        .then((resp) => {
          console.log('dataBKUPPK', resp)
          if (resp.status === 200) {
            this.hasilArray = []
            this.items = resp.data
            this.npkls = resp.data.npkls
            this.pegawais = resp.data?.pegawai
            this.sebelumsaldo = resp.data?.saldosebelum ?? 0
            this.sebelumsilpa = resp.data?.silpasebelum ?? 0
            this.sebelumsetor = resp.data?.setorsebelum ?? 0
            this.sebelumspm = resp.data?.spmsebelum ?? 0
            this.sebelumspmgu = resp.data?.spmgusebelum ?? 0
            this.sebelumnihil = resp.data?.nihilsebelum ?? 0
            this.sebelumnpkls = resp.data?.npklssebelum ?? 0
            this.sebelumkaskecil = resp.data?.kaskecilsebelum ?? 0
            this.hitungharidalamBulan()
            // this.defaultEndDate()
            this.loading = false
          }
        })
        .catch(() => {
          this.loading = false
        })
    },
    hitungharidalamBulan () {
      const cariBulan = new Date(
        this.params.tahun,
        this.params.bulan,
        0
      ).getDate()
      //
      const tempTanggal = []
      for (let i = 0; i < cariBulan; i++) {
        const tgl = this.buatTanggal(i + 1)
        tempTanggal.push(tgl)
      }
      this.mapingData(tempTanggal)
      // console.log('cccc', tempTanggal)
      this.loading = false
      // return cariBulan;
    },
    buatTanggal (n) {
      const tgl = n > 9 ? n : '0' + n
      const thn = this.params.tahun
      const bln = this.params.bulan
      return thn + '-' + bln + '-' + tgl
    },
    mapingData (tgl) {
      // console.log("www", tgl);
      // ===================================================Saldo

      const saldo = []
      const nilaisaldoKredit = []
      const nilaisaldoDebit = []

      const gabungsebelumdebitx = this.sebelumsaldo.concat(this.sebelumsetor, this.sebelumnihil)
      const gabungsebelumkreditx = this.sebelumspm.concat(this.sebelumnpkls, this.sebelumkaskecil)
      const gabungsebelumdebit = this.sebelumsetor.concat(this.sebelumnihil, this.sebelumsilpa)
      const gabungsebelumkredit = this.sebelumspmgu.concat(this.sebelumnpkls, this.sebelumkaskecil)
      if (this.params.bulan === '02') {
        nilaisaldoDebit.push(...gabungsebelumdebitx)
        nilaisaldoKredit.push(...gabungsebelumkreditx)
        // console.log('spm aja', nilaisaldoKredit)
      }
      else {
        nilaisaldoDebit.push(...gabungsebelumdebit)
        nilaisaldoKredit.push(...gabungsebelumkredit)
        console.log('spm guuuuu', nilaisaldoKredit)
      }
      const totaldebitsebelum = nilaisaldoDebit.map(x => parseFloat(x.nilai)).reduce((x, y) => x + y, 0)
      const totalkreditsebelum = nilaisaldoKredit.map(x => parseFloat(x.nilai)).reduce((x, y) => x + y, 0)
      const saldoAwal = totaldebitsebelum - totalkreditsebelum
      console.log('totaldebitsebelum', totaldebitsebelum)
      console.log('totalkreditsebelum', totalkreditsebelum)
      console.log('saldoawal', saldoAwal)

      if (this.params.bulan !== '01') {
        const sal = {
          tgl: '',
          notrans: '',
          nonpd: '',
          category: 'Saldo Awal',
          uraian: 'Saldo Awal',
          uraianNPD: '',
          urutan: 1,
          penerimaan: 0,
          pengeluaran: 0,
          subtotal: saldoAwal
        }
        saldo.push(sal)
      }
      else {
        for (let i = 0; i < this.items.saldo.length; i++) {
          const el = this.items?.saldo
          const obj = {
            tgl: el[i].tanggal,
            notrans: el[i].rekening,
            nonpd: null,
            category: 'sts',
            uraian: 'Saldo Awal',
            uraianNPD: null,
            urutan: 1,
            penerimaan: 0,
            pengeluaran: 0,
            subtotal: el[i].nilaisaldo
          }
          saldo.push(obj)
        }
      }
      console.log('gggg', saldo)
      // =====================================================
      // ===================================================Nihil
      const silpa = []
      for (let i = 0; i < this.items.silpa.length; i++) {
        const el = this.items?.silpa
        const obj = {
          tgl: el[i].tanggal,
          notrans: el[i].notrans,
          nonpd: null,
          category: 'silpa',
          uraian: 'Silpa',
          uraianNPD: null,
          urutan: 1,
          penerimaan: parseFloat(el[i].nominal),
          pengeluaran: 0
        }
        silpa.push(obj)
      }
      // =====================================================
      // ===================================================Setor
      const setor = []
      for (let i = 0; i < this.items.setor.length; i++) {
        const el = this.items?.setor
        const obj = {
          tgl: el[i].tgltrans,
          notrans: el[i].idtrans,
          nonpd: null,
          category: 'setoranpendapatan',
          uraian: el[i].ket,
          uraianNPD: null,
          urutan: 2,
          penerimaan: parseFloat(el[i].nilai),
          pengeluaran: 0
        }
        setor.push(obj)
      }
      // =====================================================

      // // ===================================================STS
      // const sts = []
      // for (let i = 0; i < this.items.sts.length; i++) {
      //   const el = this.items?.sts
      //   const tbp = el[i].tbp?.length ? this.hitungTBP(el[i].tbp) : 0
      //   const plain = el[i].pendpatanlain?.length
      //     ? this.hitungPlain(el[i].pendpatanlain)
      //     : 0
      //   const jumlah = tbp + plain
      //   const obj = {
      //     tgl: el[i].tgl,
      //     notrans: el[i].noSetor,
      //     nonpd: null,
      //     category: 'sts',
      //     uraian: el[i].ket,
      //     uraianNPD: null,
      //     urutan: 1,
      //     penerimaan: jumlah,
      //     pengeluaran: 0
      //   }
      //   sts.push(obj)
      // }
      // // =====================================================

      // // ===================================================STS

      // const pendapatanlain = []
      // for (let i = 0; i < this.items.pendapatan.length; i++) {
      //   const el = this.items?.pendapatan
      //   const obj = {
      //     tgl: el[i].pendapatanlain.rs2,
      //     notrans: el[i].rs1,
      //     nonpd: null,
      //     category: 'pendapatan',
      //     uraian: 'Pendapatan dari ' + el[i].ket,
      //     uraianNPD: null,
      //     urutan: 1,
      //     penerimaan: el[i].rs4,
      //     pengeluaran: 0
      //   }
      //   pendapatanlain.push(obj)
      // }
      // // =====================================================

      // ===================================================SPM
      const spm = []
      for (let i = 0; i < this.items.spm.length; i++) {
        const el = this.items?.spm
        const obj = {
          tgl: el[i].tglSpm,
          notrans: el[i].noSpm,
          nonpd: null,
          category: 'spm',
          uraian: el[i].uraian,
          uraianNPD: null,
          urutan: 3,
          penerimaan: 0,
          pengeluaran: parseFloat(el[i].jumlahspp)
        }
        spm.push(obj)
      }
      // =====================================================

      // ===================================================SPMGU
      const spmgu = []
      for (let i = 0; i < this.items.spmgu.length; i++) {
        const el = this.items?.spmgu
        const obj = {
          tgl: el[i].tglSpm,
          notrans: el[i].noSpm,
          nonpd: null,
          category: 'spmgu',
          uraian: el[i].uraian,
          uraianNPD: null,
          urutan: 4,
          penerimaan: 0,
          pengeluaran: parseFloat(el[i].jumlahspp)
        }
        spmgu.push(obj)
      }
      // =====================================================

      // ===================================================NPKls
      const npkls = []
      // const setx = this.npkls.map((x) => x.nonpk)
      // const setunikx = setx.length ? [...new Set(setx)] : []
      for (let i = 0; i < this.npkls.length; i++) {
        const el = this.npkls[i]

        const rinci = el.npklsrinci
        // const npdx = rinci.map((x) => x.npdlshead?.npdlsrinci.map((x) => parseFloat(x.nominalpembayaran)).reduce((a, b) => a + b, 0)).reduce((x, y) => x + y, 0)
        // const npdrinci = npdx.length ? npdx.map((x) => x.nominalpembayaran) : []
        // const setunikx = rinci.length ? [...new Set(rinci)] : []
        const obj = {
          tgl: el.tglpindahbuku,
          notrans: el.nonpk,
          nonpd: rinci.map((x) => x.nonpdls),
          category: 'npkls',
          uraian: 'Pengeluaran Kegiatan Pelayanan dan Penunjang BLUD',
          uraianNPD: rinci.map((x) => x.kegiatanblud),
          urutan: 4,
          penerimaan: 0,
          pengeluaran: rinci.map((x) => parseFloat(x.total)).reduce((a, b) => a + b, 0)
        }
        npkls.push(obj)
      }

      // for (let i = 0; i < this.items.npkls.length; i++) {
      //   const el = this.items?.npkls
      //   const nonpd = el[i].npklsrinci?.length
      //     ? this.ambilDataUnik(
      //       el[i].npklsrinci?.map((x) => {
      //         return {
      //           nonpd: x.nonpdls,
      //           uraianNPD: x.kegiatanblud,
      //           rincian: x.npdlshead?.npdlsrinci?.length
      //             ? this.ambilDataUnik(
      //               x.npdlshead?.npdlsrinci?.map((z) => {
      //                 return {
      //                   koderek50: z.koderek50,
      //                   rincianbelanja: z.rincianbelanja
      //                 }
      //               }),
      //               (k) => k?.koderek50
      //             )
      //             : [],
      //           totalRincian: x.npdlshead?.npdlsrinci?.length
      //             ? this.hitungTotalNpd(x.npdlshead?.npdlsrinci)
      //             : 0
      //         }
      //       }),
      //       (k) => k?.nonpd
      //     )
      //     : []
      //   const obj = {
      //     tgl: el[i].tglpindahbuku,
      //     notrans: el[i].nonpk,
      //     nonpd,
      //     // nonpd: nonpd,
      //     category: 'npkls',
      //     uraian: 'Pengeluaran Kegiatan Pelayanan dan Penunjang BLUD',
      //     uraianNPD: el[i]?.npklsrinci?.npdlshead?.kegiatanblud,
      //     // uraianrekening: null,
      //     urutan: 4,
      //     penerimaan: 0,
      //     pengeluaran: nonpd.length
      //       ? nonpd.map((x) => x.totalRincian).reduce((x, y) => x + y, 0)
      //       : 0
      //   }

      //   npkls.push(obj)
      // }

      // =====================================================

      // ===================================================Nihil
      const nihil = []
      for (let i = 0; i < this.items.nihil.length; i++) {
        const el = this.items?.nihil
        const obj = {
          tgl: el[i].tgltrans,
          notrans: el[i].nopengembalian,
          nonpd: null,
          category: 'nihil',
          uraian: 'Pengembalian Nihil',
          uraianNPD: null,
          urutan: 5,
          penerimaan: parseFloat(el[i].jmlpengembalianreal),
          pengeluaran: 0
        }
        nihil.push(obj)
      }
      // =====================================================
      // ===================================================Nihil
      const kurangikaskecil = []
      for (let i = 0; i < this.items.kaskecil.length; i++) {
        const el = this.items?.kaskecil
        const obj = {
          tgl: date.formatDate(el[i].tanggalpengeluaran, 'YYYY-MM-DD'),
          notrans: el[i].nomorpengeluaran,
          nonpd: null,
          category: 'kaskecil',
          uraian: 'Pengembalian Kepada Pasien',
          uraianNPD: null,
          urutan: 6,
          penerimaan: 0,
          pengeluaran: parseFloat(el[i].nominal)
        }
        kurangikaskecil.push(obj)
      }
      // =====================================================
      // const setor = this.sebelumsetor.length

      // console.log("spmgu", spmgu);
      // console.log("spm", spm);
      // console.log("npkls", npkls);
      // console.log("nihil", nihil);
      // console.log("sadsadas", temp.splice(1, 1));
      // this.hasilArray = temp;

      // menggabungkan array
      const gabungArray = saldo?.concat(silpa, setor, spm, spmgu, npkls, nihil, kurangikaskecil)
      const aaa = gabungArray.map((x) => parseFloat(x.penerimaan))
      console.log('cek hasil debit', aaa)

      // urutan by tanggal
      const sortByDate = (gabungArray) =>
        gabungArray.sort(({ tgl: a }, { tgl: b }) =>
          a < b ? -1 : a > b ? 1 : 0
        )

      const hslSmntara = sortByDate(gabungArray)

      // Cari Total Zigzag
      this.hasilArray = this.cariHasilAkhirArray(hslSmntara)

      console.log('hasil gabung', this.hasilArray)
    },

    cariHasilAkhirArray (arr) {
      let total = 0
      if (arr.length) {
        for (let i = 0; i < arr.length; i++) {
          if (i === 0) {
            total = arr[0]?.subtotal + arr[0]?.penerimaan - arr[0]?.pengeluaran
            arr[0].total = total
          }
          else {
            const hinggaKeIndex = i + 1
            const arrBaru = arr.slice(1, hinggaKeIndex)
            const awal = arr[0]?.subtotal + arr[0]?.penerimaan - arr[0]?.pengeluaran
            // const subT = arr[i]?.penerimaan - arr[i]?.pengeluaran;
            const obj = arrBaru.map((x) => x.penerimaan - x.pengeluaran)
            const skrg = obj?.reduce((x, y) => x + y, 0)
            arr[i].total = awal + skrg
          }
        }
      }
      return arr
    },

    // totalPenerimaan(arr) {
    //   let totaldebit = 0;
    //   if (arr.length) {
    //     for (let i = 0; i < arr.length; i++) {
    //       if (i === 0) {
    //         totaldebit = arr[0]?.penerimaan;
    //         arr[0].totaldebit = totaldebit;
    //       } else {
    //         const totaldebit = arr[i].penerimaan?.reduce((a, b) => a + b, 0);
    //         arr[i].totaldebit = totaldebit;
    //       }
    //     }
    //   }
    //   return arr;
    // },

    ambilDataUnik (x, f) {
      // eslint-disable-next-line no-sequences
      const unique = Object.values(x.reduce((a, b) => ((a[f(b)] = b), a), {}))
      return unique
    },
    hitungTotalNpd (arr) {
      return arr
        .map((x) => x.nominalpembayaran)
        .reduce((x, y) => parseFloat(x) + parseFloat(y), 0)
    },
    hitungTBP (arr) {
      return arr.map((x) => x.nilai).reduce((x, y) => x + y, 0)
    },
    hitungPlain (arr) {
      return arr.map((x) => x.plainlain.rs4).reduce((x, y) => x + y, 0)
    },
    hitungjumlahAwal (arr) {
      // eslint-disable-next-line no-undef
      return arr.sum(penerimaan - pengeluaran)
    }
  }
})
