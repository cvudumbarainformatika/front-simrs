<template>
  <div class="full-height ">
    <div v-if="!store.pasienIgd?.tindakan?.length" class="column full-height flex-center">
      Tidak Ada Data Tindakan
    </div>
    <div v-else class="full-height bg-grey-3 q-pa-md scroll">
      <div v-for="item in store.pasienIgd?.tindakan" :key="item?.id" class="bg-white">
        <div class="row items-center justify-between q-pa-sm q-mb-sm">
          <div class="col-auto f-12">
            <span class="text-weight-bold">{{ item?.mastertindakan?.rs2 }} </span> X <i>{{ item?.rs5 }}</i>
          </div>
          <div class="col-auto">
            <i>{{ item?.rs3 }}</i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useHistoryPasienRanapStore } from 'src/stores/simrs/ranap/history'

const store = useHistoryPasienRanapStore()
</script>
