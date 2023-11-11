<template>
  <div class="full-height bg-white">
    <q-tabs
      v-model="tab"
      vertical
      dense
      class="text-grey"
      active-color="primary"
      indicator-color="primary"
      align="justify"
    >
      <q-tab
        name="template"
        icon="icon-mat-person_2"
      >
        <q-tooltip
          anchor="center right"
          self="center start"
        >
          Template Gambar
        </q-tooltip>
      </q-tab>
      <q-tab
        name="alarms"
        icon="icon-mat-person"
      >
        <q-tooltip
          anchor="center right"
          self="center start"
        >
          Penandaan Tersimpan
        </q-tooltip>
      </q-tab>
      <q-tab
        name="movies"
        icon="icon-mat-home"
      />
    </q-tabs>
  </div>
</template>
<script setup>
import { ref } from 'vue'

const tab = ref('template')
</script>
