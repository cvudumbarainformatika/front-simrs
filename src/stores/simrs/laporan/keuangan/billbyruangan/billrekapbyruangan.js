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
    kolom: ['Identitas', 'Admin', 'AkomodasiKamar', 'TindakanDokter', 'Visite', 'TindakanKeperawatan', 'MakanPasien', 'Oksigen', 'Keperawatan', 'Laborat'],
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
        const laboratpaket = xxx?.laborat.filter(x => x.pemeriksaanlab.rs21 !== '')
        const laborats = filterDuplicateArrays(laboratpaket.map(m => m?.rs23))
        console.log('wew', laborats)
        if (laborats?.length) {
          laborats.sort()
          laborats.forEach(f => {
            const temp = laboratpaket.filter(m => m.rs23 === f)?.reduce((x, y) => parseFloat(x) + parseFloat(y.subtotal), 0)
            const namaRuangan = this.ranap.find(kd => kd.rs4 === f)
            const laboratssss = {
              kamar: f,
              namaruangan: namaRuangan?.rs5 ?? '-',
              subtotal: temp
            }
            xxx.Laborat.push(laboratssss)
          })
        }
      })
      this.items = val
      console.log('sasa', val)
    }
  }
})
