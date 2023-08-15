<template>
  <div>
    <app-input
      v-model="store.form.loket"
      label="Nama Unit Loket"
      outlined
      class="q-my-sm"
    />
    <app-autocomplete-new
      v-model="store.form.layanan_id"
      label="Layanan"
      outlined
      class="q-mb-sm"
      valid
      autocomplete="nama"
      option-value="id_layanan"
      option-label="nama"
      :source="store.layanans"
    />
    <app-input
      v-model="store.form.kuotajkn"
      label="Kuota JKN Mobile"
      type="number"
      outlined
      valid
      class="q-my-sm"
      style="width:100px"
    />
    <app-input
      v-model="store.form.kuotanonjkn"
      label="Kuota Non JKN"
      type="number"
      valid
      outlined
      class="q-my-sm"
      style="width:100px"
    />
    <app-input
      v-model="store.form.loket_no"
      label="Nomor Loket"
      type="number"
      outlined
      class="q-my-sm"
      style="width:100px"
    />
  </div>
  <app-autocomplete-new
    v-model="store.form.display_id"
    label="Pilih Display"
    outlined
    class="q-mb-sm"
    valid
    autocomplete="nama"
    option-value="kode"
    :option-label="['kode','nama']"
    :source="store.displays"
  />
</template>

<script setup>
import { useMasterUnitFormStore } from 'src/stores/antrian/master/masterunit/form'
// import { onMounted } from 'vue'

const store = useMasterUnitFormStore()
</script>
