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
      path: '/farmasi/stok',
      name: 'farmasi.stok',
      component: () => import('pages/simrs/farmasi/stok/IndexPage.vue')
    },
    {
      path: '/farmasi/verif-rencana-pesanan',
      name: 'farmasi.verif-rencana-pesanan',
      component: () => import('pages/simrs/farmasi/verifrencanapemesanan/IndexPage.vue')
    },

    {
      path: '/farmasi/notfound',
      component: () => import('pages/MidlewareNotFound.vue')
    }

  ]
}
export default farmasi
