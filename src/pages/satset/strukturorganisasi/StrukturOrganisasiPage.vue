<template>
  <q-page
    class=""
    :class="style.componentfull?'container-no-header':'container--q-header q-pa-xs'"
  >
    Struktur Organisasi
  </q-page>
</template>

<script setup>
import { useStyledStore } from 'src/stores/app/styled'
const style = useStyledStore()
</script>
