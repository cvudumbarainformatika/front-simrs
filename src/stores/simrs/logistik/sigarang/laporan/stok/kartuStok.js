import { defineStore } from 'pinia'
import { date } from 'quasar'
import { api } from 'src/boot/axios'

export const useKartuStokStore = defineStore('kartu_stok', {
  state: () => ({
    loading: false,
    itemsGudang: [],
    itemsDepo: [],
    itemsRuangan: [],
    item: null,
    params: {
      bln: date.formatDate(Date.now(), 'M'),
      thn: date.formatDate(Date.now(), 'YYYY')
    },
    displayParams: {
      dari: date.formatDate(Date.now(), 'DD MMMM YYYY'),
      sampai: date.formatDate(Date.now(), 'DD MMMM YYYY')
    },
    paramBarang: {
      q: '',
      per_page: 20
    },
    loadingRuangan: false,
    loadingBarang: false,
    barangs: [],
    gudangs: [],
    ruangans: [],
    tempats: []
  }),
  actions: {
    // get initial data
    getInitialData() {
      this.getDataBarang()
      this.getGudangHabisPakai()
    },

    // get Ruangan
    async getDataRuangan(val) {
      this.tempats = this.gudangs
      const params = {
        params: {
          q: val,
          per_page: 20
        }
      }
      this.loadingRuangan = true
      await api.get('v1/ruang/index', params)
        .then(resp => {
          this.loadingRuangan = false
          if (resp.data.data.length) {
            resp.data.data.forEach(tempt => {
              tempt.nama = tempt.uraian
              this.tempats.push(tempt)
            })
          }
          console.log('Ruangan', resp.data)
        })
        .catch(() => {
          this.loadingRuangan = false
        })
    },
    // get gudang habis pakai
    async getGudangHabisPakai() {
      this.loading = true
      await api.get('v1/gudang/gudang-habis-pakai')
        .then(resp => {
          this.loading = false
          this.gudangs = resp.data
          this.tempats = resp.data
          console.log('gudang', resp.data)
        })
        .catch(() => {
          this.loading = false
        })
    },
    // get data barang
    async getDataBarang() {
      this.loadingBarang = true
      const params = { params: this.paramBarang }
      await api.get('v1/barangrs/index', params)
        .then(resp => {
          this.loadingBarang = false
          this.barangs = resp.data.data
          console.log('barang', resp.data)
        })
        .catch(() => {
          this.loadingBarang = false
        })
    },
    // get kartu stok gudang
    async getKartuStokGudang() {
      this.itemsGudang = []
      this.itemsDepo = []
      this.itemsRuangan = []
      this.loading = true
      const params = { params: this.params }
      await api.get('v1/transaksi/kartustok/lihatkartustokgudang', params)
        .then(resp => {
          this.loading = false
          if (resp.data.length) {
            resp.data.forEach(dat => {
              if (dat.stok_awal.length) {
                dat.stok_awal.forEach(kel => {
                  kel.trx = 'stokAwal'
                  this.itemsGudang.push(kel)
                })
              }
              if (dat.masukgudang.length) {
                dat.masukgudang.forEach(kel => {
                  kel.trx = 'masukGudang'
                  this.itemsGudang.push(kel)
                })
              }
              if (dat.keluargudang.length) {
                dat.keluargudang.forEach(kel => {
                  kel.trx = 'keluarGudang'
                  this.itemsGudang.push(kel)
                })
              }
              if (dat.stok_akhir.length) {
                dat.stok_akhir.forEach(kel => {
                  kel.trx = 'stokAkhir'
                  this.itemsGudang.push(kel)
                })
              }
            })
          }
          this.itemsGudang.sort((a, b) => {
            const da = new Date(a.tanggal), db = new Date(b.tanggal)
            return da - db
          })
          // this.itemsGudang = resp.data
          console.log('kartu stok gudang', resp.data)
          console.log('items gudang', this.itemsGudang)
        })
        .catch(() => {
          this.loading = false
        })
    },
    // get kartu stok depo
    async getKartuStokDepo() {
      this.itemsGudang = []
      this.itemsDepo = []
      this.itemsRuangan = []
      this.loading = true
      const params = { params: this.params }
      await api.get('v1/transaksi/kartustok/lihatkartustokdepo', params)
        .then(resp => {
          this.loading = false
          if (resp.data.length) {
            resp.data.forEach(dat => {
              if (dat.stok_awal.length) {
                dat.stok_awal.forEach(kel => {
                  kel.trx = 'stokAwal'
                  this.itemsDepo.push(kel)
                })
              }
              if (dat.pengeluarandepo.length) {
                dat.pengeluarandepo.forEach(kel => {
                  kel.trx = 'keluarDepo'
                  this.itemsDepo.push(kel)
                })
              }
              if (dat.keluargudang.length) {
                dat.keluargudang.forEach(kel => {
                  kel.trx = 'masukDepo'
                  this.itemsDepo.push(kel)
                })
              }
              if (dat.stok_akhir.length) {
                dat.stok_akhir.forEach(kel => {
                  kel.trx = 'stokAkhir'
                  this.itemsDepo.push(kel)
                })
              }
            })
          }
          this.itemsDepo.sort((a, b) => {
            const da = new Date(a.tanggal), db = new Date(b.tanggal)
            return da - db
          })

          console.log('kartu stok depo', resp.data)
          console.log('kartu stok sort', this.itemsDepo)
        })
        .catch(() => {
          this.loading = false
        })
    },
    // get kartu stok Ruangan
    async getKartuStokRuangan() {
      this.itemsGudang = []
      this.itemsDepo = []
      this.itemsRuangan = []
      this.loading = true
      const params = { params: this.params }
      await api.get('v1/transaksi/kartustok/lihatkartustokruangan', params)
        .then(resp => {
          this.loading = false
          if (resp.data.length) {
            resp.data.forEach(dat => {
              if (dat.stok_awal.length) {
                dat.stok_awal.forEach(kel => {
                  kel.trx = 'stokAwal'
                  this.itemsRuangan.push(kel)
                })
              }
              if (dat.pengeluarandepo.length) {
                dat.pengeluarandepo.forEach(kel => {
                  kel.trx = 'masukRuangan'
                  this.itemsRuangan.push(kel)
                })
              }
              if (dat.pemakaianruangan.length) {
                dat.pemakaianruangan.forEach(kel => {
                  kel.trx = 'keluarRuangan'
                  this.itemsRuangan.push(kel)
                })
              }
              if (dat.stok_akhir.length) {
                dat.stok_akhir.forEach(kel => {
                  kel.trx = 'stokAkhir'
                  this.itemsRuangan.push(kel)
                })
              }
            })
          }
          this.itemsRuangan.sort((a, b) => {
            const da = new Date(a.tanggal), db = new Date(b.tanggal)
            return da - db
          })
          this.itemsRuangan.forEach((item, index) => {
            // if(index===0){
            //   item.sisaStok
            // }
            console.log('index', index)
            console.log('item', item)
          })
          // this.itemsRuangan = resp.data
          console.log('kartu stok ruangan', resp.data)
          console.log('kartu stok ruangan sort', this.itemsRuangan)
        })
        .catch(() => {
          this.loading = false
        })
    }
  }
})
