import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'

export const useTabelPemesananObatStore = defineStore('tabel_pemesanan_obat', {
  state: () => ({
    loading: false,
    items: [],
    meta: {},
    params: {
      per_page: 10,
      namaobat: '',
      page: 1
    },
    columns: [
      'rencana',
      'obat',
      'stok',
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
    setSearch(payload) {
      this.setParam('namaobat', payload)
      this.setParam('page', 1)
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
            console.log('obat direncakan', resp.data)
            // const temp = resp.data
            // temp.forEach(item => {
            //   item.checked = false
            //   item.stokGudang = item.stokrealgudang.length ? item.stokrealgudang.map(a => parseInt(a.jumlah)).reduce((a, b) => a + b, 0) : 0
            //   item.stokRS = item.stokrealallrs.length ? item.stokrealallrs.map(a => parseInt(a.jumlah)).reduce((a, b) => a + b, 0) : 0
            //   item.stokMaxRS = item.stokmaxrs.length ? item.stokmaxrs.map(a => parseInt(a.jumlah)).reduce((a, b) => a + b, 0) : 0
            //   item.bisaBeli = (item.stokMaxRS - item.stokRS) > 0 ? (item.stokMaxRS - item.stokRS) : 0
            //   item.jumlahBeli = item.bisaBeli
            // })
            this.items = resp.data
            if (this.items.length) {
              this.items.forEach(a => {
                const dipesan = !isNaN(parseFloat(a.jumlahdipesan)) ? parseFloat(a.jumlahdipesan) : 0
                const dpesan = !isNaN(parseFloat(a.jumlahdpesan)) ? parseFloat(a.jumlahdpesan) : 0
                // console.log('dipesan', dipesan, typeof dipesan)
                a.jumlahdipesan = dipesan - dpesan
                a.jumlahdirencanakan = dipesan
              })
            }
            console.log('item', this.items)
            this.meta = resp.data
            // this.setColumns(resp.data.data)
            resolve(resp)
          })
          .catch(() => {
            this.loading = false
          })
      })
    }
  }
})
