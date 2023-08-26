<template>
  <div class="q-pa-md text-weight-bold">
    FORM DIAGNOSA
    <div class="f-10 text-weight-light">
      <em>form Diagnosa sekaligus pensimulasian INACBG </em>
    </div>
  </div>
  <q-separator />
  <q-form
    class="row q-pa-md q-col-gutter-xs"
    @submit="onSubmit"
    @reset="onReset"
  >
    <div class="col-3">
      <div>Diagnosa (ICD)</div>
    </div>
    <div class="col-9">
      <q-input
        v-model="store.formdiagnosa.code"
        label="Cari ICD"
        dense
        outlined
        standout="bg-yellow-3"
        :rules="[val => !!val || 'Harus diisi']"
        hide-bottom-space
      />
    </div>
    <div class="col-3">
      <div>Keterangan</div>
    </div>
    <div class="col-9">
      <q-input
        v-model="store.formdiagnosa.keterangan"
        label="Keterangan"
        autogrow
        outlined
        standout="bg-yellow-3"
        :rules="[val => !!val || 'Harus diisi']"
        hide-bottom-space
      />
    </div>
    <div class="col-12">
      <q-separator class="q-my-sm" />
    </div>
    <div class="col-3">
      <div>Kasus Baru?</div>
    </div>
    <div class="col-9 q-gutter-sm">
      <q-radio
        v-model="store.formdiagnosa.kasus"
        dense
        val="Baru"
        label="Iya"
      />
      <q-radio
        v-model="store.formdiagnosa.kasus"
        dense
        val="Lama"
        label="Tidak"
      />
    </div>
    <div class="col-12">
      <q-separator class="q-my-sm" />
    </div>
    <div class="col-3">
      <div>Diagnosis Utama?</div>
    </div>
    <div class="col-9 q-gutter-sm">
      <q-radio
        v-model="store.formdiagnosa.tipe"
        dense
        val="Primer"
        label="Iya"
      />
      <q-radio
        v-model="store.formdiagnosa.tipe"
        dense
        val="Sekunder"
        label="Tidak"
      />
    </div>
    <div class="col-12">
      <q-separator class="q-my-lg" />
    </div>
    <div class="col-12">
      <q-btn
        label="Simpan Diagnosa"
        color="primary"
        type="submit"
      />
    </div>
  </q-form>
</template>

<script setup>
import { useLayananPoli } from 'src/stores/simrs/pelayanan/poli/layanan'

const store = useLayananPoli()

function onSubmit() {
  console.log('ok')
}
</script>
