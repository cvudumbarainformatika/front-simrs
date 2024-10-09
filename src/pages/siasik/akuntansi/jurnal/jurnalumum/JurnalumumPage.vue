<template>
  <div class="container q-pa-sm">
    <q-card class="items-center q-pa-sm full-width">
      <div class="row">
        <FormCariJurnalUmum />
      </div>
    </q-card>
  </div>
  <div class="container q-px-sm">
    <q-card class="items-center full-width">
      <div class="row">
        <ListPageJurnalUmum />
      </div>
    </q-card>
  </div>
</template>
<script setup>
import ListPageJurnalUmum from './ListPageJurnalUmum.vue'
import FormCariJurnalUmum from './FormCariJurnalUmum.vue'

</script>
