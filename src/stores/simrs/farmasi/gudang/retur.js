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
    form: {
      nopemesanan: ''
    },
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
      this.setForm('kd_obat', val)
      this.setParams('kd_obat', val)
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
        })
        .catch(() => { this.loadingDataMauRet = false })
    }
  }
})
