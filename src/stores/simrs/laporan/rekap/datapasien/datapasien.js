import { defineStore } from 'pinia'
import { date } from 'quasar'
import { api } from 'src/boot/axios'

export const useSimrsLaporanRekapDataPasienStore = defineStore('simrs_laporan_rekap_data_paseien', {
  state: () => ({
    loading: false,
    items: [],
    meta: {},
    tanggal: {
      from: date.formatDate(Date.now(), 'DD MMMM YYYY'),
      to: date.formatDate(Date.now(), 'DD MMMM YYYY')
    },
    params: {
      q: '',
      page: 1,
      per_page: 10,
      order_by: 'created_at',
      from: date.formatDate(Date.now(), 'YYYY-MM-DD'),
      // from: '2023-05-01',
      to: date.formatDate(Date.now(), 'YYYY-MM-DD'),
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
    columns: ['tanggal', 'pasien', 'general', 'regional', 'masuk', 'keluar', 'lama'],
    columnHide: ['id']
  }),
  actions: {
    setForm (key, val) {
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
    bulanSelected (val) {
      console.log('val', val)
      this.params.bulan = val
      const from = date.adjustDate(this.params.from, { month: val })
      const to = date.adjustDate(this.params.from, { month: val })
      this.params.from = date.formatDate(from, 'YYYY-MM-DD')
      this.params.to = date.formatDate(to, 'YYYY-MM-DD')
      console.log('params', this.params)
    },
    // init data
    getInitialData () {
      this.getDataTable()
    },
    // get data api
    getDataTable () {
      this.loading = true
      const param = { params: this.params }
      return new Promise(resolve => {
        api.get('v1/simrs/laporan/laporanoperasirr', param)
          .then(resp => {
            this.loading = false
            this.items = resp.data
            console.log('laporan ', resp.data)
            resolve(resp.data)
          })
          .catch(() => { this.loading = false })
      })
    }
  }
})
