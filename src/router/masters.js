const masters = {
  path: '/master',
  component: () => import('layouts/master/AdminLayout.vue'),
  meta: { requireAuth: true },
  children: [
    { path: '', name: 'master', redirect: '/master/dashboard' },
    {
      path: '/master/dashboard',
      name: 'master.dashboard',
      component: () => import('pages/simrs/master/IndexPage.vue')
    }
  ]
}
export default masters
