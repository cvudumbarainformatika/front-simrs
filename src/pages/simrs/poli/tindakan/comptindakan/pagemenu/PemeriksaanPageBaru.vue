<template>
  <q-card
    flat
    class="column full-height bg-grey-4 shadow-1"
  >
    <!-- <div
      class="col-auto bg-white"
      style="border-bottom: 1px solid grey;"
    >
      <HeaderComp />
    </div> -->
    <div class="col full-height full-width relative-position">
      <div
        class="absolute-left full-height bg-white"
        style="width:33%;"
      >
        dsfs
      </div>
      <CanvasComp />
      <div
        class="absolute-right full-height bg-white"
        style="width:33%;"
      >
        dsfs
      </div>
    </div>
  </q-card>
</template>

<script setup>
// import HeaderComp from './comppemeriksaanbaru/HeaderComp.vue'
import CanvasComp from './comppemeriksaanbaru/CanvasComp.vue'
</script>
