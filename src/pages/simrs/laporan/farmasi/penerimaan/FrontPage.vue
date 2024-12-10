<template>
  <AsyncComp :pihakketiga="props.pihakketiga" />
</template>
<script setup>
import { defineAsyncComponent } from 'vue'

const AsyncComp = defineAsyncComponent(() =>
  import('./comp/PenerimaanObatPage.vue')
)

const props = defineProps({
  pihakketiga: {
    type: Object,
    default: null
  }
})
</script>
