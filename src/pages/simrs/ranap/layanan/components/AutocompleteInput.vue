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
    :rules="[requiredRule]"
    @input-value="(val)=> emits('setModel', val)"
  />
</template>
<script setup>
const props = defineProps({
  label: {
    type: String,
    default: 'label'
  },
  options: {
    type: Array,
    default: () => []
  },
  valid: {
    type: Object,
    default: null
  }
})

const emits = defineEmits(['setModel'])

const requiredRule = (val) => {
  if (props.valid === null) {
    return true
  }
  return (!!val || props.valid?.required || val === 0) || 'Harap diisi'
}
</script>
