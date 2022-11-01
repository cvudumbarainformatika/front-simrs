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
import { defineAsyncComponent } from 'vue'
import SkeletonPage from './SkeletonPage.vue'

const AsyncComp = defineAsyncComponent(() =>
  import('./HistoryPage.vue')
)
</script>
