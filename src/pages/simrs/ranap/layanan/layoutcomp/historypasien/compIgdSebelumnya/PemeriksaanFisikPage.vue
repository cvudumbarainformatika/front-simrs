<template>
  <div class="fit">
    <div v-if="store?.igdBefore === null" class="column full-height flex-center">
      Tidak Ada Data IGD Sebelumnya <br>
      Pasien Bukan Dari IGD
    </div>
    <div v-else class="full-height">
      <PemeriksaanFisik :pasien="store.pasienIgd" :loadingaja="false" :key="store?.pasienIgd" :bisa-edit-hapus="false" />
    </div>
  </div>
</template>

<script setup>
import { useHistoryPasienRanapStore } from 'src/stores/simrs/ranap/history'
import { defineAsyncComponent } from 'vue'

const PemeriksaanFisik = defineAsyncComponent(() => import('src/pages/simrs/igd/layanan/pemeriksaanfisik/compemeriksaanfisik/ListPemeriksaanFisik.vue'))

const store = useHistoryPasienRanapStore()
</script>
