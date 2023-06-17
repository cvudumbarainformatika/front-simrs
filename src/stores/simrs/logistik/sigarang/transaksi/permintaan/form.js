import { defineStore } from 'pinia'
import { date } from 'quasar'
import { api } from 'src/boot/axios'
import { uniqueId } from 'src/modules/utils'
import { useAuthStore } from 'src/stores/auth'
import { useMinMaxPenggunaStockStore } from '../../master/minmaxstok/pengguna/pengguna'
import { useTransaksiPermintaanTable } from './permintaan'

export const useTransaksiPermintaanForm = defineStore('form_transaksi_permintaan', {
  state: () => ({
    isOpen: true,
    loading: false,
    auth: useAuthStore().currentUser.pegawai,
    form: {
      tanggal: date.formatDate(Date.now(), 'YYYY-MM-DD'),
      kode_ruang: useAuthStore().currentUser.pegawai.kode_ruang
    },
    nomor: null,
    nama: {
      penanggungjawab: 'ruangan pengguna belum dipilih',
      ruang: 'ruangan pengguna belum dipilih',
      gudang: 'barang belum dipilih',
      satuan: 'barang belum dipilih',
      pengguna: 'ruangan pengguna belum dipilih'
    },
    tanggal: date.formatDate(Date.now(), 'DD MMMM YYYY'),
    penggunas: [],
    penggunaruangs: [],
    penanggungjawabs: [],
    minMaxPenggunas: {},
    stok: {},
    params: {
      kode_rs: '',
      kode_ruangan: ''
    },
    barang: {}
  }),
  actions: {
    setParams(key, val) {
      this.params[key] = val
    },
    setNoPermintaan() {
      const m = 'SPMT-' + uniqueId()
      this.nomor = m
      // this.setForm('no_permintaan', m)
    },
    setNewReff() {
      const baru = 'TPN-' + uniqueId()
      this.setForm('reff', baru)
      useTransaksiPermintaanTable().setParam('reff', baru)
    },
    setForm(key, val) {
      this.form[key] = val
    },
    setNama(key, val) {
      this.nama[key] = val
    },
    newData() {},
    editData() {},

    setSearch(val) {},
    pilihPenanggungjawab(val) {},
    setPenggunaRuang(val) {
      this.penggunaruangs = val.map(apem => {
        apem.uraian = apem.ruang.uraian
        return apem
      })
      // if (this.auth.role.id === 5) {}
      this.form.kode_ruang = this.auth.kode_ruang
      const ruang = this.penggunaruangs.filter(data => { return data.kode_ruang === this.auth.kode_ruang })
      if (ruang.length) {
        const peng = ruang[0].pengguna
        const pj = ruang[0].penanggungjawab ? ruang[0].penanggungjawab : ruang[0].pengguna

        this.setForm('kode_penanggungjawab', pj.kode)
        this.setNama('penanggungjawab', pj.jabatan)
        this.setForm('kode_pengguna', peng.kode)
        this.setNama('pengguna', peng.jabatan)
        this.setForm('tujuan', ruang[0].kode_ruang)
        this.setParams('kode_ruangan', ruang[0].kode_ruang)
        this.setNama('ruang', ruang[0].ruang.uraian)
      } else {
        this.setForm('tujuan', null)
        this.setNama('ruang', 'ruang tidak ditemukan')
      }
      // console.log('pengguna Ruang', this.penggunaruangs)
      console.log('auth ', this.auth)
      console.log('Ruang ', ruang)
    },
    // api related function
    // get data stok by barang
    getStokByBarang() {
      this.loading = true
      const param = {
        params: this.params
      }
      return new Promise(resolve => {
        api.get('v1/stok/get-ruangan-by-barang', param)
          .then(resp => {
            this.loading = false
            // console.log('stok by barang', resp)
            this.barang = resp.data

            resolve(resp)
          })
          .catch(() => {
            this.loading = false
          })
      })
    },

    getPenanggungJawabs() {
      return new Promise((resolve) => {
        api.get('v1/pengguna/penanggungjawab').then((resp) => {
          // console.log('Pj permintaan', resp.data)
          if (resp.status === 200) {
            this.penanggungjawabs = resp.data
            resolve(resp)
          }
        })
      })
    },
    getPenggunaRuang() {
      this.loading = true
      return new Promise((resolve) => {
        api.get('v1/penggunaruang/pengguna-ruang').then((resp) => {
          this.loading = false
          if (resp.status === 200) {
            this.setPenggunaRuang(resp.data)

            resolve(resp)
          }
        })
      })
    },
    getPenggunas() {
      this.loading = true
      return new Promise((resolve) => {
        api.get('v1/pengguna/pengguna-ruang').then((resp) => {
          this.loading = false
          // console.log('pengguna permintaan', resp.data)
          if (resp.status === 200) {
            this.penggunas = resp.data
            resolve(resp)
          }
        })
      })
    },

    // get data minMaxPengguna
    getMinMaxPengguna() {
      this.loading = true
      return new Promise(resolve => {
        // api.get('v1/minmaxpenggunastok/all')
        api.post('v1/minmaxpenggunastok/spesifik', this.form)
          .then(resp => {
            this.loading = false
            // console.log('minmaxpengguna', resp)
            this.minMaxPenggunas = resp.data
            const maksRuangan = useMinMaxPenggunaStockStore()
            maksRuangan.formRuangan.flag_minta = Object.keys(resp.data).length ? resp.data.flag_minta : null
            resolve(resp)
          })
          .catch(() => {
            this.loading = false
          })
      })
    }
  }
})
