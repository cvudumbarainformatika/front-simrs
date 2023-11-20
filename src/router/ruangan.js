const ruangan = {
  path: '/ruangan',
  component: () => import('layouts/V2/IndexLayout.vue'),
  meta: { requireAuth: true },
  children: [
    { path: '', name: 'ruangan', redirect: '/ruangan/dashboard' },
    {
      path: '/ruangan/dashboard',
      name: 'ruangan.dashboard',
      component: () => import('pages/simrs/logistik/ruangan/IndexPage.vue')
    }
  ]
}
export default ruangan
