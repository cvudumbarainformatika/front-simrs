const satset = {
  path: '/satset',
  component: () => import('layouts/V2/IndexLayout.vue'),
  meta: { requireAuth: true },
  children: [
    { path: '', redirect: '/satset/strukturorganisasi' },
    {
      path: '/satset/strukturorganisasi',
      name: 'satset.strukturorganisasi',
      component: () => import('pages/satset/strukturorganisasi/IndexPage.vue')
    },

    {
      path: '/satset/notfound',
      component: () => import('pages/MidlewareNotFound.vue')
    }

  ]
}
export default satset
