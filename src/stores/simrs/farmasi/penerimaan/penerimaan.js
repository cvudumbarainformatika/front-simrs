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
      tempo: null,
      surat: date.formatDate(Date.now(), 'YYYY-MM-DD')
    },
    disp: {
      tanggal: date.formatDate(Date.now(), 'DD MMMM YYYY'),
      tempo: null,
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
    setNexMonth() {
      const now = new Date()
      if (now.getMonth() === 11) {
        return (new Date(now.getFullYear() + 1, 0, now.getDate()))
      } else {
        return (new Date(now.getFullYear(), now.getMonth() + 1, now.getDate()))
      }
    },
    pemesananSelected(val) {
      this.items = []
      this.details = {}
      this.namaPenyedia = null
      // console.log('pemesanan selected ', val)
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
          a.subtotal = 0
          if (!a.jml_terima_lalu) a.jml_terima_lalu = 0
          a.jml_all_penerimaan = a.jml_terima_lalu
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
      this.setForm('tempo', date.formatDate(this.setNexMonth(), 'YYYY-MM-DD'))
      this.setDisp('tempo', date.formatDate(this.setNexMonth(), 'DD MMMM YYYY'))

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
    selesaiDanKunci() {
    },
    simpanPenerimaan() {
      this.loading = true
      return new Promise(resolve => {
        api.post('v1/simrs/farmasinew/penerimaan/simpan', this.form)
          .then(resp => {
            this.loading = false
            console.log('sudah simpan')
            resolve(resp)
          })
          .catch(() => {
            this.loading = false
          })
      })
    }
  }
})
