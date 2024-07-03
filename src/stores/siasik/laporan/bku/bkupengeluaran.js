import { defineStore } from 'pinia'
import { date } from 'quasar'
import { api } from 'src/boot/axios'

export const useLaporanBkuPengeluaranStore = defineStore(
  'laporan_bkupengeluaran',
  {
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
      hasilArray: [],
      arrayTanggal: [],
      pegawais: []
    }),
    actions: {
      setParams (key, val) {
        this.params[key] = val
      },
      getInitialData () {
        this.getDataTable()
      },
      async getDataTable () {
        this.loading = true
        const params = { params: this.params }
        await api
          .get('v1/laporan/laporan_bku/bkupengeluaran', params)
          .then((resp) => {
            console.log('BkuPengeluaran', resp)
            if (resp.status === 200) {
              this.hasilArray = []
              this.items = []
              this.items = resp.data
              this.pegawais = resp.data?.pegawai
              this.hitungharidalamBulan()
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
        // console.log("cccc", tempTanggal);
        this.loading = false
        // return cariBulan;
      },
      buatTanggal (n) {
        const tgl = n > 9 ? n : '0' + n
        const thn = this.params.tahun
        const bln = this.params.bulan
        return thn + '-' + bln + '-' + tgl
      },

      mapingData () {
        // ===================================================SPM
        const spm = []
        for (let i = 0; i < this.items.spm.length; i++) {
          const el = this.items?.spm
          const obj = {
            tgl: el[i].tglSpm,
            notrans: el[i].noSpm,
            nonpd: null,
            pjr: null,
            spjpanjar: null,
            pergeseran: null,
            cppjr: null,
            sisapanjar: null,
            uraian: el[i].uraian,
            uraianNPD: null,
            penerimaan: parseInt(el[i].jumlahspp),
            pengeluaran: 0
          }
          spm.push(obj)
        }
        // console.log("spm", spm);
        // =====================================================
        // ===================================================Pergeseran BankKas
        const geserDebit = []
        for (let i = 0; i < this.items.pergeserankas.length; i++) {
          const el = this.items?.pergeserankas
          const geserbank = el[i].kasrinci?.length
            ? el[i].kasrinci?.map((x) => {
              return {
                nonpd: x.nonpk,
                uraianNPD: x.keterangan,
                nilai: el[i].kasrinci?.length
                  ? this.hitungPergeseran(el[i].kasrinci)
                  : 0
              }
            })
            : []
          const obj = {
            tgl: el[i].tgltrans,
            notrans: el[i].notrans,
            nonpd: null,
            pjr: null,
            spjpanjar: null,
            pergeseran: geserbank,
            cppjr: null,
            sisapanjar: null,
            uraian: 'Pergeseran Saldo ' + el[i].jenis,
            uraianNPD: null,
            penerimaan: geserbank?.length
              ? geserbank?.map((x) => x.nilai).reduce((x, y) => x + y, 0)
              : 0,
            pengeluaran: 0
          }

          geserDebit.push(obj)
        }

        // ===================================================Pergeseran BankKas
        const geserKredit = []
        for (let i = 0; i < this.items.pergeserankas.length; i++) {
          const el = this.items?.pergeserankas
          const geserbank = el[i].kasrinci?.length
            ? el[i].kasrinci?.map((x) => {
              return {
                nonpd: x.nonpk,
                uraianNPD: x.keterangan,
                nilai: el[i].kasrinci?.length
                  ? this.hitungPergeseran(el[i].kasrinci)
                  : 0
              }
            })
            : []
          const obj = {
            tgl: el[i].tgltrans,
            notrans: el[i].notrans,
            nonpd: null,
            pjr: null,
            spjpanjar: null,
            pergeseran: geserbank,
            cppjr: null,
            sisapanjar: null,
            uraian: 'Pergeseran Saldo ' + el[i].jenis,
            uraianNPD: null,
            penerimaan: 0,
            pengeluaran: geserbank?.length
              ? geserbank?.map((x) => x.nilai).reduce((x, y) => x + y, 0)
              : 0
          }

          geserKredit.push(obj)
        }

        // ===================================================NPKPanjar
        // eslint-disable-next-line camelcase
        const npk_Panjar = []
        for (let i = 0; i < this.items.npkpanjar.length; i++) {
          const el = this.items?.npkpanjar
          const pjr = el[i].npkrinci?.length
            ? this.ambilDataUnik(
              el[i].npkrinci?.map((x) => {
                return {
                  nonpd: x.nonpd,
                  uraianNPD: x.kegiatanblud,
                  rincian: x.npdpjr_rinci?.length
                    ? this.ambilDataUnik(
                      x.npdpjr_rinci?.map((z) => {
                        return {
                          koderek50: z.koderek50,
                          rincianbelanja: z.rincianbelanja50
                        }
                      }),
                      (k) => k?.koderek50
                    )
                    : [],
                  totalRincian: x.npdpjr_rinci?.length
                    ? this.hitungpjr(x.npdpjr_rinci)
                    : 0
                }
              }),
              (k) => k?.nonpd
            )
            : []
          // console.log("kakak", pjr);
          const obj = {
            tgl: el[i].tglnpk,
            notrans: el[i].nonpk,
            nonpd: null,
            pjr: null,
            spjpanjar: null,
            pergeseran: null,
            cppjr: null,
            sisapanjar: null,
            uraian: 'Penerimaan Panjar Kegiatan Pelayanan dan Penunjang BLUD',
            uraianNPD: null,
            penerimaan: pjr?.length
              ? pjr?.map((x) => x.totalRincian).reduce((x, y) => x + y, 0)
              : 0,
            pengeluaran: 0
          }
          // eslint-disable-next-line camelcase
          npk_Panjar.push(obj)
        }
        // console.log("npkPanjar", npk_Panjar);
        // ==================================================

        // ===================================================NPKPanjar
        const CairNpkPanjar = []
        for (let i = 0; i < this.items.npkpanjar.length; i++) {
          const el = this.items?.npkpanjar
          const pjr = el[i].npkrinci?.length
            ? this.ambilDataUnik(
              el[i].npkrinci?.map((x) => {
                return {
                  nonpd: x.nonpd,
                  uraianNPD: x.kegiatanblud,
                  rincian: x.npdpjr_rinci?.length
                    ? this.ambilDataUnik(
                      x.npdpjr_rinci?.map((z) => {
                        return {
                          koderek50: z.koderek50,
                          rincianbelanja: z.rincianbelanja50
                        }
                      }),
                      (k) => k?.koderek50
                    )
                    : [],
                  totalRincian: x.npdpjr_rinci?.length
                    ? this.hitungpjr(x.npdpjr_rinci)
                    : 0
                }
              }),
              (k) => k?.nonpd
            )
            : []
          // console.log("kakak", pjr);
          const obj = {
            tgl: el[i].tglnpk,
            notrans: el[i].nonpk,
            nonpd: null,
            pjr,
            spjpanjar: null,
            pergeseran: null,
            cppjr: null,
            sisapanjar: null,
            uraian: 'Pengeluaran Panjar Kegiatan Pelayanan dan Penunjang BLUD',
            uraianNPD: null,
            penerimaan: 0,
            pengeluaran: pjr?.length
              ? pjr?.map((x) => x.totalRincian).reduce((x, y) => x + y, 0)
              : 0
          }
          CairNpkPanjar.push(obj)
        }
        // console.log("npkPanjar", npk_Panjar);
        // ==================================================

        // ===================================================spjpanjar
        // eslint-disable-next-line camelcase
        const spj_Panjar = []
        for (let i = 0; i < this.items.spjpanjar.length; i++) {
          const el = this.items?.spjpanjar
          const spjnyaPanjar = el[i].spj_rinci?.length
            ? el[i].spj_rinci?.map((x) => {
              return {
                totalRincian: parseInt(x.jumlahbelanjapanjar),
                koderek50: x.koderek50,
                rincianbelanja: x.rincianbelanja50
              }
            })
            : 0

          console.log('husye', spjnyaPanjar)
          const obj = {
            tgl: el[i].tglspjpanjar,
            notrans: el[i].nospjpanjar,
            nonpd: null,
            pjr: null,
            spjpanjar: spjnyaPanjar,
            pergeseran: null,
            cppjr: null,
            uraian: el[i].kegiatanblud,
            uraianNPD: null,
            penerimaan: 0,
            pengeluaran: spjnyaPanjar?.length
              ? spjnyaPanjar
                ?.map((x) => x.totalRincian)
                .reduce((x, y) => x + y, 0)
              : 0
          }
          // eslint-disable-next-line camelcase
          spj_Panjar.push(obj)
        }
        console.log('spjPanjar', spj_Panjar)

        // =====================================================

        // ===================================================Pengembalian Panjar
        const kembalianpjr = []
        for (let i = 0; i < this.items.pengembalianpjr.length; i++) {
          const el = this.items?.pengembalianpjr
          // console.log("adada", el);
          const cpallpjr = el?.length
            ? this.ambilDataUnik(
              el?.map((x) => {
                return {
                  nonpd: x.notapanjar,
                  uraianNPD: x.kegiatanblud,
                  rincian: x.cppjr_rinci?.length
                    ? this.ambilDataUnik(
                      x.cppjr_rinci?.map((z) => {
                        return {
                          koderek50: z.koderek50,
                          rincianbelanja: z.rincianbelanja50
                        }
                      }),
                      (k) => k?.koderek50
                    )
                    : [],
                  totalRincian: x.cppjr_rinci?.length
                    ? this.hitungpengembalianpjr(x.cppjr_rinci)
                    : 0
                }
              }),
              (k) => k?.cpallpjr
            )
            : []
          // console.log("xx", cpallpjr);
          const obj = {
            tgl: el[i].tglpengembalianpanjar,
            notrans: el[i].nopengembalianpanjar,
            nonpd: null,
            pjr: null,
            spjpanjar: null,
            pergeseran: null,
            cppjr: cpallpjr,
            sisapanjar: null,
            uraian: el[i].keterangan,
            uraianNPD: null,
            penerimaan: cpallpjr.length
              ? cpallpjr.map((x) => x.totalRincian).reduce((x, y) => x + y, 0)
              : 0,
            pengeluaran: 0
          }
          kembalianpjr.push(obj)
        }
        // console.log("kembalianpjr", kembalianpjr);
        // =====================================================

        // ===================================================Sisa Panjar
        const sisapjr = []
        for (let i = 0; i < this.items?.cpsisapjr?.length; i++) {
          const el = this.items?.cpsisapjr
          const sisapanjar = el[i].sisarinci?.length
            ? el[i].sisarinci?.map((x) => {
              return {
                totalRincian: parseInt(x.sisapanjar),
                koderek50: x.koderek50,
                rincianbelanja: x.rincianbelanja50
              }
            })
            : 0
          // console.log("joajuw", sisapanjar);
          const obj = {
            tgl: el[i].tglpengembaliansisapanjar,
            notrans: el[i].nopengembaliansisapanjar,
            nonpd: null,
            pjr: null,
            spjpanjar: null,
            pergeseran: null,
            cppjr: null,
            sisapanjar,
            uraian: 'Pengembalian Sisa Panjar',
            uraianNPD: null,
            penerimaan: sisapanjar?.length
              ? sisapanjar
                ?.map((x) => x.totalRincian)
                .reduce((x, y) => x + y, 0)
              : 0,
            pengeluaran: sisapanjar?.length
              ? sisapanjar
                ?.map((x) => x.totalRincian)
                .reduce((x, y) => x + y, 0)
              : 0
          }
          sisapjr.push(obj)
        }
        console.log('sisa', sisapjr)
        // =====================================================

        // ===================================================npkls
        const npkls = []
        for (let i = 0; i < this.items.npkls.length; i++) {
          const el = this.items?.npkls
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
            spjpanjar: null,
            pergeseran: null,
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
        // console.log("npkls", npkls);
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
            spjpanjar: null,
            pergeseran: null,
            cppjr: null,
            sisapanjar: null,
            uraian: 'Pengeluaran Kegiatan Pelayanan dan Penunjang BLUD',
            uraianNPD: el[i]?.npklsrinci?.npdlshead?.kegiatanblud,
            penerimaan: 0,
            pengeluaran: nonpd.length
              ? nonpd.map((x) => x.totalRincian).reduce((x, y) => x + y, 0)
              : 0
          }

          pencairanLS.push(obj)
        }
        // console.log("pencairanLS", pencairanLS);
        // =====================================================

        // ===================================================cp
        const cp = []
        // const cppjr = this.items.cp.filter((x) => x.jenisbelanja === "Panjar");
        // if (cppjr?.length) {
        for (let i = 0; i < this.items.cp.length; i++) {
          const el = this.items?.cp
          const obj = {
            tgl: date.formatDate(el[i].tglcontrapost, 'YYYY-MM-DD'),
            notrans: el[i].nocontrapost,
            nonpd: null,
            pjr: null,
            spjpanjar: null,
            pergeseran: null,
            cppjr: null,
            sisapanjar: null,
            uraian: 'Contrapost',
            uraianNPD: null,
            penerimaan: parseInt(el[i].nominalcontrapost),
            pengeluaran: 0
          }
          cp.push(obj)
          // }
        }
        // console.log("cp", cp);
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
            spjpanjar: null,
            pergeseran: null,
            cppjr: null,
            sisapanjar: null,
            uraian: el[i].uraian,
            uraianNPD: null,
            penerimaan: parseInt(el[i].jumlahspp),
            pengeluaran: 0
          }
          spmgu.push(obj)
        }
        // console.log("spmgu", spmgu);
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
            spjpanjar: null,
            pergeseran: null,
            cppjr: null,
            sisapanjar: null,
            uraian: 'Pengembalian Nihil',
            uraianNPD: null,
            penerimaan: 0,
            pengeluaran: parseInt(el[i].jmlpengembalianreal)
          }
          nihil.push(obj)
        }
        // console.log("nihil", nihil);
        // =====================================================

        // console.log("spm", spm);
        // console.log("pergeseranKASD", pergeseranKASD);
        // console.log("npkPanjar", npkPanjar);
        // console.log("cairNpkPanjar", cairNpkPanjar);
        // console.log("spjPanjar", spjPanjar);
        // console.log("kembalianpjr", kembalianpjr);
        // console.log("sisapjr", sisapjr);
        // console.log("npkls", npkls);
        // console.log("pencairanLS", pencairanLS);
        // console.log("cp", cp);
        // console.log("spmgu", spmgu);
        // console.log("nihil", nihil);

        const gabungArray = spm?.concat(
          geserDebit,
          npk_Panjar,
          CairNpkPanjar,
          spj_Panjar,
          kembalianpjr,
          sisapjr,
          spmgu,
          geserKredit,
          npkls,
          pencairanLS,
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

      cariHasilAkhirArray (arr) {
        let total = 0
        if (arr.length) {
          for (let i = 0; i < arr.length; i++) {
            if (i === 0) {
              total = arr[0]?.penerimaan - arr[0]?.pengeluaran
              arr[0].total = total
            }
            else {
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
      ambilDataUnik (x, f) {
        // eslint-disable-next-line no-sequences
        const unique = Object.values(x.reduce((a, b) => ((a[f(b)] = b), a), {}))
        return unique
      },
      hitungPergeseran (arr) {
        return arr
          .map((x) => x.jumlah)
          .reduce((x, y) => parseInt(x) + parseInt(y), 0)
      },
      hitungNpdpanjar (arr) {
        return arr
          .map((x) => x.totalpermintaanpanjar)
          .reduce((x, y) => parseInt(x) + parseInt(y), 0)
      },
      hitungspjpanjar (arr) {
        return arr
          .map((x) => x.jumlahbelanjapanjar)
          .reduce((x, y) => parseInt(x) + parseInt(y), 0)
      },
      hitungpengembalianpjr (arr) {
        return arr
          .map((x) => x.sisapanjar)
          .reduce((x, y) => parseInt(x) + parseInt(y), 0)
      },
      hitungTotalNpd (arr) {
        return arr
          .map((x) => x.nominalpembayaran)
          .reduce((x, y) => parseInt(x) + parseInt(y), 0)
      },
      hitungpjr (arr) {
        return arr
          .map((x) => x.totalpermintaanpanjar)
          .reduce((x, y) => parseInt(x) + parseInt(y), 0)
      }
    }
  }
)
