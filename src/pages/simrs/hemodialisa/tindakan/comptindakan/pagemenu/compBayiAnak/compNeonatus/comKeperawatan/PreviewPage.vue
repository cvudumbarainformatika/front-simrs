<template>
  <q-card
    style="width:100%"
  >
    <q-card-section>
      <div class="row justify-between items-center">
        <div class="f-14">
          <b>Data Neonatus Keperawatan</b>
        </div>
        <q-btn
          flat
          icon="icon-mat-close"
          round
          @click="tutupPage"
        />
      </div>
    </q-card-section>
    <q-separator />
    <q-card-section>
      <FormComp />
      <q-card-section>
        <div class="row justify-end">
          <q-btn
            class="bg-dark text-white"
            label="Tutup"
            @click="tutupPage"
          />
        </div>
      </q-card-section>
      <div style="margin-bottom:50px" />
    </q-card-section>
  </q-card>
</template>

<script setup>

import FormComp from './FormComp.vue'
import { useNeonatusKeperawatanStore } from 'src/stores/simrs/pelayanan/poli/neonatuskeperawatan'

const store = useNeonatusKeperawatanStore()

function tutupPage() {
  store.initForm()
  store.preview = false
}
</script>

<style lang="scss" scoped>
table {
  border-collapse: collapse;
  width: 100%;
}
table, th, td {
  border: 1px solid $grey;
  padding: 2px 5px;
}
</style>
