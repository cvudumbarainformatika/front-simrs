import { defineStore } from 'pinia'
import { date } from 'quasar'
import { api } from 'src/boot/axios'
import { useTabelPemesananObatStore } from './tabelObat'
import { useListPemesananStore } from './listpesanan'
import { notifSuccess } from 'src/modules/utils'

export const usePemesananObatStore = defineStore('pemesanan_obat_store', {
  state: () => ({
    isOpen: false,
    loading: false,
    loadingPihakTiga: false,
    loadingAnggap:false,
    items: [],
    param: {
      nopemesanan: '',
      per_page: 10,
      tanggal: date.formatDate(Date.now(), 'YYYY-MM-DD')
    },
    form: {
      tanggal: date.formatDate(Date.now(), 'YYYY-MM-DD'),
      nopemesanan: ''
    },
    disp: {
      tanggal: date.formatDate(Date.now(), 'DD MMMM YYYY')
    },
    namaPihakKetiga: '',
    pihakTigas: [],
    columns: [],
    columnHide: ['id', 'created_at', 'updated_at', 'deleted_at']
  }),
  actions: {
    setForm(key, val) {
      this.form[key] = val
    },
    resetForm() {
      this.form = {
        tanggal: date.formatDate(Date.now(), 'YYYY-MM-DD'),
        nopemesanan: ''
      }
      this.namaPihakKetiga = ''
      this.getInitialData()
      const tabel = useTabelPemesananObatStore()
      tabel.getInitialData()
    },
    setClose() {
      this.isOpen = false
      this.resetForm()
    },
    getInitialData() {
      this.getPihakKetiga()
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
    kirimRencana(val) {
      // console.log('kirim pesanan', val)
      const data = {
        nopemesanan: this.form.nopemesanan,
        kdpbf: this.form.kdpbf,
        gudang: this.form.gudang,
        noperencanaan: val.noperencanaan,
        kdobat: val.kdobat,
        kd_ruang: val.kd_ruang,
        harga: val.harga,
        stok_real_gudang: val.stokgudang,
        stok_real_rs: val.stokrs,
        stok_max_rs: val.stomaxkrs,
        jumlah_bisa_dibeli: val.jumlah_bisa_dibeli,
        jumlahdpesan: val.jumlahdipesan,
        jumlahdirencanakan: val.jumlahdirencanakan,
        tgl_stok: val.tglperencanaan ? val.tglperencanaan : date.formatDate(Date.now(), 'YYYY-MM-DD')

      }
      this.setForm('noperencanaan', val.noperencanaan)
      this.setForm('kdobat', val.kdobat)
      console.log('kirim data pesanan', data)
      this.loading = true
      return new Promise(resolve => {
        api.post('v1/simrs/farmasinew/pemesananobat/simpanpemesanan', data)
          .then(resp => {
            console.log(resp)
            this.loading = false
            if (resp.data) {
              this.setForm('nopemesanan', resp?.data?.notrans)

              if (resp.data.tgl_pemesanan) {
                this.setForm('tgl_pemesanan', resp.data.tgl_pemesanan)
                this.disp.tanggal = date.formatDate(resp.data.tgl_pemesanan, 'DD MMMM YYYY')
              }
              val.jumlahallpesan += val.jumlahdipesan
            }

            resolve(resp)
          })
          .catch(() => { this.loading = false })
      })
    },
    selesaiDanKunci() {
      this.loading = true
      const data = {
        nopemesanan: this.form.nopemesanan
      }
      return new Promise(resolve => {
        api.post('v1/simrs/farmasinew/pemesananobat/kuncipemesanan', data)
          .then(resp => {
            this.loading = false
            this.resetForm()
            resolve(resp)
            this.setClose()
          })
          .catch(() => {
            this.loading = false
          })
      })
    },
    kunci(val) {
      this.loading = true
      const data = {
        nopemesanan: val
      }
      const tabel = useTabelPemesananObatStore()
      return new Promise(resolve => {
        api.post('v1/simrs/farmasinew/pemesananobat/kuncipemesanan', data)
          .then(resp => {
            this.loading = false
            tabel.getInitialData()
            resolve(resp)
          })
          .catch(() => {
            this.loading = false
          })
      })
    },
    batal(val) {
      this.loading = true
      val.loading = true
      const tabel = useTabelPemesananObatStore()
      const list = useListPemesananStore()
      return new Promise(resolve => {
        api.post('v1/simrs/farmasinew/pemesananobat/batal', val)
          .then(resp => {
            this.loading = false
            val.loading = false
            tabel.getInitialData()
            list.getInitialData()
            resolve(resp)
          })
          .catch(() => {
            this.loading = false
          })
      })
    },
    batalRinci(val) {
      this.loading = true
      val.loading = true
      const tabel = useTabelPemesananObatStore()
      const list = useListPemesananStore()
      return new Promise(resolve => {
        api.post('v1/simrs/farmasinew/pemesananobat/batal-rinci', val)
          .then(resp => {
            this.loading = false
            val.loading = false
            tabel.getInitialData()
            list.getInitialData()
            resolve(resp)
          })
          .catch(() => {
            this.loading = false
            val.loading = false
          })
      })
    },
    anggapSelesaiRencana(){
      this.loadingAnggap=true
      return new Promise(resolve=>{
        api.post('v1/simrs/farmasinew/pemesananobat/anggap-selesai',this.form)
        .then(resp=>{
          this.loadingAnggap=false
          this.setClose()
          notifSuccess(resp)
          resolve(resp)
        })
        .catch(()=>{
          this.loadingAnggap=false
        })
      })
    }
  }
})
