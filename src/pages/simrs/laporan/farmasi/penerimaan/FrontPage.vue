<template>
  <AsyncComp />
</template>
<script setup>
import { defineAsyncComponent } from 'vue'

const AsyncComp = defineAsyncComponent(() =>
  import('./comp/PenerimaanObatPage.vue')
)
</script>
