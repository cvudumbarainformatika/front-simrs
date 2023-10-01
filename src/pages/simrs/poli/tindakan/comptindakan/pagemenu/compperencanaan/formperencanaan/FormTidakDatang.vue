<template>
  <div>
    Form Tidak Datang
    <div>
      {{ props.pasien }}
    </div>
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
