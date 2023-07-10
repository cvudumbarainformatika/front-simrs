<template>
  <div class="">
    <div
      class="row items-center justify-between bg-grey q-pa-md"
      style="z-index: 10;"
    >
      <div class="f-14 text-weight-bold">
        Registrasi / Kunjungan
      </div>
    </div>
    <q-card flat>
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
                  option-value="kode"
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
                  right-icon
                  right-icon-name="icon-mat-format_list_numbered"
                  right-icon-tooltip="List Rujukan"
                  :filled="false"
                  :loading="store.loadingListRujukan"
                  :rules="[val => (!!val) || 'Harap diisi',]"
                  @icon-right-click="listSuratRujukan"
                />
              </div>
              <!-- <div class="col-3">
                <app-btn
                  label="List Rujukan"
                  :loading="store.loadingListRujukan"
                  :disable="store.loadingListRujukan || store.loading"
                  @click="listSuratRujukan"
                />
              </div> -->
              <!-- <div class="col-3">
                <app-btn
                  label="Cek Rujukan"
                  :loading="store.loadingListRujukan"
                  @click="cekSuratRujukan"
                />
              </div> -->
            </div>
            <!-- poli tujuan -->
            <div
              :key="store.form.kodepoli"
              class="row q-col-gutter-md items-center q-mb-xs"
            >
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
            <!-- Katarak -->
            <div class="row q-col-gutter-md items-center q-mb-xs">
              <div class="col-12">
                <app-autocomplete
                  ref="refKatarak"
                  :key="store.form.katarak"
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
            <div
              :key="store.form.jeniskarcis"
              class="row q-col-gutter-sm items-center q-mb-xs"
            >
              <q-tooltip
                v-if="!store.paramKarcis.kd_poli"
                class="primary"
                :offset="[10, 10]"
              >
                Pilih poli tujuan Terlebih dahulu
              </q-tooltip>
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
                <q-tooltip
                  v-if="store.paramKarcis.kd_poli"
                  class="primary"
                  :offset="[10, 10]"
                >
                  Terisi otomatis
                </q-tooltip>
              </div>
            </div>
            <!-- Diagnosa awal -->
            <div
              :key="store.display.diagnosa.nama"
              class="row q-col-gutter-sm items-center q-mb-xs"
            >
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
              <div class="col-12">
                <app-input
                  ref="refNoSuratKontrol"
                  v-model="store.form.nosuratkontrol"
                  label="nomor Surat Kontrol"
                  right-icon
                  right-icon-name="icon-mat-format_list_numbered"
                  right-icon-tooltip="List Surat Kontrol"
                  :filled="false"
                  :loading="store.loading"
                  :rules="[val => (!!val) || 'Harap diisi',]"
                  @icon-right-click="cekSuratKontrol"
                />
              </div>
              <!-- <div class="col-3">
                <app-btn
                  label="List surat kontrol"
                  :loading="store.loadingSuratKontrol"
                  :disable="store.loadingSuratKontrol || store.loading"
                  @click="cekSuratKontrol"
                />
              </div> -->
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
              v-if="(store.display.jeniskunjungan==='Kontrol' && store.form.tujuanKunj===2) || store.display.jeniskunjungan==='Rujukan Internal'"
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
            <!-- PPK Rujukan -->
            <div
              :key="store.display.kode"
              class="row q-col-gutter-md items-center q-mb-xs"
            >
              <div class="col-12">
                <app-autocomplete-new
                  ref="refPpkRujukan"
                  :model="store.display.kode"
                  label="PPK Rujukan"
                  autocomplete="nama"
                  option-value="kode"
                  option-label="nama"
                  :filled="false"
                  :source="store.ppkRujukans"
                  :loading="store.loadingPpkRujukan"
                  :rules="[val => (!!val) || 'Harap diisi',]"
                  @on-select="setPpkRujukan"
                  @buang="prosesChange"
                  @clear="clearPpkRujukan"
                />
              </div>
            </div>
            <!-- Tanggal Rujukan-->
            <div class="row q-col-gutter-md items-center q-mb-xs">
              <div class="col-12">
                <app-input-date-human
                  ref="refTglRujukanr"
                  :model="store.display.tanggal.rujukan"
                  label="Tanggal Rujukan"
                  :filled="false"
                  :loading="store.loading"
                  @db-model="setTglRujukan"
                  @set-display="setDispTglRujukan"
                />
              </div>
            </div>
            <!-- sistem bayar -->
            <div class="row q-col-gutter-md items-center q-mb-xs">
              <div :class="store.display.bayar.kode?'col-6':'col-12'">
                <app-autocomplete
                  ref="refSistemBayar"
                  v-model="store.display.bayar.kode"
                  label="Sistem bayar"
                  autocomplete="groupsistembayar"
                  option-value="kode"
                  option-label="groupsistembayar"
                  :filled="false"
                  :source="store.sistembayars1"
                  :loading="store.loading"

                  :rules="[val => (!!val) || 'Harap diisi',]"
                  @selected="setSistembayar1"
                />
              </div>
              <!-- </div> -->
              <!-- sistem bayar -->
              <!-- <div class="row q-col-gutter-md items-center q-mb-xs"> -->
              <div
                v-if="store.display.bayar.kode"
                class="col-6"
              >
                <app-autocomplete
                  ref="refSistemBayar"
                  v-model="store.display.rs2"
                  label="Sistem bayar"
                  autocomplete="rs2"
                  option-value="rs2"
                  option-label="rs2"
                  :filled="false"
                  :source="store.sistembayars"
                  :loading="store.loading"

                  :rules="[val => (!!val) || 'Harap diisi',]"
                  @selected="setSistembayar"
                />
              </div>
            </div>
            <!-- Tanggal SEP -->
            <div class="row q-col-gutter-md items-center q-mb-xs">
              <div class="col-12">
                <app-input-date-human
                  ref="refTglSEP"
                  :model="store.display.tanggal.sep"
                  label="Tanggal SEP"
                  :filled="false"
                  :loading="store.loading"
                  @db-model="setTglSEP"
                  @set-display="setDispTglSEP"
                />
              </div>
            </div>
            <!-- Catatan -->
            <div class="row q-col-gutter-md items-center q-mb-xs">
              <div class="col-12">
                <app-input
                  v-model="store.form.catatan"
                  label="Catatan"
                  :filled="false"
                  valid
                />
              </div>
            </div>
            <!-- No SEP -->
            <div class="row q-col-gutter-md items-center q-mb-xs">
              <div class="col-12">
                <app-input
                  v-model="store.form.sep"
                  label="No SEP"
                  :filled="false"
                  valid
                />
              </div>
            </div>
            <!-- DPJP -->
            <div class="row q-col-gutter-sm items-center q-mb-xs">
              <div class="col-12">
                <app-autocomplete
                  ref="refDPJP"
                  :key="store.form.dpjp"
                  v-model="store.form.dpjp"
                  label="DPJP"
                  autocomplete="nama"
                  option-value="dpjp"
                  option-label="nama"
                  :filled="false"
                  :source="store.dpjps"
                  :loading="store.loading"
                  :rules="[val => (!!val) || 'Harap diisi',]"
                  @selected="dpjpSelected"
                />
                <q-tooltip
                  v-if="!store.form.kodepoli"
                  class="primary"
                  :offset="[10, 10]"
                >
                  Poli belum dipilih
                </q-tooltip>
              </div>
            </div>
            <!-- Kecelakaan -->
            <div class="row q-col-gutter-md items-center q-mb-xs">
              <div class="col-12">
                <app-autocomplete
                  ref="refKecelakaan"
                  v-model="store.display.kecelakaan"
                  label="Kecelakaan"
                  autocomplete="nama"
                  option-value="value"
                  option-label="nama"
                  :filled="false"
                  :source="store.kecelakaans"
                  :rules="[val => (!!val || val>=0) || 'Harap diisi',]"
                  :loading="store.loading"
                  @selected="setKecelakaan"
                />
              </div>
            </div>
            <!-- jika kecelakaan -->
            <div
              v-if="store.display.kecelakaan>0"
            >
              <!-- tanggal dan option sulpesi -->
              <div class="row q-col-gutter-md items-center q-mb-xs">
                <div class="col-6">
                  <app-input-date-human
                    ref="refTglKecelakaan"
                    :model="store.display.tanggal.kecelakaan"
                    label="Tanggal Kejadian"
                    :filled="false"
                    :loading="store.loading"
                    @db-model="setTglKecelakaan"
                    @set-display="setDispTglKecelakaan"
                  />
                </div>
                <div class="col-6">
                  <app-autocomplete
                    ref="refKecelakaan"
                    v-model="store.display.suplesi"
                    label="Suplesi"
                    autocomplete="nama"
                    option-value="value"
                    option-label="nama"
                    :filled="false"
                    :source="store.optionSuplesi"
                    :rules="[val => (!!val || val>=0) || 'Harap diisi',]"
                    :loading="store.loading"
                  />
                </div>
              </div>
              <!-- Nomor Suplesi -->
              <div
                v-if="store.display.suplesi===1"
                class="row q-col-gutter-md items-center q-mb-xs"
              >
                <div class="col-10">
                  <app-input
                    ref="refSuplesi"
                    v-model="store.form.nosuplesi"
                    label="Nomor Suplesi"
                    :filled="false"
                  />
                </div>
                <div class="col-2">
                  <q-btn
                    no-caps
                    color="primary"
                    dense
                    :loading="store.loadingSuplesi"
                    :disable="store.loadingSuplesi || store.loading"
                    @click="emits('cekSuplesi')"
                  >
                    <!-- style="max-width:80px" -->
                    <div
                      class="f-12"
                    >
                      Cek No Suplesi
                    </div>
                  </q-btn>
                </div>
              </div>
              <!-- Tempat kejadian -->
              <div class="row q-col-gutter-md items-center q-mb-xs">
                <div class="col-4">
                  <!--
                    bentuk data : propinsikecelakaan, kodepropinsikecelakaan
                  -->
                  <app-autocomplete
                    ref="refPropinsiKecelakaan"
                    v-model="store.display.tempatKecelakaan.kode"
                    label="Propinsi Kecelakaan"
                    autocomplete="nama"
                    option-value="kode"
                    option-label="nama"
                    :filled="false"
                    :source="store.propinsies"
                    :disable="!store.propinsies.length"
                    :rules="[val => (!!val || val>=0) || 'Harap diisi',]"
                    :loading="store.loadingKecelakaan"
                    @selected="setPropisiKecelakaan"
                  />
                </div>
                <div class="col-4">
                  <app-autocomplete
                    ref="refKabupatenKecelakaan"
                    v-model="store.display.kabupatenKecelakaan.kode"
                    label="Kabupaten Kecelakaan"
                    autocomplete="nama"
                    option-value="kode"
                    option-label="nama"
                    :filled="false"
                    :source="store.kabupatens"
                    :disable="!store.kabupatens.length"
                    :rules="[val => (!!val || val>=0) || 'Harap diisi',]"
                    :loading="store.loadingKecelakaan"
                    @selected="setKabupatenKecelakaan"
                  />
                </div>
                <div class="col-4">
                  <app-autocomplete
                    ref="refKabupatenKecelakaan"
                    v-model="store.display.kecamatanKecelakaan.kode"
                    label="kecamatan Kecelakaan"
                    autocomplete="nama"
                    option-value="kode"
                    option-label="nama"
                    :filled="false"
                    :source="store.kecamatans"
                    :disable="!store.kecamatans.length"
                    :rules="[val => (!!val || val>=0) || 'Harap diisi',]"
                    :loading="store.loadingKecelakaan"
                    @selected="setKecamatanKecelakaan"
                  />
                </div>
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
import { findWithAttr, notifErrVue } from 'src/modules/utils'

