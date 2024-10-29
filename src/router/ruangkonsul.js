const ruangkonsul =
  {
    path: '/rkd',
    component: () => import('pages/simrs/settings/layout/MainLayout.vue'),
    meta: { requireAuth: true },
    children: [
      // { path: '', redirect: '/pegawai/dashboard' },
      { path: '', redirect: '/rkd/lembarkonsul' },
      {
        path: '/rkd/lembarkonsul',
        name: 'rkd.lembarkonsul',
        component: () => import('pages/simrs/ruangkonsuldokter/IndexPage.vue')
        // component: () => import('pages/percobaan/HandlerPage.vue')
      }

    ]
  }

export default ruangkonsul
