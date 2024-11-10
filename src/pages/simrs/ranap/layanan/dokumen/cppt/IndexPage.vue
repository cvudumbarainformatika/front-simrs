<template>
  <div class="fit">
    <ews-page v-if="other.openEws" :pasien="pasien" :menu="menu" @close="other.openEws = false" />
    <cppt-page v-else :pasien="pasien" :menu="menu" @open-ews="other.openEws = true" />
  </div>
</template>

<script setup>
import { defineAsyncComponent } from 'vue'
import useCppt from './useCppt'

const CpptPage = defineAsyncComponent(() => import('./CpptPage.vue'))
const EwsPage = defineAsyncComponent(() => import('./EwsPage.vue'))
const props = defineProps({
  pasien: {
    type: Object,
    default: null
  },
  menu: {
    type: Object,
    default: null
  }
})

// eslint-disable-next-line no-unused-vars
const { other } = useCppt(props?.pasien)

</script>
