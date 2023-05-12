const laporan = {
  path: '/laporan',
  component: () => import('layouts/laporan/AdminLayout.vue'),
  meta: { requireAuth: true },
  children: [
    { path: '', name: 'laporan', redirect: '/laporan/dashboard' },
    {
      path: '/laporan/dashboard',
      name: 'laporan.dashboard',
      component: () => import('pages/simrs/laporan/IndexPage.vue')
    },
    {
      path: '/laporan/rekap/datapasien',
      name: 'laporan.rekap.datapasien',
      component: () => import('pages/simrs/laporan/rekap/datapasien/IndexPage.vue')
    }
  ]
}
export default laporan