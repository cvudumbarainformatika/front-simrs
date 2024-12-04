<template>
  <div class="full-height ">
    <div v-if="!store.pasienIgd?.radiologi?.length" class="column full-height flex-center">
      Tidak Ada Data Pemeriksaan
    </div>
    <div v-else class="full-height bg-grey-3 scroll">
      <q-card-section
        class="q-pa-none"
        flat
        bordered
        square
      >
        <q-bar class="bg-grey-9 text-white">
          <div>RADIOLOGI</div>
        </q-bar>
        <q-list
          separator
        >
          <q-item
            v-for="(radiologi, r) in store.pasienIgd?.radiologi"
            :key="r"
          >
            <q-item-section>
              <q-item-label>Pemeriksaan : {{ radiologi?.rs4 }}</q-item-label>
              <q-item-label>Keterangan : {{ radiologi?.rs7 }}</q-item-label>
              <!-- <q-item-label>Hasil Pemeriksaan Radiologi = {{ item?.hasilradiologi[r]?.rs3 }}</q-item-label> -->
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>
    </div>
  </div>
</template>

<script setup>
import { useHistoryPasienRanapStore } from 'src/stores/simrs/ranap/history'

const store = useHistoryPasienRanapStore()
</script>
