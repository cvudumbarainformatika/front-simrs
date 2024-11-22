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
      <template v-if="store.hasilpendapatan.length > 0 && store.hasilbeban.length > 0">
        <div class="row">
          <listData />
        </div>
      </template>
      <template v-else>
        <div class="row q-pa-md full-width text-subtitle1 flex-center">
          <q-icon class="q-pr-sm" size="sm" name="icon-mat-warning" />
          Silahkan Pilih Parameter Dulu
        </div>
      </template>
    </q-card>
  </div>
</template>
<script setup>
import { useLaporanOperasionalStore } from 'src/stores/siasik/laporan/laporanoperasional/lapoperasional'
import FormLapOperasional from './inpage/FormGetdata.vue'
import listData from './inpage/ListDataLo.vue'

const store = useLaporanOperasionalStore()
</script>
