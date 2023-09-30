<template>
  <app-maintenance text="Sedang Dalam Proses Pembuatan" />
</template>

<script setup>
import { useKasirRajalListKunjunganStore } from 'src/stores/simrs/kasir/rajal/kunjungan'
const store = useKasirRajalListKunjunganStore()

store.getInitialData()
</script>

<style></style>
