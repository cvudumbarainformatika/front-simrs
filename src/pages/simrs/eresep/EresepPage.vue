<template>
  <div
    class="row full-height full-width bg-grey-4 shadow-1"
  >
    <div class="col-8 full-height q-pa-xs">
      <tab-panel />
    </div>
    <div class="col-4 full-height q-pa-xs">
      <tab-panel />
    </div>
  </div>
</template>

<script setup>
import TabPanel from './comp/TabPanel.vue'
</script>
