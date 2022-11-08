<template>
  <q-page>
    <router-view />
  </q-page>
</template>
<script setup>
import { UseProtaAbsensiLiburStore } from 'src/stores/simrs/pegawai/absensi/prota/prota'

const prota = UseProtaAbsensiLiburStore()

prota.getProta()
prota.getTahunProta()
</script>
