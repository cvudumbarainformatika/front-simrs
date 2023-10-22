import { defineStore } from 'pinia'
import { date } from 'quasar'
import { api } from 'src/boot/axios'
import { filterDuplicateArrays, filterDuplicateArraysInArrays, notifErrVue } from 'src/modules/utils'

export const useSimrsLaporanKeuanganNewBillRajalStore = defineStore('simrs_laporan_keuangan_new_bill_rajal', {
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
      layanan: '1',
      // tgldari: date.formatDate('01-01-2023', 'YYYY-MM-DD'),
      // tglsampai: date.formatDate('01-05-2023', 'YYYY-MM-DD'),
      sort: 'desc'
    },
    form: {},
    bulans: [
      { nama: 'Januari', value: 'Januari', mo: '01' },
      { nama: 'Februari', value: 'Februari', mo: '02' },
      { nama: 'Maret', value: 'Maret', mo: '03' },
      { nama: 'April', value: 'April', mo: '04' },
      { nama: 'Mei', value: 'Mei', mo: '05' },
      { nama: 'Juni', value: 'Juni', mo: '06' },
      { nama: 'Juli', value: 'Juli', mo: '07' },
      { nama: 'Agustus', value: 'Agustus', mo: '08' },
      { nama: 'September', value: 'September', mo: '09' },
      { nama: 'Oktober', value: 'Oktober', mo: '10' },
      { nama: 'November', value: 'November', mo: '11' },
      { nama: 'Desember', value: 'Desember', mo: '12' }
    ],
    layanans: [
      { nama: 'Rawat Jalan', value: '1' },
      { nama: 'IGD', value: '2' },
      { nama: 'Rawat Inap', value: '3' }
    ],
    columns: [
      'tanggal',
      'pasien',
      'poli',
      'biaya',
      'apotik',
      'tindakan',
      'penunjang',
      'subtotal'
    ],
    columnHide: ['id']
  }),
  actions: {
    setColumns() {
      if (this.params.layanan === '3') {
        this.columns = [
          'tanggal',
          'pasien',
          'ruangan',
          'biaya',
          'visite',
          'materai',
          'keperawaatan',
          'gizi',
          'operasi',
          'jenazah',
          'kamar',
          'apotik',
          'tindakan',
          'penunjang',
          'ird',
          'subtotal'
        ]
      } else if (this.params.layanan === '2') {
        this.columns = [
          'tanggal',
          'pasien',
          'poli',
          'biaya',
          'visite',
          'materai',
          'operasi',
          'jenazah',
          'apotik',
          'tindakan',
          'penunjang',
          'subtotal'
        ]
      } else {
        this.columns = [
          'tanggal',
          'pasien',
          'poli',
          'biaya',
          'visite',
          'materai',
          'operasi',
          'apotik',
          'tindakan',
          'penunjang',
          'subtotal'
        ]
      }
    },
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
    bulanSelected(val) {
      console.log('val', val)
      this.params.bulan = val
      const from = date.adjustDate(this.params.from, { month: val })
      const to = date.adjustDate(this.params.from, { month: val })
      this.params.from = date.formatDate(from, 'YYYY-MM-DD')
      this.params.to = date.formatDate(to, 'YYYY-MM-DD')
      console.log('params', this.params)
    },
    // init data
    getInitialData() {
      // this.getDataTable()
    },
    mapDataItems() {
      this.items.forEach(item => {
        // const racik = item.apotekracikanrajal ? (item.apotekracikanrajal.length ? item.apotekracikanrajal.map(anu => anu.subtotal).reduce((a, b) => a + b, 0) : 0) : 0
        let racik = 0
        const poli = item.apotekrajalpolilalu ? (item.apotekrajalpolilalu.length ? item.apotekrajalpolilalu.map(anu => anu.subtotal).reduce((a, b) => a + b, 0) : 0) : 0
        // const laborat = item.laborat ? (item.laborat.length ? item.laborat.map(anu => anu.subtotal).reduce((a, b) => a + b, 0) : 0) : 0
        let laborat = 0
        // const radiologi = item.radiologi ? (item.radiologi.length ? item.radiologi.map(anu => anu.subtotal).reduce((a, b) => a + b, 0) : 0) : 0
        let radiologi = 0

        // console.log('before racik rajal')
        const racikKey = item.apotekracikanrajal ? (item.apotekracikanrajal.length ? item.apotekracikanrajal.map(anu => anu.rs2) : []) : []
        const racikKeyFilt = racikKey.length ? filterDuplicateArrays(racikKey) : []
        if (racikKeyFilt.length) {
          item.rajalracik = []
          racikKeyFilt.forEach(key => {
            const temp = {}
            temp.nota = key
            temp.rinci = item.apotekracikanrajal.filter(it => it.rs2 === key)
            temp.biaya_r = filterDuplicateArrays(temp.rinci.map(a => a.relasihederracikan.rs8)).length ? filterDuplicateArrays(temp.rinci.map(a => a.relasihederracikan.rs8)) : [0]
            temp.subtotal = temp.rinci.map(a => a.subtotal).reduce((a, b) => a + b, 0) + temp.biaya_r[0]
            racik += temp.subtotal
            item.rajalracik.push(temp)
          })
        }

        // console.log('before non racik rajal')
        const poliKey = item.apotekrajalpolilalu ? (item.apotekrajalpolilalu.length ? item.apotekrajalpolilalu.map(anu => anu.rs2) : []) : []
        const poliKeyFilt = poliKey.length ? filterDuplicateArrays(poliKey) : []
        if (poliKeyFilt.length) {
          item.rajalpoli = []
          poliKeyFilt.forEach(key => {
            const temp = {}
            temp.nota = key
            temp.rinci = item.apotekrajalpolilalu.filter(it => it.rs2 === key)
            temp.subtotal = temp.rinci.map(a => a.subtotal).reduce((a, b) => a + b, 0)
            item.rajalpoli.push(temp)
          })
        }
        // console.log('before laborat')

        const filteredLab = item.laborat ? (item.laborat.length ? item.laborat.filter(anu => anu.pemeriksaanlab !== null) : []) : []
        const laboratKey = filteredLab.length ? filteredLab.map(anu => anu.rs2) : []
        const laboratKeyFilt = laboratKey.length ? filterDuplicateArrays(laboratKey) : []
        if (laboratKeyFilt.length) {
          item.lab = []
          laboratKeyFilt.forEach(key => {
            const temp = {}
            temp.rinci = []
            const l1 = filteredLab.filter(it => it.rs2 === key)
            const paket = l1.filter(l => l.pemeriksaanlab.rs21 !== '')
            const nonPaket = l1.filter(l => l.pemeriksaanlab.rs21 === '')
            temp.nota = key
            if (nonPaket.length) {
              nonPaket.forEach(a => {
                temp.rinci.push(a)
              })
            }
            if (paket.length) {
              const keyP = paket.map(x => x.pemeriksaanlab.rs21)
              const keyPaket = filterDuplicateArrays(keyP)
              keyPaket.forEach(key => {
                const anu = paket.filter(l => l.pemeriksaanlab.rs21 === key)
                temp.rinci.push(anu[0])
              })
            }
            temp.subtotal = temp.rinci.map(a => a.subtotal).reduce((a, b) => a + b, 0)
            laborat += temp.subtotal
            item.lab.push(temp)
          })
        }
        // ird
        let laboratIRD = 0
        const filteredLabx = item.laboratdiird ? (item.laboratdiird.length ? item.laboratdiird.filter(anu => anu.pemeriksaanlab !== null) : []) : []
        const laboratKeyx = filteredLabx.length ? filteredLabx.map(anu => anu.rs2) : []
        const laboratKeyFiltx = laboratKeyx.length ? filterDuplicateArrays(laboratKeyx) : []
        if (laboratKeyFiltx.length) {
          item.labIRD = []
          laboratKeyFiltx.forEach(key => {
            const temp = {}
            temp.rinci = []
            const l1 = filteredLabx.filter(it => it.rs2 === key)
            const paket = l1.filter(l => l.pemeriksaanlab.rs21 !== '')
            const nonPaket = l1.filter(l => l.pemeriksaanlab.rs21 === '')
            temp.nota = key
            if (nonPaket.length) {
              nonPaket.forEach(a => {
                temp.rinci.push(a)
              })
            }
            if (paket.length) {
              const keyP = paket.map(x => x.pemeriksaanlab.rs21)
              const keyPaket = filterDuplicateArrays(keyP)
              keyPaket.forEach(key => {
                const anu = paket.filter(l => l.pemeriksaanlab.rs21 === key)
                temp.rinci.push(anu[0])
              })
            }
            temp.subtotal = temp.rinci.map(a => a.subtotal).reduce((a, b) => a + b, 0)
            laboratIRD += temp.subtotal
            item.labIRD.push(temp)
          })
        }

        // console.log('before radiologi')
        const radiologiKey = item.radiologi ? (item.radiologi.length ? item.radiologi.map(anu => anu.reltransrinci.map(a => a.rs2)) : []) : []
        const radiologiKeyFilt = radiologiKey.length ? filterDuplicateArraysInArrays(radiologiKey) : []
        if (radiologiKeyFilt.length) {
          item.radiolog = []
          radiologiKeyFilt.forEach(key => {
            const temp = {}
            temp.nota = key
            item.radiologi.forEach(rad => {
              temp.rinci = rad.reltransrinci.filter(it => it.rs2 === key)
            })
            temp.subtotal = temp.rinci.map(a => a.subtotal).reduce((a, b) => a + b, 0)
            radiologi = temp.subtotal
            item.radiolog.push(temp)
          })
        }

        // console.log('before Obat lalu')
        let obat = 0
        let obatl = 0
        if (item.apotekranaplalu) {
          if (item.apotekranaplalu.length) {
            obatl = item.apotekranaplalu.map(r => r.subtotal).reduce((a, b) => a + b, 0)
          }
        }
        // console.log('before Obat')
        if (item.apotekranap) {
          if (item.apotekranap.length) {
            obat = item.apotekranap.map(r => r.subtotal).reduce((a, b) => a + b, 0)
          }
        }
        // console.log('before Obat racik lalu')
        let obatRacik = 0
        let obatRacikl = 0
        if (item.apotekranapracikanrincilalu) {
          if (item.apotekranapracikanrincilalu.length) {
            const biayaR = item.apotekranapracikanhederlalu ? (item.apotekranapracikanhederlalu.length ? item.apotekranapracikanhederlalu[0].rs8 : 0) : 0
            obatRacikl = item.apotekranapracikanrincilalu.map(r => r.subtotal).reduce((a, b) => a + b, 0) + biayaR
          }
        }
        // console.log('before Obat racik ')
        if (item.apotekranapracikanrinci) {
          if (item.apotekranapracikanrinci.length) {
            const biayaR = item.apotekranapracikanheder ? (item.apotekranapracikanheder.length ? item.apotekranapracikanheder[0].rs8 : 0) : 0
            obatRacik = item.apotekranapracikanrinci.map(r => r.subtotal).reduce((a, b) => a + b, 0) + biayaR
          }
        }
        let obatx = 0
        let obatxl = 0
        if (item.apotekranaplalux) {
          if (item.apotekranaplalux.length) {
            obatxl = item.apotekranaplalux.map(r => r.subtotal).reduce((a, b) => a + b, 0)
          }
        }
        // console.log('before Obat')
        if (item.apotekranapx) {
          if (item.apotekranapx.length) {
            obatx = item.apotekranapx.map(r => r.subtotal).reduce((a, b) => a + b, 0)
          }
        }
        // console.log('before Obat racik lalu')
        let obatRacikx = 0
        let obatRacikxl = 0
        if (item.apotekranapracikanrincilalux) {
          if (item.apotekranapracikanrincilalux.length) {
            const biayaR = item.apotekranapracikanhederlalux ? (item.apotekranapracikanhederlalux.length ? item.apotekranapracikanhederlalux[0].rs8 : 0) : 0
            obatRacikxl = item.apotekranapracikanrincilalux.map(r => r.subtotal).reduce((a, b) => a + b, 0) + biayaR
          }
        }
        // console.log('before Obat racik ')
        if (item.apotekranapracikanrincix) {
          if (item.apotekranapracikanrincix.length) {
            const biayaR = item.apotekranapracikanhederx ? (item.apotekranapracikanhederx.length ? item.apotekranapracikanhederx[0].rs8 : 0) : 0
            obatRacikx = item.apotekranapracikanrincix.map(r => r.subtotal).reduce((a, b) => a + b, 0) + biayaR
          }
        }
        item.obat = obat + obatl
        item.obatRacik = obatRacik + obatRacikl
        item.obatIGD = obatx + obatxl
        item.obatRacikIGD = obatRacikx + obatRacikxl
        // console.log('yang di jumlah ', racik, poli, laborat, radiologi, item.obat, item.obatRacik)
        item.adminIgd = item.administrasiigd ? (item.administrasiigd.length ? item.administrasiigd[0].rs7 : 0) : 0
        item.ambRJ = item.ambulan ? (item.ambulan.length ? item.ambulan.map(itu => itu.subtotal).reduce((a, b) => a + b, 0) : 0) : 0
        item.bankDarahRJ = item.bdrs ? (item.bdrs.length ? item.bdrs.map(itu => itu.subtotal).reduce((a, b) => a + b, 0) : 0) : 0
        item.mtriRJ = item.biayamaterai ? (item.biayamaterai.length ? item.biayamaterai[0].rs5 : 0) : 0
        item.kmrJnzh = item.kamarjenasah ? (item.kamarjenasah.length ? item.kamarjenasah.map(itu => itu.subtotal).reduce((a, b) => a + b, 0) : 0) : 0
        item.kmrJnzhI = item.kamarjenasahinap ? (item.kamarjenasahinap.length ? item.kamarjenasahinap.map(itu => itu.subtotal).reduce((a, b) => a + b, 0) : 0) : 0
        item.okIGD = item.okigd ? (item.okigd.length ? item.okigd.map(itu => itu.subtotal).reduce((a, b) => a + b, 0) : 0) : 0
        item.tAnasLuarRJ = item.tindakananastesidiluarokdanicu ? (item.tindakananastesidiluarokdanicu.length ? item.tindakananastesidiluarokdanicu.map(itu => itu.subtotal).reduce((a, b) => a + b, 0) : 0) : 0
        item.tCardio = item.tindakancardio ? (item.tindakancardio.length ? item.tindakancardio.map(itu => itu.subtotal).reduce((a, b) => a + b, 0) : 0) : 0
        item.tDokPer = item.tindakandokterperawat ? (item.tindakandokterperawat.length ? item.tindakandokterperawat.map(dok => dok.subtotal).reduce((a, b) => a + b, 0) : 0) : 0
        item.tEeg = item.tindakaneeg ? (item.tindakaneeg.length ? item.tindakaneeg.map(itu => itu.subtotal).reduce((a, b) => a + b, 0) : 0) : 0
        item.tEndo = item.tindakanendoscopy ? (item.tindakanendoscopy.length ? item.tindakanendoscopy.map(itu => itu.subtotal).reduce((a, b) => a + b, 0) : 0) : 0
        item.tFisioRJ = item.tindakanfisioterapi ? (item.tindakanfisioterapi.length ? item.tindakanfisioterapi.map(itu => itu.subtotal).reduce((a, b) => a + b, 0) : 0) : 0
        item.tHdRJ = item.tindakanhd ? (item.tindakanhd.length ? item.tindakanhd.map(itu => itu.subtotal).reduce((a, b) => a + b, 0) : 0) : 0
        item.kOperasi = item.kamaroperasi ? (item.kamaroperasi.length ? item.kamaroperasi.map(itu => itu.subtotal).reduce((a, b) => a + b, 0) : 0) : 0
        item.tOperasi = item.tindakanoperasi ? (item.tindakanoperasi.length ? item.tindakanoperasi.map(itu => itu.subtotal).reduce((a, b) => a + b, 0) : 0) : 0
        item.transRad = item.transradiologi ? (item.transradiologi ? item.transradiologi.map(itu => itu.subtotal).reduce((a, b) => a + b, 0) : 0) : 0

        item.visitDok = item.visiteumum ? (item.visiteumum ? item.visiteumum.map(itu => itu.subtotal).reduce((a, b) => a + b, 0) : 0) : 0
        item.bId = item.biayakartuidentitas ? (item.biayakartuidentitas ? item.biayakartuidentitas.map(itu => itu.subtotal).reduce((a, b) => a + b, 0) : 0) : 0
        item.bKonsul = item.biayakonsulantarpoli ? (item.biayakonsulantarpoli ? item.biayakonsulantarpoli.map(itu => itu.subtotal).reduce((a, b) => a + b, 0) : 0) : 0
        item.bPelPoli = item.biayapelayananpoli ? (item.biayapelayananpoli ? item.biayapelayananpoli.map(itu => itu.subtotal).reduce((a, b) => a + b, 0) : 0) : 0
        item.bRM = item.biayarekammedik ? (item.biayarekammedik ? item.biayarekammedik.map(itu => itu.subtotal).reduce((a, b) => a + b, 0) : 0) : 0
        item.jPsikolog = item.psikologtransumum ? (item.psikologtransumum ? item.psikologtransumum.map(itu => itu.subtotal).reduce((a, b) => a + b, 0) : 0) : 0

        item.racikrajal = racik
        item.nonRacikRajal = poli
        item.jLaborat = laborat
        item.jRadiologi = radiologi

        // ranap yang ga sama
        const admin = item.admin ? item.admin : 0
        item.jRstigalimax = item.rstigalimax ? (item.rstigalimax.length ? item.rstigalimax.map(x => x.subtotal).reduce((a, b) => a + b, 0) : 0) : 0
        item.jRstigalimaxxx = item.rstigalimaxxx ? (item.rstigalimaxxx.length ? item.rstigalimaxxx.map(x => x.subtotal).reduce((a, b) => a + b, 0) : 0) : 0
        item.adminInap = admin

        item.iramb = item.irdambulan ? (item.irdambulan.length ? item.irdambulan.map(itu => itu.subtotal).reduce((a, b) => a + b, 0) : 0) : 0
        item.amb = item.ambRJ

        item.irBankDarah = item.irdbdrs ? (item.irdbdrs.length ? item.irdbdrs.map(itu => itu.subtotal).reduce((a, b) => a + b, 0) : 0) : 0
        item.bankDarah = item.bankDarahRJ

        item.irmtri = item.irdbiayamaterai ? (item.irdbiayamaterai.length ? item.irdbiayamaterai[0].rs5 : 0) : 0
        item.mtri = item.mtriRJ

        item.tAnasLuarird = item.irdtindakananastesidiluarokdanicu ? (item.irdtindakananastesidiluarokdanicu.length ? item.irdtindakananastesidiluarokdanicu.map(itu => itu.subtotal).reduce((a, b) => a + b, 0) : 0) : 0
        item.tAnasLuar = item.tAnasLuarRJ

        item.tFisioIRD = item.irdtindakanfisioterapi ? (item.irdtindakanfisioterapi.length ? item.irdtindakanfisioterapi.map(itu => itu.subtotal).reduce((a, b) => a + b, 0) : 0) : 0
        item.tFisio = item.tFisioRJ

        item.tHdird = item.irdtindakanhd ? (item.irdtindakanhd.length ? item.irdtindakanhd.map(itu => itu.subtotal).reduce((a, b) => a + b, 0) : 0) : 0
        item.tHd = item.tHdRJ

        item.kamaroperasiIBS = item.kamaroperasiibs ? (item.kamaroperasiibs.length ? item.kamaroperasiibs.map(x => x.subtotal).reduce((a, b) => a + b, 0) : 0) : 0
        item.kamaroperasiIBSx = item.kamaroperasiibsx ? (item.kamaroperasiibsx.length ? item.kamaroperasiibsx.map(x => x.subtotal).reduce((a, b) => a + b, 0) : 0) : 0
        // item.tRanapOperasi = item.tindakanoperasi ? (item.tindakanoperasi.length ? item.tindakanoperasi.map(x => x.subtotal).reduce((a, b) => a + b, 0) : 0) : 0
        item.tRanapOperasix = item.tindakanoperasix ? (item.tindakanoperasix.length ? item.tindakanoperasix.map(x => x.subtotal).reduce((a, b) => a + b, 0) : 0) : 0
        item.jKamaroperasiIBS = item.kamaroperasiIBS + item.kamaroperasiIBSx + item.kOperasi
        item.jTindakanoperasiIBS = item.tOperasi + item.tRanapOperasix

        item.kOperasiIgd = item.kamaroperasiigd ? (item.kamaroperasiigd.length ? item.kamaroperasiigd.map(x => x.subtotal).reduce((a, b) => a + b, 0) : 0) : 0
        item.tOperasiIgd = item.tindakanoperasiigd ? (item.tindakanoperasiigd.length ? item.tindakanoperasiigd.map(x => x.subtotal).reduce((a, b) => a + b, 0) : 0) : 0
        item.OpIgd = item.kOperasiIgd + item.tOperasiIgd
        // const OpIgd = item.kOperasiIgd + item.tOperasiIgd

        item.jKeperawatan = item.keperawatan ? (item.keperawatan.length ? item.keperawatan.map(x => x.subtotal).reduce((a, b) => a + b, 0) : 0) : 0

        const JIrdtindakan = item.irdtindakan ? (item.irdtindakan.length ? item.irdtindakan.map(x => x.subtotal).reduce((a, b) => a + b, 0) : 0) : 0
        const irTindakanOp = item.irdtindakanoperasix ? (item.irdtindakanoperasix.length ? item.irdtindakanoperasix.map(x => x.subtotal).reduce((a, b) => a + b, 0) : 0) : 0
        const irKamarOp = item.irdkamaroperasiigd ? (item.irdkamaroperasiigd.length ? item.irdkamaroperasiigd.map(x => x.subtotal).reduce((a, b) => a + b, 0) : 0) : 0
        const transRadird = item.transradiologidiird ? (item.transradiologidiird ? item.transradiologidiird.map(itu => itu.subtotal).reduce((a, b) => a + b, 0) : 0) : 0

        item.JIrdtindakan = item.OpIgd + laboratIRD + transRadird + JIrdtindakan + irTindakanOp + irKamarOp + item.irBankDarah + item.irmtri + item.iramb + item.tHdird + item.tAnasLuarird + item.tFisioIRD + item.jRstigalimaxxx

        item.jAsuhangizi = item.asuhangizi ? (item.asuhangizi.length ? item.asuhangizi.map(x => x.subtotal).reduce((a, b) => a + b, 0) : 0) : 0
        item.jMakanpasien = item.makanpasien ? (item.makanpasien.length ? item.makanpasien.map(x => x.subtotal).reduce((a, b) => a + b, 0) : 0) : 0

        item.jGizi = item.jAsuhangizi + item.jMakanpasien

        item.jOksigen = item.oksigen ? (item.oksigen.length ? item.oksigen.map(x => x.subtotal).reduce((a, b) => a + b, 0) : 0) : 0
        item.jTindakanperawat = item.tindakanperawat ? (item.tindakanperawat.length ? item.tindakanperawat.map(x => x.subtotal).reduce((a, b) => a + b, 0) : 0) : 0
        item.jTindakandokter = item.tindakandokter ? (item.tindakandokter.length ? item.tindakandokter.map(x => x.subtotal).reduce((a, b) => a + b, 0) : 0) : 0
        item.jPenunjangkeluar = item.penunjangkeluar ? (item.penunjangkeluar.length ? item.penunjangkeluar.map(x => x.subtotal).reduce((a, b) => a + b, 0) : 0) : 0
        item.jAkomodasikamar = item.akomodasikamar ? (item.akomodasikamar.length ? item.akomodasikamar.map(x => x.subtotal).reduce((a, b) => a + b, 0) : 0) : 0
        // end ranap

        item.subtotal = item.adminIgd + item.amb + item.bankDarah + item.mtri + item.kmrJnzh + item.kmrJnzhI +
          item.okIGD + item.tAnasLuar + item.tCardio + item.tDokPer + item.tEeg + item.tEndo + item.tFisio + item.tHd +
          item.transRad + racik + poli + laborat + radiologi + item.obatIGD + item.obatRacikIGD + item.obat + item.obatRacik + item.visitDok + item.bId + item.bKonsul +
          item.bPelPoli + item.bRM + item.jPsikolog + item.adminInap + item.jGizi + item.jKamaroperasiIBS + item.jTindakanoperasiIBS + item.jKeperawatan +
          item.jOksigen + item.jTindakanperawat + item.jTindakandokter + item.JIrdtindakan + item.jPenunjangkeluar + item.jAkomodasikamar

        // console.log('subtotal ', item.adminIgd, item.amb, item.bankDarah, item.mtri, item.kmrJnzh, item.kmrJnzhI, item.kOperasi,
        //   item.okIGD, item.tAnasLuar, item.tCardio, item.tDokPer, item.tEeg, item.tEndo, item.tFisio, item.tHd, item.tOperasi,
        //   item.transRad, racik, poli, laborat, radiologi, item.obat, item.obatRacik, item.visitDok, item.bId, item.bKonsul,
        //   item.bPelPoli, item.bRM, item.jPsikolog, item.adminInap, item.jGizi, item.jKamaroperasiIBS, item.jKeperawatan,
        //   item.jOksigen, item.jTindakanperawat, item.jTindakandokter, item.JIrdtindakan, item.jPenunjangkeluar)

        item.pendapatanBPJS = item.pendapatanallbpjs ? (item.pendapatanallbpjs.length ? item.pendapatanallbpjs.map(p => p.subtotal).reduce((a, b) => a + b, 0) : 0) : 0
        item.groupingRanap = item.groupingranap ? (item.groupingranap.length ? item.groupingranap.map(p => p.subtotal).reduce((a, b) => a + b, 0) : 0) : 0
        item.selisih = (item.pendapatanBPJS + item.groupingRanap) - item.subtotal
        item.dokterdpjp = item.klaimrajal?.nama_dokter ?? item.klaimranap?.nama_dokter ?? '-'
        item.sep = item.pendapatanallbpjs ? (item.pendapatanallbpjs.length ? item.pendapatanallbpjs[0].nosep : '-') : (item.groupingranap ? (item.groupingranap.length ? item.groupingranap[0].nosep : '-') : '-')
      })
      console.log('selesai')
    },
    // get data api
    getDataTable() {
      this.setColumns()
      this.items = []
      this.loading = true
      const param = { params: this.params }
      return new Promise(resolve => {
        api.get('v1/simrs/laporan/keuangan/laporanallbillrajal', param)
          .then(resp => {
            this.loading = false
            console.log('laporan ', resp.data)
            if (!resp.data.length || ((typeof resp.data) !== 'object')) {
              notifErrVue('Mohon maaf, data yang diterima belum valid')
            } else {
              this.items = resp.data
              if (this.items.length) {
                this.mapDataItems()
              }
            }
            resolve(resp.data)
          })
          .catch(() => { this.loading = false })
      })
    }
  }
})
