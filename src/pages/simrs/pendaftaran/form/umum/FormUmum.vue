<template>
  <q-page class="q-mb-xl">
    <DataPasien
      ref="refDataPasien"
    />
    <!-- @bisa-simpan="bisaSimpan" -->
    <FormRegistrasi
      ref="refRegistrasi"
    />
    <!-- @bisa-simpan="simpanRegistrasi" -->
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
import { useRegistrasiPasienUmumStore } from 'src/stores/simrs/pendaftaran/form/umum/registrasi'
const pasien = usePendaftaranPasienStore()
const register = useRegistrasiPasienUmumStore()

const refDataPasien = ref(null)
const refRegistrasi = ref(null)
// let canSavePasien = false
// let canSaveRegis = false
// function bisaSimpan(val) {
//   // console.log('pasien simpan', val)
//   canSavePasien = val.save
//   if (val.save) {
//     const keys = Object.keys(val.form)
//     if (keys.length) {
//       keys.forEach(key => {
//         register.setForm(key, val.form[key])
//       })
//     }
//   }
//   // console.log('simpan pasien key', key)
//   // register.form.concat(val)
// }
// function simpanRegistrasi(val) {
//   // console.log('simpan regestrasi', val)
//   canSaveRegis = val.save
//   // const key = Object.keys(val)
//   // console.log('simpan regis key', key)
//   // console.log('form registrasi dua', register.form)
// }
function simpanData(val) {
  const dataPasien = refDataPasien.value.set()
  const dataRegis = refRegistrasi.value.set()
  console.log('pasien', dataPasien,
    'regis', dataRegis
  )
  if (dataPasien.save && dataRegis.save) {
    const keys = Object.keys(dataPasien.form)
    if (keys.length) {
      keys.forEach(key => {
        register.setForm(key, dataPasien.form[key])
      })
    }
    console.log('form registrasi ', register.form)
    register.simpanRegistrasi()
  }
  // console.log('simpan value', refDataPasien.value)
  // console.log('form pasien ', pasien.form)
}
</script>
