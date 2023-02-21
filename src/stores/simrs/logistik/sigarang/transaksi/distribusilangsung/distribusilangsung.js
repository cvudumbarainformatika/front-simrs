import { defineStore } from 'pinia'
import { date } from 'quasar'
import { api } from 'src/boot/axios'
import { uniqueId } from 'src/modules/utils'
import * as storage from 'src/modules/storage'

export const useTransaksiDistribusiLangsung = defineStore('transaksi_distribusi_langsung', {
  state: () => ({
    loading: false,
    loadingStokDepo: false,
    form: {
      reff: 'DSTL-' + uniqueId(),
      no_distribusi: 'xxx/DSTL/XXX',
      tanggal: date.formatDate(Date.now(), 'YYYY-MM-DD HH:mm:ss'),
      pegawai_id: null
    },
    barangKerings: [],
    barangBasahes: [],
    options: [
      { nama: 'KERING', value: 'kering' },
      { nama: 'BASAH', value: 'basah' }
    ],
    tipe: 'kering'
  }),
  actions: {
    setForm(index, val) {
      this.form[index] = val
    },
    resetForm() {
      this.form.reff = 'DSTL-' + uniqueId()
      this.form.no_distribusi = 'xxx/DSTL/XXX'
      this.form.tanggal = date.formatDate(Date.now(), 'YYYY-MM-DD HH:mm:ss')
      this.form.pegawai_id = null
    },
    setPegawai() {
      const user = storage.getUser()
      this.form.pegawai_id = user.pegawai_id
      // console.log('user pegwai', user)
    },
    // get initial data
    getInitialData() {
      this.setPegawai()
      this.getStokDepo()
    },
    getStokDepo() {
      this.loadingStokDepo = true
      return new Promise(resolve => {
        api.get('v1/transaksi/distribusilangsung/get-stok-depo')
          .then(resp => {
            console.log('stok depo', resp.data)
            const temp = resp.data.map(apem => {
              apem.tipe = apem.barang ? apem.barang.tipe : 'kering'
              apem.nama = apem.barang ? apem.barang.nama : ''
              apem.namaDepo = apem.depo ? apem.depo.nama : ''
              apem.namaSatuan = apem.satuan ? apem.satuan.nama : ''
              return apem
            })
            this.barangBasahes = temp.filter(apem => { return apem.tipe === 'basah' })
            this.barangKerings = temp.filter(apem => { return apem.tipe === 'kering' })
            console.log('stok basah', this.barangBasahes)
            console.log('stok kering', this.barangKerings)
            this.loadingStokDepo = false
            resolve(resp)
          })
          .catch(() => { this.loadingStokDepo = false })
      })
    }
  }
})
