<template>
  <div>
    {{ pasien }}
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
