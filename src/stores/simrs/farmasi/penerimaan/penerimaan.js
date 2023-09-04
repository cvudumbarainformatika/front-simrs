import { defineStore } from 'pinia'
import { date } from 'quasar'
import { api } from 'src/boot/axios'
import { filterDuplicateArrays, findWithAttr, notifErrVue } from 'src/modules/utils'

export const usePenerimaanFarmasiStore = defineStore('farmasi_penerimaan', {
  state: () => ({
    loading: false,
    loadingPihakTiga: false,
    items: [],
    form: {
      nopenerimaan: '',
      tglpenerimaan: date.formatDate(Date.now(), 'YYYY-MM-DD'),
      batasbayar: null,
      tglsurat: date.formatDate(Date.now(), 'YYYY-MM-DD')
    },
    disp: {
      tanggal: date.formatDate(Date.now(), 'DD MMMM YYYY'),
      batasbayar: null,
      surat: date.formatDate(Date.now(), 'DD MMMM YYYY')
    },
    params: {
      per_page: 10,
      page: 1
    },
    namaPihakKetiga: '',
    namaPenyedia: null,
    pemesanans: [],
    details: [],
    jenisSurats: [
      { nama: 'Faktur' },
      { nama: 'Surat Jalan' }
    ],
    jenisSuratLs: [
      { nama: 'Faktur' },
      { nama: 'Surat Jalan' },
      { nama: 'Nota' }
    ],
    jenisPenerimaans: [
      // Pembelian langsung, Pinjaman, Konsinyasi, APBD, APBN, penggantian barang
      { nama: 'Pembelian langsung' },
      { nama: 'Pinjaman' },
      { nama: 'Konsinyasi' },
      { nama: 'APBD' },
      { nama: 'APBN' },
      { nama: 'penggantian barang' }

    ],
    gudangs: [
      { nama: 'Gudang Farmasi ( Kamar Obat )', value: 'Gd-05010100' },
      { nama: 'Gudang Farmasi (Floor Stok)', value: 'Gd-03010100' }
    ],
    rincis: [],
    filterObat: '',
    obats: []
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
      this.details = null
      this.namaPenyedia = null
      // console.log('pemesanan selected ', val)
      const pemesanan = this.pemesanans.filter(a => a.nopemesanan === val)
      if (pemesanan.length) {
        this.items = pemesanan[0]
        this.details = pemesanan[0].rinci
        this.namaPenyedia = this.items.pihakketiga
        console.log('tem ', this.items)
        console.log('det ', this.details)
        const terima = this.items.penerimaan ? this.items.penerimaan : []
        const terRi = []
        if (terima.length) {
          terima.forEach(ter => {
            const rinci = ter.penerimaanrinci ? ter.penerimaanrinci : []
            if (rinci.length) {
              const anu = rinci.map(a => {
                const ai = {}
                ai.jml_terima = parseFloat(a.jml_terima)
                ai.kdobat = a.kdobat
                return ai
              })
              terRi.push(anu)
            }
          })
        }
        console.log('terRi', terRi)

        this.metanirinci(terRi)
        if (this.namaPenyedia) {
          this.setForm('kdpbf', this.namaPenyedia.kode)
        } else {
          notifErrVue('Penyedia tidak ada, tidak bisa dilanjutkan melakukan penerimaan')
        }
      }
      this.setForm('nopemesanan', val)
    },
    clearPemesanan() {
      this.setForm('nopemesanan', null)
      this.items = []
      this.details = []
      this.namaPenyedia = null
    },
    metanirinci(pen) {
      if (this.details.length) {
        const kod = this.details.map(a => a.kdobat) // ambil kode obat
        const ter = []
        if (kod.length) {
          const filtKod = filterDuplicateArrays(kod) // pastikan tidak ada duplikasi kode obat
          filtKod.forEach(a => {
            let temp = 0
            pen.forEach(apem => {
              const tam = apem.filter(anu => anu.kdobat === a).map(b => b.jml_terima).reduce((c, d) => c + d, 0)
              temp += tam
            })
            console.log('temp', temp)
            const temp2 = {
              kode: a,
              jml: temp
            }
            ter.push(temp2)
          })
          // console.log('kod', kod)
          // console.log('filtkod', filtKod)
          // console.log('ter', ter)
        }

        this.details.forEach(a => {
          // console.log('det', a)
          a.diskon = 0
          a.ppn = 0
          a.diskon_rp = 0
          a.ppn_rp = 0
          a.jumlah = ''
          a.jml_pesan = a.jumlahdpesan
          a.harga_netto = 0
          a.subtotal = 0
          a.satuan_bsr = a.masterobat ? a.masterobat.satuan_b : '-'
          a.satuan_kcl = a.masterobat ? a.masterobat.satuan_k : '-'
          if (ter.length) {
            const temp = ter.filter(b => b.kode === a.kdobat)
            if (temp.length) {
              a.jml_terima_lalu = temp[0].jml
            } else {
              a.jml_terima_lalu = 0
            }
            a.jml_all_penerimaan = a.jml_terima_lalu
            // console.log('det temp', temp)
          } else {
            if (!a.jml_terima_lalu) a.jml_terima_lalu = 0
            a.jml_all_penerimaan = a.jml_terima_lalu
          }
        })
      }
    },
    gudangSelected(val) {
      this.setForm('gudang', val)
      this.setForm('kdruang', val)
    },
    clearGudang() {
      this.setForm('gudang', null)
      this.setForm('kdruang', null)
    },
    jenisPenerimaanSelected(val) {
      this.setForm('jenispenerimaan', val)
    },
    clearJenisPenerimaan() {
      this.setForm('jenispenerimaan', null)
    },
    jenisSuratSelected(val) {
      this.setForm('jenissurat', val)
    },
    clearJenisSurat() {
      this.setForm('jenissurat', null)
    },
    getInitialData() {
      this.setForm('batasbayar', date.formatDate(this.setNexMonth(), 'YYYY-MM-DD'))
      this.setDisp('batasbayar', date.formatDate(this.setNexMonth(), 'DD MMMM YYYY'))

      this.ambilPemesanan()
      this.getPihakKetiga()
    },
    // cari obat
    getDataObat() {
      this.loading = true
      const params = { params: { q: this.filterObat } }
      return new Promise(resolve => {
        api.get('v1/simrs/master/cariObat', params)
          .then(resp => {
            this.loading = false
            this.obats = resp.data
            console.log(resp)
            resolve(resp)
          })
          .catch(() => { this.loading = false })
      })
    },
    getPihakKetiga() {
      const param = { params: { nama: this.namaPihakKetiga } }
      this.loadingPihakTiga = true
      return new Promise(resolve => {
        api.get('v1/simrs/farmasinew/pemesananobat/pihakketiga', param)
          .then(resp => {
            this.loadingPihakTiga = false
            console.log('pihak tiga', resp.data)
            this.pihakTigas = resp.data
            resolve(resp)
          })
      })
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
    kunci() {
    },
    simpanPenerimaan() {
      this.loading = true
      return new Promise(resolve => {
        api.post('v1/simrs/farmasinew/penerimaan/simpan', this.form)
          .then(resp => {
            this.loading = false
            console.log('sudah simpan', resp.data)
            if (resp.data.heder) {
              if (resp.data.heder.nopenerimaan) {
                this.setForm('nopenerimaan', resp.data.heder.nopenerimaan)
              }
            }
            if (resp.data.rinci) {
              const rin = resp.data.rinci
              const index = findWithAttr(this.details, 'kdobat', rin.kdobat)
              if (index >= 0) {
                this.details[index].jml_terima_lalu = rin.jml_terima_lalu
                this.details[index].jml_all_penerimaan = rin.jml_all_penerimaan
                this.details[index].jumlah = 0
                this.details[index].inpJumlah = 0
                this.details[index].isi = 1
                this.details[index].harga = 0
                this.details[index].harga_kcl = 0
                this.details[index].no_batch = ''
                this.details[index].tgl_exp = ''
                this.details[index].diskon = 0
                this.details[index].ppn = 0
                this.details[index].diskon_rp = 0
                this.details[index].ppn_rp = 0
                this.details[index].harga_netto = 0
                this.details[index].subtotal = 0
              }
            }
            resolve(resp)
          })
          .catch(() => {
            this.loading = false
          })
      })
    }
  }
})
