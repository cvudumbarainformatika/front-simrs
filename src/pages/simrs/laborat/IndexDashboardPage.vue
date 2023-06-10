
<template>
  <q-page>
    <Suspense>
      <DashboardPage />
      <template #fallback>
        <app-loading />
      </template>
    </Suspense>
    <!-- <app-loading /> -->
  </q-page>
</template>

<script setup>
import { defineAsyncComponent } from 'vue'
const DashboardPage = defineAsyncComponent(() => import('./DashboardPage.vue'/* webpackChunkName: "DashboardPage" */))
</script>
