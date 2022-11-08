<template>
  <q-page>
    <router-view />
  </q-page>
</template>
<script setup>
import { useMasterCutiPegawaiStore } from 'src/stores/simrs/pegawai/master/cuti/mastercuti'

const cuti = useMasterCutiPegawaiStore()
cuti.getJenisPegawai()
cuti.getPegawai()
cuti.getDataTable()
</script>
