import { defineStore } from 'pinia'
import { notifErrVue, notifSuccess, uniqueId } from 'src/modules/utils'
import { api } from 'boot/axios'
// import { useTransaksiPemesananTable } from './table'
import { dateFullFormat, olahUang } from 'src/modules/formatter'
import { routerInstance } from 'src/boot/router'
import { useMasterMapingBarangForm } from '../../master/mapingbarang/form'

export const useTransaksiPemensananForm = defineStore('transaksi_pemensanan_form', {
  state: () => ({
    isOpen: false,
    nama: 'PEMESANAN',
    form: {
    },
    display: {},
    loadingKontrak: false,
    kontrakPekerjaans: [],
    mapingBarangs: [],
    barangrs: [],
    barang108: [],
    satuan: [],
    params: {
      q: '',
      order_by: 'id',
      sort: 'desc'
    },
    loading: false,
    loadingTambah: false,
    loadingFinish: false,
    minMaxDepos: [],
    stoks: [],
    stok: {},
    tanggalTampil: null
  }),
  actions: {
    // local related actions
    resetFORM () {
      this.form = {}
      this.display = {}
      this.namaPerusahaan = ''
      this.barangrs = []
      this.barang108 = []
      this.satuan = []
      this.tanggalTampil = null
      const columns = [
        'tanggal',
        'reff',
        'nomor',
        'kontrak',
        'kode_rs',
        'kode_108',
        'kode_satuan',
        'kode_perusahaan',
        'kode_gudang',
        'kode_stok_minimun',
        'qty',
        'harga',
        'status',
        'sub_total'
      ]
      for (let i = 0; i < columns.length; i++) {
        this.setForm(columns[i], null)
      }
    },
    resetInput () {
      const columns = [
        'kode_rs',
        'kode_108',
        'kode_satuan',
        'qty',
        'harga',
        'sub_total'
      ]
      for (let i = 0; i < columns.length; i++) {
        this.setForm(columns[i], null)
      }
    },
    setToday () {
      const date = new Date()
      const year = date.getFullYear()
      const month = ('0' + (date.getMonth() + 1)).slice(-2)
      const day = ('0' + date.getDate()).slice(-2)
      const formatDb = year + '-' + month + '-' + day
      // const formatTp = day + '/' + month + '/' + year
      this.form.tanggal = formatDb
      this.tanggalTampil = dateFullFormat(formatDb)
    },
    setForm (nama, val) {
      this.form[nama] = val
    },
    setOpen () {
      this.setToday()
      this.isOpen = true
    },
    setClose () {
      this.setToday()
      this.isOpen = false
    },
    setTanggal(val) {
      // console.log(val)
      this.tanggalTampil = dateFullFormat(this.form.tanggal)
    },
    updateHarga () {
      console.log('stok', this.stok)
      if (this.stok.max_stok) {
        if (this.stok.sisaStok) {
          this.stok.maxBeli = this.stok.max_stok - this.stok.sisaStok
        }
      }
      if (this.stok.maxBeli) {
        if (this.stok.maxBeli > 0) {
          if (parseInt(this.form.qty) > this.stok.maxBeli) {
            notifErrVue('Jumlah Pembelian tidak boleh melebihi jumlah maksimal pembelian')
            this.form.qty = this.stok.maxBeli
          }
        }
      }
      this.form.sub_total = (this.form.harga ? olahUang(this.form.harga) : 0) * (this.form.qty ? this.form.qty : 0)
      this.setToday()
    },
    newData (val) {
      // this.resetFORM()
      this.edited = false
      this.isOpen = true
      if (!this.form.nomor) { this.form.nomor = 'PSN-' + uniqueId() }
      if (!this.form.reff) { this.form.reff = routerInstance.currentRoute.value.params.slug }
      // console.log('new data', val)
    },
    editData (val) {
      this.edited = true
      const keys = Object.keys(val)
      keys.forEach((key, index) => {
        this.setForm(key, val[key])
      })
      this.barangSelected(this.form.kode_rs)
      this.kontrakSelected(this.form.kontrak)
      this.tanggalTampil = dateFullFormat(this.form.tanggal)
      // kecuali yang ada di object user
      this.isOpen = true
    },
    kontrakSelected (val) {
      // console.log('kontrak', !this.kontrakPekerjaans.length)
      if (!val || !this.kontrakPekerjaans.length) return
      const result = this.kontrakPekerjaans.filter(data => {
        return data.nokontrakx === val
      })
      // console.log('kontrak val', val)
      // console.log('kontrak all', this.kontrakPekerjaans)
      // console.log('kontrak selected', result[0])
      this.form.kode_perusahaan = result[0].kodeperusahaan
      this.namaPerusahaan = result[0].namaperusahaan
      this.form.kontrak = val
      // this.form.nokontrak = val
      this.setToday()
      // console.log('kotrak', val)
      // console.log('result', result)
    },
    barangSelected (val) {
      this.newData()
      const mappingBarang = useMasterMapingBarangForm()
      // console.log('barang rs', mappingBarang.barangrses)
      // console.log('barang 108', mappingBarang.barang108s)
      // console.log('satuan', mappingBarang.satuans)
      this.barangrs = mappingBarang.barangrses.filter(data => {
        return data.kode === val
      })
      // const maping = this.mapingBarangs.filter(data => {
      //   return data.kode_rs === val
      // })
      // this.barang108 = mappingBarang.barang108s.filter(data => {
      //   return data.kode === maping[0].kode_108
      // })
      // this.satuan = mappingBarang.satuans.filter(data => {
      //   return data.kode === maping[0].kode_satuan
      // })
      this.form.kode_rs = this.barangrs[0].kode
      this.form.kode_108 = this.barangrs[0].kode_108
      this.form.kode_satuan = this.barangrs[0].kode_satuan

      const dataStok = this.stoks.filter(s => {
        return s.kode_rs === val
      })
      const minMax = this.minMaxDepos.filter(s => {
        // return s.kode_rs === val && s.kode_depo === 'Gd-02010100' // hardcode kode gudang Habis pakai gedung 2
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
      console.log('dataStok', dataStok)
      console.log('minmax', minMax)
      console.log('form', this.form)
      // console.log('maping', maping)
    },
    // api related actions
    // ambil data kontrak pekerjaan
    getKontrakPekerjaan () {
      if (!this.kontrakPekerjaans.length) {
        this.loadingKontrak = true
        const params = { params: this.params }
        return new Promise((resolve, reject) => {
          api.get('v1/kontrak-pengerjaan/kontrak-aktif', params)
            .then(resp => {
              console.log('kontrak', resp.data)
              this.loadingKontrak = false
              if (resp.status === 200) {
                this.kontrakPekerjaans = resp.data
              }
              resolve(resp)
            }).catch(err => {
              this.loadingKontrak = false
              reject(err)
            })
        })
      }
    },
    // ambil mapping barang
    getMapingBarang () {
      const params = { params: this.params }
      return new Promise(resolve => {
        // api.get('v1/mapingbarang/maping', params)
        api.get('v1/barangrs/barangrs', params)
          .then(resp => {
            console.log('maping barang', resp.data)
            this.mapingBarangs = resp.data
            // console.log(resp.data)
            resolve(resp)
          })
      })
    },
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
            console.log('stok', resp)
            this.stoks = resp.data

            resolve(resp)
          })
          .catch(() => {
            this.loading = false
          })
      })
    },
    // tambah
    saveForm () {
      this.loading = true
      this.form.nama = this.nama
      return new Promise((resolve, reject) => {
        api
          .post('v1/transaksi/pemesanan/store', this.form)
          .then((resp) => {
            // console.log('save data   ', resp)
            notifSuccess(resp)
            // if()
            // const table = useTransaksiPemesananTable()
            // table.getDataTable().then(() => {
            //   console.log('table updated')
            // })
            resolve(resp)
            this.loading = false
            this.isOpen = false

            this.loadingTambah = false
            this.loadingFinish = false
          })
          .catch((err) => {
            this.loadingTambah = false
            this.isOpen = false
            this.loadingFinish = false
            this.loading = false
            reject(err)
          })
      })
    }
  }
})
