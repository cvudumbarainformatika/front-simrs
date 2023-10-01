<template>
  <q-card
    flat
    bordered
    square
    class="full-height"
  >
    {{ props?.pasien }}
  </q-card>
</template>

<script setup>
const props = defineProps({
  pasien: {
    type: Object,
    default: null
  }
})
</script>
