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
        <template v-else-if="store.reqs.jenislra === 2 && (store.psappendapatan.length > 0 && store.psapbarjas.length > 0 && store.psapmodal.length > 0 && store.psapsilpa.length > 0)">
          <listDataPsap />
        </template>
        <template v-else>
          <div class="row q-pa-md full-width text-subtitle1 flex-center">
            <q-icon class="q-pr-sm" size="sm" name="icon-mat-warning" />
            Silahkan Pilih Parameter Dulu
          </div>
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
