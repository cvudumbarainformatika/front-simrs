<template>
  Cardio {{ props.pasien }}
</template>
<script setup>

const props = defineProps({
  pasien: {
    type: Object,
    default: null
  }
})
</script>
