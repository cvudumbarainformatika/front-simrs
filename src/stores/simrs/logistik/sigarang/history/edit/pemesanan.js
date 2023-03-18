import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
import { notifSuccess } from 'src/modules/utils'
import { useHistoryTable } from '../table'

export const useEditPemesananStore = defineStore('edit_pemesanan', {
  state: () => ({
    isOpen: false,
    index: null,
    loading: false,
    loadingDetailPenerimaan: false,
    item: {},
    form: {
      nama: 'PEMESANAN'
    },
    tableHis: useHistoryTable()
  }),
  /* catatan:
  * barang yang sudah diterima ada penerimaan tidak bisa di edit
  * no pemesanan, kontrak yang sudah ada penerimaan tidak bisa di edit
  * jika ada penambahan data, maka jika status pemesanan sebelumnya adalah 4, berubah jadi 3
  * sebliknya, jika ada pengurangan maka cek secara keseluruhan, jika semua barang sudah diterima maka status berubah jadi 4
  */
  actions: {
    setForm(key, val) {
      this.form[key] = val
    },
    setOpen() {
      this.isOpen = !this.isOpen
    },
    assignForm(val, i) {
      console.log(val)
      this.index = i
      this.item = val
      this.setForm('reff', val.reff)
      this.setForm('kontrak', val.kontrak)
      this.setForm('nomor', val.nomor)
      this.setForm('tanggal', val.tanggal)
      this.setForm('kode_perusahaan', val.kode_perusahaan)
      this.getItemsDetail()
    },
    // api related function
    // cari barang yang sudah diterima
    getItemsDetail() {
      // ambil kode barang di detail
      if (this.item.details.length) {
        const kodeBarang = this.item.details.map(a => a.kode_rs)
        this.setForm('kodeBarang', kodeBarang)
        // console.log('get detail ', kodeBarang)
        // console.log('get detail form', this.form)
        // ambil barang yang sudah ada penerimaan
        const params = { params: this.form }
        this.loadingDetailPenerimaan = true
        return new Promise(resolve => {
          api.get('v1/transaksi/penerimaan/cari-detail-penerimaan', params)
            .then(resp => {
              this.loadingDetailPenerimaan = false
              if (resp.status === 200 && resp.data.length) {
                this.item.details.forEach(b => {
                  const bar = resp.data.filter(a => a.kode_rs === b.kode_rs).map(m => m.qty).reduce((x, y) => x + y, 0)
                  b.diterima = bar
                })
                console.log('resp', resp.data)
                console.log('item', this.item)
              }
              resolve(resp)
            })
            .catch(() => {
              this.loadingDetailPenerimaan = false
            })
        })
      }
    },
    // edit header saja
    simpanHeader() {
      console.log('form', this.form)
      this.loading = true
      return new Promise((resolve, reject) => {
        api.post('v1/transaksi/pemesanan/store', this.form)
          .then(resp => {
            this.loading = false
            console.log('edit pemesanan ', resp)
            if (resp.status === 200) {
              const key = Object.keys(resp.data.data)
              key.forEach(k => {
                if (resp.data.data[k] !== this.tableHis.items[this.index][k]) {
                  console.log('ga sama', this.tableHis.items[this.index][k], resp.data.data[k])
                  this.tableHis.items[this.index][k] = resp.data.data[k]
                }
              })
            }
            notifSuccess(resp)
            resolve(resp)
          }).catch(err => {
            this.loading = false
            reject(err)
          })
      })
    }
  }

})
