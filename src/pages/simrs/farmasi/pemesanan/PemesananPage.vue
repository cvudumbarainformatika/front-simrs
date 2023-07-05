<template>
  <q-page padding>
    <PageHead />
    <app-btn
      label="clk"
      @click="style.setComponentFull"
    />
  </q-page>
</template>
<script setup>
import PageHead from './PageHead.vue'
import { useStyledStore } from 'src/stores/app/styled'

const style = useStyledStore()
</script>
