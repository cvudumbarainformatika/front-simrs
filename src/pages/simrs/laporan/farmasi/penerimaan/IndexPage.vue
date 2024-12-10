<template>
  <q-page>
    <Suspense>
      <!-- main content -->
      <AsyncComp :pihakketiga="store.pihakTigas" />
      <!-- loading state -->
      <template #fallback>
        <app-loading />
      </template>
    </Suspense>
  </q-page>
</template>
<script setup>

import { useLaporanPenerimaanObatStore } from 'src/stores/simrs/laporan/farmasi/penerimaanobat/penerimaanobat'
import { defineAsyncComponent, onMounted } from 'vue'

const AsyncComp = defineAsyncComponent(() =>
  import('./FrontPage.vue')
)
const store = useLaporanPenerimaanObatStore()
onMounted(() => {
  store.getPihakKetiga()
})
</script>
