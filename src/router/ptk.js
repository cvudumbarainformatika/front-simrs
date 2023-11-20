const ptk = {
  path: '/ptk',
  component: () => import('layouts/V2/IndexLayout.vue'),
  meta: { requireAuth: true },
  children: [
    { path: '', name: 'ptk', redirect: '/ptk/dashboard' },
    {
      path: '/ptk/dashboard',
      name: 'ptk.dashboard',
      component: () => import('pages/simrs/logistik/ptk/IndexPage.vue')
    }
  ]
}
export default ptk
