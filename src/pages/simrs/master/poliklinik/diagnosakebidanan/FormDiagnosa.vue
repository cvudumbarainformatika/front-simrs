<template>
  <div class="col-auto bg-primary text-white">
    <div class="q-pa-sm text-weight-bold">
      FORM MASTER DIAGNOSA KEBIDANAN
    </div>
  </div>
  <div class="col full-height scroll">
    <q-form
      ref="formRef"
      class="column q-pa-lg"
      @submit="onSubmit"
    >
      <q-input
        v-model="store.form.kode"
        label="Kode"
        dense
        outlined
        standout="bg-yellow-3"
        style="width:40%"
        class="q-mb-sm"
        :rules="[val => !!val || 'Harus diisi']"
        :error="getErrorField('kode')"
        :error-message="store?.errorsForm?.kode ? store.errorsForm.kode[0] : ''"
        hide-bottom-space
        :disable="store.editedForm"
      />
      <q-input
        v-model="store.form.nama"
        label="Nama Diagnosa"
        dense
        outlined
        standout="bg-yellow-3"
        class="q-mb-xs"
        :rules="[val => !!val || 'Harus diisi']"
        hide-bottom-space
      />

      <q-separator class="q-my-md" />
      <div class="row justify-end">
        <q-btn
          label="Simpan Diagnosa"
          color="primary"
          type="submit"
          :loading="store.loadingsave"
          :disable="store.loadingsave"
        />
      </div>
    </q-form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useMasterDiagnosaKebidanan } from 'src/stores/simrs/master/poliklinik/diagnosakebidanan'

const store = useMasterDiagnosaKebidanan()
const formRef = ref()

function getErrorField(val) {
  if (store.errorsForm !== null) {
    return !!store.errorsForm[val].length
  }
  return false
}

function onSubmit() {
  store.saveDiagnosa().then(() => {
    console.log('fdsf', formRef.value)
    formRef.value.resetValidation()
  })
}
</script>
