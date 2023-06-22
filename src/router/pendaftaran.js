const pendaftaran = {
  path: '/pendaftaran',
  component: () => import('layouts/V2/IndexLayout.vue'),
  meta: { requireAuth: true },
  children: [
    { path: '/pendaftaran', name: 'pendaftaran', redirect: '/pendaftaran/form/umum' },
    {
      path: '/pendaftaran/form',
      name: 'pendaftaran.form',
      component: () => import('pages/simrs/pendaftaran/form/IndexPage.vue'),
      children: [
        {
          path: '/pendaftaran/form/umum',
          name: 'pendaftaran.form.umum',
          component: () =>
            import('pages/simrs/pendaftaran/form/umum/IndexPage.vue')
        },
        {
          path: '/pendaftaran/form/bpjs',
          name: 'pendaftaran.form.bpjs',
          component: () =>
            import('pages/simrs/pendaftaran/form/bpjs/IndexPage.vue')
        },
        {
          path: '/pendaftaran/form/igd',
          name: 'pendaftaran.form.igd',
          component: () =>
            import('pages/simrs/pendaftaran/form/igd/IndexPage.vue')
        }
      ]
    },
    {
      path: '/pendaftaran/bpjs',
      name: 'pendaftaran.bpjs',
      component: () => import('pages/simrs/pendaftaran/bpjs/IndexPage.vue'),
      children: [
        {
          path: '/pendaftaran/form/bpjs',
          name: 'pendaftaran.form.bpjs',
          component: () =>
            import('pages/simrs/pendaftaran/form/bpjs/IndexPage.vue')
        },
        {
          path: '/pendaftaran/bpjs/pasien',
          name: 'pendaftaran.bpjs.pasien',
          component: () =>
            import('pages/simrs/pendaftaran/bpjs/pasien/IndexPage.vue')
        }
      ]
    },
    {
      path: '/pendaftaran/umum',
      name: 'pendaftaran.umum',
      component: () => import('pages/simrs/pendaftaran/umum/IndexPage.vue'),
      children: [
        {
          path: '/pendaftaran/form/umum',
          name: 'pendaftaran.form.umum',
          component: () =>
            import('pages/simrs/pendaftaran/form/umum/IndexPage.vue')
        },
        {
          path: '/pendaftaran/umum/pasien',
          name: 'pendaftaran.umum.pasien',
          component: () =>
            import('pages/simrs/pendaftaran/umum/pasien/IndexPage.vue')
        }
      ]
    },
    {
      path: '/pendaftaran/igd',
      name: 'pendaftaran.igd',
      component: () => import('pages/simrs/pendaftaran/igd/IndexPage.vue'),
      children: [
        {
          path: '/pendaftaran/form/igd',
          name: 'pendaftaran.form.igd',
          component: () =>
            import('pages/simrs/pendaftaran/form/igd/IndexPage.vue')
        },
        {
          path: '/pendaftaran/igd/pasien',
          name: 'pendaftaran.igd.pasien',
          component: () =>
            import('pages/simrs/pendaftaran/igd/pasien/IndexPage.vue')
        }
      ]
    },
    {
      path: '/pendaftaran/pasien',
      name: 'pendaftaran.pasien',
      component: () => import('pages/simrs/pendaftaran/pasien/IndexPage.vue'),
      children: [
        {
          path: '/pendaftaran/pasien/daftar',
          name: 'pendaftaran.pasien.daftar',
          component: () =>
            import('pages/simrs/pendaftaran/pasien/daftar/IndexPage.vue')
        }
      ]
    },

    {
      path: '/pendaftaran/notfound',
      component: () => import('pages/MidlewareNotFound.vue')
    }
  ]
}
export default pendaftaran
