import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'

export const useLaporanPemakaianObatStore = defineStore('laporan_pemakaian_obat', {
  state: () => ({
    loading: false,
    items: [],
    meta: {},
    params: {
      q: '',
      page: 1,
      per_page: 10
    },
    columns: [
      'obat',
      'jenis_belanja',
      'kode_108',
      'harga',
      'pbf',
      'stok_awal',
      'masuk',
      'keluar_umum',
      'keluar_bpjs',
      'keluar_sktm',
      'keluar_tagihan',
      'keluar_lain'
    ]
  }),
  actions: {
    setParams (key, val) {
      this.params[key] = val
    },
    setSearch (val) {
      this.setParams('q', val)
      this.setParams('page', 1)
      this.getDataTable()
    },
    setPerPage (val) {
      this.setParams('per_page', val)
      this.setParams('page', 1)
      this.getDataTable()
    },
    setPage (val) {
      this.setParams('page', val)
      this.getDataTable()
    },
    refreshTable () {
      this.getDataTable()
    },

    getDataTable () {
      this.loading = true
      const param = { params: this.params }
      return new Promise(resolve => {
        api.get('v1/simrs/laporan/farmasi/pemakaian/get-pemakaian', param)
          .then(resp => {
            this.loading = false
            console.log('master maping', resp?.data)
            this.items = resp?.data?.data ?? resp?.data
            this.meta = resp?.data?.meta ?? resp?.data
            resolve(resp)
          })
          .catch(() => { this.loading = false })
      })
    }
  }
})
