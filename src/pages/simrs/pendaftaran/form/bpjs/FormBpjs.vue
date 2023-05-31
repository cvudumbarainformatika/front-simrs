<template>
  <q-page class="q-mb-xl">
    <DataPasien
      ref="refDataPasien"
      bpjs
      :nik="registrasi.form.nik"
      :noka="registrasi.form.noka"
      :tglsep="registrasi.form.tglsep"
      @bisa-simpan="bisaSimpan"
    />
    <!-- @surat="bisaCekSurat" -->
    <FormRegistrasi
      ref="refRegistrasi"
      @bisa-simpan="simpanRegistrasi"
      @get-list-surat-kontrol="getListSuratKontrol"
      @get-list-rujukan="getListRujukan"
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
    <DialogListRujukan v-model="registrasi.tampilRujukan" />
  </q-page>
</template>
<script setup>
import DialogListRujukan from './DialogListRujukan.vue'
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
  const keys = Object.keys(val)
  if (keys.length) {
    keys.forEach(key => {
      registrasi.setForm(key, val[key])
    })
  }
}
function simpanRegistrasi(val) {
  console.log('simpan regestrasi', val)
}
function simpanData() {
  refDataPasien.value.set()
  refRegistrasi.value.set()
}
// data nik, norm, noka pasien
// let dataPasien = null
// function bisaCekSurat(val) {
//   dataPasien = val
//   // console.log('bisa cek Surat kontrol', val)
// }

// cek surat Kontrol
function getListSuratKontrol() {
  const data = refDataPasien.value.validateNokaAndNorm()
  if (data) {
    console.log('cek Surat kontrol', data)
    registrasi.getListSuratKontrol(data)
  }
}
// cek list rujukan
function getListRujukan() {
  console.log('validasi ', refDataPasien.value.validateNokaAndNorm())
  const data = refDataPasien.value.validateNokaAndNorm()

  registrasi.listRujukanPcare = []
  registrasi.listRujukanRs = []
  registrasi.listRujukanSepMrs = []

  if (data) {
    if (Object.keys(data).length) {
      console.log('cek list rujukan', data)
      registrasi.getListRujukanPCare(data)
      registrasi.getListRujukanRs(data)
      registrasi.getListSepMrs(data)
      registrasi.tampilRujukan = true
    }
  }
}
</script>
