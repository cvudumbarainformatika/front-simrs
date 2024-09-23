<template>
  <q-select
    dense
    standout="bg-yellow-3 text-black"
    outlined
    :label="label"
    :options="options"
    emit-value
    map-options
    option-label="label"
    fill-input
    input-debounce="0"
    hide-bottom-space
    @update:model-value="emits('update:modelValue', $event)"
  />
</template>
<script setup>
defineProps({
  label: {
    type: String,
    default: 'label'
  },
  options: {
    type: Array,
    default: () => []
  }
})

const emits = defineEmits(['update:modelValue'])

</script>
