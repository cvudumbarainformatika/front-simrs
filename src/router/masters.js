const masters = {
  path: '/master',
  // component: () => import('layouts/master/AdminLayout.vue'),
  component: () => import('layouts/V2/IndexLayout.vue'),
  meta: { requireAuth: true },
  children: [
    { path: '', name: 'master', redirect: '/master/dashboard' },
    {
      path: '/master/dashboard',
      name: 'master.dashboard',
      component: () => import('pages/simrs/master/IndexPage.vue')
    },
    {
      path: '/master/farmasi',
      name: 'master.farmasi',
      component: () => import('pages/simrs/master/farmasi/IndexPage.vue'),
      children: [
        {
          path: '/master/farmasi/minmax',
          name: 'master.farmasi.minmax',
          component: () =>
            import('pages/simrs/master/farmasi/minmax/IndexPage.vue')
        },
        {
          path: '/master/farmasi/bentuk-sediaan',
          name: 'master.farmasi.bentuk-sediaan',
          component: () =>
            import('pages/simrs/master/farmasi/bentukSediaan/IndexPage.vue')
        },
        {
          path: '/master/farmasi/jenis-perbekalan',
          name: 'master.farmasi.jenis-perbekalan',
          component: () =>
            import('pages/simrs/master/farmasi/jenisPerbekalan/IndexPage.vue')
        },
        {
          path: '/master/farmasi/kandungan',
          name: 'master.farmasi.kandungan',
          component: () =>
            import('pages/simrs/master/farmasi/kandungan/IndexPage.vue')
        },
        {
          path: '/master/farmasi/kekuatan-dosis',
          name: 'master.farmasi.kekuatan-dosis',
          component: () =>
            import('pages/simrs/master/farmasi/kekuatanDosis/IndexPage.vue')
        },
        {
          path: '/master/farmasi/kelas-terapi',
          name: 'master.farmasi.kelas-terapi',
          component: () =>
            import('pages/simrs/master/farmasi/kelasTerapi/IndexPage.vue')
        },
        {
          path: '/master/farmasi/kelompok-penyimpanan',
          name: 'master.farmasi.kelompok-penyimpanan',
          component: () =>
            import('pages/simrs/master/farmasi/kelompokPenyimpanan/IndexPage.vue')
        },
        {
          path: '/master/farmasi/kelompok-rko',
          name: 'master.farmasi.kelompok-rko',
          component: () =>
            import('pages/simrs/master/farmasi/kelompokRKO/IndexPage.vue')
        },
        {
          path: '/master/farmasi/kode50',
          name: 'master.farmasi.kode50',
          component: () =>
            import('pages/simrs/master/farmasi/kode50/IndexPage.vue')
        },
        {
          path: '/master/farmasi/kodeBelanja',
          name: 'master.farmasi.kodeBelanja',
          component: () =>
            import('pages/simrs/master/farmasi/kodeBelanja/IndexPage.vue')
        },
        {
          path: '/master/farmasi/merk',
          name: 'master.farmasi.merk',
          component: () =>
            import('pages/simrs/master/farmasi/merk/IndexPage.vue')
        },
        {
          path: '/master/farmasi/obat',
          name: 'master.farmasi.obat',
          component: () =>
            import('pages/simrs/master/farmasi/obat/IndexPage.vue')
        },
        {
          path: '/master/farmasi/satuan-kecil',
          name: 'master.farmasi.satuan-kecil',
          component: () =>
            import('pages/simrs/master/farmasi/satuanKecil/IndexPage.vue')
        },
        {
          path: '/master/farmasi/volume-sediaan',
          name: 'master.farmasi.volume-sediaan',
          component: () =>
            import('pages/simrs/master/farmasi/volumeSediaan/IndexPage.vue')
        }
      ]
    },
    {
      path: '/master/general-consent',
      name: 'master.generalconsent',
      component: () => import('pages/simrs/master/generalconsent/IndexPage.vue')
    },
    {
      path: '/master/notfound',
      component: () => import('pages/MidlewareNotFound.vue')
    }
  ]
}
export default masters
