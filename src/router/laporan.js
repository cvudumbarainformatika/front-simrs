const laporan = {
  path: '/laporan',
  // component: () => import('layouts/laporan/AdminLayout.vue'),
  component: () => import('layouts/V2/IndexLayout.vue'),
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
    },
    {
      path: '/laporan/sigarang/penerimaansimperda108',
      name: 'laporan.sigarang.penerimaansimperda108',
      component: () => import('pages/simrs/laporan/sigarang/penerimaansimperda108/IndexPage.vue')
    },
    {
      path: '/laporan/sigarang/penerimaansimperdarinci',
      name: 'laporan.sigarang.penerimaansimperdarinci',
      component: () => import('pages/simrs/laporan/sigarang/penerimaansimperdarinci/IndexPage.vue')
    },
    {
      path: '/laporan/sigarang/persediaanakhir',
      name: 'laporan.sigarang.persediaanakhir',
      component: () => import('pages/simrs/laporan/sigarang/persediaanakhir/IndexPage.vue')
    },

    {
      path: '/laporan/notfound',
      component: () => import('pages/MidlewareNotFound.vue')
    }
  ]
}
export default laporan
