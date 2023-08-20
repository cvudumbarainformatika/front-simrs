import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'

export const useTabelPemesananObatStore = defineStore('tabel_pemesanan_obat', {
  state: () => ({
    loading: false,
    items: [],
    meta: {},
    params: {
      per_page: 10,
      page: 1
    },
    columns: [
      'kd_obat',
      'nama_obat',
      'stok',
      // 'stok_gudang',
      // 'stok_rs',
      // 'stok_max_rs',
      // 'jml_bisa_beli',
      'pabrikan',
      // 'pabrikan',
      // 'pbf',
      // 'jumlah_dipesan',
      'jumlah',
      'centang'
    ],
    columnHide: []
  }),
  actions: {
    setParam(key, val) {
      this.params[key] = val
    },
    setPerPage(payload) {
      this.setParam('per_page', payload)
      this.setParam('page', 1)
      this.getObatMauBeli()
    },
    setPage(payload) {
      this.setParam('page', payload)
      this.getObatMauBeli()
    },

    setColumns (payload) {
      const thumb = payload.map((x) => Object.keys(x))
      this.columns = thumb[0]
      // console.log('columns', this.columns)
    },
    getInitialData() {
      this.getObatMauBeli()
    },
    getObatMauBeli() {
      this.loading = true
      const param = { params: this.params }
      return new Promise(resolve => {
        api.get('v1/simrs/farmasinew/pemesananobat/dialogrencanabeli', param)
          .then(resp => {
            this.loading = false
            console.log('obat direncakan', resp)
            // const temp = resp.data
            // temp.forEach(item => {
            //   item.checked = false
            //   item.stokGudang = item.stokrealgudang.length ? item.stokrealgudang.map(a => parseInt(a.jumlah)).reduce((a, b) => a + b, 0) : 0
            //   item.stokRS = item.stokrealallrs.length ? item.stokrealallrs.map(a => parseInt(a.jumlah)).reduce((a, b) => a + b, 0) : 0
            //   item.stokMaxRS = item.stokmaxrs.length ? item.stokmaxrs.map(a => parseInt(a.jumlah)).reduce((a, b) => a + b, 0) : 0
            //   item.bisaBeli = (item.stokMaxRS - item.stokRS) > 0 ? (item.stokMaxRS - item.stokRS) : 0
            //   item.jumlahBeli = item.bisaBeli
            // })
            this.items = resp.data.data
            this.meta = resp.data
            this.setColumns(resp.data.data)
            resolve(resp)
          })
          .catch(() => {
            this.loading = false
          })
      })
    }
  }
})
