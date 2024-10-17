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
    :rules="[requiredRule]"
    :lazy-rules="lazyRules"
    @update:model-value="emits('update:modelValue', $event)"
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
  },
  lazyRules: {
    type: Boolean,
    default: false
  }
})

const emits = defineEmits(['update:modelValue'])

const requiredRule = (val) => {
  if (props.valid === null) {
    return true
  }
  return (!!val || props.valid?.required || val === 0) || 'Harap diisi'
}

</script>
