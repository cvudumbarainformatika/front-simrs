<template>
  <q-select
    dense
    standout="bg-yellow-3 text-black"
    outlined
    :label="label"
    :options="options"
    hide-selected
    fill-input
    use-input
    input-debounce="0"
    hide-bottom-space
    hide-dropdown-icon
    @input-value="(val)=> emits('setModel', val)"
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

const emits = defineEmits(['setModel'])
</script>
