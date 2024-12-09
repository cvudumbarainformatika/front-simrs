import { defineStore } from 'pinia'
import { date } from 'quasar'

export const useLaporanPenerimaanObatStore = defineStore('laporan_pemakaian_obat', {
  state: () => ({
    loading: false,
    loadingDownload: true,
    items: [],
    meta: {},
    detail: [],
    totalall: 0,
    tanggal: {
      from: date.formatDate(Date.now(), 'DD MMMM YYYY'),
      to: date.formatDate(Date.now(), 'DD MMMM YYYY')
    },
    params: {
      tgldari: date.formatDate(Date.now(), 'YYYY-MM-DD'),
      tglsampai: date.formatDate(Date.now(), 'YYYY-MM-DD'),
      jenisreport: '1',
      gudang: 'Semua Gudang',
      jenispenerimaan: 'Semua Penerimaan'
      // ruangan: ''
    }
  })
})
