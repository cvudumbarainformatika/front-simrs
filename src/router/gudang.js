const gudang = {
  path: '/gudang',
  component: () => import('layouts/V2/IndexLayout.vue'),
  meta: { requireAuth: true },
  children: [
    { path: '', name: 'gudang', redirect: '/gudang/dashboard' },
    {
      path: '/gudang/dashboard',
      name: 'gudang.dashboard',
      component: () => import('pages/simrs/logistik/gudang/IndexPage.vue')
    },
    {
      path: '/gudang/farmasi',
      name: 'gudang.farmasi',
      component: () => import('pages/simrs/logistik/gudang/farmasi/IndexPage.vue'),
      children: [
        { path: '', name: 'gudang.farmasi', redirect: '/gudang/farmasi/dashboard' },
        {
          path: '/gudang/farmasi/dashboard',
          name: 'gudang.farmasi.dashboard',
          component: () => import('pages/simrs/logistik/gudang/IndexPage.vue')
        }
      ]
    },
    {
      path: '/gudang/nonfarmasi',
      name: 'gudang.nonfarmasi',
      component: () => import('pages/simrs/logistik/gudang/nonfarmasi/IndexPage.vue'),
      children: [
        { path: '', name: 'gudang', redirect: '/gudang/dashboard' }
      ]
    }
  ]
}
export default gudang
