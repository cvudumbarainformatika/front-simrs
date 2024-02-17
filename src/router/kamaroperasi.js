const kamaroperasi = {
  path: '/kamaroperasi',
  component: () => import('layouts/V2/IndexLayout.vue'),
  meta: { requireAuth: true },
  children: [
    { path: '', redirect: '/kamaroperasi/pengunjung' },
    {
      path: '/kamaroperasi/pengunjung',
      name: 'kamaroperasi.pengunjung',
      component: () => import('pages/simrs/kamaroperasi/permintaanoperasi/IndexPage.vue')
    },
    {
      path: '/kamaroperasi/notfound',
      component: () => import('pages/MidlewareNotFound.vue')
    }

  ]
}
export default kamaroperasi
