const poli = {
  path: '/poli',
  component: () => import('layouts/V2/IndexLayout.vue'),
  meta: { requireAuth: true },
  children: [
    { path: '', redirect: '/poli/pengunjung' },
    {
      path: '/poli/pengunjung',
      name: 'poli.pengunjung',
      component: () => import('pages/simrs/poli/pengunjung/IndexPage.vue')
    },
    {
      path: '/poli/suratkontrol',
      name: 'poli.suratkontrol',
      component: () => import('pages/simrs/poli/suratkontrol/IndexPage.vue')
    },
    {
      path: '/poli/listresep',
      name: 'poli.listresep',
      component: () => import('pages/simrs/poli/listresep/IndexPage.vue')
    },

    {
      path: '/poli/notfound',
      component: () => import('pages/MidlewareNotFound.vue')
    }

  ]
}
export default poli
