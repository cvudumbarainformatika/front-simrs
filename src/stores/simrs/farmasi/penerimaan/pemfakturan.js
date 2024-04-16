import { defineStore } from 'pinia'
import { date } from 'quasar'
import { api } from 'src/boot/axios'
import { notifErrVue, notifSuccess } from 'src/modules/utils'
import { useListPenerimaanStore } from './listpenerimaan'

export const usePemfakturanFarmasiStore = defineStore('farmasi_pemfakturan', {
  state: () => ({
    isOpen: false,
    loading: false,
    loadingPihakTiga: false,
    loadingKunci: false,
    loadingDelete: false,
    items: null,
    form: {
      // nopenerimaan: '',
      // tglpenerimaan: date.formatDate(Date.now(), 'YYYY-MM-DD'),
      // batasbayar: null,
      // tglsurat: date.formatDate(Date.now(), 'YYYY-MM-DD')
    },
    disp: {
      // tanggal: date.formatDate(Date.now(), 'DD MMMM YYYY'),
      // batasbayar: null,
      // surat: date.formatDate(Date.now(), 'DD MMMM YYYY')
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
        // nopenerimaan: '',
        // tglpenerimaan: date.formatDate(Date.now(), 'YYYY-MM-DD'),
        // batasbayar: null,
        // tglsurat: date.formatDate(Date.now(), 'YYYY-MM-DD')
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
      this.details = val?.penerimaanrinci ?? []
      this.namaPenyedia = val?.pihakketiga

      this.setForm('jenissurat', 'Faktur')
      this.setForm('nopenerimaan', val?.nopenerimaan)
      this.setForm('tglpenerimaan', val?.tglpenerimaan)
      this.setForm('batasbayar', val?.batasbayar)
      this.setForm('tglsurat', val?.tglsurat)
      this.setForm('pengirim', val?.pengirim)

      this.setDisp('tanggal', date.formatDate(val?.tglpenerimaan, 'DD MMMM YYYY'))
      this.setDisp('batasbayar', date.formatDate(val?.batasbayar, 'DD MMMM YYYY'))
      this.setDisp('surat', date.formatDate(val?.tglsurat, 'DD MMMM YYYY'))
      console.log('pemesanan selected ', val)
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
      console.log('pen', pen)
      if (pen.length) {
        pen.forEach(item => {
          item?.penerimaanrinci?.forEach(rinc => {
            rinc.adaPPN = false
            if (parseFloat(rinc?.ppn) > 0) rinc.adaPPN = true
          })
        })
      }
      this.pemesanans = pen
      this.filteredPemesanans = pen
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
      // this.setForm('batasbayar', date.formatDate(this.setNexMonth(), 'YYYY-MM-DD'))
      // this.setDisp('batasbayar', date.formatDate(this.setNexMonth(), 'DD MMMM YYYY'))

      this.ambilPemesanan()
      // this.getPihakKetiga()
    },
    // cari obat
    // getDataObat() {
    //   this.loading = true
    //   const params = { params: { q: this.filterObat } }
    //   return new Promise(resolve => {
    //     api.get('v1/simrs/master/cariObat', params)
    //       .then(resp => {
    //         this.loading = false
    //         this.obats = resp.data
    //         console.log(resp)
    //         resolve(resp)
    //       })
    //       .catch(() => { this.loading = false })
    //   })
    // },
    // getPihakKetiga() {
    //   const param = { params: { nama: this.namaPihakKetiga } }
    //   this.loadingPihakTiga = true
    //   return new Promise(resolve => {
    //     api.get('v1/simrs/farmasinew/pemesananobat/pihakketiga', param)
    //       .then(resp => {
    //         this.loadingPihakTiga = false
    //         console.log('pihak tiga', resp.data)
    //         this.pihakTigas = resp.data
    //         resolve(resp)
    //       })
    //   })
    // },
    ambilPemesanan(val) {
      this.loading = !val
      const param = { params: this.params }
      return new Promise(resolve => {
        api.get('v1/simrs/penunjang/farmasinew/gudang/list-belum-faktur', param)
          .then(resp => {
            this.loading = false
            console.log('ambil pemesanan', resp)
            const data = resp?.data?.data ?? resp?.data
            this.metanirinci(data)
            // this.pemesanans = data
            // this.filteredPemesanans = data
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
        api.post('v1/simrs/penunjang/farmasinew/gudang/simpan', this.form)
          .then(resp => {
            this.loading = false
            notifSuccess(resp)
            // if (resp.data.heder) {
            //   if (resp.data.heder.nopenerimaan) {
            //     this.setForm('nopenerimaan', resp.data.heder.nopenerimaan)
            //   }
            // }
            this.form.tglpenerimaan = tgl
            resolve(resp)
          })
          .catch(() => {
            this.loading = false
          })
      })
    },
    simpanHeader() {
      this.loading = true
      const tgl = this.form.tglpenerimaan
      this.form.tglpenerimaan = tgl + date.formatDate(Date.now(), ' HH:mm:ss')
      return new Promise(resolve => {
        api.post('v1/simrs/penunjang/farmasinew/gudang/simpan-header', this.form)
          .then(resp => {
            this.loading = false
            console.log('sudah simpan header', resp.data)
            notifSuccess(resp)

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
