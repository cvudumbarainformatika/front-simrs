import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'

export const useListPemakaianObatKonsinyasiStore = defineStore('list_pemakaian_obat_konsinyasi', {
  state: () => ({
    loading: false,
    loadingPenyedia: false,
    items: [],
    params: {
      q: '',
      page: 1,
      per_page: 50
    },
    form: {
      notrans: '',
      items: []
    },
    penyedias: []
  }),
  actions: {
    setForm (key, val) {
      this.form[key] = val
    },
    setParams (key, val) {
      this.params[key] = val
    },
    getInitialData () {
      this.getData()
      this.getPenyedia()
    },
    metaniItem () {
      this.items.forEach(item => {
        item.checked = false
        if (item.header) {
          const resep = item?.resep?.find(x => x.noreg === item.header.noreg)
          if (resep) item.header.resep = resep
        }
        const penerimaan = item?.penerimaanrinci?.find(x => x.kdobat === item?.kd_obat && x.nopenerimaan === item?.nopenerimaan)
        item.penerimaan = penerimaan ?? {}
        const rinciresep = item?.rincian?.find(x => x.kdobat === item?.kd_obat && x.noresep === item?.noresep)
        item.reseprinci = rinciresep ?? {}
        item.harga = rinciresep?.harga_beli ?? 0
        item.subtotal = parseFloat(item?.jumlah_resep) * parseFloat(item?.harga)
      })
    },
    async getData () {
      this.loading = true
      const param = { params: this.params }
      await api.get('v1/simrs/penunjang/farmasinew/gudang/list-pemakaian-konsinyasi', param)
        .then(resp => {
          this.loading = false
          console.log('list kon', resp?.data)
          this.items = resp?.data?.data ?? resp?.data
          if (this.items.length) this.metaniItem()
        })
        .catch(() => {
          this.loading = false
        })
    },
    async getPenyedia () {
      this.loadingPenyedia = true
      const param = { params: this.params }
      await api.get('v1/simrs/penunjang/farmasinew/gudang/penyedia', param)
        .then(resp => {
          this.loadingPenyedia = false
          console.log('list peny', resp?.data)
          this.penyedias = resp?.data?.data ?? resp?.data
        })
        .catch(() => {
          this.loadingPenyedia = false
        })
    }
  }
})
