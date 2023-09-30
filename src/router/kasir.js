const kasir = {
  path: '/kasir',
  component: () => import('layouts/V2/IndexLayout.vue'),
  meta: { requireAuth: true },
  children: [
    { path: '', name: 'kasir', redirect: '/kasir/dashboard' },
    {
      path: '/kasir/dashboard',
      name: 'kasir.dashboard',
      component: () => import('pages/simrs/kasir/IndexPage.vue')
    },
    {
      path: '/kasir/rajal',
      component: () => import('src/pages/simrs/kasir/rajal/IndexPage.vue'),
      children: [
        { path: '', redirect: '/kasir/rajal/billing' },
        {
          path: '/kasir/rajal/listkunjungan',
          name: 'kasir.rajal.listkunjungan',
          meta: { transition: 'slide-up' },
          component: () =>
            import('pages/simrs/kasir/rajal/listkunjungan/IndexPage.vue')
        },
        {
          path: '/kasir/rajal/billing',
          name: 'kasir.rajal.billing',
          meta: { transition: 'slide-up' },
          component: () =>
            import('pages/simrs/kasir/rajal/rajal/IndexPage.vue')
        }

      ]
    },

    {
      path: '/kasir/notfound',
      component: () => import('pages/MidlewareNotFound.vue')
    }
  ]
}
export default kasir
