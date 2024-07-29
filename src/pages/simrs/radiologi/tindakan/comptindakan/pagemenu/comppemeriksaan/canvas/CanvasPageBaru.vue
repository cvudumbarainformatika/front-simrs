<template>
  <div
    class="column flex-center items-center bg-grey full-height full-width"
    :style="`width: ${props.width};`"
  >
    <canvas
      :width="props.width - 40"
      :height="props.width"
      class="bg-white"
    />
  </div>
</template>

<script setup>
const props = defineProps({
  width: {
    type: Number,
    default: 300
  },
  pasien: {
    type: Object,
    default: null
  },
  screenFull: {
    type: Boolean,
    default: false
  }
})
</script>
