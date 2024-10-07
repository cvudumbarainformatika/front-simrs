<template>
  <div class="container q-pa-sm">
    <q-card class="items-center full-width">
      <div class="row">
        <FormSaldoawal />
      </div>
    </q-card>
  </div>
  <div class="container q-px-sm q-pb-sm">
    <q-card class="items-center full-width">
      <div class="row">
        <ListSaldoawal />
      </div>
    </q-card>
  </div>
</template>
<script setup>
import FormSaldoawal from './inpage/FormSaldoawal.vue'
import ListSaldoawal from './inpage/ListSaldoawal.vue'
// import { saldoawalJurnal } from 'src/stores/siasik/akuntansi/jurnal/saldoawal'
// import { onMounted } from 'vue'
// eslint-disable-next-line no-unused-vars

// const store = saldoawalJurnal()

// onMounted(() => {
// store.getRekening()
// store.getDataTable()
// })
</script>
