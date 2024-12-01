import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
import { notifSuccess } from 'src/modules/utils'

export const useFormBarangRusakStore = defineStore('form_barang_rusak', {
  state: () => ({
    loading: false,
    loadingObat: false,
    loadingBatch: false,
    loadingPenerimaan: false,
    items: [],
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
    setParams (key, val) {
      this.params[key] = val
    },
    setForm (key, val) {
      this.form[key] = val
    },
    resetForm () {
      const gudang = this.form.kd_ruang
      this.form = {}
      this.penerimaan = {}
      this.setForm('kd_ruang', gudang)
    },
    obatSelected (val) {
      this.setParams('kdobat', val)
      this.setParams('nobatch', null)
      this.resetForm()
      const obat = this.obats.find(a => a.kd_obat === val)
      if (obat) {
        this.setForm('satuan_kcl', obat?.satuan_k)
        this.setForm('satuan_bsr', obat?.satuan_b)
        this.setForm('tstok', obat?.jumlah)
      }
      this.cariNoBatch()
    },
    batchSelected (val) {
      this.setParams('nobatch', val)
      this.cariPenerimaan()
    },
    penerimaanSelected (val) {
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
        this.setForm('harga_net', trm?.harga?.harga)
        this.setForm('kdpbf', trm?.penerimaan?.kdpbf)
        this.setForm('tglexp', trm?.penerimaan?.tglexp)
        this.setForm('nopenerimaan', trm?.nopenerimaan)
        this.setForm('stok', parseFloat(trm.total))
      }
      // this.cariPenerimaan()
    },

    getInitialData () {
      this.cariObat()
      this.listBelum()
    },
    async listBelum () {
      this.items = []
      this.loading = true
      await api.get('v1/simrs/penunjang/farmasinew/barangrusak/list-belum')
        .then(resp => {
          this.loading = false
          this.items = resp?.data
        })
        .catch(() => {
          this.loading = false
        })
    },
    async cariObat () {
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
    async cariNoBatch () {
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
    async cariPenerimaan () {
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
            this.setForm('harga_net', this.penerimaans[0]?.harga?.harga ?? this.penerimaans[0]?.hargastok)
            this.setForm('kdpbf', this.penerimaans[0]?.penerimaan?.kdpbf)
            this.setForm('nopenerimaan', this.penerimaans[0]?.nopenerimaan)
            this.setForm('stok', parseFloat(this.penerimaans[0]?.total))
            this.setForm('tglexp', this.penerimaans[0]?.tglexp)
            this.setParams('penerimaan', this.penerimaans[0]?.nopenerimaan)
            this.penerimaan = this.penerimaans[0]
          }
        })
        .catch(() => {
          this.loadingPenerimaan = false
        })
    },
    simpan () {
      this.loading = true
      return new Promise(resolve => {
        api.post('v1/simrs/penunjang/farmasinew/barangrusak/simpan', this.form)
          .then(resp => {
            this.loading = false
            console.log('simpan', resp?.data)
            notifSuccess(resp)
            const data = resp?.data?.data
            const form = this.form
            const index = this.items.findIndex(it => it.kd_obat === form.kd_obat && it.nopenerimaan === form.nopenerimaan && it.nobatch === form.no_batch)
            if (index >= 0) this.items[index] = data
            else this.items.push(data)
            resolve(resp)
          })
          .catch(() => { this.loading = false })
      })
    },
    async deleteRinci (item) {
      item.loading = true
      await api.post('v1/simrs/penunjang/farmasinew/barangrusak/hapus', item)
        .then(resp => {
          item.loading = false
          const index = this.items.findIndex(it => it.kd_obat === item.kd_obat && it.nopenerimaan === item.nopenerimaan && it.nobatch === item.nobatch)
          if (index >= 0) this.items.splice(index, 1)
          console.log('hapus', resp?.data)
        })
        .catch(() => {
          item.loading = false
        })
    },
    async kunci (item) {
      item.loadingKunci = true
      item.kd_ruang = this.form.kd_ruang
      await api.post('v1/simrs/penunjang/farmasinew/barangrusak/kunci', item)
        .then(resp => {
          item.loadingKunci = false
          item.kunci = '1'
          console.log('kunci', resp?.data)
        })
        .catch(() => {
          item.loadingKunci = false
        })
    }
  }
})
