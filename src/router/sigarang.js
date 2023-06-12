const sigarang =
{
  path: '/sigarang',
  // component: () => import('layouts/sigarang/AdminLayout.vue'),
  component: () => import('layouts/V2/IndexLayout.vue'),
  meta: { requireAuth: true },
  children: [
    { path: '', name: 'sigarang', redirect: '/sigarang/dashboard' },
    {
      path: '/sigarang/dashboard',
      name: 'sigarang.dashboard',
      component: () => import('pages/simrs/sigarang/IndexPage.vue')
    },
    {
      path: '/sigarang/admin',
      name: 'sigarang.admin',
      component: () => import('pages/simrs/sigarang/admin/IndexPage.vue'),
      children: [
        {
          path: '/sigarang/admin/pegawai',
          name: 'sigarang.admin.pegawai',
          component: () =>
            import('pages/simrs/sigarang/admin/pegawai/IndexPage.vue')
        },
        {
          path: '/sigarang/admin/user',
          name: 'sigarang.admin.user',
          component: () =>
            import('pages/simrs/sigarang/admin/user/IndexPage.vue')
        }
      ]
    },
    {
      path: '/sigarang/laporan',
      name: 'sigarang.laporan',
      component: () => import('pages/simrs/sigarang/laporan/LaporanPage.vue'),
      children: [
        {
          path: '/sigarang/laporan/stok',
          name: 'sigarang.laporan.stok',
          component: () =>
            import(
              'pages/simrs/sigarang/laporan/stok/IndexPage.vue'
            )
        }
        //   { path: '/admin/pegawai', name: 'admin.pegawai', component: () => import('pages/simrs/sigarang/admin/pegawai/IndexPage.vue') },
        //   { path: '/admin/user', name: 'admin.user', component: () => import('pages/simrs/sigarang/admin/user/IndexPage.vue') }
      ]
    },
    {
      path: '/sigarang/history',
      name: 'sigarang.history',
      component: () => import('pages/simrs/sigarang/history/IndexPage.vue'),
      children: [
        {
          path: '/sigarang/history/pemesanan',
          name: 'sigarang.history.pemesanan',
          component: () => import('pages/simrs/sigarang/history/pemesanan/IndexPage.vue')
        },
        {
          path: '/sigarang/history/penerimaan',
          name: 'sigarang.history.penerimaan',
          component: () => import('pages/simrs/sigarang/history/penerimaan/IndexPage.vue')
        },
        {
          path: '/sigarang/history/permintaan',
          name: 'sigarang.history.permintaan',
          component: () => import('pages/simrs/sigarang/history/permintaan/IndexPage.vue')
        },
        {
          path: '/sigarang/history/distribusidepo',
          name: 'sigarang.history.distribusidepo',
          component: () => import('pages/simrs/sigarang/history/distribusidepo/IndexPage.vue')
        },
        {
          path: '/sigarang/history/pemakaianruangan',
          name: 'sigarang.history.pemakaianruangan',
          component: () => import('pages/simrs/sigarang/history/pemakaianruangan/IndexPage.vue')
        },
        {
          path: '/sigarang/history/penerimaanruangan',
          name: 'sigarang.history.penerimaanruangan',
          component: () => import('pages/simrs/sigarang/history/penerimaanruangan/IndexPage.vue')
        },
        {
          path: '/sigarang/history/gudang',
          name: 'sigarang.history.gudang',
          component: () => import('pages/simrs/sigarang/history/gudang/IndexPage.vue')
        },
        {
          path: '/sigarang/history/retur',
          name: 'sigarang.history.retur',
          component: () => import('pages/simrs/sigarang/history/retur/IndexPage.vue')
        }
      ]
    },
    {
      path: '/sigarang/master',
      name: 'sigarang.master',
      component: () => import('pages/simrs/sigarang/master/MasterPage.vue'),
      children: [
        {
          path: '/sigarang/master/gedung',
          name: 'sigarang.master.gedung',
          component: () =>
            import('pages/simrs/sigarang/master/gedung/IndexPage.vue')
        },
        {
          path: '/sigarang/master/gudang',
          name: 'sigarang.master.gudang',
          component: () =>
            import('pages/simrs/sigarang/master/gudang/IndexPage.vue')
        },
        {
          path: '/sigarang/master/supplier',
          name: 'sigarang.master.supplier',
          component: () =>
            import('pages/simrs/sigarang/master/supplier/IndexPage.vue')
        },
        {
          path: '/sigarang/master/pegawai',
          name: 'sigarang.master.pegawai',
          component: () =>
            import('pages/simrs/sigarang/master/pegawai/IndexPage.vue')
        },
        {
          path: '/sigarang/master/satuan',
          name: 'sigarang.master.satuan',
          component: () =>
            import('pages/simrs/sigarang/master/satuan/IndexPage.vue')
        },
        {
          path: '/sigarang/master/penggunaruang',
          name: 'sigarang.master.penggunaruang',
          component: () =>
            import('pages/simrs/sigarang/master/penggunaruang/IndexPage.vue')
        },
        {
          path: '/sigarang/master/ruang',
          name: 'sigarang.master.ruang',
          component: () =>
            import('pages/simrs/sigarang/master/ruang/IndexPage.vue')
        },
        {
          path: '/sigarang/master/pengguna',
          name: 'sigarang.master.pengguna',
          component: () =>
            import('pages/simrs/sigarang/master/pengguna/IndexPage.vue')
        },
        {
          path: '/sigarang/master/barang108',
          name: 'sigarang.master.barang108',
          component: () =>
            import('pages/simrs/sigarang/master/barang108/IndexPage.vue')
        },
        {
          path: '/sigarang/master/barangrs',
          name: 'sigarang.master.barangrs',
          component: () =>
            import('pages/simrs/sigarang/master/barangrs/IndexPage.vue')
        },
        {
          path: '/sigarang/master/mapingbarang',
          name: 'sigarang.master.mapingbarang',
          component: () =>
            import('pages/simrs/sigarang/master/mapingbarang/IndexPage.vue')
        },
        {
          path: '/sigarang/master/minmaxstok',
          name: 'sigarang.master.minmaxstok',
          component: () =>
            import('pages/simrs/sigarang/master/minmaxstok/IndexPage.vue')
        },
        {
          path: '/sigarang/master/kontrakpengerjaan',
          name: 'sigarang.master.kontrakpengerjaan',
          component: () =>
            import(
              'pages/simrs/sigarang/master/kontrakpengerjaan/IndexPage.vue'
            )
        }
      ]
    },
    {
      path: '/sigarang/transaksi',
      name: 'sigarang.transaksi',
      component: () =>
        import('pages/simrs/sigarang/transaksi/TransaksiPage.vue'),
      children: [
        {
          path: '/sigarang/transaksi/pemesanan/:slug',
          name: 'sigarang.transaksi.pemesanan',
          component: () =>
            import('pages/simrs/sigarang/transaksi/pemesanan/IndexPage.vue')
        },
        {
          path: '/sigarang/transaksi/penerimaan/:slug',
          name: 'sigarang.transaksi.penerimaan',
          component: () =>
            import('pages/simrs/sigarang/transaksi/penerimaan/IndexPage.vue')
        },
        {
          path: '/sigarang/transaksi/permintaan/:slug',
          name: 'sigarang.transaksi.permintaan',
          component: () =>
            import('pages/simrs/sigarang/transaksi/permintaan/IndexPage.vue')
        },
        {
          path: '/sigarang/transaksi/verifpermintaan',
          name: 'sigarang.transaksi.verifpermintaan',
          component: () =>
            import(
              'pages/simrs/sigarang/transaksi/verifpermintaan/IndexPage.vue'
            )
        },
        {
          path: '/sigarang/transaksi/barangrusak',
          name: 'sigarang.transaksi.barangrusak',
          component: () =>
            import(
              'pages/simrs/sigarang/transaksi/barangrusak/IndexPage.vue'
            )
        },
        {
          path: '/sigarang/transaksi/bast',
          name: 'sigarang.transaksi.bast',
          component: () =>
            import(
              'pages/simrs/sigarang/transaksi/bast/IndexPage.vue'
            )
        },
        {
          path: '/sigarang/transaksi/pembayaran',
          name: 'sigarang.transaksi.pembayaran',
          component: () =>
            import(
              'pages/simrs/sigarang/transaksi/pembayaran/IndexPage.vue'
            )
        },
        {
          path: '/sigarang/transaksi/distribusi',
          name: 'sigarang.transaksi.distribusi',
          component: () =>
            import(
              'pages/simrs/sigarang/transaksi/distribusi/IndexPage.vue'
            )
        },
        {
          path: '/sigarang/transaksi/distribusilangsung/:slug',
          name: 'sigarang.transaksi.distribusilangsung',
          component: () =>
            import(
              'pages/simrs/sigarang/transaksi/distribusilangsung/IndexPage.vue'
            )
        },
        {
          path: '/sigarang/transaksi/distribusidepo',
          name: 'sigarang.transaksi.distribusidepo',
          component: () =>
            import(
              'pages/simrs/sigarang/transaksi/distribusidepo/IndexPage.vue'
            )
        },
        {
          path: '/sigarang/transaksi/penerimaandepo',
          name: 'sigarang.transaksi.penerimaandepo',
          component: () =>
            import(
              'pages/simrs/sigarang/transaksi/penerimaandepo/IndexPage.vue'
            )
        },
        {
          path: '/sigarang/transaksi/penerimaanruangan',
          name: 'sigarang.transaksi.penerimaanruangan',
          component: () =>
            import(
              'pages/simrs/sigarang/transaksi/penerimaanruangan/IndexPage.vue'
            )
        },
        {
          path: '/sigarang/transaksi/pengembalian',
          name: 'sigarang.transaksi.pengembalian',
          component: () =>
            import(
              'pages/simrs/sigarang/transaksi/pengembalian/IndexPage.vue'
            )
        },
        {
          path: '/sigarang/transaksi/pemakaianruangan',
          name: 'sigarang.transaksi.pemakaianruangan',
          component: () =>
            import(
              'pages/simrs/sigarang/transaksi/pemakaianruangan/IndexPage.vue'
            )
        }
      ]
    },
    {
      path: '/sigarang/setting',
      name: 'sigarang.setting',
      component: () => import('pages/simrs/sigarang/setting/IndexPage.vue')
      // children: [
      //   { path: '/history/pegawai', name: 'history.pegawai', component: () => import('pages/simrs/sigarang/history/pegawai/IndexPage.vue') },
      //   { path: '/history/user', name: 'history.user', component: () => import('pages/simrs/sigarang/history/user/IndexPage.vue') }
      // ]
    },

    {
      path: '/sigarang/notfound',
      component: () => import('pages/MidlewareNotFound.vue')
    }
  ]
}

export default sigarang
