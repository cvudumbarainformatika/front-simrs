const depo = {
  path: '/depo',
  component: () => import('layouts/V2/IndexLayout.vue'),
  meta: { requireAuth: true },
  children: [
    { path: '', name: 'depo', redirect: '/depo/dashboard' },
    {
      path: '/depo/dashboard',
      name: 'depo.dashboard',
      component: () => import('pages/simrs/logistik/depo/IndexPage.vue')
    }
  ]
}
export default depo
