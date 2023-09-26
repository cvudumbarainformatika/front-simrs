<template>
  <div>
    {{ props?.pasien }}
  </div>
</template>

<script setup>
const props = defineProps({
  pasien: {
    type: Object,
    default: null
  }
})
</script>
