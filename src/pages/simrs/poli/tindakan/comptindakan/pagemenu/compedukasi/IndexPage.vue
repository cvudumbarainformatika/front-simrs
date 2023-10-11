<template>
  <div
    class="column full-height q-ma-sm"
    style="overflow: hidden;"
  >
    <div class="column full-height">
      <div class="col-auto bg-red">
        {{ pasien }}
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  pasien: {
    type: Object,
    default: null
  }
})
</script>
