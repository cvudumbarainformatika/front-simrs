<template>
  <q-input
    :label="label"
    dense
    outlined
    standout="bg-yellow-3"
    :class="`q-mb-xs ${classTambahan}`"
    :autofocus="autofocus"
    :type="type"
  />
</template>

<script setup>
defineProps({
  label: {
    type: String,
    default: 'Label'
  },
  autofocus: {
    type: Boolean,
    default: true
  },
  classTambahan: {
    type: String,
    default: ''
  },
  type: {
    type: String,
    default: 'text'
  }
})
</script>
