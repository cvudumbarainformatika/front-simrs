<template>
  <div class="column full-height">
    <q-bar class="col-auto bg-dark text-white">
      <div class="q-py-sm f-14 ">
        Daftar Pemeriksaan Radiologi
      </div>
    </q-bar>
    <div class="col-grow">
      <div class="q-pa-md">
        <q-input
          v-model="store.caripemeriksaanradiologi"
          label="Cari Pemeriksaan Radiologi"
          dense
          outlined
          standout="bg-yellow-3"
          hide-bottom-space
        >
          <template #append>
            <q-icon name="icon-mat-search" />
          </template>
        </q-input>
      </div>
      <q-separator />
      <q-scroll-area
        style="height: calc(100% - 68px);"
        class="bg-grey"
      >
        <q-list
          bordered
          dense
          separator
          class="bg-white"
        >
          <q-item class="q-my-xs">
            <q-item-section>
              <q-item-label>Nama Item</q-item-label>
              <q-item-label
                caption
                lines="1"
              >
                <span class="text-weight-bold">NON PAKET</span>
              </q-item-label>
            </q-item-section>
            <q-item-section
              side
              top
            >
              <q-item-label class="text-negative">
                Rp. 100.000
              </q-item-label>
            </q-item-section>
          </q-item>
          <q-item class="q-my-xs">
            <q-item-section>
              <q-item-label>Nama Item</q-item-label>
              <q-item-label
                lines="1"
              >
                <span class="text-weight-bold">PAKET</span>
              </q-item-label>
            </q-item-section>
            <q-item-section
              side
              top
            >
              <q-item-label class="text-negative">
                Rp. 100.000
              </q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
    </div>
  </div>
</template>
<script setup>
import { usePenunjangPoli } from 'src/stores/simrs/pelayanan/poli/penunjang'

const store = usePenunjangPoli()
</script>
