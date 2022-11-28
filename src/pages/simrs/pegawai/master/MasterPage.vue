<template>
  <q-page>
    <router-view />
  </q-page>
</template>
<script setup>
import { useMasterCutiPegawaiStore } from 'src/stores/simrs/pegawai/master/cuti/mastercuti'
import { useAbsensiJadwalStore } from 'src/stores/simrs/pegawai/master/jadwal/jadwal'
import { UseProtaAbsensiLiburStore } from 'src/stores/simrs/pegawai/master/prota/prota'

const prota = UseProtaAbsensiLiburStore()
const jadwal = useAbsensiJadwalStore()
const cuti = useMasterCutiPegawaiStore()

prota.getProta()
prota.getTahunProta()

jadwal.getInitialData()
cuti.getJenisPegawai()
cuti.getPegawai()
cuti.getDataTable()
</script>
