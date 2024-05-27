import { defineStore } from 'pinia'
import { date } from 'quasar'
import { api } from 'src/boot/axios'

export const useLaporanBukuBankStore = defineStore('laporan_bukubank', {
  state: () => ({
    loading: false,
    items: [],
    meta: {},
    params: {
      q: '',
      page: 1,
      bulan: date.formatDate(Date.now(), 'MM'),
      tahun: date.formatDate(Date.now(), 'YYYY')
      // per_page: 10,
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
    hasilArray: [],
    arrayTanggal: []
  }),

  actions: {
    setParams(key, val) {
      this.params[key] = val
    },

    getInitialData() {
      this.getDataTable()
    },
    async getDataTable() {
      this.loading = true
      const params = { params: this.params }
      await api
        .get('v1/laporan/laporan_bku/bukubank', params)
        .then((resp) => {
          console.log('dataBukuBank', resp)
          if (resp.status === 200) {
            this.hasilArray = []
            this.items = []
            this.items = resp.data
            this.hitungharidalamBulan()
            this.loading = false
          }
        })
        .catch(() => {
          this.loading = false
        })
    },
    hitungharidalamBulan() {
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
      // console.log("cccc", tempTanggal);
      this.loading = false
      // return cariBulan;
    },
    buatTanggal(n) {
      const tgl = n > 9 ? n : '0' + n
      const thn = this.params.tahun
      const bln = this.params.bulan
      return thn + '-' + bln + '-' + tgl
    },

    mapingData(tgl) {
      // console.log("www", tgl);

      // ===================================================SPM
      const spm = []
      for (let i = 0; i < this.items.spm.length; i++) {
        const el = this.items?.spm
        const obj = {
          tgl: el[i].tglSpm,
          notrans: el[i].noSpm,
          nonpd: null,
          pjr: null,
          bank_kas: null,
          kas_bank: null,
          cppjr: null,
          sisapanjar: null,
          uraian: el[i].uraian,
          uraianNPD: null,
          penerimaan: parseInt(el[i].jumlahspp),
          pengeluaran: 0
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
          pjr: null,
          bank_kas: null,
          kas_bank: null,
          cppjr: null,
          sisapanjar: null,
          uraian: el[i].uraian,
          uraianNPD: null,
          penerimaan: parseInt(el[i].jumlahspp),
          pengeluaran: 0
        }
        spmgu.push(obj)
      }
      // =====================================================
      // ===================================================Pergeseran BankKas
      const Kaskebank = []
      for (let i = 0; i < this.items.kaskebank.length; i++) {
        const el = this.items?.kaskebank
        const geserbank = el[i].kasrinci?.length
          ? el[i].kasrinci?.map((x) => {
            return {
              nonpd: x.nonpk,
              uraianNPD: x.keterangan,
              nilai: parseInt(x.jumlah)
              // el[i].kasrinci?.length
              //   ? this.hitungPergeseran(el[i].kasrinci)
              //   : 0,
            }
          })
          : []
        const obj = {
          tgl: el[i].tgltrans,
          notrans: el[i].notrans,
          nonpd: null,
          pjr: null,
          bank_kas: null,
          kas_bank: geserbank,
          cppjr: null,
          sisapanjar: null,
          uraian: 'Pergeseran Saldo ' + el[i].jenis,
          uraianNPD: null,
          penerimaan: geserbank?.length
            ? geserbank?.map((x) => x.nilai).reduce((x, y) => x + y, 0)
            : 0,
          pengeluaran: 0
        }

        Kaskebank.push(obj)
      }
      // console.log("jajas", Kaskebank);
      // =====================================================

      // ===================================================Pergeseran BankKas
      // eslint-disable-next-line camelcase
      const Bank_Kas = []
      for (let i = 0; i < this.items.bankkekas.length; i++) {
        const el = this.items?.bankkekas
        const geserbank = el[i].kasrinci?.length
          ? el[i].kasrinci?.map((x) => {
            return {
              nonpd: x.nonpd,
              uraianNPD: x.keterangan,
              nilai: parseInt(x.jumlah)
              // el[i].kasrinci?.length
              //   ? this.hitungPergeseran(el[i].kasrinci)
              //   : 0,
            }
          })
          : []
        const obj = {
          tgl: el[i].tgltrans,
          notrans: el[i].notrans,
          nonpd: null,
          pjr: null,
          bank_kas: geserbank,
          kas_bank: null,
          cppjr: null,
          sisapanjar: null,
          uraian: 'Pergeseran Saldo ' + el[i].jenis,
          uraianNPD: null,
          penerimaan: 0,
          pengeluaran: geserbank?.length
            ? geserbank?.map((x) => x.nilai).reduce((x, y) => x + y, 0)
            : 0
        }
        // eslint-disable-next-line camelcase
        Bank_Kas.push(obj)
      }
      // console.log("jajas", Bank_Kas);
      // =====================================================

      // ===================================================Pergeseran BankKas
      // let bankkeKas = [];
      // const bankkas = this.items?.pergeserankas.filter(
      //   (x) => x.jenis === "Bank Ke Kas"
      // );
      // if (bankkas?.length) {
      //   for (let i = 0; i < bankkas.length; i++) {
      //     const obj = {
      //       tgl: bankkas[i].tgltrans,
      //       notrans: bankkas[i].notrans,
      //       nonpd: null,
      //       category: "BankkeKas",
      //       uraian: bankkas[i].jenis,
      //       uraianNPD: null,

      //       penerimaan: 0,
      //       pengeluaran: bankkas[i].kasrinci?.length
      //         ? this.hitungPergeseran(bankkas[i].kasrinci)
      //         : 0,
      //     };
      //     bankkeKas.push(obj);
      //     // console.log("kassss", el);
      //   }
      // }
      // =====================================================
      // ===================================================npkls
      const npkls = []
      for (let i = 0; i < this.items.pencairanls.length; i++) {
        const el = this.items?.pencairanls
        const nonpd = el[i].npklsrinci?.length
          ? this.ambilDataUnik(
            el[i].npklsrinci?.map((x) => {
              return {
                nonpd: x.nonpdls,
                uraianNPD: x.kegiatanblud,
                rincian: x.npdlshead?.npdlsrinci?.length
                  ? this.ambilDataUnik(
                    x.npdlshead?.npdlsrinci?.map((z) => {
                      return {
                        koderek50: z.koderek50,
                        rincianbelanja: z.rincianbelanja
                      }
                    }),
                    (k) => k?.koderek50
                  )
                  : [],
                totalRincian: x.npdlshead?.npdlsrinci?.length
                  ? this.hitungTotalNpd(x.npdlshead?.npdlsrinci)
                  : 0
              }
            }),
            (k) => k?.nonpd
          )
          : []
        const obj = {
          tgl: el[i].tglnpk,
          notrans: el[i].nonpk,
          nonpd: null,
          pjr: null,
          bank_kas: null,
          kas_bank: null,
          cppjr: null,
          sisapanjar: null,
          uraian: 'Penerimaan Kegiatan Pelayanan dan Penunjang BLUD',
          uraianNPD: null,
          penerimaan: nonpd.length
            ? nonpd.map((x) => x.totalRincian).reduce((x, y) => x + y, 0)
            : 0,
          pengeluaran: 0
        }

        npkls.push(obj)
      }
      // =====================================================

      // ===================================================pencairanLS
      const pencairanLS = []
      for (let i = 0; i < this.items.pencairanls.length; i++) {
        const el = this.items?.pencairanls
        const nonpd = el[i].npklsrinci?.length
          ? this.ambilDataUnik(
            el[i].npklsrinci?.map((x) => {
              return {
                nonpd: x.nonpdls,
                uraianNPD: x.kegiatanblud,
                rincian: x.npdlshead?.npdlsrinci?.length
                  ? this.ambilDataUnik(
                    x.npdlshead?.npdlsrinci?.map((z) => {
                      return {
                        koderek50: z.koderek50,
                        rincianbelanja: z.rincianbelanja
                      }
                    }),
                    (k) => k?.koderek50
                  )
                  : [],
                totalRincian: x.npdlshead?.npdlsrinci?.length
                  ? this.hitungTotalNpd(x.npdlshead?.npdlsrinci)
                  : 0
              }
            }),
            (k) => k?.nonpd
          )
          : []
        const obj = {
          tgl: el[i].tglpencairan,
          notrans: el[i].nopencairan,
          nonpd,
          pjr: null,
          bank_kas: null,
          kas_bank: null,
          cppjr: null,
          sisapanjar: null,
          uraian: 'Pengeluaran Kegiatan Pelayanan dan Penunjang BLUD',
          uraianNPD: el[i]?.npklsrinci?.npdlshead?.kegiatanblud,
          // uraianrekening: null,
          penerimaan: 0,
          pengeluaran: nonpd.length
            ? nonpd.map((x) => x.totalRincian).reduce((x, y) => x + y, 0)
            : 0
        }

        pencairanLS.push(obj)
      }
      // =====================================================

      // ===================================================cp
      const cp = []
      const cpls = this.items.cp.filter((x) => x.jenisbelanja === 'LS')
      if (cpls?.length) {
        for (let i = 0; i < this.items.cp.length; i++) {
          const el = this.items?.cp
          const obj = {
            tgl: date.formatDate(el[i].tglcontrapost, 'YYYY-MM-DD'),
            notrans: el[i].nocontrapost,
            nonpd: null,
            pjr: null,
            bank_kas: null,
            kas_bank: null,
            cppjr: null,
            sisapanjar: null,
            uraian: 'Contrapost',
            uraianNPD: el[i].kegiatanblud,
            penerimaan: parseInt(el[i].nominalcontrapost),
            pengeluaran: 0
          }
          cp.push(obj)
        }
      }
      // =====================================================

      // ===================================================Nihil
      const nihil = []
      for (let i = 0; i < this.items.nihil.length; i++) {
        const el = this.items?.nihil
        const obj = {
          tgl: el[i].tgltrans,
          notrans: el[i].nopengembalian,
          nonpd: null,
          pjr: null,
          bank_kas: null,
          kas_bank: null,
          cppjr: null,
          sisapanjar: null,
          uraian: 'Pengembalian Nihil',
          uraianNPD: null,
          penerimaan: 0,
          pengeluaran: parseInt(el[i].jmlpengembalianreal)
        }
        nihil.push(obj)
      }
      // =====================================================

      // console.log("spm", spm);
      // console.log("kaskeBank", kaskeBank);
      // console.log("BankkeKas", bankkeKas);
      // console.log("spmgu", spmgu);
      // console.log("npkls", npkls);
      // console.log("pencairanls", pencairanLS);
      // console.log("cp", cp);
      // console.log("nihil", nihil);

      const gabungArray = spm?.concat(
        spmgu,
        Bank_Kas,
        npkls,
        pencairanLS,
        Kaskebank,
        cp,
        nihil
      )
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

    cariHasilAkhirArray(arr) {
      let total = 0
      if (arr.length) {
        for (let i = 0; i < arr.length; i++) {
          if (i === 0) {
            total = arr[0]?.penerimaan - arr[0]?.pengeluaran
            arr[0].total = total
          } else {
            const hinggaKeIndex = i + 1
            const arrBaru = arr.slice(1, hinggaKeIndex)
            const awal = arr[0]?.penerimaan - arr[0]?.pengeluaran
            // const subT = arr[i]?.penerimaan - arr[i]?.pengeluaran;
            const obj = arrBaru.map((x) => x.penerimaan - x.pengeluaran)
            const skrg = obj?.reduce((x, y) => x + y, 0)
            arr[i].total = awal + skrg
          }
        }
      }
      return arr
    },

    ambilDataUnik(x, f) {
      // eslint-disable-next-line no-sequences
      const unique = Object.values(x.reduce((a, b) => ((a[f(b)] = b), a), {}))
      return unique
    },
    hitungPergeseran(arr) {
      return arr
        .map((x) => x.jumlah)
        .reduce((x, y) => parseInt(x) + parseInt(y), 0)
    },
    hitungTotalNpd(arr) {
      return arr
        .map((x) => x.nominalpembayaran)
        .reduce((x, y) => parseInt(x) + parseInt(y), 0)
    },

    sumObjectsByKey(...objs) {
      return objs.reduce((a, b) => {
        for (const k in b) {
          // eslint-disable-next-line no-prototype-builtins
          if (b.hasOwnProperty(k)) a[k] = (a[k] || 0) + b[k]
        }
        return a
      }, {})
    },

    sum(penerimaan, pengeluaran) {
      const sum = {}

      Object.keys(penerimaan).forEach((key) => {
        // eslint-disable-next-line no-prototype-builtins
        if (pengeluaran.hasOwnProperty(key)) {
          sum[key] = penerimaan[key] + pengeluaran[key]
        }
      })
      return sum
    }
  }
})
