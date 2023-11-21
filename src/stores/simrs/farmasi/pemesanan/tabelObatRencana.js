import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'

export const useTabelObatDirencanakaStore = defineStore('tabel_obat_direncanakan', {
  state: () => ({
    loading: false,
    items: [],
    meta: null,
    params: {
      per_page: 10,
      namaobat: '',
      q: '',
      page: 1
    },
    columns: [
      // 'kd_obat',
      'obat',
      'stok',
      // 'stok_gudang',
      // 'stok_rs',
      // 'stok_max_rs',
      // 'jml_bisa_beli',
      // 'pabrikan',
      // 'pabrikan',
      // 'pbf',
      // 'jumlah_dipesan',
      'jumlah',
      'centang'
    ],
    columnHide: []
  }),
  actions: {

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
    setPage(payload) {
      this.params.page = payload
      this.getLists()
    },
    getLists() {
      this.getObatMauBeli()
    },
    getInitialData() {
      this.getObatMauBeli()
    },
    getObatMauBeli() {
      this.loading = true
      const param = { params: this.params }
      return new Promise(resolve => {
        api.get('v1/simrs/farmasinew/dialogperencanaanobat', param)
          .then(resp => {
            this.loading = false
            console.log('obat mau dibeli', resp?.data)
            const temp = resp?.data?.data ?? resp?.data
            temp.forEach(item => {
              item.checked = false
              item.stokGudang = item.stokrealgudang.length ? item.stokrealgudang.map(a => parseInt(a.jumlah)).reduce((a, b) => a + b, 0) : 0
              item.stokGudangFs = item.stokrealgudangfs.length ? item.stokrealgudangfs.map(a => parseInt(a.jumlah)).reduce((a, b) => a + b, 0) : 0
              item.stokGudangKo = item.stokrealgudangko.length ? item.stokrealgudangko.map(a => parseInt(a.jumlah)).reduce((a, b) => a + b, 0) : 0
              item.stokRS = item.stokrealallrs.length ? item.stokrealallrs.map(a => parseInt(a.jumlah)).reduce((a, b) => a + b, 0) : 0
              item.stokMaxRS = item.stokmaxrs.length ? item.stokmaxrs.map(a => parseInt(a.jumlah)).reduce((a, b) => a + b, 0) : 0
              item.sudahDirencanakan = item.perencanaanrinci.length ? item.perencanaanrinci.map(a => parseInt(a.jumlah)).reduce((a, b) => a + b, 0) : 0
              item.bisaBeli = (item.stokMaxRS - item.stokRS - item.sudahDirencanakan) > 0 ? (item.stokMaxRS - item.stokRS - item.sudahDirencanakan) : 0
              item.jumlahBeli = item.bisaBeli
            })
            this.items = temp
            this.meta = resp?.data?.current_page ? resp?.data : null
            resolve(resp)
          })
          .catch(() => {
            this.loading = false
          })
      })
    }
  }
})
