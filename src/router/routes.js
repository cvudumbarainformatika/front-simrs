const routes = [
  {
    path: '/',
    component: () => import('layouts/Admin/v2/AdminLayout.vue'),
    meta: { requireAuth: true },
    children: [
      { path: '', redirect: '/admin/sso' },
      {
        path: '/admin/sso',
        name: 'admin.sso',
        meta: { transition: 'fade', mode: '' },
        component: () => import(/* webpackChunkName: "admin.sso" */'pages/simrs/SSO/IndexPage.vue')
      },
      {
        path: '/admin/laborat',
        component: () => import('pages/simrs/laborat/IndexLayout.vue'),
        children: [
          { path: '', redirect: '/admin/laborat/dashboard' },
          {
            path: '/admin/laborat/dashboard',
            name: 'lab.dashboard',
            meta: { transition: 'fade', mode: '' },
            component: () => import('pages/simrs/laborat/DashboardPage.vue')
          },
          {
            path: '/admin/laborat/table',
            name: 'lab.laborat',
            component: () => import('pages/simrs/laborat/IndexPage.vue')
          },
          {
            path: '/admin/laborat/permintaan-luar',
            component: () => import('pages/simrs/laborat/permintaanluar/LayoutKhusus.vue'),
            children: [
              {
                path: '/admin/laborat/permintaan-luar/:page?',
                name: 'lab.permintaan-luar',
                component: () => import('pages/simrs/laborat/permintaanluar/IndexPage.vue')
              }
            ]
          }
        ]
      },
      {
        path: '/admin/settings',
        component: () => import('pages/simrs/settings/IndexPage.vue')
      },
      {
        path: '/admin/settings/menu',
        name: 'settings.menu',
        component: () => import('pages/simrs/settings/menu/IndexPage.vue')
      }
    ]
  },
  {
    path: '/print',
    component: () => import('layouts/Admin/v2/PrintLayout.vue'),
    meta: { requireAuth: true },
    children: [
      { path: '', redirect: '/print/page' },
      { path: '/print/page/:slug', name: 'print.page', component: () => import('pages/simrs/print/IndexPage.vue') }

    ]
  },

  // login
  {
    path: '/login',
    component: () => import('layouts/Auth/AuthLayout.vue'),
    meta: { requireAuth: false },
    children: [
      { path: '', component: () => import('pages/auth/AuthPage.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
