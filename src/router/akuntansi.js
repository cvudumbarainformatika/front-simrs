const akuntansi = {
  path: '/akuntansi',
  component: () => import('layouts/V2/IndexLayout.vue'),
  meta: { requireAuth: true },
  children: [
    { path: '', name: 'akuntansi', redirect: '/akuntansi/laporan' },
    {
      path: '/akuntansi/sa',
      // name: 'siasik.saldo',
      component: () => import('pages/siasik/akuntansi/jurnal/saldoawal/IndexPage.vue')
    },
    {
      path: '/akuntansi/jurnal',
      // name: 'laporan.rekap.datapasien',
      component: () => import('pages/siasik/akuntansi/jurnal/IndePage.vue'),
      children: [
        { path: '', redirect: '/akuntansi/jurnal/register' },
        {
          path: '/akuntansi/jurnal/register',
          name: 'akuntansi.jurnal.register',
          component: () =>
            import('src/pages/siasik/akuntansi/jurnal/registerjurnal/IndexPage.vue')
        },
        {
          path: '/akuntansi/jurnal/jurnalumum',
          name: 'akuntansi.jurnal.jurnalumum',
          component: () =>
            import('src/pages/siasik/akuntansi/jurnal/jurnalumum/IndexPage.vue')
        },
        {
          path: '/akuntansi/jurnal/postingjurnal',
          name: 'akuntansi.jurnal.postingjurnal',
          component: () =>
            import('src/pages/siasik/akuntansi/jurnal/postingjurnal/IndexPage.vue')
        }

      ]
    },
    {
      path: '/akuntansi/laporan',
      // name: 'laporan.rekap.datapasien',
      component: () => import('pages/siasik/akuntansi/laporanakuntansi/IndexPage.vue'),
      children: [
        { path: '', redirect: '/akuntansi/laporan/lra' },
        {
          path: '/akuntansi/laporan/lra',
          name: 'akuntansi.laporan.lra',
          component: () =>
            import('src/pages/siasik/akuntansi/laporanakuntansi/lralevel3/IndexPage.vue')
        },
        {
          path: '/akuntansi/laporan/lpsal',
          name: 'akuntansi.laporan.lpsal',
          component: () =>
            import('src/pages/siasik/akuntansi/laporanakuntansi/lpsal/IndexPage.vue')
        }

      ]
    },
    {
      path: '/akuntansi/notfound',
      component: () => import('pages/MidlewareNotFound.vue')
    }

  ]
}
export default akuntansi
