const ptk = {
  path: '/ptk',
  component: () => import('layouts/V2/IndexLayout.vue'),
  meta: { requireAuth: true },
  children: [
    { path: '', name: 'ptk', redirect: '/ptk/dashboard' },
    {
      path: '/ptk/dashboard',
      name: 'ptk.dashboard',
      component: () => import('pages/simrs/logistik/ptk/IndexPage.vue')
    },
    {
      path: '/ptk/farmasi',
      // name: 'ptk.farmasi',
      component: () => import('pages/simrs/logistik/ptk/farmasi/IndexPage.vue'),
      children: [
        { path: '', name: 'ptk.farmasi', redirect: '/ptk/farmasi/dashboard' },
        {
          path: '/ptk/farmasi/dashboard',
          name: 'ptk.farmasi.dashboard',
          component: () => import('pages/simrs/logistik/ptk/IndexPage.vue')
        },
        {
          path: '/ptk/farmasi/pemesanan',
          // name: 'farmasi.pemesanan', //sing duwe children tak boleh pake name
          component: () => import('src/pages/simrs/logistik/ptk/farmasi/pemesanan/IndexPage.vue'),
          children: [
            { path: '', redirect: '/ptk/farmasi/pemesanan/pesanan' },
            {
              path: '/ptk/farmasi/pemesanan/pesanan',
              // name: 'ptk.farmasi.pemesanan.pesanan',
              meta: { transition: 'slide-up' },
              component: () =>
                import('pages/simrs/logistik/ptk/farmasi/pemesanan/pemesanan/IndexPage.vue')
            },
            {
              path: '/ptk/farmasi/pemesanan/listpesanan',
              // name: 'ptk.farmasi.pemesanan.listpesanan',
              meta: { transition: 'slide-up' },
              component: () =>
                import('pages/simrs/logistik/ptk/farmasi/pemesanan/listpesanan/IndexPage.vue')
            }
          ]
        },
        {
          path: '/ptk/farmasi/bast',
          component: () => import('pages/simrs/logistik/ptk/farmasi/bast/IndexPage.vue')
        }
      ]
    },
    {
      path: '/ptk/nonfarmasi',
      // name: 'ptk.nonfarmasi',
      component: () => import('pages/simrs/logistik/ptk/nonfarmasi/IndexPage.vue'),
      children: [
        { path: '', name: 'ptk', redirect: '/ptk/dashboard' }
      ]
    },
    {
      path: '/ptk/notfound',
      component: () => import('pages/MidlewareNotFound.vue')
    }
  ]
}
export default ptk
