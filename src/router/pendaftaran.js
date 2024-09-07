const pendaftaran = {
  path: '/pendaftaran',
  component: () => import('layouts/V2/IndexLayout.vue'),
  meta: { requireAuth: true },
  children: [
    { path: '', redirect: '/pendaftaran/middleware' },
    {
      path: '/pendaftaran/form',
      name: 'pendaftaran.form',
      component: () => import('pages/simrs/pendaftaran/form/IndexPage.vue')
      // children: [
      //   {
      //     path: '/pendaftaran/form/umum',
      //     name: 'pendaftaran.form.umum',
      //     component: () =>
      //       import('pages/simrs/pendaftaran/form/umum/IndexPage.vue')
      //   },
      //   {
      //     path: '/pendaftaran/form/bpjs',
      //     name: 'pendaftaran.form.bpjs',
      //     component: () =>
      //       import('pages/simrs/pendaftaran/form/bpjs/IndexPage.vue')
      //   },
      //   {
      //     path: '/pendaftaran/form/igd',
      //     name: 'pendaftaran.form.igd',
      //     component: () =>
      //       import('pages/simrs/pendaftaran/form/igd/IndexPage.vue')
      //   }
      // ]
    },
    {
      path: '/pendaftaran/bpjs',
      // name: 'pendaftaran.bpjs',
      component: () => import('pages/simrs/pendaftaran/bpjs/IndexPage.vue'),
      children: [
        { path: '', redirect: '/pendaftaran/bpjs/form' },
        {
          path: '/pendaftaran/bpjs/form',
          name: 'pendaftaran.form.bpjs',
          meta: { transition: 'slide-up' },
          component: () =>
            import('pages/simrs/pendaftaran/bpjs/form/bpjs/IndexPage.vue')
        },
        {
          path: '/pendaftaran/bpjs/pasien',
          name: 'pendaftaran.bpjs.pasien',
          meta: { transition: 'slide-up' },
          component: () =>
            import('pages/simrs/pendaftaran/pasien/daftar/IndexPage.vue')
        },
        {
          path: '/pendaftaran/bpjs/kunjungan',
          name: 'pendaftaran.bpjs.kunjungan',
          meta: { transition: 'slide-up' },
          component: () =>
            import('pages/simrs/pendaftaran/bpjs/kunjungan/IndexPage.vue')
        },
        {
          path: '/pendaftaran/bpjs/listmjkn',
          name: 'pendaftaran.bpjs.listmjkn',
          meta: { transition: 'slide-up' },
          component: () =>
            import('pages/simrs/pendaftaran/bpjs/mjkn/IndexPage.vue')
        },
        {
          path: '/pendaftaran/bpjs/listsharing',
          name: 'pendaftaran.bpjs.listsharing',
          meta: { transition: 'slide-up' },
          component: () =>
            import('pages/simrs/pendaftaran/bpjs/sharing/IndexPage.vue')
        },
        {
          path: '/pendaftaran/bpjs/konsulan',
          name: 'pendaftaran.bpjs.konsulan',
          meta: { transition: 'slide-up' },
          component: () =>
            import('pages/simrs/pendaftaran/bpjs/konsulan/IndexPage.vue')
        }
      ]
    },
    {
      path: '/pendaftaran/umum',
      component: () => import('pages/simrs/pendaftaran/umum/IndexPage.vue'),
      children: [
        { path: '', redirect: '/pendaftaran/umum/form' },
        {
          path: '/pendaftaran/umum/form',
          name: 'pendaftaran.umum.form',
          meta: { transition: 'slide-up' },
          component: () =>
            import('pages/simrs/pendaftaran/umum/form/IndexPage.vue')
        },
        {
          path: '/pendaftaran/umum/kunjungan',
          name: 'pendaftaran.umum.kunjungan',
          meta: { transition: 'slide-up' },
          component: () =>
            import('pages/simrs/pendaftaran/umum/kunjungan/IndexPage.vue')
        },
        {
          path: '/pendaftaran/umum/pasien',
          name: 'pendaftaran.umum.pasien',
          component: () =>
            import('pages/simrs/pendaftaran/pasien/daftar/IndexPage.vue')
        }
      ]
    },
    // home care
    {
      path: '/pendaftaran/homecare',
      component: () => import('pages/simrs/pendaftaran/homecare/IndexPage.vue'),
      children: [
        { path: '', redirect: '/pendaftaran/homecare/form' },
        {
          path: '/pendaftaran/homecare/form',
          name: 'pendaftaran.homecare.form',
          meta: { transition: 'slide-up' },
          component: () =>
            import('pages/simrs/pendaftaran/homecare/form/IndexPage.vue')
        },
        {
          path: '/pendaftaran/homecare/kunjungan',
          name: 'pendaftaran.homecare.kunjungan',
          meta: { transition: 'slide-up' },
          component: () =>
            import('pages/simrs/pendaftaran/homecare/kunjungan/IndexPage.vue')
        },
        {
          path: '/pendaftaran/homecare/pasien',
          name: 'pendaftaran.homecare.pasien',
          component: () =>
            import('pages/simrs/pendaftaran/pasien/daftar/IndexPage.vue')
        }
      ]
    },
    {
      path: '/pendaftaran/igd',
      component: () => import('pages/simrs/pendaftaran/igd/IndexPage.vue'),
      children: [
        { path: '', redirect: '/pendaftaran/igd/form' },
        {
          path: '/pendaftaran/igd/form',
          name: 'pendaftaran.form.igd',
          component: () =>
            import('pages/simrs/pendaftaran/igd/form/igd/IndexPage.vue')
        },
        {
          path: '/pendaftaran/igd/kunjungan',
          name: 'pendaftaran.igd.kunjungan',
          component: () =>
            import('pages/simrs/pendaftaran/igd/kunjungan/IndexPage.vue')
        },
        {
          path: '/pendaftaran/igd/pasien',
          name: 'pendaftaran.igd.pasien',
          component: () =>
            import('pages/simrs/pendaftaran/igd/pasien/IndexPage.vue')
        }
      ]
    },
    // INI BARU tgl 2024-05-16

    {
      path: '/pendaftaran/rawat-inap',
      name: 'pendaftaran.rawat-inap',
      component: () => import('pages/simrs/pendaftaran/rawatinap/IndexPage.vue')
      // children: [
      //   {
      //     path: '/pendaftaran/pasien/daftar',
      //     name: 'pendaftaran.pasien.daftar',
      //     component: () =>
      //       import('pages/simrs/pendaftaran/pasien/daftar/IndexPage.vue')
      //   }
      // ]
    },

    {
      path: '/pendaftaran/data-pasien',
      name: 'pendaftaran.data-pasien',
      component: () => import('pages/simrs/pendaftaran/masterpasien/IndexPage.vue')
      // children: [
      //   {
      //     path: '/pendaftaran/pasien/daftar',
      //     name: 'pendaftaran.pasien.daftar',
      //     component: () =>
      //       import('pages/simrs/pendaftaran/pasien/daftar/IndexPage.vue')
      //   }
      // ]
    },
    {
      path: '/pendaftaran/general-consent',
      component: () => import('pages/simrs/pendaftaran/generalconsent/IndexPage.vue')
    },
    {
      path: '/pendaftaran/master-pasien',
      component: () => import('pages/simrs/pendaftaran/masterpasien/IndexPage.vue')
    },

    {
      path: '/pendaftaran/middleware',
      component: () => import('pages/simrs/pendaftaran/middleware/IndexPage.vue')
    },

    {
      path: '/pendaftaran/notfound',
      component: () => import('pages/MidlewareNotFound.vue')
    }
  ]
}
export default pendaftaran
