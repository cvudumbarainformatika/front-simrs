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
        nama: 'Dashboard',
        name: 'sigarang.dashboard',
        submenus: []
      },
      // {
      //   icon: 'icon-mat-account_circle',
      //   link: 'sigarang/admin',
      //   nama: 'Admin',
      //   name: 'sigarang.admin',
      //   submenus: [
      //     {
      //       link: 'sigarang/admin/user',
      //       nama: 'Data User',
      //       name: 'sigarang.admin.user'
      //     },
      //     {
      //       link: 'sigarang/admin/pegawai',
      //       nama: 'Registrasi Pegawai',
      //       name: 'sigarang.admin.pegawai'
      //     }
      //   ]
      // },
      {
        icon: 'icon-mat-sync_alt',
        link: 'sigarang/transaksi',
        nama: 'Transaksi',
        name: 'sigarang.transaksi',
        submenus: [
          {
            link: 'sigarang/transaksi/pemesanan/TRP-',
            nama: 'Transaksi Pemesanan',
            name: 'sigarang.transaksi.pemesanan'
          },
          {
            link: 'sigarang/transaksi/penerimaan/TRM-',
            nama: 'Transaksi Penerimaan',
            name: 'sigarang.transaksi.penerimaan'
          },
          {
            link: 'sigarang/transaksi/distribusidepo',
            nama: 'Transaksi Distribusi Depo',
            name: 'sigarang.transaksi.distribusidepo'
          },
          {
            link: 'sigarang/transaksi/penerimaandepo',
            nama: 'Transaksi Penerimaan Depo',
            name: 'sigarang.transaksi.penerimaandepo'
          },
          {
            link: 'sigarang/transaksi/permintaan/TPN-',
            nama: 'Transaksi Permintaan',
            name: 'sigarang.transaksi.permintaan'
          },
          {
            link: 'sigarang/transaksi/verifpermintaan',
            nama: 'Verif Transaksi Permintaan Ruangan',
            name: 'sigarang.transaksi.verifpermintaan'
          },
          {
            link: 'sigarang/transaksi/distribusi',
            nama: 'Transaksi Distribusi Permintaan Ruangan',
            name: 'sigarang.transaksi.distribusi'
          },
          {
            link: 'sigarang/transaksi/penerimaanruangan',
            nama: 'Transaksi Penerimaan Ruangan',
            name: 'sigarang.transaksi.penerimaanruangan'
          },
          {
            link: 'sigarang/transaksi/pemakaianruangan',
            nama: 'Transaksi Pemakaian Ruangan',
            name: 'sigarang.transaksi.pemakaianruangan'
          },
          {
            link: 'sigarang/transaksi/barangrusak',
            nama: 'Transaksi Barang Rusak',
            name: 'sigarang.transaksi.barangrusak'
          },
          {
            link: 'sigarang/transaksi/pengembalian',
            nama: 'Transaksi Pengembalian',
            name: 'sigarang.transaksi.pengembalian'
          },
          {
            link: 'sigarang/transaksi/bast',
            nama: 'Transaksi BAST',
            name: 'sigarang.transaksi.bast'
          },
          {
            link: 'sigarang/transaksi/pembayaran',
            nama: 'Transaksi Pembayaran',
            name: 'sigarang.transaksi.pembayaran'
          }
        ]
      },
      {
        icon: 'icon-mat-dataset',
        link: 'sigarang/master',
        nama: 'Master',
        name: 'sigarang.master',
        submenus: [
          {
            link: 'sigarang/master/gedung',
            nama: 'Master Gedung',
            name: 'sigarang.master.gedung'
          },
          {
            link: 'sigarang/master/gudang',
            nama: 'Master Depo',
            name: 'sigarang.master.gudang'
          },
          {
            link: 'sigarang/master/minmaxstok',
            nama: 'Master Min Max Stok',
            name: 'sigarang.master.minmaxstok'
          },
          {
            link: 'sigarang/master/ruang',
            nama: 'Master Ruang',
            name: 'sigarang.master.ruang'
          },
          {
            link: 'sigarang/master/pengguna',
            nama: 'Master Pengguna',
            name: 'sigarang.master.pengguna'
          },
          {
            link: 'sigarang/master/penggunaruang',
            nama: 'Mapping Pengguna Ruang',
            name: 'sigarang.master.penggunaruang'
          },
          {
            link: 'sigarang/master/barang108',
            nama: 'Master Barang 108',
            name: 'sigarang.master.barang108'
          },
          {
            link: 'sigarang/master/barangrs',
            nama: 'Master Barang RS',
            name: 'sigarang.master.barangrs'
          },
          {
            link: 'sigarang/master/supplier',
            nama: 'Master Supplier',
            name: 'sigarang.master.supplier'
          },
          {
            link: 'sigarang/master/satuan',
            nama: 'Master Satuan',
            name: 'sigarang.master.satuan'
          },
          {
            link: 'sigarang/master/pegawai',
            nama: 'Master Pegawai',
            name: 'sigarang.master.pegawai'
          },
          {
            link: 'sigarang/master/kontrakpengerjaan',
            nama: 'Master Kontrak Pengerjaan',
            name: 'sigarang.master.kontrakpengerjaan'
          }
          // {
          //   link: 'sigarang/master/mapingbarang',
          //   nama: 'Master Mapping RS ke 108',
          //   name: 'sigarang.master.mapingbarang'
          // },
        ]
      },
      {
        icon: 'icon-mat-history',
        link: 'sigarang/history',
        nama: 'History',
        name: 'sigarang.history',
        submenus: [
          {
            icon: 'icon-mat-inventory_2',
            link: 'sigarang/history',
            nama: 'Pemesanan',
            name: 'sigarang.history.pemesanan'
          },
          {
            icon: 'icon-mat-shopping_bag',
            link: 'sigarang/history',
            nama: 'Penerimaan',
            name: 'sigarang.history.penerimaan'
          },
          {
            icon: 'icon-mat-account_balance_wallet',
            link: 'sigarang/history',
            nama: 'Permintaan Ruangan',
            name: 'sigarang.history.permintaan'
          },
          {
            icon: 'icon-mat-account_balance_wallet',
            link: 'sigarang/history',
            nama: 'Distribusi Depo',
            name: 'sigarang.history.distribusidepo'
          },
          {
            icon: 'icon-mat-account_balance_wallet',
            link: 'sigarang/history',
            nama: 'Pemakaian Ruangan',
            name: 'sigarang.history.pemakaianruangan'
          },
          {
            icon: 'icon-mat-account_balance_wallet',
            link: 'sigarang/history',
            nama: 'Penerimaan Ruangan',
            name: 'sigarang.history.penerimaanruangan'
          },
          {
            icon: 'icon-mat-account_balance_wallet',
            link: 'sigarang/history',
            nama: 'Gudang',
            name: 'sigarang.history.gudang'
          },
          {
            icon: 'icon-mat-account_balance_wallet',
            link: 'sigarang/history',
            nama: 'Retur',
            name: 'sigarang.history.retur'
          }
        ]
      },
      {
        icon: 'icon-mat-description',
        link: 'sigarang/laporan',
        nama: 'Laporan',
        name: 'sigarang.laporan',
        submenus: [
          {
            link: 'sigarang/laporan/stok',
            nama: 'Laporan Stock',
            name: 'sigarang.laporan.stok'
          }]
      }
      // {
      //   icon: 'icon-mat-settings',
      //   link: 'sigarang/setting',
      //   nama: 'Setting',
      //   name: 'sigarang.setting',
      //   submenus: [
      //     {
      //       id: 1,
      //       icon: 'icon-mat-insert_drive_file',
      //       nama: 'Menu',
      //       name: 'menu'
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
    loading: false,
    mapingbarangdepo: [],
    stateOfmapingbarangdepo: false
  }),
  actions: {
    getAllData () {
      // this.getDataSetting()
      // sigarang
      // this.getMapingBarangDepo()
      const mapingBarang = useMasterMapingBarangForm()
      mapingBarang.getDataBarang108()
      mapingBarang.getDataBarangRs()
      mapingBarang.getDataSatuan()

      const pemesanan = useTransaksiPemensananForm()
      // pemesanan.getKontrakPekerjaan()
      pemesanan.getMapingBarang()
      pemesanan.getRekening50()

      const barangrs = useMasterBarangRSForm()
      barangrs.getDataSatuans()
      barangrs.getData108s()
      barangrs.getDataDepos()

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
    getMapingBarangDepo() {
      this.stateOfmapingbarangdepo = true
      return new Promise(resolve => {
        api.get('v1/mapingdepo/maping')
          .then(resp => {
            this.stateOfmapingbarangdepo = false
            console.log('maping barang depo', resp)
            this.mapingbarangdepo = resp.data
            resolve(resp)
          })
      })
    },
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
