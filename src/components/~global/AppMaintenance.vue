<template>
  <div
    class="flex column flex-center bg-loading-bg__table"
    style="height:300px"
  >
    <div v-if="withIcon">
      <q-icon
        :name="props.icon"
        :color="props.color"
        size="60px"
      />
    </div>
    <div v-if="!withIcon">
      <img
        src="~assets/images/weaver-girl-hand-weaving.png"
        spinner-color="white"
        style="height: 5cm; max-width: 5cm"
      >
    </div>
    <div :class="'text-' + props.color + ' text-weight-bold q-mt-sm'">
      {{ props.text }}
    </div>
  </div>
</template>
<script setup>
const props = defineProps({
  text: { type: String, default: 'Sedang Dalam Perbaikan' },
  icon: { type: String, default: 'icon-mat-construction' },
  color: { type: String, default: 'orange' },
  withIcon: { type: Boolean, default: false }
})
</script>
