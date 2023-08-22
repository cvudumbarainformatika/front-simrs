import { defineStore } from 'pinia'
import { date } from 'quasar'

export const usePenerimaanFarmasiStore = defineStore('farmasi_penerimaan', {
  state: () => ({
    loading: false,
    items: [],
    form: {
      nopenerimaan: '',
      tanggal: date.formatDate(Date.now(), 'YYYY-MM-DD'),
      tempo: date.formatDate(Date.now(), 'YYYY-MM-DD'),
      surat: date.formatDate(Date.now(), 'YYYY-MM-DD')
    },
    disp: {
      tanggal: date.formatDate(Date.now(), 'DD MMMM YYYY'),
      tempo: date.formatDate(Date.now(), 'DD MMMM YYYY'),
      surat: date.formatDate(Date.now(), 'DD MMMM YYYY')
    },
    params: {
      per_page: 10,
      page: 1
    },
    namaPenyedia: '-',
    pemesanans: [{
      nopemesanan: 'dasassda'
    }],
    jenisSurats: [
      { nama: 'Faktur' },
      { nama: 'Surat Jalan' },
      { nama: 'Struk Pembelian' }
    ],
    jenisPenerimaans: [
      { nama: 'Pemesanan' },
      { nama: 'Bukan Pemesanan' }

    ]
  }),
  actions: {
    setForm(key, val) {
      this.form[key] = val
    },
    setDisp(key, val) {
      this.disp[key] = val
    },
    pemesananSelected(val) {
      console.log('pemesanan selected ', val)
      this.setForm('nopemesanan', val)
    },
    clearPemesanan() {
      this.setForm('nopemesanan', null)
    },
    jenisPenerimaanSelected(val) {
      this.setForm('jenisPenerimaan', val)
    },
    clearJenisPenerimaan() {
      this.setForm('jenisPenerimaan', null)
    },
    jenisSuratSelected(val) {
      this.setForm('jenisSurat', val)
    },
    clearJenisSurat() {
      this.setForm('jenisSurat', null)
    },
    getInitialData() {},
    ambilPemesanan() {},
    selesaiDanKunci() {},
    simpanPenerimaan() {}
  }
})
