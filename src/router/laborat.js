const laborat =
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
      component: () =>
        import('pages/simrs/laborat/permintaanluar/LayoutKhusus.vue'),
      children: [
        {
          path: '/admin/laborat/permintaan-luar/:page?',
          name: 'lab.permintaan-luar',
          component: () =>
            import('pages/simrs/laborat/permintaanluar/IndexPage.vue')
        }
      ]
    }
  ]
}
export default laborat
