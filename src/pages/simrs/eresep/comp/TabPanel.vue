<template>
  <div class="bg-white full-height column">
    <q-tabs
      v-model="tab"
      dense
      active-color="yellow"
      indicator-color="yellow"
      align="left"
      inline-label
      class="bg-primary text-white shadow-2 col-auto"
    >
      <q-tab
        name="nonracikan"
        label="Non Racikan"
      />
      <q-tab
        name="racikan"
        label="Racikan"
      />
    </q-tabs>

    <q-tab-panels
      v-model="tab"
      animated
      class="col full-height"
    >
      <q-tab-panel
        name="nonracikan"
        class="full-height"
      >
        <nonracikan-page />
      </q-tab-panel>

      <q-tab-panel name="racikan">
        <div class="text-h6">
          Alarms
        </div>
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
      </q-tab-panel>
    </q-tab-panels>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import NonracikanPage from './NonracikanPage.vue'
const tab = ref('nonracikan')
</script>
