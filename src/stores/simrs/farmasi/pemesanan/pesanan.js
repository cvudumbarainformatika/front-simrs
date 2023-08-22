import { defineStore } from 'pinia'
import { date } from 'quasar'
import { api } from 'src/boot/axios'

export const usePemesananObatStore = defineStore('pemesanan_obat_store', {
  state: () => ({
    loading: false,
    loadingPihakTiga: false,
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
      console.log('kirim pesanan', val)
      const data = {
        nopemesanan: this.form.nopemesanan,
        kdpbf: this.form.kdpbf,
        noperencanaan: val.noperencanaan,
        kdobat: val.kdobat,
        stok_real_gudang: val.stokgudang,
        stok_real_rs: val.stokrs,
        stok_max_rs: val.stomaxkrs,
        jumlah_bisa_dibeli: val.jumlahdirencanakan,
        jumlahdpesan: val.jumlahdipesan,
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
              if (resp.data.notrans) {
                this.setForm('nopemesanan', resp.data.notrans)
              }
              if (resp.data.tgl_pemesanan) {
                this.setForm('tgl_pemesanan', resp.data.tgl_pemesanan)
                this.disp.tanggal = date.formatDate(resp.data.tgl_pemesanan, 'DD MMMM YYYY')
              }
            }
            resolve(resp)
          })
          .catch(() => { this.loading = false })
      })
    }
  }
})
