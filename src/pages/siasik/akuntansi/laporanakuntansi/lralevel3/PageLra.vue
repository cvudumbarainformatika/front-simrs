<template>
  <div class="container q-pa-sm">
    <q-card class="items-center q-pa-sm full-width">
      <div class="row">
        <FormLapOperasional />
      </div>
    </q-card>
  </div>
  <div class="container q-px-sm">
    <q-card class="items-center full-width">
      <div class="row">
        <template v-if="store.reqs.jenislra === 1 && (store.hasilpendapatan.length > 0 && store.hasilbelanja.length > 0 && store.hasilsilpa.length > 0)">
          <listData />
        </template>
        <template v-else>
          <listDataPsap />
        </template>
      </div>
    </q-card>
  </div>
</template>
<script setup>
import { useLRAjurnalStore } from 'src/stores/siasik/laporan/lra/lrajurnal.'
import FormLapOperasional from './inpage/FormGetdata.vue'
import listData from './inpage/ListdataLrajurnal.vue'
import listDataPsap from './inpage/ListdataLraPsap.vue'

const store = useLRAjurnalStore()
</script>
