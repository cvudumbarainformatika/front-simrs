const farmasi = {
  path: '/farmasi',
  component: () => import('layouts/V2/IndexLayout.vue'),
  meta: { requireAuth: true },
  children: [
    { path: '', name: 'farmasi', redirect: '/farmasi/dashboard' },
    {
      path: '/farmasi/dashboard',
      name: 'farmasi.dashboard',
      component: () => import('pages/simrs/farmasi/IndexPage.vue')
    },
    {
      path: '/farmasi/pemesanan',
      // name: 'farmasi.pemesanan', //sing duwe children tak boleh pake name
      component: () => import('src/pages/simrs/farmasi/pemesanan/IndexPage.vue'),
      children: [
        { path: '', redirect: '/farmasi/pemesanan/pesanan' },
        {
          path: '/farmasi/pemesanan/pesanan',
          name: 'farmasi.pemesanan.pesanan',
          meta: { transition: 'slide-up' },
          component: () =>
            import('pages/simrs/farmasi/pemesanan/pemesanan/IndexPage.vue')
        },
        {
          path: '/farmasi/pemesanan/listpesanan',
          name: 'farmasi.pemesanan.listpesanan',
          meta: { transition: 'slide-up' },
          component: () =>
            import('pages/simrs/farmasi/pemesanan/listpesanan/IndexPage.vue')
        }
      ]
    },
    {
      path: '/farmasi/rencanapemesanan',
      // name: 'farmasi.pemesanan', //sing duwe children tak boleh pake name
      component: () => import('src/pages/simrs/farmasi/rencanapemesanan/IndexPage.vue'),
      children: [
        { path: '', redirect: '/farmasi/rencanapemesanan/rencana' },
        {
          path: '/farmasi/rencanapemesanan/rencana',
          name: 'farmasi.rencanapemesanan.rencana',
          meta: { transition: 'slide-up' },
          component: () =>
            import('pages/simrs/farmasi/rencanapemesanan/rencana/IndexPage.vue')
        },
        {
          path: '/farmasi/rencanapemesanan/listrencanapesanan',
          name: 'farmasi.rencanapemesanan.listrencanapesanan',
          meta: { transition: 'slide-up' },
          component: () =>
            import('pages/simrs/farmasi/rencanapemesanan/listrencanan/IndexPage.vue')
        }
      ]
    },
    {
      path: '/farmasi/penerimaan',
      component: () => import('src/pages/simrs/farmasi/penerimaan/IndexPage.vue'),
      children: [
        { path: '', redirect: '/farmasi/penerimaan/penerimaan' },
        {
          path: '/farmasi/penerimaan/penerimaan',
          name: 'farmasi.penerimaan.penerimaan',
          meta: { transition: 'slide-up' },
          component: () =>
            import('pages/simrs/farmasi/penerimaan/penerimaan/IndexPage.vue')
        },
        {
          path: '/farmasi/penerimaan/penerimaanlangsung',
          name: 'farmasi.penerimaan.penerimaanlangsung',
          meta: { transition: 'slide-up' },
          component: () =>
            import('pages/simrs/farmasi/penerimaan/penerimaanlangsung/IndexPage.vue')
        },
        {
          path: '/farmasi/penerimaan/listpenerimaan',
          name: 'farmasi.penerimaan.listpenerimaan',
          meta: { transition: 'slide-up' },
          component: () =>
            import('pages/simrs/farmasi/penerimaan/listpenerimaan/IndexPage.vue')
        }
      ]
    },
    {
      path: '/farmasi/permintaandepo',
      component: () => import('src/pages/simrs/farmasi/permintaandepo/IndexPage.vue'),
      children: [
        { path: '', redirect: '/farmasi/permintaandepo/permintaan' },
        {
          path: '/farmasi/permintaandepo/permintaan',
          name: 'farmasi.permintaandepo.permintaan',
          meta: { transition: 'slide-up' },
          component: () =>
            import('pages/simrs/farmasi/permintaandepo/permintaan/IndexPage.vue')
        },
        {
          path: '/farmasi/permintaandepo/listpermintaan',
          name: 'farmasi.permintaandepo.listpermintaan',
          meta: { transition: 'slide-up' },
          component: () =>
            import('pages/simrs/farmasi/permintaandepo/listpermintaan/IndexPage.vue')
        }
      ]
    },
    {
      path: '/farmasi/verifpermintaandepo',
      component: () => import('src/pages/simrs/farmasi/verifpermintaandepo/IndexPage.vue'),
      children: [
        { path: '', redirect: '/farmasi/verifpermintaandepo/verifpermintaan' },
        {
          path: '/farmasi/verifpermintaandepo/verifpermintaan',
          name: 'farmasi.verifpermintaandepo.verifpermintaan',
          meta: { transition: 'slide-up' },
          component: () =>
            import('pages/simrs/farmasi/verifpermintaandepo/verif/IndexPage.vue')
        },
        {
          path: '/farmasi/verifpermintaandepo/listverif',
          name: 'farmasi.verifpermintaandepo.listverif',
          meta: { transition: 'slide-up' },
          component: () =>
            import('pages/simrs/farmasi/verifpermintaandepo/listverif/IndexPage.vue')
        }
      ]
    },
    {
      path: '/farmasi/distribusipermintaandepo',
      component: () => import('src/pages/simrs/farmasi/distribusipermintaandepo/IndexPage.vue'),
      children: [
        { path: '', redirect: '/farmasi/distribusipermintaandepo/distribusipermintaan' },
        {
          path: '/farmasi/distribusipermintaandepo/distribusipermintaan',
          name: 'farmasi.distribusipermintaandepo.distribusipermintaan',
          meta: { transition: 'slide-up' },
          component: () =>
            import('pages/simrs/farmasi/distribusipermintaandepo/distribusi/IndexPage.vue')
        },
        {
          path: '/farmasi/distribusipermintaandepo/listdistribusi',
          name: 'farmasi.distribusipermintaandepo.listdistribusi',
          meta: { transition: 'slide-up' },
          component: () =>
            import('pages/simrs/farmasi/distribusipermintaandepo/listdistribusi/IndexPage.vue')
        }
      ]
    },
    {
      path: '/farmasi/permintaanruangan',
      component: () => import('src/pages/simrs/farmasi/permintaanruangan/IndexPage.vue'),
      children: [
        { path: '', redirect: '/farmasi/permintaanruangan/permintaanruangan' },
        {
          path: '/farmasi/permintaanruangan/permintaanruangan',
          name: 'farmasi.permintaanruangan.permintaanruangan',
          meta: { transition: 'slide-up' },
          component: () =>
            import('pages/simrs/farmasi/permintaanruangan/permintaan/IndexPage.vue')
        },
        {
          path: '/farmasi/permintaanruangan/listpermintaanruangan',
          name: 'farmasi.permintaanruangan.listpermintaanruangan',
          meta: { transition: 'slide-up' },
          component: () =>
            import('pages/simrs/farmasi/permintaanruangan/listpermintaan/IndexPage.vue')
        }
      ]
    },
    {
      path: '/farmasi/pemakaianruangan',
      component: () => import('src/pages/simrs/farmasi/pemakaianruangan/IndexPage.vue'),
      children: [
        { path: '', redirect: '/farmasi/pemakaianruangan/pemakaianruangan' },
        {
          path: '/farmasi/pemakaianruangan/pemakaianruangan',
          name: 'farmasi.pemakaianruangan.pemakaianruangan',
          meta: { transition: 'slide-up' },
          component: () =>
            import('pages/simrs/farmasi/pemakaianruangan/pemakaian/IndexPage.vue')
        },
        {
          path: '/farmasi/pemakaianruangan/listpemakaianruangan',
          name: 'farmasi.pemakaianruangan.listpemakaianruangan',
          meta: { transition: 'slide-up' },
          component: () =>
            import('pages/simrs/farmasi/pemakaianruangan/listpemakaian/IndexPage.vue')
        }
      ]
    },
    {
      path: '/farmasi/retur',
      component: () => import('src/pages/simrs/farmasi/retur/IndexPage.vue'),
      children: [
        { path: '', redirect: '/farmasi/retur/depo' },
        {
          path: '/farmasi/retur/depo',
          name: 'farmasi.retur.depo',
          meta: { transition: 'slide-up' },
          component: () =>
            import('pages/simrs/farmasi/retur/depo/IndexPage.vue')
        },
        {
          path: '/farmasi/retur/ruangan',
          name: 'farmasi.retur.ruangan',
          meta: { transition: 'slide-up' },
          component: () =>
            import('pages/simrs/farmasi/retur/ruangan/IndexPage.vue')
        }
      ]
    },

    {
      path: '/farmasi/notfound',
      component: () => import('pages/MidlewareNotFound.vue')
    }

  ]
}
export default farmasi
