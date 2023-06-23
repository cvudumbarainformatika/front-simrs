
import {
  pegawai, sigarang, antrian, laborat, laporan, settings,
  masters, pendaftaran, percobaan
} from './modules'

const routes = [
  {
    path: '/',
    component: () => import('layouts/SSO/SsoLayout.vue'),
    meta: { requireAuth: true },
    children: [
      { path: '', redirect: '/admin/sso' },
      {
        path: '/admin/sso',
        name: 'admin.sso',
        meta: { transition: 'fade', mode: '' },
        component: () =>
          import('pages/simrs/SSO/IndexNewSso.vue')
      }
    ]
  },
  // IKI SSO LAWAS
  // {
  //   path: '/',
  //   component: () => import('layouts/Admin/AdminLayout.vue'),
  //   meta: { requireAuth: true },
  //   children: [
  //     { path: '', redirect: '/admin/sso' },
  //     {
  //       path: '/admin/sso',
  //       name: 'admin.sso',
  //       meta: { transition: 'fade', mode: '' },
  //       component: () =>
  //         import(
  //           /* webpackChunkName: "admin.sso" */ 'pages/simrs/SSO/IndexPage.vue'
  //         )
  //     },

  //     laborat
  //   ]
  // },
  {
    path: '/print',
    component: () => import('layouts/Admin/v2/PrintLayout.vue'),
    meta: { requireAuth: true },
    children: [
      { path: '', redirect: '/print/page' },
      {
        path: '/print/page/:slug',
        name: 'print.page',
        component: () => import('pages/simrs/print/IndexPage.vue')
      }
    ]
  },
  settings,
  pegawai,
  sigarang,
  antrian,
  masters,
  laporan,
  pendaftaran,
  laborat,
  percobaan,

  {
    path: '/display_antrian',
    component: () => import('layouts/antrian/display/DisplayLayout.vue'),
    meta: { requireAuth: false },
    children: [
      { path: '', component: () => import('pages/simrs/antrian/display/IndexPage.vue') }
    ]

  },

  {
    path: '/login',
    component: () => import('layouts/Auth/AuthLayout.vue'),
    meta: { requireAuth: false },
    children: [
      // { path: '', component: () => import('pages/auth/LoginPage.vue') }

      { path: '', redirect: '/login/mode/qr' },
      { path: '/login/mode', redirect: '/login/mode/qr' },

      { path: '/login/mode/:mode', component: () => import('pages/auth/LoginPageV2.vue') }
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
