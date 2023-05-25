<template>
  <q-page class="q-mb-xl">
    <DataPasien
      ref="refDataPasien"
      bpjs
      :nik="registrasi.form.nik"
      :noka="registrasi.form.noka"
      :tglsep="registrasi.form.tglsep"
      @bisa-simpan="bisaSimpan"
      @surat-kontrol="bisaCekSuratKontrol"
    />
    <FormRegistrasi
      ref="refRegistrasi"
      @bisa-simpan="simpanRegistrasi"
      @get-list-surat-kontrol="getListSuratKontrol"
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
import { useRegistrasiPasienBPJSStore } from 'src/stores/simrs/pendaftaran/form/bpjs/registrasibpjs'

const registrasi = useRegistrasiPasienBPJSStore()
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
// cek surat Kontrol
function getListSuratKontrol() {
  refDataPasien.value.validateNokaAndNorm()
  console.log('cek Surat kontrol', refDataPasien.value)
}
function bisaCekSuratKontrol() {
  console.log('bisa cek Surat kontrol')
}
</script>
