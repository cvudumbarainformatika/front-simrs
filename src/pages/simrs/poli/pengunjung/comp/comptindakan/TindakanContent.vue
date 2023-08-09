<template>
  <div>
    <AnamnesisPage v-if="tab==='anamnesis'" />
    <PemeriksaanPage v-else-if="tab==='pemeriksaan'" />
  </div>
</template>
<script setup>
import AnamnesisPage from './anamnesis/AnamnesisPage.vue'
import PemeriksaanPage from './pemeriksaan/PemeriksaanPage.vue'
defineProps({
  tab: {
    type: String,
    default: 'kosong'
  }
})
</script>
