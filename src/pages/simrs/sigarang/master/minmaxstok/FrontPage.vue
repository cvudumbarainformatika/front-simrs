<template>
  <q-card>
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
        name="depo"
        label="Depo"
        no-caps
      />
      <q-tab
        name="pengguna"
        label="Pengguna"
        no-caps
      />
    </q-tabs>

    <q-separator />

    <q-tab-panels
      v-model="tab"
      animated
    >
      <q-tab-panel name="depo">
        <div class="text-h6">
          Depo
        </div>
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
      </q-tab-panel>

      <q-tab-panel name="pengguna">
        <div class="text-h6">
          Pengguna
        </div>
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
      </q-tab-panel>
    </q-tab-panels>
  </q-card>
</template>
<script setup>
import { ref } from 'vue'

const tab = ref('depo')
</script>
