<template>
  Halaman Persiapan operasi
</template>
<script setup>
import { useResepPermintaanOperasiStore } from 'src/stores/simrs/farmasi/permintaanresep/permintaanoperasi'

const store = useResepPermintaanOperasiStore()

store.getData()

</script>
