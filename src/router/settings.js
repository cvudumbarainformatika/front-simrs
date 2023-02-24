const settings =
  {
    path: '/settings',
    component: () => import('pages/simrs/settings/layout/MainLayout.vue'),
    meta: { requireAuth: true },
    children: [
      // { path: '', redirect: '/pegawai/dashboard' },
      { path: '', redirect: '/settings/aplikasi' },
      {
        path: '/settings/aplikasi',
        name: 'settings.aplikasi',
        component: () => import('pages/simrs/settings/IndexPage.vue')
      }

    ]
  }

export default settings
