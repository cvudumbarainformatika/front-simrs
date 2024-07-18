<template>
  <q-input
    ref="appInputSimrs"
    :label="label"
    :dense="type !== 'textarea'"
    :autogrow="type === 'textarea'"
    outlined
    standout="bg-yellow-3"
    :class="`q-mb-xs ${classTambahan}`"
    :autofocus="autofocus"
    :readonly="readonly"
    :disable="disable"
    :type="type"
    :rules="[isValidInput]"
    :lazy-rules="lazyRules"
    hide-bottom-space
    :hint="hint"
    :hide-hint="!hint"
    @update:model-value="emits('update:modelValue', $event)"
  >
    <template v-if="append" #append>
      <q-icon :name="appendIcon" size="xs" class="cursor-pointer" v-ripple @click="emits('appendClick')" />
    </template>
  </q-input>
</template>

<script setup>
import { ref } from 'vue'
// const bg = ref(false)
const props = defineProps({
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
  },
  valid: {
    type: Object,
    default: null
  },
  lazyRules: {
    type: [Boolean, String],
    default: true
  },
  hint: {
    type: String,
    default: null
  }

})

const emits = defineEmits(['appendClick', 'update:modelValue'])

const appInputSimrs = ref(null)

defineExpose({ appInputSimrs })

function isValidInput (val) {
  if (props.valid === null) {
    return true
  }
  else {
    if (props.valid?.email) {
      const emailPattern = /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/
      return emailPattern.test(val) || 'email tidak valid'
    }
    else if (props.valid?.number) {
      return (!isNaN(val) && !isNaN(parseFloat(val))) || 'Harus angka'
    }
    else if (props.valid?.min) {
      return val?.length >= parseInt(props.valid?.min) || `Min ${props.valid?.min} char`
    }
    else if (props.valid?.max) {
      return val?.length <= parseInt(props.valid?.max) || `Max ${props.valid?.max} char`
    }
    else {
      return (!!val) || 'Harap diisi'
    }
  }
}

</script>
