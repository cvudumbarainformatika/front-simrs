<template>
  <div
    class="flex column flex-center bg-loading-bg__table"
    style="height:300px"
  >
    <div>
      <q-icon
        :name="props.icon"
        :color="props.color"
        size="60px"
      />
    </div>
    <div :class="'text-'+ props.color + ' text-weight-bold q-mt-sm'">
      {{ props.text }}
    </div>
  </div>
</template>
<script setup>
const props = defineProps({
  text: { type: String, default: 'Belum ada menu yang dipilih' },
  icon: { type: String, default: 'icon-mat-warning' },
  color: { type: String, default: 'negative' }
})
</script>
