import { defineStore } from 'pinia'
import { date } from 'quasar'
import { api } from 'src/boot/axios'
import { notifErrVue, notifSuccess } from 'src/modules/utils'

export const useFarmasiPemakaianRuanganStore = defineStore('farmasi_pemakaian_ruangan', {
  state: () => ({
    loading: false,
    meta: {},
    items: [],
    params: {
      q: '',
      page: 1,
      per_page: 10,
      kdruang: ''
    },
    form: {
      nopemakaian: '',
      kdruang: '',
      tgl: date.formatDate(Date.now(), 'YYYY-MM-DD'),
      obats: []
    }
  }),
  actions: {
    setParam(key, val) {
      this.params[key] = val
    },
    setForm(key, val) {
      this.form[key] = val
    },
    setSearch(val) {
      this.setParam('q', val)
      this.setParam('page', 1)
      this.getStokRuangan()
    },
    setPerPage(val) {
      this.setParam('per_page', val)
      this.setParam('page', 1)
      this.getStokRuangan()
    },
    setPage(val) {
      this.setParam('page', val)
      this.getStokRuangan()
    },
    refresh() {
      this.setParam('page', 1)
      this.getStokRuangan()
    },
    metanidata() {
      if (this.items?.length) {
        this?.items?.forEach(item => {
          item.checked = false
        })

        if (this.form.obats.length) {
          this.form.obats.forEach(obat => {
            const ada = this.items.find(a => a.id === obat.id)
            if (ada) {
              ada.checked = true
              ada.dipakai = obat?.dipakai ?? 0
            }
          })
        }
      }
    },
    resetForm() {
      this.setForm('nopemakaian', '')
      this.setForm('obats', [])
      this.setForm('tgl', date.formatDate(Date.now(), 'YYYY-MM-DD'))
    },
    getInitialData() {
      this.getStokRuangan()
    },
    async getStokRuangan() {
      const param = { params: this.params }
      this.loading = true
      await api.get('v1/simrs/penunjang/farmasinew/ruangan/get-stok-ruangan', param)
        .then(resp => {
          this.loading = false
          console.log('stok ruangan', resp.data)
          this.items = resp?.data?.data ?? resp?.data
          this.meta = resp?.data?.data ? resp?.data : {}
          this.metanidata()
        })
        .catch(() => { this.loading = false })
    },
    simpanPemakaian() {
      console.log('simpan pemakaian', this.form)
      if (this.form.obats.length <= 0) return notifErrVue('tidak ada input obat dipakai')
      this.loading = true
      return new Promise(resolve => {
        api.post('v1/simrs/penunjang/farmasinew/ruangan/simpan', this.form)
          .then(resp => {
            this.loading = false
            console.log('pakai', resp?.data)
            this.setForm('nopemakaian', resp?.data?.head?.nopemakaian)
            this.setForm('obats', [])
            notifSuccess(resp)
            this.getStokRuangan()
            resolve(resp)
          })
          .catch(() => { this.loading = false })
      })
    },
    selesaiPemakaian(val) {
      console.log('selesai pemakaian ', val)
      if (!this.form.nopemakaian) return notifErrVue('Nomor Pemakaian tidak ada')
      this.loading = true
      return new Promise(resolve => {
        api.post('v1/simrs/penunjang/farmasinew/ruangan/selesai', this.form)
          .then(resp => {
            this.loading = false
            this.resetForm()
            notifSuccess(resp)
            this.getStokRuangan()
            resolve(resp)
          })
          .catch(() => { this.loading = false })
      })
    }
  }
})
