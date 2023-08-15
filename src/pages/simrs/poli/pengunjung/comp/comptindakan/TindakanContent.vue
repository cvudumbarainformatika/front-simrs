<template>
  <div class="my-flex-1 full-height">
    <!-- <AnamnesisPage v-if="tab==='anamnesis'" />
    <PemeriksaanPage v-else-if="tab==='pemeriksaan'" />
    <LayananPage v-else-if="tab==='layanan'" /> -->
    <component
      :is="componentMap"
      :key="tab"
    />
  </div>
</template>
<script setup>
import { defineAsyncComponent } from 'vue'

// import LayananPage from './layanan/LayananPage.vue'
// import AnamnesisPage from './anamnesis/AnamnesisPage.vue'
// import PemeriksaanPage from './pemeriksaan/PemeriksaanPage.vue'

const props = defineProps({
  tab: {
    type: String,
    default: 'anamnesis-page'
  }
})
const componentMap = defineAsyncComponent(() => import(`./pagemenu/${props.tab}.vue`))
</script>
