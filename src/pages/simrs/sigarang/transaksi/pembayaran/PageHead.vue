<template>
  <q-page>
    <q-tabs
      v-model="tab"
      dense
      class="text-grey"
      active-color="primary"
      indicator-color="primary"
      align="justify"
      narrow-indicator
    >
      <q-tab
        name="bast"
        no-caps
        label="Pembayaran"
      />
      <q-tab
        name="list"
        no-caps
        label="List Pembayaran"
      />
    </q-tabs>
    <q-separator />
    <q-tab-panels
      v-model="tab"
      animated
    >
      <q-tab-panel name="bast">
        <PembayaranPage />
      </q-tab-panel>
      <q-tab-panel name="list">
        <ListPembayaranPage />
      </q-tab-panel>
    </q-tab-panels>
  </q-page>
</template>
<script setup>
import { ref } from 'vue'
import PembayaranPage from './PembayaranPage.vue'
import ListPembayaranPage from './ListPembayaranPage.vue'
const tab = ref('bast')
</script>
