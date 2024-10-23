<template>
  <div class="container q-pa-sm">
    <q-card class="items-center q-pa-sm full-width">
      <div class="row">
        <FormPosting />
      </div>
    </q-card>
  </div>
  <div class="container q-px-sm">
    <q-card class="items-center full-width">
      <div class="row">
        <listPostingjurnal />
      </div>
    </q-card>
  </div>
</template>
<script setup>
import FormPosting from './inpage/FormPosting.vue'
import listPostingjurnal from './inpage/ListPostingjurnal.vue'

</script>
