const dokumen = {
  path: '/dokumen',
  component: () => import('layouts/V2/IndexLayout.vue'),
  meta: { requireAuth: true },
  children: [
    { path: '', name: 'dokumen', redirect: '/dokumen/resume' },
    {
      path: '/dokumen/resume',
      name: 'dokumen.resume',
      component: () => import('pages/simrs/dokumen/resume/IndexPage.vue')
    }
  ]
}
export default dokumen
