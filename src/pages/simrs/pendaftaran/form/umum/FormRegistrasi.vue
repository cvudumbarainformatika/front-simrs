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
                  @selected="setPoliTujuan"
                />
              </div>
            </div>
            <!-- kartu / karcis -->
            <div class="row q-col-gutter-sm items-center q-mb-xs">
              <div class="col-6">
                <app-autocomplete
                  ref="refFlagKartu"
                  v-model="store.form.jeniskarcis"
                  label="Flag Kartu"
                  autocomplete="jeniskarcis"
                  option-value="jeniskarcis"
                  option-label="jeniskarcis"
                  :filled="false"
                  :disable="!store.paramKarcis.kd_poli"
                  :source="store.jenisKarcises"
                  :loading="store.loading"
                  :rules="[val => (!!val) || 'Harap diisi',]"
                  @selected="setFlagKarcis"
                />
              </div>
              <div class="col-6">
                <app-input
                  v-model="store.display.hargakarcis"
                  label="Karcis"
                  :filled="false"
                  disable
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
            <!-- sistem bayar 2-->
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
                  autocomplete="nama"
                  option-value="dpjp"
                  option-label="nama"
                  :disable="!store.dpjps.length"
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
import { useRegistrasiPasienUmumStore } from 'src/stores/simrs/pendaftaran/form/umum/registrasi'
// import { usePendaftaranPasienStore } from 'src/stores/simrs/pendaftaran/form/pasien/pasien'
import { ref } from 'vue'
import { findWithAttr, notifErrVue } from 'src/modules/utils'
// const pasien = usePendaftaranPasienStore()
const store = useRegistrasiPasienUmumStore()
store.getInitialData()
function setSistembayar(val) {
  store.setForm('sistembayar', val)
  console.log('form', store.form)
}
// emits
const emits = defineEmits(['bisaSimpan'])
// refs
const refAsalRujukan = ref(null)
const refFlagKartu = ref(null)
const refDPJP = ref(null)
const refPoliTujuan = ref(null)
const refSistemBayar = ref(null)
// reset validasi
function resetValidation() {
  refAsalRujukan.value.$refs.refAuto.resetValidation()
  refFlagKartu.value.$refs.refAuto.resetValidation()
  refDPJP.value.$refs.refAuto.resetValidation()
  refPoliTujuan.value.$refs.refAuto.resetValidation()
  refSistemBayar.value.$refs.refAuto.resetValidation()
}
// validasi
let valid = false
function validasi() {
  const asalRujukan = refAsalRujukan.value.$refs.refAuto.validate()
  const flagKartu = refFlagKartu.value.$refs.refAuto.validate()
  const dpjp = refDPJP.value.$refs.refAuto.validate()
  // const dpjp = true
  const poliTujuan = refPoliTujuan.value.$refs.refAuto.validate()
  const sistemBayar = refSistemBayar.value.$refs.refAuto.validate()
  if (asalRujukan && flagKartu && dpjp && poliTujuan && sistemBayar) { valid = true } else { valid = false }
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
// set kode Poli
function setPoliTujuan(val) {
  store.paramKarcis.kd_poli = val
  const index = findWithAttr(store.polis, 'kodepoli', val)
  store.paramDpjp.kdmappolbpjs = store.polis[index].kodemapingbpjs
  // store.paramDpjp.kdmappolibpjs = store.polis[index].jenispoli
  store.form.dpjp = ''
  refDPJP.value.$refs.refAuto.resetValidation()
  store.getDokterDpjp()
  console.log(val)
  if (store.paramKarcis.flag) {
    if (store.paramKarcis.flag !== '') {
      store.getKarcisPoli().then(() => {
        store.display.hargakarcis = store.kasrcispoli.tarif
      })
    }
  }
}
// set flag karcis
function setFlagKarcis(val) {
  // const index = findWithAttr(store.jenisKarcises, 'jeniskarcis', val)
  // const flag = store.jenisKarcises[index]
  // store.display.hargakarcis = flag.harga
  store.paramKarcis.flag = val
  console.log(store.paramKarcis)
  store.getKarcisPoli().then(() => {
    store.display.hargakarcis = store.kasrcispoli.tarif
  })
}
// expose function
defineExpose({ resetValidation, set })
</script>
