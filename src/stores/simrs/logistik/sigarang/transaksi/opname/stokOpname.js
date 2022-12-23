import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'

export const useStokOpnameStore = defineStore('stok_opnam_store', {
  state: () => ({
    loading: false,
    items: [],
    // customized data
    form: {
      kode_tempat: null,
      kode_rs: null,
      kode_108: null,
      kode_satuan: null,
      jumlah: null
    },
    params: {
      search: ''
    },
    gudangDepo: []

  }),
  actions: {
    // get initial data
    getInitialData() {
      this.getDataGudangDepo()
    },
    getDataGudangDepo() {
      this.loading = true
      return new Promise(resolve => {
        api.get('v1/transaksi/opname/gudangdepo')
          .then(resp => {
            this.loading = false
            console.log('data gudang', resp)
            this.gudangDepo = resp.data
            resolve(resp)
          })
          .catch(() => {
            this.loading = false
          })
      })
    },
    getDataCurrentStok() {
      this.loading = true
      const data = {
        search: this.params.search,
        gudang: this.form.kode_tempat
      }
      return new Promise(resolve => {
        api.post('v1/transaksi/opname/ambil', data)
          .then(resp => {
            this.loading = false
            console.log('data table', resp)
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
