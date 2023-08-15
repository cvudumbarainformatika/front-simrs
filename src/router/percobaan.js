const percobaan =
  {
    path: '/percobaan',
    component: () => import('pages/simrs/settings/layout/MainLayout.vue'),
    meta: { requireAuth: true },
    children: [
      // { path: '', redirect: '/pegawai/dashboard' },
      { path: '', redirect: '/percobaan/aplikasi' },
      {
        path: '/percobaan/aplikasi',
        name: 'percobaan.aplikasi',
        component: () => import('pages/percobaan/IndexPage.vue')
        // component: () => import('pages/percobaan/HandlerPage.vue')
      }

    ]
  }

export default percobaan
