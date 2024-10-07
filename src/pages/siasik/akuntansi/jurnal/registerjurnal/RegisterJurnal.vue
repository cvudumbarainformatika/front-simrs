<template>
  <div class="container q-pa-sm">
    <q-card class="items-center q-pa-sm full-width">
      <div class="row">
        <FormParam />
      </div>
    </q-card>
  </div>
  <div class="container q-px-sm">
    <q-card class="items-center full-width">
      <div class="row">
        <listRegjurnal />
      </div>
    </q-card>
  </div>
</template>
<script setup>
import FormParam from './inpage/FormParam.vue'
import listRegjurnal from './inpage/ListRegjurnal.vue'

</script>
