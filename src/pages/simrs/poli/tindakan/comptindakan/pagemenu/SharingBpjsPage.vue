<template>
  <div
    class="full-height q-pa-sm"
  >
    <div class="row q-col-gutter-x-xs full-height">
      <div class="col-8 full-height">
        <component
          :is="form"
        />
      </div>
      <div class="col-4 full-height">
        <component
          :is="list"
          :key="props.pasien"
          :pasien="props.pasien"
        />
      </div>
    </div>
  </div>
</template>
<script setup>
import { defineAsyncComponent } from 'vue'

const props = defineProps({
  pasien: {
    type: Object,
    default: null
  }
})
const form = defineAsyncComponent(() => import('./compsharing/FormPage.vue'))
const list = defineAsyncComponent(() => import('./compsharing/ListPage.vue'))
</script>
