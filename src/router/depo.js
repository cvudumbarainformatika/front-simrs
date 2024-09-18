const depo = {
  path: '/depo',
  component: () => import('layouts/V2/IndexLayout.vue'),
  meta: { requireAuth: true },
  children: [
    { path: '', name: 'depo', redirect: '/depo/dashboard' },
    {
      path: '/depo/farmasi/dashboard',
      name: 'depo.farmasi.dashboard',
      component: () => import('pages/simrs/logistik/depo/IndexPage.vue')
    },
    {
      path: '/depo/farmasi',
      name: 'depo.farmasi',
      component: () => import('pages/simrs/logistik/depo/farmasi/IndexPage.vue'),
      children: [
        { path: '', name: 'depo.farmasi', redirect: '/depo/farmasi/dashboard' },
        {
          path: '/depo/farmasi/dashboard',
          name: 'depo.farmasi.dashboard',
          component: () => import('pages/simrs/logistik/depo/IndexPage.vue')
        },
        {
          path: '/depo/farmasi/permintaandepo',
          component: () => import('src/pages/simrs/logistik/depo/farmasi/permintaandepo/IndexPage.vue'),
          children: [
            { path: '', redirect: '/depo/farmasi/permintaandepo/permintaan' },
            {
              path: '/depo/farmasi/permintaandepo/permintaan',
              name: 'depo.farmasi.permintaandepo.permintaan',
              meta: { transition: 'slide-up' },
              component: () =>
                import('pages/simrs/logistik/depo/farmasi/permintaandepo/permintaan/IndexPage.vue')
            },
            {
              path: '/depo/farmasi/permintaandepo/listpermintaan',
              name: 'depo.farmasi.permintaandepo.listpermintaan',
              meta: { transition: 'slide-up' },
              component: () =>
                import('pages/simrs/logistik/depo/farmasi/permintaandepo/listpermintaan/IndexPage.vue')
            }
          ]
        },
        {
          path: '/depo/farmasi/penerimaan',
          component: () => import('src/pages/simrs/logistik/depo/farmasi/penerimaan/IndexPage.vue')
        },
        {
          path: '/depo/farmasi/distribusi-persiapan-operasi',
          component: () => import('src/pages/simrs/logistik/depo/farmasi/distribusipersiapanok/IndexPage.vue')
        },
        {
          path: '/depo/farmasi/formresep',
          component: () => import('src/pages/simrs/logistik/depo/farmasi/formresep/IndexPage.vue')
        },
        {
          path: '/depo/farmasi/mutasi',
          component: () => import('src/pages/simrs/logistik/depo/farmasi/mutasi/IndexPage.vue')
        },
        {
          path: '/depo/farmasi/eresep',
          component: () => import('src/pages/simrs/logistik/depo/farmasi/eresep/IndexPage.vue')
        },
        {
          path: '/depo/farmasi/distribusipermintaanruangan',
          component: () => import('src/pages/simrs/logistik/depo/farmasi/distribusipermintaanruangan/IndexPage.vue')
        },
        {
          path: '/depo/farmasi/retur',
          component: () => import('src/pages/simrs/logistik/depo/farmasi/retur/IndexPage.vue'),
          children: [
            { path: '', redirect: '/depo/farmasi/retur/depo' },
            {
              path: '/depo/farmasi/retur/depo',
              name: 'depo.farmasi.retur.depo',
              meta: { transition: 'slide-up' },
              component: () =>
                import('pages/simrs/logistik/depo/farmasi/retur/IndexPage.vue')
            }
          ]
        },

        {
          path: '/depo/farmasi/kartustok',
          component: () => import('pages/simrs/logistik/gudang/farmasi/kartustok/IndexPage.vue')
        },

        {
          path: '/depo/farmasi/stoksekarang',
          // name: 'farmasi.stoksekarang',
          component: () => import('pages/simrs/farmasi/stoksekarang/IndexPage.vue')
        },
        {
          path: '/depo/farmasi/stokmindepo',
          // name: 'farmasi.stokmindepo',
          component: () => import('pages/simrs/farmasi/stokmindepo/IndexPage.vue')
        },
        {
          path: '/depo/farmasi/stokopname',
          // name: 'farmasi.stokmindepo',
          component: () => import('pages/simrs/farmasi/stok/IndexPage.vue')
        },
        {
          path: '/depo/farmasi/penjualan',
          // name: 'farmasi.stokmindepo',
          component: () => import('pages/simrs/logistik/depo/farmasi/penjualanbebas/IndexPage.vue')
        },
        {
          path: '/depo/farmasi/returgudang',
          // name: 'farmasi.stokmindepo',
          component: () => import('pages/simrs/logistik/depo/farmasi/returgudang/IndexPage.vue')
        }
      ]
    },
    {
      path: '/depo/nonfarmasi',
      name: 'depo.nonfarmasi',
      component: () => import('pages/simrs/logistik/depo/nonfarmasi/IndexPage.vue'),
      children: [
        { path: '', name: 'depo', redirect: '/depo/dashboard' }
      ]
    },
    {
      path: '/depo/notfound',
      component: () => import('pages/MidlewareNotFound.vue')
    }
  ]
}
export default depo
