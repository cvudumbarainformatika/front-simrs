<template>
  <div>
    <app-input
      v-model="store.form.nama"
      label="Nama Display"
      outlined
      class="q-my-sm"
    />
    <app-input
      v-model="store.form.keterangan"
      label="Keterangan"
      outlined
      class="q-my-sm"
    />
  </div>
</template>

<script setup>
import { useMasterDisplayFormStore } from 'src/stores/antrian/master/display/form'
// import { onMounted } from 'vue'

const store = useMasterDisplayFormStore()
</script>
