import { defineStore } from 'pinia'
import { date } from 'quasar'
import { api } from 'src/boot/axios'

export const usePemesananObatStore = defineStore('pemesanan_obat_store', {
  state: () => ({
    loading: false,
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
    columns: [],
    columnHide: ['id', 'created_at', 'updated_at', 'deleted_at']
  }),
  actions: {
    setForm(key, val) {
      this.form[key] = val
    },
    getInitialData() {},

    kirimRencana(val) {
      console.log('kirim pesanan', val)
      this.setForm('noperencanaan', val.noperencanaan)
      this.setForm('kdobat', val.kdobat)
      const data = {
        nopemesanan: this.form.nopemesanan,
        noperencanaan: val.noperencanaan,
        kdobat: val.kdobat,
        stok_real_gudang: val.stokgudang,
        stok_real_rs: val.stokrs,
        stok_max_rs: val.kdobat,
        stomaxkrs: val.kdobat,
        jumlah_bisa_dibeli: val.jumlahdirencanakan,
        jumlahdpesan: val.jumlahdipesan,
        tgl_stok: val.tglperencanaan ? val.tglperencanaan : date.formatDate(Date.now(), 'YYYY-MM-DD'),
        kdpbf: 'wewewew'
      }
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
