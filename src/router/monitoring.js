const monitoring = {
  path: '/monitoring',
  // component: () => import('layouts/monitoring/AdminLayout.vue'),
  component: () => import('layouts/V2/IndexLayout.vue'),
  meta: { requireAuth: true },
  children: [
    { path: '', redirect: '/monitoring/dashboard' },
    {
      path: '/monitoring/dashboard',
      name: 'monitoring.dashboard',
      component: () => import('pages/simrs/monitoring/bpjs/IndexPage.vue')
    },
    {
      path: '/monitoring/bpjs',
      name: 'monitoring.bpjs',
      component: () => import('pages/simrs/monitoring/bpjs/IndexPage.vue')
    },

    {
      path: '/monitoring/notfound',
      component: () => import('pages/MidlewareNotFound.vue')
    }
  ]
}
export default monitoring
