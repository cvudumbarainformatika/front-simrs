<template>
  <app-maintenance
    text="Sedang Dalam Proses Pembuatan"
  />
</template>

<script setup>
import { useVerifPermintaanDepoStore } from 'src/stores/simrs/farmasi/verifpermintaandepo/verifdepo'
const store = useVerifPermintaanDepoStore()

store.getInitialData()
</script>

<style>

</style>
