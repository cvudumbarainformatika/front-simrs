<template>
  <resep
    :pasien="props?.pasien"
    depo="rjl"
  />
</template>
<script setup>
import { defineAsyncComponent, shallowRef } from 'vue'

const props = defineProps({
  pasien: { type: Object, default: null }
})
const resep = shallowRef(defineAsyncComponent(() => import('src/pages/simrs/eresep/EresepPage.vue')))
// function anu() {
//   console.log('pasien', props.pasien)
// }
</script>
