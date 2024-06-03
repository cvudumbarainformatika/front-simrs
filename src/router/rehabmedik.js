const rehabmedik = {
  path: '/remed',
  component: () => import('layouts/V2/IndexLayout.vue'),
  meta: { requireAuth: true },
  children: [
    { path: '', redirect: '/remed/pengunjung' },

    {
      path: '/remed/pengunjung',
      name: 'remed.pengunjung',
      component: () => import('pages/simrs/rehabmedik/IndexPage.vue')
      // children: [
      //   {
      //     path: '/rehabmedik/pasien/daftar',
      //     name: 'rehabmedik.pasien.daftar',
      //     component: () =>
      //       import('pages/simrs/rehabmedik/pasien/daftar/IndexPage.vue')
      //   }
      // ]
    },

    // {
    //   path: '/remed/middleware',
    //   component: () => import('pages/simrs/rehabmedik/middleware/IndexPage.vue')
    // },

    {
      path: '/remed/notfound',
      component: () => import('pages/MidlewareNotFound.vue')
    }
  ]
}
export default rehabmedik
