
const routes = [
  {
    path: '/',
    component: () => import('layouts/Admin/v2/AdminLayout.vue'),
    meta: { requireAuth: true },
    children: [
      { path: '', redirect: '/admin/sso' },
      {
        path: '/admin/sso',
        name: 'admin.sso',
        meta: { transition: 'fade', mode: '' },
        component: () =>
          import(
            /* webpackChunkName: "admin.sso" */ 'pages/simrs/SSO/IndexPage.vue'
          )
      },
      {
        path: '/admin/laborat',
        component: () => import('pages/simrs/laborat/IndexLayout.vue'),
        children: [
          { path: '', redirect: '/admin/laborat/dashboard' },
          {
            path: '/admin/laborat/dashboard',
            name: 'lab.dashboard',
            meta: { transition: 'fade', mode: '' },
            component: () => import('pages/simrs/laborat/DashboardPage.vue')
          },
          {
            path: '/admin/laborat/table',
            name: 'lab.laborat',
            component: () => import('pages/simrs/laborat/IndexPage.vue')
          },
          {
            path: '/admin/laborat/permintaan-luar',
            component: () =>
              import('pages/simrs/laborat/permintaanluar/LayoutKhusus.vue'),
            children: [
              {
                path: '/admin/laborat/permintaan-luar/:page?',
                name: 'lab.permintaan-luar',
                component: () =>
                  import('pages/simrs/laborat/permintaanluar/IndexPage.vue')
              }
            ]
          }
        ]
      },
      {
        path: '/admin/settings',
        component: () => import('pages/simrs/settings/IndexPage.vue')
      },
      {
        path: '/admin/settings/menu',
        name: 'settings.menu',
        component: () => import('pages/simrs/settings/menu/IndexPage.vue')
      }
    ]
  },
  {
    path: '/print',
    component: () => import('layouts/Admin/v2/PrintLayout.vue'),
    meta: { requireAuth: true },
    children: [
      { path: '', redirect: '/print/page' },
      {
        path: '/print/page/:slug',
        name: 'print.page',
        component: () => import('pages/simrs/print/IndexPage.vue')
      }
    ]
  },

  // Pegawai
  {
    path: '/pegawai',
    component: () => import('layouts/pegawai/AdminLayout.vue'),
    meta: { requireAuth: true },
    children: [
      { path: '', redirect: '/pegawai/dashboard' },
      {
        path: '/pegawai/dashboard',
        name: 'pegawai.dashboard',
        component: () => import('pages/simrs/pegawai/IndexPage.vue')
      },
      {
        path: '/pegawai/master',
        name: 'pegawai.master',
        component: () => import('pages/simrs/pegawai/master/IndexPage.vue'),
        children: [
          {
            path: '/pegawai/master/cuti',
            name: 'pegawai.master.cuti',
            component: () =>
              import('pages/simrs/pegawai/master/cuti/IndexPage.vue')
          }
        ]
      },
      {
        path: '/pegawai/absensi',
        name: 'pegawai.absensi',
        component: () => import('pages/simrs/pegawai/absensi/IndexPage.vue'),
        children: [
          {
            path: '/pegawai/absensi/jadwal',
            name: 'pegawai.absensi.jadwal',
            component: () =>
              import('pages/simrs/pegawai/absensi/jadwal/IndexPage.vue')
          },
          {
            path: '/pegawai/absensi/prota',
            name: 'pegawai.absensi.prota',
            component: () =>
              import('pages/simrs/pegawai/absensi/prota/IndexPage.vue')
          },
          {
            path: '/pegawai/absensi/qrcode',
            name: 'pegawai.absensi.qrcode',
            component: () =>
              import('pages/simrs/pegawai/absensi/qrcode/IndexPage.vue')
          },
          {
            path: '/pegawai/absensi/extra',
            name: 'pegawai.absensi.extra',
            component: () =>
              import('pages/simrs/pegawai/absensi/extra/IndexPage.vue')
          }
        ]
      }
    ]
  },
  // sigarang

  {
    path: '/sigarang',
    component: () => import('layouts/sigarang/AdminLayout.vue'),
    meta: { requireAuth: true },
    children: [
      { path: '', redirect: '/sigarang/dashboard' },
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
        component: () => import('pages/simrs/sigarang/laporan/IndexPage.vue')
        // children: [
        //   { path: '/admin/pegawai', name: 'admin.pegawai', component: () => import('pages/simrs/sigarang/admin/pegawai/IndexPage.vue') },
        //   { path: '/admin/user', name: 'admin.user', component: () => import('pages/simrs/sigarang/admin/user/IndexPage.vue') }
        // ]
      },
      {
        path: '/sigarang/history',
        name: 'sigarang.history',
        component: () => import('pages/simrs/sigarang/history/IndexPage.vue')
        // children: [
        //   { path: '/history/pegawai', name: 'history.pegawai', component: () => import('pages/simrs/sigarang/history/pegawai/IndexPage.vue') },
        //   { path: '/history/user', name: 'history.user', component: () => import('pages/simrs/sigarang/history/user/IndexPage.vue') }
        // ]
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
      }
    ]
  },

  // login
  {
    path: '/login',
    component: () => import('layouts/Auth/AuthLayout.vue'),
    meta: { requireAuth: false },
    children: [
      { path: '', component: () => import('pages/auth/AuthPage.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
