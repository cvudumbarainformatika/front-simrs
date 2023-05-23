<template>
  <div>
    <q-card>
      <q-card-section>
        <div class="f-14 text-weight-bold">
          Registrasi / Kunjungan
        </div>
      </q-card-section>
      <q-separator />
      <q-card-section>
        <div class="row fit q-col-gutter-sm q-mb-md">
          <!-- kiri -->
          <div class="col-6">
            <!-- no Registrasi -->
            <div class="row q-col-gutter-sm items-center q-mb-xs">
              <div class="col-4">
                Nomor Registrasi
              </div>
              <div class="col-8">
                : {{ store.form.noreg }}
              </div>
            </div>
            <!-- asal rujukan -->
            <div class="row q-col-gutter-sm items-center q-mb-xs">
              <div class="col-12">
                <app-autocomplete
                  ref="refAsalRujukan"
                  v-model="store.form.asalrujukan"
                  label="Asal Rujukan"
                  autocomplete="asalrujukan"
                  option-value="asalrujukan"
                  option-label="asalrujukan"
                  :filled="false"
                  :source="store.asalrujukans"
                  :loading="store.loading"

                  :rules="[val => (!!val) || 'Harap diisi',]"
                />
              </div>
            </div>
            <!-- No rujukan -->
            <div class="row q-col-gutter-sm items-center q-mb-xs">
              <div class="col-12">
                <app-input
                  ref="refNoRujukan"
                  v-model="store.form.norujukan"
                  label="nomor Rujukan"
                  :filled="false"
                  :loading="store.loading"
                  :rules="[val => (!!val) || 'Harap diisi',]"
                />
              </div>
            </div>
            <!-- poli tujuan -->
            <div class="row q-col-gutter-md items-center q-mb-xs">
              <div class="col-12">
                <app-autocomplete
                  ref="refPoliTujuan"
                  v-model="store.form.kodepoli"
                  label="Poli Tujuan"
                  autocomplete="polirs"
                  option-value="kodepoli"
                  option-label="polirs"
                  :filled="false"
                  :source="store.polis"
                  :loading="store.loading"

                  :rules="[val => (!!val) || 'Harap diisi',]"
                />
              </div>
            </div>
            <!-- Katarak -->
            <div class="row q-col-gutter-md items-center q-mb-xs">
              <div class="col-12">
                <app-autocomplete
                  ref="refKatarak"
                  v-model="store.form.katarak"
                  label="Katarak"
                  autocomplete="nama"
                  option-value="value"
                  option-label="nama"
                  :filled="false"
                  :source="store.kataraks"
                  :loading="store.loading"

                  :rules="[val => (!!val) || 'Harap diisi',]"
                />
              </div>
            </div>
            <!-- kartu / karcis -->
            <div class="row q-col-gutter-sm items-center q-mb-xs">
              <div class="col-6">
                <app-autocomplete
                  ref="refFlagKartu"
                  v-model="store.form.asalrujukan"
                  label="Flag Kartu"
                  autocomplete="asalrujukan"
                  option-value="asalrujukan"
                  option-label="asalrujukan"
                  :filled="false"
                  :source="store.asalrujukans"
                  :loading="store.loading"

                  :rules="[val => (!!val) || 'Harap diisi',]"
                />
              </div>
              <div class="col-6">
                <app-input
                  v-model="store.form.karcis"
                  label="Karcis"
                  :filled="false"
                />
              </div>
            </div>
            <!-- Diagnosa awal -->
            <div class="row q-col-gutter-sm items-center q-mb-xs">
              <div class="col-4">
                <app-autocomplete-new
                  ref="refKodeDiagnosa"
                  :model="store.display.diagnosa.kode"
                  label="Kode Diagnosa"
                  autocomplete="kode"
                  option-value="kode"
                  option-label="kode"
                  :filled="false"
                  :source="store.diagnosaAwals"
                  :loading="store.loading"
                  :rules="[val => (!!val) || 'Harap diisi',]"
                  @on-select="setKodeDiagnosa"
                  @buang="findKodeDiagnosa"
                />
              </div>
              <div class="col-8">
                <app-autocomplete-new
                  ref="refNamaDiagnosa"
                  :model="store.display.diagnosa.nama"
                  label="Nama Diagnosa"
                  autocomplete="nama"
                  option-value="nama"
                  option-label="nama"
                  :filled="false"
                  :source="store.diagnosaAwals"
                  :loading="store.loading"
                  :rules="[val => (!!val) || 'Harap diisi',]"
                  @on-select="setNamaDiagnosa"
                  @buang="findNamaDiagnosa"
                />
              </div>
            </div>
            <!-- Jenis Kunjungan -->
            <div class="row q-col-gutter-sm items-center q-mb-xs">
              <div class="col-12">
                <app-autocomplete
                  ref="refJenisKunjungan"
                  v-model="store.display.jeniskunjungan"
                  label="Jenis Kunjungan"
                  autocomplete="nilai"
                  option-value="nilai"
                  option-label="nilai"
                  :filled="false"
                  :source="store.jenisKunjungans"
                  :loading="store.loading"
                  :rules="[val => (!!val) || 'Harap diisi',]"
                  @selected="setJenisKunjungan"
                />
              </div>
            </div>
            <!-- No Surat kontrol -->
            <div class="row q-col-gutter-sm items-center q-mb-xs">
              <div class="col-9">
                <app-input
                  ref="refNoSuratKontrol"
                  v-model="store.form.nosuratkontrol"
                  label="nomor Surat Kontrol"
                  :filled="false"
                  :loading="store.loading"
                  :rules="[val => (!!val) || 'Harap diisi',]"
                />
              </div>
              <div class="col-3">
                <app-btn
                  label="List surat kontrol"
                />
              </div>
            </div>
            <!-- Tujuan Kunjungan -->
            <div
              v-if="store.display.jeniskunjungan==='Kontrol'"
              class="row q-col-gutter-sm items-center q-mb-xs"
            >
              <div class="col-12">
                <app-autocomplete
                  ref="refTujuanKunjungan"
                  v-model="store.display.tujuankunjungan"
                  label="Tujuan Kunjungan"
                  autocomplete="nama"
                  option-value="value"
                  option-label="nama"
                  :filled="false"
                  :source="store.tujuanKunjungans"
                  :loading="store.loading"
                  :rules="[val => (!!val) || 'Harap diisi',]"
                  @selected="setTujuanKunjungan"
                />
              </div>
            </div>
            <!-- Tujuan Prosedur -->
            <div
              v-if="store.display.jeniskunjungan==='Kontrol' && store.form.tujuanKunj===1"
              class="row q-col-gutter-sm items-center q-mb-xs"
            >
              <div class="col-12">
                <app-autocomplete
                  ref="refProsedur"
                  v-model="store.display.prosedur.kode"
                  label="Prosedur"
                  autocomplete="procedure"
                  option-value="kode"
                  option-label="procedure"
                  :filled="false"
                  :source="store.prosedurs"
                  :loading="store.loading"
                  :rules="[val => (!!val) || 'Harap diisi',]"
                  @selected="setProsedur"
                />
              </div>
            </div>
            <!-- Assesment pelayanan -->
            <div
              v-if="store.display.jeniskunjungan==='Kontrol' && store.form.tujuanKunj===2"
              class="row q-col-gutter-sm items-center q-mb-xs"
            >
              <div class="col-12">
                <app-autocomplete
                  ref="refAssesmentPel"
                  v-model="store.display.assesment.kode"
                  label="Assesment Pelayanan"
                  autocomplete="assesmentpel"
                  option-value="kode"
                  option-label="assesmentpel"
                  :filled="false"
                  :source="store.assesmens"
                  :loading="store.loading"
                  :rules="[val => (!!val) || 'Harap diisi',]"
                  @selected="setAssesmentPelayanan"
                />
              </div>
            </div>
            <!-- Penunjang -->
            <div
              v-if="store.display.jeniskunjungan==='Kontrol' && store.form.tujuanKunj===1"
              class="row q-col-gutter-sm items-center q-mb-xs"
            >
              <div class="col-12">
                <app-autocomplete
                  ref="refPenunjang"
                  v-model="store.display.penunjang.kode"
                  label="Penunjang"
                  autocomplete="namapenunjang"
                  option-value="kode"
                  option-label="namapenunjang"
                  :filled="false"
                  :source="store.penunjangs"
                  :loading="store.loading"
                  :rules="[val => (!!val) || 'Harap diisi',]"
                  @selected="setPenunjang"
                />
              </div>
            </div>
          </div>
          <!-- kanan -->
          <div class="col-6">
            <!-- sistem bayar -->
            <div class="row q-col-gutter-md items-center q-mb-xs">
              <div class="col-12">
                <app-autocomplete
                  ref="refSistemBayar"
                  v-model="store.display.groupsistembayar"
                  label="Sistem bayar"
                  autocomplete="groupsistembayar"
                  option-value="groupsistembayar"
                  option-label="groupsistembayar"
                  :filled="false"
                  :source="store.sistembayars"
                  :loading="store.loading"

                  :rules="[val => (!!val) || 'Harap diisi',]"
                  @selected="setSistembayar"
                />
              </div>
            </div>
            <!-- DPJP -->
            <div class="row q-col-gutter-sm items-center q-mb-xs">
              <div class="col-12">
                <app-autocomplete
                  ref="refDPJP"
                  v-model="store.form.dpjp"
                  label="DPJP"
                  autocomplete="asalrujukan"
                  option-value="asalrujukan"
                  option-label="asalrujukan"
                  :filled="false"
                  :source="store.dpjps"
                  :loading="store.loading"

                  :rules="[val => (!!val) || 'Harap diisi',]"
                />
              </div>
            </div>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>
