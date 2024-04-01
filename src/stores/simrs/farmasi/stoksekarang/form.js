import { defineStore } from 'pinia'
import { date } from 'quasar'
import { api } from 'src/boot/axios'
import { notifErrVue, notifSuccess } from 'src/modules/utils'
import { UseFarmasiStokSekarangTable } from './tabel'

export const UseFarmasiStokSekarangStore = defineStore('form_stok_sekarang', {
  state: () => ({
    loading: false,
    loadingObat: false,
    isOpen: false,
    edit: false,
    params: {
      per_page: 10,
      q: '',
      page: 1
    },
    form: {
      tglpenerimaan: date.formatDate(Date.now(), 'YYYY-MM-DD'),
      kdobat: '',
      jumlah: '',
      kdruang: '',
      harga: '',
      tglexp: null,
      nobatch: ''
    },
    disp: {
      tglpenerimaan: date.formatDate(Date.now(), 'DD MMMM YYYY'),
      tglexp: null,
      kdruang: ''

    },
    obats: [],
    allObats: []
  }),
  actions: {
    setForm(key, val) {
      this.form[key] = val
    },
    setDisp(key, val) {
      this.disp[key] = val
    },
    resetForm() {
      const ruang = this.form.kdruang
      const ruang2 = this.disp.kdruang
      this.disp = {
        tglpenerimaan: date.formatDate(Date.now(), 'DD MMMM YYYY'),
        tglexp: null,
        kdruang: ruang2

      }
      this.form = {
        tglpenerimaan: date.formatDate(Date.now(), 'DD-MM-YYYY'),
        kdobat: '',
        jumlah: '',
        kdruang: ruang,
        harga: '',
        tglexp: '',
        nobatch: ''
      }
    },
    setOpen() {
      this.isOpen = true
    },
    setClose() {
      this.isOpen = false
    },
    cariObat(val) {
      const obat = this.allObats.filter(ob => ob.namaobat.toLowerCase().includes(val.toLowerCase()))
      console.log('filter obat', obat)
      if (obat.length) {
        this.obats = obat
      } else {
        this.params.q = val
        this.getDataObat()
      }
    },
    editData(val) {
      this.edit = true
      this.cariObat(val.nama_obat)
      if (this.form.kdruang !== val.kdruang) return notifErrVue('Tidak bisa melakukan edit karena bukan stok milik Ruangan Anda')
      this.setDisp('tglpenerimaan', date.formatDate(val.tglpenerimaan, 'DD MMMM YYYY'))
      this.setDisp('tglexp', date.formatDate(val.tglpenerimaan, 'DD MMMM YYYY'))

      this.setForm('tglpenerimaan', val.tglpenerimaan)
      this.setForm('tglexp', val.tglexp)
      this.setForm('kdobat', val.kdobat)
      this.setForm('jumlah', val.jumlah)
      this.setForm('harga', val.harga)
      this.setForm('nobatch', val.nobatch)
      this.setForm('id', val?.idx)
      this.setOpen()
    },
    getInitialData() {
      this.getDataObat()
    },
    async getDataObat() {
      this.loadingObat = true
      const param = { params: this.params }
      await api.get('v1/simrs/master/cariObat', param)
        .then(resp => {
          this.loadingObat = false
          console.log('obat', resp)
          this.obats = resp?.data
          this.allObats = resp?.data
        })
        .catch(() => { this.loadingObat = false })
    },
    simpanForm() {
      this.loading = true
      const form = this.form
      form.tglpenerimaan = this.form.tglpenerimaan + date.formatDate(Date.now(), ' HH:mm:ss')
      const url = this.edit ? 'v1/simrs/farmasinew/penerimaan/update-stok-sekarang' : 'v1/simrs/farmasinew/penerimaan/insertsementara/null'
      return new Promise(resolve => {
        api.post(url, form)
          .then(resp => {
            this.loading = false
            console.log('simpan', resp.data)
            this.resetForm()
            this.setClose()
            const table = UseFarmasiStokSekarangTable()
            table.getDataTable()
            notifSuccess(resp)
            resolve(resp)
          })
          .catch(() => { this.loading = false })
      })
    }

  }
})
