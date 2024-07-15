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
      layanan: '',
      ruangan: ''
    },
    ruangan: {
      koderuangan: null
    },
    kolom: ['Identitas', 'Admin', 'AkomodasiKamar', 'TindakanDokter', 'Visite', 'TindakanKeperawatan',
      'MakanPasien', 'Oksigen', 'Keperawatan', 'Laborat', 'Radiologi', 'Endoscopy', 'KamarOperasiIbs',
      'KamarOperasiIgd', 'TindakanOperasi', 'TindakanOperasiIgd', 'TindakanOperasiIgd', 'TindakanFisioterapi',
      'Sedasi', 'TindakanCardio', 'TindakanEeg', 'PsikologtransUmum', 'Bdrs', 'Penunjangkeluar', 'Farmasi'],
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
        return notifErrVue('Tanggal Dari Lebih Besar Dari Tanggal Sampai')
      }
      else {
        this.getAmbilData()
      }
    },
    async getAmbilData () {
      this.loading = true
      const params = { params: this.params }
      await api.get('v1/simrs/laporan/keuangan/allBillRekapByRuangan', params)
        .then((resp) => {
          this.loading = false
          if (resp.status === 200) {
            const datahasil = resp?.data
            this.sethasil(datahasil)
          }
        })
        .catch((err) => {
          console.log(err)
          this.loading = false
        })
    },
    sethasil (val) {
      console.log('sasa', val)
      val?.forEach(xxx => {
        xxx.admin = xxx?.rstigalimax[0]?.subtotal ?? 0
        xxx.akomodasiKamar = []
        // const kamars = Object.groupBy(xxx?.akomodasikamar, (m) => m.rs16)
        const kamars = filterDuplicateArrays(xxx?.akomodasikamar?.map(m => m?.rs16))
        if (kamars?.length) {
          kamars.sort()
          kamars.forEach(f => {
            const temp = xxx?.akomodasikamar?.filter(m => m.rs16 === f)?.reduce((x, y) => parseFloat(x) + parseFloat(y.subtotal), 0)
            const namaRuangan = this.ranap.find(kd => kd.rs4 === f)
            const kmr = {
              kamar: f,
              namaruangan: namaRuangan?.rs5 ?? '-',
              subtotal: temp
            }
            xxx.akomodasiKamar.push(kmr)
          })
        }

        xxx.biayamaterai = xxx?.biayamaterai[0]?.subtotal ?? 0
        xxx.TindakanDokter = []
        const tindakandokters = filterDuplicateArrays(xxx?.tindakandokter?.map(m => m?.rs22))
        if (tindakandokters?.length) {
          tindakandokters.sort()
          tindakandokters.forEach(f => {
            const temp = xxx?.tindakandokter?.filter(m => m.rs22 === f)?.reduce((x, y) => parseFloat(x) + parseFloat(y.subtotal), 0)
            const namaRuangan = this.ranap.find(kd => kd.rs4 === f)
            const tnddktr = {
              kamar: f,
              namaruangan: namaRuangan?.rs5 ?? '-',
              subtotal: temp
            }
            xxx.TindakanDokter.push(tnddktr)
          })
        }

        xxx.TindakanPerawat = []
        const tindakanperawats = filterDuplicateArrays(xxx?.tindakanperawat?.map(m => m?.rs22))
        if (tindakanperawats?.length) {
          tindakanperawats.sort()
          tindakanperawats.forEach(f => {
            const temp = xxx?.tindakanperawat?.filter(m => m.rs22 === f)?.reduce((x, y) => parseFloat(x) + parseFloat(y.subtotal), 0)
            const namaRuangan = this.ranap.find(kd => kd.rs4 === f)
            const tndprwt = {
              kamar: f,
              namaruangan: namaRuangan?.rs5 ?? '-',
              subtotal: temp
            }
            xxx.TindakanPerawat.push(tndprwt)
          })
        }

        xxx.Visite = []
        const visites = filterDuplicateArrays(xxx?.visiteumum?.map(m => m?.rs8))
        if (visites?.length) {
          visites.sort()
          visites.forEach(f => {
            const temp = xxx?.visiteumum?.filter(m => m.rs8 === f)?.reduce((x, y) => parseFloat(x) + parseFloat(y.subtotal), 0)
            const namaRuangan = this.ranap.find(kd => kd.rs4 === f)
            const visiteum = {
              kamar: f,
              namaruangan: namaRuangan?.rs5 ?? '-',
              subtotal: temp
            }
            xxx.Visite.push(visiteum)
          })
        }

        xxx.MakanPasien = []
        const makans = filterDuplicateArrays(xxx?.makanpasien?.map(m => m?.rs8))
        if (makans?.length) {
          makans.sort()
          makans.forEach(f => {
            const temp = xxx?.makanpasien?.filter(m => m.rs8 === f)?.reduce((x, y) => parseFloat(x) + parseFloat(y.subtotal), 0)
            const namaRuangan = this.ranap.find(kd => kd.rs4 === f)
            const makanpas = {
              kamar: f,
              namaruangan: namaRuangan?.rs5 ?? '-',
              subtotal: temp
            }
            xxx.MakanPasien.push(makanpas)
          })
        }

        xxx.Oksigen = []
        const oksigens = filterDuplicateArrays(xxx?.oksigen?.map(m => m?.rs8))
        if (oksigens?.length) {
          oksigens.sort()
          oksigens.forEach(f => {
            const temp = xxx?.oksigen?.filter(m => m.rs8 === f)?.reduce((x, y) => parseFloat(x) + parseFloat(y.subtotal), 0)
            const namaRuangan = this.ranap.find(kd => kd.rs4 === f)
            const woksigen = {
              kamar: f,
              namaruangan: namaRuangan?.rs5 ?? '-',
              subtotal: temp
            }
            xxx.Oksigen.push(woksigen)
          })
        }

        xxx.Keperawatan = []
        const kepers = filterDuplicateArrays(xxx?.keperawatan?.map(m => m?.rs8))
        if (kepers?.length) {
          kepers.sort()
          kepers.forEach(f => {
            const temp = xxx?.keperawatan?.filter(m => m.rs8 === f)?.reduce((x, y) => parseFloat(x) + parseFloat(y.subtotal), 0)
            const namaRuangan = this.ranap.find(kd => kd.rs4 === f)
            const keperawatanx = {
              kamar: f,
              namaruangan: namaRuangan?.rs5 ?? '-',
              subtotal: temp
            }
            xxx.Keperawatan.push(keperawatanx)
          })
        }

        xxx.Laborat = []
        const laboratpaket = xxx?.laborat
        const laboratasnonpaket = xxx?.laboratnonpaket
        const laboratall = laboratpaket.concat(laboratasnonpaket)
        const laboratss = filterDuplicateArrays(laboratall?.map(m => m?.ruangan))
        // console.log('wew', laboratss)
        //  const laborats = filterDuplicateArrays(xxx?.laborat?.map(m => m?.ruangan))
        if (laboratss?.length) {
          laboratss.sort()
          laboratss.forEach(f => {
            const temp = laboratall?.filter(m => m.ruangan === f)?.reduce((x, y) => parseFloat(x) + parseFloat(y.subtotalx), 0)
            const namaRuangan = this.ranap.find(kd => kd.rs4 === f)
            const laboratssss = {
              kamar: f,
              namaruangan: namaRuangan?.rs5 ?? '-',
              subtotal: temp
            }
            xxx.Laborat.push(laboratssss)
          })
        }

        xxx.Radiologi = []
        const radiologis = filterDuplicateArrays(xxx?.transradiologi.map(m => m?.rs26))
        if (radiologis?.length) {
          radiologis.sort()
          radiologis.forEach(i => {
            const temp = xxx.transradiologi?.filter(x => x.rs26 === i)?.reduce((x, y) => parseFloat(x) + parseFloat(y.subtotal), 0)
            const namaRuangan = this.ranap.find(kd => kd.rs4 === i)
            const radiosx = {
              kamar: i,
              namaruangan: namaRuangan?.rs5 ?? '-',
              subtotal: temp
            }
            xxx.Radiologi.push(radiosx)
          })
        }

        xxx.Endoscopy = []
        const endoscopys = filterDuplicateArrays(xxx?.tindakanendoscopy.map(m => m?.rs4))
        if (endoscopys?.length) {
          endoscopys.sort()
          endoscopys.forEach(i => {
            const temp = xxx.tindakanendoscopy?.filter(x => x.rs4 === i)?.reduce((x, y) => parseFloat(x) + parseFloat(y.subtotal), 0)
            const namaRuangan = this.ranap.find(kd => kd.rs4 === i)
            const endoscopysx = {
              kamar: i,
              namaruangan: namaRuangan?.rs5 ?? '-',
              subtotal: temp
            }
            xxx.Endoscopy.push(endoscopysx)
          })
        }

        xxx.Kamaroperasiibs = []
        const kamaroperasiibss = filterDuplicateArrays(xxx?.kamaroperasiibs.map(m => m?.rs15))
        if (kamaroperasiibss?.length) {
          kamaroperasiibss.sort()
          kamaroperasiibss.forEach(i => {
            const temp = xxx.kamaroperasiibs?.filter(x => x.rs15 === i)?.reduce((x, y) => parseFloat(x) + parseFloat(y.subtotal), 0)
            const namaRuangan = this.ranap.find(kd => kd.rs4 === i)
            const kamaroperasiibssx = {
              kamar: i,
              namaruangan: namaRuangan?.rs5 ?? '-',
              subtotal: temp
            }
            xxx.Kamaroperasiibs.push(kamaroperasiibssx)
          })
        }

        xxx.Kamaroperasiigd = []
        const kamaroperasiigds = filterDuplicateArrays(xxx?.kamaroperasiigd.map(m => m?.rs15))
        if (kamaroperasiigds?.length) {
          kamaroperasiigds.sort()
          kamaroperasiigds.forEach(i => {
            const temp = xxx.kamaroperasiigd?.filter(x => x.rs15 === i)?.reduce((x, y) => parseFloat(x) + parseFloat(y.subtotal), 0)
            const namaRuangan = this.ranap.find(kd => kd.rs4 === i)
            const kamaroperasiigdsx = {
              kamar: i,
              namaruangan: namaRuangan?.rs5 ?? '-',
              subtotal: temp
            }
            xxx.Kamaroperasiigd.push(kamaroperasiigdsx)
          })
        }

        xxx.Tindakanoperasi = []
        const tindakanoperasis = filterDuplicateArrays(xxx?.tindakanoperasi.map(m => m?.rs4))
        if (tindakanoperasis?.length) {
          tindakanoperasis.sort()
          tindakanoperasis.forEach(i => {
            const temp = xxx.tindakanoperasi?.filter(x => x.rs4 === i)?.reduce((x, y) => parseFloat(x) + parseFloat(y.subtotal), 0)
            const namaRuangan = this.ranap.find(kd => kd.rs4 === i)
            const tindakanoperasisx = {
              kamar: i,
              namaruangan: namaRuangan?.rs5 ?? '-',
              subtotal: temp
            }
            xxx.Tindakanoperasi.push(tindakanoperasisx)
          })
        }

        xxx.TindakanOperasiIgd = []
        const tindakanoperasiigds = filterDuplicateArrays(xxx?.tindakanoperasiigd.map(m => m?.rs4))
        if (tindakanoperasiigds?.length) {
          tindakanoperasiigds.sort()
          tindakanoperasiigds.forEach(i => {
            const temp = xxx.tindakanoperasiigd?.filter(x => x.rs4 === i)?.reduce((x, y) => parseFloat(x) + parseFloat(y.subtotal), 0)
            const namaRuangan = this.ranap.find(kd => kd.rs4 === i)
            const tindakanoperasiigdsx = {
              kamar: i,
              namaruangan: namaRuangan?.rs5 ?? '-',
              subtotal: temp
            }
            xxx.TindakanOperasiIgd.push(tindakanoperasiigdsx)
          })
        }

        xxx.TindakanFisioterapi = []
        const tindakanfisioterapis = filterDuplicateArrays(xxx?.tindakanfisioterapi.map(m => m?.rs4))
        if (tindakanfisioterapis?.length) {
          tindakanfisioterapis.sort()
          tindakanfisioterapis.forEach(i => {
            const temp = xxx.tindakanfisioterapi?.filter(x => x.rs4 === i)?.reduce((x, y) => parseFloat(x) + parseFloat(y.subtotal), 0)
            const namaRuangan = this.ranap.find(kd => kd.rs4 === i)
            const tindakanfisioterapisx = {
              kamar: i,
              namaruangan: namaRuangan?.rs5 ?? '-',
              subtotal: temp
            }
            xxx.TindakanFisioterapi.push(tindakanfisioterapisx)
          })
        }

        xxx.TindakananastesidiLuarOkdanIcu = []
        const tindakananastesidiluarokdanicus = filterDuplicateArrays(xxx?.tindakananastesidiluarokdanicu.map(m => m?.rs4))
        if (tindakananastesidiluarokdanicus?.length) {
          tindakananastesidiluarokdanicus.sort()
          tindakananastesidiluarokdanicus.forEach(i => {
            const temp = xxx.tindakananastesidiluarokdanicu?.filter(x => x.rs4 === i)?.reduce((x, y) => parseFloat(x) + parseFloat(y.subtotal), 0)
            const namaRuangan = this.ranap.find(kd => kd.rs4 === i)
            const tindakananastesidiluarokdanicusx = {
              kamar: i,
              namaruangan: namaRuangan?.rs5 ?? '-',
              subtotal: temp
            }
            xxx.TindakanFisioterapi.push(tindakananastesidiluarokdanicusx)
          })
        }

        xxx.TindakanCardio = []
        const tindakancardios = filterDuplicateArrays(xxx?.tindakancardio.map(m => m?.rs4))
        if (tindakancardios?.length) {
          tindakancardios.sort()
          tindakancardios.forEach(i => {
            const temp = xxx.tindakancardio?.filter(x => x.rs4 === i)?.reduce((x, y) => parseFloat(x) + parseFloat(y.subtotal), 0)
            const namaRuangan = this.ranap.find(kd => kd.rs4 === i)
            const tindakancardiosx = {
              kamar: i,
              namaruangan: namaRuangan?.rs5 ?? '-',
              subtotal: temp
            }
            xxx.TindakanCardio.push(tindakancardiosx)
          })
        }

        xxx.TindakanEeg = []
        const tindakaneegs = filterDuplicateArrays(xxx?.tindakaneeg.map(m => m?.rs4))
        if (tindakaneegs?.length) {
          tindakaneegs.sort()
          tindakaneegs.forEach(i => {
            const temp = xxx.tindakaneeg?.filter(x => x.rs4 === i)?.reduce((x, y) => parseFloat(x) + parseFloat(y.subtotal), 0)
            const namaRuangan = this.ranap.find(kd => kd.rs4 === i)
            const tindakaneegsx = {
              kamar: i,
              namaruangan: namaRuangan?.rs5 ?? '-',
              subtotal: temp
            }
            xxx.TindakanEeg.push(tindakaneegsx)
          })
        }

        xxx.PsikologtransUmum = []
        const psikologtransumums = filterDuplicateArrays(xxx?.psikologtransumum.map(m => m?.rs4))
        if (psikologtransumums?.length) {
          psikologtransumums.sort()
          psikologtransumums.forEach(i => {
            const temp = xxx.psikologtransumum?.filter(x => x.rs4 === i)?.reduce((x, y) => parseFloat(x) + parseFloat(y.subtotal), 0)
            const namaRuangan = this.ranap.find(kd => kd.rs4 === i)
            const psikologtransumumsx = {
              kamar: i,
              namaruangan: namaRuangan?.rs5 ?? '-',
              subtotal: temp
            }
            xxx.PsikologtransUmum.push(psikologtransumumsx)
          })
        }

        xxx.Bdrs = []
        const bdrss = filterDuplicateArrays(xxx?.bdrs.map(m => m?.rs14))
        if (bdrss?.length) {
          bdrss.sort()
          bdrss.forEach(i => {
            const temp = xxx.bdrs?.filter(x => x.rs14 === i)?.reduce((x, y) => parseFloat(x) + parseFloat(y.subtotal), 0)
            const namaRuangan = this.ranap.find(kd => kd.rs4 === i)
            const bdrssx = {
              kamar: i,
              namaruangan: namaRuangan?.rs5 ?? '-',
              subtotal: temp
            }
            xxx.Bdrs.push(bdrssx)
          })
        }

        xxx.Penunjangkeluar = []
        const penunjangkeluars = filterDuplicateArrays(xxx?.penunjangkeluar.map(m => m?.ruangan))
        if (penunjangkeluars?.length) {
          penunjangkeluars.sort()
          penunjangkeluars.forEach(i => {
            const temp = xxx.penunjangkeluar?.filter(x => x.ruangan === i)?.reduce((x, y) => parseFloat(x) + parseFloat(y.subtotal), 0)
            const namaRuangan = this.ranap.find(kd => kd.rs4 === i)
            const penunjangkeluarsx = {
              kamar: i,
              namaruangan: namaRuangan?.rs5 ?? '-',
              subtotal: temp
            }
            xxx.Penunjangkeluar.push(penunjangkeluarsx)
          })
        }

        xxx.Farmasi = []
        const farmasilamanonracikan = xxx?.apotekranaplalu
        const farmasilamaracikan = xxx?.apotekranapracikanhederlalux
        const farmasilamanonracikannew = xxx?.newfarmasi
        const farmasiracikannew = xxx?.newfarmasiracikan
        const farmasilama = farmasilamanonracikan.concat(farmasilamaracikan, farmasilamanonracikannew, farmasiracikannew)
        const farmasilamass = filterDuplicateArrays(farmasilama?.map(m => m?.ruangan))

        if (farmasilamass?.length) {
          farmasilamass.sort()
          farmasilamass.forEach(i => {
            const temp = farmasilama?.filter(x => x.ruangan === i)?.reduce((x, y) => parseFloat(x) + parseFloat(y.subtotalx), 0)
            const namaRuangan = this.ranap.find(kd => kd.rs4 === i)
            const farmasilamax = {
              kamar: i,
              namaruangan: namaRuangan?.rs5 ?? '-',
              subtotal: isNaN(temp) ? '' : temp
            }
            xxx.Farmasi.push(farmasilamax)
          })
        }
      })
      this.items = val
      console.log('sasa', val)
    }
  }
})
