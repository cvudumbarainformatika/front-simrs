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
      path: '/satset/location',
      name: 'satset.location',
      component: () => import('pages/satset/location/IndexPage.vue')
    },
    {
      path: '/satset/practitioner',
      name: 'satset.practitioner',
      component: () => import('pages/satset/practitioner/IndexPage.vue')
    },

    {
      path: '/satset/notfound',
      component: () => import('pages/MidlewareNotFound.vue')
    }

  ]
}
export default satset
