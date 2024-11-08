<template>
  <div class="justify-content-center">
    <div class="q-pa-md full-width">
      coba
    </div>
  </div>
</template>
<script setup>
import { useLRAjurnalStore } from 'src/stores/siasik/laporan/lra/lrajurnal.'
import { onUnmounted } from 'vue'

const store = useLRAjurnalStore()
onUnmounted(() => {
  store.getDataLap()
})

</script>
