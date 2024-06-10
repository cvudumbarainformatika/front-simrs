import { defineStore } from 'pinia'
import { date } from 'quasar'
import { api } from 'src/boot/axios'

export const useLaporanBkuPtkStore = defineStore('laporan_bkuptk', {
  state: () => ({
    loading: false,
    items: [],
    meta: {},
    params: {
      q: '',
      page: 1,
      bulan: date.formatDate(Date.now(), 'MM'),
      tahun: date.formatDate(Date.now(), 'YYYY'),
      ptk: ''
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
    ptks: [
      // { nama: 'ENDAH NINGRUM, S.H', value: '19681031 199203 2 005' },
      // { nama: 'YULIANA, S.A.P', value: '19740304 200801 2 005' },
      // { nama: 'RIKE DWI ARYANTI, S.E., M.M.', value: '19670624 199203 2 004' },
      // { nama: 'ELLY YUNIAR, S.Sos.M.Si', value: '19670624 199203 2 004' },
      // { nama: 'HERDIANTO, S.Kom', value: '19790102 200903 1 001' },
      // { nama: 'BAGUS RAHMAT SOLIKIN, SE, MM', value: '19870326 201101 1 006' },
      // { nama: 'ANDJAR SUPADMAWATI, S.Kep, MM', value: '19660410 199203 2 010' },
      // { nama: 'ATIEK RACHMAWATI, S.E.', value: '19740923 200701 2 006' },
      // { nama: 'RUMPOKO, S. Sos, M.Si', value: '19660128 199010 1 001' },
      // { nama: 'USWATUN KHASANAH, S.Kep, Ns', value: '19810525 200903 2 002' },
      // { nama: 'SUYANI, S. Sos', value: '19661125 199603 2 003' },
      // { nama: 'RITA TRISSIANA, S.K.M.', value: '19690722 199503 2 002' },
      // { nama: 'UMI KUSUMA WARDANI, S.Kep, Ns', value: '19780512 200312 2 016' },
      // { nama: 'EKO HARTONO SETIAWAN, S.KM', value: '19780522 200012 1 002' },
      // { nama: 'TATY SETYA R, S.Ak', value: '19820306 201001 2 026' }
    ]

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
        .get('v1/laporan/laporan_bku/bkuptk', params)
        .then((resp) => {
          console.log('dataBKUptk', resp)
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
    getPtks () {
      this.loading = true
      return new Promise((resolve) => {
        api.get('v1/laporan/laporan_bku/ptk').then((resp) => {
          // console.log('ptk', resp)
          if (resp.status === 200) {
            this.ptks = resp.data
            resolve(resp)
          }
        })
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
      // ===================================================NPKPanjar
      // eslint-disable-next-line camelcase
      const npk_Panjar = []
      for (let i = 0; i < this.items.npkpanjar.length; i++) {
        const el = this.items?.npkpanjar
        const pjr = el[i].npkrinci?.length
          ? el[i].npkrinci?.map((x) => {
            return {
              nonpd: x.nonpd,
              uraianNPD: x.kegiatanblud,
              totalRincian: parseInt(x.total),
              rincian: x.npdpjr_head?.length
                ? x.npdpjr_head?.map((y) => {
                  return {
                    rincinpd: y.npdpjr_rinci?.length
                      ? y.npdpjr_rinci?.map((z) => {
                        return {
                          koderek50: z.koderek50,
                          rincianbelanja: z.rincianbelanja50,
                          nilaiRincian: parseInt(z.totalpermintaanpanjar)
                        }
                      })
                      : []
                  }
                })
                : []
            }
          })
          : []
        // console.log("kakak", pjr);
        const obj = {
          tgl: el[i].tglnpk,
          notrans: el[i].nonpk,
          lsdebit: null,
          nonpd: null,
          pjr,
          spjpanjar: null,
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

        // console.log("husye", spjnyaPanjar);
        const obj = {
          tgl: el[i].tglspjpanjar,
          notrans: el[i].nospjpanjar,
          lsdebit: null,
          nonpd: null,
          pjr: null,
          spjpanjar: spjnyaPanjar,
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
      // console.log("spjPanjar", spj_Panjar);

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
          lsdebit: null,
          nonpd: null,
          pjr: null,
          spjpanjar: null,
          cppjr: cpallpjr,
          sisapanjar: null,
          uraian: el[i].keterangan,
          uraianNPD: null,
          penerimaan: 0,
          pengeluaran: cpallpjr.length
            ? cpallpjr.map((x) => x.totalRincian).reduce((x, y) => x + y, 0)
            : 0
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
          lsdebit: null,
          nonpd: null,
          pjr: null,
          spjpanjar: null,
          cppjr: null,
          sisapanjar,
          uraian: 'Pengembalian Sisa Panjar',
          uraianNPD: null,
          penerimaan: 0,
          pengeluaran: sisapanjar?.length
            ? sisapanjar?.map((x) => x.totalRincian).reduce((x, y) => x + y, 0)
            : 0
        }
        sisapjr.push(obj)
      }
      // console.log("sisa", sisapjr);
      // =====================================================

      // ===================================================pencairanLS
      const LSdebit = []
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
          lsdebit: nonpd,
          nonpd: null,
          pjr: null,
          spjpanjar: null,
          cppjr: null,
          sisapanjar: null,
          uraian: 'Penerimaan Kegiatan Pelayanan dan Penunjang BLUD',
          uraianNPD: el[i]?.npklsrinci?.npdlshead?.kegiatanblud,
          penerimaan: nonpd.length
            ? nonpd.map((x) => x.totalRincian).reduce((x, y) => x + y, 0)
            : 0,
          pengeluaran: 0
        }

        LSdebit.push(obj)
      }
      // console.log("pencairanLS", pencairanLS);
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
          lsdebit: null,
          nonpd,
          pjr: null,
          spjpanjar: null,
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
      // eslint-disable-next-line camelcase
      const gabungArray = npk_Panjar?.concat(
        spj_Panjar,
        kembalianpjr,
        sisapjr,
        LSdebit,
        pencairanLS
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

    hitungNpdpanjar (arr) {
      return arr
        .map((x) => x.total)
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
})
