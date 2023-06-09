import pegawai from './pegawai'
import sigarang from './sigarang'
import antrian from './antrian'
import laborat from './laborat'
import laporan from './laporan'
import settings from './settings'
import masters from './masters'
import pendaftaran from './pendaftaran'

const routes = [
  {
    path: '/',
    component: () => import('layouts/Admin/AdminLayout.vue'),
    meta: { requireAuth: true },
    children: [
      { path: '', redirect: '/admin/sso' },
      {
        path: '/admin/sso',
        name: 'admin.sso',
        meta: { transition: 'fade', mode: '' },
        component: () =>
          import(
            /* webpackChunkName: "admin.sso" */ 'pages/simrs/SSO/IndexPage.vue'
          )
      },

      laborat
      // {
      //   path: '/admin/settings',
      //   component: () => import('src/pages/simrs/settings/IndexPage.vue')
      // },
      // {
      //   path: '/admin/settings/menu',
      //   name: 'settings.menu',
      //   component: () => import('pages/simrs/settings/menu/IndexPage.vue')
      // }
    ]
  },
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
      { path: '', component: () => import('pages/auth/AuthPage.vue') }
      // { path: '', component: () => import('pages/auth/LoginPage.vue') }
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
