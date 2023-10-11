<template>
  <div
    class="column full-height q-ma-sm"
    style="overflow: hidden;"
  >
    <div class="row q-col-gutter-x-xs full-height">
      <div class="col-8 full-height">
        <FormEdukasi />
      </div>
      <div class="col-4 full-height">
        {{ pasien }}
      </div>
    </div>
  </div>
</template>

<script setup>
import FormEdukasi from './compedukasi/FormEdukasi.vue'

defineProps({
  pasien: {
    type: Object,
    default: null
  }
})
</script>
