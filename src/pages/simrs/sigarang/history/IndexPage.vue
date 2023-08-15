<template>
  <q-page class="q-pa-sm">
    <Suspense>
      <!-- main content -->
      <AsyncComp />
      <!-- loading state -->
      <template #fallback>
        <SkeletonPage />
        <!-- <app-loading /> -->
      </template>
    </Suspense>
  </q-page>
</template>
<script setup>
import { defineAsyncComponent, watch } from 'vue'
import SkeletonPage from './SkeletonPage.vue'
import { useRoute } from 'vue-router'
import { findWithAttr } from 'src/modules/utils'
import { useHistoryTable } from 'src/stores/simrs/logistik/sigarang/history/table'

// const path = computed(() => useRoute().name)

const AsyncComp = defineAsyncComponent(() =>
  import('./HistoryPage.vue')
)
const submenus = [
  {
    icon: 'icon-mat-inventory_2',
    link: 'sigarang/history/pemesanan',
    nama: 'Pemesanan',
    name: 'sigarang.history.pemesanan'
  },
  {
    icon: 'icon-mat-shopping_bag',
    link: 'sigarang/history/penerimaan',
    nama: 'Penerimaan',
    name: 'sigarang.history.penerimaan'
  }, {
    icon: 'icon-mat-account_balance_wallet',
    link: 'sigarang/history/permintaan',
    nama: 'Permintaan Ruangan',
    name: 'sigarang.history.permintaan'
  },
  {
    icon: 'icon-mat-account_balance_wallet',
    link: 'sigarang/history/distribusidepo',
    nama: 'Distribusi Depo',
    name: 'sigarang.history.distribusidepo'
  },
  {
    icon: 'icon-mat-account_balance_wallet',
    link: 'sigarang/history/pemakaianruangan',
    nama: 'Pemakaian Ruangan',
    name: 'sigarang.history.pemakaianruangan'
  },
  {
    icon: 'icon-mat-account_balance_wallet',
    link: 'sigarang/history/penerimaanruangan',
    nama: 'Penerimaan Ruangan',
    name: 'sigarang.history.penerimaanruangan'
  },
  {
    icon: 'icon-mat-account_balance_wallet',
    link: 'sigarang/history/gudang',
    nama: 'Gudang',
    name: 'sigarang.history.gudang'
  },
  {
    icon: 'icon-mat-account_balance_wallet',
    link: 'sigarang/history/retur',
    nama: 'Retur',
    name: 'sigarang.history.retur'
  }
]
const table = useHistoryTable()
const route = useRoute()
function getSub(val) {
  const index = findWithAttr(submenus, 'name', val)
  if (index >= 0) {
    const sub = submenus[index]
    table.pilihTransaksi(sub)
  }// console.log('History aja', sub)
}
// console.log('path', useRoute().name)
getSub(useRoute().name)
watch(() => route.name, val => {
  console.log('watch ', val)
  getSub(val)
  // console.log('watch 2', useRoute().name)
})
</script>
