<template>
  <q-page>
    <Suspense>
      <LaboratPage />
      <template #fallback>
        <app-loading />
      </template>
    </Suspense>
    <!-- <app-loading /> -->
  </q-page>
</template>

<script setup>
import { defineAsyncComponent } from 'vue'
const LaboratPage = defineAsyncComponent(() => import('./LaboratPage.vue'/* webpackChunkName: "LaboratPage" */))
</script>
