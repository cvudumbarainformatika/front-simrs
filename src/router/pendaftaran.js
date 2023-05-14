const pendaftaran = {
  path: '/pendaftaran',
  component: () => import('layouts/pegawai/AdminLayout.vue'),
  meta: { requireAuth: true },
  children: [
    { path: '', name: 'pendaftaran', redirect: '/pendaftaran/form/umum' },
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
          path: '/pendaftaran/form/igd',
          name: 'pendaftaran.form.igd',
          component: () =>
            import('pages/simrs/pendaftaran/form/igd/IndexPage.vue')
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
    }
  ]
}
export default pendaftaran
