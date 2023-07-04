<template>
  <q-chip
    :outline="outline"
    :square="square"
    :color="color"
    :text-color="textColor"
    dense
    class="chip full-width cursor-pointer"
  >
    <div
      class="full-width text-center wrap"
      :class="font"
    >
      {{ label }}
    </div>
    <q-tooltip
      v-if="adaTooltip"
      anchor="top middle"
      self="bottom middle"
      :offset="[0, 0]"
    >
      {{ tooltip }}
    </q-tooltip>
  </q-chip>
</template>
<script setup>
defineProps({
  textColor: { type: String, default: 'white' },
  font: { type: String, default: 'f-12' },
  color: { type: String, default: 'primary' },
  icon: { type: String, default: '' },
  square: { type: Boolean, default: false },
  outline: { type: Boolean, default: false },
  label: { type: String, default: 'label' },
  tooltip: { type: String, default: '' },
  adaTooltip: { type: Boolean, default: false }
})
</script>
<style lang="scss" scoped>
.chip{
  padding: 0px;
  .q-chip__content{
    justify-content: center;
  }
}
</style>
