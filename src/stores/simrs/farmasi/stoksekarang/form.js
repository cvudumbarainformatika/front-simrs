import { defineStore } from 'pinia'
import { date } from 'quasar'
import { api } from 'src/boot/axios'
import { notifErrVue, notifSuccess } from 'src/modules/utils'
import { UseFarmasiStokSekarangTable } from './tabel'

export const UseFarmasiStokSekarangStore = defineStore('form_stok_sekarang', {
  state: () => ({
    loading: false,
    loadingObat: false,
    loadingAmbil: false,
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
    allObats: [],
    nopenerimaans: [],
    stokByNopenerimaans: []
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
    penerimaanSelected(val) {
      console.log('val', val)
      console.log('form', this.form)
      const penerimaan = this.stokByNopenerimaans.find(nop => nop.nopenerimaan === val)
      if (penerimaan) {
        this.setDisp('tglpenerimaan', date.formatDate(penerimaan.tglpenerimaan, 'DD MMMM YYYY'))
        this.setDisp('tglexp', date.formatDate(penerimaan.tglexp, 'DD MMMM YYYY'))
        // this.setDisp('obat', val.nama_obat)

        this.setForm('tglpenerimaan', penerimaan.tglpenerimaan)
        this.setForm('tglexp', penerimaan.tglexp)
        // this.setForm('kdobat', penerimaan.kdobat)
        this.setForm('awal', penerimaan.jumlah)
        this.setForm('harga', penerimaan.harga)
        this.setForm('nobatch', penerimaan.nobatch)
        this.setForm('id', penerimaan?.id)
        this.setForm('nopenerimaan', penerimaan?.nopenerimaan)
        if (parseFloat(this.form?.akhir) >= 0) {
          const akhir = parseFloat(this.form.akhir)
          const awal = parseFloat(this.form.awal)
          this.setForm('penyesuaian', akhir - awal)
        }
      }
      console.log('penerimaan', penerimaan)
    },
    editData(val) {
      this.nopenerimaans = []
      this.edit = true
      // console.log('obat sebelum', val)
      // this.cariObat(val.nama_obat)
      // console.log('obat sesudah', val)
      if (this.form.kdruang !== val.kdruang) return notifErrVue('Tidak bisa melakukan edit karena bukan stok milik Ruangan Anda')
      this.setOpen()
      this.getObatMauDisesuaikan(val).then(resp => {
        console.log('obatnya', resp)
        this.stokByNopenerimaans = resp?.data
        resp?.data.forEach(st => {
          this.nopenerimaans.push(st?.nopenerimaan)
        })
        const stoknya = resp?.data[0]
        console.log('stoknya', stoknya)
        this.setDisp('tglpenerimaan', date.formatDate(stoknya.tglpenerimaan, 'DD MMMM YYYY'))
        this.setDisp('tglexp', date.formatDate(stoknya.tglexp, 'DD MMMM YYYY'))
        this.setDisp('obat', val.nama_obat)

        this.setForm('tglpenerimaan', stoknya.tglpenerimaan)
        this.setForm('tglexp', stoknya.tglexp)
        this.setForm('kdobat', stoknya.kdobat)
        this.setForm('awal', stoknya.jumlah)
        this.setForm('harga', stoknya.harga)
        this.setForm('nobatch', stoknya.nobatch)
        this.setForm('id', stoknya?.id)
        this.setForm('nopenerimaan', stoknya?.nopenerimaan)
      })
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
    getObatMauDisesuaikan(val) {
      val.loading = true
      this.loadingAmbil = true
      const param = { params: val }
      return new Promise(resolve => {
        api.get('v1/simrs/farmasinew/penerimaan/obat-mau-disesuaikan', param)
          .then(resp => {
            console.log('obat', resp?.data)
            val.loading = false
            this.loadingAmbil = false
            resolve(resp?.data)
          })
          .catch(() => {
            val.loading = false
            this.loadingAmbil = false
          })
      })
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
