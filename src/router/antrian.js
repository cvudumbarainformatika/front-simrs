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
      }
      // {
      //   path: '/pegawai/master',
      //   name: 'pegawai.master',
      //   component: () => import('pages/simrs/pegawai/master/IndexPage.vue'),
      //   children: [
      //     {
      //       path: '/pegawai/master/jadwal',
      //       name: 'pegawai.master.jadwal',
      //       component: () =>
      //         import('pages/simrs/pegawai/master/jadwal/IndexPage.vue')
      //     },
      //     {
      //       path: '/pegawai/master/cuti',
      //       name: 'pegawai.master.cuti',
      //       component: () =>
      //         import('pages/simrs/pegawai/master/cuti/IndexPage.vue')
      //     },
      //     {
      //       path: '/pegawai/master/prota',
      //       name: 'pegawai.master.prota',
      //       component: () =>
      //         import('pages/simrs/pegawai/master/prota/IndexPage.vue')
      //     },
      //     {
      //       path: '/pegawai/master/kategori',
      //       name: 'pegawai.master.kategori',
      //       component: () =>
      //         import('pages/simrs/pegawai/master/kategori/IndexPage.vue')
      //     }
      //   ]
      // }

    ]
  }

export default antrian
