const gudang = {
  path: '/gudang',
  component: () => import('layouts/V2/IndexLayout.vue'),
  meta: { requireAuth: true },
  children: [
    { path: '', name: 'gudang', redirect: '/gudang/farmasi' },
    {
      path: '/gudang/dashboard',
      component: () => import('pages/simrs/logistik/gudang/IndexPage.vue')
    },
    {
      path: '/gudang/farmasi',
      component: () => import('pages/simrs/logistik/gudang/farmasi/IndexPage.vue'),
      children: [
        { path: '', name: 'gudang.farmasi', redirect: '/gudang/farmasi/dashboard' },
        {
          path: '/gudang/farmasi/dashboard',
          name: 'gudang.farmasi.dashboard',
          component: () => import('pages/simrs/logistik/gudang/IndexPage.vue')
        },
        {
          path: '/gudang/farmasi/rencanapemesanan',
          // name: 'farmasi.pemesanan', //sing duwe children tak boleh pake name
          component: () => import('src/pages/simrs/logistik/gudang/farmasi/rencanapemesanan/IndexPage.vue'),
          children: [
            { path: '', redirect: '/gudang/farmasi/rencanapemesanan/rencana' },
            {
              path: '/gudang/farmasi/rencanapemesanan/rencana',
              name: 'gudang.farmasi.rencanapemesanan.rencana',
              // meta: { transition: 'slide-up' },
              component: () =>
                import('pages/simrs/logistik/gudang/farmasi/rencanapemesanan/rencana/IndexPage.vue')
            },
            {
              path: '/gudang/farmasi/rencanapemesanan/listrencanapesanan',
              name: 'gudang.farmasi.rencanapemesanan.listrencanapesanan',
              meta: { transition: 'slide-up' },
              component: () =>
                import('pages/simrs/logistik/gudang/farmasi/rencanapemesanan/listrencanan/IndexPage.vue')
            }
          ]
        },
        {
          path: '/gudang/farmasi/penerimaan',
          component: () => import('src/pages/simrs/logistik/gudang/farmasi/penerimaan/IndexPage.vue'),
          children: [
            { path: '', redirect: '/gudang/farmasi/penerimaan/penerimaan' },
            {
              path: '/gudang/farmasi/penerimaan/penerimaan',
              name: 'gudang/farmasi.penerimaan.penerimaan',
              meta: { transition: 'slide-up' },
              component: () =>
                import('pages/simrs/logistik/gudang/farmasi/penerimaan/penerimaan/IndexPage.vue')
            },
            {
              path: '/gudang/farmasi/penerimaan/penerimaanlangsung',
              name: 'gudang.farmasi.penerimaan.penerimaanlangsung',
              meta: { transition: 'slide-up' },
              component: () =>
                import('pages/simrs/logistik/gudang/farmasi/penerimaan/penerimaanlangsung/IndexPage.vue')
            },
            {
              path: '/gudang/farmasi/penerimaan/listpenerimaan',
              name: 'gudang.farmasi.penerimaan.listpenerimaan',
              meta: { transition: 'slide-up' },
              component: () =>
                import('pages/simrs/logistik/gudang/farmasi/penerimaan/listpenerimaan/IndexPage.vue')
            }
          ]
        },
        {
          path: '/gudang/farmasi/verifpermintaandepo',
          component: () => import('src/pages/simrs/logistik/gudang/farmasi/verifpermintaandepo/IndexPage.vue'),
          children: [
            // { path: '', redirect: '/gudang/farmasi/verifpermintaandepo/verifpermintaan' },
            {
              path: '/gudang/farmasi/verifpermintaandepo/verifpermintaan',
              name: 'gudang.farmasi.verifpermintaandepo.verifpermintaan',
              meta: { transition: 'slide-up' },
              component: () =>
                import('pages/simrs/logistik/gudang/farmasi/verifpermintaandepo/IndexPage.vue')
            },
            {
              path: '/gudang/farmasi/verifpermintaandepo/listverif',
              name: 'gudang.farmasi.verifpermintaandepo.listverif',
              meta: { transition: 'slide-up' },
              component: () =>
                import('pages/simrs/logistik/gudang/farmasi/verifpermintaandepo/listverif/IndexPage.vue')
            },
            {
              path: '/gudang/farmasi/notfound'
            }
          ]
        },
        {
          path: '/gudang/farmasi/distribusipermintaandepo',
          component: () => import('src/pages/simrs/logistik/gudang/farmasi/distribusipermintaandepo/IndexPage.vue'),
          children: [
            { path: '', redirect: '/gudang/farmasi/distribusipermintaandepo/distribusipermintaan' },
            {
              path: '/gudang/farmasi/distribusipermintaandepo/distribusipermintaan',
              name: 'gudang.farmasi.distribusipermintaandepo.distribusipermintaan',
              meta: { transition: 'slide-up' },
              component: () =>
                import('pages/simrs/logistik/gudang/farmasi/distribusipermintaandepo/distribusi/IndexPage.vue')
            },
            {
              path: '/gudang/farmasi/distribusipermintaandepo/listdistribusi',
              name: 'gudang.farmasi.distribusipermintaandepo.listdistribusi',
              meta: { transition: 'slide-up' },
              component: () =>
                import('pages/simrs/logistik/gudang/farmasi/distribusipermintaandepo/listdistribusi/IndexPage.vue')
            }
          ]
        },
        {
          path: '/gudang/farmasi/retur',
          component: () => import('src/pages/simrs/logistik/gudang/farmasi/retur/IndexPage.vue')
          // children: [
          //   { path: '', redirect: '/gudang/farmasi/retur/distribusipermintaan' },
          //   {
          //     path: '/gudang/farmasi/retur/distribusipermintaan',
          //     name: 'gudang.farmasi.retur.distribusipermintaan',
          //     meta: { transition: 'slide-up' },
          //     component: () =>
          //       import('pages/simrs/logistik/gudang/farmasi/retur/distribusi/IndexPage.vue')
          //   },
          //   {
          //     path: '/gudang/farmasi/retur/listdistribusi',
          //     name: 'gudang.farmasi.retur.listdistribusi',
          //     meta: { transition: 'slide-up' },
          //     component: () =>
          //       import('pages/simrs/logistik/gudang/farmasi/retur/listdistribusi/IndexPage.vue')
          //   }
          // ]
        },
        {
          path: '/gudang/farmasi/kartustok',
          component: () => import('pages/simrs/logistik/gudang/farmasi/kartustok/IndexPage.vue')
        },
        {
          path: '/gudang/farmasi/notfound',
          component: () => import('pages/MidlewareNotFound.vue')
        }
      ]
    },
    {
      path: '/gudang/nonfarmasi',
      component: () => import('pages/simrs/logistik/gudang/nonfarmasi/IndexPage.vue'),
      children: [
        { path: '', name: 'gudang', redirect: '/gudang/dashboard' },

        {
          path: '/gudang/nonfarmasi/notfound',
          component: () => import('pages/MidlewareNotFound.vue')
        }
      ]
    },
    {
      path: '/gudang/notfound',
      component: () => import('pages/MidlewareNotFound.vue')
    }
  ]
}
export default gudang
