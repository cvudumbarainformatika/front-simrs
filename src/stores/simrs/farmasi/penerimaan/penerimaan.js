import { defineStore } from 'pinia'
import { date } from 'quasar'
import { api } from 'src/boot/axios'

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
    namaPenyedia: null,
    pemesanans: [],
    details: [],
    jenisSurats: [
      { nama: 'Faktur' },
      { nama: 'Surat Jalan' }
    ],
    jenisPenerimaans: [
      { nama: 'Pemesanan' },
      { nama: 'Bukan Pemesanan' }

    ],
    gudangs: [
      { nama: 'Gudang Farmasi ( Kamar Obat )', value: 'Gd-05010100' },
      { nama: 'Gudang Farmasi (Floor Stok)', value: 'Gd-03010100' }

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
      const pemesanan = this.pemesanans.filter(a => a.nopemesanan === val)
      if (pemesanan.length) {
        this.items = pemesanan[0]
        this.details = pemesanan[0].rinci
        this.namaPenyedia = this.items.pihakketiga
        console.log('tem ', this.items)
        console.log('det ', this.details)
        this.metanirinci()
      }
      this.setForm('nopemesanan', val)
    },
    clearPemesanan() {
      this.setForm('nopemesanan', null)
      this.items = []
      this.details = []
      this.namaPenyedia = null
    },
    metanirinci() {
      if (this.details.length) {
        this.details.forEach(a => {
          a.diskon = 0
          a.ppn = 0
          a.diskon_rp = 0
          a.ppn_rp = 0
          a.jml_diterima = ''
          a.harga_netto = 0
        })
      }
    },
    gudangSelected(val) {
      this.setForm('gudang', val)
    },
    clearGudang() {
      this.setForm('gudang', null)
    },
    jenisSuratSelected(val) {
      this.setForm('jenissurat', val)
    },
    clearJenisSurat() {
      this.setForm('jenissurat', null)
    },
    getInitialData() {
      this.ambilPemesanan()
    },
    ambilPemesanan() {
      this.loading = true
      return new Promise(resolve => {
        api.get('v1/simrs/farmasinew/penerimaan/dialogpemesananobat')
          .then(resp => {
            this.loading = false
            console.log('ambil pemesanan', resp)
            this.pemesanans = resp.data
            resolve(resp.data)
          })
          .catch(() => {
            this.loading = false
          })
      })
    },
    selesaiDanKunci() {},
    simpanPenerimaan() {}
  }
})
