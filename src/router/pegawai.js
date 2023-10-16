const pegawai =
  {
    path: '/pegawai',
    // component: () => import('layouts/pegawai/AdminLayout.vue'),
    component: () => import('layouts/V2/IndexLayout.vue'),
    meta: { requireAuth: true },
    children: [
      // { path: '', redirect: '/pegawai/dashboard' },
      { path: '', name: 'pegawai', redirect: '/pegawai/dashboard' },
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
            path: '/pegawai/master/jadwal',
            name: 'pegawai.master.jadwal',
            component: () =>
              import('pages/simrs/pegawai/master/jadwal/IndexPage.vue')
          },
          {
            path: '/pegawai/master/cuti',
            name: 'pegawai.master.cuti',
            component: () =>
              import('pages/simrs/pegawai/master/cuti/IndexPage.vue')
          },
          {
            path: '/pegawai/master/prota',
            name: 'pegawai.master.prota',
            component: () =>
              import('pages/simrs/pegawai/master/prota/IndexPage.vue')
          },
          {
            path: '/pegawai/master/kategori',
            name: 'pegawai.master.kategori',
            component: () =>
              import('pages/simrs/pegawai/master/kategori/IndexPage.vue')
          }
        ]
      },
      {
        path: '/pegawai/user',
        name: 'pegawai.user',
        component: () => import('src/pages/simrs/pegawai/user/IndexPage.vue'),
        children: [
          {
            path: '/pegawai/user/list',
            name: 'pegawai.user.list',
            component: () =>
              import('pages/simrs/pegawai/user/list/IndexPage.vue')
          },
          {
            path: '/pegawai/user/libur',
            name: 'pegawai.user.libur',
            component: () =>
              import('pages/simrs/pegawai/user/libur/IndexPage.vue')
          }
          // {
          //   path: '/pegawai/user/rekapabsen',
          //   name: 'pegawai.user.rekapabsen',
          //   component: () =>
          //     import('pages/simrs/pegawai/user/rekapabsen/IndexPage.vue')
          // }
        ]
      },
      {
        path: '/pegawai/rekap',
        name: 'pegawai.rekap',
        component: () => import('src/pages/simrs/pegawai/user/IndexPage.vue'),
        children: [

          {
            path: '/pegawai/rekap/rekapabsen',
            name: 'pegawai.rekap.rekapabsen',
            component: () =>
              import('pages/simrs/pegawai/user/rekapabsen/IndexPage.vue')
          },
          {
            path: '/pegawai/rekap/report',
            name: 'pegawai.rekap.report',
            component: () =>
              import('pages/simrs/pegawai/rekap/report/IndexPage.vue')
          }
        ]
      },
      {
        path: '/pegawai/absensi',
        name: 'pegawai.absensi',
        component: () => import('pages/simrs/pegawai/absensi/IndexPage.vue'),
        children: [

          // {
          //   path: '/pegawai/absensi/qrcode',
          //   name: 'pegawai.absensi.qrcode',
          //   component: () =>
          //     import('pages/simrs/pegawai/absensi/qrcode/IndexPage.vue')
          // },
          {
            path: '/pegawai/absensi/extra',
            name: 'pegawai.absensi.extra',
            component: () =>
              import('pages/simrs/pegawai/absensi/extra/IndexPage.vue')
          }
        ]
      },
      {
        path: '/pegawai/mapping',
        name: 'pegawai.mapping',
        component: () => import('pages/simrs/pegawai/mapping/IndexPage.vue'),
        children: [
          {
            path: '/pegawai/mapping/dokter',
            name: 'pegawai.mapping.dokter',
            component: () =>
              import('pages/simrs/pegawai/mapping/dokter/IndexPage.vue')
          },
          {
            path: '/pegawai/mapping/bpjs',
            name: 'pegawai.mapping.bpjs',
            component: () =>
              import('pages/simrs/pegawai/mapping/bpjs/IndexPage.vue')
          }
        ]
      },

      {
        path: '/pegawai/notfound',
        component: () => import('pages/MidlewareNotFound.vue')
      }
    ]
  }

export default pegawai
