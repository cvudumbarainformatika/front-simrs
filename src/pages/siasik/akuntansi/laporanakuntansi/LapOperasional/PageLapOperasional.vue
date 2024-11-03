<template>
  <div class="container q-pa-sm">
    <q-card class="items-center q-pa-sm full-width">
      <div class="row">
        <FormLapOperasional />
      </div>
    </q-card>
  </div>
  <div class="container q-px-sm">
    <q-card class="items-center full-width">
      <div class="row">
        <listData />
      </div>
    </q-card>
  </div>
</template>
<script setup>
import FormLapOperasional from './inpage/FormGetdata.vue'
import listData from './inpage/ListDataLo.vue'

</script>
