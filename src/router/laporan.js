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
      path: '/laporan/keuangan/inacbg',
      name: 'laporan.keuangan.inacbg',
      component: () => import('pages/simrs/laporan/keuangan/inacbg/IndexPage.vue')
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
      path: '/laporan/sigarang/penerimaangudang',
      name: 'laporan.sigarang.penerimaangudang',
      component: () => import('pages/simrs/laporan/sigarang/penerimaangudang/IndexPage.vue')
    },
    {
      path: '/laporan/sigarang/penerimaandepo',
      name: 'laporan.sigarang.penerimaandepo',
      component: () => import('pages/simrs/laporan/sigarang/penerimaandepo/IndexPage.vue')
    },
    {
      path: '/laporan/sigarang/pengeluaran',
      name: 'laporan.sigarang.pengeluaran',
      component: () => import('pages/simrs/laporan/sigarang/pengeluaran/IndexPage.vue')
    },
    {
      path: '/laporan/sigarang/pemakaian',
      name: 'laporan.sigarang.pemakaian',
      component: () => import('pages/simrs/laporan/sigarang/pemakaian/IndexPage.vue')
    },
    {
      path: '/laporan/sigarang/mutasi',
      name: 'laporan.sigarang.mutasi',
      component: () => import('pages/simrs/laporan/sigarang/mutasi/IndexPage.vue')
    },
    {
      path: '/laporan/sigarang/mutasi-depo',
      name: 'laporan.sigarang.mutasi-depo',
      component: () => import('pages/simrs/laporan/sigarang/mutasidepo/IndexPage.vue')
    },
    {
      path: '/laporan/sigarang/rekap-mutasi',
      name: 'laporan.sigarang.rekap-mutasi',
      component: () => import('pages/simrs/laporan/sigarang/rekapmutasi/IndexPage.vue')
    },
    {
      path: '/laporan/sigarang/hutang',
      name: 'laporan.sigarang.hutang',
      component: () => import('pages/simrs/laporan/sigarang/hutang/IndexPage.vue')
    },
    {
      path: '/laporan/sigarang/rekapkeluardepo',
      name: 'laporan.sigarang.rekapkeluardepo',
      component: () => import('pages/simrs/laporan/sigarang/rekapkeluardepo/IndexPage.vue')
    },
    {
      path: '/laporan/sigarang/rekapmasukdepo',
      name: 'laporan.sigarang.rekapmasukdepo',
      component: () => import('pages/simrs/laporan/sigarang/rekapmasukdepo/IndexPage.vue')
    },
    {
      path: '/laporan/sigarang/penerimaanptk',
      name: 'laporan.sigarang.penerimaanptk',
      component: () => import('pages/simrs/laporan/sigarang/penerimaanptk/IndexPage.vue')
    },

    {
      path: '/laporan/notfound',
      component: () => import('pages/MidlewareNotFound.vue')
    }
  ]
}
export default laporan
