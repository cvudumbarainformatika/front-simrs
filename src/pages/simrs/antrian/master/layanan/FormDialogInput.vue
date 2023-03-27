<template>
  <div>
    <app-input
      v-model="store.form.id_layanan"
      label="Id Layanan"
      outlined
      class="q-my-sm"
      style="width:50%"
    />
    <app-input
      v-model="store.form.nama"
      label="Nama Layanan"
      outlined
      class="q-my-sm"
    />
    <app-input
      v-model="store.form.kode"
      label="Kode Layanan"
      outlined
      class="q-my-sm"
      style="width:50%"
    />
  </div>
</template>

<script setup>
import { useMasterLayananFormStore } from 'src/stores/antrian/master/layanan/form'
// import { onMounted } from 'vue'

const store = useMasterLayananFormStore()
</script>
