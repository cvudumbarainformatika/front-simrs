import { defineStore } from 'pinia'
import { date } from 'quasar'
import { api } from 'src/boot/axios'
import { notifSuccess } from 'src/modules/utils'

export const useListPemesananStore = defineStore('list_pemesanan_store', {
  state: () => ({
    loading: false,
    loadingcetak: false,
    items: [],
    cetaks: [],
    meta: {},
    param: {
      nopemesanan: '',
      per_page: 10,
      page: 1,
      tanggal: date.formatDate(Date.now(), 'YYYY-MM-DD'),
      gudang: ['Gd-05010100'] // "Gd-03010100"
    },
    gudangs: [
      { label: 'Gudang Farmasi ( Kamar Obat )', value: 'Gd-05010100' },
      { label: 'Gudang Farmasi ( Floor Stok )', value: 'Gd-03010100' }
    ],
    columns: [
      'nopemesanan',
      'tgl',
      'penyedia',
      'gudang'
    ],
    columnHide: []
  }),
  actions: {
    setParam(key, val) {
      this.param[key] = val
    },
    setSearch(payload) {
      this.setParam('nopemesanan', payload)
      this.setParam('page', 1)
      this.cariRencanaBeli()
    },
    setSearchObat(payload) {
      this.setParam('obat', payload)
      this.setParam('page', 1)
      this.cariRencanaBeli()
    },
    setPage(payload) {
      this.setParam('page', payload)
      this.cariRencanaBeli()
    },
    setPerPage(payload) {
      this.setParam('per_page', payload)
      this.setParam('page', 1)
      this.cariRencanaBeli()
    },
    refreshTable() {
      this.setParam('page', 1)
      this.cariRencanaBeli()
    },
    setGudang(val) {
      this.setParam('gudang', val)
      this.cariRencanaBeli()
    },
    getInitialData() {
      this.cariRencanaBeli()
    },
    cariRencanaBeli() {
      this.loading = true
      console.log('pesanan ', this.param)
      const params = { params: this.param }
      return new Promise(resolve => {
        api.get('v1/simrs/farmasinew/pemesananobat/listpemesanan', params)
          .then(resp => {
            this.loading = false
            console.log('list pesanan', resp)
            this.items = resp.data.data
            this.meta = resp.data
            resolve(resp)
          })
          .catch(() => {
            this.loading = false
          })
      })
    },
    getPemesananBynomor(val) {
      this.loadingcetak = true
      const nomor = {
        nopemesanan: val
      }
      const params = { params: nomor }
      return new Promise(resolve => {
        api.get('v1/simrs/farmasinew/pemesananobat/listpemesananBynomor', params)
          .then(resp => {
            this.loadingcetak = false
            this.cetaks = resp.data
            // this.meta = resp.data
            // resolve(resp)
          })
          .catch(() => {
            this.loading = false
          })
      })
    },
    anggapSelesai(val){
      val.loading=true
      const form={
        nopemesanan:val?.nopemesanan
      }
      return new Promise(resolve=>{
        api.post('v1/simrs/farmasinew/pemesananobat/anggap-selesai-pesanan',form)
        .then(resp=>{
          val.loading=false
          this.cariRencanaBeli()
          notifSuccess(resp)
          resolve(resp)
        })
        .catch(()=>{
          val.loading=false
        })
      })
    }
  }
})
