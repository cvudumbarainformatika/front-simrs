<template>
  <div class="container q-pa-sm">
    <q-card class="items-center q-pa-sm full-width">
      <div class="row">
        <FormBukubesar />
      </div>
    </q-card>
  </div>
  <div class="container q-px-sm">
    <q-card class="items-center full-width">
      <div class="row">
        <template v-if="store.reqs.jenisbukubesar === 1 && (store.hasilmapsLevel6.length || store.hasilmapsLevel5.length || store.hasilmapsLevel1.length)">
          <listDataRekap />
        </template>
        <template
          v-else-if="store.reqs.jenisbukubesar === 2 && (
            store.hasilRinci1.length > 1 || store.hasilRinci2.length > 1
            || store.hasilRinci3.length > 1 || store.hasilRinci4.length > 1
            || store.hasilRinci5.length > 1 || store.hasilRinci6.length > 1
          )"
        >
          <listDataRinci />
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
import { useBukubesarStore } from 'src/stores/siasik/akuntansi/bukubesar/bukubesar'
import FormBukubesar from './inpage/FormBukubesar.vue'
import listDataRekap from './inpage/ListDataRekapBukubesar.vue'
import listDataRinci from './inpage/ListDataRinciBukubesar.vue'

const store = useBukubesarStore()
</script>
