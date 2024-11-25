<template>
  <div>
    <app-btn
      label="ambil"
      color="primary"
      :loading="store.loading"
      @click="store.getItems()"
    />
  </div>
  Halaman Kartu Stok
</template>
<script setup>
import { useAplikasiStore } from 'src/stores/app/aplikasi'
import { useKartuStokBarangRusakStore } from 'src/stores/simrs/farmasi/barangrusak/kartustok'
import { onMounted, watch } from 'vue'

const store = useKartuStokBarangRusakStore()
const apps = useAplikasiStore()

onMounted(() => {
  store.setParams('kdruang', apps?.user?.kdruangansim)
})

watch(() => apps?.user?.kdruangansim, (kod) => {
  store.setParams('kdruang', kod)
})
</script>
