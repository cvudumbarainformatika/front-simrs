<template>
  <q-img
    :src="foto"
    :ratio="1"
    :width="width"
  />
</template>

<script setup>
import { computed } from 'vue'

defineProps({
  width: { type: String, default: '60px' }
})

const foto = computed(() => {
  return new URL('../../assets/images/user-man.svg', import.meta.url).href
})
</script>
