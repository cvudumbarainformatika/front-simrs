import { defineStore } from 'pinia'
import { date } from 'quasar'

export const useSimrsLaporanRekapDataPasienStore = defineStore('simrs_laporan_rekap_data_paseien', {
  state: () => ({
    loading: false,
    items: [],
    params: {
      q: '',
      page: 1,
      per_page: 10,
      order_by: 'created_at',
      bulan: date.formatDate(Date.now(), 'MM'),
      from: date.formatDate(Date.now(), 'YYYY-MM-01'),
      to: date.formatDate(Date.now(), 'YYYY-MM-31'),
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
    columnHide: []
  }),
  actions: {
    setForm(key, val) {
      this.form[key] = val
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

    // get data api
    getDataTable() {}
  }
})
