<template>
  <div class="container q-pa-sm">
    <q-card class="items-center q-pa-sm full-width">
      <div class="row">
        <FormNeraca />
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
import FormNeraca from './inpage/FormGetNeraca.vue'
import listData from './inpage/ListDataNeraca.vue'
</script>
