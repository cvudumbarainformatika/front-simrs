const siasik = {
  path: '/siasik',
  component: () => import('layouts/V2/IndexLayout.vue'),
  meta: { requireAuth: true },
  children: [
    // { path: '', redirect: '/siasik/mboh' },
    // {
    //   path: '/satset/strukturorganisasi',
    //   name: 'satset.strukturorganisasi',
    //   component: () => import('pages/satset/strukturorganisasi/IndexPage.vue')
    // },
    // {
    //   path: '/satset/location',
    //   name: 'satset.location',
    //   component: () => import('pages/satset/location/IndexPage.vue')
    // },
    // {
    //   path: '/satset/practitioner',
    //   name: 'satset.practitioner',
    //   component: () => import('pages/satset/practitioner/IndexPage.vue')
    // },
    // {
    //   path: '/satset/kunjungan',
    //   name: 'satset.kunjungan',
    //   component: () => import('pages/satset/kunjungan/IndexPage.vue')
    // },

    {
      path: '/siasik/notfound',
      component: () => import('pages/MidlewareNotFound.vue')
    }

  ]
}
export default siasik
