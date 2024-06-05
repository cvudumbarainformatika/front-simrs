const hemodialisa = {
  path: '/hemodialisa',
  component: () => import('layouts/V2/IndexLayout.vue'),
  meta: { requireAuth: true },
  children: [
    { path: '', redirect: '/hemodialisa/pengunjung' },
    {
      path: '/hemodialisa/pengunjung',
      name: 'hemodialisa.pengunjung',
      component: () => import('pages/simrs/hemodialisa/pengunjung/IndexPage.vue')
    },
    // {
    //   path: '/ranap/suratkontrol',
    //   name: 'ranap.suratkontrol',
    //   component: () => import('pages/simrs/ranap/suratkontrol/IndexPage.vue')
    // },

    {
      path: '/hemodialisa/notfound',
      component: () => import('pages/MidlewareNotFound.vue')
    }

  ]
}
export default hemodialisa
