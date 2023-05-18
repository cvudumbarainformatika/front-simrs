<template>
  <q-page class="q-mb-xl">
    <DataPasien
      ref="refDataPasien"
      :simpan="simpan"
      @bisa-simpan="bisaSimpan"
      @tidak-simpan="tidakSimpan"
    />
    <q-card
      class="full-width"
    >
      <q-card-actions align="right">
        <div class="q-mr-xl">
          <app-btn
            label="Simpan Form"
            :loading="pasien.loading"
            :disable="pasien.loading"
            @click="simpanData"
          />
        </div>
      </q-card-actions>
    </q-card>
  </q-page>
</template>
<script setup>
import DataPasien from 'src/pages/simrs/pendaftaran/form/pasien/DataPasien.vue'
import { ref } from 'vue'
import { usePendaftaranPasienStore } from 'src/stores/simrs/pendaftaran/form/pasien/pasien'
const pasien = usePendaftaranPasienStore()
const simpan = ref(false)
const refDataPasien = ref(null)
function bisaSimpan(val) {
  console.log('bisa simpan data', val, pasien.form)
  simpan.value = false
}
function tidakSimpan(val) {
  console.log('tidak bisa simpan data', val)
  simpan.value = false
}
function simpanData(val) {
  simpan.value = true
  console.log('simpan value', simpan.value)
  // console.log('simpan ref', refDataPasien.value.$refs)
}
</script>
