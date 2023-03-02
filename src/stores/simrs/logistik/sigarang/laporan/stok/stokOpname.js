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
    meta: null,
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
      search: 'Gd-02010101',
      q: '',
      page: 1,
      per_page: 10,
      order_by: 'created_at',
      sort: 'asc',
      bulan: date.formatDate(Date.now(), 'MM'),
      tahun: date.formatDate(Date.now(), 'YYYY')
    },
    kode_tempat: 'Gd-02010101',
    gudangDepo: [
      { nama: 'Depo PNM', kode: 'Gd-02010101' }
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
      // if (this.form.kode_tempat !== null) {
      //   this.getDataByDepo()
      // } else {
      // }
      this.getDataTable()
    },
    setOder(payload) {
      this.params.order_by = payload
      this.params.sort === 'desc'
        ? (this.params.sort = 'asc')
        : (this.params.sort = 'desc')
      // if (this.form.kode_tempat !== null) {
      //   this.getDataByDepo()
      // } else {
      // }
      this.getDataTable()
    },
    setPage(payload) {
      // console.log('setPage', payload)
      this.params.page = payload
      // if (this.form.kode_tempat !== null) {
      //   this.getDataByDepo()
      // } else {
      // }
      this.getDataTable()
    },
    setPerPage(payload) {
      this.params.per_page = payload
      this.params.page = 1
      // if (this.form.kode_tempat !== null) {
      //   this.getDataByDepo()
      // } else {
      // }
      this.getDataTable()
    },
    setColumns(payload) {
      // if (!payload) return
      // const thumb = payload.map((x) => Object.keys(x))
      // this.columns = thumb[0]
      this.columns = [
        // 'tanggal',
        // 'tempat',
        // 'kode_rs',
        // 'uraian',
        'kode',
        'no_penerimaan',
        'barang',
        'sisa_stok',
        // 'totalStok',
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
      // this.items = val
      console.log('proses data', val)
      const barang = val.map(br => {
        const x = br

        // penerimaan
        x.penerimaan = !br.detail_penerimaan.length ? 0
          : br.detail_penerimaan.map(trm => trm.qty).reduce((a, b) => a + b)

        // pemesanan masuk gudang
        x.gudang = !br.detail_transaksi_gudang.length ? 0
          : br.detail_transaksi_gudang.map(trm => trm.qty).reduce((a, b) => a + b)

        // distribusi depo
        x.distribusiDepo = !br.detail_distribusi_depo.length ? 0
          : br.detail_distribusi_depo.map(trm => trm.jumlah).reduce((a, b) => a + b)

        // permintaan ruangan
        x.permintaanRuangan = !br.detail_permintaanruangan.length ? 0
          : br.detail_permintaanruangan.map(trm => trm.jumlah_distribusi).reduce((a, b) => a + b)

        // distribusi langsung
        x.distribusiLangsung = !br.detail_distribusi_langsung.length ? 0
          : br.detail_distribusi_langsung.map(trm => trm.jumlah).reduce((a, b) => a + b)

        // pemakaian ruangan
        x.pemakaianRuangan = !br.detail_pemakaianruangan.length ? 0
          : br.detail_pemakaianruangan.map(trm => trm.jumlah).reduce((a, b) => a + b)

        // stok awal
        x.stokAwal = !br.stok_awal.length ? 0
          : br.stok_awal.map(mo => { return mo.sisa_stok }).reduce((a, b) => a + b)

        // hitung stok transaksi
        x.stok_transaksi = x.stokAwal + x.gudang - x.permintaanRuangan - x.distribusiLangsung

        return x
      })
      console.log('barang', barang)
      this.items = barang
    },
    getDataGudangDepo() {
      this.gudangDepo = [
        { nama: 'Depo PNM', kode: 'Gd-02010101' }
      ]
      this.loading = true
      return new Promise(resolve => {
        api.get('v1/transaksi/opname/gudangdepo')
          .then(resp => {
            this.loading = false
            console.log('data gudang', resp)
            resp.data.forEach(data => {
              if (data.kode !== 'Gd-02010101') {
                this.gudangDepo.push(data)
              }
            })
            resolve(resp)
          })
          .catch(() => {
            this.loading = false
          })
      })
    },
    async getDataTable() {
      this.loading = true
      const data = {
        params: this.params
      }
      // api.get('v1/transaksi/opname/monthly-stok', data)
      await api.get('v1/transaksi/opname/stok-opname', data)
        .then(resp => {
          if (resp.status === 200) {
            this.loading = false
            console.log('data table', resp)
            this.setColumns()
            this.allItems = resp.data.data
            this.meta = resp.data
            // this.meta = resp.data.meta
            this.prosesData(resp.data.data)
            // this.meta = 'resp.data'
          }
        }).catch(() => {
          this.loading = false
        })
    },
    // getDataTable() {
    //   this.loading = true
    //   const data = {
    //     params: this.params
    //   }
    //   return new Promise(resolve => {
    //     // api.get('v1/transaksi/opname/monthly-stok', data)
    //     api.get('v1/transaksi/opname/stok-opname', data)
    //       .then(resp => {
    //         this.loading = false
    //         console.log('data table', resp)
    //         this.setColumns()
    //         this.allItems = resp.data.data
    //         // this.items = resp.data.data
    //         this.prosesData(resp.data.data)
    //         this.meta = resp.data
    //         this.items.forEach(item => {
    //           item.loading = false
    //         })
    //         resolve(resp)
    //       })
    //       .catch(() => {
    //         this.loading = false
    //       })
    //   })
    // },
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
            this.meta = resp.data
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
            // if (this.form.kode_tempat !== null) {
            //   this.getDataByDepo()
            // } else {
            this.getDataTable()
            // }
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
            // if (this.form.kode_tempat !== null) {
            //   this.getDataByDepo()
            // } else {
            this.getDataTable()
            // }
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
