import { defineStore } from 'pinia'
import { date } from 'quasar'
import { api } from 'src/boot/axios'
import { notifErrVue, uniqueId } from 'src/modules/utils'

export const usePemakaianRuanganStore = defineStore('pemakaian_ruangan_store', {
  state: () => ({
    loading: false,
    items: [],
    form: {},
    mapingbarang: [],
    penggunas: [],
    penanggungjawabs: [],
    filteredPengguna: [],
    pj: null,
    user: null,
    details: [],
    detail: {},
    tempData: null
  }),
  actions: {
    resetForm() {
      this.form = {}
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
      this.getDataMaping()
      this.getDataPengguna()
      this.getDataPenanggungjawab()
        .then(() => {
          if (this.tempData !== null) {
            this.form = this.tempData
            this.penanggungjawabSelected(this.tempData.kode_penanggungjawab)
            this.penggunaSelected(this.tempData.kode_pengguna)
          }
        })
    },
    penanggungjawabSelected(val) {
      this.setNomorPemakaian()
      this.form.tanggal = date.formatDate(Date.now(), 'YYYY-MM-DD HH:mm:ss')
      this.form.kode_penanggungjawab = val
      this.pj = val
      const trimmed = val.slice(0, 8)
      const pengguna = this.penggunas.filter(data => {
        const temp = data.kode.slice(0, 8)
        return temp === trimmed
      })
      if (pengguna.length === 1) {
        this.form.kode_pengguna = pengguna[0].kode
        this.getItemsData()
      }
      this.filteredPengguna = pengguna
      console.log(this.form)
    },
    penggunaSelected(val) {
      this.form.kode_pengguna = val
      this.user = val
      this.getItemsData()
    },
    setItems(data) {
      this.items = data.map(item => {
        // {kode_rs: 'RS-00901', jml: '12'}
        const temp = this.mapingbarang.filter(maping => {
          maping.nama = maping.barangrs.nama
          return item.kode_rs === maping.kode_rs
        })
        temp[0].jumlah = item.jml

        return temp[0]
      })
      console.log('items', this.items)
    },
    itemSelectod(val) {
      console.log(val)
      const temp = this.items.filter(data => {
        return data.kode_rs === val
      })
      console.log('temp', temp)
      this.detail.kode_rs = val
      this.detail.kode_108 = temp[0].kode_108
      this.detail.kode_satuan = temp[0].kode_satuan
      this.detail.uraian = temp[0].barang108.uraian
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
      console.log('input', val)
    },
    saveInput() {
      this.form.details = this.details
      console.log('input saved', this.form)
    },
    getItemsData() {
      this.loading = true
      const params = {
        params: {
          kode_pengguna: this.form.kode_pengguna
        }
      }
      console.log('params to get', this.form)
      return new Promise(resolve => {
        api.get('v1/transaksi/penerimaanruangan/koders', params)
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
    getDataMaping() {
      this.loading = true
      return new Promise(resolve => {
        api.get('v1/mapingbarang/mapingwith')
          .then(resp => {
            this.loading = false
            // console.log('maping', resp)
            this.mapingbarang = resp.data
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
