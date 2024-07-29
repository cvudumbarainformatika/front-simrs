const radiologi = {
  path: '/radiologi',
  component: () => import('layouts/V2/IndexLayout.vue'),
  meta: { requireAuth: true },
  children: [
    { path: '', redirect: '/radiologi/pengunjung' },
    {
      path: '/radiologi/pengunjung',
      name: 'radiologi.pengunjung',
      component: () => import('pages/simrs/radiologi/pengunjung/IndexPage.vue')
    },
    // {
    //   path: '/ranap/suratkontrol',
    //   name: 'ranap.suratkontrol',
    //   component: () => import('pages/simrs/ranap/suratkontrol/IndexPage.vue')
    // },

    {
      path: '/radiologi/notfound',
      component: () => import('pages/MidlewareNotFound.vue')
    }

  ]
}
export default radiologi
