import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
import { useMasterBarangRSForm } from '../master/barangrs/form'
import { useMasterMapingBarangForm } from '../master/mapingbarang/form'
import { useMasterPenggunaRuangForm } from '../master/penggunaruang/form'
import { useTransaksiPemensananForm } from '../transaksi/pemesanan/form'
import { useTransaksiPermintaanForm } from '../transaksi/permintaan/form'

export const useSettingsStore = defineStore('setting_store', {
  state: () => ({
    transaksiLoading: false,
    nama: 'sigarang',
    levels: [],
    menus: [],
    themes: [],
    menu: 'menu',
    dark: false,
    form: {
      nama: 'sigarang'
    },
    loading: false
  }),
  actions: {
    getAllData () {
      this.getDataSetting()
      const mapingBarang = useMasterMapingBarangForm()
      mapingBarang.getDataBarang108()
      mapingBarang.getDataBarangRs()
      mapingBarang.getDataSatuan()

      const pemesanan = useTransaksiPemensananForm()
      pemesanan.getKontrakPekerjaan()
      pemesanan.getMapingBarang()

      const barangrs = useMasterBarangRSForm()
      barangrs.getDataSatuans()

      const mapingpengguna = useMasterPenggunaRuangForm()
      mapingpengguna.getDataPenggunas()
      mapingpengguna.getDataRuangs()

      const permintaan = useTransaksiPermintaanForm()
      permintaan.getPenggunas()
    },
    pilihItem (data) {
      console.log('pilih item', data)
    },

    // api related function

    getDataSetting () {
      return new Promise((resolve, reject) => {
        api.get('v1/setting/index')
          .then(resp => {
            console.log('setting', resp)
            this.menus = resp.data[0].menus
            this.levels = resp.data[0].levels
            this.themes = resp.data[0].themes
            resolve(resp)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    saveSetting () {
      this.form.menus = this.menus
      this.form.levels = this.levels
      this.form.themes = this.themes
      this.loading = true
      return new Promise((resolve, reject) => {
        api.post('v1/setting/store', this.form)
          .then(resp => {
            this.loading = false
            console.log('simpan', resp)
            resolve(resp)
          })
          .catch(err => {
            this.loading = false
            reject(err)
          })
      })
    }

  }
})
