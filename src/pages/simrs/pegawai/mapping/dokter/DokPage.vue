<template>
  <div
    class="bg-red"
    :style="`height:${height}px`"
  >
    {{ height }}
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
const height = ref(0)

onMounted(() => {
  height.value = window.screen.height - 168
})

</script>
