import { defineStore } from 'pinia'
import { notifErrVue, notifSuccess } from 'src/modules/utils'
import { api } from 'boot/axios'
// import { useTransaksiPemesananTable } from './table'
import { dateFullFormat } from 'src/modules/formatter'
import { routerInstance } from 'src/boot/router'
// import { useMasterMapingBarangForm } from '../../master/mapingbarang/form'
import { date } from 'quasar'

export const useTransaksiPemensananForm = defineStore('transaksi_pemensanan_form', {
  state: () => ({
    isOpen: false,
    kontrakOpen: false,
    nama: 'PEMESANAN',
    tglManual: false,
    form: {
    },
    terima: {
      index: '000.3.2/02.0',
      bidang: '',
      nomer_urut: '',
      jenis_surat_per_bidang: 'SP-',
      nomer_skpd: '1.02.2.14.0.00.03.0301',
      bulan: 'I',
      inputBulan: date.formatDate(Date.now(), 'MM'),
      tahun: date.formatDate(Date.now(), 'YYYY')
    },
    display: {},
    loadingKontrak: false,
    mapingLoading: false,
    kontrakPekerjaans: [],
    mapingBarangs: [],
    barangrs: [],
    barangrses: [],
    barang108: [],
    rekening50s: [],
    satuan: [],
    params: {
      q: '',
      per_page: 11,
      order_by: 'id',
      sort: 'desc'
    },
    loading: false,
    loadingTambah: false,
    loadingFinish: false,
    needToEdit: false,
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
      this.terima = {
        index: '000.3.2/02.0',
        nomer_urut: '01',
        bidang: '',
        jenis_surat_per_bidang: 'SP-',
        nomer_skpd: '1.02.2.14.0.00.03.0301',
        bulan: 'I',
        inputBulan: date.formatDate(Date.now(), 'MM'),
        tahun: date.formatDate(Date.now(), 'YYYY')
      }
      const columns = [

        'reff',
        'nomor',
        'kontrak',
        'kode_rs',
        'kode_108',
        'uraian_108',
        'kode_50',
        'uraian_50',
        'kode_satuan',
        'satuan_besar',
        'satuan_kecil',
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
      this.setForm('merk', '')
      this.setForm('isi', 1)
      this.setToday()
      this.setNomorPemesanan()
    },
    resetInput () {
      const columns = [
        'kode_rs',
        'kode_108',
        'uraian_108',
        'kode_50',
        'uraian_50',
        'kode_satuan',
        'satuan_besar',
        'satuan_kecil',
        'qty',
        'harga',
        'sub_total'
      ]
      for (let i = 0; i < columns.length; i++) {
        this.setForm(columns[i], null)
      }
      this.setForm('isi', 1)
      this.setForm('merk', '')
    },
    setBulan(apem) {
      const val = parseInt(apem)
      // console.log('val bulan', typeof val === 'number', val, val === 2)
      if (val === 1) {
        this.terima.bulan = 'I'
      } else if (val === 2) {
        this.terima.bulan = 'II'
      } else if (val === 3) {
        this.terima.bulan = 'III'
      } else if (val === 4) {
        this.terima.bulan = 'IV'
      } else if (val === 5) {
        this.terima.bulan = 'V'
      } else if (val === 6) {
        this.terima.bulan = 'VI'
      } else if (val === 7) {
        this.terima.bulan = 'VII'
      } else if (val === 8) {
        this.terima.bulan = 'VIII'
      } else if (val === 9) {
        this.terima.bulan = 'IX'
      } else if (val === 10) {
        this.terima.bulan = 'X'
      } else if (val === 11) {
        this.terima.bulan = 'XI'
      } else if (val === 12) {
        this.terima.bulan = 'XII'
      } else {
        this.terima.bulan = apem === '' || val > 12 ? 'I' : apem
      }
    },
    bidang() {
      this.terima.jenis_surat_per_bidang = 'SP-' + this.terima.bidang
      this.setNomorPemesanan()
    },
    bulan(val) {
      this.setBulan(val)
      this.setNomorPemesanan()
    },
    setNomorPemesanan() {
      this.setBulan(this.terima.inputBulan)
      // Index/nomer urut/jenis surat per bidang/nomer skpd/bulan/tahun
      this.form.nomor = this.terima.index + '/' + this.terima.nomer_urut + '/' + this.terima.jenis_surat_per_bidang + '/' + this.terima.nomer_skpd + '/' + this.terima.bulan + '/' + this.terima.tahun
    },
    setToday () {
      // const date = new Date()
      // const year = date.getFullYear()
      // const month = ('0' + (date.getMonth() + 1)).slice(-2)
      // const day = ('0' + date.getDate()).slice(-2)
      // const formatDb = year + '-' + month + '-' + day
      // const formatTp = day + '/' + month + '/' + year
      this.form.tanggal = this.tglManual ? this.form.tanggal : date.formatDate(Date.now(), 'YYYY-MM-DD')
      this.tanggalTampil = dateFullFormat(this.form.tanggal)
      // console.log('set tanggal', this.form.tanggal)
    },
    setForm (nama, val) {
      this.form[nama] = val
    },
    setKontrak() {
      this.kontrakOpen = !this.kontrakOpen
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
      // console.log('store set tanggal', val)
      this.form.tanggal = val
      this.tanggalTampil = dateFullFormat(this.form.tanggal)
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
          if (parseFloat(this.form.qty) > this.stok.maxBeli) {
            notifErrVue('Jumlah Pembelian tidak boleh melebihi jumlah maksimal pembelian')
            this.form.qty = this.stok.maxBeli
          }
        }
      }
      this.form.sub_total = (this.form.harga ? parseFloat(this.form.harga) : 0) * (this.form.qty ? this.form.qty : 0)
      // this.setToday()
    },
    newData (val) {
      // this.resetFORM()
      this.edited = false
      this.isOpen = true
      // if (!this.form.nomor) { this.form.nomor = 'PSN-' + uniqueId() }
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

      // console.log('kontrak val', val)
      this.form.kode_perusahaan = val.kodeperusahaan
      this.namaPerusahaan = val.namaperusahaan
      this.form.kontrak = val.nokontrakx
      this.kontrakOpen = true
      // if (!val || !this.kontrakPekerjaans.length) return
      // const result = this.kontrakPekerjaans.filter(data => {
      //   return data.nokontrakx === val
      // })
      // console.log('kontrak all', this.kontrakPekerjaans)
      // console.log('kontrak selected', result[0])
      // this.form.nokontrak = val
      // this.setToday()
      // console.log('kotrak', val)
      // console.log('result', result)
    },
    barangSelected (val) {
      const barang = this.mapingBarangs
      this.newData()
      // console.log('barang rs', mappingBarang.barangrses)
      // console.log('barang 108', mappingBarang.barang108s)
      // console.log('satuan', mappingBarang.satuans)
      this.barangrs = barang.filter(data => {
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
      // console.log('dataStok', dataStok)
      // console.log('minmax', minMax)
      // console.log('form', this.form)
      // console.log('maping', maping)
    },
    // rekening 50
    rekening50Selected(val) {
      // console.log('rekening 50', val)
      const kode = this.rekening50s.filter(data => { return data.kode === val })
      // console.log('rekening 50 selected', kode)
      this.setForm('kode_50', val)
      this.setForm('uraian_50', kode[0].uraian)
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
              // console.log('kontrak', resp.data)
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
      this.mapingLoading = true
      const params = { params: this.params }
      return new Promise(resolve => {
        // api.get('v1/mapingbarang/maping', params)
        api.get('v1/barangrs/index-pemesanan', params)
          .then(resp => {
            this.mapingLoading = false
            // console.log('maping barang', resp.data)
            this.mapingBarangs = resp.data.data
            // console.log(resp.data)
            resolve(resp)
          })
          .catch(() => { this.mapingLoading = false })
      })
    },
    // ambil rekening 50
    getRekening50 () {
      const params = { params: this.params }
      return new Promise(resolve => {
        // api.get('v1/mapingbarang/maping', params)
        api.get('v1/rekening50/semua', params)
          .then(resp => {
            // console.log('rekening 50', resp.data)
            this.rekening50s = resp.data
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
            // console.log('stok', resp)
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
            // console.log('aku error', err.response)
            const keys = Object.keys(err.response.data)
            keys.forEach(k => {
              if (k === 'nomor') {
                notifErrVue('Nomor pemesanan sudah ada Sebelumnya')
              }
            })
            // console.log('aku error key', keys)
            this.loadingTambah = false
            // this.isOpen = false
            this.loadingFinish = false
            this.loading = false
            reject(err)
          })
      })
    }
  }
})
