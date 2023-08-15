<template>
  <q-btn
    size="sm"
    padding="xs"
    :label="label"
    :flat="!active"
    :color="active?'primary':'grey-9'"
    unelevated
    @click="emits('click')"
  >
    <q-icon
      v-if="icon"
      :name="icon"
    />
    <q-tooltip
      v-if="tooltip"
      :delay="tipDelay"
    >
      {{ tooltip }}
    </q-tooltip>
    <q-tooltip
      v-if="vtooltip"
      anchor="center right"
      self="center left"
    >
      {{ vtooltip }}
    </q-tooltip>
    <slot />
  </q-btn>
</template>

<script setup>
const emits = defineEmits(['click'])
defineProps({
  active: {
    type: Boolean,
    default: false
  },
  color: {
    type: String,
    default: 'primary'
  },
  icon: {
    type: String,
    default: ''
  },
  label: {
    type: String,
    default: ''
  },
  tooltip: {
    type: String,
    default: ''
  },
  vtooltip: {
    type: String,
    default: ''
  },
  tipDelay: {
    type: Number,
    default: 50
  }
})

</script>

<style lang="scss">
  .o-menubar-btn {
    padding: 0px;
    font-weight: 400;
    min-width: 30px;
    min-height: unset;
  }
  .o-menubar-btn.is-active {
    background: rgba(255,255,255,0.2)
  }
</style>
