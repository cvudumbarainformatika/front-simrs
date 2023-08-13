<template>
  <app-fullscreen v-model="store.isOpen">
    <template #default>
      Dialog SEP
    </template>
  </app-fullscreen>
</template>
<script setup>
import { useSepBpjsStore } from 'src/stores/simrs/pendaftaran/kunjungan/bpjs/sep'

const store = useSepBpjsStore()
</script>
