import { defineStore } from 'pinia'
import { date } from 'quasar'
import { api } from 'src/boot/axios'
import { filterDuplicateArrays, notifErrVue } from 'src/modules/utils'

export const useLaporanRekapBillByRuanganStore = defineStore('laporan-rekapbill-by-ruangan', {
  state: () => ({
    loading: false,
    items: [],
    meta: {},
    ranap: [],
    rajal: [],
    tigapuluhtarif: [],
    igd: 'POL014',
    tanggal: {
      from: date.formatDate(Date.now(), 'DD MMMM YYYY'),
      to: date.formatDate(Date.now(), 'DD MMMM YYYY')
      // from: date.formatDate('01-01-2023', 'DD MMMM YYYY'),
      // to: date.formatDate('01-05-2023', 'DD MMMM YYYY')
    },
    params: {
      tgldari: date.formatDate(Date.now(), 'YYYY-MM-DD'),
      tglsampai: date.formatDate(Date.now(), 'YYYY-MM-DD'),
      layanan: ''
      // ruangan: ''
    },
    ruangan: {
      koderuangan: null
    },
    kolom: [],
    kolomhide: []
  }),
  actions: {
    async getRuanganPoli () {
      this.loading = true
      await api.get('v1/simrs/master/listmasterpoli')
        .then((resp) => {
          this.loading = false
          if (resp.status === 200) {
            this.rajal = resp?.data
          }
        })
        .catch((err) => {
          console.log(err)
          this.loading = false
        })
    },
    async getTigaPuluhTarif () {
      this.loading = true
      await api.get('v1/simrs/master/gettigapuluhtarif')
        .then((resp) => {
          this.loading = false
          if (resp.status === 200) {
            this.tigapuluhtarif = resp?.data
          }
        })
        .catch((err) => {
          console.log(err)
          this.loading = false
        })
    },
    async getRuanganRanap () {
      this.loading = true
      await api.get('v1/simrs/master/mruanganranap')
        .then((resp) => {
          this.loading = false
          if (resp.status === 200) {
            this.ranap = resp?.data
          }
        })
        .catch((err) => {
          console.log(err)
          this.loading = false
        })
    },
    initAmbilData () {
      if (this.params.tgldari > this.params.tglsampai) {
        return notifErrVue('Tanggal Dari Tidak Boleh Lebih Besar Dari Tanggal Sampai...!!!')
      }
      else {
        if (this.params.layanan === '1') {
          this.items = []
          this.kolom = []
          this.getambildatasemuarajal()
        }
        else {
          this.items = []
          this.kolom = []
          // this.getAmbilData()
          this.getambildatasemuaranap()
        }
      }
    },
    async getambildatasemuarajal () {
      this.loading = true
      this.kolom = ['NamaRuangan', 'Admin', 'KonsulAntarPoli', 'TindakanDokter', 'TindakanKeperawatan', 'Total']
      const params = { params: this.params }
      await api.get('v1/simrs/laporan/keuangan/allBillRekapByRuanganperPoli', params)
        .then((resp) => {
          if (resp.status === 200) {
            const datahasil = resp?.data
            this.sethasilpoli(datahasil)
          }
        })
        .catch((err) => {
          console.log(err)
          this.loading = false
        })
    },
    async getambildatasemuaranap () {
      this.loading = true
      this.kolom = ['NamaRuangan', 'Admin', 'AkomodasiKamar', 'TindakanDokter', 'TindakanKeperawatan',
        'Askep', 'Visite', 'Total']
      const params = { params: this.params }
      await api.get('v1/simrs/laporan/keuangan/allBillRekapByRuanganperruangan', params)
        .then((resp) => {
          if (resp.status === 200) {
            const datahasil = resp?.data
            this.sethasilx(datahasil)
          }
        })
        .catch((err) => {
          console.log(err)
          this.loading = false
        })
    },
    // async getAmbilData () {
    //   this.loading = true
    //   this.kolom = ['Identitas', 'Admin', 'AkomodasiKamar', 'BiayaMatrei', 'TindakanDokter', 'Visite', 'TindakanKeperawatan',
    //     'MakanPasien', 'AsuhanGizi', 'Oksigen', 'Keperawatan', 'Laborat', 'Radiologi', 'Endoscopy', 'KamarOperasiIbs',
    //     'TindakanOperasi', 'TindakanOperasiIgd', 'TindakanFisioterapi',
    //     'Sedasi', 'TindakanCardio', 'TindakanEeg', 'PsikologtransUmum', 'Bdrs', 'Penunjangkeluar', 'Farmasi', 'Ambulan', 'Total']
    //   const params = { params: this.params }
    //   await api.get('v1/simrs/laporan/keuangan/allBillRekapByRuangan', params)
    //     .then((resp) => {
    //       if (resp.status === 200) {
    //         const datahasil = resp?.data
    //         this.sethasil(datahasil)
    //       }
    //     })
    //     .catch((err) => {
    //       console.log(err)
    //       this.loading = false
    //     })
    // },
    // async getAmbilDataperruangan () {
    //   this.loading = true
    //   this.kolom = ['Identitas', 'Admin', 'AkomodasiKamar', 'BiayaMatrei', 'TindakanDokter', 'Visite', 'TindakanKeperawatan',
    //     'MakanPasien', 'AsuhanGizi', 'Oksigen', 'Keperawatan', 'Laborat', 'Radiologi', 'Endoscopy', 'KamarOperasiIbs',
    //     'TindakanOperasi', 'TindakanOperasiIgd', 'TindakanFisioterapi',
    //     'Sedasi', 'TindakanCardio', 'TindakanEeg', 'PsikologtransUmum', 'Bdrs', 'Penunjangkeluar', 'Farmasi', 'Ambulan', 'Total']
    //   const params = { params: this.params }
    //   await api.get('v1/simrs/laporan/keuangan/allBillRekapByRuanganperruangan', params)
    //     .then((resp) => {
    //       if (resp.status === 200) {
    //         const datahasil = resp?.data
    //         this.sethasilperruangan(datahasil)
    //       }
    //     })
    //     .catch((err) => {
    //       console.log(err)
    //       this.loading = false
    //     })
    // },
    // sethasil (val) {
    //   // console.log('sasa', val)
    //   val?.forEach(xxx => {
    //     xxx.Admin = []
    //     // eslint-disable-next-line no-unused-vars
    //     const kelas = xxx?.rstigalimax[0]?.rs17
    //     const modaltarif = this.tigapuluhtarif?.find(x => x.rs3 === 'A1#')
    //     const namaRuangan = this.ranap.find(kd => kd.rs4 === xxx?.rstigalimax[0]?.rs16)
    //     let subtotalx = 0
    //     if (kelas === '3') {
    //       subtotalx = parseInt(modaltarif?.rs6) + parseInt(modaltarif?.rs7)
    //     }
    //     else if (kelas === '2') {
    //       subtotalx = parseInt(modaltarif?.rs8) + parseInt(modaltarif?.rs9)
    //     }
    //     else if (kelas === '1' || kelas === 'IC' || kelas === 'ICC' || kelas === 'NICU' || kelas === 'IN') {
    //       subtotalx = parseInt(modaltarif?.rs10) + parseInt(modaltarif?.rs11)
    //     }
    //     else if (kelas === 'Utama') {
    //       subtotalx = parseInt(modaltarif?.rs10) + parseInt(modaltarif?.rs11)
    //     }
    //     else if (kelas === 'VIP') {
    //       subtotalx = parseInt(modaltarif?.rs10) + parseInt(modaltarif?.rs11)
    //     }
    //     else if (kelas === 'VVIP') {
    //       subtotalx = parseInt(modaltarif?.rs10) + parseInt(modaltarif?.rs11)
    //     }
    //     const adminsx = {
    //       namaruangan: namaRuangan?.rs5 ?? '-',
    //       subtotal: subtotalx
    //     }
    //     xxx.Admin.push(adminsx)

    //     // if (kelas === '3') {
    //     //   const admins = {
    //     //     namaruangan: namaRuangan?.rs5 ?? '-',
    //     //     subtotal: 'wew'
    //     //   }
    //     //   xxx.Admin.push(admins)
    //     // }

    //     xxx.akomodasiKamar = []
    //     // const kamars = Object.groupBy(xxx?.akomodasikamar, (m) => m.rs16)
    //     const kamars = filterDuplicateArrays(xxx?.akomodasikamar?.map(m => m?.rs16))
    //     if (kamars?.length) {
    //       kamars.sort()
    //       kamars.forEach(f => {
    //         const temp = xxx?.akomodasikamar?.filter(m => m.rs16 === f)?.reduce((x, y) => parseFloat(x) + parseFloat(y.subtotal), 0)
    //         const namaRuangan = this.ranap.find(kd => kd.rs4 === f)
    //         const kmr = {
    //           kamar: f,
    //           namaruangan: namaRuangan?.rs5 ?? '-',
    //           subtotal: temp
    //         }
    //         xxx.akomodasiKamar.push(kmr)
    //       })
    //     }

    //     xxx.Biayamaterai = {
    //       subtotal: xxx?.biayamaterai[0]?.subtotal ?? 0
    //     }

    //     xxx.TindakanDokter = []
    //     const tindakandokters = filterDuplicateArrays(xxx?.tindakandokter?.map(m => m?.rs22))
    //     if (tindakandokters?.length) {
    //       tindakandokters.sort()
    //       tindakandokters.forEach(f => {
    //         const temp = xxx?.tindakandokter?.filter(m => m.rs22 === f)?.reduce((x, y) => parseFloat(x) + parseFloat(y.subtotal), 0)
    //         const namaRuangan = this.ranap.find(kd => kd.rs4 === f)
    //         const tnddktr = {
    //           kamar: f,
    //           namaruangan: namaRuangan?.rs5 ?? '-',
    //           subtotal: temp
    //         }
    //         xxx.TindakanDokter.push(tnddktr)
    //       })
    //     }

    //     xxx.TindakanPerawat = []
    //     const tindakanperawats = filterDuplicateArrays(xxx?.tindakanperawat?.map(m => m?.rs22))
    //     if (tindakanperawats?.length) {
    //       tindakanperawats.sort()
    //       tindakanperawats.forEach(f => {
    //         const temp = xxx?.tindakanperawat?.filter(m => m.rs22 === f)?.reduce((x, y) => parseFloat(x) + parseFloat(y.subtotal), 0)
    //         const namaRuangan = this.ranap.find(kd => kd.rs4 === f)
    //         const tndprwt = {
    //           kamar: f,
    //           namaruangan: namaRuangan?.rs5 ?? '-',
    //           subtotal: temp
    //         }
    //         xxx.TindakanPerawat.push(tndprwt)
    //       })
    //     }

    //     xxx.Visite = []
    //     const visites = filterDuplicateArrays(xxx?.visiteumum?.map(m => m?.rs8))
    //     if (visites?.length) {
    //       visites.sort()
    //       visites.forEach(f => {
    //         const temp = xxx?.visiteumum?.filter(m => m.rs8 === f)?.reduce((x, y) => parseFloat(x) + parseFloat(y.subtotal), 0)
    //         const namaRuangan = this.ranap.find(kd => kd.rs4 === f)
    //         const visiteum = {
    //           kamar: f,
    //           namaruangan: namaRuangan?.rs5 ?? '-',
    //           subtotal: temp
    //         }
    //         xxx.Visite.push(visiteum)
    //       })
    //     }

    //     xxx.MakanPasien = []
    //     const makans = filterDuplicateArrays(xxx?.makanpasien?.map(m => m?.rs8))
    //     if (makans?.length) {
    //       makans.sort()
    //       makans.forEach(f => {
    //         const temp = xxx?.makanpasien?.filter(m => m.rs8 === f)?.reduce((x, y) => parseFloat(x) + parseFloat(y.subtotal), 0)
    //         const namaRuangan = this.ranap.find(kd => kd.rs4 === f)
    //         const makanpas = {
    //           kamar: f,
    //           namaruangan: namaRuangan?.rs5 ?? '-',
    //           subtotal: temp
    //         }
    //         xxx.MakanPasien.push(makanpas)
    //       })
    //     }

    //     xxx.Oksigen = []
    //     const oksigens = filterDuplicateArrays(xxx?.oksigen?.map(m => m?.rs8))
    //     if (oksigens?.length) {
    //       oksigens.sort()
    //       oksigens.forEach(f => {
    //         const temp = xxx?.oksigen?.filter(m => m.rs8 === f)?.reduce((x, y) => parseFloat(x) + parseFloat(y.subtotal), 0)
    //         const namaRuangan = this.ranap.find(kd => kd.rs4 === f)
    //         const woksigen = {
    //           kamar: f,
    //           namaruangan: namaRuangan?.rs5 ?? '-',
    //           subtotal: temp
    //         }
    //         xxx.Oksigen.push(woksigen)
    //       })
    //     }

    //     xxx.Keperawatan = []
    //     const kepers = filterDuplicateArrays(xxx?.keperawatan?.map(m => m?.rs8))
    //     if (kepers?.length) {
    //       kepers.sort()
    //       kepers.forEach(f => {
    //         const temp = xxx?.keperawatan?.filter(m => m.rs8 === f)?.reduce((x, y) => parseFloat(x) + parseFloat(y.subtotal), 0)
    //         const namaRuangan = this.ranap.find(kd => kd.rs4 === f)
    //         const keperawatanx = {
    //           kamar: f,
    //           namaruangan: namaRuangan?.rs5 ?? '-',
    //           subtotal: temp
    //         }
    //         xxx.Keperawatan.push(keperawatanx)
    //       })
    //     }

    //     xxx.Laborat = []
    //     const laboratpaket = xxx?.laborat
    //     const laboratasnonpaket = xxx?.laboratnonpaket
    //     const laboratall = laboratpaket.concat(laboratasnonpaket)
    //     const laboratss = filterDuplicateArrays(laboratall?.map(m => m?.ruangan))
    //     // console.log('wew', laboratss)
    //     //  const laborats = filterDuplicateArrays(xxx?.laborat?.map(m => m?.ruangan))
    //     if (laboratss?.length) {
    //       laboratss.sort()
    //       laboratss.forEach(f => {
    //         const temp = laboratall?.filter(m => m.ruangan === f)?.reduce((x, y) => parseFloat(x) + parseFloat(y.subtotalx), 0)
    //         const namaRuangan = this.ranap.find(kd => kd.rs4 === f)
    //         const laboratssss = {
    //           kamar: f,
    //           namaruangan: namaRuangan?.rs5 ?? '-',
    //           subtotal: temp
    //         }
    //         xxx.Laborat.push(laboratssss)
    //       })
    //     }

    //     xxx.Radiologi = []
    //     const radiologis = filterDuplicateArrays(xxx?.transradiologi.map(m => m?.rs26))
    //     if (radiologis?.length) {
    //       radiologis.sort()
    //       radiologis.forEach(i => {
    //         const temp = xxx.transradiologi?.filter(x => x.rs26 === i)?.reduce((x, y) => parseFloat(x) + parseFloat(y.subtotal), 0)
    //         const namaRuangan = this.ranap.find(kd => kd.rs4 === i)
    //         const radiosx = {
    //           kamar: i,
    //           namaruangan: namaRuangan?.rs5 ?? '-',
    //           subtotal: temp
    //         }
    //         xxx.Radiologi.push(radiosx)
    //       })
    //     }

    //     xxx.Endoscopy = []
    //     const endoscopys = filterDuplicateArrays(xxx?.tindakanendoscopy.map(m => m?.rs4))
    //     if (endoscopys?.length) {
    //       endoscopys.sort()
    //       endoscopys.forEach(i => {
    //         const temp = xxx.tindakanendoscopy?.filter(x => x.rs4 === i)?.reduce((x, y) => parseFloat(x) + parseFloat(y.subtotal), 0)
    //         const namaRuangan = this.ranap.find(kd => kd.rs4 === i)
    //         const endoscopysx = {
    //           kamar: i,
    //           namaruangan: namaRuangan?.rs5 ?? '-',
    //           subtotal: temp
    //         }
    //         xxx.Endoscopy.push(endoscopysx)
    //       })
    //     }

    //     xxx.Kamaroperasiibs = []
    //     const kamaroperasiibss = filterDuplicateArrays(xxx?.kamaroperasiibs.map(m => m?.rs15))
    //     if (kamaroperasiibss?.length) {
    //       kamaroperasiibss.sort()
    //       kamaroperasiibss.forEach(i => {
    //         const temp = xxx.kamaroperasiibs?.filter(x => x.rs15 === i)?.reduce((x, y) => parseFloat(x) + parseFloat(y.subtotal), 0)
    //         const namaRuangan = this.ranap.find(kd => kd.rs4 === i)
    //         const kamaroperasiibssx = {
    //           kamar: i,
    //           namaruangan: namaRuangan?.rs5 ?? '-',
    //           subtotal: temp ?? 0
    //         }
    //         xxx.Kamaroperasiibs.push(kamaroperasiibssx)
    //       })
    //     }

    //     // xxx.Kamaroperasiigd = []
    //     // const kamaroperasiigds = filterDuplicateArrays(xxx?.kamaroperasiigd.map(m => m?.rs15))
    //     // if (kamaroperasiigds?.length) {
    //     //   kamaroperasiigds.sort()
    //     //   kamaroperasiigds.forEach(i => {
    //     //     const temp = xxx.kamaroperasiigd?.filter(x => x.rs15 === i)?.reduce((x, y) => parseFloat(x) + parseFloat(y.subtotal), 0)
    //     //     const namaRuangan = this.ranap.find(kd => kd.rs4 === i)
    //     //     const kamaroperasiigdsx = {
    //     //       kamar: i,
    //     //       namaruangan: namaRuangan?.rs5 ?? '-',
    //     //       subtotal: parseInt(temp) ?? parseInt(0)
    //     //     }
    //     //     xxx.Kamaroperasiigd.push(kamaroperasiigdsx)
    //     //   })
    //     // }

    //     xxx.Tindakanoperasi = []
    //     const tindakanoperasis = filterDuplicateArrays(xxx?.tindakanoperasi.map(m => m?.ruang))
    //     if (tindakanoperasis?.length) {
    //       tindakanoperasis.sort()
    //       tindakanoperasis.forEach(i => {
    //         const temp = xxx.tindakanoperasi?.filter(x => x.ruang === i)?.reduce((x, y) => parseFloat(x) + parseFloat(y.subtotal), 0)
    //         const namaRuangan = this.ranap.find(kd => kd.rs4 === i)
    //         const tindakanoperasisx = {
    //           kamar: i,
    //           namaruangan: namaRuangan?.rs5 ?? '-',
    //           subtotal: temp ?? 0
    //         }
    //         xxx.Tindakanoperasi.push(tindakanoperasisx)
    //       })
    //     }

    //     xxx.TindakanOperasiIgd = []
    //     const tindakanoperasiigds = filterDuplicateArrays(xxx?.tindakanoperasiigd.map(m => m?.rs4))
    //     if (tindakanoperasiigds?.length) {
    //       tindakanoperasiigds.sort()
    //       tindakanoperasiigds.forEach(i => {
    //         const temp = xxx.tindakanoperasiigd?.filter(x => x.rs4 === i)?.reduce((x, y) => parseFloat(x) + parseFloat(y.subtotal), 0)
    //         const namaRuangan = this.ranap.find(kd => kd.rs4 === i)
    //         const tindakanoperasiigdsx = {
    //           kamar: i,
    //           namaruangan: namaRuangan?.rs5 ?? '-',
    //           subtotal: temp
    //         }
    //         xxx.TindakanOperasiIgd.push(tindakanoperasiigdsx)
    //       })
    //     }

    //     xxx.TindakanFisioterapi = []
    //     const tindakanfisioterapis = filterDuplicateArrays(xxx?.tindakanfisioterapi.map(m => m?.rs4))
    //     if (tindakanfisioterapis?.length) {
    //       tindakanfisioterapis.sort()
    //       tindakanfisioterapis.forEach(i => {
    //         const temp = xxx.tindakanfisioterapi?.filter(x => x.rs4 === i)?.reduce((x, y) => parseFloat(x) + parseFloat(y.subtotal), 0)
    //         const namaRuangan = this.ranap.find(kd => kd.rs4 === i)
    //         const tindakanfisioterapisx = {
    //           kamar: i,
    //           namaruangan: namaRuangan?.rs5 ?? '-',
    //           subtotal: temp
    //         }
    //         xxx.TindakanFisioterapi.push(tindakanfisioterapisx)
    //       })
    //     }

    //     xxx.TindakananastesidiLuarOkdanIcu = []
    //     const tindakananastesidiluarokdanicus = filterDuplicateArrays(xxx?.tindakananastesidiluarokdanicu.map(m => m?.rs4))
    //     if (tindakananastesidiluarokdanicus?.length) {
    //       tindakananastesidiluarokdanicus.sort()
    //       tindakananastesidiluarokdanicus.forEach(i => {
    //         const temp = xxx.tindakananastesidiluarokdanicu?.filter(x => x.rs4 === i)?.reduce((x, y) => parseFloat(x) + parseFloat(y.subtotal), 0)
    //         const namaRuangan = this.ranap.find(kd => kd.rs4 === i)
    //         const tindakananastesidiluarokdanicusx = {
    //           kamar: i,
    //           namaruangan: namaRuangan?.rs5 ?? '-',
    //           subtotal: temp
    //         }
    //         xxx.TindakanFisioterapi.push(tindakananastesidiluarokdanicusx)
    //       })
    //     }

    //     xxx.TindakanCardio = []
    //     const tindakancardios = filterDuplicateArrays(xxx?.tindakancardio.map(m => m?.rs4))
    //     if (tindakancardios?.length) {
    //       tindakancardios.sort()
    //       tindakancardios.forEach(i => {
    //         const temp = xxx.tindakancardio?.filter(x => x.rs4 === i)?.reduce((x, y) => parseFloat(x) + parseFloat(y.subtotal), 0)
    //         const namaRuangan = this.ranap.find(kd => kd.rs4 === i)
    //         const tindakancardiosx = {
    //           kamar: i,
    //           namaruangan: namaRuangan?.rs5 ?? '-',
    //           subtotal: temp
    //         }
    //         xxx.TindakanCardio.push(tindakancardiosx)
    //       })
    //     }

    //     xxx.TindakanEeg = []
    //     const tindakaneegs = filterDuplicateArrays(xxx?.tindakaneeg.map(m => m?.rs4))
    //     if (tindakaneegs?.length) {
    //       tindakaneegs.sort()
    //       tindakaneegs.forEach(i => {
    //         const temp = xxx.tindakaneeg?.filter(x => x.rs4 === i)?.reduce((x, y) => parseFloat(x) + parseFloat(y.subtotal), 0)
    //         const namaRuangan = this.ranap.find(kd => kd.rs4 === i)
    //         const tindakaneegsx = {
    //           kamar: i,
    //           namaruangan: namaRuangan?.rs5 ?? '-',
    //           subtotal: temp
    //         }
    //         xxx.TindakanEeg.push(tindakaneegsx)
    //       })
    //     }

    //     xxx.PsikologtransUmum = []
    //     const psikologtransumums = filterDuplicateArrays(xxx?.psikologtransumum.map(m => m?.rs4))
    //     if (psikologtransumums?.length) {
    //       psikologtransumums.sort()
    //       psikologtransumums.forEach(i => {
    //         const temp = xxx.psikologtransumum?.filter(x => x.rs4 === i)?.reduce((x, y) => parseFloat(x) + parseFloat(y.subtotal), 0)
    //         const namaRuangan = this.ranap.find(kd => kd.rs4 === i)
    //         const psikologtransumumsx = {
    //           kamar: i,
    //           namaruangan: namaRuangan?.rs5 ?? '-',
    //           subtotal: temp
    //         }
    //         xxx.PsikologtransUmum.push(psikologtransumumsx)
    //       })
    //     }

    //     xxx.Bdrs = []
    //     const bdrss = filterDuplicateArrays(xxx?.bdrs.map(m => m?.rs14))
    //     if (bdrss?.length) {
    //       bdrss.sort()
    //       bdrss.forEach(i => {
    //         const temp = xxx.bdrs?.filter(x => x.rs14 === i)?.reduce((x, y) => parseFloat(x) + parseFloat(y.subtotal), 0)
    //         const namaRuangan = this.ranap.find(kd => kd.rs4 === i)
    //         const bdrssx = {
    //           kamar: i,
    //           namaruangan: namaRuangan?.rs5 ?? '-',
    //           subtotal: temp
    //         }
    //         xxx.Bdrs.push(bdrssx)
    //       })
    //     }

    //     xxx.Penunjangkeluar = []
    //     const penunjangkeluars = filterDuplicateArrays(xxx?.penunjangkeluar.map(m => m?.ruangan))
    //     if (penunjangkeluars?.length) {
    //       penunjangkeluars.sort()
    //       penunjangkeluars.forEach(i => {
    //         const temp = xxx.penunjangkeluar?.filter(x => x.ruangan === i)?.reduce((x, y) => parseFloat(x) + parseFloat(y.subtotal), 0)
    //         const namaRuangan = this.ranap.find(kd => kd.rs4 === i)
    //         const penunjangkeluarsx = {
    //           kamar: i,
    //           namaruangan: namaRuangan?.rs5 ?? '-',
    //           subtotal: temp
    //         }
    //         xxx.Penunjangkeluar.push(penunjangkeluarsx)
    //       })
    //     }

    //     xxx.Farmasi = []
    //     const farmasilamanonracikan = xxx?.apotekranaplalu
    //     const farmasilamaracikan = xxx?.apotekranapracikanhederlalux
    //     const farmasilamanonracikannew = xxx?.newfarmasi
    //     const farmasiracikannew = xxx?.newfarmasiracikan
    //     const farmasilama = farmasilamanonracikan.concat(farmasilamaracikan, farmasilamanonracikannew, farmasiracikannew)
    //     const farmasilamass = filterDuplicateArrays(farmasilama?.map(m => m?.ruangan))

    //     if (farmasilamass?.length) {
    //       farmasilamass.sort()
    //       farmasilamass.forEach(i => {
    //         const temp = farmasilama?.filter(x => x.ruangan === i)?.reduce((x, y) => parseFloat(x) + parseFloat(y.subtotalx), 0)
    //         const namaRuangan = this.ranap.find(kd => kd.rs4 === i)
    //         const farmasilamax = {
    //           kamar: i,
    //           namaruangan: namaRuangan?.rs5 ?? '-',
    //           subtotal: isNaN(temp) ? '' : temp
    //         }
    //         xxx.Farmasi.push(farmasilamax)
    //       })
    //     }

    //     xxx.Ambulan = []
    //     const ambulans = filterDuplicateArrays(xxx.ambulan?.map(m => m?.ruangan))

    //     if (ambulans?.length) {
    //       ambulans.sort()
    //       ambulans.forEach(i => {
    //         const temp = xxx.ambulan?.filter(x => x.ruangan === i)?.reduce((x, y) => parseFloat(x) + parseFloat(y.subtotal), 0)
    //         const namaRuangan = this.ranap.find(kd => kd.rs4 === i)
    //         const ambulansx = {
    //           kamar: i,
    //           namaruangan: namaRuangan?.rs5 ?? '-',
    //           subtotal: isNaN(temp) ? '' : temp
    //         }
    //         xxx.Ambulan.push(ambulansx)
    //       })
    //     }

    //     xxx.AsuhanGizi = []
    //     const asuhangizis = filterDuplicateArrays(xxx.asuhangizi?.map(m => m?.ruangan))

    //     if (asuhangizis?.length) {
    //       asuhangizis.sort()
    //       asuhangizis.forEach(i => {
    //         const temp = xxx.asuhangizi?.filter(x => x.ruangan === i)?.reduce((x, y) => parseFloat(x) + parseFloat(y.subtotal), 0)
    //         const namaRuangan = this.ranap.find(kd => kd.rs4 === i)
    //         const asuhangizisx = {
    //           kamar: i,
    //           namaruangan: namaRuangan?.rs5 ?? '-',
    //           subtotal: isNaN(temp) ? '' : temp
    //         }
    //         xxx.AsuhanGizi.push(asuhangizisx)
    //       })
    //     }

    //     xxx.TotalAll = []
    //     const subtotalall = xxx.Farmasi.concat(xxx.Admin, xxx.akomodasiKamar, xxx.Biayamaterai, xxx.TindakanDokter,
    //       xxx.Visite, xxx.TindakanPerawat,
    //       xxx.MakanPasien, xxx.Oksigen, xxx.Keperawatan, xxx.Laborat, xxx.Radiologi, xxx.Endoscopy, xxx.Kamaroperasiibs,
    //       xxx.Tindakanoperasi, xxx.TindakanOperasiIgd, xxx.TindakanFisioterapi,
    //       xxx.TindakananastesidiLuarOkdanIcu, xxx.Ambulan, xxx.AsuhanGizi
    //     )
    //     const totalallx = subtotalall.reduce((x, y) => parseFloat(x) + parseFloat(y.subtotal), 0)
    //     const totalall = {
    //       subtotal: totalallx
    //     }
    //     xxx.TotalAll.push(totalall)
    //     console.log('sasa', xxx.TindakanOperasi)
    //   })

    //   this.items = val
    //   this.loading = false
    //   console.log('wew', val)
    // },
    sethasilx (val) {
      const koderuang = filterDuplicateArrays(val.map(m => m.rs4))

      koderuang?.forEach(wew => {
        const ruangannya = val.filter(f => f.rs4 === wew)
        const AkomodasiKamar = []
        const TindakanDokter = []
        const TindakanKeperawatan = []
        const Askep = []
        const Visite = []
        ruangannya?.forEach(sa => {
          sa.Admin = 0
          sa?.kunjunganranap?.forEach(kunj => {
            const kelas = kunj?.kelas
            const modaltarif = this.tigapuluhtarif?.find(x => x.rs3 === 'A1#')
            console.log('fee', kelas)
            let subtotalx = 0
            if (kelas === '3') {
              subtotalx = parseInt(modaltarif?.rs6) + parseInt(modaltarif?.rs7)
            }
            else if (kelas === '2') {
              subtotalx = parseInt(modaltarif?.rs8) + parseInt(modaltarif?.rs9)
            }
            else if (kelas === '1' || kelas === 'IC' || kelas === 'ICC' || kelas === 'NICU' || kelas === 'IN') {
              subtotalx = parseInt(modaltarif?.rs10) + parseInt(modaltarif?.rs11)
            }
            else if (kelas === 'Utama') {
              subtotalx = parseInt(modaltarif?.rs12) + parseInt(modaltarif?.rs13)
            }
            else if (kelas === 'VIP') {
              subtotalx = parseInt(modaltarif?.rs14) + parseInt(modaltarif?.rs15)
            }
            else if (kelas === 'VVIP') {
              subtotalx = parseInt(modaltarif?.rs16) + parseInt(modaltarif?.rs17)
            }
            if (parseFloat(subtotalx) > 0)sa.Admin = parseFloat(sa.Admin) + parseFloat(subtotalx)
          })

          sa?.akomodasikamar?.forEach(akom => {
            if (akom) AkomodasiKamar.push(akom)
          })

          sa?.tindakandokter?.forEach(td => {
            if (td) TindakanDokter.push(td)
          })

          sa?.tindakanperawat?.forEach(tp => {
            if (tp) TindakanKeperawatan.push(tp)
          })

          sa?.keperawatan?.forEach(askep => {
            if (askep) Askep.push(askep)
          })

          sa?.visiteumum?.forEach(visit => {
            if (visit) Visite.push(visit)
          })
          // console.log('fee', sa)
        })

        const kete = {
          namaruangan: val.find(g => g.rs4 === wew).rs5,
          Admin: ruangannya.reduce((a, b) => parseFloat(a) + parseFloat(b?.Admin), 0),
          AkomodasiKamar: AkomodasiKamar.reduce((a, b) => parseFloat(a) + parseFloat(b?.subtotal), 0),
          TindakanDokter: TindakanDokter.reduce((a, b) => parseFloat(a) + parseFloat(b?.subtotal), 0),
          TindakanKeperawatan: TindakanKeperawatan.reduce((a, b) => parseFloat(a) + parseFloat(b?.subtotal), 0),
          Askep: Askep.reduce((a, b) => parseFloat(a) + parseFloat(b?.subtotal), 0),
          Visite: Visite.reduce((a, b) => parseFloat(a) + parseFloat(b?.subtotal), 0),
          Total: ruangannya.reduce((a, b) => parseFloat(a) + parseFloat(b?.Admin), 0) +
                 AkomodasiKamar.reduce((a, b) => parseFloat(a) + parseFloat(b?.subtotal), 0) +
                 TindakanDokter.reduce((a, b) => parseFloat(a) + parseFloat(b?.subtotal), 0) +
                 TindakanKeperawatan.reduce((a, b) => parseFloat(a) + parseFloat(b?.subtotal), 0) +
                 Askep.reduce((a, b) => parseFloat(a) + parseFloat(b?.subtotal), 0) +
                 Visite.reduce((a, b) => parseFloat(a) + parseFloat(b?.subtotal), 0)
        }

        this.items.push(kete)
        this.loading = false
      })
    },
    sethasilpoli (val) {
      const kodepoli = filterDuplicateArrays(val.map(m => m.kodepoli))
      kodepoli.sort()
      kodepoli?.forEach(pol => {
        const poli = val.filter(f => f.kodepoli === pol)
        const TindakanDokter = []
        let Admin = 0
        let KonsulAntarPoli = 0
        const TindakanKeperawatan = []
        poli?.forEach(xxx => {
          if (xxx?.adminpoli?.subtotal > 0)Admin = parseFloat(Admin) + parseFloat(xxx?.adminpoli?.subtotal)
          if (xxx?.konsulantarpoli?.subtotal > 0)KonsulAntarPoli = parseFloat(KonsulAntarPoli) + parseFloat(xxx?.konsulantarpoli?.subtotal)

          xxx?.tindakandokter?.forEach(td => {
            if (td) TindakanDokter.push(td)
          })

          xxx?.tindakanperawat?.forEach(tp => {
            if (tp) TindakanKeperawatan.push(tp)
          })
        })

        const tampilpoli = {
          namaruangan: val.find(g => g.kodepoli === pol).rs2,
          Admin,
          KonsulAntarPoli,
          TindakanDokter: TindakanDokter.reduce((a, b) => parseFloat(a) + parseFloat(b?.subtotal), 0),
          TindakanKeperawatan: TindakanKeperawatan.reduce((a, b) => parseFloat(a) + parseFloat(b?.subtotal), 0),
          Total: Admin + KonsulAntarPoli +
                TindakanDokter.reduce((a, b) => parseFloat(a) + parseFloat(b?.subtotal), 0) +
                 TindakanKeperawatan.reduce((a, b) => parseFloat(a) + parseFloat(b?.subtotal), 0)
        }

        this.items.push(tampilpoli)
        this.loading = false
      })
    }

  }
})
