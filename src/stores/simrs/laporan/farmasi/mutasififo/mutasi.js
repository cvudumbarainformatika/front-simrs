import { defineStore } from 'pinia'
import { date } from 'quasar'
import { api } from 'src/boot/axios'
// eslint-disable-next-line no-unused-vars
import { formatDoubleKoma } from 'src/modules/formatter'
import { filterDuplicateArrays, notifErrVue } from 'src/modules/utils'
// eslint-disable-next-line no-unused-vars
import { watch } from 'vue'

export const useLaporanMutasiFiFoFarmasiStore = defineStore('laporan_mutasi_fifo_farmasi', {
  state: () => ({
    loading: false,
    loadingNext: false,
    scrolling: false,
    loadingDownload: false,
    ketProses: null,
    items: [],
    meta: {},
    params: {
      q: '',
      per_page: 20,
      page: 1,
      // bulan: '06',
      bulan: date.formatDate(Date.now(), 'MM'),
      tahun: date.formatDate(Date.now(), 'YYYY'),
      kode_ruang: 'all',
      jenis: 'rekap'
    },
    bulans: [
      { nama: 'January', value: '01' },
      { nama: 'February', value: '02' },
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
    gudangs: [
      { nama: 'Semua', value: 'all' },
      { nama: 'Gudang Farmasi ( Kamar Obat )', value: 'Gd-05010100' },
      { nama: 'Gudang Farmasi (Floor Stok)', value: 'Gd-03010100' }
    ],
    optionJenis: [
      // { nama: 'Detail', value: 'detail' },
      { nama: 'Rekap', value: 'rekap' }
    ],
    total: 0,
    tTotal: 0,
    htotal: 0,
    htTotal: 0,
    fields: {}
  }),
  actions: {
    setParams (key, val) {
      this.params[key] = val
    },
    setSearch (payload) {
      console.log(this.params.q)
      // this.setParams('q', payload)
      this.items = []
      this.setParams('page', 1)
      this.getDataTable()
    },
    setPage (payload) {
      this.setParams('page', payload)
      this.getDataTable()
    },
    setPerPage (payload) {
      this.setParams('per_page', payload)
      this.setParams('page', 1)
      this.getDataTable()
    },
    refreshTable () {
      this.setParams('page', 1)
      this.getDataTable()
    },
    mapingItem (val, array, type) {
      val.forEach(it => {
        it.data = []
        // --- harga dan sub dg bawa penerimaan rinci start ---
        it?.distribusipersiapan?.forEach(per => {
          const harga = it?.daftarharga.find(f => f.nopenerimaan === per.nopenerimaan)?.harga ?? 0
          per.harga = harga
          per.sub = per?.jumlah * harga
        })
        it?.persiapanretur?.forEach(per => {
          const harga = it?.daftarharga.find(f => f.nopenerimaan === per.nopenerimaan)?.harga ?? 0
          per.harga = harga
          per.sub = per?.jumlah * harga
        })
        const masuk = []
        const masukx = []
        const keluar = []
        const keluarx = []
        const resep = it?.resepkeluar ?? []
        const racikan = it?.resepkeluarracikan ?? []
        const pak = it?.mutasikeluar ?? []
        if (this.params.jenis === 'detail') {
          if (it?.saldoawal.length) {
            it?.saldoawal.forEach(s => {
              s.tgl = this.params.tahun + '-' + this.params.bulan + '-01 00:00:00'
              const temp = {
                tgl: s.tgl,
                saldoawal: s,
                ket: 'Saldo Awal'
              }
              it.data.push(temp)
            })
            // it?.saldo?.forEach(sa => {
            //   masuk.push(sa)
            // })
          }
          it?.terima?.forEach(per => {
            masuk.push(per)
          })

          it?.penerimaanrinci.forEach(s => {
            const temp = {
              tgl: s.tgl,
              masuk: s,
              ket: s?.pbf?.nama + ' ( ' + s?.jenissurat + ' : ' + s?.nomorsurat + ' ) '
            }
            it.data.push(temp)
          })
          it?.retur?.forEach(per => {
            // const ada = masuk.findIndex(a => a.kdobat === per.kdobat && a.nopenerimaan === per.nopenerimaan)
            // const adaH = masuk.findIndex(a => a.kdobat === per.kdobat && a.harga === per.harga)
            // if (ada >= 0) {
            //   const jum = parseFloat(masuk[ada].jumlah) + parseFloat(per.jumlah)
            //   const sub = parseFloat(masuk[ada].sub) + parseFloat(per.sub)
            //   masuk[ada].jumlah = jum
            //   masuk[ada].sub = sub
            // }
            // else if (adaH >= 0) {
            //   const jum = parseFloat(masuk[adaH].jumlah) + parseFloat(per.jumlah)
            //   const sub = parseFloat(masuk[adaH].sub) + parseFloat(per.sub)
            //   masuk[adaH].jumlah = jum
            //   masuk[adaH].sub = sub
            // }
            // else masuk.push(per)
            masuk.push(per)
          })

          it?.returpenjualan?.forEach(res => {
            const temp = {
              tgl: res.tgl,
              masuk: res,
              ket: 'retur dari ' + res?.header?.norm + ' ' + (res?.header?.datapasien?.rs2 ?? '')
            }
            it.data.push(temp)
          })
          it?.persiapanretur?.forEach(res => {
            const temp = {
              tgl: res.tgl,
              masuk: res,
              ket: 'retur dari ' + res?.norm + ' ' + (res?.pasien?.rs2 ?? '')
            }
            it.data.push(temp)

            // const ada = masuk.findIndex(a => a.kdobat === res.kdobat && a.nopenerimaan === res.nopenerimaan)
            // const adaH = masuk.findIndex(a => a.kdobat === res.kdobat && a.harga === res.harga)
            // if (ada >= 0) {
            //   const jum = parseFloat(masuk[ada].jumlah) + parseFloat(res.jumlah)
            //   const sub = parseFloat(masuk[ada].sub) + parseFloat(res.sub)
            //   masuk[ada].jumlah = jum
            //   masuk[ada].sub = sub
            // }
            // else if (adaH >= 0) {
            //   const jum = parseFloat(masuk[adaH].jumlah) + parseFloat(res.jumlah)
            //   const sub = parseFloat(masuk[adaH].sub) + parseFloat(res.sub)
            //   masuk[adaH].jumlah = jum
            //   masuk[adaH].sub = sub
            // }
            // else masuk.push(res)
            masuk.push(res)
          })
          if (it?.penyesuaian?.length) {
            it?.penyesuaian.forEach(p => {
              // const index = masuk.findIndex(f => f.nopenerimaan === p.nopenerimaan)
              // if (index >= 0) {
              //   const jumM = masuk[index].jumlah + p.jumlah
              //   const subM = masuk[index].sub + p.sub

              //   masuk[index].jumlah = jumM
              //   masuk[index].sub = subM
              // }
              // else {
              //   const index2 = masuk.findIndex(f => parseFloat(f.harga) === parseFloat(p.harga))
              //   if (index2 >= 0) {
              //     // console.log('else 1', masuk[index2], p)

              //     const jumEl = masuk[index2].jumlah + p.jumlah
              //     const subEl = masuk[index2].sub + p.sub

              //     masuk[index2].jumlah = jumEl
              //     masuk[index2].sub = subEl
              //   }
              //   else {
              //     console.log('else 2')
              //   }
              // }
              if (p?.jumlah > 0) {
                const temp = {
                  tgl: p?.tgl ?? this.params.tahun + '-' + this.params.bulan + '-31 23:00:00',
                  masuk: p,
                  ket: 'Pengembalian sisa pasien'
                }
                it.data.push(temp)
                masuk.push(p)
              }
              else {
                const dat = {
                  harga: p?.harga,
                  jumlah: -p?.jumlah,
                  kdobat: p?.kdobat,
                  nopenerimaan: p?.nopenerimaan,
                  sub: -p?.sub,
                  tgl: p?.tgl
                }
                const temp = {
                  tgl: p?.tgl ?? this.params.tahun + '-' + this.params.bulan + '-31 23:00:00',
                  keluar: dat,
                  ket: 'Salah hitung stok opname'
                }
                it.data.push(temp)
                keluar.push(dat)
              }
            })
            // console.log('masuk', masuk)
            // console.log('penyesuaian', it?.penyesuaian, akhir)
          }
          // console.log('masuk', masuk)

          resep?.forEach(res => {
            const temp = {
              tgl: res?.tgl ?? this.params.tahun + '-' + this.params.bulan + '-31 23:00:00',
              keluar: res,
              ket: res?.header?.norm + ' ' + (res?.header?.datapasien?.rs2 ?? '')
            }

            it.data.push(temp)
            keluar.push(res)
            // let diminta = res.jumlah
            // let nilaiDiminta = res.sub
            // while (diminta > 0) {
            //   const index = masuk.findIndex(a => a.jumlah > 0 && a.sub >= 0 && a.kdobat === res.kdobat && a.nopenerimaan === res.nopenerimaan)
            //   if (index >= 0) {
            //     if (masuk[index].jumlah >= diminta) {
            //       const sisa = masuk[index].jumlah - diminta
            //       masuk[index].jumlah = sisa
            //       diminta = 0

            //       const nilaiSisa = masuk[index].sub > 0 ? masuk[index].sub - nilaiDiminta : nilaiDiminta
            //       masuk[index].sub = nilaiSisa
            //       nilaiDiminta = 0
            //     }
            //     else {
            //       const sisa = diminta - masuk[index].jumlah
            //       diminta = sisa
            //       masuk[index].jumlah = 0

            //       const nilaiSisa = masuk[index].sub > 0 ? masuk[index].sub - nilaiDiminta : nilaiDiminta
            //       nilaiDiminta = nilaiSisa
            //       masuk[index].sub = 0
            //     }
            //   }
            //   else {
            //     const index1 = masuk.findIndex(a => a.jumlah > 0 && a.sub >= 0 && a.kdobat === res.kdobat && a.harga === res.harga)
            //     // console.log('index res 1', index1)
            //     if (index1 >= 0) {
            //       if (masuk[index1].jumlah >= diminta) {
            //         const sisa = masuk[index1].jumlah - diminta
            //         masuk[index1].jumlah = sisa
            //         diminta = 0

            //         const nilaiSisa = masuk[index1].sub > 0 ? masuk[index1].sub - nilaiDiminta : nilaiDiminta
            //         masuk[index1].sub = nilaiSisa
            //         nilaiDiminta = 0
            //       }
            //       else {
            //         const sisa = diminta - masuk[index1].jumlah
            //         diminta = sisa
            //         masuk[index1].jumlah = 0

            //         const nilaiSisa = masuk[index1].sub > 0 ? masuk[index1].sub - nilaiDiminta : nilaiDiminta
            //         nilaiDiminta = nilaiSisa
            //         masuk[index1].sub = 0
            //       }
            //     }
            //     else {
            //       const index2 = masuk.findIndex(a => a.jumlah > 0 && a.sub >= 0 && a.kdobat === res.kdobat)
            //       // console.log('index res 2', index2, masuk[index2], res)
            //       if (index2 >= 0) {
            //         if (masuk[index2].jumlah >= diminta) {
            //           const sisa = masuk[index2].jumlah - diminta
            //           masuk[index2].jumlah = sisa
            //           diminta = 0

            //           const nilaiSisa = masuk[index2].sub > 0 ? masuk[index2].sub - nilaiDiminta : nilaiDiminta
            //           masuk[index2].sub = nilaiSisa
            //           nilaiDiminta = 0
            //         }
            //         else {
            //           const sisa = diminta - masuk[index2].jumlah
            //           diminta = sisa
            //           masuk[index2].jumlah = 0

            //           const nilaiSisa = masuk[index2].sub > 0 ? masuk[index2].sub - nilaiDiminta : nilaiDiminta
            //           nilaiDiminta = nilaiSisa
            //           masuk[index2].sub = 0
            //         }
            //       }
            //       // kalo sampe else coba cek mana yang ga match
            //       else {
            //         // console.log('index res 2', index2, masuk[index2], res)
            //         diminta = 0
            //       }
            //     }
            //   }
            // }
          })
          racikan?.forEach(res => {
            const temp = {
              tgl: res?.tgl ?? this.params.tahun + '-' + this.params.bulan + '-31 23:00:00',
              keluar: res,
              ket: res?.header?.norm + ' ' + (res?.header?.datapasien?.rs2 ?? '')
            }

            it.data.push(temp)
            keluar.push(res)
            // let diminta = res.jumlah
            // let nilaiDiminta = res.sub
            // while (diminta > 0) {
            //   const index = masuk.findIndex(a => a.jumlah > 0 && a.sub >= 0 && a.kdobat === res.kdobat && a.nopenerimaan === res.nopenerimaan)
            //   if (index >= 0) {
            //     if (masuk[index].jumlah >= diminta) {
            //       const sisa = masuk[index].jumlah - diminta
            //       masuk[index].jumlah = sisa
            //       diminta = 0

            //       const nilaiSisa = masuk[index].sub > 0 ? masuk[index].sub - nilaiDiminta : nilaiDiminta
            //       masuk[index].sub = nilaiSisa
            //       nilaiDiminta = 0
            //     }
            //     else {
            //       const sisa = diminta - masuk[index].jumlah
            //       diminta = sisa
            //       masuk[index].jumlah = 0

            //       const nilaiSisa = masuk[index].sub > 0 ? masuk[index].sub - nilaiDiminta : nilaiDiminta
            //       nilaiDiminta = nilaiSisa
            //       masuk[index].sub = 0
            //     }
            //   }
            //   else {
            //     const index1 = masuk.findIndex(a => a.jumlah > 0 && a.sub >= 0 && a.kdobat === res.kdobat && a.harga === res.harga)
            //     // console.log('index res 1', index1)
            //     if (index1 >= 0) {
            //       if (masuk[index1].jumlah >= diminta) {
            //         const sisa = masuk[index1].jumlah - diminta
            //         masuk[index1].jumlah = sisa
            //         diminta = 0

            //         const nilaiSisa = masuk[index1].sub > 0 ? masuk[index1].sub - nilaiDiminta : nilaiDiminta
            //         masuk[index1].sub = nilaiSisa
            //         nilaiDiminta = 0
            //       }
            //       else {
            //         const sisa = diminta - masuk[index1].jumlah
            //         diminta = sisa
            //         masuk[index1].jumlah = 0

            //         const nilaiSisa = masuk[index1].sub > 0 ? masuk[index1].sub - nilaiDiminta : nilaiDiminta
            //         nilaiDiminta = nilaiSisa
            //         masuk[index1].sub = 0
            //       }
            //     }
            //     else {
            //       const index2 = masuk.findIndex(a => a.jumlah > 0 && a.sub >= 0 && a.kdobat === res.kdobat)
            //       // console.log('index res 2', index2, masuk[index2], res)
            //       if (index2 >= 0) {
            //         if (masuk[index2].jumlah >= diminta) {
            //           const sisa = masuk[index2].jumlah - diminta
            //           masuk[index2].jumlah = sisa
            //           diminta = 0

            //           const nilaiSisa = masuk[index2].sub > 0 ? masuk[index2].sub - nilaiDiminta : nilaiDiminta
            //           masuk[index2].sub = nilaiSisa
            //           nilaiDiminta = 0
            //         }
            //         else {
            //           const sisa = diminta - masuk[index2].jumlah
            //           diminta = sisa
            //           masuk[index2].jumlah = 0

            //           const nilaiSisa = masuk[index2].sub > 0 ? masuk[index2].sub - nilaiDiminta : nilaiDiminta
            //           nilaiDiminta = nilaiSisa
            //           masuk[index2].sub = 0
            //         }
            //       }
            //       // kalo sampe else coba cek mana yang ga match
            //       else {
            //         // console.log('index res 2', index2, masuk[index2], res)
            //         diminta = 0
            //       }
            //     }
            //   }
            // }
          })
          it?.distribusipersiapan?.forEach(res => {
            const temp = {
              tgl: res?.tgl ?? this.params.tahun + '-' + this.params.bulan + '-31 23:00:00',
              keluar: res,
              ket: res?.norm + ' ' + (res?.pasien?.rs2 ?? '')
            }

            it.data.push(temp)
            keluar.push(res)
            // let diminta = res.jumlah
            // let nilaiDiminta = res.sub
            // while (diminta > 0) {
            //   const index = masuk.findIndex(a => a.jumlah > 0 && a.sub >= 0 && a.kdobat === res.kdobat && a.nopenerimaan === res.nopenerimaan)
            //   if (index >= 0) {
            //     if (masuk[index].jumlah >= diminta) {
            //       const sisa = masuk[index].jumlah - diminta
            //       masuk[index].jumlah = sisa
            //       diminta = 0

            //       const nilaiSisa = masuk[index].sub > 0 ? masuk[index].sub - nilaiDiminta : nilaiDiminta
            //       masuk[index].sub = nilaiSisa
            //       nilaiDiminta = 0
            //     }
            //     else {
            //       const sisa = diminta - masuk[index].jumlah
            //       diminta = sisa
            //       masuk[index].jumlah = 0

            //       const nilaiSisa = masuk[index].sub > 0 ? masuk[index].sub - nilaiDiminta : nilaiDiminta
            //       nilaiDiminta = nilaiSisa
            //       masuk[index].sub = 0
            //     }
            //   }
            //   else {
            //     const index1 = masuk.findIndex(a => a.jumlah > 0 && a.sub >= 0 && a.kdobat === res.kdobat && a.harga === res.harga)
            //     // console.log('index res 1', index1)
            //     if (index1 >= 0) {
            //       if (masuk[index1].jumlah >= diminta) {
            //         const sisa = masuk[index1].jumlah - diminta
            //         masuk[index1].jumlah = sisa
            //         diminta = 0

            //         const nilaiSisa = masuk[index1].sub > 0 ? masuk[index1].sub - nilaiDiminta : nilaiDiminta
            //         masuk[index1].sub = nilaiSisa
            //         nilaiDiminta = 0
            //       }
            //       else {
            //         const sisa = diminta - masuk[index1].jumlah
            //         diminta = sisa
            //         masuk[index1].jumlah = 0

            //         const nilaiSisa = masuk[index1].sub > 0 ? masuk[index1].sub - nilaiDiminta : nilaiDiminta
            //         nilaiDiminta = nilaiSisa
            //         masuk[index1].sub = 0
            //       }
            //     }
            //     else {
            //       const index2 = masuk.findIndex(a => a.jumlah > 0 && a.sub >= 0 && a.kdobat === res.kdobat)
            //       // console.log('index res 2', index2, masuk[index2], res)
            //       if (index2 >= 0) {
            //         if (masuk[index2].jumlah >= diminta) {
            //           const sisa = masuk[index2].jumlah - diminta
            //           masuk[index2].jumlah = sisa
            //           diminta = 0

            //           const nilaiSisa = masuk[index2].sub > 0 ? masuk[index2].sub - nilaiDiminta : nilaiDiminta
            //           masuk[index2].sub = nilaiSisa
            //           nilaiDiminta = 0
            //         }
            //         else {
            //           const sisa = diminta - masuk[index2].jumlah
            //           diminta = sisa
            //           masuk[index2].jumlah = 0

            //           const nilaiSisa = masuk[index2].sub > 0 ? masuk[index2].sub - nilaiDiminta : nilaiDiminta
            //           nilaiDiminta = nilaiSisa
            //           masuk[index2].sub = 0
            //         }
            //       }
            //       // kalo sampe else coba cek mana yang ga match
            //       else {
            //         // console.log('index res 2', index2, masuk[index2], res)
            //         diminta = 0
            //       }
            //     }
            //   }
            // }
          })
          pak?.forEach(res => {
            const temp = {
              tgl: res?.tgl ?? this.params.tahun + '-' + this.params.bulan + '-31 23:00:00',
              keluar: res,
              ket: (res?.ruangan?.uraian + ' ' + res?.no_permintaan ?? '')
            }

            it.data.push(temp)
            keluar.push(res)
            // let diminta = res.jumlah
            // let nilaiDiminta = res.sub

            // while (diminta > 0) {
            //   const index = masuk.findIndex(a => (a.jumlah > 0 && a.sub >= 0) && a.kdobat === res.kdobat && a.nopenerimaan === res.nopenerimaan)
            //   // console.log('index pak', index)
            //   if (index >= 0) {
            //     if (masuk[index].jumlah >= diminta) {
            //       const sisa = masuk[index].jumlah - diminta
            //       masuk[index].jumlah = sisa
            //       diminta = 0

            //       const nilaiSisa = masuk[index].sub - nilaiDiminta
            //       masuk[index].sub = nilaiSisa
            //       nilaiDiminta = 0
            //     }
            //     else {
            //       const sisa = diminta - masuk[index].jumlah
            //       diminta = sisa
            //       masuk[index].jumlah = 0

            //       const nilaiSisa = masuk[index].sub - nilaiDiminta
            //       nilaiDiminta = nilaiSisa
            //       masuk[index].sub = 0
            //     }
            //   }
            //   else {
            //     const index1 = masuk.findIndex(a => (a.jumlah > 0 && a.sub >= 0) && a.kdobat === res.kdobat && a.harga === res.harga)
            //     // console.log('index pak 1', index1)
            //     if (index1 >= 0) {
            //       if (masuk[index1].jumlah >= diminta) {
            //         const sisa = masuk[index1].jumlah - diminta
            //         masuk[index1].jumlah = sisa
            //         diminta = 0

            //         const nilaiSisa = masuk[index1].sub - nilaiDiminta
            //         masuk[index1].sub = nilaiSisa
            //         nilaiDiminta = 0
            //       }
            //       else {
            //         const sisa = diminta - masuk[index1].jumlah
            //         diminta = sisa
            //         masuk[index1].jumlah = 0

            //         const nilaiSisa = masuk[index1].sub - nilaiDiminta
            //         nilaiDiminta = nilaiSisa
            //         masuk[index1].sub = 0
            //       }
            //     }
            //     else {
            //       const index2 = masuk.findIndex(a => (a.jumlah > 0 && a.sub >= 0) && a.kdobat === res.kdobat)
            //       // console.log('index pak 2', index2)
            //       if (index2 >= 0) {
            //         if (masuk[index2].jumlah >= diminta) {
            //           const sisa = masuk[index2].jumlah - diminta
            //           masuk[index2].jumlah = sisa
            //           diminta = 0

            //           const nilaiSisa = masuk[index2].sub - nilaiDiminta
            //           masuk[index2].sub = nilaiSisa
            //           nilaiDiminta = 0
            //         }
            //         else {
            //           const sisa = diminta - masuk[index2].jumlah
            //           diminta = sisa
            //           masuk[index2].jumlah = 0

            //           const nilaiSisa = masuk[index2].sub - nilaiDiminta
            //           nilaiDiminta = nilaiSisa
            //           masuk[index2].sub = 0
            //         }
            //       }
            //       else {
            //         // console.log('kode obat tidak ada', res, masuk.filter(f => f.jumlah > 0))
            //         diminta = 0
            //       }
            //     }
            //   }
            // }
          })
          it?.barangrusak?.forEach(res => {
            const temp = {
              tgl: res?.tgl ?? this.params.tahun + '-' + this.params.bulan + '-31 23:00:00',
              keluar: res,
              ket: res?.ket ?? ''
            }

            it.data.push(temp)
            keluar.push(res)
            // let diminta = res.jumlah
            // let nilaiDiminta = res.sub
            // while (diminta > 0) {
            //   const index = masuk.findIndex(a => a.jumlah > 0 && a.kdobat === res.kdobat && a.nopenerimaan === res.nopenerimaan)
            //   if (index >= 0) {
            //     if (masuk[index].jumlah >= diminta) {
            //       const sisa = masuk[index].jumlah - diminta
            //       masuk[index].jumlah = sisa
            //       diminta = 0

            //       const nilaiSisa = masuk[index].sub > 0 ? masuk[index].sub - nilaiDiminta : nilaiDiminta
            //       masuk[index].sub = nilaiSisa
            //       nilaiDiminta = 0
            //     }
            //     else {
            //       const sisa = diminta - masuk[index].jumlah
            //       diminta = sisa
            //       masuk[index].jumlah = 0

            //       const nilaiSisa = masuk[index].sub > 0 ? masuk[index].sub - nilaiDiminta : nilaiDiminta
            //       nilaiDiminta = nilaiSisa
            //       masuk[index].sub = 0
            //     }
            //   }
            //   else {
            //     const index1 = masuk.findIndex(a => a.jumlah > 0 && a.kdobat === res.kdobat && a.harga === res.harga)
            //     // console.log('index res 1', index1)
            //     if (index1 >= 0) {
            //       if (masuk[index1].jumlah >= diminta) {
            //         const sisa = masuk[index1].jumlah - diminta
            //         masuk[index1].jumlah = sisa
            //         diminta = 0

            //         const nilaiSisa = masuk[index1].sub > 0 ? masuk[index1].sub - nilaiDiminta : nilaiDiminta
            //         masuk[index1].sub = nilaiSisa
            //         nilaiDiminta = 0
            //       }
            //       else {
            //         const sisa = diminta - masuk[index1].jumlah
            //         diminta = sisa
            //         masuk[index1].jumlah = 0

            //         const nilaiSisa = masuk[index1].sub > 0 ? masuk[index1].sub - nilaiDiminta : nilaiDiminta
            //         nilaiDiminta = nilaiSisa
            //         masuk[index1].sub = 0
            //       }
            //     }
            //     else {
            //       const index2 = masuk.findIndex(a => a.jumlah > 0 && a.kdobat === res.kdobat)
            //       // console.log('index res 2', index2, masuk[index2], res)
            //       if (index2 >= 0) {
            //         if (masuk[index2].jumlah >= diminta) {
            //           const sisa = masuk[index2].jumlah - diminta
            //           masuk[index2].jumlah = sisa
            //           diminta = 0

            //           const nilaiSisa = masuk[index2].sub > 0 ? masuk[index2].sub - nilaiDiminta : nilaiDiminta
            //           masuk[index2].sub = nilaiSisa
            //           nilaiDiminta = 0
            //         }
            //         else {
            //           const sisa = diminta - masuk[index2].jumlah
            //           diminta = sisa
            //           masuk[index2].jumlah = 0

            //           const nilaiSisa = masuk[index2].sub > 0 ? masuk[index2].sub - nilaiDiminta : nilaiDiminta
            //           nilaiDiminta = nilaiSisa
            //           masuk[index2].sub = 0
            //         }
            //       }
            //       // kalo sampe else coba cek mana yang ga match
            //       else {
            //         // console.log('index res 2', index2, masuk[index2], res)
            //         diminta = 0
            //       }
            //     }
            //   }
            // }
          })
        }
        else {
          const temp = {
            kd_obat: it?.kd_obat,
            tgl: this.params.tahun + '-' + this.params.bulan + '-01 00:00:00',
            ket: ''
          }
          it.data.push(temp)

          if (it?.saldoawal.length) {
            const sala = {
              kd_obat: it?.kd_obat,
              jumlah: it?.saldoawal?.reduce((a, b) => parseFloat(a) + parseFloat(b.jumlah), 0),
              sub: it?.saldoawal?.reduce((a, b) => parseFloat(a) + parseFloat(b.sub), 0)
            }

            it.data[0].saldoawal = sala
          }
          if (it?.penyesuaian?.length) {
            const raw = {
              tgl: it?.penyesuaian[0]?.tgl,
              harga: 0,
              kdobat: it?.penyesuaian[0]?.kdobat,
              kd_obat: it?.penyesuaian[0]?.kd_obat,
              jumlah: it?.penyesuaian?.reduce((a, b) => parseFloat(a) + parseFloat(b.jumlah), 0),
              sub: it?.penyesuaian?.reduce((a, b) => parseFloat(a) + parseFloat(b.sub), 0),
              ket: 'Penngembalian sisa pasien'
            }
            if (raw?.jumlah > 0) {
              const index1 = masukx.findIndex(f => f.kd_obat === raw?.kdobat)
              // console.log('Ada Peny  index1', raw, index1, masukx)
              if (index1 >= 0) {
                const jumM = masukx[index1].jumlah + raw.jumlah
                const subM = masukx[index1].sub + raw.sub

                masukx[index1].jumlah = jumM
                masukx[index1].sub = subM
              }

              else masukx.push(raw)
              masuk.push(raw)
            }
            else if (raw?.jumlah < 0) {
              const jumlah = -raw.jumlah
              const sub = -raw.sub

              raw.jumlah = jumlah
              raw.sub = sub

              const index = keluar.findIndex(f => f.kd_obat === raw?.kdobat)
              // console.log('Ada Peny  index', raw, index, keluar)
              if (index >= 0) {
                const jumM = keluar[index].jumlah + raw.jumlah
                const subM = keluar[index].sub + raw.sub

                keluar[index].jumlah = jumM
                keluar[index].sub = subM
              }

              else keluar.push(raw)
              keluarx.push(raw)
            }
            // console.log('Ada penyesuanag', masukx, masuk)
            // console.log('penyesuaian', it?.penyesuaian, akhir)
          }
          if (it?.terima?.length) {
            const jumlah = it?.terima?.reduce((a, b) => parseFloat(a) + parseFloat(b.jumlah), 0)
            const subt = it?.terima?.reduce((a, b) => parseFloat(a) + parseFloat(b.sub), 0)
            const ms = {
              tgl: it?.terima[0]?.tgl,
              kd_obat: it?.kd_obat,
              kdobat: it?.kd_obat,
              jumlah,
              sub: subt,
              ket: type === 'download' ? '' : 'Penerimaan'
            }

            // console.log('terima nya ', jumlah, subt, ms)

            const index1 = masukx.findIndex(f => f.kd_obat === it?.kd_obat)
            // console.log('terima nya index', index1)
            if (index1 >= 0) {
              const jumM = masukx[index1].jumlah + jumlah
              const subM = masukx[index1].sub + subt

              masukx[index1].jumlah = jumM
              masukx[index1].sub = subM
            }
            else masukx.push(ms)
            masuk.push(ms)

            // console.log('terima ', masukx)
          }
          if (it?.persiapanretur?.length) {
            const jumlah = it?.persiapanretur?.reduce((a, b) => parseFloat(a) + parseFloat(b.jumlah), 0)
            const subt = it?.persiapanretur?.reduce((a, b) => parseFloat(a) + parseFloat(b.sub), 0)
            const ms = {
              tgl: it?.persiapanretur[0]?.tgl,
              kd_obat: it?.kd_obat,
              kdobat: it?.kd_obat,
              jumlah,
              sub: subt,
              ket: type === 'download' ? '' : 'Penerimaan'
            }

            // console.log('terima nya ', jumlah, subt, ms)

            const index1 = masukx.findIndex(f => f.kd_obat === it?.kd_obat)
            // console.log('terima nya index', index1)
            if (index1 >= 0) {
              const jumM = masukx[index1].jumlah + jumlah
              const subM = masukx[index1].sub + subt

              masukx[index1].jumlah = jumM
              masukx[index1].sub = subM
            }
            else masukx.push(ms)
            masuk.push(ms)

            // console.log('terima ', masukx)
          }
          if (it?.returpenjualan?.length) {
            const raw = {
              tgl: it?.returpenjualan[0]?.tgl,
              harga: 0,
              jumlah: it?.returpenjualan?.reduce((a, b) => parseFloat(a) + parseFloat(b.jumlah), 0),
              sub: it?.returpenjualan?.reduce((a, b) => parseFloat(a) + parseFloat(b.sub), 0)
            }

            const index1 = masukx.findIndex(f => f.kd_obat === it?.kd_obat)
            if (index1 >= 0) {
              const jumM = masukx[index1].jumlah + raw.jumlah
              const subM = masukx[index1].sub + raw.sub
              // console.log('ret ', masukx[index1].jumlah)

              masukx[index1].jumlah = jumM
              masukx[index1].sub = subM
            }
            else masukx.push(raw)
            masuk.push(raw)
          }

          if (it?.resepkeluarok?.length) {
            const raw = {
              tgl: it?.resepkeluarok[0]?.tgl,
              harga: 0,
              jumlah: it?.resepkeluarok?.reduce((a, b) => parseFloat(a) + parseFloat(b.jumlah), 0),
              sub: it?.resepkeluarok?.reduce((a, b) => parseFloat(a) + parseFloat(b.sub), 0)
            }

            const index = keluar.findIndex(f => f.kd_obat === it?.kd_obat)
            if (index >= 0) {
              const jumM = keluar[index].jumlah + raw.jumlah
              const subM = keluar[index].sub + raw.sub

              keluar[index].jumlah = jumM
              keluar[index].sub = subM
            }
            else {
              keluar.push(raw)
            }
            keluarx.push(raw)
          }
          if (it?.distribusipersiapan?.length) {
            const raw = {
              tgl: it?.distribusipersiapan[0]?.tgl,
              harga: 0,
              jumlah: it?.distribusipersiapan?.reduce((a, b) => parseFloat(a) + parseFloat(b.jumlah), 0),
              sub: it?.distribusipersiapan?.reduce((a, b) => parseFloat(a) + parseFloat(b.sub), 0)
            }

            const index = keluar.findIndex(f => f.kd_obat === it?.kd_obat)
            if (index >= 0) {
              const jumM = keluar[index].jumlah + raw.jumlah
              const subM = keluar[index].sub + raw.sub

              keluar[index].jumlah = jumM
              keluar[index].sub = subM
            }
            else {
              keluar.push(raw)
            }
            keluarx.push(raw)
          }
          if (it?.resepkeluar?.length) {
            const raw = {
              tgl: it?.resepkeluar[0]?.tgl,
              harga: 0,
              jumlah: it?.resepkeluar?.reduce((a, b) => parseFloat(a) + parseFloat(b.jumlah), 0),
              sub: it?.resepkeluar?.reduce((a, b) => parseFloat(a) + parseFloat(b.sub), 0)
            }

            const index = keluar.findIndex(f => f.kd_obat === it?.kd_obat)
            if (index >= 0) {
              const jumM = keluar[index].jumlah + raw.jumlah
              const subM = keluar[index].sub + raw.sub

              keluar[index].jumlah = jumM
              keluar[index].sub = subM
            }
            else {
              keluar.push(raw)
            }
            keluarx.push(raw)
          }
          if (it?.resepkeluarracikan?.length) {
            const raw = {
              tgl: it?.resepkeluarracikan[0]?.tgl,
              harga: 0,
              jumlah: it?.resepkeluarracikan?.reduce((a, b) => parseFloat(a) + parseFloat(b.jumlah), 0),
              sub: it?.resepkeluarracikan?.reduce((a, b) => parseFloat(a) + parseFloat(b.sub), 0)
            }

            const index = keluar.findIndex(f => f.kd_obat === it?.kd_obat)
            if (index >= 0) {
              const jumM = keluar[index].jumlah + raw.jumlah
              const subM = keluar[index].sub + raw.sub

              keluar[index].jumlah = jumM
              keluar[index].sub = subM
            }
            else {
              keluar.push(raw)
            }
            keluarx.push(raw)
          }
          if (it?.barangrusak?.length) {
            const raw = {
              tgl: it?.barangrusak[0]?.tgl,
              harga: 0,
              jumlah: it?.barangrusak?.reduce((a, b) => parseFloat(a) + parseFloat(b.jumlah), 0),
              sub: it?.barangrusak?.reduce((a, b) => parseFloat(a) + parseFloat(b.sub), 0)
            }

            const index = keluar.findIndex(f => f.kd_obat === it?.kd_obat)
            if (index >= 0) {
              const jumM = keluar[index].jumlah + raw.jumlah
              const subM = keluar[index].sub + raw.sub

              keluar[index].jumlah = jumM
              keluar[index].sub = subM
            }
            else {
              keluar.push(raw)
            }
            keluarx.push(raw)
          }
          if (it?.mutasikeluar?.length) {
            const raw = {
              tgl: it?.mutasikeluar[0]?.tgl,
              harga: 0,
              jumlah: it?.mutasikeluar?.reduce((a, b) => parseFloat(a) + parseFloat(b.jumlah), 0),
              sub: it?.mutasikeluar?.reduce((a, b) => parseFloat(a) + parseFloat(b.sub), 0)
            }

            const index = keluar.findIndex(f => f.kd_obat === it?.kd_obat)
            if (index >= 0) {
              const jumM = keluar[index].jumlah + raw.jumlah
              const subM = keluar[index].sub + raw.sub

              keluar[index].jumlah = jumM
              keluar[index].sub = subM
            }
            else {
              keluar.push(raw)
            }
            keluarx.push(raw)
          }
        }
        if (this.params.jenis === 'rekap') {
          if (masukx?.length) {
            const mas = {
              kd_obat: it?.kd_obat,
              jumlah: masukx?.reduce((a, b) => parseFloat(a) + parseFloat(b.jumlah), 0),
              sub: masukx?.reduce((a, b) => parseFloat(a) + parseFloat(b.sub), 0)
            }
            it.data[0].masuk = mas
          }
          if (keluar?.length) {
            const kel = {
              kd_obat: it?.kd_obat,
              jumlah: keluar?.reduce((a, b) => parseFloat(a) + parseFloat(b.jumlah), 0),
              sub: keluar?.reduce((a, b) => parseFloat(a) + parseFloat(b.sub), 0)
            }
            it.data[0].keluar = kel
          }
          const jAw = it.data[0]?.saldoawal?.jumlah ?? 0
          const sAw = it.data[0]?.saldoawal?.sub ?? 0

          const jMa = it.data[0]?.masuk?.jumlah ?? 0
          const sMa = it.data[0]?.masuk?.sub ?? 0

          const jKe = it.data[0]?.keluar?.jumlah ?? 0
          const sKe = it.data[0]?.keluar?.sub ?? 0
          const akh = {
            kd_obat: it?.kd_obat,
            jumlah: jAw + jMa - jKe,
            sub: sAw + sMa - sKe
          }
          if (it.data?.length > 0)it.data[0].akhir = akh

          it.masuk = masukx
          it.keluar = keluar
          const newMasuk = masuk?.reduce((a, b) => parseFloat(a) + parseFloat(b.jumlah), 0)
          const newKeluar = keluarx?.reduce((a, b) => parseFloat(a) + parseFloat(b.jumlah), 0)
          console.log('masuk', newMasuk)
          console.log('keluar', newKeluar)
        }
        else {
          const aw = it?.saldo?.map(m => m.nopenerimaan)
          const npms = masuk.map(m => m.nopenerimaan)
          const nkms = keluar.map(m => m.nopenerimaan)
          const noper = filterDuplicateArrays([...new Set([...npms, ...nkms, ...aw])])
          console.log('masuk', masuk)
          console.log('keluar', keluar)
          console.log('noper', noper)

          // const akhir = masuk.filter(f => f.jumlah !== 0)
          const akhir = []
          noper.forEach(nop => {
            const jumAw = it?.saldo.filter(f => f.nopenerimaan === nop).reduce((a, b) => parseFloat(a) + parseFloat(b.jumlah), 0)
            const subAw = it?.saldo.filter(f => f.nopenerimaan === nop).reduce((a, b) => parseFloat(a) + parseFloat(b.sub), 0)
            const jumMas = masuk.filter(f => f.nopenerimaan === nop).reduce((a, b) => parseFloat(a) + parseFloat(b.jumlah), 0)
            const subMas = masuk.filter(f => f.nopenerimaan === nop).reduce((a, b) => parseFloat(a) + parseFloat(b.sub), 0)
            const jumKel = keluar.filter(f => f.nopenerimaan === nop).reduce((a, b) => parseFloat(a) + parseFloat(b.jumlah), 0)
            const subKel = keluar.filter(f => f.nopenerimaan === nop).reduce((a, b) => parseFloat(a) + parseFloat(b.sub), 0)
            const temp = {
              nopenerimaan: nop,
              jumlah: jumAw + jumMas - jumKel,
              sub: subAw + subMas - subKel
            }
            akhir.push(temp)
          })
          console.log('akhir', akhir)

          it.akhir = akhir.filter(f => f.jumlah !== 0)
          it.akhir.forEach(s => {
            s.tgl = this.params.tahun + '-' + this.params.bulan + '-31 23:59:50'
            const temp = {
              tgl: s.tgl,
              ket: 'Saldo Akhir'
            }
            if (this.params.jenis === 'rekap' && it.data.filter(f => f.masuk)?.map(m => m.masuk)?.length > 1) {
              // temp.akhir = s
              // temp.masuk = {
              //   jumlah: it.data.filter(f => f.masuk)?.map(m => m.masuk)?.reduce((a, b) => parseFloat(a) + parseFloat(b.jumlah), 0),
              //   sub: it.data.filter(f => f.masuk)?.map(m => m.masuk)?.reduce((a, b) => parseFloat(a) + parseFloat(b.sub), 0)
              // }
            }
            else {
              temp.akhir = s
            }
            // console.log('temp akhir', temp)

            if (type !== 'download') it.data.push(temp)
          })
        }
        const jumAk = it?.akhir?.reduce((a, b) => parseFloat(a) + parseFloat(b.jumlah), 0)
        const subAk = it?.akhir?.reduce((a, b) => parseFloat(a) + parseFloat(b.sub), 0)
        const jumAw = it?.saldoawal?.reduce((a, b) => parseFloat(a) + parseFloat(b.jumlah), 0)
        const subAw = it?.saldoawal?.reduce((a, b) => parseFloat(a) + parseFloat(b.sub), 0)
        const jumMs = it?.data?.filter(f => !!f.masuk)?.map(m => m.masuk)?.reduce((a, b) => parseFloat(a) + parseFloat(b.jumlah), 0)
        const subMs = it?.data?.filter(f => !!f.masuk)?.map(m => m.masuk)?.reduce((a, b) => parseFloat(a) + parseFloat(b.sub), 0)
        const jumKel = it?.data?.filter(f => !!f.keluar)?.map(m => m.keluar)?.reduce((a, b) => parseFloat(a) + parseFloat(b.jumlah), 0)
        const subKel = it?.data?.filter(f => !!f.keluar)?.map(m => m.keluar)?.reduce((a, b) => parseFloat(a) + parseFloat(b.sub), 0)
        const subt = {
          tgl: this.params.tahun + '-' + this.params.bulan + '-31 23:59:59',
          subtotal: {
            jumlah: jumAk,
            sub: subAk
          },
          subAw: {
            jumlah: jumAw,
            sub: subAw
          },
          subMs: {
            jumlah: jumMs,
            sub: subMs
          },
          subKel: {
            jumlah: jumKel,
            sub: subKel
          },
          ket: type === 'download' ? '' : 'Subtotal Saldo Akhir'
        }
        if (this.params.jenis === 'detail' && (jumAk > 0 || jumAw > 0 || jumMs > 0 || jumKel > 0)) it?.data.push(subt)
        // if (this.params.jenis === 'rekap' && type === 'download') it?.data.push(subt)

        it?.data?.sort(function (a, b) {
          const dateA = new Date(a.tgl)
          const dateB = new Date(b.tgl)

          // Subtract the dates to get a value that is either negative, positive, or zero
          return dateA - dateB
        })
        const index = array.findIndex(a => a.kd_obat === it.kd_obat)
        if (index >= 0) array[index] = it
        else array.push(it)
      })

      // array = val
      console.log('metani items', array)
    },
    getInitialData (val) {
      this.ketProses = null
      this.setParams('page', val)
      this.setParams('action', '')
      this.getDataTable()
      this.meta = {}
      this.items = []
    },
    getAllData () {
      if (this.meta?.current_page > 0 && !this.ketProses) {
        const cur = this.meta?.to / 5
        this.setParams('page', cur + 1)
        console.log('parameter', this.meta?.to, cur, this.params, this.meta)
      }

      // this.setParams('per_page', 5)
      this.ketProses = 'Mengambil data halaman '
      this.getDatanya()
      console.log('this.meta?.current_page', this.meta?.current_page, !(this.ketProses))
      watch(() => this.meta?.current_page, (obj) => {
        console.log('obj', obj, !this.scrolling, this.meta?.current_page < this.meta?.last_page, !(this.ketProses), this.meta?.current_page < this.meta?.last_page && !this.scrolling && !(this.ketProses))
        if (this.meta?.current_page < this.meta?.last_page && !this.scrolling && !(this.ketProses)) {
          this.setParams('page', obj + 1)
          // this.ketProses = 'Mengambil data halaman ' + this.meta?.current_page + ' dari ' + this.meta?.last_page + ' halaman'
          this.ketProses = 'Mengambil data halaman '
        }
        else {
          this.ketProses = ''
        }
        this.getDatanya()
      })
    },
    getDatanya () {
      this.loadingNext = true
      // this.setParams('action', 'download')
      const param = { params: this.params }
      return new Promise(resolve => {
        api.get('v1/simrs/laporan/farmasi/persediaan/get-mutasi', param)
          .then(resp => {
            this.loadingNext = false
            this.setParams('action', '')
            console.log('data tabel', resp.data)
            this.meta = resp.data?.meta
            this.mapingItem(resp?.data?.data, this.items)
            this.ketProses = ''
            resolve(resp)
          })
          .catch(() => {
            this.loadingNext = false
            this.ketProses = ''
            this.loading = false
          })
      })
    },
    setField () {
      if (this.params.jenis === 'rekap') {
        this.fields = {
          No: 'no',
          'Kode Obat': 'kd_obat',
          'Nama Obat': 'nama_obat',
          Satuan: 'satuan_k',
          'Kode Belanja': 'uraian50',
          Keterangan: 'ket',
          'Jumlah Saldo Awal': 'jumlSalAwal',
          'Nilai Saldo Awal': 'nilaiSalAwal',
          'Jumlah Masuk': 'jumlMasuk',
          'Nilai Masuk': 'nilaiMasuk',
          'Jumlah Keluar': 'jumlKeluar',
          'Nilai Keluar': 'nilaiKeluar',
          'Jumlah Saldo Akhir': 'jumlSalAkhir',
          'Nilai Saldo Akhir': 'nilaiSalAkhir'
        }
      }
      else {
        this.fields = {
          No: 'no',
          'Kode Obat': 'kd_obat',
          'Nama Obat': 'nama_obat',
          Satuan: 'satuan_k',
          Keterangan: 'ket',
          'Jumlah Saldo Awal': 'jumlSalAwal',
          'Harga Saldo Awal': 'harSalAwal',
          'Nilai Saldo Awal': 'nilaiSalAwal',
          'Tanggal Masuk': 'tglMasuk',
          'Jumlah Masuk': 'jumlMasuk',
          'Harga Masuk': 'harMasuk',
          'Nilai Masuk': 'nilaiMasuk',
          'Tanggal Keluar': 'tglKeluar',
          'Jumlah Keluar': 'jumlKeluar',
          'Harga Keluar': 'harKeluar',
          'Nilai Keluar': 'nilaiKeluar',
          'Jumlah Saldo Akhir': 'jumlSalAkhir',
          'Harga Saldo Akhir': 'harSalAkhir',
          'Nilai Saldo Akhir': 'nilaiSalAkhir'
        }
      }
    },
    cekNan (val) {
      return isNaN(parseFloat(val)) ? '' : val
    },
    async fetch () {
      // laravel throttle 180 ms
      this.setField()
      const param = { params: this.params }
      // param.params.action = 'download'

      this.ketProses = 'Mengambil data halaman '
      const data = []
      const dataForTotal = []
      const items = []

      // const resp = await api.get('v1/simrs/laporan/farmasi/persediaan/get-mutasi', param)

      // if (!resp?.data?.data?.length) return notifErrVue('Data tidak ditemukan')

      let currentPage = 1
      let totalPages = 1
      do {
        param.params.page = currentPage // Tambahkan parameter halaman
        const resp = await api.get('v1/simrs/laporan/farmasi/persediaan/get-mutasi', param)
        if (!resp?.data?.data?.length) {
          if (currentPage === 1) {
            this.ketProses = null
            return notifErrVue('Data tidak ditemukan')
          }
          break
        }
        this.ketProses = 'Mengambil data halaman '
        totalPages = resp.data?.meta?.last_page || totalPages // Total halaman dari API
        this.meta = resp.data?.meta
        this.mapingItem(resp?.data?.data, items, 'download')
        items.forEach((item, i) => {
          if (item?.data?.length) {
            item?.data.forEach((dat, d) => {
              const ada = {}
              const tmpForTot = {}
              if (d === 0) {
                ada.no = i + 1
                ada.kd_obat = item?.kd_obat
                ada.nama_obat = item?.nama_obat
                ada.satuan_k = item?.satuan_k
                if (this.params.jenis === 'rekap') ada.uraian50 = item?.uraian50
              }
              // ini untuk menjmlah total
              tmpForTot.jumlSalAwal = this.cekNan(parseFloat(dat?.saldoawal?.jumlah), 2)
              tmpForTot.nilaiSalAwal = this.cekNan(parseFloat(dat?.saldoawal?.sub), 2)
              tmpForTot.jumlMasuk = this.cekNan(parseFloat(dat?.masuk?.jumlah), 2)
              tmpForTot.nilaiMasuk = this.cekNan(parseFloat(dat?.masuk?.sub), 2)
              tmpForTot.jumlKeluar = this.cekNan(parseFloat(dat?.keluar?.jumlah), 2)
              tmpForTot.nilaiKeluar = this.cekNan(parseFloat(dat?.keluar?.sub), 2)
              tmpForTot.jumlSalAkhir = this.cekNan(parseFloat(dat?.akhir?.jumlah), 2)
              tmpForTot.nilaiSalAkhir = this.cekNan(parseFloat(dat?.akhir?.sub), 2)

              if (this.params.jenis === 'rekap') {
                ada.ket = dat?.ket
                ada.jumlSalAwal = this.cekNan(formatDoubleKoma(parseFloat(dat?.saldoawal?.jumlah), 2))
                ada.nilaiSalAwal = this.cekNan(formatDoubleKoma(parseFloat(dat?.saldoawal?.sub), 2))
                ada.jumlMasuk = this.cekNan(formatDoubleKoma(parseFloat(dat?.masuk?.jumlah), 2))
                ada.nilaiMasuk = this.cekNan(formatDoubleKoma(parseFloat(dat?.masuk?.sub), 2))
                ada.jumlKeluar = this.cekNan(formatDoubleKoma(parseFloat(dat?.keluar?.jumlah), 2))
                ada.nilaiKeluar = this.cekNan(formatDoubleKoma(parseFloat(dat?.keluar?.sub), 2))
                ada.jumlSalAkhir = this.cekNan(formatDoubleKoma(parseFloat(dat?.akhir?.jumlah), 2))
                ada.nilaiSalAkhir = this.cekNan(formatDoubleKoma(parseFloat(dat?.akhir?.sub), 2))
              }
              else {
                ada.ket = dat?.ket
                ada.jumlSalAwal = this.cekNan(formatDoubleKoma(parseFloat(dat?.saldoawal?.jumlah ?? dat?.subAw?.jumlah), 2))
                ada.harSalAwal = this.cekNan(formatDoubleKoma(parseFloat(dat?.saldoawal?.harga), 2))
                ada.nilaiSalAwal = this.cekNan(formatDoubleKoma(parseFloat(dat?.saldoawal?.sub ?? dat?.subAw?.sub), 2))
                ada.tglMasuk = dat?.masuk?.tgl ?? ''
                ada.jumlMasuk = this.cekNan(formatDoubleKoma(parseFloat(dat?.masuk?.jumlah ?? dat?.subMs?.jumlah), 2))
                ada.harMasuk = this.cekNan(formatDoubleKoma(parseFloat(dat?.masuk?.harga), 2))
                ada.nilaiMasuk = this.cekNan(formatDoubleKoma(parseFloat(dat?.masuk?.sub ?? dat?.subMs?.sub), 2))
                ada.tglKeluar = dat?.keluar?.tgl ?? ''
                ada.jumlKeluar = this.cekNan(formatDoubleKoma(parseFloat(dat?.keluar?.jumlah ?? dat?.subKel?.jumlah), 2))
                ada.harKeluar = this.cekNan(formatDoubleKoma(parseFloat(dat?.keluar?.harga), 2))
                ada.nilaiKeluar = this.cekNan(formatDoubleKoma(parseFloat(dat?.keluar?.sub ?? dat?.subKel?.sub), 2))
                ada.jumlSalAkhir = this.cekNan(formatDoubleKoma(parseFloat(dat?.akhir?.jumlah ?? dat?.subtotal?.jumlah), 2))
                ada.harSalAkhir = this.cekNan(formatDoubleKoma(parseFloat(dat?.akhir?.harga), 2))
                ada.nilaiSalAkhir = this.cekNan(formatDoubleKoma(parseFloat(dat?.akhir?.sub ?? dat?.subtotal?.sub), 2))
              }

              data.push(ada)
              dataForTotal.push(tmpForTot)
            })
          }
          else {
            console.log('ada tidak')
            const temp = {}
            temp.no = i + 1
            temp.kd_obat = item?.kd_obat
            temp.nama_obat = item?.nama_obat
            temp.satuan_k = item?.satuan_k
            if (this.params.jenis === 'rekap') temp.uraian50 = item?.uraian50

            data.push(temp)
          }
        })

        currentPage++
      } while (currentPage <= totalPages)
      // total
      const tot = {
        ket: 'Total',
        jumlSalAwal: this.cekNan(formatDoubleKoma(dataForTotal?.filter(f => parseFloat(f.jumlSalAwal) > 0)?.reduce((a, b) => parseFloat(a) + parseFloat(b.jumlSalAwal), 0), 2)),
        nilaiSalAwal: this.cekNan(formatDoubleKoma(dataForTotal?.filter(f => parseFloat(f.nilaiSalAwal) > 0)?.reduce((a, b) => parseFloat(a) + parseFloat(b.nilaiSalAwal), 0), 2)),
        jumlMasuk: this.cekNan(formatDoubleKoma(dataForTotal?.filter(f => parseFloat(f.jumlMasuk) > 0)?.reduce((a, b) => parseFloat(a) + parseFloat(b.jumlMasuk), 0), 2)),
        nilaiMasuk: this.cekNan(formatDoubleKoma(dataForTotal?.filter(f => parseFloat(f.nilaiMasuk) > 0)?.reduce((a, b) => parseFloat(a) + parseFloat(b.nilaiMasuk), 0), 2)),
        jumlKeluar: this.cekNan(formatDoubleKoma(dataForTotal?.filter(f => parseFloat(f.jumlKeluar) > 0)?.reduce((a, b) => parseFloat(a) + parseFloat(b.jumlKeluar), 0), 2)),
        nilaiKeluar: this.cekNan(formatDoubleKoma(dataForTotal?.filter(f => parseFloat(f.nilaiKeluar) > 0)?.reduce((a, b) => parseFloat(a) + parseFloat(b.nilaiKeluar), 0), 2)),
        jumlSalAkhir: this.cekNan(formatDoubleKoma(dataForTotal?.filter(f => parseFloat(f.jumlSalAkhir) > 0)?.reduce((a, b) => parseFloat(a) + parseFloat(b.jumlSalAkhir), 0), 2)),
        nilaiSalAkhir: this.cekNan(formatDoubleKoma(dataForTotal?.filter(f => parseFloat(f.nilaiSalAkhir) > 0)?.reduce((a, b) => parseFloat(a) + parseFloat(b.nilaiSalAkhir), 0), 2))
      }
      data.push(tot)
      console.log('items', data)
      this.ketProses = null
      this.items = items
      return data
    },
    startDownload () { this.loadingDownload = true },
    finishDownload () { this.loadingDownload = false },
    async getDataTable (val) {
      this.ketProses = null
      this.setParams('per_page', 20)
      if (this.params.page === 1) this.loading = true
      else this.loadingNext = true
      this.scrolling = true
      const param = { params: this.params }
      await api.get('v1/simrs/laporan/farmasi/persediaan/get-mutasi', param)
        .then(resp => {
          if (this.params.action === 'download') delete this.params.action
          setTimeout(() => {
            this.scrolling = false
          }, 1000)
          this.loading = false
          this.loadingNext = false
          // console.log('data tabel', resp.data)
          this.meta = resp.data?.meta
          // this.items = resp?.data?.data
          this.mapingItem(resp?.data?.data, this.items)
        })
        .catch(() => {
          this.loading = false
          this.loadingNext = false
        })
    }
  }
})
