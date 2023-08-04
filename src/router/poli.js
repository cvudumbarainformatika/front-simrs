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
      path: '/poli/notfound',
      component: () => import('pages/MidlewareNotFound.vue')
    }

  ]
}
export default poli