const igd = {
  path: '/igd',
  component: () => import('layouts/V2/IndexLayout.vue'),
  meta: { requireAuth: true },
  children: [
    { path: '', redirect: '/igd/pengunjung' },
    {
      path: '/igd/pengunjung',
      name: 'igd.pengunjung',
      component: () => import('pages/simrs/igd/pengunjung/IndexPage.vue')
    },
    // {
    //   path: '/igd/suratkontrol',
    //   name: 'igd.suratkontrol',
    //   component: () => import('pages/simrs/igd/suratkontrol/IndexPage.vue')
    // },

    {
      path: '/igd/notfound',
      component: () => import('pages/MidlewareNotFound.vue')
    }

  ]
}
export default igd
