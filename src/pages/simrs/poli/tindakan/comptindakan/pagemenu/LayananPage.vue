<template>
  <div
    class="full-height q-ma-sm bg-yellow"
    style="overflow: hidden;"
  >
    <q-tabs
      v-model="store.tab"
      inline-label
      class="bg-primary text-white shadow-2"
      align="left"
      dense
    >
      <q-tab
        v-for="(item, i) in store.tabs"
        :key="i"
        :name="item"
        :label="item"
      />
    </q-tabs>
    <q-card
      flat
      bordered
      class="full-height"
    >
      asd lorem
    </q-card>
  </div>
</template>

<script setup>
import { useLayananPoli } from 'src/stores/simrs/pelayanan/poli/layanan'

const store = useLayananPoli()
</script>
