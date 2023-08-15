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
      component: () => import('pages/simrs/farmasi/pemesanan/IndexPage.vue'),
      children: [
        { path: '', redirect: '/farmasi/pemesanan/rencana' },
        {
          path: '/farmasi/pemesanan/rencana',
          name: 'farmasi.pemesanan.rencana',
          meta: { transition: 'slide-up' },
          component: () =>
            import('pages/simrs/farmasi/pemesanan/rencana/IndexPage.vue')
        },
        {
          path: '/farmasi/pemesanan/pesanan',
          name: 'farmasi.pemesanan.pesanan',
          meta: { transition: 'slide-up' },
          component: () =>
            import('pages/simrs/farmasi/pemesanan/pesanan/IndexPage.vue')
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
