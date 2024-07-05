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
    }
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
        console.log('asa', kamars)
      })
      // console.log('sasa', val)
    }
  }
})
