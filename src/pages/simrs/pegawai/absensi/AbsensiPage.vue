<template>
  <q-page>
    Halaman absensi
    <router-view />
  </q-page>
</template>
<script setup>
import { useAbsensiJadwalStore } from 'src/stores/simrs/pegawai/master/jadwal/jadwal'
import { UseProtaAbsensiLiburStore } from 'src/stores/simrs/pegawai/master/prota/prota'

const prota = UseProtaAbsensiLiburStore()
const jadwal = useAbsensiJadwalStore()

prota.getProta()
prota.getTahunProta()

jadwal.getInitialData()
</script>
