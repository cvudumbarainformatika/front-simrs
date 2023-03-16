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
      }

    ]
  }

export default antrian
