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
        label="BAST"
      />
      <q-tab
        name="list"
        no-caps
        label="List BAST"
      />
    </q-tabs>
    <q-separator />
    <q-tab-panels
      v-model="tab"
      animated
    >
      <q-tab-panel name="bast">
        <BastPage />
      </q-tab-panel>
      <q-tab-panel name="list">
        <ListBastPage />
      </q-tab-panel>
    </q-tab-panels>
  </q-page>
</template>
<script setup>
import { ref } from 'vue'
import BastPage from './BastPage.vue'
import ListBastPage from './ListBastPage.vue'
const tab = ref('bast')
</script>