// const pasien = usePendaftaranPasienStore()
const store = useRegistrasiPasienBPJSStore()

// emits
const emits = defineEmits([
  'bisaSimpan',
  'getListSuratKontrol',
  'getListRujukan',
  'cekSuratRujukan',
  'cekSuplesi'
])

store.getInitialData()
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
const refSuplesi = ref(null)

// list Surat kontrol
function listSuratRujukan() {
  emits('getListRujukan')
}
// cek Surat kontrol
// function cekSuratRujukan() {
//   emits('cekSuratRujukan')
// }
// cek surat kontrol
function cekSuratKontrol() {
  emits('getListSuratKontrol')
}
// set kode Poli
function setPoliTujuan(val) {
  store.paramKarcis.kd_poli = val

  const index = findWithAttr(store.polis, 'kodepoli', val)
  // store.paramDpjp.kdmappolibpjs = store.polis[index].jenispoli
  store.form.dpjp = ''
  refDPJP.value.$refs.refAuto.resetValidation()
  if (store.paramKarcis.flag) {
    if (store.paramKarcis.flag !== '') {
      store.getKarcisPoli().then(() => {
        store.display.hargakarcis = store.kasrcispoli.tarif
        store.form.karcis = store.kasrcispoli.tarif
      })
    }
  }
  console.log('set poli ', store.polis[index])
  store.paramDpjp.kdmappolbpjs = store.polis[index].kodemapingbpjs
  store.paramDpjp.kodepoli = store.polis[index].kodemapingbpjs
  store.setForm('kodepoli', store.polis[index].kodemapingbpjs)
  store.setForm('namapoli', store.polis[index].polimapingbpjs)
  store.getjadwalDokterDpjp()
  store.getDokterDpjp()
}
// dpdjp selected
function dpjpSelected(val) {
  console.log('dpjp selected ', val)
  const index = findWithAttr(store.jadwalDpjps, 'dpjp', val)
  console.log('index  ', index)
  if (index >= 0) {
    // console.log('jadwal  ', store.jadwalDpjps[index])
    store.setForm('namadokter', store.jadwalDpjps[index].namadokter)
    store.setForm('jampraktek', store.jadwalDpjps[index].jadwal)
    // console.log('form  ', store.form)
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
    store.form.karcis = store.kasrcispoli.tarif
  })
}
// --- kecelakaan start ---
// autocomplete kecelakaan
function setKecelakaan(val) {
  console.log('kecelakaan ', val)
  store.getPropinsiKecelakaan()
}
function setPropisiKecelakaan(val) {
  // propinsikecelakaan, kodepropinsikecelakaan
  store.paramKecelakaan.kodepropinsi = val
  const index = findWithAttr(store.propinsies, 'kode', val)
  if (index >= 0) {
    store.form.propinsikecelakaan = store.propinsies[index].nama
    store.form.kodepropinsikecelakaan = val
    store.getKabupatenKecelakaan()
  } else {
    notifErrVue('Propinsi tidak ditemukan')
  }
}
function setKabupatenKecelakaan(val) {
  // propinsikecelakaan, kodepropinsikecelakaan
  store.paramKecelakaan.kodekabupaten = val
  const index = findWithAttr(store.kabupatens, 'kode', val)
  if (index >= 0) {
    store.form.kabupatenkecelakaan = store.kabupatens[index].nama
    store.form.kodekabupatenkecelakaan = val
    store.getKecamatanKecelakaan()
  } else {
    notifErrVue('kabupaten tidak ditemukan')
  }
}
function setKecamatanKecelakaan(val) {
  // propinsikecelakaan, kodepropinsikecelakaan
  store.paramKecelakaan.kodekecamatan = val
  const index = findWithAttr(store.kecamatans, 'kode', val)
  if (index >= 0) {
    store.form.kecamatankecelakaan = store.kecamatans[index].nama
    store.form.kodekecamatankecelakaan = val
    console.log('form', store.form)
  } else {
    notifErrVue('Kecamatan tidak ditemukan')
  }
}
// tanggal kecelakaan
function setTglKecelakaan(val) {
  store.setForm('tglKecelakaan', val)
}
function setDispTglKecelakaan(val) {
  store.display.tanggal.kecelakaan = val
}
// cek no suplesi
// function cekSuplesi() {
//   if (refSuplesi.value.$refs.refInput.validate()) {
//     console.log('cek suplesi')
//   } else {
//     notifErrVue('Nomor Suplesi Kosong')
//   }
// }
// --- kecelakaan end ---
// ---- PPK Rujukan start---
// debounce function
function myDebounce(func, timeout = 800) {
  let timer
  return (...arg) => {
    clearTimeout(timer)
    timer = setTimeout(() => { func.apply(this, arg) }, timeout)
  }
}
const prosesChange = myDebounce((val) => {
  console.log('proses val', val)
  if (val !== '') findPpkRujukan(val)
}
)
function setPpkRujukan(val) {
  store.display.kode = val
  store.setForm('ppkRujukan', val)
  // console.log('set PPK rujukan', val)
}
function findPpkRujukan(val) {
  // console.log('find PPK rujukan', val)
  // store.paramPpkRujukan = val
  store.getPpkRujukan(val)
}
function clearPpkRujukan() {
  store.display.kode = null
  delete store.form.ppkRujukan
  // console.log('val PPK rujukan', val)
}
// ---- PPK Rujukan end---
// sistem bayar
function setSistembayar1(val) {
  // store.setForm('sistembayar', val)
  if (store.form.sistembayar) { delete store.form.sistembayar }
  if (store.display.rs2) { delete store.display.rs2 }
  const index = findWithAttr(store.sistembayars1, 'kode', val)
  if (index >= 0) {
    store.setForm('jkn', store.sistembayars1[index].groupsistembayar)
  }
  store.getSistemBayar2(val)
  console.log('form', store.form)
}
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
  const kunj = findWithAttr(store.jenisKunjungans, 'nilai', val)
  if (kunj >= 0) {
    const jen = store.jenisKunjungans[kunj]
    store.setForm('id_kunjungan', jen.id)
    store.setForm('jenis_kunjungan', val)
  }
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
// tanggal rujukan
function setTglRujukan(val) {
  store.setForm('tglrujukan', val)
  // console.log('from tanggal rujukan', val)
}
function setDispTglRujukan(val) {
  store.display.tanggal.rujukan = val
  // console.log('disp tanggal rujukan', val)
}
// tanggal SEP
function setTglSEP(val) {
  store.setForm('tglsep', val)
  // console.log('from tanggal sep', val)
}
function setDispTglSEP(val) {
  store.display.tanggal.sep = val
  // console.log('disp tanggal rujukan', val)
}
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
  const TujuanKunjungan = refTujuanKunjungan.value === null ? true : refTujuanKunjungan.value.$refs.refAuto.validate()
  // ref input
  const NoSuratKontrol = refNoSuratKontrol.value.$refs.refInput.validate()
  const noRujukan = refNoRujukan.value.$refs.refInput.validate()
  if (asalRujukan && flagKartu && dpjp && poliTujuan && sistemBayar &&
  noRujukan && NamaDiagnosa && KodeDiagnosa && JenisKunjungan &&
  NoSuratKontrol && TujuanKunjungan) { valid = true } else { valid = false }
}
// set
function set() {
  validasi()
  if (valid) {
    emits('bisaSimpan', { form: store.form, save: true })
    return { form: store.form, save: true }
  } else {
    emits('bisaSimpan', { form: store.form, save: false })
    notifErrVue('periksa kembali input registrasi anda')
    return { form: store.form, save: false }
  }
}

// expose function
defineExpose({ resetValidation, set, setPoliTujuan })
</script>
