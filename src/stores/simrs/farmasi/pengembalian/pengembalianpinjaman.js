import { defineStore } from 'pinia'
import { date } from 'quasar'
import { api } from 'src/boot/axios'
import { notifErrVue, notifSuccess } from 'src/modules/utils'

export const usePengembalianPinjamanStore = defineStore('pengembalian_pinjaman', {
  state: () => ({
    loading: false,
    loadingNoper: false,
    params: {
      q: '',
      page: 1,
      per_page: 10
    },
    form: {
      kdpbf: '',
      nopenerimaan: '',
      nopengembalian: '',
      tgl_pengembalian: date.formatDate(new Date(), 'YYYY-MM-DD')
    },
    penyedias: [],
    nopenerimaans: [],
    penerimaanRinci: {}
  }),
  actions: {
    setParams (key, val) {
      this.params[key] = val
    },
    setForm (key, val) {
      this.form[key] = val
    },
    resetForm () {
      const kdruang = this.form.kdruang
      this.form = {
        kdpbf: '',
        nopenerimaan: '',
        nopengembalian: '',
        kdruang,
        tgl_pengembalian: date.formatDate(new Date(), 'YYYY-MM-DD')
      }
      this.penerimaanRinci = {}
    },
    resetParams () {
      this.params = {
        q: '',
        page: 1,
        per_page: 10
      }
    },
    getInitialData () {
      this.getPenyedias()
    },
    getPenyedias () {
      return new Promise(resolve => {
        this.loading = true
        api.get('v1/simrs/penunjang/farmasinew/pengembalian/get-pbf')
          .then(resp => {
            this.loading = false
            console.log('resp', resp?.data)

            this.penyedias = resp?.data?.data ?? []
            resolve(resp)
          })
          .catch(() => { this.loading = false })
      })
    },
    getNopenerimaans () {
      const param = { params: this.params }
      return new Promise(resolve => {
        this.loadingNoper = true
        api.get('v1/simrs/penunjang/farmasinew/pengembalian/get-noper', param)
          .then(resp => {
            this.loadingNoper = false
            console.log('resp', resp?.data)

            this.nopenerimaans = resp?.data?.data ?? []
            resolve(resp)
          })
          .catch(() => { this.loadingNoper = false })
      })
    },
    simpanDetail (item) {
      console.log('form', this.form)
      console.log('item simpan', item)
      if (!item?.jml_dikembalikan) return notifErrVue('Jumlah Dikembalikan belum di isi')
      item.loading = true
      const form = { ...this.form, ...item }
      return new Promise((resolve) => {
        api.post('v1/simrs/penunjang/farmasinew/pengembalian/simpan', form)
          .then(resp => {
            console.log('simpan', resp)
            if (!this.form.nopengembalian) this.setForm('nopengembalian', resp?.data?.nopengembalian)
            notifSuccess(resp)
            delete item.loading
            if (resp?.data?.penerimaanrinci) {
              const index = this.penerimaanRinci?.penerimaanrinci?.findIndex(it => it.id_rincipenerimaan === resp?.data?.penerimaanrinci?.id_rincipenerimaan)
              if (index >= 0) {
                console.log('id', index)
                this.penerimaanRinci.penerimaanrinci[index] = resp?.data?.penerimaanrinci
              }
            }
            resolve(resp)
          })
          .catch(() => {
            delete item.loading
          })
      })
    }

  }
})
