import { defineStore } from 'pinia'
import { date } from 'quasar'
import { api } from 'src/boot/axios'
import { filterDuplicateArrays, notifErrVue, notifSuccess } from 'src/modules/utils'
import { useListPenerimaanStore } from './listpenerimaan'

export const usePenerimaanFarmasiStore = defineStore('farmasi_penerimaan', {
  state: () => ({
    isOpen: false,
    loading: false,
    loadingPihakTiga: false,
    loadingKunci: false,
    loadingDelete: false,
    items: null,
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
      q: '',
      per_page: 10,
      page: 1
    },
    namaPihakKetiga: '',
    namaPenyedia: null,
    pemesanans: [],
    filteredPemesanans: [],
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
    setParam(key, val) {
      this.params[key] = val
    },
    setDisp(key, val) {
      this.disp[key] = val
    },
    setOpen() {
      this.isOpen = true
    },
    setClose() {
      this.isOpen = false
      this.resetForm()
    },
    resetForm() {
      this.form = {
        nopenerimaan: '',
        tglpenerimaan: date.formatDate(Date.now(), 'YYYY-MM-DD'),
        batasbayar: null,
        tglsurat: date.formatDate(Date.now(), 'YYYY-MM-DD')
      }
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
      this.isOpen = true
      this.items = val
      this.details = val?.rinci
      this.namaPenyedia = val?.pihakketiga
      console.log('pemesanan selected ', val)
      // const pemesanan = this.pemesanans.filter(a => a.nopemesanan === val)
      // if (pemesanan.length) {
      //   this.items = pemesanan[0]
      //   this.details = pemesanan[0].rinci
      //   this.namaPenyedia = this.items.pihakketiga
      //   console.log('tem ', this.items)
      //   console.log('det ', this.details)
      //   const terima = this.items.penerimaan ? this.items.penerimaan : []
      //   const terRi = []
      //   if (terima.length) {
      //     terima.forEach(ter => {
      //       const rinci = ter.penerimaanrinci ? ter.penerimaanrinci : []
      //       if (rinci.length) {
      //         const anu = rinci.map(a => {
      //           const ai = {}
      //           ai.jml_terima = parseFloat(a.jml_terima)
      //           ai.kdobat = a.kdobat
      //           return ai
      //         })
      //         terRi.push(anu)
      //       }
      //     })
      //   }
      //   console.log('terRi', terRi)

      //   this.metanirinci(terRi)
      if (this.namaPenyedia) {
        this.setForm('kdpbf', this.namaPenyedia.kode)
      } else {
        notifErrVue('Penyedia tidak ada, tidak bisa dilanjutkan melakukan penerimaan')
      }
      // }
      this.setForm('nopemesanan', val?.nopemesanan)
    },
    clearPemesanan() {
      this.form = {
        nopenerimaan: '',
        tglpenerimaan: date.formatDate(Date.now(), 'YYYY-MM-DD'),
        batasbayar: null,
        tglsurat: date.formatDate(Date.now(), 'YYYY-MM-DD')
      }
      const ruang = this.form.kdruang
      this.setForm('kdruang', ruang)
      this.setForm('gudang', ruang)
      this.setForm('nopemesanan', null)
      this.items = null
      this.details = []
      this.namaPenyedia = null
    },
    metanirinci(pen) {
      // console.log('pen', pen)
      if (pen.length) {
        pen.forEach(item => {
          if (item?.rinci?.length) {
            const terima = item.penerimaan ? item.penerimaan : []
            const terRi = []
            if (terima.length) {
              terima.forEach(apem => {
                const rinci = apem.penerimaanrinci ? apem.penerimaanrinci : []
                if (rinci.length) {
                  rinci.forEach(a => {
                    // console.log('penerimaan rinci', a)
                    a.jml_terima_b = parseFloat(a.jml_terima_b)
                    a.jml_terima_k = parseFloat(a.jml_terima_k)
                    terRi.push(a)
                  })
                }
              })
            }

            const kod = item?.rinci?.map(a => a.kdobat) // ambil kode obat
            const ter = []
            if (kod.length) {
              const filtKod = filterDuplicateArrays(kod) // pastikan tidak ada duplikasi kode obat
              // console.log('filtKod ', filtKod)
              filtKod.forEach(koda => {
                let temp = 0
                let tempK = 0
                // console.log('terRi ', terRi)
                const tam = terRi.filter(anu => anu.kdobat === koda).map(b => b.jml_terima_b).reduce((c, d) => c + d, 0)
                const tamK = terRi.filter(anu => anu.kdobat === koda).map(b => b.jml_terima_k).reduce((c, d) => c + d, 0)
                temp += tam
                tempK += tamK

                // console.log('tam', koda, terRi.filter(terrigu => terrigu.kdobat === koda))
                // console.log('temp', koda, temp)
                const temp2 = {
                  kode: koda,
                  jml: temp,
                  jmlK: tempK
                }
                ter.push(temp2)
              })
            }

            item?.rinci?.forEach(a => {
              a.diskon = 0
              a.isi = 1
              a.ppn = 11
              a.adaPPN = true
              a.diskon_rp = 0
              a.ppn_rp = 0
              a.jumlah = ''
              a.jml_pesan = a.jumlahdpesan
              a.harga_netto = 0
              a.harga = a.harga_kcl ?? 0
              a.subtotal = 0
              a.satuan_bsr = a.masterobat ? a.masterobat.satuan_b : '-'
              a.satuan_kcl = a.masterobat ? a.masterobat.satuan_k : '-'
              if (ter.length) {
                const temp = ter.filter(b => b.kode === a.kdobat)
                if (temp.length) {
                  a.jml_terima_lalu = temp[0].jml
                  a.jml_terima_laluK = temp[0].jmlK
                } else {
                  a.jml_terima_lalu = 0
                  a.jml_terima_laluK = 0
                }
                a.jml_all_penerimaan = a.jml_terima_laluK
                // console.log('det temp', temp)
              } else {
                if (!a.jml_terima_lalu) a.jml_terima_lalu = 0
                a.jml_all_penerimaan = a.jml_terima_laluK
              }
            })
          }
        })
      }
      // console.log('pen bawah', pen)
      this.pemesanans = pen
      this.filteredPemesanans = pen
      // if (this.details.length) {
      //   const kod = this.details.map(a => a.kdobat) // ambil kode obat
      //   const ter = []
      //   if (kod.length) {
      //     const filtKod = filterDuplicateArrays(kod) // pastikan tidak ada duplikasi kode obat
      //     filtKod.forEach(a => {
      //       let temp = 0
      //       pen.forEach(apem => {
      //         const tam = apem.filter(anu => anu.kdobat === a).map(b => b.jml_terima_b).reduce((c, d) => c + d, 0)
      //         temp += tam
      //       })
      //       console.log('temp', temp)
      //       const temp2 = {
      //         kode: a,
      //         jml: temp
      //       }
      //       ter.push(temp2)
      //     })
      //     // console.log('kod', kod)
      //     // console.log('filtkod', filtKod)
      //     // console.log('ter', ter)
      //   }

      //   this.details.forEach(a => {
      //     // console.log('det', a)
      //     a.diskon = 0
      //     a.isi = 1
      //     a.ppn = 0
      //     a.diskon_rp = 0
      //     a.ppn_rp = 0
      //     a.jumlah = ''
      //     a.jml_pesan = a.jumlahdpesan
      //     a.harga_netto = 0
      //     a.subtotal = 0
      //     a.satuan_bsr = a.masterobat ? a.masterobat.satuan_b : '-'
      //     a.satuan_kcl = a.masterobat ? a.masterobat.satuan_k : '-'
      //     if (ter.length) {
      //       const temp = ter.filter(b => b.kode === a.kdobat)
      //       if (temp.length) {
      //         a.jml_terima_lalu = temp[0].jml
      //       } else {
      //         a.jml_terima_lalu = 0
      //       }
      //       a.jml_all_penerimaan = a.jml_terima_lalu
      //       // console.log('det temp', temp)
      //     } else {
      //       if (!a.jml_terima_lalu) a.jml_terima_lalu = 0
      //       a.jml_all_penerimaan = a.jml_terima_lalu
      //     }
      //   })
      // }
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
    setQ(val) {
      this.setParam('q', val)
      this.ambilPemesanan()
    },
    setPerPage(val) {
      this.setParam('per_page', val)
      this.setParam('page', 1)
      this.ambilPemesanan()
    },
    getLists() {
      this.ambilPemesanan()
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
      const param = { params: this.params }
      return new Promise(resolve => {
        api.get('v1/simrs/farmasinew/penerimaan/dialogpemesananobat', param)
          .then(resp => {
            this.loading = false
            console.log('ambil pemesanan', resp)
            const data = resp?.data?.data ?? resp?.data
            this.metanirinci(data)
            // this.pemesanans = resp.data
            // this.filteredPemesanans = resp.data
            resolve(resp.data)
          })
          .catch(() => {
            this.loading = false
          })
      })
    },
    selesaiDanKunci() {
      this.kunci(this.form.nopenerimaan)
    },
    kunci(val) {
      const data = {
        nopenerimaan: val
      }
      this.loadingKunci = true
      return new Promise(resolve => {
        api.post('v1/simrs/farmasinew/penerimaan/kuncipenerimaan', data)
          .then(resp => {
            this.loadingKunci = false
            console.log('kunci penerimaan ', resp)
            notifSuccess(resp)
            const list = useListPenerimaanStore()
            list.cariRencanaBeli()
            this.setClose()
            this.clearPemesanan()
            this.ambilPemesanan()
            resolve(resp)
          })
          .catch(() => { this.loadingKunci = false })
      })
    },
    simpanPenerimaan() {
      this.loading = true
      const tgl = this.form.tglpenerimaan
      this.form.tglpenerimaan = tgl + date.formatDate(Date.now(), ' HH:mm:ss')
      return new Promise(resolve => {
        api.post('v1/simrs/farmasinew/penerimaan/simpan', this.form)
          .then(resp => {
            this.loading = false
            console.log('sudah simpan', resp.data)
            notifSuccess(resp)
            if (resp.data.heder) {
              if (resp.data.heder.nopenerimaan) {
                this.setForm('nopenerimaan', resp.data.heder.nopenerimaan)
              }
            }
            this.form.tglpenerimaan = tgl
            resolve(resp)
          })
          .catch(() => {
            this.loading = false
          })
      })
    },
    deleteHeader(val) {
      val.expand = !val.expand
      val.highlight = !val.highlight
      console.log('deleteHeader', val)
      this.loadingDelete = true
      val.loading = true
      return new Promise(resolve => {
        api.post('v1/simrs/farmasinew/penerimaan/batal-header', val)
          .then(resp => {
            this.loadingDelete = false
            val.loading = false
            console.log('batal header', resp.data)
            const list = useListPenerimaanStore()
            const indexItem = list?.items?.findIndex(a => a.nopenerimaan === val.nopenerimaan)
            if (indexItem >= 0) list.items.splice(indexItem, 1)
            notifSuccess(resp)
            resolve(resp)
          })
          .catch(() => {
            this.loadingDelete = false
            val.loading = false
          })
      })
    },
    deleteRinci(val) {
      console.log('deleteRinci', val)
      this.loadingDelete = true
      val.loading = true
      return new Promise(resolve => {
        api.post('v1/simrs/farmasinew/penerimaan/batal-rinci', val)
          .then(resp => {
            this.loadingDelete = false
            val.loading = false
            console.log('batal rinci', resp.data)
            const list = useListPenerimaanStore()
            const item = list?.items?.find(a => a.nopenerimaan === val.nopenerimaan)
            if (item) {
              const indexRinci = item?.penerimaanrinci?.findIndex(a => a.kdobat === val.kdobat)
              if (indexRinci >= 0) list.items.splice(indexRinci, 1)
              if (item?.penerimaanrinci?.length <= 1) {
                const indexItem = list?.items?.findIndex(a => a.nopenerimaan === val.nopenerimaan)
                if (indexItem >= 0) list.items.splice(indexItem, 1)
              }
            }
            notifSuccess(resp)
            resolve(resp)
          })
          .catch(() => {
            this.loadingDelete = false
            val.loading = false
          })
      })
    }
  }
})
