<template>
  <q-page>
    <router-view />
  </q-page>
</template>
<script setup>
import { useAbsensiJadwalStore } from 'src/stores/simrs/pegawai/absensi/jadwal/jadwal'
import { UseProtaAbsensiLiburStore } from 'src/stores/simrs/pegawai/absensi/prota/prota'

const prota = UseProtaAbsensiLiburStore()
const jadwal = useAbsensiJadwalStore()

prota.getProta()
prota.getTahunProta()

jadwal.getInitialData()
</script>
