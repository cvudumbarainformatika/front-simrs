<template>
  <q-page>
    <Suspense>
      <!-- main content -->
      <!-- <SkeletonPermintaan /> -->
      <AsyncComp />
      <!-- loading state -->
      <template #fallback>
        <app-loading />
      </template>
    </Suspense>
  </q-page>
</template>
<script setup>
import { defineAsyncComponent } from 'vue'

const AsyncComp = defineAsyncComponent(() =>
  import('./VerifPermitaanPage.vue')
)
</script>
