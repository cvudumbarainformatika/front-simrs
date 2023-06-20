<template>
  <q-page>
    <Suspense>
      <NewSsoPage />
      <template #fallback>
        <!-- <app-loading /> -->
        <app-loader
          class="dimmed"
        />
      </template>
    </Suspense>
    <!-- <app-loading /> -->
  </q-page>
</template>

<script setup>
import { defineAsyncComponent } from 'vue'
const NewSsoPage = defineAsyncComponent(() => import('./NewSsoPage.vue'))

</script>
