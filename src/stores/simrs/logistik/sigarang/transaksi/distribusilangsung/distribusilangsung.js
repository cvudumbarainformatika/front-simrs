import { defineStore } from 'pinia'
import { date } from 'quasar'
import { api } from 'src/boot/axios'
import { notifSuccess, uniqueId } from 'src/modules/utils'
import * as storage from 'src/modules/storage'
import { routerInstance } from 'src/boot/router'

export const useTransaksiDistribusiLangsung = defineStore('transaksi_distribusi_langsung', {
  state: () => ({
    loading: false,
    // tabel
    items: [],
    meta: {},
    columns: [],
    columnHide: ['id', 'created_at', 'updated_at'],
    deleteId: null,
    // end of table state
    loadingStokDepo: false,
    loadingRuang: false,
    formIsValid: false,
    detailIsValid: false,
    form: {
      reff: 'DSTL-' + uniqueId(),
      no_distribusi: 'no/DSTL/bulan/tahun',
      tanggal: date.formatDate(Date.now(), 'YYYY-MM-DD HH:mm:ss'),
      pegawai_id: null,
      ruang_tujuan: null,
      jumlah: 0,
      kode_rs: null,
      kode_satuan: null
    },
    barangKerings: [],
    barangBasahes: [],
    ruangs: [],
    options: [
      { nama: 'KERING', value: 'kering' },
      { nama: 'BASAH', value: 'basah' }
    ],
    barang: {},
    params: {
      tipe: 'kering',
      q: '',
      page: 1,
      per_page: 10,
      order_by: 'id',
      sort: 'desc'
    }
  }),
  actions: {
    // table
    setSearch(val) {
      this.params.q = val
      this.getDataTable()
    },
    setPerPage(payload) {
      this.params.per_page = payload
      this.params.page = 1
      this.getDataTable()
    },
    setPage(payload) {
      // console.log('setPage', payload)
      this.params.page = payload
      this.getDataTable()
    },

    setColumns(payload) {
      this.columns = [
        'kode',
        'nama',
        'satuan',
        'sisa_stok'
      ]
    },
    // end of table
    setForm(index, val) {
      this.form[index] = val
    },
    setParam(index, val) {
      this.params[index] = val
    },
    resetForm() {
      this.form.reff = 'DSTL-' + uniqueId()
      this.form.no_distribusi = 'no/DSTL/bulan/tahun'
      this.form.tanggal = date.formatDate(Date.now(), 'YYYY-MM-DD HH:mm:ss')
      this.form.pegawai_id = null
      this.form.ruang_tujuan = null
      this.form.jumlah = 0
      this.form.kode_rs = null
      this.form.kode_satuan = null
    },
    setPegawai() {
      const user = storage.getUser()
      this.form.pegawai_id = user.pegawai_id
      // console.log('user pegwai', user)
    },
    // get initial data
    getInitialData() {
      this.setPegawai()
      // this.getStokDepo()
      this.getRuangs()
      // setting table slug
      const slug = 'DSTL-' + uniqueId()
      const oldSlug = routerInstance.currentRoute.value.params.slug
      this.setParam('reff', oldSlug)
      this.getDataTable().then(data => {
        console.log('table', data)
        if (data === 'ada') {
          this.loading = false
          this.setForm('reff', oldSlug)
          routerInstance.replace({ name: 'sigarang.transaksi.distribusilangsung', params: { slug: oldSlug } })
        } else {
          this.loading = false
          this.setForm('reff', slug)
          routerInstance.replace({ name: 'sigarang.transaksi.distribusilangsung', params: { slug } })
        }
      })
    },
    getDataTable() {
      this.loading = true
      const params = { params: this.params }
      return new Promise(resolve => {
        // api.get('v1/transaksi/distribusilangsung/index', params)
        api.get('v1/transaksi/distribusilangsung/get-barang-with-transaksi', params)
          .then(resp => {
            const data = resp.data.data.data
            console.log('items', resp.data)
            this.items = data
            this.meta = resp.data.meta
            if (data.transaksi) {
              resolve('ada')
            } else {
              resolve('get new')
            }
            this.loading = false
            this.setColumns()
          })
      })
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
    },
    getRuangs(val) {
      const params = {
        params: {
          q: val || ''
        }
      }
      this.loadingRuang = true
      return new Promise(resolve => {
        api.get('v1/transaksi/distribusilangsung/get-ruang', params)
          .then(resp => {
            this.loadingRuang = false
            console.log('runag', resp)
            this.ruangs = resp.data
            resolve(resp)
          })
          .catch(() => { this.loadingRuang = false })
      })
    },
    saveList() {
      this.loading = true
      return new Promise(resolve => {
        api.post('v1/transaksi/distribusilangsung/store', this.form)
          .then(resp => {
            console.log('save', resp)
            this.loading = false
            this.formIsValid = false
            this.detailIsValid = false
            notifSuccess(resp)
            resolve(resp)
          })
          .catch(() => { this.loading = false })
      })
    }
  }
})
