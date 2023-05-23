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
import FormRegistrasi from './FormRegistrasi.vue'
import { ref } from 'vue'
import { usePendaftaranPasienStore } from 'src/stores/simrs/pendaftaran/form/pasien/pasien'
// import { useRegistrasiPasienUmumStore } from 'src/stores/simrs/pendaftaran/form/umum/registrasi'
const pasien = usePendaftaranPasienStore()
// const register = useRegistrasiPasienUmumStore()

const refDataPasien = ref(null)
const refRegistrasi = ref(null)
function bisaSimpan(val) {
  console.log('pasien simpan', val)
  const key = Object.keys(val)
  console.log('simpan pasien key', key)
}
function simpanRegistrasi(val) {
  console.log('simpan regestrasi', val)
  const key = Object.keys(val)
  console.log('simpan regis key', key)
}
function simpanData(val) {
  refDataPasien.value.set()
  refRegistrasi.value.set()
  console.log('simpan value', refDataPasien.value)
  // console.log('form pasien ', pasien.form)
  // console.log('form registrasi ', register.form)
}
</script>
