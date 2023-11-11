<template>
  <q-card
    flat
    class="column full-height bg-grey-4 shadow-1"
  >
    <div
      class="col-auto bg-white"
      style="border-bottom: 1px solid grey;"
    >
      <HeaderComp />
    </div>
    <div class="col full-height full-width relative-position">
      <CanvasComp />
    </div>
  </q-card>
</template>

<script setup>
import HeaderComp from './comppemeriksaanbaru/HeaderComp.vue'
import CanvasComp from './comppemeriksaanbaru/CanvasComp.vue'
</script>
