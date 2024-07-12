<template>
<AsyncComp/>
</template>
<script setup>
import { defineAsyncComponent } from 'vue'

const AsyncComp = defineAsyncComponent(() =>
  import('src/pages/simrs/logistik/gudang/farmasi/penerimaan/listpenerimaan/ListPenerimaanPage.vue')
)
</script>