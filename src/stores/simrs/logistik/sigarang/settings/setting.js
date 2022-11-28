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
    menus: [
      {
        icon: 'icon-mat-dashboard',
        link: 'sigarang/dashboard',
        name: 'Dashboard',
        value: 'sigarang.dashboard'
      },
      {
        icon: 'icon-mat-dataset',
        link: 'sigarang/master',
        name: 'Master',
        value: 'sigarang.master',
        submenus: [
          {
            link: 'sigarang/master/gedung',
            name: 'Master Gedung',
            value: 'sigarang.master.gedung'
          },
          {
            link: 'sigarang/master/gudang',
            name: 'Master Gudang',
            value: 'sigarang.master.gudang'
          },
          {
            link: 'sigarang/master/ruang',
            name: 'Master Ruang',
            value: 'sigarang.master.ruang'
          },
          {
            link: 'sigarang/master/pengguna',
            name: 'Master Pengguna',
            value: 'sigarang.master.pengguna'
          },
          {
            link: 'sigarang/master/penggunaruang',
            name: 'Mapping Pengguna Ruang',
            value: 'sigarang.master.penggunaruang'
          },
          {
            link: 'sigarang/master/barang108',
            name: 'Master Barang 108',
            value: 'sigarang.master.barang108'
          },
          {
            link: 'sigarang/master/barangrs',
            name: 'Master Barang RS',
            value: 'sigarang.master.barangrs'
          },
          {
            link: 'sigarang/master/mapingbarang',
            name: 'Master Mapping RS ke 108',
            value: 'sigarang.master.mapingbarang'
          },
          {
            link: 'sigarang/master/supplier',
            name: 'Master Supplier',
            value: 'sigarang.master.supplier'
          },
          {
            link: 'sigarang/master/satuan',
            name: 'Master Satuan',
            value: 'sigarang.master.satuan'
          },
          {
            link: 'sigarang/master/pegawai',
            name: 'Master Pegawai',
            value: 'sigarang.master.pegawai'
          },
          {
            link: 'sigarang/master/kontrakpengerjaan',
            name: 'Master Kontrak Pengerjaan',
            value: 'sigarang.master.kontrakpengerjaan'
          }
        ]
      },
      {
        icon: 'icon-mat-account_circle',
        link: 'sigarang/admin',
        name: 'Admin',
        value: 'sigarang.admin',
        submenus: [
          {
            link: 'sigarang/admin/user',
            name: 'Data User',
            value: 'sigarang.admin.user'
          },
          {
            link: 'sigarang/admin/pegawai',
            name: 'Registrasi Pegawai',
            value: 'sigarang.admin.pegawai'
          }
        ]
      },
      {
        icon: 'icon-mat-sync_alt',
        link: 'sigarang/transaksi',
        name: 'Transaksi',
        value: 'sigarang.transaksi',
        submenus: [
          {
            link: 'sigarang/transaksi/pemesanan/TRP-',
            name: 'Transaksi Pemesanan',
            value: 'sigarang.transaksi.pemesanan'
          },
          {
            link: 'sigarang/transaksi/penerimaan/TRM-',
            name: 'Transaksi Penerimaan',
            value: 'sigarang.transaksi.penerimaan'
          },
          {
            link: 'sigarang/transaksi/permintaan/TPN-',
            name: 'Transaksi Permintaan',
            value: 'sigarang.transaksi.permintaan'
          },
          {
            link: 'sigarang/transaksi/verifpermintaan',
            name: 'Verif Transaksi Permintaan Ruangan',
            value: 'sigarang.transaksi.verifpermintaan'
          }
        ]
      },
      {
        icon: 'icon-mat-history',
        link: 'sigarang/history',
        name: 'History',
        value: 'sigarang.history',
        submenus: [
          {
            icon: 'icon-mat-inventory_2',
            name: 'Pemesanan',
            value: 'Pemesanan'
          },
          {
            icon: 'icon-mat-shopping_bag',
            name: 'Penerimaan',
            value: 'Penerimaan'
          },
          {
            icon: 'icon-mat-account_balance_wallet',
            name: 'Gudang',
            value: 'Gudang'
          }
        ]
      },
      {
        icon: 'icon-mat-description',
        link: 'sigarang/laporan',
        name: 'Laporan',
        value: 'sigarang.laporan'
      }
      // {
      //   icon: 'icon-mat-settings',
      //   link: 'sigarang/setting',
      //   name: 'Setting',
      //   value: 'sigarang.setting',
      //   submenus: [
      //     {
      //       id: 1,
      //       icon: 'icon-mat-insert_drive_file',
      //       name: 'Menu',
      //       value: 'menu'
      //     }
      //   ]
      // }
    ],
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
            // console.log('setting', resp)
            // this.menus = resp.data[0].menus
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
