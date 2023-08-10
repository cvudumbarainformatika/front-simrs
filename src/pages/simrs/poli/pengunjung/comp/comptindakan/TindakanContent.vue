<template>
  <div>
    <AnamnesisPage v-if="tab==='anamnesis'" />
    <PemeriksaanPage v-else-if="tab==='pemeriksaan'" />
    <LayananPage v-else-if="tab==='layanan'" />
  </div>
</template>
<script setup>
import LayananPage from './layanan/LayananPage.vue'
import AnamnesisPage from './anamnesis/AnamnesisPage.vue'
import PemeriksaanPage from './pemeriksaan/PemeriksaanPage.vue'
defineProps({
  tab: {
    type: String,
    default: 'kosong'
  }
})
</script>
