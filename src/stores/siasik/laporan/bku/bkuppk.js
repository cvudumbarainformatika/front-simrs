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
        .get('v1/laporan/laporan_bku/bkuppk', params)
        .then((resp) => {
          console.log('dataBKUPPK', resp)
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
      // ===================================================Saldo

      const saldo = []
      for (let i = 0; i < this.items.saldo.length; i++) {
        const el = this.items?.saldo
        const obj = {
          tgl: el[i].tanggal,
          notrans: el[i].rekening,
          nonpd: null,
          category: 'sts',
          uraian: 'Saldo Awal Rekening ' + el[i].namaRek,
          uraianNPD: null,
          urutan: 1,
          penerimaan: el[i].nilaisaldo,
          pengeluaran: 0
        }
        saldo.push(obj)
      }
      // =====================================================
      // ===================================================STS
      const sts = []
      for (let i = 0; i < this.items.sts.length; i++) {
        const el = this.items?.sts
        const tbp = el[i].tbp?.length ? this.hitungTBP(el[i].tbp) : 0
        const plain = el[i].pendpatanlain?.length
          ? this.hitungPlain(el[i].pendpatanlain)
          : 0
        const jumlah = tbp + plain
        const obj = {
          tgl: el[i].tgl,
          notrans: el[i].noSetor,
          nonpd: null,
          category: 'sts',
          uraian: el[i].ket,
          uraianNPD: null,
          urutan: 1,
          penerimaan: jumlah,
          pengeluaran: 0
        }
        sts.push(obj)
      }
      // =====================================================

      // ===================================================STS

      const pendapatanlain = []
      for (let i = 0; i < this.items.pendapatan.length; i++) {
        const el = this.items?.pendapatan
        const obj = {
          tgl: el[i].pendapatanlain.rs2,
          notrans: el[i].rs1,
          nonpd: null,
          category: 'pendapatan',
          uraian: 'Pendapatan dari ' + el[i].ket,
          uraianNPD: null,
          urutan: 1,
          penerimaan: el[i].rs4,
          pengeluaran: 0
        }
        pendapatanlain.push(obj)
      }
      // =====================================================

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
          urutan: 2,
          penerimaan: 0,
          pengeluaran: parseInt(el[i].jumlahspp)
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
          urutan: 3,
          penerimaan: 0,
          pengeluaran: parseInt(el[i].jumlahspp)
        }
        spmgu.push(obj)
      }
      // =====================================================

      // ===================================================NPKls
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
          nonpd,
          // nonpd: nonpd,
          category: 'npkls',
          uraian: 'Pengeluaran Kegiatan Pelayanan dan Penunjang BLUD',
          uraianNPD: el[i]?.npklsrinci?.npdlshead?.kegiatanblud,
          // uraianrekening: null,
          urutan: 4,
          penerimaan: 0,
          pengeluaran: nonpd.length
            ? nonpd.map((x) => x.totalRincian).reduce((x, y) => x + y, 0)
            : 0
        }

        npkls.push(obj)
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
          category: 'nihil',
          uraian: 'Pengembalian Nihil',
          uraianNPD: null,
          urutan: 5,
          penerimaan: parseInt(el[i].jmlpengembalianreal),
          pengeluaran: 0
        }
        nihil.push(obj)
      }
      // =====================================================

      // console.log("spmgu", spmgu);
      // console.log("spm", spm);
      // console.log("npkls", npkls);
      // console.log("nihil", nihil);
      // console.log("sadsadas", temp.splice(1, 1));
      // this.hasilArray = temp;

      // menggabungkan array
      const gabungArray = saldo?.concat(sts, pendapatanlain, spm, spmgu, npkls, nihil)
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

    ambilDataUnik(x, f) {
      // eslint-disable-next-line no-sequences
      const unique = Object.values(x.reduce((a, b) => ((a[f(b)] = b), a), {}))
      return unique
    },
    hitungTotalNpd(arr) {
      return arr
        .map((x) => x.nominalpembayaran)
        .reduce((x, y) => parseInt(x) + parseInt(y), 0)
    },
    hitungTBP(arr) {
      return arr.map((x) => x.nilai).reduce((x, y) => x + y, 0)
    },
    hitungPlain(arr) {
      return arr.map((x) => x.plainlain.rs4).reduce((x, y) => x + y, 0)
    },
    hitungjumlahAwal(arr) {
      // eslint-disable-next-line no-undef
      return arr.sum(penerimaan - pengeluaran)
    }
  }
})
