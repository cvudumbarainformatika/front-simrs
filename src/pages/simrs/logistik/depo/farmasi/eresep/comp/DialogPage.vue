<template>
  {{ store.resep }}
</template>
<script setup>

import { useEResepDepoFarmasiStore } from 'src/stores/simrs/farmasi/eresep/eresep'

const store = useEResepDepoFarmasiStore()

</script>
