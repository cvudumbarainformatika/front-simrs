<template>
  <q-form
    ref="formRef"
    class="q-gutter-sm q-pa-sm"
    @submit="simpan"
  >
    <q-input
      v-model="store.form.kode"
      dense
      outlined
      standout="bg-yellow-3"
      label="Kode Diagnosa"
      :rules="[val => !!val || 'Harap diisi']"
      hide-bottom-space
    />
    <q-input
      v-model="store.form.nama"
      dense
      outlined
      standout="bg-yellow-3"
      label="Nama Diagnosa Keperawatan"
      :rules="[val => !!val || 'Harap diisi']"
    />
    <q-separator class="q-my-lg" />
    <div class="text-right">
      <q-btn
        label="Simpan"
        type="submit"
        color="primary"
        :disable="store.loadingSave"
        :loading="store.loadingSave"
      />
    </div>
  </q-form>
</template>

<script setup>

import { useMasterDiagnosaKeperawatan } from 'src/stores/simrs/master/poliklinik/diagnosakeperawatan.js'

const store = useMasterDiagnosaKeperawatan()

function simpan() {
  store.saveData()
}
</script>
