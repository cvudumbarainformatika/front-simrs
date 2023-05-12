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
    },
    {
      path: '/master/farmasi',
      name: 'master.farmasi',
      component: () => import('pages/simrs/master/farmasi/IndexPage.vue'),
      children: [
        {
          path: '/master/farmasi/minmax',
          name: 'master.farmasi.minmax',
          component: () =>
            import('pages/simrs/master/farmasi/minmax/IndexPage.vue')
        },
        {
          path: '/master/farmasi/obat',
          name: 'master.farmasi.obat',
          component: () =>
            import('pages/simrs/master/farmasi/obat/IndexPage.vue')
        }
      ]
    }
  ]
}
export default masters