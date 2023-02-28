import { defineStore } from 'pinia'
import { date } from 'quasar'
import { api } from 'src/boot/axios'
import { notifErrVue, notifSuccess } from 'src/modules/utils'

export const useStokOpnameStore = defineStore('stok_opnam_store', {
  state: () => ({
    loading: false,
    kartuStokOpen: false,
    isOpen: false,
    allItems: [],
    items: [],
    meta: {},
    columns: [],
    columnHide: ['id', 'created_at', 'updated_at'],
    // customized data
    form: {
      kode_tempat: null,
      kode_rs: null,
      kode_108: null,
      kode_satuan: null,
      jumlah: null,
      selisih: 0
    },
    params: {
      search: '',
      q: '',
      page: 1,
      per_page: 10,
      order_by: 'created_at',
      sort: 'asc',
      bulan: date.formatDate(Date.now(), 'MM'),
      tahun: date.formatDate(Date.now(), 'YYYY')
    },
    kode_tempat: null,
    gudangDepo: [
      { nama: 'Semua', kode: null }
    ],
    months: [
      { nama: 'Januari', value: '01' },
      { nama: 'Februari', value: '02' },
      { nama: 'Maret', value: '03' },
      { nama: 'April', value: '04' },
      { nama: 'Mei', value: '05' },
      { nama: 'Juni', value: '06' },
      { nama: 'Juli', value: '07' },
      { nama: 'Agustus', value: '08' },
      { nama: 'September', value: '09' },
      { nama: 'Oktober', value: '10' },
      { nama: 'November', value: '11' },
      { nama: 'Desember', value: '12' }

    ]

  }),
  actions: {
    resetForm() {
      this.form = {
        id: null,
        jumlah: null,
        selisih: 0
      }
    },
    setOpen() {
      this.isOpen = !this.isOpen
    },
    // table function -- start
    setForm(key, val) {
      this.form[key] = val
    },
    setParams(key, val) {
      this.params[key] = val
    },
    setMeta(payload) {
      delete payload.data
      this.meta = payload
    },
    setItems(payload) {
      this.items = payload
    },
    deletesData(payload) {
      this.deleteId = payload
      // console.log('id', payload)
      this.deleteData()
    },
    // local table related function
    setSearch(val) {
      this.params.q = val
      if (this.form.kode_tempat !== null) {
        this.getDataByDepo()
      } else {
        this.getDataTable()
      }
    },
    setOder(payload) {
      this.params.order_by = payload
      this.params.sort === 'desc'
        ? (this.params.sort = 'asc')
        : (this.params.sort = 'desc')
      if (this.form.kode_tempat !== null) {
        this.getDataByDepo()
      } else {
        this.getDataTable()
      }
    },
    setPage(payload) {
      // console.log('setPage', payload)
      this.params.page = payload
      if (this.form.kode_tempat !== null) {
        this.getDataByDepo()
      } else {
        this.getDataTable()
      }
    },
    setPerPage(payload) {
      this.params.per_page = payload
      this.params.page = 1
      if (this.form.kode_tempat !== null) {
        this.getDataByDepo()
      } else {
        this.getDataTable()
      }
    },
    setColumns(payload) {
      // if (!payload) return
      // const thumb = payload.map((x) => Object.keys(x))
      // this.columns = thumb[0]
      this.columns = [
        'tanggal',
        'tempat',
        'kode_rs',
        'barang',
        'no_penerimaan',
        'uraian',
        'sisa_stok',
        'totalStok',
        'stok_transaksi',
        'selisih'
      ]
      // this.columns.sort()
      // this.columns.reverse()
      // console.log('columns', this.columns)
    },

    refreshTable() {
      this.params.page = 1
      this.getDataTable()
    },
    // data form related

    newData() {
      this.resetFORM()
      this.edited = false
      this.isOpen = !this.isOpen
    },
    editData(val) {
      this.edited = true
      const keys = Object.keys(val)
      keys.forEach((key, index) => {
        this.setForm(key, val[key])
      })
      console.log('edit', this.form)
      // kecuali yang ada di object user
      this.isOpen = !this.isOpen
    },
    // table function -- end
    // get initial data
    getInitialData() {
      this.getDataGudangDepo()
      this.getDataTable()
    },
    prosesData(val) {
      console.log('proses data', val)
      const barang = val.map(br => {
        const x = br
        const penerimaan = !br.barang.detail_penerimaan.length ? []
          : br.barang.detail_penerimaan.filter(trm => {
            return trm.penerimaan !== null
          })
        x.penerimaan = !penerimaan.length ? 0 : penerimaan.filter(trm => {
          return trm.qty
        }).reduce((a, b) => a + b)
        // console.log('barang x ', x)
        const permintaanRuangan = !br.barang.detail_permintaanruangan.length ? []
          : br.barang.detail_permintaanruangan.filter(trm => {
            return trm.permintaanruangan !== null
          })
        x.permintaanRuangan = !permintaanRuangan.length ? 0 : permintaanRuangan.filter(mt => {
          return mt.jumlah_distribusi
        }).reduce((a, b) => a + b)
        const gudang = !br.barang.detail_transaksi_gudang.length ? []
          : br.barang.detail_transaksi_gudang.filter(trm => {
            return trm.transaction !== null
          })
        x.gudang = !gudang.length ? 0 : gudang.filter(gd => {
          return gd.qty
        }).reduce((a, b) => a + b)
        const distribusiDepo = !br.barang.detail_distribusi_depo.length ? []
          : br.barang.detail_distribusi_depo.filter(trm => {
            return trm.distribusi !== null
          })
        x.distribusiDepo = !distribusiDepo.length ? 0 : distribusiDepo.filter(dp => {
          return dp.jumlah
        }).reduce((a, b) => a + b)
        const distribusiLangsung = !br.barang.detail_distribusi_langsung.length ? []
          : br.barang.detail_distribusi_langsung.filter(trm => {
            return trm.distribusi !== null
          })
        x.distribusiLangsung = !distribusiLangsung.length ? 0 : distribusiLangsung.filter(dp => {
          return dp.jumlah
        }).reduce((a, b) => a + b)
        x.awal = !br.barang.monthly.length ? []
          : br.barang.monthly.filter(mo => { return mo.sisa_stok }) // .reduce((a, b) => a + b)

        return x
      })
      console.log('barang', barang)
      this.items = val
    },
    getDataGudangDepo() {
      this.gudangDepo = [
        { nama: 'semua', kode: null }
      ]
      this.loading = true
      return new Promise(resolve => {
        api.get('v1/transaksi/opname/gudangdepo')
          .then(resp => {
            this.loading = false
            console.log('data gudang', resp)
            resp.data.forEach(data => {
              this.gudangDepo.push(data)
            })
            resolve(resp)
          })
          .catch(() => {
            this.loading = false
          })
      })
    },
    getDataTable() {
      this.loading = true
      const data = {
        params: this.params
      }
      return new Promise(resolve => {
        api.get('v1/transaksi/opname/monthly-stok', data)
          .then(resp => {
            this.loading = false
            console.log('data table', resp)
            this.setColumns()
            this.allItems = resp.data.data
            // this.items = resp.data.data
            this.prosesData(resp.data.data)
            this.meta = resp.data.meta
            this.items.forEach(item => {
              item.loading = false
            })
            resolve(resp)
          })
          .catch(() => {
            this.loading = false
          })
      })
    },
    getDataByDepo() {
      this.loading = true
      const data = {
        params: this.params
      }
      return new Promise(resolve => {
        api.get('v1/transaksi/opname/opname-by-depo', data)
          .then(resp => {
            this.loading = false
            console.log('data table', resp)
            // this.items = resp.data.data
            this.prosesData(resp.data.data)
            this.meta = resp.data.meta
            this.items.forEach(item => {
              item.loading = false
            })
            resolve(resp)
          })
          .catch(() => {
            this.loading = false
          })
      })
    },
    updateStokFisik(val, i) {
      console.log('update stok fisik', val, 'Index', i)
      if (parseFloat(val.stok_fisik) !== val.sisa_stok) {
        const form = {
          id: val.id,
          stok_fisik: parseFloat(val.stok_fisik),
          selisih: parseFloat(val.sisa_stok) - parseFloat(val.stok_fisik)
        }
        this.items[i].loading = true
        return new Promise(resolve => {
          api.post('v1/transaksi/opname/update-stok-fisik', form)
            .then(resp => {
              this.items[i].loading = false
              console.log(resp.data)
              notifSuccess(resp)
              resolve(resp)
            })
            .catch(() => {
              this.items[i].loading = false
            })
        })
      } else {
        notifErrVue('stok fisik sama dengan stok aplikasi, tidak ada perubahan')
      }
    },
    simpanOpname() {
      this.loading = true
      // const data = {
      //   id: this.form.id,
      //   jumlah: this.form.jumlah,
      //   selisih: this.form.selisih
      // }
      const data = { params: this.params }
      return new Promise(resolve => {
        api.get('v1/transaksi/opname/store-opname', data)
          .then(resp => {
            this.loading = false
            console.log('resp', resp)
            notifSuccess(resp)
            if (this.form.kode_tempat !== null) {
              this.getDataByDepo()
            } else {
              this.getDataTable()
            }
            this.resetForm()
            resolve(resp)
          })
          .catch(() => {
            this.loading = false
          })
      })
    },
    simpanPenyesuaian() {
      this.loading = true
      const data = {
        id: this.form.id,
        jumlah: this.form.jumlah,
        selisih: this.form.selisih
      }
      return new Promise(resolve => {
        api.post('v1/transaksi/opname/simpan-penyesuaian', data)
          .then(resp => {
            this.loading = false
            console.log('resp', resp)
            notifSuccess(resp)
            if (this.form.kode_tempat !== null) {
              this.getDataByDepo()
            } else {
              this.getDataTable()
            }
            this.resetForm()
            resolve(resp)
          })
          .catch(() => {
            this.loading = false
          })
      })
    }
  }
})
