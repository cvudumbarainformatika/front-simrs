import { defineStore } from 'pinia'
import { date } from 'quasar'
import { api } from 'src/boot/axios'
import { notifErrVue, notifSuccess, uniqueId } from 'src/modules/utils'
import { useAuthStore } from 'src/stores/auth'

export const usePemakaianRuanganStore = defineStore('pemakaian_ruangan_store', {
  state: () => ({
    loading: false,
    items: [],
    form: {
      status: 2
    },
    mapingbarang: [],
    penggunas: [],
    penanggungjawabs: [],
    filteredPengguna: [],
    pj: null,
    pj2: null,
    user: null,
    displays: [],
    details: [],
    detail: {},
    tempData: null,
    ruangans: [],
    loadingMaping: false
  }),
  actions: {
    resetForm() {
      this.form = {
        status: 2
      }
    },
    resetAll() {
      this.form = {
        status: 2
      }
      this.displays = []
      this.details = []
      this.detail = {}
      this.pj = null
      this.user = null
      this.filteredPengguna = []
    },
    setForm(key, val) {
      this.form[key] = val
    },
    setNomorPemakaian() {
      if (!this.form.reff) {
        this.form.reff = 'PRSKR-' + uniqueId()
      }
    },
    getInitialData() {
      this.getData()
      // this.getDataMaping()
      // this.getDataPengguna()
      // this.getDataPenanggungjawab()
      //   .then(() => {
      //     if (this.tempData !== null) {
      //       this.form = this.tempData
      //       this.penanggungjawabSelected(this.tempData.kode_penanggungjawab)
      //       this.penggunaSelected(this.tempData.kode_pengguna)
      //     }
      //   })
    },
    setRuangan(val) {
      console.log('set Ruangan atas', val)
      this.setNomorPemakaian()
      this.form.tanggal = date.formatDate(Date.now(), 'YYYY-MM-DD HH:mm:ss')
      this.form.kode_ruang = val
      const temp = this.penanggungjawabs.map(data => {
        const apem = data.ruang.filter(rua => { return rua.kode_ruang === val })
        if (apem.length) return apem[0]
        else return false
      }).filter(ada => { return ada !== false })

      this.form.kode_penanggungjawab = temp[0].kode_penanggungjawab
      this.pj = temp[0].kode_penanggungjawab
      this.pj2 = temp[0].penanggungjawab ? temp[0].penanggungjawab.jabatan : temp[0].pengguna.jabatan
      this.form.kode_pengguna = temp[0].kode_pengguna
      this.user = val

      const ruangan = this.penanggungjawabs.map(data => {
        const apem = data.ruang.filter(rua => { return rua.kode_pengguna === this.form.kode_pengguna })
        if (apem.length) return apem
        else return false
      }).filter(ada => { return ada !== false })

      this.ruangans = ruangan[0].map(data => {
        data.uraian = data.ruang.uraian
        return data
      })

      this.getItemsData()
    },
    penanggungjawabSelected(val) {
      this.setNomorPemakaian()
      this.form.tanggal = date.formatDate(Date.now(), 'YYYY-MM-DD HH:mm:ss')
      this.form.kode_penanggungjawab = val
      this.pj = val
      const ruang = this.penanggungjawabs.filter(caca => {
        return caca.kode === val
      })
      this.ruangans = ruang[0].ruang.map(ruru => {
        ruru.uraian = ruru.ruang.uraian
        return ruru
      })
      // console.log('ruang', this.ruangans)
      // const trimmed = val.slice(0, 8)
      // const pengguna = this.penggunas.filter(data => {
      //   const temp = data.kode.slice(0, 8)
      //   return temp === trimmed
      // })
      // if (pengguna.length === 1) {
      //   this.form.kode_pengguna = pengguna[0].kode
      //   this.getItemsData()
      // }
      // this.filteredPengguna = pengguna
      // console.log('form', this.form)
    },
    penggunaSelected(val) {
      const ruang = this.ruangans.filter(sisi => {
        return sisi.kode_ruang === val
      })
      // console.log('ruang', ruang)
      this.form.tanggal = date.formatDate(Date.now(), 'YYYY-MM-DD HH:mm:ss')
      this.form.kode_ruang = val
      this.form.kode_pengguna = ruang[0].kode_pengguna
      this.user = val
      this.getItemsData()
    },
    setItems(data) {
      console.log('data items', data)
      const anu = data.map(item => {
        // {kode_rs: 'RS-00901', jml: '12'}
        // const temp = this.mapingbarang.filter(maping => {
        //   maping.nama = maping.barangrs.nama
        //   return item.kode_rs === maping.kode_rs
        // })
        // // temp[0].jumlah = item.jml
        // item.nama = item.barang ? item.barang.nama : 'Tidak ada nama, periksa kembali data master'
        if (item.barang) {
          const temp = item.barang
          temp.jumlah = 0
          temp.sisaStok = item.stok
          temp.stok = item.stok
          temp.no_penerimaan = item.no_penerimaan
          temp.kode_rs = item.kode_rs
          return temp
        } else {
          return false
        }
      })
      this.items = anu.filter(dua => { return dua !== false })
      console.log('items aja', this.items)
    },
    mapingPenanggungjawab(data) {
      // disini maping penanggungjawab ruangan
      // untuk nanti jadi source autocomplite

      // console.log('data', data)
      const keys = Object.keys(data.penanggungjawab)
      const penanggungjawab = keys.map(key => {
        // console.log('pj', pj)
        const temp = data.penanggungjawab[key].filter(a => {
          return a.penanggungjawab !== null
        })
        let temp2 = []
        if (!temp.length) {
          temp2 = data.penanggungjawab[key].filter(a => {
            return a.pengguna !== null
          })
        }
        // console.log('temp', temp)
        // console.log('temp2', temp2)
        const dat = {}
        if (temp.length) {
          dat.jabatan = temp[0].penanggungjawab.jabatan
        } else if (temp2.length) {
          dat.jabatan = temp2[0].pengguna.jabatan
        } else {
          dat.jabatan = 'Data Jabatan tidak ditemukan'
        }
        dat.ruang = data.penanggungjawab[key]
        dat.kode = key
        return dat
      })
      this.penanggungjawabs = penanggungjawab

      // const auth = useAuthStore()
      // this.setRuangan(auth.kode_ruang)

      // console.log('data pj', penanggungjawab)
      // console.log('data keys', keys)
    },

    itemSelectod(val) {
      // console.log('val', val)
      const temp = this.items.filter(data => {
        return data.kode === val
      })
      // console.log('temp', temp)
      this.detail.kode_rs = val
      this.detail.kode_108 = temp[0].kode_108
      this.detail.nama = temp[0].nama
      this.detail.kode_satuan = temp[0].kode_satuan
      this.detail.uraian = temp[0].uraian_108
      this.detail.stokRuangan = parseInt(temp[0].jumlah)
      this.detail.jumlah = 0
      this.detail.sisaStok = temp[0].jumlah
    },
    updateJumlah(val) {
      this.detail.sisaStok = this.detail.stokRuangan - parseInt(this.detail.jumlah)
      if (this.detail.sisaStok < 0) {
        notifErrVue('sisa stok tidak boleh kurang dari 0')
        this.detail.jumlah = this.detail.stokRuangan
        this.detail.sisaStok = this.detail.stokRuangan - parseInt(this.detail.jumlah)
      }
      // console.log('input', val)
    },
    // --- unused function ----
    // --- end of unused function ----
    // api related function
    getData() {
      this.loading = true
      return new Promise(resolve => {
        api.get('v1/transaksi/pemakaianruangan/all-data')
          .then(resp => {
            this.loading = false
            // console.log('all data', resp)
            this.mapingPenanggungjawab(resp.data)
            resolve(resp)
          })
          .catch(() => {
            this.loading = false
          })
      })
    },
    saveInput() {
      const det = this.items.filter(x => x.jumlah > 0)
      if (det.length) {
        this.form.details = this.items.filter(x => x.jumlah > 0)
        console.log('input saved', this.form)
        this.loading = true
        return new Promise(resolve => {
          api.post('v1/transaksi/pemakaianruangan/store', this.form)
            .then(resp => {
              this.loading = false
              notifSuccess(resp)
              this.resetAll()
              const auth = useAuthStore().currentUser.pegawai
              this.setRuangan(auth.kode_ruang)
              // this.getData()
              this.getItemsData()
              resolve(resp)
            }).catch(() => { this.loading = false })
        })
      } else {
        notifErrVue('Belum ada Jumlah pemakaian yang di isi')
      }
    },
    getItemsData() {
      this.loading = true
      const params = {
        params: {
          kode_pengguna: this.form.kode_pengguna,
          kode_ruang: this.form.kode_ruang
        }
      }
      // console.log('params to get', this.form)
      return new Promise(resolve => {
        // api.get('v1/transaksi/penerimaanruangan/koders', params)
        api.get('v1/stok/get-current-by-ruangan', params)
          .then(resp => {
            this.loading = false
            console.log('data items', resp)
            this.setItems(resp.data)

            resolve(resp)
          })
          .catch(() => {
            this.loading = false
          })
      })
    },
    //
    // dibawah ini adalah api related function yang tidak dipakai
    getDataMaping() {
      if (!this.mapingbarang.length) {
        this.loadingMaping = true
        return new Promise(resolve => {
          api.get('v1/mapingbarang/mapingwith')
            .then(resp => {
              this.loadingMaping = false
              // console.log('maping', resp)
              this.mapingbarang = resp.data
              const auth = useAuthStore().currentUser.pegawai
              this.setRuangan(auth.kode_ruang)
              resolve(resp)
            }).catch(() => {
              this.loadingMaping = false
            })
        })
      }
    },
    getDataPenanggungjawab() {
      this.loading = true
      return new Promise(resolve => {
        api.get('v1/transaksi/penerimaanruangan/pj')
          .then(resp => {
            this.loading = false
            // console.log('pj', resp)
            this.penanggungjawabs = resp.data

            resolve(resp)
          }).catch(() => {
            this.loading = false
          })
      })
    },
    getDataPengguna() {
      this.loading = true
      return new Promise(resolve => {
        api.get('v1/pengguna/pengguna-ruang')
          .then(resp => {
            this.loading = false
            // console.log('pengguna', resp)
            this.penggunas = resp.data
            resolve(resp)
          }).catch(() => {
            this.loading = false
          })
      })
    }
  }
})
