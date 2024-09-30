<script setup>
const props = defineProps({
  items: {
    type: Array,
    default: () => []
  },
  noContent: {
    type: String,
    default: 'Tidak Ada Data Dari IGD Sebelumnya'
  }
})
</script>

<template>
  <div class="">
    <div v-if="props.items.length">
      <slot />
    </div>
    <div v-else class="column full-height flex-center" style="min-height: 200px;">
      <div>{{ props.noContent }}</div>
    </div>
  </div>
</template>
