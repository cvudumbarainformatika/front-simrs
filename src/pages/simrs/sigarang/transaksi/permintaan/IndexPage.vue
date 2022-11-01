<template>
  <q-page>
    <Suspense>
      <!-- main content -->
      <!-- <SkeletonPermintaan /> -->
      <AsyncComp />
      <!-- loading state -->
      <template #fallback>
        <SkeletonPermintaan />
      </template>
    </Suspense>
  </q-page>
</template>
<script setup>
import { defineAsyncComponent } from 'vue'
import SkeletonPermintaan from './SkeletonPermintaan.vue'

const AsyncComp = defineAsyncComponent(() =>
  import('./PermintaanPage.vue')
)
</script>