<script setup>
import { useRegistrasiPasienBPJSStore } from 'src/stores/simrs/pendaftaran/form/bpjs/registrasibpjs'
// import { usePendaftaranPasienStore } from 'src/stores/simrs/pendaftaran/form/pasien/pasien'
import { ref } from 'vue'
import { notifErrVue } from 'src/modules/utils'

// const pasien = usePendaftaranPasienStore()
const store = useRegistrasiPasienBPJSStore()

store.getInitialData()
function setSistembayar(val) {
  store.setForm('sistembayar', val)
  console.log('form', store.form)
}
// diagnosa
function setKodeDiagnosa(val) {
  store.display.diagnosa.kode = val
  store.setForm('kodediagnosa', val)
}
function setNamaDiagnosa(val) {
  store.display.diagnosa.nama = val
  store.setForm('namadiagnosa', val)
}
function findKodeDiagnosa(val) {
  store.paramDiagnosa.q = val
  store.getDiagnosaAwal()
}
function findNamaDiagnosa(val) {
  store.paramDiagnosa.q = val
  store.getDiagnosaAwal()
}
// jenis kunjungan
function setJenisKunjungan(val) {
  console.log('jenis kunjungan ', val)
  if (val === 'Rujukan FKTP' || val === 'Rujukan Antar RS') {
    store.setForm('tujuanKunj', 0) // Normal
    store.setForm('flagProcedure', '')
    store.setForm('kdPenunjang', '')
  }
  if (val === 'Rujukan Internal') {
    store.setForm('tujuanKunj', 0) // Normal
    store.setForm('flagProcedure', '')
    store.setForm('kdPenunjang', '')
  }
  if (val === 'Kontrol') {
    if (store.form.tujuanKunj) { delete store.form.tujuanKunj }
  }
}
// tujuan kunjungan
function setTujuanKunjungan(val) {
  console.log('tujuan kunjungan', val)
  store.setForm('tujuanKunj', val)
}
// prosedur
function setProsedur(val) {
  store.setForm('flagProcedure', val)
}
// assesment
function setAssesmentPelayanan(val) {
  store.setForm('assesmentPel', val)
}
// penunjang
function setPenunjang(val) {
  store.setForm('kdPenunjang', val)
}
// emits
const emits = defineEmits(['bisaSimpan'])
// refs
const refAsalRujukan = ref(null)
const refFlagKartu = ref(null)
const refDPJP = ref(null)
const refPoliTujuan = ref(null)
const refSistemBayar = ref(null)
const refNoRujukan = ref(null)
const refNamaDiagnosa = ref(null)
const refKodeDiagnosa = ref(null)
const refJenisKunjungan = ref(null)
const refNoSuratKontrol = ref(null)
const refTujuanKunjungan = ref(null)
// reset validasi
function resetValidation() {
  // autocomplete
  refAsalRujukan.value.$refs.refAuto.resetValidation()
  refFlagKartu.value.$refs.refAuto.resetValidation()
  refDPJP.value.$refs.refAuto.resetValidation()
  refPoliTujuan.value.$refs.refAuto.resetValidation()
  refSistemBayar.value.$refs.refAuto.resetValidation()
  refKodeDiagnosa.value.$refs.refAuto.resetValidation()
  refNamaDiagnosa.value.$refs.refAuto.resetValidation()
  refJenisKunjungan.value.$refs.refAuto.resetValidation()
  if (refTujuanKunjungan.value !== null) { refTujuanKunjungan.value.$refs.refAuto.resetValidation() }
  // input
  refNoRujukan.value.$refs.refInput.resetValidation()
  refNoSuratKontrol.value.$refs.refInput.resetValidation()
}
// validasi
let valid = false
function validasi() {
  // ref auto complete
  const asalRujukan = refAsalRujukan.value.$refs.refAuto.validate()
  const flagKartu = refFlagKartu.value.$refs.refAuto.validate()
  const dpjp = refDPJP.value.$refs.refAuto.validate()
  // const dpjp = true
  const poliTujuan = refPoliTujuan.value.$refs.refAuto.validate()
  const sistemBayar = refSistemBayar.value.$refs.refAuto.validate()
  const KodeDiagnosa = refKodeDiagnosa.value.$refs.refAuto.validate()
  const NamaDiagnosa = refNamaDiagnosa.value.$refs.refAuto.validate()
  const JenisKunjungan = refJenisKunjungan.value.$refs.refAuto.validate()
  const NoSuratKontrol = refNoSuratKontrol.value.$refs.refAuto.validate()
  const TujuanKunjungan = refTujuanKunjungan.value === null ? true : refTujuanKunjungan.value.$refs.refAuto.validate()
  // ref input
  const noRujukan = refNoRujukan.value.$refs.refInput.validate()
  if (asalRujukan && flagKartu && dpjp && poliTujuan && sistemBayar &&
  noRujukan && NamaDiagnosa && KodeDiagnosa && JenisKunjungan &&
  NoSuratKontrol && TujuanKunjungan) { valid = true } else { valid = false }
}
// set
function set() {
  validasi()
  if (valid) {
    emits('bisaSimpan', store.form)
  } else {
    notifErrVue('periksa kembali input registrasi anda')
  }
}

// expose function
defineExpose({ resetValidation, set })
</script>
