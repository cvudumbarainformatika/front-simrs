import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
import { notifErrVue } from 'src/modules/utils'

export const usePerbaikanHargaFarmasiStore = defineStore('perbaikan_harga_farmasi', {
  state: () => ({
    loading: false,
    data: [],
    dataDetail: [],
    params: {
      kdruang: ''
    }
  }),
  actions: {
    async getData (payload) {
      this.loading = true
      try {
        const resp = await api.post('/v1/simrs/farmasinew/stok/fr-get-perbaikan-harga', payload)
        this.data = resp.data.data
      }
      catch (err) {
        notifErrVue(err, 'Gagal mengambil data perbaikan harga')
      }
      finally {
        this.loading = false
      }
    },
    async getDataDetail (payload) {
      this.loading = true
      try {
        const resp = await api.post('/v1/simrs/farmasinew/stok/fr-get-perbaikan-harga-detail', payload)
        this.dataDetail = resp.data.data
      }
      catch (err) {
        notifErrVue(err, 'Gagal mengambil data perbaikan harga detail')
      }
      finally {
        this.loading = false
      }
    },
    async simpanPerbaikanHarga (item) {
      this.loading = true
      try {
        const resp = await api.post('/v1/simrs/farmasinew/stok/fr-simpan-perbaikan-harga', item)
        console.log('resp', resp)
        notifErrVue('success', 'Berhasil menyimpan perbaikan harga')
        this.getData(this.params)
      }
      catch (err) {
        notifErrVue(err, 'Gagal menyimpan perbaikan harga')
      }
      finally {
        this.loading = false
      }
    }
  }
})
