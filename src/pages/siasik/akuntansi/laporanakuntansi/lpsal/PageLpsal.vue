<template>
  <div class="container q-pa-sm">
    <q-card class="items-center q-pa-sm full-width">
      <div class="row">
        <FormLpsal />
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
import FormLpsal from './inpage/FormGetLpsal.vue'
import listData from './inpage/ListLaporanLpsal.vue'

</script>
