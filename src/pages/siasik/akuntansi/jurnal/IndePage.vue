<template>
  <q-page>
    <Suspense>
      <AsyncComp />
      <template #fallback>
        <app-loader />
      </template>
    </Suspense>
  </q-page>
</template>
<script setup>
import { defineAsyncComponent } from 'vue'

const AsyncComp = defineAsyncComponent(() => import('./JurnalPage.vue'))
</script>
