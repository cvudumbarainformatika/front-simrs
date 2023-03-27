const antrian =
  {
    path: '/antrian',
    component: () => import('layouts/antrian/AdminLayout.vue'),
    meta: { requireAuth: true },
    children: [
      // { path: '', redirect: '/pegawai/dashboard' },
      { path: '', name: 'antrian', redirect: '/antrian/dashboard' },
      {
        path: '/antrian/dashboard',
        name: 'antrian.dashboard',
        component: () => import('pages/simrs/antrian/IndexPage.vue')
      },
      {
        path: '/antrian/master/poli',
        name: 'antrian.master.poli',
        component: () => import('pages/simrs/antrian/master/poli/IndexPage.vue')
      },
      {
        path: '/antrian/master/unit_antrian',
        name: 'antrian.master.unit_antrian',
        component: () => import('pages/simrs/antrian/master/unit_antrian/IndexPage.vue')
      },
      {
        path: '/antrian/master/layanan',
        name: 'antrian.master.layanan',
        component: () => import('pages/simrs/antrian/master/layanan/IndexPage.vue')
      },
      {
        path: '/antrian/master/display',
        name: 'antrian.master.display',
        component: () => import('pages/simrs/antrian/master/display/IndexPage.vue')
      }

    ]
  }

export default antrian
