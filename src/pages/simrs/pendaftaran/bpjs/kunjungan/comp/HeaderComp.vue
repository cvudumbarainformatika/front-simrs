<template>
  <div class="row items-center justify-between bg-primary text-white q-pa-sm">
    <div>
      <q-input
        v-model="text"
        outlined
        dark
        color="white"
        dense
        placeholder="Cari Kunjungan ..."
      />
    </div>
    <div>sad</div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const text = ref(null)
</script>
