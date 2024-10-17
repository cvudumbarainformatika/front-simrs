<script setup>
const props = defineProps({
  items: {
    type: Array,
    default: () => []
  },
  noContent: {
    type: String,
    default: 'Belum Ada Data Tersimpan'
  }
})
</script>

<template>
  <div class="">
    <div v-if="props.items.length">
      <slot />
    </div>
    <div v-else class="column full-height flex-center" style="min-height: 300px;">
      <div>{{ props.noContent }}</div>
    </div>
  </div>
</template>
