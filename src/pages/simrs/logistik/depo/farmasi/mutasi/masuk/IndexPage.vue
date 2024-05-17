<template>
  <q-page>
    <Suspense>
      <!-- main content -->
      <AsyncComp @ganti="gantiHead" />
      <!-- loading state -->
      <template #fallback>
        <app-loading />
      </template>
    </Suspense>
  </q-page>
</template>
<script setup>
import { defineAsyncComponent } from 'vue'
const emits = defineEmits(['ganti'])
function gantiHead(val) {
  emits('ganti', val)
}
const AsyncComp = defineAsyncComponent(() =>
  import('./MutasiMasuk.vue')
)
</script>
