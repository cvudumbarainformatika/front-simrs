import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
import { findWithAttr, notifErrVue, notifSuccess } from 'src/modules/utils'
import { useHistoryTable } from '../table'

export const useEditPemesananStore = defineStore('edit_pemesanan', {
  state: () => ({
    isOpen: false,
    index: null,
    loading: false,
    loadingHapus: false,
    loadingTambah: false,
    loadingDetailPenerimaan: false,
    item: {},
    form: {
      nama: 'PEMESANAN'
    },
    params: {
      q: '',
      per_page: 11,
      order_by: 'id',
      sort: 'desc'
    },
    tableHis: useHistoryTable(),
    newDetail: false,
    isEditDetail: false,
    formOpen: false,
    barangLoading: false,
    barangs: [],
    barangrs: [],
    stoks: [],
    stok: {},
    minMaxDepos: [],
    editKontrak: false,
    useStatus: [
      { nama: 'Draft', nilai: 1 },
      { nama: 'Menunggu diterima Gudang', nilai: 2 },
      { nama: 'Diterima Sebagian', nilai: 3 },
      { nama: 'Diterima Seluruhnya', nilai: 4 }
    ],
    statuses: []

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
    openForm() {
      this.formOpen = !this.formOpen
    },
    setNewDetail() {
      this.newDetail = !this.newDetail
    },
    setEditDetail() {
      this.isEditDetail = !this.isEditDetail
    },
    assignForm(val, i) {
      // console.log(val)
      this.index = i
      this.item = val
      this.setForm('reff', val.reff)
      this.setForm('kontrak', val.kontrak)
      this.setForm('nomor', val.nomor)
      this.setForm('tanggal', val.tanggal)
      this.setForm('kode_perusahaan', val.kode_perusahaan)
      this.getItemsDetail()
    },
    clearFormBarang() {
      const temp = {
        reff: this.form.reff,
        kodeBarang: this.form.kodeBarang,
        kontrak: this.form.kontrak,
        nomor: this.form.nomor,
        nama: this.form.nama,
        tanggal: this.form.tanggal
      }
      this.form = temp
    },
    barangSelected (val) {
      const barang = this.barangs
      this.barangrs = barang.filter(data => {
        return data.kode === val
      })
      this.form.kode_rs = this.barangrs[0].kode
      this.form.nama_barang = this.barangrs[0].nama
      this.form.kode_108 = this.barangrs[0].kode_108
      this.form.uraian_108 = this.barangrs[0].uraian_108
      this.form.kode_50 = this.barangrs[0].kode_50
      this.form.uraian_50 = this.barangrs[0].uraian_50
      this.form.kode_satuan = this.barangrs[0].kode_satuan
      // satuan_besar, isi, satuan_kecil
      if (this.barangrs[0].satuan) {
        this.form.satuan_besar = this.barangrs[0].satuan.nama
        this.form.isi = this.barangrs[0].satuan.isi
        this.form.satuan_kecil = this.barangrs[0].satuan.kecil
      }
      const dataStok = this.stoks.filter(s => {
        return s.kode_rs === val
      })
      const minMax = this.minMaxDepos.filter(s => {
        return s.kode_rs === val // hardcode kode gudang Habis pakai gedung 2
      })
      if (dataStok.length) {
        this.stok.sisaStok = dataStok[0].sisa_stok
      }
      if (minMax.length) {
        this.stok.max_stok = minMax[0].max_stok
      }
      if (this.stok.max_stok && this.stok.sisaStok) {
        this.stok.maxBeli = this.stok.max_stok - this.stok.sisaStok
      } else if (!this.stok.max_stok && this.stok.sisaStok) {
        this.stok.maxBeli = null
      } else if (this.stok.max_stok && !this.stok.sisaStok) {
        this.stok.maxBeli = this.stok.max_stok
      } else {
        this.stok.maxBeli = null
      }
      // console.log('form', this.form)
      // console.log('maping', maping)
    },
    kontrakSelected(val) {
      this.form.kontrak = val
      this.editKontrak = false
    },
    updateHarga () {
      // console.log('stok', this.stok)

      if (this.stok.max_stok) {
        if (this.stok.sisaStok) {
          this.stok.maxBeli = this.stok.max_stok - this.stok.sisaStok
        }
      }
      if (this.stok.maxBeli) {
        if (this.stok.maxBeli > 0) {
          if (parseFloat(this.form.jumlah) > this.stok.maxBeli) {
            notifErrVue('Jumlah Pembelian tidak boleh melebihi jumlah maksimal pembelian')
            this.form.jumlah = this.stok.maxBeli
          }
        }
      }
      this.form.sub_total = (this.form.harga ? parseFloat(this.form.harga) : 0) * (this.form.jumlah ? this.form.jumlah : 0)
      // this.setToday()
      console.log('subtotal', this.form.sub_total)
      console.log('harga', this.form.harga)
      console.log('qty', this.form.jumlah)
    },
    getInitData() {
      this.getMinMaxDepo()
      this.getCurrentStok()
      this.getMapingBarang()
    },
    // api related function

    // get data minMaxDepo
    getMinMaxDepo() {
      this.loading = true
      return new Promise(resolve => {
        api.get('v1/minmaxdepostok/all')
          .then(resp => {
            this.loading = false
            // console.log('minmaxdepo', resp)
            this.minMaxDepos = resp.data
            resolve(resp)
          })
          .catch(() => {
            this.loading = false
          })
      })
    },
    // get data stok
    getCurrentStok() {
      this.loading = true
      return new Promise(resolve => {
        api.get('v1/stok/current-by-gudang')
          .then(resp => {
            this.loading = false
            // console.log('stok', resp)
            this.stoks = resp.data
            resolve(resp)
          })
          .catch(() => {
            this.loading = false
          })
      })
    },
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
              console.log('resp', resp.data.length)
              if (resp.status === 200 && resp.data.length) {
                this.item.details.forEach(b => {
                  const bar = resp.data.filter(a => a.kode_rs === b.kode_rs).map(m => m.qty).reduce((x, y) => x + y, 0)
                  b.diterima = bar
                })

                // console.log('item', this.item)
              }
              const adaPenerimaan = this.item.details.filter(anu => anu.diterima > 0)
              if (adaPenerimaan.length) {
                this.statuses = this.useStatus.filter(anu => (anu.nilai === 3 || anu.nilai === 4))
              } else {
                this.statuses = this.useStatus
              }
              console.log('statuses', this.statuses)
              resolve(resp)
            })
            .catch(() => {
              this.loadingDetailPenerimaan = false
            })
        })
      }
    },
    // ambil mapping barang
    getMapingBarang () {
      this.barangLoading = true
      const params = { params: this.params }
      return new Promise(resolve => {
        api.get('v1/barangrs/index-pemesanan', params)
          .then(resp => {
            // console.log('maping barang', resp.data)
            this.barangLoading = false
            this.barangs = resp.data.data
            // console.log(resp.data)
            resolve(resp)
          })
          .catch(() => { this.barangLoading = false })
      })
    },
    // edit header saja
    simpanHeader() {
      // console.log('form', this.form)
      this.loading = true
      return new Promise((resolve, reject) => {
        api.post('v1/transaksi/pemesanan/store', this.form)
          .then(resp => {
            this.loading = false
            // console.log('edit pemesanan ', resp)
            if (resp.status === 200) {
              const key = Object.keys(resp.data.data)
              key.forEach(k => {
                if (resp.data.data[k] !== this.tableHis.items[this.index][k]) {
                  // console.log('ga sama', this.tableHis.items[this.index][k], resp.data.data[k])
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
    },
    // ganti status
    gantiStatus(val) {
      console.log('ganti status', val)
      console.log('ganti status item', this.item)
      const form = {
        id: this.item.id,
        status: val.nilai
      }
      this.loading = true
      return new Promise(resolve => {
        api.post('v1/transaksi/pemesanan/ganti-status', form)
          .then(resp => {
            this.loading = false
            console.log('resp', resp.data)
            notifSuccess(resp)
            resolve(resp.data)
            this.item.status = resp.data.data.status
            const index = findWithAttr(this.tableHis.items, 'id', this.item.id)
            if (index >= 0) {
              console.log(this.tableHis.items[index])
              this.tableHis.items[index].status = resp.data.data.status
            }
          })
          .catch(() => { this.loading = false })
      })
    },
    // tambah barang
    storeDetail() {
      // console.log('store form', this.form)
      this.loadingTambah = true
      return new Promise((resolve, reject) => {
        api.post('v1/transaksi/pemesanan/store-details', this.form)
          .then(resp => {
            this.loadingTambah = false
            // console.log('store detail', resp)
            resolve(resp)
          })
          .catch(err => {
            this.loadingTambah = false
            reject(err)
          })
      })
    },
    // hapus barang
    deleteDetail(val) {
      // console.log('hapus param', val)
      this.loadingHapus = true
      return new Promise(resolve => {
        api.post('v1/transaksi/pemesanan/delete-details', val)
          .then(resp => {
            this.loadingHapus = false
            resolve(resp.data)
          })
          .catch(() => { this.loadingHapus = false })
      })
    }
  }

})
