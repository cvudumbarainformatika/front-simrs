<template>
  <q-page class="q-mb-xl">
    <DataPasien
      ref="refDataPasien"
      @bisa-simpan="bisaSimpan"
    />
    <FormRegistrasi
      ref="refRegistrasi"
      @bisa-simpan="simpanRegistrasi"
    />
    <q-card
      class="full-width"
    >
      <q-card-actions align="right">
        <div class="q-mr-xl">
          <app-btn
            label="Simpan Form"
            :loading="loading"
            :disable="loading"
            @click="simpanData"
          />
        </div>
      </q-card-actions>
    </q-card>
  </q-page>
</template>
<script setup>
import DataPasien from 'src/pages/simrs/pendaftaran/form/pasien/DataPasien.vue'
import FormRegistrasi from './FormRegistrasi.vue'
import { ref } from 'vue'

const loading = ref(false)
const refDataPasien = ref(null)
const refRegistrasi = ref(null)
function bisaSimpan(val) {
  console.log('bisa simpan', val)
}
function simpanRegistrasi(val) {
  console.log('simpan regestrasi', val)
}
function simpanData() {
  refDataPasien.value.set()
  refRegistrasi.value.set()
}
</script>
