<template>
  <div
    class="column full-height q-ma-sm"
    style="overflow: hidden;"
  >
    <div class="column full-height">
      <div class="col-auto bg-red">
        <q-tabs
          v-model="store.tab"
          no-caps
          inline-label
          class="bg-primary text-white shadow-2"
          align="left"
          dense
          active-color="yellow"
          active-bg-color="dark"
        >
          <q-tab
            v-for="(item, i) in store.tabs"
            :key="i"
            :name="item"
            :label="item"
          />
        </q-tabs>
      </div>
      <div class="col-grow bg-yellow">
        <q-tab-panels
          v-model="store.tab"
          animated
          class="full-height"
        >
          <q-tab-panel
            v-for="(panel, n) in store.tabs"
            :key="n"
            :name="panel"
            class="full-height q-pa-none"
          >
            <PageLaborat v-if="panel==='Laborat'" />
            <div
              v-else
              class="full-height bg-yellow"
            >
              Belum Dikrjakan
            </div>
          </q-tab-panel>
        </q-tab-panels>
      </div>
    </div>
  </div>
</template>

<script setup>
import { usePenunjangPoli } from 'src/stores/simrs/pelayanan/poli/penunjang'
import PageLaborat from './comppenunjang/PageLaborat.vue'

const store = usePenunjangPoli()
</script>
