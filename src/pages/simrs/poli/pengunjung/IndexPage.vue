<template>
  <q-page>
    <Transition>
      <AsyncComp v-if="isLoaded" />
      <app-loading v-else />
    </Transition>
  </q-page>
</template>

<script setup>
import { ref, onMounted, defineAsyncComponent } from 'vue'
// import LoadingSso from './LoadingSso.vue'
const isLoaded = ref(false)
const AsyncComp = defineAsyncComponent({
  loader: () => import('./PagePengunjung.vue'),
  loadingComponent: 'app-loading',
  delay: 200,
  timeout: 3000,
  onError (error, retry, fail, attempts) {
    console.log(error)
    if (attempts <= 2) {
      retry()
    }
    else {
      fail()
    }
  }
})

onMounted(async () => {
  isLoaded.value = true
})
</script>
