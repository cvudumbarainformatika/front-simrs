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
          path: '/farmasi/penerimaan/listpenerimaan',
          name: 'farmasi.penerimaan.listpenerimaan',
          meta: { transition: 'slide-up' },
          component: () =>
            import('pages/simrs/farmasi/penerimaan/listpenerimaan/IndexPage.vue')
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
