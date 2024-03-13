<template>
  <q-btn
    label="get data"
    color="primary"
    :loading="store.loading"
    @click="store.getData"
  />
  <app-maintenance text="List Kondinyasi Sedang Dalam Proses Pembuatan" />
</template>

<script setup>
import { useListPemakaianObatKonsinyasiStore } from 'src/stores/simrs/farmasi/konsinyasi/listkonsinyasi'
const store = useListPemakaianObatKonsinyasiStore()
store.getInitialData()
</script>

<style></style>
