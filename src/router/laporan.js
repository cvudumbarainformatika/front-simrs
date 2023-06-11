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
    },
    {
      path: '/laporan/keuangan/billrajal',
      name: 'laporan.keuangan.billrajal',
      component: () => import('pages/simrs/laporan/keuangan/bill/IndexPage.vue')
    },
    {
      path: '/laporan/keuangan/billpoli',
      name: 'laporan.keuangan.billpoli',
      component: () => import('pages/simrs/laporan/keuangan/billpoli/IndexPage.vue')
    }
  ]
}
export default laporan
