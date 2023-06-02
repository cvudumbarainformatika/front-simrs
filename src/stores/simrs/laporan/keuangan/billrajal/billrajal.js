import { defineStore } from 'pinia'
import { date } from 'quasar'
import { api } from 'src/boot/axios'

export const useSimrsLaporanKeuanganBillRajalStore = defineStore('simrs_laporan_keuangan_bill_rajal', {
  state: () => ({
    loading: false,
    items: [],
    meta: {},
    tanggal: {
      // from: date.formatDate(Date.now(), 'DD MMMM YYYY'),
      // to: date.formatDate(Date.now(), 'DD MMMM YYYY')
      from: date.formatDate('03-01-2014', 'DD MMMM YYYY'),
      to: date.formatDate('03-05-2014', 'DD MMMM YYYY')
    },
    params: {
      q: '',
      page: 1,
      per_page: 10,
      order_by: 'created_at',
      // tgldari: date.formatDate(Date.now(), 'YYYY-MM-DD'),
      // tglsampai: date.formatDate(Date.now(), 'YYYY-MM-DD'),
      tgldari: date.formatDate('03-01-2014', 'YYYY-MM-DD'),
      tglsampai: date.formatDate('03-05-2014', 'YYYY-MM-DD'),
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
              this.items.forEach(item => {
                const racik = item.apotekracikanrajal ? (item.apotekracikanrajal.length ? item.apotekracikanrajal.map(anu => anu.subtotal).reduce((a, b) => a + b, 0) : 0) : 0
                const poli = item.apotekrajalpolilalu ? (item.apotekrajalpolilalu.length ? item.apotekrajalpolilalu.map(anu => anu.subtotal).reduce((a, b) => a + b, 0) : 0) : 0
                const laborat = item.laborat ? (item.laborat.length ? item.laborat.map(anu => anu.subtotal).reduce((a, b) => a + b, 0) : 0) : 0
                const radiologi = item.radiologi ? (item.radiologi.length ? item.radiologi.map(anu => anu.subtotal).reduce((a, b) => a + b, 0) : 0) : 0
                item.subtotal = racik + poli + laborat + radiologi
              })
            }
            console.log('laporan ', resp.data)
            resolve(resp.data)
          })
          .catch(() => { this.loading = false })
      })
    }
  }
})
