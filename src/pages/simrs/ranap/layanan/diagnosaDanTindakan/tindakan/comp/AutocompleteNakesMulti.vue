<script setup>
import { ref, toRef } from 'vue'

// const stringOptions = [
//   'Google', 'Facebook', 'Twitter', 'Apple', 'Oracle'
// ]

const props = defineProps({ model: [Array, String], source: [Array] })

// eslint-disable-next-line no-undef
const model = toRef(props.model, 'model')

// const stringOptions = toRef(source)
const filterOptions = ref([])
const refAutocomplete = ref(null)

defineExpose({ refAutocomplete })

const createValue = (val, done) => {
  // Calling done(var) when new-value-mode is not set or is "add", or done(var, "add") adds "var" content to the model
  // and it resets the input textbox to empty string
  // ----
  // Calling done(var) when new-value-mode is "add-unique", or done(var, "add-unique") adds "var" content to the model
  // only if is not already set and it resets the input textbox to empty string
  // ----
  // Calling done(var) when new-value-mode is "toggle", or done(var, "toggle") toggles the model with "var" content
  // (adds to model if not already in the model, removes from model if already has it)
  // and it resets the input textbox to empty string
  // ----
  // If "var" content is undefined/null, then it doesn't tampers with the model
  // and only resets the input textbox to empty string

  if (val.length > 0) {
    const modelValue = (model?.value || []).slice()

    val
      .split(/[,;|]+/)
      .map(v => v.trim())
      .filter(v => v.length > 0)
      .forEach(v => {
        // if (props.source?.includes(v) === false) {
        //   filterOptions.value.push(v)
        // }
        if (modelValue.includes(v) === false) {
          modelValue.push(v)
        }
      })

    console.log('modelValue', modelValue)
    console.log('val', val)

    // done(val, 'add-unique')
    done(null)
    if (modelValue && model?.value) model.value = modelValue
    else model.value = val
  }
}

const filterFn = (val, update) => {
  // console.log('val', val, props.source)

  update(() => {
    if (val === '') {
      filterOptions.value = props.source
    }
    else {
      const needle = val.toLowerCase()
      filterOptions.value = props.source?.filter(
        v => v?.nama?.toLowerCase().indexOf(needle) > -1
      )

      // console.log('filterOptions', val)
    }
  },
  ref => {
    console.log('ref', ref)
    if (val !== '' && ref.options.length) {
      ref.setOptionIndex(-1)
      ref.moveOptionSelection(1, true)
    }
  }
  )
}

</script>

<template>
  <q-select
    ref="refAutocomplete"
    outlined
    standout="bg-yellow-3"
    label="Select multiple values"
    use-input
    use-chips
    multiple
    input-debounce="0"
    @new-value="createValue"
    :options="filterOptions"
    @filter="filterFn"
    @update:model-value="(val)=> {
      // console.log('model', val);
      const j = val.join(';')
      $emit('update:model', val);
    }"
    hide-bottom-space
  >
    <!-- <template #selected-item="scope">
      <q-chip
        removable
        dense
        outline
        @remove="scope.removeAtIndex(scope.index)"
        :tabindex="scope.tabindex"
        color="primary"
        text-color="white"
        class="q-ma-none q-mr-sm q-mb-sm q-pa-sm"
      >
        {{ scope?.opt?.nama }}
      </q-chip>
    </template> -->
  </q-select>
</template>
