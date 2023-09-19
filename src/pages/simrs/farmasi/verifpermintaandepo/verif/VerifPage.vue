<template>
  <app-no-selected-page
    color="orange"
    text="Sedang Dalam Proses Pembuatan"
    icon="icon-mat-construction"
  />
</template>

<script setup>
import { useVerifPermintaanDepoStore } from 'src/stores/simrs/farmasi/verifpermintaandepo/verifdepo'
const store = useVerifPermintaanDepoStore()

store.getInitialData()
</script>

<style>

</style>
