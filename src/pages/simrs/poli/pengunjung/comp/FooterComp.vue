<template>
  <div class="">
    <div class="f-14">
      TOTAL PASIEN : <span class="text-weight-bold">{{ items.length }}</span>
    </div>
  </div>
</template>

<script setup>
defineProps({
  items: {
    type: Array,
    default: () => []
  }
})
</script>
