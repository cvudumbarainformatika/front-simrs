<!-- <template>
  <q-page>
    <Suspense>
      <NewSsoPage />
      <template #fallback>
        <app-loading />
      </template>
    </Suspense>
  </q-page>
</template>

<script setup>

import { defineAsyncComponent } from 'vue'
const NewSsoPage = defineAsyncComponent(() => import('./NewSsoPage.vue'))
</script> -->

<template>
  <q-page>
    <NewSsoPage v-if="isLoaded" />
    <!-- <app-loading v-else /> -->
    <LoadingSso v-else />
  </q-page>
</template>

<script setup>
import { ref, onMounted, defineAsyncComponent } from 'vue'
import LoadingSso from './LoadingSso.vue'
const isLoaded = ref(false)
const NewSsoPage = defineAsyncComponent({
  loader: () => import('./NewSsoPage.vue'),
  loadingComponent: LoadingSso,
  delay: 200,
  timeout: 3000,
  onError(error, retry, fail, attempts) {
    console.log(error)
    if (attempts <= 2) {
      retry()
    } else {
      fail()
    }
  }
})

onMounted(async () => {
  // try {
  //   await NewSsoPage.load()
  //   isLoaded.value = true
  // } catch (error) {
  //   console.error('Failed to load the NewSsoPage component', error)
  // }
  isLoaded.value = true
})
</script>
