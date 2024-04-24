import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'

export const useReturPenyediaStore = defineStore('retur_penyedia', {
  state: () => ({
    loading: false,
    loadingObat: false,
    loadingDataMauRet: false,
    items: [],
    params: {
      per_page: 10
    },
    form: {},
    kondisis: ['Rusak', 'Kadalwarsa'],
    perusahaans: [],
    obats: [],
    dataMauReturs: []
  }),
  actions: {
    setParams(key, val) {
      this.params[key] = val
    },
    setForm(key, val) {
      this.form[key] = val
    },
    perusahaanSelected(val) {
      this.setParams('kdpbf', val)
      this.getObat()
    },
    obatSelected(val) {
      this.setForm('satuan_k', null)
      this.setForm('kd_obat', val)
      this.setParams('kd_obat', val)
      if (!val) return
      const obat = this.obats.find(ob => ob.kd_obat === val)
      if (obat) {
        this.setForm('satuan_k', obat?.satuan_k)
      }
      this.getDataMauRet()
    },
    getInitialData() {
      this.getPerusahan()
    },
    async getPerusahan() {
      this.perusahaans = []
      this.loadingPerusahaan = true
      const param = { params: this.params }
      await api.get('v1/simrs/penunjang/farmasinew/retur/perusahaan', param)
        .then(resp => {
          this.loadingPerusahaan = false
          this.perusahaans = resp?.data
        })
        .catch(() => { this.loadingPerusahaan = false })
    },
    async getObat() {
      if (!this.params.kdpbf) return
      this.obats = []
      this.loadingObat = true
      const param = { params: this.params }
      await api.get('v1/simrs/penunjang/farmasinew/retur/obat', param)
        .then(resp => {
          this.loadingObat = false
          this.obats = resp?.data
        })
        .catch(() => { this.loadingObat = false })
    },
    async getDataMauRet() {
      this.dataMauReturs = []
      this.loadingDataMauRet = true
      const param = { params: this.params }
      await api.get('v1/simrs/penunjang/farmasinew/retur/ambil-data', param)
        .then(resp => {
          this.loadingDataMauRet = false
          this.dataMauReturs = resp?.data
          if (this.dataMauReturs.length > 0) {
            this.dataMauReturs.forEach(da => {
              da.stok = da.stokterima.map(s => parseFloat(s.jumlah)).reduce((a, b) => a + b, 0)
            })
          }
        })
        .catch(() => { this.loadingDataMauRet = false })
    },
    simpanRetur() {
      console.log('form', this.form)
    }
  }
})
