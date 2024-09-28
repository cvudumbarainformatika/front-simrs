/* eslint-disable space-before-function-paren */
import { defineStore } from 'pinia'
import { date } from 'quasar'
import { api } from 'src/boot/axios'

export const useLaporanLraLaprealisasianggaranStore = defineStore('laporan_realisasi_anggaran', {
  state: () => ({
    loading: false,
    items: [],
    kodeakun: [],
    kodekelompok: [],
    kodejenis: [],
    kodeobjek: [],
    koderinciobjek: [],
    kodesubrinciobjek: [],
    meta: {},
    params: {
      q: '',
      page: 1,
      tgl: date.formatDate(Date.now(), 'YYYY-MM-DD'),
      tglx: date.formatDate(Date.now(), 'YYYY-MM-DD'),
      tahun: date.formatDate(Date.now(), 'YYYY'),
      bidang: '',
      kegiatan: '',
      kodebidang: null
    },
    display: {
      dari: date.formatDate(Date.now(), 'DD MMMM YYYY'),
      sampai: date.formatDate(Date.now(), 'DD MMMM YYYY'),
      sekarang: date.formatDate(Date.now(), 'DD MMMM YYYY')
    },
    reqlevels: null,
    pendapatans: [],
    nilaipends: [],
    realisasipends: [],
    mapbidangptk: [],
    bidangs: [],
    kegiatans: [],
    ptks: [],
    paguAnggaran: [],
    mapRekening: [],
    penggunaAnggaran: [],
    pembiayaans: [],
    realisasiPembiayaans: [],
    paguPembiayaans: [],
    kurangiKASs: [],
    level: [
      { nama: 'Akun', value: '1' },
      { nama: 'Kelompok', value: '2' },
      { nama: 'Jenis', value: '3' },
      { nama: 'Objek', value: '4' },
      { nama: 'Rincian Objek', value: '5' },
      { nama: 'SubRincian Objek', value: '6' }
    ]
  }),
  actions: {
    setParameter (key, val) {
      this.params[key] = val
    },
    setForm(key, val) {
      this.params[key] = val
    },
    emptyForm() {
      // this.params.bidang = ''
      this.params.kegiatan = ''
    },

    // eslint-disable-next-line space-before-function-paren
    getDataBidang() {
      this.loading = true
      const params = { params: this.params }
      return new Promise((resolve) => {
        api.get('v1/laporan/lra/bidang', params).then((resp) => {
          // console.log('bidang', resp)
          if (resp.status === 200) {
            this.mapbidangptk = resp.data
            // this.bidangs = resp.data
            // this.kegiatans = resp.data
            // this.ptks = resp.data
            this.loading = false
            this.filterBidang(resp.data)
            this.filterKegiatan(resp.data)
            this.filterPtk(resp.data)
            resolve(resp)
          }
        }).catch(() => { this.loading = false })
      })
    },
    filterBidang() {
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
    filterPtk() {
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
    filterKegiatan() {
      const data = this.mapbidangptk?.length
        ? this.mapbidangptk?.filter(x =>
          x.kodebidang === this.params.kodebidang
        )
        : []
      this.kegiatans = data
      console.log('kegiatans', this.kegiatans)
    },
    getDataRealisasi() {
      this.loading = true
      const params = { params: this.params }
      return new Promise(resolve => {
        api.get('v1/laporan/lra/laplra', params).then(resp => {
          // console.log('realisasi', resp)
          if (resp.status === 200) {
            // RESET HASIL GET
            this.items = []
            this.kodeakun = []
            this.kodekelompok = []
            this.kodejenis = []
            this.kodeobjek = []
            this.koderinciobjek = []
            this.kodesubrinciobjek = []
            this.pembiayaans = []
            // ---------//
            this.realisasipends = resp.data?.realisasipendapatan
            this.nilaipends = resp.data?.nilaipendapatan
            this.realisasiPembiayaans = resp.data?.silpa
            this.paguPembiayaans = resp.data?.silpa
            this.kurangiKASs = resp.data?.kurangikaskecil
            this.items = resp.data
            this.paguAnggaran(resp.data?.belanja)
            this.mapRekening(resp.data?.belanja)
            this.mapPendapatan(resp.data?.pendapatan)
            this.nilaiPendapatan(resp.data?.nilaipendapatan)
            this.realisasiPendapatan(resp.data?.realisasipendapatan)
            this.rekPembiayaan(resp.data?.pembiayaan)
            this.realisasiPembiayaan(resp.data?.silpa)
            this.paguPembiayaan(resp.data?.silpa)
            this.penggunaAnggaran = resp.data?.pa
            this.loading = false
            resolve(resp)
          }
        }).catch(() => {
          this.loading = false
          this.items = []
        })
      })
    },

    mapPendapatan(val) {
      this.pendapatans = val
    },

    // NILAI PAGU PENDAPATAN
    nilaiPendapatan(val) {
      const real = this.nilaipends?.map((x) => parseFloat(x.nilai))
      const total = {
        totalPaguPendapatan: real?.reduce((a, b) => a + b, 0)
      }

      this.nilaipends = total
      // console.log('anggaran', this.nilaipends)
      // for (let i = 0; i < val?.length; i++) {
      //   val.nilaipends =
      //     val?.map((x) => parseInt(x.nilai)).reduce((a, b) => a + b, 0)

      //   console.log('nilai', val.nilaipends)

      //   this.nilaipends.push(val.nilaipends)
      // }
    },

    // NILAI REALISASI PENDAPATAN
    realisasiPendapatan(val) {
      const kasSebelumnya = this.kurangiKASs?.filter((x) => {
        const tgl = new Date(x?.tanggalpengeluaran).getTime()
        return tgl < new Date(this.params.tgl).getTime()
      }).map((x) => parseFloat(x.nominal))

      const kasSekarang = this.kurangiKASs?.filter((x) => {
        const tgl = new Date(x?.tanggalpengeluaran).getTime()
        return tgl >= new Date(this.params.tgl).getTime() && tgl <= new Date(this.params.tglx).getTime()
      }).map((x) => parseFloat(x.nominal))

      const realSebelumnya = this.realisasipends?.filter((x) => {
        const tgl = new Date(x?.tgltrans).getTime()
        return tgl < new Date(this.params.tgl).getTime()
      }).map((x) => parseFloat(x.nilai))

      const real = this.realisasipends?.filter((x) => {
        const tgl = new Date(x?.tgltrans).getTime()
        return tgl >= new Date(this.params.tgl).getTime() && tgl <= new Date(this.params.tglx).getTime()
      }).map((x) => parseFloat(x.nilai))

      const totalPagu = this.nilaipends?.totalPaguPendapatan

      const total = {
        totalPaguPendapatan: totalPagu,
        totalSekarang: real?.reduce((a, b) => a + b, 0) - kasSekarang?.reduce((a, b) => a + b, 0),
        totalSebelumnya: realSebelumnya?.reduce((a, b) => a + b, 0) - kasSebelumnya?.reduce((a, b) => a + b, 0),
        totalRealisasi: (real?.reduce((a, b) => a + b, 0) + realSebelumnya?.reduce((a, b) => a + b, 0)) - (kasSekarang?.reduce((a, b) => a + b, 0) + kasSebelumnya?.reduce((a, b) => a + b, 0)),
        selisih: totalPagu - ((realSebelumnya?.reduce((a, b) => a + b, 0) + real?.reduce((a, b) => a + b, 0)) - (kasSekarang?.reduce((a, b) => a + b, 0) + kasSebelumnya?.reduce((a, b) => a + b, 0))),
        persen: (((((realSebelumnya?.reduce((a, b) => a + b, 0) + real?.reduce((a, b) => a + b, 0)) - (kasSekarang?.reduce((a, b) => a + b, 0) + kasSebelumnya?.reduce((a, b) => a + b, 0)))) / parseFloat(totalPagu)) * 100).toFixed(2)
      }

      this.realisasipends = total
      // console.log('realisasi', this.realisasipends)
      // for (let i = 0; i < val?.length; i++) {
      //   val[i].realpendapatan = val?.map((x) => parseInt(x.nilai)).reduce((a, b) => a + b, 0)
      //   console.log('real', val[i].realpendapatan)
      // }
    },
    rekPembiayaan(val) {
      this.pembiayaans = val
    },
    paguPembiayaan(val) {
      const real = this.paguPembiayaans?.map((x) => parseFloat(x.nominal))
      const total = {
        totalPaguPembiayaan: real?.reduce((a, b) => a + b, 0)
      }

      this.paguPembiayaans = total
    },
    realisasiPembiayaan(val) {
      const realSebelumnya = this.realisasiPembiayaans?.filter((x) => {
        const tgl = new Date(x?.tanggal).getTime()
        return tgl < new Date(this.params.tgl).getTime()
      }).map((x) => parseFloat(x.nominal))

      const realsekarang = this.realisasiPembiayaans?.filter((x) => {
        const tgl = new Date(x?.tanggal).getTime()
        return tgl >= new Date(this.params.tgl).getTime() && tgl <= new Date(this.params.tglx).getTime()
      }).map((x) => parseFloat(x.nominal))

      const totalPagu = this.paguPembiayaans?.map((x) => parseFloat(x.nominal)).reduce((a, b) => a + b, 0)

      // console.log('klklkl', totalPagu)

      const total = {
        totalPaguPembiayaan: totalPagu,
        totalSekarang: realsekarang?.reduce((a, b) => a + b, 0),
        totalSebelumnya: realSebelumnya?.reduce((a, b) => a + b, 0),
        totalRealisasi: realsekarang?.reduce((a, b) => a + b, 0) + realSebelumnya?.reduce((a, b) => a + b, 0),
        selisih: totalPagu - (realSebelumnya?.reduce((a, b) => a + b, 0) + realsekarang?.reduce((a, b) => a + b, 0)),
        persen: (((realSebelumnya?.reduce((a, b) => parseFloat(a) + parseFloat(b), 0) + realsekarang?.reduce((a, b) => parseFloat(a) + parseFloat(b), 0)) / parseFloat(totalPagu)) * 100).toFixed(2)
      }

      this.realisasiPembiayaans = total
      // console.log('realisasi', this.realisasiPembiayaans)
      // for (let i = 0; i < val?.length; i++) {
      //   val[i].realpendapatan = val?.map((x) => parseInt(x.nilai)).reduce((a, b) => a + b, 0)
      //   console.log('real', val[i].realpendapatan)
      // }
    },

    paguAnggaran (val) {
      // this.items = []
      // const Anggaran = []
      for (let i = 0; i < val?.length; i++) {
        const el = val[i].anggaran

        // FILTER TRANSAKSI SEBELUMNYA
        const lsAwal = val[i].npdls_rinci?.filter((x) => {
          const tgl = new Date(x?.headerls?.npkrinci?.header?.tglpindahbuku
          ).getTime()
          return tgl < new Date(this.params.tgl).getTime()
        })
        const pjrAwal = val[i].spjpanjar?.filter((x) => {
          const tgl = new Date(x?.spjheader?.tglspjpanjar).getTime()
          return tgl < new Date(this.params.tgl).getTime()
        })
        const cpAwal = val[i].cp?.filter((x) => {
          const tgl = new Date(x?.tglcontrapost).getTime()
          return tgl < new Date(this.params.tgl).getTime()
        })

        // FILTER TRANSAKSI SEKARANG
        const ls = val[i].npdls_rinci?.filter((x) => {
          const tgl = new Date(x?.headerls?.npkrinci?.header?.tglpindahbuku).getTime()
          return tgl >= new Date(this.params.tgl).getTime() && tgl <= new Date(this.params.tglx).getTime()
        })
        const pjr = val[i].spjpanjar?.filter((x) => {
          const tgl = new Date(x?.spjheader?.tglspjpanjar).getTime()
          return tgl >= new Date(this.params.tgl).getTime() && tgl <= new Date(this.params.tglx).getTime()
        })
        const cp = val[i].cp?.filter((x) => {
          const tgl = new Date(x?.tglcontrapost).getTime()
          return tgl >= new Date(this.params.tgl).getTime() && tgl <= new Date(this.params.tglx).getTime()
        })
        // const pagu = {
        //   totalPagu: el.map((x) => parseInt(x.pagu)).reduce((a, b) => a + b, 0)
        // }

        // NILAI PAGU
        val[i].totalPagu = el?.map((x) => parseInt(x.pagu)).reduce((a, b) => a + b, 0)

        // NILAI REALISASI SEBELUMNYA
        val[i].sumLSsebelumnya = lsAwal?.map((x) => parseInt(x.nominalpembayaran)).reduce((a, b) => a + b, 0)
        val[i].sumPanjarsebelumnya = pjrAwal?.map((x) => parseInt(x.jumlahbelanjapanjar)).reduce((a, b) => a + b, 0)
        val[i].sumCPsebelumnya = cpAwal?.map((x) => parseInt(x.nominalcontrapost)).reduce((a, b) => a + b, 0)
        val[i].totalRealisasiSebelumnya = val[i].sumLSsebelumnya + val[i].sumPanjarsebelumnya - val[i].sumCPsebelumnya

        // NILAI REALISASI SEKARANG
        val[i].sumLS = ls?.map((x) => parseInt(x.nominalpembayaran)).reduce((a, b) => a + b, 0)
        val[i].sumPanjar = pjr?.map((x) => parseInt(x.jumlahbelanjapanjar)).reduce((a, b) => a + b, 0)
        val[i].sumCP = cp?.map((x) => parseInt(x.nominalcontrapost)).reduce((a, b) => a + b, 0)
        val[i].totalRealisasi = val[i].sumLS + val[i].sumPanjar - val[i].sumCP

        // NILAI REALISASI KESELURUHAN
        val[i].RealisasiSemua = val[i].totalRealisasi + val[i].totalRealisasiSebelumnya
        // NILAI SELISIH
        val[i].selisih = val[i].totalPagu - (val[i].totalRealisasiSebelumnya + val[i].totalRealisasi)
        val[i].persen = ((parseFloat(val[i].totalRealisasiSebelumnya) + parseFloat(val[i].totalRealisasi)) / parseFloat(val[i].totalPagu) * 100).toFixed(2)
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
      const pagu = this.items?.map((x) => x.totalPagu)
      const realisasiSebelumnya = this.items?.map((x) => x.totalRealisasiSebelumnya)
      const realisasi = this.items?.map((x) => x.totalRealisasi)
      const kode1 = {
        kodeall3: val.map((x) => x.kode1?.kodeall2).reduce((a, b) => {
          if (!a.includes(b)) {
            a.push(b)
          }
          return a
        }),
        uraian: val.map((x) => x.kode1?.uraian).reduce((a, b) => {
          if (!a.includes(b)) {
            a.push(b)
          }
          return a
        }),
        totalPagu: pagu.reduce((a, b) => a + b, 0),
        totalRealisasiSebelumnya: realisasiSebelumnya.reduce((a, b) => a + b, 0),
        totalRealisasi: realisasi.reduce((a, b) => a + b, 0),
        RealisasiSemua: realisasiSebelumnya.reduce((a, b) => a + b, 0) + realisasi.reduce((a, b) => a + b, 0),
        selisih: pagu.reduce((a, b) => a + b, 0) - realisasiSebelumnya.reduce((a, b) => a + b, 0) - realisasi.reduce((a, b) => a + b, 0),
        persen: ((realisasiSebelumnya.reduce((a, b) => parseFloat(a) + parseFloat(b), 0) + realisasi.reduce((a, b) => parseFloat(a) + parseFloat(b), 0)) / pagu.reduce((a, b) => parseFloat(a) + parseFloat(b), 0) * 100).toFixed(2)
      }
      // console.log('lo lo lo', kode1)
      // KODE2
      const kod2 = this.items.length
        ? this.items.map((x) => {
          const a = x?.kode2?.kodeall2
          return {
            kodeall3: x?.kode2?.kodeall2,
            uraian: x?.kode2?.uraian,
            totalPagu: this.items?.filter((s) => s?.kode2?.kodeall2 === a)
              .map((x) => {
                return x?.anggaran.reduce((a, b) => parseFloat(a) + parseFloat(b.pagu), 0)
              }).reduce((x, y) => x + y, 0),
            totalRealisasiSebelumnya: this.items?.filter((s) => s?.kode2?.kodeall2 === a)
              .map((x) => {
                return (x?.npdls_rinci?.filter((x) => {
                  const tgl = new Date(x?.headerls?.npkrinci?.header?.tglpindahbuku).getTime()
                  return tgl < new Date(this.params.tgl).getTime()
                }).reduce((a, b) => parseFloat(a) + parseFloat(b?.nominalpembayaran), 0)) +
                (x?.spjpanjar?.filter((x) => {
                  const tgl = new Date(x?.spjheader?.tglspjpanjar).getTime()
                  return tgl < new Date(this.params.tgl).getTime()
                }).reduce((a, b) => parseFloat(a) + parseFloat(b?.jumlahbelanjapanjar), 0)) -
                (x?.cp?.filter((x) => {
                  const tgl = new Date(x?.tglcontrapost).getTime()
                  return tgl < new Date(this.params.tgl).getTime()
                }).reduce((a, b) => parseFloat(a) + parseFloat(b?.nominalcontrapost), 0))
              }).reduce((x, y) => x + y, 0),
            totalRealisasi: this.items?.filter((s) => s?.kode2?.kodeall2 === a)
              .map((x) => {
                return (x?.npdls_rinci?.filter((x) => {
                  const tgl = new Date(x?.headerls?.npkrinci?.header?.tglpindahbuku).getTime()
                  return tgl >= new Date(this.params.tgl).getTime() && tgl <= new Date(this.params.tglx).getTime()
                }).reduce((a, b) => parseFloat(a) + parseFloat(b?.nominalpembayaran), 0)) +
                (x?.spjpanjar?.filter((x) => {
                  const tgl = new Date(x?.spjheader?.tglspjpanjar).getTime()
                  return tgl >= new Date(this.params.tgl).getTime() && tgl <= new Date(this.params.tglx).getTime()
                }).reduce((a, b) => parseFloat(a) + parseFloat(b?.jumlahbelanjapanjar), 0)) -
                (x?.cp?.filter((x) => {
                  const tgl = new Date(x?.tglcontrapost).getTime()
                  return tgl >= new Date(this.params.tgl).getTime() && tgl <= new Date(this.params.tglx).getTime()
                }).reduce((a, b) => parseFloat(a) + parseFloat(b?.nominalcontrapost), 0))
              }).reduce((x, y) => x + y, 0),
            RealisasiSemua: (this.items?.filter((s) => s?.kode2?.kodeall2 === a)
              .map((x) => {
                return (x?.npdls_rinci?.filter((x) => {
                  const tgl = new Date(x?.headerls?.npkrinci?.header?.tglpindahbuku).getTime()
                  return tgl < new Date(this.params.tgl).getTime()
                }).reduce((a, b) => parseFloat(a) + parseFloat(b?.nominalpembayaran), 0)) +
              (x?.spjpanjar?.filter((x) => {
                const tgl = new Date(x?.spjheader?.tglspjpanjar).getTime()
                return tgl < new Date(this.params.tgl).getTime()
              }).reduce((a, b) => parseFloat(a) + parseFloat(b?.jumlahbelanjapanjar), 0)) -
              (x?.cp?.filter((x) => {
                const tgl = new Date(x?.tglcontrapost).getTime()
                return tgl < new Date(this.params.tgl).getTime()
              }).reduce((a, b) => parseFloat(a) + parseFloat(b?.nominalcontrapost), 0))
              }).reduce((x, y) => x + y, 0)) + (this.items?.filter((s) => s?.kode2?.kodeall2 === a)
              .map((x) => {
                return (x?.npdls_rinci?.filter((x) => {
                  const tgl = new Date(x?.headerls?.npkrinci?.header?.tglpindahbuku).getTime()
                  return tgl >= new Date(this.params.tgl).getTime() && tgl <= new Date(this.params.tglx).getTime()
                }).reduce((a, b) => parseFloat(a) + parseFloat(b?.nominalpembayaran), 0)) +
              (x?.spjpanjar?.filter((x) => {
                const tgl = new Date(x?.spjheader?.tglspjpanjar).getTime()
                return tgl >= new Date(this.params.tgl).getTime() && tgl <= new Date(this.params.tglx).getTime()
              }).reduce((a, b) => parseFloat(a) + parseFloat(b?.jumlahbelanjapanjar), 0)) -
              (x?.cp?.filter((x) => {
                const tgl = new Date(x?.tglcontrapost).getTime()
                return tgl >= new Date(this.params.tgl).getTime() && tgl <= new Date(this.params.tglx).getTime()
              }).reduce((a, b) => parseFloat(a) + parseFloat(b?.nominalcontrapost), 0))
              }).reduce((x, y) => x + y, 0)),
            selisih: this.items?.filter((s) => s?.kode2?.kodeall2 === a)
              .map((x) => {
                return x?.anggaran.reduce((a, b) => parseFloat(a) + parseFloat(b.pagu), 0)
              }).reduce((x, y) => x + y, 0) -
              (this.items?.filter((s) => s?.kode2?.kodeall2 === a)
                .map((x) => {
                  return (x?.npdls_rinci?.filter((x) => {
                    const tgl = new Date(x?.headerls?.npkrinci?.header?.tglpindahbuku).getTime()
                    return tgl < new Date(this.params.tgl).getTime()
                  }).reduce((a, b) => parseFloat(a) + parseFloat(b?.nominalpembayaran), 0)) +
              (x?.spjpanjar?.filter((x) => {
                const tgl = new Date(x?.spjheader?.tglspjpanjar).getTime()
                return tgl < new Date(this.params.tgl).getTime()
              }).reduce((a, b) => parseFloat(a) + parseFloat(b?.jumlahbelanjapanjar), 0)) -
              (x?.cp?.filter((x) => {
                const tgl = new Date(x?.tglcontrapost).getTime()
                return tgl < new Date(this.params.tgl).getTime()
              }).reduce((a, b) => parseFloat(a) + parseFloat(b?.nominalcontrapost), 0))
                }).reduce((x, y) => x + y, 0) +
              this.items?.filter((s) => s?.kode2?.kodeall2 === a)
                .map((x) => {
                  return (x?.npdls_rinci?.filter((x) => {
                    const tgl = new Date(x?.headerls?.npkrinci?.header?.tglpindahbuku).getTime()
                    return tgl >= new Date(this.params.tgl).getTime() && tgl <= new Date(this.params.tglx).getTime()
                  }).reduce((a, b) => parseFloat(a) + parseFloat(b?.nominalpembayaran), 0)) +
              (x?.spjpanjar?.filter((x) => {
                const tgl = new Date(x?.spjheader?.tglspjpanjar).getTime()
                return tgl >= new Date(this.params.tgl).getTime() && tgl <= new Date(this.params.tglx).getTime()
              }).reduce((a, b) => parseFloat(a) + parseFloat(b?.jumlahbelanjapanjar), 0)) -
              (x?.cp?.filter((x) => {
                const tgl = new Date(x?.tglcontrapost).getTime()
                return tgl >= new Date(this.params.tgl).getTime() && tgl <= new Date(this.params.tglx).getTime()
              }).reduce((a, b) => parseFloat(a) + parseFloat(b?.nominalcontrapost), 0))
                }).reduce((x, y) => x + y, 0)),

            persen: (((this.items?.filter((s) => s?.kode2?.kodeall2 === a)
              .map((x) => {
                return (x?.npdls_rinci?.filter((x) => {
                  const tgl = new Date(x?.headerls?.npkrinci?.header?.tglpindahbuku).getTime()
                  return tgl < new Date(this.params.tgl).getTime()
                }).reduce((a, b) => parseFloat(a) + parseFloat(b?.nominalpembayaran), 0)) +
              (x?.spjpanjar?.filter((x) => {
                const tgl = new Date(x?.spjheader?.tglspjpanjar).getTime()
                return tgl < new Date(this.params.tgl).getTime()
              }).reduce((a, b) => parseFloat(a) + parseFloat(b?.jumlahbelanjapanjar), 0)) -
              (x?.cp?.filter((x) => {
                const tgl = new Date(x?.tglcontrapost).getTime()
                return tgl < new Date(this.params.tgl).getTime()
              }).reduce((a, b) => parseFloat(a) + parseFloat(b?.nominalcontrapost), 0))
              }).reduce((x, y) => parseFloat(x) + parseFloat(y), 0) +
            this.items?.filter((s) => s?.kode2?.kodeall2 === a)
              .map((x) => {
                return (x?.npdls_rinci?.filter((x) => {
                  const tgl = new Date(x?.headerls?.npkrinci?.header?.tglpindahbuku).getTime()
                  return tgl >= new Date(this.params.tgl).getTime() && tgl <= new Date(this.params.tglx).getTime()
                }).reduce((a, b) => parseFloat(a) + parseFloat(b?.nominalpembayaran), 0)) +
                (x?.spjpanjar?.filter((x) => {
                  const tgl = new Date(x?.spjheader?.tglspjpanjar).getTime()
                  return tgl >= new Date(this.params.tgl).getTime() && tgl <= new Date(this.params.tglx).getTime()
                }).reduce((a, b) => parseFloat(a) + parseFloat(b?.jumlahbelanjapanjar), 0)) -
                (x?.cp?.filter((x) => {
                  const tgl = new Date(x?.tglcontrapost).getTime()
                  return tgl >= new Date(this.params.tgl).getTime() && tgl <= new Date(this.params.tglx).getTime()
                }).reduce((a, b) => parseFloat(a) + parseFloat(b?.nominalcontrapost), 0))
              }).reduce((x, y) => parseFloat(x) + parseFloat(y), 0)) /
              this.items?.filter((s) => s?.kode2?.kodeall2 === a)
                .map((x) => {
                  return x?.anggaran.reduce((a, b) => parseFloat(a) + parseFloat(b.pagu), 0)
                }).reduce((x, y) => parseFloat(x) + parseFloat(y), 0)) * 100).toFixed(2)
          }
        })
        : []
      const kode2 = kod2.reduce(
        (acc, curr) =>
          acc.find((v) => v?.kodeall3 === curr?.kodeall3) ? acc : [...acc, curr],
        []
      )
      // console.log('KODE 2', kode2)
      // const kode2 = {}
      // for (let i = 0; i < kode.length; i++) {
      //   const el = kode.reduce(
      //     (acc, curr) =>
      //       acc.find((v) => v.kodeall2 === curr.kodeall2) ? acc : [...acc, curr],
      //     []
      //   )

      //   kode2.push(el)
      // }

      // KODE 3
      const kod3 = this.items.length
        ? this.items.map((x) => {
          const a = x?.kode3?.kodeall2
          return {
            kodeall3: x?.kode3?.kodeall2,
            uraian: x?.kode3?.uraian,
            totalPagu: this.items?.filter((s) => s?.kode3?.kodeall2 === a)
              .map((x) => {
                return x?.anggaran?.reduce((a, b) => parseFloat(a) + parseFloat(b?.pagu), 0)
              }).reduce((x, y) => x + y, 0),
            totalRealisasiSebelumnya: this.items?.filter((s) => s?.kode3?.kodeall2 === a)
              .map((x) => {
                return (x?.npdls_rinci?.filter((x) => {
                  const tgl = new Date(x?.headerls?.npkrinci?.header?.tglpindahbuku).getTime()
                  return tgl < new Date(this.params.tgl).getTime()
                }).reduce((a, b) => parseFloat(a) + parseFloat(b?.nominalpembayaran), 0)) +
                (x?.spjpanjar?.filter((x) => {
                  const tgl = new Date(x?.spjheader?.tglspjpanjar).getTime()
                  return tgl < new Date(this.params.tgl).getTime()
                }).reduce((a, b) => parseFloat(a) + parseFloat(b?.jumlahbelanjapanjar), 0)) -
                (x?.cp?.filter((x) => {
                  const tgl = new Date(x?.tglcontrapost).getTime()
                  return tgl < new Date(this.params.tgl).getTime()
                }).reduce((a, b) => parseFloat(a) + parseFloat(b?.nominalcontrapost), 0))
              }).reduce((x, y) => x + y, 0),
            totalRealisasi: this.items?.filter((s) => s?.kode3?.kodeall2 === a)
              .map((x) => {
                return (x?.npdls_rinci?.filter((x) => {
                  const tgl = new Date(x?.headerls?.npkrinci?.header?.tglpindahbuku).getTime()
                  return tgl >= new Date(this.params.tgl).getTime() && tgl <= new Date(this.params.tglx).getTime()
                }).reduce((a, b) => parseFloat(a) + parseFloat(b?.nominalpembayaran), 0)) +
              (x?.spjpanjar?.filter((x) => {
                const tgl = new Date(x?.spjheader?.tglspjpanjar).getTime()
                return tgl >= new Date(this.params.tgl).getTime() && tgl <= new Date(this.params.tglx).getTime()
              }).reduce((a, b) => parseFloat(a) + parseFloat(b?.jumlahbelanjapanjar), 0)) -
              (x?.cp?.filter((x) => {
                const tgl = new Date(x?.tglcontrapost).getTime()
                return tgl >= new Date(this.params.tgl).getTime() && tgl <= new Date(this.params.tglx).getTime()
              }).reduce((a, b) => parseFloat(a) + parseFloat(b?.nominalcontrapost), 0))
              }).reduce((x, y) => x + y, 0),
            RealisasiSemua: (this.items?.filter((s) => s?.kode3?.kodeall2 === a)
              .map((x) => {
                return (x?.npdls_rinci?.filter((x) => {
                  const tgl = new Date(x?.headerls?.npkrinci?.header?.tglpindahbuku).getTime()
                  return tgl < new Date(this.params.tgl).getTime()
                }).reduce((a, b) => parseFloat(a) + parseFloat(b?.nominalpembayaran), 0)) +
              (x?.spjpanjar?.filter((x) => {
                const tgl = new Date(x?.spjheader?.tglspjpanjar).getTime()
                return tgl < new Date(this.params.tgl).getTime()
              }).reduce((a, b) => parseFloat(a) + parseFloat(b?.jumlahbelanjapanjar), 0)) -
              (x?.cp?.filter((x) => {
                const tgl = new Date(x?.tglcontrapost).getTime()
                return tgl < new Date(this.params.tgl).getTime()
              }).reduce((a, b) => parseFloat(a) + parseFloat(b?.nominalcontrapost), 0))
              }).reduce((x, y) => x + y, 0)) + (this.items?.filter((s) => s?.kode3?.kodeall2 === a)
              .map((x) => {
                return (x?.npdls_rinci?.filter((x) => {
                  const tgl = new Date(x?.headerls?.npkrinci?.header?.tglpindahbuku).getTime()
                  return tgl >= new Date(this.params.tgl).getTime() && tgl <= new Date(this.params.tglx).getTime()
                }).reduce((a, b) => parseFloat(a) + parseFloat(b?.nominalpembayaran), 0)) +
              (x?.spjpanjar?.filter((x) => {
                const tgl = new Date(x?.spjheader?.tglspjpanjar).getTime()
                return tgl >= new Date(this.params.tgl).getTime() && tgl <= new Date(this.params.tglx).getTime()
              }).reduce((a, b) => parseFloat(a) + parseFloat(b?.jumlahbelanjapanjar), 0)) -
              (x?.cp?.filter((x) => {
                const tgl = new Date(x?.tglcontrapost).getTime()
                return tgl >= new Date(this.params.tgl).getTime() && tgl <= new Date(this.params.tglx).getTime()
              }).reduce((a, b) => parseFloat(a) + parseFloat(b?.nominalcontrapost), 0))
              }).reduce((x, y) => x + y, 0)),
            selisih: this.items?.filter((s) => s?.kode3?.kodeall2 === a)
              .map((x) => {
                return x?.anggaran?.reduce((a, b) => parseFloat(a) + parseFloat(b?.pagu), 0)
              }).reduce((x, y) => x + y, 0) -
                (this.items?.filter((s) => s?.kode3?.kodeall2 === a)
                  .map((x) => {
                    return (x?.npdls_rinci?.filter((x) => {
                      const tgl = new Date(x?.headerls?.npkrinci?.header?.tglpindahbuku).getTime()
                      return tgl < new Date(this.params.tgl).getTime()
                    }).reduce((a, b) => parseFloat(a) + parseFloat(b?.nominalpembayaran), 0)) +
                (x?.spjpanjar?.filter((x) => {
                  const tgl = new Date(x?.spjheader?.tglspjpanjar).getTime()
                  return tgl < new Date(this.params.tgl).getTime()
                }).reduce((a, b) => parseFloat(a) + parseFloat(b?.jumlahbelanjapanjar), 0)) -
                (x?.cp?.filter((x) => {
                  const tgl = new Date(x?.tglcontrapost).getTime()
                  return tgl < new Date(this.params.tgl).getTime()
                }).reduce((a, b) => parseFloat(a) + parseFloat(b?.nominalcontrapost), 0))
                  }).reduce((x, y) => x + y, 0) +
                this.items?.filter((s) => s?.kode3?.kodeall2 === a)
                  .map((x) => {
                    return (x?.npdls_rinci?.filter((x) => {
                      const tgl = new Date(x?.headerls?.npkrinci?.header?.tglpindahbuku).getTime()
                      return tgl >= new Date(this.params.tgl).getTime() && tgl <= new Date(this.params.tglx).getTime()
                    }).reduce((a, b) => parseFloat(a) + parseFloat(b?.nominalpembayaran), 0)) +
              (x?.spjpanjar?.filter((x) => {
                const tgl = new Date(x?.spjheader?.tglspjpanjar).getTime()
                return tgl >= new Date(this.params.tgl).getTime() && tgl <= new Date(this.params.tglx).getTime()
              }).reduce((a, b) => parseFloat(a) + parseFloat(b?.jumlahbelanjapanjar), 0)) -
              (x?.cp?.filter((x) => {
                const tgl = new Date(x?.tglcontrapost).getTime()
                return tgl >= new Date(this.params.tgl).getTime() && tgl <= new Date(this.params.tglx).getTime()
              }).reduce((a, b) => parseFloat(a) + parseFloat(b?.nominalcontrapost), 0))
                  }).reduce((x, y) => x + y, 0)),

            persen: (((this.items?.filter((s) => s?.kode3?.kodeall2 === a)
              .map((x) => {
                return (x?.npdls_rinci?.filter((x) => {
                  const tgl = new Date(x?.headerls?.npkrinci?.header?.tglpindahbuku).getTime()
                  return tgl < new Date(this.params.tgl).getTime()
                }).reduce((a, b) => parseFloat(a) + parseFloat(b?.nominalpembayaran), 0)) +
              (x?.spjpanjar?.filter((x) => {
                const tgl = new Date(x?.spjheader?.tglspjpanjar).getTime()
                return tgl < new Date(this.params.tgl).getTime()
              }).reduce((a, b) => parseFloat(a) + parseFloat(b?.jumlahbelanjapanjar), 0)) -
              (x?.cp?.filter((x) => {
                const tgl = new Date(x?.tglcontrapost).getTime()
                return tgl < new Date(this.params.tgl).getTime()
              }).reduce((a, b) => parseFloat(a) + parseFloat(b?.nominalcontrapost), 0))
              }).reduce((x, y) => parseFloat(x) + parseFloat(y), 0) +
            this.items?.filter((s) => s?.kode3?.kodeall2 === a)
              .map((x) => {
                return (x?.npdls_rinci?.filter((x) => {
                  const tgl = new Date(x?.headerls?.npkrinci?.header?.tglpindahbuku).getTime()
                  return tgl >= new Date(this.params.tgl).getTime() && tgl <= new Date(this.params.tglx).getTime()
                }).reduce((a, b) => parseFloat(a) + parseFloat(b?.nominalpembayaran), 0)) +
                (x?.spjpanjar?.filter((x) => {
                  const tgl = new Date(x?.spjheader?.tglspjpanjar).getTime()
                  return tgl >= new Date(this.params.tgl).getTime() && tgl <= new Date(this.params.tglx).getTime()
                }).reduce((a, b) => parseFloat(a) + parseFloat(b?.jumlahbelanjapanjar), 0)) -
                (x?.cp?.filter((x) => {
                  const tgl = new Date(x?.tglcontrapost).getTime()
                  return tgl >= new Date(this.params.tgl).getTime() && tgl <= new Date(this.params.tglx).getTime()
                }).reduce((a, b) => parseFloat(a) + parseFloat(b?.nominalcontrapost), 0))
              }).reduce((x, y) => parseFloat(x) + parseFloat(y), 0)) /
              this.items?.filter((s) => s?.kode3?.kodeall2 === a)
                .map((x) => {
                  return x?.anggaran.reduce((a, b) => parseFloat(a) + parseFloat(b.pagu), 0)
                }).reduce((x, y) => parseFloat(x) + parseFloat(y), 0)) * 100).toFixed(2)
          }
        })
        : []
      const kode3 = kod3.reduce(
        (acc, curr) =>
          acc.find((v) => v?.kodeall3 === curr?.kodeall3) ? acc : [...acc, curr],
        []
      )
      // console.log('kode3', kode3)
      // KODE4
      const kod4 = this.items.length
        ? this.items.map((x) => {
          const a = x?.kode4?.kodeall2
          return {
            kodeall3: x?.kode4?.kodeall2,
            uraian: x?.kode4?.uraian,
            totalPagu: this.items?.filter((s) => s?.kode4?.kodeall2 === a)
              .map((x) => {
                return x?.anggaran?.reduce((a, b) => parseFloat(a) + parseFloat(b.pagu), 0)
              }).reduce((x, y) => x + y, 0),
            totalRealisasiSebelumnya: this.items?.filter((s) => s?.kode4?.kodeall2 === a)
              .map((x) => {
                return (x?.npdls_rinci?.filter((x) => {
                  const tgl = new Date(x?.headerls?.npkrinci?.header?.tglpindahbuku).getTime()
                  return tgl < new Date(this.params.tgl).getTime()
                }).reduce((a, b) => parseFloat(a) + parseFloat(b?.nominalpembayaran), 0)) +
                (x?.spjpanjar?.filter((x) => {
                  const tgl = new Date(x?.spjheader?.tglspjpanjar).getTime()
                  return tgl < new Date(this.params.tgl).getTime()
                }).reduce((a, b) => parseFloat(a) + parseFloat(b?.jumlahbelanjapanjar), 0)) -
                (x?.cp?.filter((x) => {
                  const tgl = new Date(x?.tglcontrapost).getTime()
                  return tgl < new Date(this.params.tgl).getTime()
                }).reduce((a, b) => parseFloat(a) + parseFloat(b?.nominalcontrapost), 0))
              }).reduce((x, y) => x + y, 0),
            totalRealisasi: this.items?.filter((s) => s?.kode4?.kodeall2 === a)
              .map((x) => {
                return (x?.npdls_rinci?.filter((x) => {
                  const tgl = new Date(x?.headerls?.npkrinci?.header?.tglpindahbuku).getTime()
                  return tgl >= new Date(this.params.tgl).getTime() && tgl <= new Date(this.params.tglx).getTime()
                }).reduce((a, b) => parseFloat(a) + parseFloat(b?.nominalpembayaran), 0)) +
              (x?.spjpanjar?.filter((x) => {
                const tgl = new Date(x?.spjheader?.tglspjpanjar).getTime()
                return tgl >= new Date(this.params.tgl).getTime() && tgl <= new Date(this.params.tglx).getTime()
              }).reduce((a, b) => parseFloat(a) + parseFloat(b?.jumlahbelanjapanjar), 0)) -
              (x?.cp?.filter((x) => {
                const tgl = new Date(x?.tglcontrapost).getTime()
                return tgl >= new Date(this.params.tgl).getTime() && tgl <= new Date(this.params.tglx).getTime()
              }).reduce((a, b) => parseFloat(a) + parseFloat(b?.nominalcontrapost), 0))
              }).reduce((x, y) => x + y, 0),
            RealisasiSemua: (this.items?.filter((s) => s?.kode4?.kodeall2 === a)
              .map((x) => {
                return (x?.npdls_rinci?.filter((x) => {
                  const tgl = new Date(x?.headerls?.npkrinci?.header?.tglpindahbuku).getTime()
                  return tgl < new Date(this.params.tgl).getTime()
                }).reduce((a, b) => parseFloat(a) + parseFloat(b?.nominalpembayaran), 0)) +
              (x?.spjpanjar?.filter((x) => {
                const tgl = new Date(x?.spjheader?.tglspjpanjar).getTime()
                return tgl < new Date(this.params.tgl).getTime()
              }).reduce((a, b) => parseFloat(a) + parseFloat(b?.jumlahbelanjapanjar), 0)) -
              (x?.cp?.filter((x) => {
                const tgl = new Date(x?.tglcontrapost).getTime()
                return tgl < new Date(this.params.tgl).getTime()
              }).reduce((a, b) => parseFloat(a) + parseFloat(b?.nominalcontrapost), 0))
              }).reduce((x, y) => x + y, 0)) + (this.items?.filter((s) => s?.kode4?.kodeall2 === a)
              .map((x) => {
                return (x?.npdls_rinci?.filter((x) => {
                  const tgl = new Date(x?.headerls?.npkrinci?.header?.tglpindahbuku).getTime()
                  return tgl >= new Date(this.params.tgl).getTime() && tgl <= new Date(this.params.tglx).getTime()
                }).reduce((a, b) => parseFloat(a) + parseFloat(b?.nominalpembayaran), 0)) +
              (x?.spjpanjar?.filter((x) => {
                const tgl = new Date(x?.spjheader?.tglspjpanjar).getTime()
                return tgl >= new Date(this.params.tgl).getTime() && tgl <= new Date(this.params.tglx).getTime()
              }).reduce((a, b) => parseFloat(a) + parseFloat(b?.jumlahbelanjapanjar), 0)) -
              (x?.cp?.filter((x) => {
                const tgl = new Date(x?.tglcontrapost).getTime()
                return tgl >= new Date(this.params.tgl).getTime() && tgl <= new Date(this.params.tglx).getTime()
              }).reduce((a, b) => parseFloat(a) + parseFloat(b?.nominalcontrapost), 0))
              }).reduce((x, y) => x + y, 0)),
            selisih: this.items?.filter((s) => s?.kode4?.kodeall2 === a)
              .map((x) => {
                return x?.anggaran?.reduce((a, b) => parseFloat(a) + parseFloat(b.pagu), 0)
              }).reduce((x, y) => x + y, 0) -
              (this.items?.filter((s) => s?.kode4?.kodeall2 === a)
                .map((x) => {
                  return (x?.npdls_rinci?.filter((x) => {
                    const tgl = new Date(x?.headerls?.npkrinci?.header?.tglpindahbuku).getTime()
                    return tgl < new Date(this.params.tgl).getTime()
                  }).reduce((a, b) => parseFloat(a) + parseFloat(b?.nominalpembayaran), 0)) +
                (x?.spjpanjar?.filter((x) => {
                  const tgl = new Date(x?.spjheader?.tglspjpanjar).getTime()
                  return tgl < new Date(this.params.tgl).getTime()
                }).reduce((a, b) => parseFloat(a) + parseFloat(b?.jumlahbelanjapanjar), 0)) -
                (x?.cp?.filter((x) => {
                  const tgl = new Date(x?.tglcontrapost).getTime()
                  return tgl < new Date(this.params.tgl).getTime()
                }).reduce((a, b) => parseFloat(a) + parseFloat(b?.nominalcontrapost), 0))
                }).reduce((x, y) => x + y, 0) +
              this.items?.filter((s) => s?.kode4?.kodeall2 === a)
                .map((x) => {
                  return (x?.npdls_rinci?.filter((x) => {
                    const tgl = new Date(x?.headerls?.npkrinci?.header?.tglpindahbuku).getTime()
                    return tgl >= new Date(this.params.tgl).getTime() && tgl <= new Date(this.params.tglx).getTime()
                  }).reduce((a, b) => parseFloat(a) + parseFloat(b?.nominalpembayaran), 0)) +
              (x?.spjpanjar?.filter((x) => {
                const tgl = new Date(x?.spjheader?.tglspjpanjar).getTime()
                return tgl >= new Date(this.params.tgl).getTime() && tgl <= new Date(this.params.tglx).getTime()
              }).reduce((a, b) => parseFloat(a) + parseFloat(b?.jumlahbelanjapanjar), 0)) -
              (x?.cp?.filter((x) => {
                const tgl = new Date(x?.tglcontrapost).getTime()
                return tgl >= new Date(this.params.tgl).getTime() && tgl <= new Date(this.params.tglx).getTime()
              }).reduce((a, b) => parseFloat(a) + parseFloat(b?.nominalcontrapost), 0))
                }).reduce((x, y) => x + y, 0)),
            persen: (((this.items?.filter((s) => s?.kode4?.kodeall2 === a)
              .map((x) => {
                return (x?.npdls_rinci?.filter((x) => {
                  const tgl = new Date(x?.headerls?.npkrinci?.header?.tglpindahbuku).getTime()
                  return tgl < new Date(this.params.tgl).getTime()
                }).reduce((a, b) => parseFloat(a) + parseFloat(b?.nominalpembayaran), 0)) +
              (x?.spjpanjar?.filter((x) => {
                const tgl = new Date(x?.spjheader?.tglspjpanjar).getTime()
                return tgl < new Date(this.params.tgl).getTime()
              }).reduce((a, b) => parseFloat(a) + parseFloat(b?.jumlahbelanjapanjar), 0)) -
              (x?.cp?.filter((x) => {
                const tgl = new Date(x?.tglcontrapost).getTime()
                return tgl < new Date(this.params.tgl).getTime()
              }).reduce((a, b) => parseFloat(a) + parseFloat(b?.nominalcontrapost), 0))
              }).reduce((x, y) => parseFloat(x) + parseFloat(y), 0) +
            this.items?.filter((s) => s?.kode4?.kodeall2 === a)
              .map((x) => {
                return (x?.npdls_rinci?.filter((x) => {
                  const tgl = new Date(x?.headerls?.npkrinci?.header?.tglpindahbuku).getTime()
                  return tgl >= new Date(this.params.tgl).getTime() && tgl <= new Date(this.params.tglx).getTime()
                }).reduce((a, b) => parseFloat(a) + parseFloat(b?.nominalpembayaran), 0)) +
                (x?.spjpanjar?.filter((x) => {
                  const tgl = new Date(x?.spjheader?.tglspjpanjar).getTime()
                  return tgl >= new Date(this.params.tgl).getTime() && tgl <= new Date(this.params.tglx).getTime()
                }).reduce((a, b) => parseFloat(a) + parseFloat(b?.jumlahbelanjapanjar), 0)) -
                (x?.cp?.filter((x) => {
                  const tgl = new Date(x?.tglcontrapost).getTime()
                  return tgl >= new Date(this.params.tgl).getTime() && tgl <= new Date(this.params.tglx).getTime()
                }).reduce((a, b) => parseFloat(a) + parseFloat(b?.nominalcontrapost), 0))
              }).reduce((x, y) => parseFloat(x) + parseFloat(y), 0)) /
              this.items?.filter((s) => s?.kode4?.kodeall2 === a)
                .map((x) => {
                  return x?.anggaran.reduce((a, b) => parseFloat(a) + parseFloat(b.pagu), 0)
                }).reduce((x, y) => parseFloat(x) + parseFloat(y), 0)) * 100).toFixed(2)
          }
        })
        : []
      const kode4 = kod4.reduce(
        (acc, curr) =>
          acc.find((v) => v?.kodeall3 === curr?.kodeall3) ? acc : [...acc, curr],
        []
      )
      // console.log('kode4', kode4)
      // KODE4
      const kod5 = this.items?.length
        ? this.items?.map((x) => {
          const a = x?.kode5?.kodeall2
          return {
            kodeall3: x?.kode5?.kodeall2,
            uraian: x?.kode5?.uraian,
            totalPagu: this.items?.filter((s) => s?.kode5?.kodeall2 === a)
              .map((x) => {
                return x?.anggaran?.reduce((a, b) => parseFloat(a) + parseFloat(b?.pagu), 0)
              }).reduce((x, y) => x + y, 0),
            totalRealisasiSebelumnya: this.items?.filter((s) => s?.kode5?.kodeall2 === a)
              .map((x) => {
                return (x?.npdls_rinci?.filter((x) => {
                  const tgl = new Date(x?.headerls?.npkrinci?.header?.tglpindahbuku).getTime()
                  return tgl < new Date(this.params.tgl).getTime()
                }).reduce((a, b) => parseFloat(a) + parseFloat(b?.nominalpembayaran), 0)) +
                  (x?.spjpanjar?.filter((x) => {
                    const tgl = new Date(x?.spjheader?.tglspjpanjar).getTime()
                    return tgl < new Date(this.params.tgl).getTime()
                  }).reduce((a, b) => parseFloat(a) + parseFloat(b?.jumlahbelanjapanjar), 0)) -
                  (x?.cp?.filter((x) => {
                    const tgl = new Date(x?.tglcontrapost).getTime()
                    return tgl < new Date(this.params.tgl).getTime()
                  }).reduce((a, b) => parseFloat(a) + parseFloat(b?.nominalcontrapost), 0))
              }).reduce((x, y) => x + y, 0),
            totalRealisasi: this.items?.filter((s) => s?.kode5?.kodeall2 === a)
              .map((x) => {
                return (x?.npdls_rinci?.filter((x) => {
                  const tgl = new Date(x?.headerls?.npkrinci?.header?.tglpindahbuku).getTime()
                  return tgl >= new Date(this.params.tgl).getTime() && tgl <= new Date(this.params.tglx).getTime()
                }).reduce((a, b) => parseFloat(a) + parseFloat(b?.nominalpembayaran), 0)) +
              (x?.spjpanjar?.filter((x) => {
                const tgl = new Date(x?.spjheader?.tglspjpanjar).getTime()
                return tgl >= new Date(this.params.tgl).getTime() && tgl <= new Date(this.params.tglx).getTime()
              }).reduce((a, b) => parseFloat(a) + parseFloat(b?.jumlahbelanjapanjar), 0)) -
              (x?.cp?.filter((x) => {
                const tgl = new Date(x?.tglcontrapost).getTime()
                return tgl >= new Date(this.params.tgl).getTime() && tgl <= new Date(this.params.tglx).getTime()
              }).reduce((a, b) => parseFloat(a) + parseFloat(b?.nominalcontrapost), 0))
              }).reduce((x, y) => x + y, 0),
            RealisasiSemua: (this.items?.filter((s) => s?.kode5?.kodeall2 === a)
              .map((x) => {
                return (x?.npdls_rinci?.filter((x) => {
                  const tgl = new Date(x?.headerls?.npkrinci?.header?.tglpindahbuku).getTime()
                  return tgl < new Date(this.params.tgl).getTime()
                }).reduce((a, b) => parseFloat(a) + parseFloat(b?.nominalpembayaran), 0)) +
              (x?.spjpanjar?.filter((x) => {
                const tgl = new Date(x?.spjheader?.tglspjpanjar).getTime()
                return tgl < new Date(this.params.tgl).getTime()
              }).reduce((a, b) => parseFloat(a) + parseFloat(b?.jumlahbelanjapanjar), 0)) -
              (x?.cp?.filter((x) => {
                const tgl = new Date(x?.tglcontrapost).getTime()
                return tgl < new Date(this.params.tgl).getTime()
              }).reduce((a, b) => parseFloat(a) + parseFloat(b?.nominalcontrapost), 0))
              }).reduce((x, y) => x + y, 0)) + (this.items?.filter((s) => s?.kode5?.kodeall2 === a)
              .map((x) => {
                return (x?.npdls_rinci?.filter((x) => {
                  const tgl = new Date(x?.headerls?.npkrinci?.header?.tglpindahbuku).getTime()
                  return tgl >= new Date(this.params.tgl).getTime() && tgl <= new Date(this.params.tglx).getTime()
                }).reduce((a, b) => parseFloat(a) + parseFloat(b?.nominalpembayaran), 0)) +
              (x?.spjpanjar?.filter((x) => {
                const tgl = new Date(x?.spjheader?.tglspjpanjar).getTime()
                return tgl >= new Date(this.params.tgl).getTime() && tgl <= new Date(this.params.tglx).getTime()
              }).reduce((a, b) => parseFloat(a) + parseFloat(b?.jumlahbelanjapanjar), 0)) -
              (x?.cp?.filter((x) => {
                const tgl = new Date(x?.tglcontrapost).getTime()
                return tgl >= new Date(this.params.tgl).getTime() && tgl <= new Date(this.params.tglx).getTime()
              }).reduce((a, b) => parseFloat(a) + parseFloat(b?.nominalcontrapost), 0))
              }).reduce((x, y) => x + y, 0)),
            selisih: this.items?.filter((s) => s?.kode5?.kodeall2 === a)
              .map((x) => {
                return x?.anggaran?.reduce((a, b) => parseFloat(a) + parseFloat(b?.pagu), 0)
              }).reduce((x, y) => x + y, 0) -
              (this.items?.filter((s) => s?.kode5?.kodeall2 === a)
                .map((x) => {
                  return (x?.npdls_rinci?.filter((x) => {
                    const tgl = new Date(x?.headerls?.npkrinci?.header?.tglpindahbuku).getTime()
                    return tgl < new Date(this.params.tgl).getTime()
                  }).reduce((a, b) => parseFloat(a) + parseFloat(b?.nominalpembayaran), 0)) +
                (x?.spjpanjar?.filter((x) => {
                  const tgl = new Date(x?.spjheader?.tglspjpanjar).getTime()
                  return tgl < new Date(this.params.tgl).getTime()
                }).reduce((a, b) => parseFloat(a) + parseFloat(b?.jumlahbelanjapanjar), 0)) -
                (x?.cp?.filter((x) => {
                  const tgl = new Date(x?.tglcontrapost).getTime()
                  return tgl < new Date(this.params.tgl).getTime()
                }).reduce((a, b) => parseFloat(a) + parseFloat(b?.nominalcontrapost), 0))
                }).reduce((x, y) => x + y, 0) +
              this.items?.filter((s) => s?.kode5?.kodeall2 === a)
                .map((x) => {
                  return (x?.npdls_rinci?.filter((x) => {
                    const tgl = new Date(x?.headerls?.npkrinci?.header?.tglpindahbuku).getTime()
                    return tgl >= new Date(this.params.tgl).getTime() && tgl <= new Date(this.params.tglx).getTime()
                  }).reduce((a, b) => parseFloat(a) + parseFloat(b?.nominalpembayaran), 0)) +
              (x?.spjpanjar?.filter((x) => {
                const tgl = new Date(x?.spjheader?.tglspjpanjar).getTime()
                return tgl >= new Date(this.params.tgl).getTime() && tgl <= new Date(this.params.tglx).getTime()
              }).reduce((a, b) => parseFloat(a) + parseFloat(b?.jumlahbelanjapanjar), 0)) -
              (x?.cp?.filter((x) => {
                const tgl = new Date(x?.tglcontrapost).getTime()
                return tgl >= new Date(this.params.tgl).getTime() && tgl <= new Date(this.params.tglx).getTime()
              }).reduce((a, b) => parseFloat(a) + parseFloat(b?.nominalcontrapost), 0))
                }).reduce((x, y) => x + y, 0)),

            persen: (((this.items?.filter((s) => s?.kode5?.kodeall2 === a)
              .map((x) => {
                return (x?.npdls_rinci?.filter((x) => {
                  const tgl = new Date(x?.headerls?.npkrinci?.header?.tglpindahbuku).getTime()
                  return tgl < new Date(this.params.tgl).getTime()
                }).reduce((a, b) => parseFloat(a) + parseFloat(b?.nominalpembayaran), 0)) +
              (x?.spjpanjar?.filter((x) => {
                const tgl = new Date(x?.spjheader?.tglspjpanjar).getTime()
                return tgl < new Date(this.params.tgl).getTime()
              }).reduce((a, b) => parseFloat(a) + parseFloat(b?.jumlahbelanjapanjar), 0)) -
              (x?.cp?.filter((x) => {
                const tgl = new Date(x?.tglcontrapost).getTime()
                return tgl < new Date(this.params.tgl).getTime()
              }).reduce((a, b) => parseFloat(a) + parseFloat(b?.nominalcontrapost), 0))
              }).reduce((x, y) => parseFloat(x) + parseFloat(y), 0) +
            this.items?.filter((s) => s?.kode5?.kodeall2 === a)
              .map((x) => {
                return (x?.npdls_rinci?.filter((x) => {
                  const tgl = new Date(x?.headerls?.npkrinci?.header?.tglpindahbuku).getTime()
                  return tgl >= new Date(this.params.tgl).getTime() && tgl <= new Date(this.params.tglx).getTime()
                }).reduce((a, b) => parseFloat(a) + parseFloat(b?.nominalpembayaran), 0)) +
                (x?.spjpanjar?.filter((x) => {
                  const tgl = new Date(x?.spjheader?.tglspjpanjar).getTime()
                  return tgl >= new Date(this.params.tgl).getTime() && tgl <= new Date(this.params.tglx).getTime()
                }).reduce((a, b) => parseFloat(a) + parseFloat(b?.jumlahbelanjapanjar), 0)) -
                (x?.cp?.filter((x) => {
                  const tgl = new Date(x?.tglcontrapost).getTime()
                  return tgl >= new Date(this.params.tgl).getTime() && tgl <= new Date(this.params.tglx).getTime()
                }).reduce((a, b) => parseFloat(a) + parseFloat(b?.nominalcontrapost), 0))
              }).reduce((x, y) => parseFloat(x) + parseFloat(y), 0)) /
              this.items?.filter((s) => s?.kode5?.kodeall2 === a)
                .map((x) => {
                  return x?.anggaran.reduce((a, b) => parseFloat(a) + parseFloat(b.pagu), 0)
                }).reduce((x, y) => parseFloat(x) + parseFloat(y), 0)) * 100).toFixed(2)
          }
        })
        : []
      const kode5 = kod5.reduce(
        (acc, curr) =>
          acc.find((v) => v?.kodeall3 === curr?.kodeall3) ? acc : [...acc, curr],
        []
      )
      // console.log('kode5', kod5)
      // const kode2 = []
      // for (let i = 0; i < kode?.length; i++) {
      //   const kodkelompok = {
      //     kodeall3: kode[i]
      //   }

      //   console.log('jj', kodkelompok)
      //   kode2.push(kodkelompok)
      // }

      // const kode = this.items?.map((x) => x.akun + '.' + x.kelompok)
      // const kelm = kode.reduce((a, b) => {
      //   if (!a.includes(b)) {
      //     a.push(b)
      //   }
      //   return a
      // }, [])
      // const kode2 = []
      // for (let i = 0; i < kelm?.length; i++) {
      //   const kodkelompok = {
      //     kodeall3: kelm[i],
      //     totalPagu: 0,
      //     totalRealisasi: 0
      //   }
      //   kode2.push(kodkelompok)
      // }

      // console.log('ksksk', kode2)

      // const join = this.items?.concat(kode1, kode2, kode3, kode4, kode5)
      // console.log('allll', join)
      // const join = kode1?.concat(kode2, kode3, kode4, kode5)
      // console.log('al al', join)
      this.items.push(kode1, ...kode2, ...kode3, ...kode4, ...kode5)
      const sort = this.items.sort(({ kodeall3: a }, { kodeall3: b }) =>
        a < b ? -1 : a > b ? 1 : 0
      )

      this.kodeakun.push(kode1)
      console.log('kelompok', this.kodeakun)
      const sortkode1 = this.kodeakun.sort(({ kodeall3: a }, { kodeall3: b }) =>
        a < b ? -1 : a > b ? 1 : 0
      )

      this.kodekelompok.push(kode1, ...kode2)
      console.log('kelompok', this.kodekelompok)
      const sortkode2 = this.kodekelompok.sort(({ kodeall3: a }, { kodeall3: b }) =>
        a < b ? -1 : a > b ? 1 : 0
      )

      this.kodejenis.push(kode1, ...kode2, ...kode3)
      console.log('jenis', this.kodejenis)
      const sortkode3 = this.kodejenis.sort(({ kodeall3: a }, { kodeall3: b }) =>
        a < b ? -1 : a > b ? 1 : 0
      )

      this.kodeobjek.push(kode1, ...kode2, ...kode3, ...kode4)
      console.log('jenis', this.kodeobjek)
      const sortkode4 = this.kodeobjek.sort(({ kodeall3: a }, { kodeall3: b }) =>
        a < b ? -1 : a > b ? 1 : 0
      )

      this.koderinciobjek.push(kode1, ...kode2, ...kode3, ...kode4, ...kode5)
      console.log('jenis', this.koderinciobjek)
      const sortkode5 = this.koderinciobjek.sort(({ kodeall3: a }, { kodeall3: b }) =>
        a < b ? -1 : a > b ? 1 : 0
      )

      // this.kodesubrinciobjek.push(kode1, ...kode2, ...kode3, ...kode4, ...kode5)
      // console.log('jenis', this.kodesubrinciobjek)
      // const sortkode6 = this.kodesubrinciobjek.sort(({ kodeall3: a }, { kodeall3: b }) =>
      //   a < b ? -1 : a > b ? 1 : 0
      // )

      return sort && sortkode1 && sortkode2 && sortkode3 && sortkode4 && sortkode5
    },

    dataUnik(x) {
      const unik = Object.values(x.reduce((a, b) => {
        if (!a.includes(b)) {
          a.push(b)
        }
        return a
      })
      )
      return unik
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
