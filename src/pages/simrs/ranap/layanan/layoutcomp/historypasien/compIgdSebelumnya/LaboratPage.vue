<template>
  <div class="full-height ">
    <div v-if="!store.pasienIgd?.laboratold?.length" class="column full-height flex-center">
      Tidak Ada Data Pemeriksaan Laborat
    </div>
    <div v-else class="full-height bg-grey-3 scroll">
      <q-markup-table dense square separator="cell" wrap-cells class=" full-width">
        <thead>
          <tr class="bg-primary text-white">
            <th class="text-left">
              Pemeriksaan
            </th>
            <th class="text-left">
              Kelompok Pemeriksaan
            </th>
            <th class="text-left">
              Satuan
            </th>
            <th class="text-right">
              Nilai Normal
            </th>
            <th class="text-right">
              Hasil
            </th>
          </tr>
        </thead>
        <tbody>
          <template v-for="item in store.pasienIgd?.laboratold" :key="item?.id">
            <tr v-if="item?.rs21 !== null && item?.rs21 !== ''">
              <td class="text-left f-12">
                {{ item?.pemeriksaanlab?.rs2 }}
              </td>
              <td class="text-left f-12">
                {{ item?.pemeriksaanlab?.rs21 }}
              </td>
              <td class="text-left f-12">
                {{ item?.pemeriksaanlab?.satuan }}
              </td>
              <td class="text-left f-12">
                {{ item?.pemeriksaanlab?.nilainormal }}
              </td>
              <td class="text-right f-12">
                {{ item?.rs21 }} <span class="text-weight-bold">{{ item?.rs27 }}</span>
              </td>
            </tr>
          </template>
        </tbody>
      </q-markup-table>
    </div>
  </div>
</template>

<script setup>
import { useHistoryPasienRanapStore } from 'src/stores/simrs/ranap/history'

const store = useHistoryPasienRanapStore()
</script>
