<template>
  <q-page>
    <Suspense>
      <TablePage />
      <template #fallback>
        <app-loading />
      </template>
    </Suspense>
    <!-- <app-loading /> -->
  </q-page>
</template>

<script setup>
import { defineAsyncComponent } from 'vue'
const TablePage = defineAsyncComponent(() => import('./TablePage.vue'))
</script>
