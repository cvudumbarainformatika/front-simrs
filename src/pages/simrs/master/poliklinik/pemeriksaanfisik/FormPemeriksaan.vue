<template>
  <q-form
    ref="formRef"
    class="q-gutter-sm q-pa-sm"
    @submit="simpan"
  >
    <q-input
      v-model="store.form.nama"
      dense
      outlined
      standout="bg-yellow-3"
      label="Nama master Pemeriksaan"
      :rules="[val => !!val || 'Harap diisi']"
      hide-bottom-space
    />
    <q-input
      v-model="store.form.icon"
      dense
      outlined
      standout="bg-yellow-3"
      label="icon"
    />
    <q-input
      v-model="store.form.lokalis"
      dense
      outlined
      standout="bg-yellow-3"
      label="Lokalis poli"
      class="hidden"
    />
    <q-select
      v-model="store.multiLokalis"
      multiple
      :options="store.masterpoli"
      use-chips
      stack-label
      option-label="polirs"
      option-value="kodepoli"
      label="Lokalis Poli"
      use-input
      outlined
      standout="bg-yellow-3"
      @update:model-value="(val)=> settingLokalis(val)"
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

import { useMasterPemeriksaanFisik } from 'src/stores/simrs/master/poliklinik/pemeriksaanfisik'
import { ref } from 'vue'

const store = useMasterPemeriksaanFisik()
const formRef = ref()
function simpan() {
  store.simpanMaster().then(() => {
    formRef.value.resetValidation()
  })
}

function settingLokalis(val) {
  store.setForm('lokalis', val?.map(x => x.kodepoli)?.join('||'))
}
</script>
