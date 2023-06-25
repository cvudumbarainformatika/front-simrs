<template>
  <q-chip
    :outline="outline"
    :square="square"
    :color="color"
    :text-color="textColor"
    dense
    class="chip full-width"
  >
    <div class="row full-width">
      <div
        class="col-12 text-center"
        :class="font"
      >
        {{ label }}
      </div>
    </div>
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
  label: { type: String, default: 'label' }
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
