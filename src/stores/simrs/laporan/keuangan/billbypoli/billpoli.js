import { defineStore } from 'pinia'
import { date } from 'quasar'
import { api } from 'src/boot/axios'
import { filterDuplicateArrays } from 'src/modules/utils'

export const useSimrsLaporanKeuanganBillPoliStore = defineStore('simrs_laporan_keuangan_bill_by_poli', {
  state: () => ({
    loading: false,
    items: [],
    meta: {},
    tanggal: {
      from: date.formatDate(Date.now(), 'DD MMMM YYYY'),
      to: date.formatDate(Date.now(), 'DD MMMM YYYY')
      // from: date.formatDate('01-01-2023', 'DD MMMM YYYY'),
      // to: date.formatDate('01-05-2023', 'DD MMMM YYYY')
    },
    params: {
      q: '',
      page: 1,
      per_page: 10,
      order_by: 'created_at',
      tgldari: date.formatDate(Date.now(), 'YYYY-MM-DD'),
      tglsampai: date.formatDate(Date.now(), 'YYYY-MM-DD'),
      // tgldari: date.formatDate('01-01-2023', 'YYYY-MM-DD'),
      // tglsampai: date.formatDate('01-05-2023', 'YYYY-MM-DD'),
      sort: 'desc'
    },
    form: {},
    columns: ['poli', 'dokter', 'kunjungan', 'tagihan', 'pendapatan', 'lab', 'rad', 'obat'],
    columnHide: ['id']
  }),
  actions: {
    setForm(key, val) {
      this.form[key] = val
    },
    setPerPage (payload) {
      this.params.per_page = payload
      this.params.page = 1
      this.getDataTable()
    },
    refreshTable () {
      this.params.page = 1
      this.getDataTable()
    },

    mapDataItems(val) {
      // console.log('laporan ', val)
      // maping poli start-----
      const poli = val.filter(x => x.kunjungan.length)
      if (poli.length) {
        poli.forEach(pol => {
          const kodeDokter = filterDuplicateArrays(pol.kunjungan.map(x => x.dokter.rs1))
          const tempRekMed = []
          const tempAptRacik = []
          let tempAptRelasiRacik = 0
          const tempAptPoli = []
          const tempLab = []
          const tempPendBpjs = []
          const tempPendUmum = []
          const tempPsiko = []
          const tempRad = []
          const tempTinPol = []
          const tempVisite = []
          if (pol.kunjungan.length) {
            pol.kunjungan.forEach(k => {
              if (k.visiteumum.length) {
                k.visiteumum.forEach(a => tempVisite.push(a))
              }
              if (k.tindakanpoliumum.length) {
                k.tindakanpoliumum.forEach(a => tempTinPol.push(a))
              }
              if (k.rekammdedikumum.length) {
                k.rekammdedikumum.forEach(a => tempRekMed.push(a))
              }
              if (k.apotekracikanrajalumum.length) {
                // console.log('racik', k.apotekracikanrajalumum)
                k.apotekracikanrajalumum.forEach(a => tempAptRacik.push(a))
                tempAptRelasiRacik = tempAptRacik.length ? tempAptRacik.map(x => x.relasihederracikan.rs8).reduce((a, b) => a + b, 0) : 0
                // console.log('relasi racik', tempAptRelasiRacik)
              }
              if (k.apotekrajalpolilaluumum.length) {
                // console.log('poli', k.apotekrajalpolilaluumum)
                k.apotekrajalpolilaluumum.forEach(a => tempAptPoli.push(a))
              }
              if (k.laborat.length) {
                // k.laborat.forEach(a => {
                //   console.log('lab b', a)
                const paket = k.laborat.filter(l => l.pemeriksaanlab.rs21 !== '')
                const nonPaket = k.laborat.filter(l => l.pemeriksaanlab.rs21 === '')
                // console.log('lab', a)
                if (nonPaket.length) {
                  // console.log('non paket', nonPaket)
                  nonPaket.forEach(c => {
                    tempLab.push(c)
                  })
                }
                if (paket.length) {
                  // console.log('paket', paket)
                  const keyP = paket.map(x => x.pemeriksaanlab.rs21)
                  const keyPaket = filterDuplicateArrays(keyP)
                  keyPaket.forEach(key => {
                    const anu = paket.filter(l => l.pemeriksaanlab.rs21 === key)
                    tempLab.push(anu[0])
                  })
                }
                // })
              }
              if (k.pendapatanallbpjs.length) {
                k.pendapatanallbpjs.forEach(a => {
                  const temp = a
                  // temp.subtotal=temp.Pelayanan_darah + temp.alkes + temp.bmhp + temp.kamar + temp.keperawatan + temp.konsultasi + temp.obat + temp.penunjang + temp.radiologi + temp.rawat_intensif + temp.rehabilitasi + temp.sewa_alat + temp. + temp. + temp.
                  tempPendBpjs.push(temp)
                })
              }
              if (k.pendapatanumum.length) {
                k.pendapatanumum.forEach(a => tempPendUmum.push(a))
              }
              if (k.psikologtransumum.length) {
                k.psikologtransumum.forEach(a => tempPsiko.push(a))
              }
              if (k.radiologi.length) {
                k.radiologi.forEach(a => {
                  if (a.reltransrinci.length) {
                    a.reltransrinci.forEach(b => {
                      tempRad.push(b)
                    })
                  }
                })
              }
            })
          }
          pol.rekamMedikUmum = tempRekMed.length ? tempRekMed.map(x => x.subtotal).reduce((a, b) => a + b, 0) : 0
          pol.listRekamMedikUmum = tempRekMed.length ? tempRekMed.map(x => x.subtotal) : []
          pol.aptRacik = tempAptRacik.length ? Math.round(tempAptRacik.map(x => x.subtotal).reduce((a, b) => a + b, 0) + tempAptRelasiRacik) : 0
          pol.listAptRacik = tempAptRacik.length ? tempAptRacik.map(x => x.subtotal) : []
          pol.aptPoli = tempAptPoli.length ? tempAptPoli.map(x => x.subtotal).reduce((a, b) => a + b, 0) : 0
          pol.listAptPoli = tempAptPoli.length ? tempAptPoli.map(x => x.subtotal) : []
          pol.lab = tempLab.length ? tempLab.map(x => x.subtotal).reduce((a, b) => a + b, 0) : 0
          pol.psiko = tempPsiko.length ? tempPsiko.map(x => x.subtotal).reduce((a, b) => a + b, 0) : 0
          pol.rad = tempRad.length ? tempRad.map(x => x.subtotal).reduce((a, b) => a + b, 0) : 0
          pol.tinPol = tempTinPol.length ? tempTinPol.map(x => x.subtotal).reduce((a, b) => a + b, 0) : 0
          pol.visite = tempVisite.length ? tempVisite.map(x => x.subtotal).reduce((a, b) => a + b, 0) : 0
          pol.listLab = tempLab.length ? tempLab.map(x => x.subtotal) : []
          pol.listPsiko = tempPsiko.length ? tempPsiko.map(x => x.subtotal) : []
          pol.listRad = tempRad.length ? tempRad.map(x => x.subtotal) : []
          pol.listTinPol = tempTinPol.length ? tempTinPol.map(x => x.subtotal) : []
          pol.listVisite = tempVisite.length ? tempVisite.map(x => x.subtotal) : []

          pol.penBpjs = tempPendBpjs.length ? tempPendBpjs.map(x => x.subtotal).reduce((a, b) => a + b, 0) : 0
          pol.pendUmum = tempPendUmum.length ? tempPendUmum.map(x => x.total).reduce((a, b) => a + b, 0) : 0
          pol.listPenBpjs = tempPendBpjs.length ? tempPendBpjs.map(x => x.subtotal) : []
          pol.listPendUmum = tempPendUmum.length ? tempPendUmum.map(x => x.total) : []
          // console.log('temp rek med', tempRekMed)
          // const rekamMedikUmum = pol.kunjungan.map(x => x.rekammdedikumum.map(y => y.subtotal)).reduce((a, b) => a + b, 0)
          pol.poli = {
            poli: pol.rs2,
            dokter: 'semua',
            kunjungan: pol.kunjungan.length,
            tagihan: pol.rekamMedikUmum + pol.aptRacik + pol.aptPoli + pol.lab + pol.psiko + pol.rad + pol.tinPol + pol.visite,
            pendapatan: pol.penBpjs + pol.pendUmum,
            lab: pol.lab,
            rad: pol.rad,
            obat: pol.aptRacik + pol.aptPoli

          }
          this.items.push(pol.poli)
          pol.kodDok = kodeDokter
          pol.dokter = []
          kodeDokter.forEach(key => {
            const dok = {}
            dok.kunjungan = pol.kunjungan.filter(x => x.rs9 === key)
            if (dok.kunjungan.length) {
              const tempDokRekMed = []
              const tempDokAptRacik = []
              let tempDokAptRelasiRacik = 0
              const tempDokAptPoli = []
              const tempDokLab = []
              const tempDokPendBpjs = []
              const tempDokPendUmum = []
              const tempDokPsiko = []
              const tempDokRad = []
              const tempDokTinPol = []
              const tempDokVisite = []
              dok.kunjungan.forEach(k => {
                // console.log('kunjungan', k)
                // console.log('kunj', kunj)
                if (k.visiteumum.length) {
                  k.visiteumum.forEach(a => tempDokVisite.push(a))
                }
                if (k.tindakanpoliumum.length) {
                  k.tindakanpoliumum.forEach(a => tempDokTinPol.push(a))
                }
                if (k.rekammdedikumum.length) {
                  k.rekammdedikumum.forEach(a => tempDokRekMed.push(a))
                }
                if (k.apotekracikanrajalumum.length) {
                  // console.log('racik', k.apotekracikanrajalumum)
                  k.apotekracikanrajalumum.forEach(a => tempDokAptRacik.push(a))
                  tempDokAptRelasiRacik = tempDokAptRacik.length ? tempDokAptRacik.map(x => x.relasihederracikan.rs8).reduce((a, b) => a + b, 0) : 0
                  // console.log('relasi racik dokter', tempDokAptRelasiRacik)
                }
                if (k.apotekrajalpolilaluumum.length) {
                  k.apotekrajalpolilaluumum.forEach(a => tempDokAptPoli.push(a))
                }
                if (k.laborat.length) {
                  const paket = k.laborat.filter(l => l.pemeriksaanlab.rs21 !== '')
                  const nonPaket = k.laborat.filter(l => l.pemeriksaanlab.rs21 === '')

                  if (nonPaket.length) {
                    nonPaket.forEach(c => {
                      tempDokLab.push(c)
                    })
                  }
                  if (paket.length) {
                    const keyP = paket.map(x => x.pemeriksaanlab.rs21)
                    const keyPaket = filterDuplicateArrays(keyP)
                    keyPaket.forEach(key => {
                      const anu = paket.filter(l => l.pemeriksaanlab.rs21 === key)
                      tempDokLab.push(anu[0])
                    })
                  }
                  // })
                }
                if (k.pendapatanallbpjs.length) {
                  k.pendapatanallbpjs.forEach(a => tempDokPendBpjs.push(a))
                }
                if (k.pendapatanumum.length) {
                  k.pendapatanumum.forEach(a => tempDokPendUmum.push(a))
                }
                if (k.psikologtransumum.length) {
                  k.psikologtransumum.forEach(a => tempDokPsiko.push(a))
                }
                if (k.radiologi.length) {
                  k.radiologi.forEach(a => {
                    if (a.reltransrinci.length) {
                      a.reltransrinci.forEach(b => {
                        tempDokRad.push(b)
                      })
                    }
                  })
                }
              })
              dok.rekamMedikUmum = tempDokRekMed.length ? tempDokRekMed.map(x => x.subtotal).reduce((a, b) => a + b, 0) : 0
              dok.aptRacik = tempDokAptRacik.length ? Math.round(tempDokAptRacik.map(x => x.subtotal).reduce((a, b) => a + b, 0) + tempDokAptRelasiRacik) : 0
              dok.aptPoli = tempDokAptPoli.length ? tempDokAptPoli.map(x => x.subtotal).reduce((a, b) => a + b, 0) : 0
              dok.lab = tempDokLab.length ? tempDokLab.map(x => x.subtotal).reduce((a, b) => a + b, 0) : 0
              dok.psiko = tempDokPsiko.length ? tempDokPsiko.map(x => x.subtotal).reduce((a, b) => a + b, 0) : 0
              dok.rad = tempDokRad.length ? tempDokRad.map(x => x.subtotal).reduce((a, b) => a + b, 0) : 0
              dok.tinPol = tempDokTinPol.length ? tempDokTinPol.map(x => x.subtotal).reduce((a, b) => a + b, 0) : 0
              dok.visite = tempDokVisite.length ? tempDokVisite.map(x => x.subtotal).reduce((a, b) => a + b, 0) : 0

              dok.penBpjs = tempDokPendBpjs.length ? tempDokPendBpjs.map(x => x.subtotal).reduce((a, b) => a + b, 0) : 0
              dok.pendUmum = tempDokPendUmum.length ? tempDokPendUmum.map(x => x.total).reduce((a, b) => a + b, 0) : 0

              dok.poli = {
                poli: '',
                dokter: dok.kunjungan[0].dokter.rs2,
                kunjungan: dok.kunjungan.length,
                tagihan: dok.rekamMedikUmum + dok.aptRacik + dok.aptPoli + dok.lab + dok.psiko + dok.rad + dok.tinPol + dok.visite,
                pendapatan: dok.penBpjs + dok.pendUmum,
                lab: dok.lab,
                rad: dok.rad,
                obat: dok.aptRacik + dok.aptPoli

              }
              this.items.push(dok.poli)
            }
            pol.dokter.push(dok)
          })
        })
      }
      console.log('poli ', poli)
      console.log('item ', this.items)
      // maping poli end-----
      // const temp=val
      // temp.forEach(=>{})
    },
    // init data
    getInitialData() {
      // this.getDataTable()
    },

    // api related function
    getDataTable() {
      this.items = []
      this.loading = true
      const param = { params: this.params }
      return new Promise(resolve => {
        // api.get('v1/simrs/laporan/allbillperlopi', param)
        api.get('v1/simrs/laporan/billpoli', param)
          .then(resp => {
            this.loading = false
            // this.items = resp.data
            if (resp.data.length) {
              this.mapDataItems(resp.data)
            }
            // console.log('laporan ', resp.data)
            resolve(resp)
          })
          .catch(() => {
            this.loading = false
          })
      })
    }
  }
})
