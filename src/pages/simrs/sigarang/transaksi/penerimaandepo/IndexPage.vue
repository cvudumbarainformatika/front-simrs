<template>
  <q-page class="q-pa-sm">
    <Suspense>
      <!-- main content -->
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
  import('./PenerimaanDepoPage.vue')
  // import('./PenerimaanDepoPageNew.vue')
)
</script>
