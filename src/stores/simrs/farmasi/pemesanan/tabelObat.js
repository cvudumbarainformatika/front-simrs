import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'

export const useTabelObatMauDibeliStore = defineStore('tabel_obat_may_di_beli', {
  state: () => ({
    loading: false,
    items: [],
    meta: {},
    params: {},
    columns: [
      'kd_obat',
      'nama_obat',
      'stok_gudang',
      'stok_rs',
      'stok_max_rs',
      'jml_bisa_beli',
      'pabrikan',
      'pbf',
      'jumlah_dipesan',
      'centang'
    ],
    columnHide: []
  }),
  actions: {

    getInitialData() {
      this.getObatMauBeli()
    },
    getObatMauBeli() {
      this.loading = true
      return new Promise(resolve => {
        api.get('v1/simrs/farmasinew/dialogperencanaanobat')
          .then(resp => {
            this.loading = false
            console.log('obat mau dibeli', resp)
            this.items = resp.data
            resolve(resp)
          })
          .catch(() => {
            this.loading = false
          })
      })
    }
  }
})
