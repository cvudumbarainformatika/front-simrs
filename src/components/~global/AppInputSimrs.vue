<template>
  <q-input
    :label="label"
    dense
    outlined
    standout="bg-yellow-3"
    :class="`q-mb-xs ${classTambahan}`"
    :autofocus="autofocus"
    :readonly="readonly"
    :disable="disable"
    :type="type"
  >
    <template v-if="append" #append>
      <q-icon :name="appendIcon" size="xs" class="cursor-pointer" v-ripple @click="emits('appendClick')" />
    </template>
  </q-input>
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
  readonly: {
    type: Boolean,
    default: false
  },
  disable: {
    type: Boolean,
    default: false
  },
  append: {
    type: Boolean,
    default: false
  },
  appendIcon: {
    type: String,
    default: 'icon-mat-close'
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

const emits = defineEmits(['appendClick'])
</script>
