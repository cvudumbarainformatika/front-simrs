/* eslint-disable space-before-function-paren */
import { defineStore } from 'pinia'
import { date } from 'quasar'
import { api } from 'src/boot/axios'

export const useLaporanLraLaprealisasianggaranStore = defineStore('laporan_realisasi_anggaran', {
  state: () => ({
    loading: false,
    items: [],
    meta: {},
    params: {
      q: '',
      page: 1,
      tgl: date.formatDate(Date.now(), 'YYYY-MM-DD'),
      tglx: date.formatDate(Date.now(), 'YYYY-MM-DD'),
      tahun: date.formatDate(Date.now(), 'YYYY'),
      bidang: '',
      kegiatan: ''
    },
    display: {
      dari: date.formatDate(Date.now(), 'DD MMMM YYYY'),
      sampai: date.formatDate(Date.now(), 'DD MMMM YYYY')
    },
    pendapatans: [],
    nilaipends: [],
    realisasipends: [],
    bidangs: [],
    paguAnggaran: [],
    mapRekening: []

  }),
  actions: {
    setParameter (key, val) {
      this.params[key] = val
    },
    setForm(key, val) {
      this.params[key] = val
    },
    emptyForm() {
      this.params.bidang = ''
      this.params.kegiatan = ''
    },

    // eslint-disable-next-line space-before-function-paren
    getDataBidang() {
      this.loading = true
      const params = { params: this.params }
      return new Promise((resolve) => {
        api.get('v1/laporan/lra/bidang', params).then((resp) => {
          console.log('bidang', resp)
          if (resp.status === 200) {
            this.bidangs = resp.data
            this.loading = false
            const data = this.bidangs === resp.data
            const bid = data.reduce((acc, curr) => {
              const kodesama = acc.find(x => x.kodebidang === curr.kodebidang)
              if (!kodesama) {
                acc.push(curr)
              }
              return acc
            }, [])
            // const bid = [...new Set(this.bidangs?.map(x => x.kodebidang))]
            // const unique = Object.groupBy(bid, (obj) => obj.kodebidang)
            console.log('cc', bid)
            resolve(resp)
          }
        }).catch(() => { this.loading = false })
      })
    },

    getDataRealisasi() {
      this.loading = true
      const params = { params: this.params }
      return new Promise(resolve => {
        api.get('v1/laporan/lra/laplra', params).then(resp => {
          console.log('realisasi', resp)
          if (resp.status === 200) {
            this.items = []
            this.realisasipends = resp.data.realisasipendapatan
            this.nilaipends = resp.data.nilaipendapatan
            this.items = resp.data
            this.paguAnggaran(resp.data.belanja)
            this.mapRekening(resp.data.belanja)
            this.mapPendapatan(resp.data.pendapatan)
            this.nilaiPendapatan(resp.data.nilaipendapatan)
            this.realisasiPendapatan(resp.data.realisasipendapatan)
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
      console.log('anggaran', this.nilaipends)
      // for (let i = 0; i < val?.length; i++) {
      //   val.nilaipends =
      //     val?.map((x) => parseInt(x.nilai)).reduce((a, b) => a + b, 0)

      //   console.log('nilai', val.nilaipends)

      //   this.nilaipends.push(val.nilaipends)
      // }
    },

    // NILAI REALISASI PENDAPATAN
    realisasiPendapatan(val) {
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
        totalSekarang: real?.reduce((a, b) => a + b, 0),
        totalSebelumnya: realSebelumnya?.reduce((a, b) => a + b, 0),
        selisih: totalPagu - (realSebelumnya?.reduce((a, b) => a + b, 0) + real?.reduce((a, b) => a + b, 0)),
        persen: (((realSebelumnya?.reduce((a, b) => a + b, 0) + real?.reduce((a, b) => a + b, 0)) / totalPagu) * 100).toFixed(2)
      }

      this.realisasipends = total
      console.log('realisasi', this.realisasipends)
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
          const tgl = new Date(x?.headerls?.tglnpdls).getTime()
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
          const tgl = new Date(x?.headerls?.tglnpdls).getTime()
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

        // NILAI SELISIH
        val[i].selisih = val[i].totalPagu - (val[i].totalRealisasiSebelumnya + val[i].totalRealisasi)
        val[i].persen = ((val[i].totalRealisasiSebelumnya + val[i].totalRealisasi) / val[i].totalPagu * 100).toFixed(2)
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
        selisih: pagu.reduce((a, b) => a + b, 0) - realisasiSebelumnya.reduce((a, b) => a + b, 0) - realisasi.reduce((a, b) => a + b, 0),
        persen: ((realisasiSebelumnya.reduce((a, b) => a + b, 0) + realisasi.reduce((a, b) => a + b, 0)) / pagu.reduce((a, b) => a + b, 0) * 100).toFixed(2)
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
                  const tgl = new Date(x?.headerls?.tglnpdls).getTime()
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
                  const tgl = new Date(x?.headerls?.tglnpdls).getTime()
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
            selisih: this.items?.filter((s) => s.kode2.kodeall2 === a)
              .map((x) => {
                return ((x?.anggaran?.reduce((a, b) => parseFloat(a) + parseFloat(b?.pagu), 0))) -
              // NILAIN SEELUMNYA
              ((x?.npdls_rinci?.filter((x) => {
                const tgl = new Date(x?.headerls?.tglnpdls).getTime()
                return tgl < new Date(this.params.tgl).getTime()
              }).reduce((a, b) => parseFloat(a) + parseFloat(b?.nominalpembayaran), 0)) +
              (x?.spjpanjar?.filter((x) => {
                const tgl = new Date(x?.spjheader?.tglspjpanjar).getTime()
                return tgl < new Date(this.params.tgl).getTime()
              }).reduce((a, b) => parseFloat(a) + parseFloat(b?.jumlahbelanjapanjar), 0)) -
              (x?.cp?.filter((x) => {
                const tgl = new Date(x?.tglcontrapost).getTime()
                return tgl < new Date(this.params.tgl).getTime()
              }).reduce((a, b) => parseFloat(a) + parseFloat(b?.nominalcontrapost), 0))) -
              // NILAI SEKARANG
              ((x?.npdls_rinci?.filter((x) => {
                const tgl = new Date(x?.headerls?.tglnpdls).getTime()
                return tgl >= new Date(this.params.tgl).getTime() && tgl <= new Date(this.params.tglx).getTime()
              }).reduce((a, b) => parseFloat(a) + parseFloat(b?.nominalpembayaran), 0)) +
              (x?.spjpanjar?.filter((x) => {
                const tgl = new Date(x?.spjheader?.tglspjpanjar).getTime()
                return tgl >= new Date(this.params.tgl).getTime() && tgl <= new Date(this.params.tglx).getTime()
              }).reduce((a, b) => parseFloat(a) + parseFloat(b?.jumlahbelanjapanjar), 0)) -
              (x?.cp?.filter((x) => {
                const tgl = new Date(x?.tglcontrapost).getTime()
                return tgl >= new Date(this.params.tgl).getTime() && tgl <= new Date(this.params.tglx).getTime()
              }).reduce((a, b) => parseFloat(a) + parseFloat(b?.nominalcontrapost), 0)))
              }).reduce((x, y) => x + y, 0),

            persen: (((this.items?.filter((s) => s?.kode2?.kodeall2 === a)
              .map((x) => {
                return (x?.npdls_rinci?.filter((x) => {
                  const tgl = new Date(x?.headerls?.tglnpdls).getTime()
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
                  const tgl = new Date(x?.headerls?.tglnpdls).getTime()
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
              }).reduce((x, y) => x + y, 0)) /
              this.items?.filter((s) => s?.kode2?.kodeall2 === a)
                .map((x) => {
                  return x?.anggaran.reduce((a, b) => parseFloat(a) + parseFloat(b.pagu), 0)
                }).reduce((x, y) => x + y, 0)) * 100).toFixed(2)
          }
        })
        : []
      const kode2 = kod2.reduce(
        (acc, curr) =>
          acc.find((v) => v?.kodeall3 === curr?.kodeall3) ? acc : [...acc, curr],
        []
      )
      // console.log('ksksk', kode2)
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
                  const tgl = new Date(x?.headerls?.tglnpdls).getTime()
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
                  const tgl = new Date(x?.headerls?.tglnpdls).getTime()
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
            selisih: this.items?.filter((s) => s?.kode3?.kodeall2 === a)
              .map((x) => {
                return ((x?.anggaran?.reduce((a, b) => parseFloat(a) + parseFloat(b?.pagu), 0))) -
              // NILAIN SEELUMNYA
              ((x?.npdls_rinci?.filter((x) => {
                const tgl = new Date(x?.headerls?.tglnpdls).getTime()
                return tgl < new Date(this.params.tgl).getTime()
              }).reduce((a, b) => parseFloat(a) + parseFloat(b?.nominalpembayaran), 0)) +
              (x?.spjpanjar?.filter((x) => {
                const tgl = new Date(x?.spjheader?.tglspjpanjar).getTime()
                return tgl < new Date(this.params.tgl).getTime()
              }).reduce((a, b) => parseFloat(a) + parseFloat(b?.jumlahbelanjapanjar), 0)) -
              (x?.cp?.filter((x) => {
                const tgl = new Date(x?.tglcontrapost).getTime()
                return tgl < new Date(this.params.tgl).getTime()
              }).reduce((a, b) => parseFloat(a) + parseFloat(b?.nominalcontrapost), 0))) -
              // NILAI SEKARANG
              ((x?.npdls_rinci?.filter((x) => {
                const tgl = new Date(x?.headerls?.tglnpdls).getTime()
                return tgl >= new Date(this.params.tgl).getTime() && tgl <= new Date(this.params.tglx).getTime()
              }).reduce((a, b) => parseFloat(a) + parseFloat(b?.nominalpembayaran), 0)) +
              (x?.spjpanjar?.filter((x) => {
                const tgl = new Date(x?.spjheader?.tglspjpanjar).getTime()
                return tgl >= new Date(this.params.tgl).getTime() && tgl <= new Date(this.params.tglx).getTime()
              }).reduce((a, b) => parseFloat(a) + parseFloat(b?.jumlahbelanjapanjar), 0)) -
              (x?.cp?.filter((x) => {
                const tgl = new Date(x?.tglcontrapost).getTime()
                return tgl >= new Date(this.params.tgl).getTime() && tgl <= new Date(this.params.tglx).getTime()
              }).reduce((a, b) => parseFloat(a) + parseFloat(b?.nominalcontrapost), 0)))
              }).reduce((x, y) => x + y, 0),

            persen: (((this.items?.filter((s) => s?.kode3?.kodeall2 === a)
              .map((x) => {
                return (x?.npdls_rinci?.filter((x) => {
                  const tgl = new Date(x?.headerls?.tglnpdls).getTime()
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
                  const tgl = new Date(x?.headerls?.tglnpdls).getTime()
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
              }).reduce((x, y) => x + y, 0)) /
              this.items?.filter((s) => s?.kode3?.kodeall2 === a)
                .map((x) => {
                  return x?.anggaran.reduce((a, b) => parseFloat(a) + parseFloat(b.pagu), 0)
                }).reduce((x, y) => x + y, 0)) * 100).toFixed(2)
          }
        })
        : []
      const kode3 = kod3.reduce(
        (acc, curr) =>
          acc.find((v) => v?.kodeall3 === curr?.kodeall3) ? acc : [...acc, curr],
        []
      )
      // console.log('ksksk', kode3)
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
                  const tgl = new Date(x?.headerls?.tglnpdls).getTime()
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
                  const tgl = new Date(x?.headerls?.tglnpdls).getTime()
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
            selisih: this.items?.filter((s) => s?.kode4?.kodeall2 === a)
              .map((x) => {
                return ((x?.anggaran?.reduce((a, b) => parseFloat(a) + parseFloat(b?.pagu), 0))) -
              // NILAIN SEELUMNYA
              ((x?.npdls_rinci?.filter((x) => {
                const tgl = new Date(x?.headerls?.tglnpdls).getTime()
                return tgl < new Date(this.params.tgl).getTime()
              }).reduce((a, b) => parseFloat(a) + parseFloat(b?.nominalpembayaran), 0)) +
              (x?.spjpanjar?.filter((x) => {
                const tgl = new Date(x?.spjheader?.tglspjpanjar).getTime()
                return tgl < new Date(this.params.tgl).getTime()
              }).reduce((a, b) => parseFloat(a) + parseFloat(b?.jumlahbelanjapanjar), 0)) -
              (x?.cp?.filter((x) => {
                const tgl = new Date(x?.tglcontrapost).getTime()
                return tgl < new Date(this.params.tgl).getTime()
              }).reduce((a, b) => parseFloat(a) + parseFloat(b?.nominalcontrapost), 0))) -
              // NILAI SEKARANG
              ((x?.npdls_rinci?.filter((x) => {
                const tgl = new Date(x?.headerls?.tglnpdls).getTime()
                return tgl >= new Date(this.params.tgl).getTime() && tgl <= new Date(this.params.tglx).getTime()
              }).reduce((a, b) => parseFloat(a) + parseFloat(b?.nominalpembayaran), 0)) +
              (x?.spjpanjar?.filter((x) => {
                const tgl = new Date(x?.spjheader?.tglspjpanjar).getTime()
                return tgl >= new Date(this.params.tgl).getTime() && tgl <= new Date(this.params.tglx).getTime()
              }).reduce((a, b) => parseFloat(a) + parseFloat(b?.jumlahbelanjapanjar), 0)) -
              (x?.cp?.filter((x) => {
                const tgl = new Date(x?.tglcontrapost).getTime()
                return tgl >= new Date(this.params.tgl).getTime() && tgl <= new Date(this.params.tglx).getTime()
              }).reduce((a, b) => parseFloat(a) + parseFloat(b?.nominalcontrapost), 0)))
              }).reduce((x, y) => x + y, 0),
            persen: (((this.items?.filter((s) => s?.kode4?.kodeall2 === a)
              .map((x) => {
                return (x?.npdls_rinci?.filter((x) => {
                  const tgl = new Date(x?.headerls?.tglnpdls).getTime()
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
                  const tgl = new Date(x?.headerls?.tglnpdls).getTime()
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
              }).reduce((x, y) => x + y, 0)) /
              this.items?.filter((s) => s?.kode4?.kodeall2 === a)
                .map((x) => {
                  return x?.anggaran.reduce((a, b) => parseFloat(a) + parseFloat(b.pagu), 0)
                }).reduce((x, y) => x + y, 0)) * 100).toFixed(2)
          }
        })
        : []
      const kode4 = kod4.reduce(
        (acc, curr) =>
          acc.find((v) => v?.kodeall3 === curr?.kodeall3) ? acc : [...acc, curr],
        []
      )
      // console.log('ksksk', kode4)
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
                  const tgl = new Date(x?.headerls?.tglnpdls).getTime()
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
                  const tgl = new Date(x?.headerls?.tglnpdls).getTime()
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
            selisih: this.items?.filter((s) => s?.kode5?.kodeall2 === a)
              .map((x) => {
                return ((x?.anggaran?.reduce((a, b) => parseFloat(a) + parseFloat(b?.pagu), 0))) -
                // NILAIN SEELUMNYA
                ((x?.npdls_rinci?.filter((x) => {
                  const tgl = new Date(x?.headerls?.tglnpdls).getTime()
                  return tgl < new Date(this.params.tgl).getTime()
                }).reduce((a, b) => parseFloat(a) + parseFloat(b?.nominalpembayaran), 0)) +
                (x?.spjpanjar?.filter((x) => {
                  const tgl = new Date(x?.spjheader?.tglspjpanjar).getTime()
                  return tgl < new Date(this.params.tgl).getTime()
                }).reduce((a, b) => parseFloat(a) + parseFloat(b?.jumlahbelanjapanjar), 0)) -
                (x?.cp?.filter((x) => {
                  const tgl = new Date(x?.tglcontrapost).getTime()
                  return tgl < new Date(this.params.tgl).getTime()
                }).reduce((a, b) => parseFloat(a) + parseFloat(b?.nominalcontrapost), 0))) -
                // NILAI SEKARANG
                ((x?.npdls_rinci?.filter((x) => {
                  const tgl = new Date(x?.headerls?.tglnpdls).getTime()
                  return tgl >= new Date(this.params.tgl).getTime() && tgl <= new Date(this.params.tglx).getTime()
                }).reduce((a, b) => parseFloat(a) + parseFloat(b?.nominalpembayaran), 0)) +
                (x?.spjpanjar?.filter((x) => {
                  const tgl = new Date(x?.spjheader?.tglspjpanjar).getTime()
                  return tgl >= new Date(this.params.tgl).getTime() && tgl <= new Date(this.params.tglx).getTime()
                }).reduce((a, b) => parseFloat(a) + parseFloat(b?.jumlahbelanjapanjar), 0)) -
                (x?.cp?.filter((x) => {
                  const tgl = new Date(x?.tglcontrapost).getTime()
                  return tgl >= new Date(this.params.tgl).getTime() && tgl <= new Date(this.params.tglx).getTime()
                }).reduce((a, b) => parseFloat(a) + parseFloat(b?.nominalcontrapost), 0)))
              }).reduce((x, y) => x + y, 0),
            persen: (((this.items?.filter((s) => s?.kode5?.kodeall2 === a)
              .map((x) => {
                return (x?.npdls_rinci?.filter((x) => {
                  const tgl = new Date(x?.headerls?.tglnpdls).getTime()
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
                  const tgl = new Date(x?.headerls?.tglnpdls).getTime()
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
              }).reduce((x, y) => x + y, 0)) /
              this.items?.filter((s) => s?.kode5?.kodeall2 === a)
                .map((x) => {
                  return x?.anggaran.reduce((a, b) => parseFloat(a) + parseFloat(b.pagu), 0)
                }).reduce((x, y) => x + y, 0)) * 100).toFixed(2)
          }
        })
        : []
      const kode5 = kod5.reduce(
        (acc, curr) =>
          acc.find((v) => v?.kodeall3 === curr?.kodeall3) ? acc : [...acc, curr],
        []
      )
      // console.log('ksksk', kode5)
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
      return sort
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
