<template>
  list Pengembalian Pinjaman
</template>
<script setup>
import { useListPengembalianPinjamanStore } from 'src/stores/simrs/farmasi/pengembalian/listpengembalian'
import { onMounted } from 'vue'

const store = useListPengembalianPinjamanStore()
onMounted(() => {
  store.getInitialData()
})
</script>
