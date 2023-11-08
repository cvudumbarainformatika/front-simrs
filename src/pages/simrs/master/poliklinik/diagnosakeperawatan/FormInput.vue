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
      :error="getErrorField('kode')"
      :error-message="store?.errorsForm?.kode ? store.errorsForm.kode[0] : ''"
      hide-bottom-space
      :disable="store.editedForm"
      @update:model-value="store.errorsForm=null"
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
        :disable="store.loadingsave"
        :loading="store.loadingsave"
      />
    </div>

    <!-- {{ store.errorsForm }} -->
  </q-form>
</template>

<script setup>

import { useMasterDiagnosaKeperawatan } from 'src/stores/simrs/master/poliklinik/diagnosakeperawatan.js'
import { ref } from 'vue'

const store = useMasterDiagnosaKeperawatan()
const formRef = ref()
function getErrorField(val) {
  if (store.errorsForm !== null) {
    return !!store.errorsForm[val].length
  }
  return false
}

function simpan() {
  store.saveData().then(() => {
    formRef.value.resetValidation()
  })
}
</script>
