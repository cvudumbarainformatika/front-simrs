<template>
  <app-maintenance text="Sedang Dalam Proses Pembuatan" />
</template>

<script setup>
import { useReturPenyediaStore } from 'src/stores/simrs/farmasi/gudang/retur'
const store = useReturPenyediaStore()
store.getInitialData()
</script>

<style></style>
