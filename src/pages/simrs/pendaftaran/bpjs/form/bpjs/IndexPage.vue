<template>
  <div>
    <Suspense>
      <!-- main content -->
      <AsyncComp />
      <!-- loading state -->
      <template #fallback>
        <app-loading />
      </template>
    </Suspense>
  </div>
</template>
<script setup>
import { defineAsyncComponent } from 'vue'

const AsyncComp = defineAsyncComponent(() =>
  import('./FormBpjs.vue')
)
</script>
