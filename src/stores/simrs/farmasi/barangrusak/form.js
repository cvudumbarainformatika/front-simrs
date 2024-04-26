import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'

export const useFormBarangRusakStore = defineStore('form_barang_rusak', {
  state: () => ({
    loading: false,
    loadingObat: false,
    loadingBatch: false,
    loadingPenerimaan: false,
    params: {
      per_page: 10
    },
    form: {
    },
    obats: [],
    batchs: [],
    penerimaans: [],
    statuses: ['Rusak', 'Kadalwarsa'],
    penerimaan: {}
  }),
  actions: {
    setParams(key, val) {
      this.params[key] = val
    },
    setForm(key, val) {
      this.form[key] = val
    },
    obatSelected(val) {
      this.setParams('kdobat', val)
      this.setParams('nobatch', null)
      this.form = {}
      this.penerimaan = {}
      const obat = this.obats.find(a => a.kd_obat === val)
      if (obat) {
        this.setForm('satuan_kcl', obat?.satuan_k)
        this.setForm('satuan_bsr', obat?.satuan_b)
        this.setForm('tstok', obat?.jumlah)
      }
      this.cariNoBatch()
    },
    batchSelected(val) {
      this.setParams('nobatch', val)
      this.cariPenerimaan()
    },
    penerimaanSelected(val) {
      console.log('penerimaan terpilih', val)
      this.setParams('penerimaan', val)
      this.setForm('nopenerimaan', val)
      delete this.form.isi
      delete this.form.stok
      this.penerimaan = {}
      if (val === null) {
        this.penerimaan = {}
        return
      }
      const trm = this.penerimaans.find(t => t.nopenerimaan === val)
      if (trm) {
        this.penerimaan = trm
        this.setForm('isi', trm?.penerimaan?.penerimaanrinci[0]?.isi ?? 0)
        this.setForm('stok', parseFloat(trm.total))
      }
      // this.cariPenerimaan()
    },

    getInitialData() {
      this.cariObat()
    },
    async cariObat() {
      this.obats = []
      const param = { params: this.params }
      this.loadingObat = true
      await api.get('v1/simrs/penunjang/farmasinew/barangrusak/obat', param)
        .then(resp => {
          this.loadingObat = false
          this.obats = resp?.data
        })
        .catch(() => {
          this.loadingObat = false
        })
    },
    async cariNoBatch() {
      this.batchs = []
      const param = { params: this.params }
      this.loadingBatch = true
      await api.get('v1/simrs/penunjang/farmasinew/barangrusak/bacth', param)
        .then(resp => {
          this.loadingBatch = false
          this.batchs = resp?.data
        })
        .catch(() => {
          this.loadingBatch = false
        })
    },
    async cariPenerimaan() {
      this.penerimaans = []
      const param = { params: this.params }
      this.loadingPenerimaan = true
      await api.get('v1/simrs/penunjang/farmasinew/barangrusak/penerimaan', param)
        .then(resp => {
          this.loadingPenerimaan = false
          this.penerimaans = resp?.data
          if (this.penerimaans?.length) {
            this.penerimaans.forEach(trm => {
              trm.pbf = trm?.penerimaan?.pihakketiga.nama ?? 'PBF Tidak ditemukan'
            })
          }
          if (this.penerimaans?.length === 1) {
            this.setForm('isi', this.penerimaans[0]?.penerimaan?.penerimaanrinci[0]?.isi ?? 0)
            this.setForm('nopenerimaan', this.penerimaans[0]?.nopenerimaan)
            this.setForm('stok', parseFloat(this.penerimaans[0]?.total))
            this.setParams('penerimaan', this.penerimaans[0]?.nopenerimaan)
            this.penerimaan = this.penerimaans[0]
          }
        })
        .catch(() => {
          this.loadingPenerimaan = false
        })
    }
  }
})
