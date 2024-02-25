<template>
  {{ store.sudahs }}
</template>
<script setup>

import { useResepPermintaanOperasiStore } from 'src/stores/simrs/farmasi/permintaanresep/permintaanoperasi'

const store = useResepPermintaanOperasiStore()
</script>
