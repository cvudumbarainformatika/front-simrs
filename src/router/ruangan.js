const ruangan = {
  path: '/ruangan',
  component: () => import('layouts/V2/IndexLayout.vue'),
  meta: { requireAuth: true },
  children: [
    { path: '', name: 'ruangan', redirect: '/ruangan/dashboard' },
    {
      path: '/ruangan/dashboard',
      name: 'ruangan.dashboard',
      component: () => import('pages/simrs/logistik/ruangan/IndexPage.vue')
    },
    {
      path: '/ruangan/farmasi',
      name: 'ruangan.farmasi',
      component: () => import('pages/simrs/logistik/ruangan/farmasi/IndexPage.vue'),
      children: [
        { path: '', name: 'ruangan.farmasi', redirect: '/ruangan/farmasi/dashboard' },
        {
          path: '/ruangan/farmasi/dashboard',
          name: 'ruangan.farmasi.dashboard',
          component: () => import('pages/simrs/logistik/ruangan/IndexPage.vue')
        },
        {
          path: '/ruangan/farmasi/permintaanruangan',
          component: () => import('src/pages/simrs/farmasi/permintaanruangan/IndexPage.vue'),
          children: [
            { path: '', redirect: '/ruangan/farmasi/permintaanruangan/permintaanruangan' },
            {
              path: '/ruangan/farmasi/permintaanruangan/permintaanruangan',
              name: 'ruangan.farmasi.permintaanruangan.permintaanruangan',
              meta: { transition: 'slide-up' },
              component: () =>
                import('pages/simrs/logistik/ruangan/farmasi/permintaanruangan/permintaan/IndexPage.vue')
            },
            {
              path: '/ruangan/farmasi/permintaanruangan/listpermintaanruangan',
              name: 'ruangan.farmasi.permintaanruangan.listpermintaanruangan',
              meta: { transition: 'slide-up' },
              component: () =>
                import('pages/simrs/logistik/ruangan/farmasi/permintaanruangan/listpermintaan/IndexPage.vue')
            }
          ]
        },
        {
          path: '/ruangan/farmasi/pemakaianruangan',
          component: () => import('src/pages/simrs/logistik/ruangan/farmasi/pemakaianruangan/IndexPage.vue'),
          children: [
            { path: '', redirect: '/ruangan/farmasi/pemakaianruangan/pemakaian' },
            {
              path: '/ruangan/farmasi/pemakaianruangan/pemakaian',
              name: 'ruangan.farmasi.pemakaianruangan.pemakaian',
              meta: { transition: 'slide-up' },
              component: () =>
                import('pages/simrs/logistik/ruangan/farmasi/pemakaianruangan/pemakaian/IndexPage.vue')
            },
            {
              path: '/ruangan/farmasi/pemakaianruangan/listpemakaian',
              name: 'ruangan.farmasi.pemakaianruangan.listpemakaian',
              meta: { transition: 'slide-up' },
              component: () =>
                import('pages/simrs/logistik/ruangan/farmasi/pemakaianruangan/listpemakaian/IndexPage.vue')
            }
          ]
        },
        {
          path: '/ruangan/farmasi/retur',
          component: () => import('src/pages/simrs/logistik/ruangan/farmasi/retur/IndexPage.vue'),
          children: [
            { path: '', redirect: '/farmasi/retur/ruangan' },
            {
              path: '/ruangan/farmasi/retur/ruangan',
              name: 'ruangan.farmasi.retur.ruangan',
              meta: { transition: 'slide-up' },
              component: () =>
                import('pages/simrs/logistik/ruangan/farmasi/retur/IndexPage.vue')
            }
          ]
        }
      ]
    },
    {
      path: '/ruangan/nonfarmasi',
      name: 'ruangan.nonfarmasi',
      component: () => import('pages/simrs/logistik/ruangan/nonfarmasi/IndexPage.vue'),
      children: [
        { path: '', name: 'ruangan', redirect: '/ruangan/dashboard' }
      ]
    }
  ]
}
export default ruangan
