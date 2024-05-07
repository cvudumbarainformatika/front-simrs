import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'

export const UseFarmasiStokTable = defineStore('tabel_stok', {
  state: () => ({
    loading: false,
    params: {
      per_page: 10,
      q: '',
      page: 1
    },
    meta: {},
    items: [],
    gudangs: [],
    columns: [
      'obat',
      // 'penerimaan',
      'stok'
    ],
    columnHide: [],
    keterangan: 'keterangan'
  }),
  actions: {
    setParam(key, val) {
      this.params[key] = val
    },
    setQ(payload) {
      this.params.page = 1
      this.params.q = payload
      this.getLists()
    },
    setPerPage(payload) {
      this.params.page = 1
      this.params.per_page = payload
      this.getLists()
    },
    setPeriodik(val) {
      const { to, from } = val
      this.params.to = to
      this.params.from = from
      console.log('periodik', to)
      this.getLists()
    },
    setPeriode(val) {
      this.params.to = val
      this.params.from = val
      console.log('periodik', val)
      this.getLists()
    },
    setPage(payload) {
      this.params.page = payload
      this.getLists()
    },
    getLists() {
      this.getDataTable()
    },
    getInitialData() {
      this.getDataTable()
      this.getDataGudang()
    },
    async getDataGudang() {
      this.loading = true
      const param = { params: { q: '' } }
      await api.get('v1/gudang/gudang', param)
        .then(resp => {
          this.loading = false
          console.log('gudang ', resp.data)
          this.gudangs = resp?.data
        })
        .catch(() => { this.loading = false })
    },
    getDataTable() {
      this.loading = true
      const param = { params: this.params }
      return new Promise(resolve => {
        api.get('v1/simrs/farmasinew/penerimaan/liststokreal', param)
          .then(resp => {
            this.loading = false
            console.log('setok ', resp.data)
            this.items = resp?.data?.data ?? resp?.data
            this.meta = resp.data?.meta
            resolve(resp)
          })
          .catch(() => { this.loading = false })
      })
    }
  }
})
