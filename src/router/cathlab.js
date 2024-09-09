const cathlab = {
  path: '/cathlab',
  component: () => import('layouts/V2/IndexLayout.vue'),
  meta: { requireAuth: true },
  children: [
    { path: '', redirect: '/cathlab/pelayanan' },
    {
      path: '/cathlab/pelayanan',
      name: 'cathlab.pelayanan',
      component: () => import('pages/simrs/cathlab/IndexPage.vue')
    },
    {
      path: '/cathlab/notfound',
      component: () => import('pages/MidlewareNotFound.vue')
    }

  ]
}
export default cathlab
