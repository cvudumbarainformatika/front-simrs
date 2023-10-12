const antrian =
  {
    path: '/antrian',
    // component: () => import('layouts/antrian/AdminLayout.vue'),
    component: () => import('layouts/V2/IndexLayout.vue'),
    meta: { requireAuth: true },
    children: [
      { path: '', redirect: '/antrian/master' },
      { path: '', name: 'antrian', redirect: '/antrian/dashboard' },
      {
        path: '/antrian/dashboard',
        name: 'antrian.dashboard',
        component: () => import('pages/simrs/antrian/IndexPage.vue')
      },

      // ini untuk master
      {
        path: '/antrian/master',
        name: 'antrian.master',
        component: () => import('pages/simrs/antrian/master/IndexPage.vue'),
        children: [
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
          },
          {
            path: '/antrian/master/video',
            name: 'antrian.master.video',
            component: () => import('pages/simrs/antrian/master/video/IndexPage.vue')
          }
        ]
      },
      // {
      //   path: '/antrian/master/poli',
      //   name: 'antrian.master.poli',
      //   component: () => import('pages/simrs/antrian/master/poli/IndexPage.vue')
      // },
      // {
      //   path: '/antrian/master/unit_antrian',
      //   name: 'antrian.master.unit_antrian',
      //   component: () => import('pages/simrs/antrian/master/unit_antrian/IndexPage.vue')
      // },
      // {
      //   path: '/antrian/master/layanan',
      //   name: 'antrian.master.layanan',
      //   component: () => import('pages/simrs/antrian/master/layanan/IndexPage.vue')
      // },
      // {
      //   path: '/antrian/master/display',
      //   name: 'antrian.master.display',
      //   component: () => import('pages/simrs/antrian/master/display/IndexPage.vue')
      // },
      // {
      //   path: '/antrian/master/video',
      //   name: 'antrian.master.video',
      //   component: () => import('pages/simrs/antrian/master/video/IndexPage.vue')
      // },

      // ini untuk transaksi

      {
        path: '/antrian/call',
        name: 'antrian.call',
        component: () => import('pages/simrs/antrian/call/IndexPage.vue')
      },

      {
        path: '/antrian/notfound',
        component: () => import('pages/MidlewareNotFound.vue')
      }

    ]
  }

export default antrian
