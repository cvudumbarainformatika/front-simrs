import { defineStore } from 'pinia'
import { date } from 'quasar'
import { api } from 'src/boot/axios'
import { notifErrVue, notifSuccess } from 'src/modules/utils'
import { UseFarmasiStokTable } from './tabel'

export const UseFarmasiStokStore = defineStore('form_stok', {
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
      nobatch: '',
      tgl_input_fisik: date.formatDate(Date.now(), 'YYYY-MM-DD'),
      jamInput: date.formatDate(Date.now(), 'HH:mm:ss')
    },
    disp: {
      tglpenerimaan: date.formatDate(Date.now(), 'DD MMMM YYYY'),
      tglexp: null,
      kdruang: '',
      tglInputFisik: date.formatDate(Date.now(), 'DD MMMM YYYY')

    },
    obats: [],
    allObats: []
  }),
  actions: {
    setForm (key, val) {
      this.form[key] = val
    },
    setDisp (key, val) {
      this.disp[key] = val
    },
    resetForm () {
      const ruang = this.form.kdruang
      const ruang2 = this.disp.kdruang
      this.disp = {
        tglpenerimaan: date.formatDate(Date.now(), 'DD MMMM YYYY'),
        tglexp: null,
        kdruang: ruang2,
        tglInputFisik: date.formatDate(Date.now(), 'DD MMMM YYYY')

      }
      this.form = {
        tglpenerimaan: date.formatDate(Date.now(), 'YYYY-MM-DD'),
        kdobat: '',
        jumlah: '',
        kdruang: ruang,
        harga: '',
        tglexp: '',
        nobatch: '',
        tgl_input_fisik: date.formatDate(Date.now(), 'YYYY-MM-DD'),
        jamInput: date.formatDate(Date.now(), 'HH:mm:ss')
      }
    },
    setOpen () {
      this.isOpen = true
    },
    setClose () {
      this.isOpen = false
    },
    cariObat (val) {
      const obat = this.allObats.filter(ob => ob.namaobat.toLowerCase().includes(val.toLowerCase()))
      console.log('filter obat', obat)
      if (obat.length) {
        this.obats = obat
      }
      else {
        this.params.q = val
        this.getDataObat()
      }
    },
    editData (val) {
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
    getInitialData () {
      this.getDataObat()
    },
    async getDataObat () {
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
    simpanForm () {
      this.loading = true
      const form = this.form
      form.tglpenerimaan = this.form.tglpenerimaan + date.formatDate(Date.now(), ' HH:mm:ss')
      const url = this.edit ? 'v1/simrs/farmasinew/penerimaan/updatestoksementara' : 'v1/simrs/farmasinew/penerimaan/insertsementara'
      return new Promise(resolve => {
        api.post(url, form)
          .then(resp => {
            this.loading = false
            console.log('simpan', resp.data)
            this.resetForm()
            this.setClose()
            const table = UseFarmasiStokTable()
            table.getDataTable(true)
            notifSuccess(resp)
            resolve(resp)
          })
          .catch(() => { this.loading = false })
      })
    },
    simpanFormNew () {
      this.loading = true
      const form = this.form
      form.tglpenerimaan = this.form.tglpenerimaan + date.formatDate(Date.now(), ' HH:mm:ss')
      // const url = this.edit ? 'v1/simrs/farmasinew/penerimaan/updatestoksementara' : 'v1/simrs/farmasinew/penerimaan/insertsementara'
      return new Promise(resolve => {
        api.post('v1/simrs/farmasinew/penerimaan/simpan-baru', form)
          .then(resp => {
            this.loading = false
            console.log('simpan', resp.data)
            this.resetForm()
            this.setClose()
            const table = UseFarmasiStokTable()
            table.getDataTable()
            notifSuccess(resp)
            resolve(resp)
          })
          .catch(() => { this.loading = false })
      })
    },
    simpanFisik (val) {
      val.loadingSimpan = true
      return new Promise(resolve => {
        api.post('v1/simrs/farmasinew/penerimaan/simpan-fisik', val)
          .then(resp => {
            val.loadingSimpan = false
            console.log('simpan', resp.data)
            notifSuccess(resp)
            const table = UseFarmasiStokTable()
            table.getDataTable()
            resolve(resp)
          })
          .catch(() => { val.loadingSimpan = false })
      })
    }

  }
})
