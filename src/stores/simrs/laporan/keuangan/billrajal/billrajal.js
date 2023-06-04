import { defineStore } from 'pinia'
import { date } from 'quasar'
import { api } from 'src/boot/axios'
import { filterDuplicateArrays, filterDuplicateArraysInArrays } from 'src/modules/utils'

export const useSimrsLaporanKeuanganBillRajalStore = defineStore('simrs_laporan_keuangan_bill_rajal', {
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
    columns: ['tanggal', 'pasien', 'poli', 'apotikrajal', 'apotikpoli', 'laborat', 'radiologi', 'msistembayar', 'subtotal'],
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
      this.getDataTable()
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

        const racikKey = item.apotekracikanrajal ? (item.apotekracikanrajal.length ? item.apotekracikanrajal.map(anu => anu.rs2) : []) : []
        const poliKey = item.apotekrajalpolilalu ? (item.apotekrajalpolilalu.length ? item.apotekrajalpolilalu.map(anu => anu.rs2) : []) : []
        const laboratKey = item.laborat ? (item.laborat.length ? item.laborat.map(anu => anu.rs2) : []) : []
        const radiologiKey = item.radiologi ? (item.radiologi.length ? item.radiologi.map(anu => anu.reltransrinci.map(a => a.rs2)) : []) : []

        const racikKeyFilt = racikKey.length ? filterDuplicateArrays(racikKey) : []
        const poliKeyFilt = poliKey.length ? filterDuplicateArrays(poliKey) : []
        const laboratKeyFilt = laboratKey.length ? filterDuplicateArrays(laboratKey) : []
        const radiologiKeyFilt = radiologiKey.length ? filterDuplicateArraysInArrays(radiologiKey) : []

        // item.racikKey = racikKeyFilt.length ? filterDuplicateArrays(racikKey) : []
        // item.poliKey = poliKeyFilt.length ? filterDuplicateArrays(poliKey) : []
        // item.laboratKey = laboratKeyFilt.length ? filterDuplicateArrays(laboratKey) : []
        // item.radiologiKey = radiologiKeyFilt.length ? filterDuplicateArrays(radiologiKey) : []
        if (poliKeyFilt.length) {
          // console.log('key poli', poliKeyFilt)
          item.rajalpoli = []
          poliKeyFilt.forEach(key => {
            // console.log('temp key poli', key)
            const temp = {}
            temp.nota = key
            temp.rinci = item.apotekrajalpolilalu.filter(it => it.rs2 === key)
            temp.subtotal = temp.rinci.map(a => a.subtotal).reduce((a, b) => a + b, 0)
            // console.log('temp poli', temp)
            item.rajalpoli.push(temp)
          })
        }
        if (laboratKeyFilt.length) {
          item.lab = []
          laboratKeyFilt.forEach(key => {
            const temp = {}
            temp.rinci = []
            const l1 = item.laborat.filter(it => it.rs2 === key)
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
            // console.log('paket', paket, 'non paket', nonPaket)
            temp.subtotal = temp.rinci.map(a => a.subtotal).reduce((a, b) => a + b, 0)
            laborat += temp.subtotal
            item.lab.push(temp)
          })
        }
        if (radiologiKey.length) {
          console.log('rad key', radiologiKey)
        }
        if (radiologiKeyFilt.length) {
          console.log('rad key filt', radiologiKeyFilt)
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
        item.subtotal = racik + poli + laborat + radiologi
      })
    },
    // get data api
    getDataTable() {
      this.loading = true
      const param = { params: this.params }
      return new Promise(resolve => {
        api.get('v1/simrs/laporan/laporanallbillrajal', param)
          .then(resp => {
            this.loading = false
            this.items = resp.data
            if (this.items.length) {
              this.mapDataItems()
            }
            console.log('laporan ', resp.data)
            resolve(resp.data)
          })
          .catch(() => { this.loading = false })
      })
    }
  }
})
