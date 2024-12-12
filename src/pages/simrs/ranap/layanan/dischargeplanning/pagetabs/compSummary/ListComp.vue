<template>
  <q-form>
    List
  </q-form>
</template>

<script setup>
defineProps({
  pasien: {
    type: Object,
    default: null
  },
  items: {
    type: Array,
    default: () => []
  }
})
</script>
