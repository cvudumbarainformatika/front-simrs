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
                  :loading="store.loadingListRujukan || store.loadingCekBpjs"
                  :rules="[val => (!!val || !!store.form.nosuratkontrol) || 'Harap diisi',]"
                  @icon-right-click="listSuratRujukan"
                  @keyup.enter="cekSuratRujukanIni($event)"
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
            <!-- No Surat kontrol -->
            <div
              v-if="store.jumlahSEP >= 1"
              class="row q-col-gutter-sm items-center q-mb-xs"
            >
              <div class="col-12">
                <app-input
                  ref="refNoSuratKontrol"
                  v-model="store.form.nosuratkontrol"
                  label="nomor Surat Kontrol"
                  right-icon
                  right-icon-name="icon-mat-format_list_numbered"
                  right-icon-tooltip="List Surat Kontrol"
                  :filled="false"
                  :loading="store.loadingCekBpjs"
                  :rules="[
                    val => (!!val ) || 'Harap diisi',
                    val => (store.rencanaKontrolValid) || 'Rencana Kontrol tidak valid',
                  ]"
                  @icon-right-click="cekSuratKontrol"
                  @keyup.enter="cekSuratKontrolIni(store.form.nosuratkontrol)"
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
            <div
              v-if="(!store.loadingCekBpjs || store.loadingListRujukan) &&
                ((!!store.form.norujukan && store.jumlahSEP === 0) ||
                  (!!store.form.norujukan && store.jumlahSEP >= 1 && !!store.form.nosuratkontrol && store.rencanaKontrolValid))"
            >
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
                    valid
                    :filled="false"
                    :source="store.asalrujukans"
                    :loading="store.loading"
                  />
                  <!-- :rules="[val => (!!val) || 'Harap diisi',]" -->
                </div>
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
                  <app-autocomplete-debounce-input
                    ref="refKodeDiagnosa"
                    :model="store.display.diagnosa.kode"
                    label="Kode Diagnosa"
                    autocomplete="kode"
                    option-value="kode"
                    option-label="kode"
                    :filled="false"
                    :source="store.diagnosaAwals"
                    :loading="store.loadingdiagnosa"
                    :rules="[val => (!!val) || 'Harap diisi',]"
                    @on-select="setKodeDiagnosa"
                    @buang="findKodeDiagnosa"
                    @clear="clearKodeDiagnosa"
                  />
                </div>
                <div class="col-8">
                  <app-autocomplete-debounce-input
                    ref="refNamaDiagnosa"
                    :model="store.display.diagnosa.nama"
                    label="Nama Diagnosa"
                    autocomplete="nama"
                    option-value="nama"
                    option-label="nama"
                    :filled="false"
                    :source="store.diagnosaAwals"
                    :loading="store.loadingdiagnosa"
                    :rules="[val => (!!val) || 'Harap diisi',]"
                    @on-select="setNamaDiagnosa"
                    @buang="findNamaDiagnosa"
                    @clear="clearNamaDiagnosa"
                  />
                </div>
              </div>
              <!-- Tujuan Kunjungan -->
              <!-- v-if="store.display.jeniskunjungan==='Kontrol'" -->
              <div
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
                v-if="store.form.tujuankunjungan==='1'"
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
              <!-- v-if="(store.display.jeniskunjungan==='Kontrol' && store.form.tujuankunjungan===2) || store.display.jeniskunjungan==='Rujukan Internal'" -->
              <div
                v-if="store.form.tujuankunjungan!=='1'"
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
              <!-- v-if="store.display.jeniskunjungan==='Kontrol' && store.form.tujuankunjungan===1" -->
              <div
                v-if="store.form.tujuankunjungan!=='0'"
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
          </div>
          <!-- kanan -->
          <div
            v-if="(!store.loadingCekBpjs || store.loadingListRujukan) &&
              ((!!store.form.norujukan && store.jumlahSEP === 0) ||
                (!!store.form.norujukan && store.jumlahSEP >= 1 && !!store.form.nosuratkontrol && store.rencanaKontrolValid))"
            class="col-6"
          >
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
                  :key="store.display.bayar.kode"
                  v-model="store.display.bayar.kode"
                  label="Sistem bayar"
                  autocomplete="groupsistembayar"
                  option-value="kode"
                  option-label="groupsistembayar"
                  :filled="false"
                  :source="store.sistembayars1"
                  :loading="store.loadingsistembayar"

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
                  :loading="store.loadingsistembayar"
                  :rules="[
                    val => (!!val) || 'Harap diisi',
                  ]"
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
                  disable
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
              v-if="parseInt(store.display.kecelakaan) > 0"
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
                    v-model="store.form.suplesi"
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
                v-if="store.form.suplesi===1"
                class="row q-col-gutter-md items-center q-mb-xs"
              >
                <div class="col-10">
                  <app-input
                    ref="refSuplesi"
                    v-model="store.form.nosepsuplesi"
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
              <!-- keterangan -->
              <div class="row q-col-gutter-md items-center q-mb-xs">
                <div class="col-12">
                  <app-input
                    ref="refKeterangan"
                    v-model="store.form.keterangan"
                    label="Keterangan"
                    valid
                    :filled="false"
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
import { date } from 'quasar'

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
  store.rujukanPCareChecked = true
  store.rujukanRSChecked = true
}
function cekSuratKontrolIni(val) {
  if (!store.suratKontrolChecked) {
    const param = {
      search: val
    }
    store.cekSuratKontrol(param).then(resp => {
      console.log('cek surat kontrol ', resp)
    })
  }
}
function cekSuratRujukanIni(evt) {
  // console.log(evt.target.value)
  const val = evt.target.value
  // if (!store.rujukanPCareChecked) {
  const param = {
    search: val
  }
  store.cekRujukanPcare(param).then(resp => {
    console.log('cek P care ', resp)
    if (resp.metadata.code === '200') {
      const param = {
        jenisrujukan: 1,
        norujukan: val
      }
      store.getJumlahSep(param).then(resp => {
        console.log('jumlah sep p care', resp)
        // store.jumlahSEP = parseInt(resp.jumlahSEP) >= 0 ? parseInt(resp.jumlahSEP) : 0
      })
    } else {
      if (!store.rujukanRSChecked) {
        store.cekRujukanRs(param).then(resp => {
          if (resp.metadata.code === '200') {
            const param = {
              jenisrujukan: 2,
              norujukan: val
            }
            store.getJumlahSep(param).then(resp => {
              console.log('jumlah sep p care', resp)
              // store.jumlahSEP = parseInt(resp.jumlahSEP) >= 0 ? parseInt(resp.jumlahSEP) : 0
            })
          }
          console.log('cek rujukan  RS', resp)
        })
      }
    }
  })
  // }
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
  if (refDPJP.value) refDPJP.value.$refs.refAuto.resetValidation()
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
  store.setForm('kodepoli', store.polis[index].kodepoli)
  store.setForm('kodepolibpjs', store.polis[index].kodemapingbpjs)
  store.setForm('namapolibpjs', store.polis[index].polimapingbpjs)
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
  store.setForm('tglKecelakaan', '')
  store.setForm('kodekecamatankecelakaan', '')
  store.setForm('kodekabupatenkecelakaan', '')
  store.setForm('kodepropinsikecelakaan', '')
  store.setForm('propinsikecelakaan', '')
  store.setForm('kabupatenkecelakaan', '')
  store.setForm('kecamatankecelakaan', '')
  store.setForm('nosepsuplesi', '')
  store.setForm('suplesi', '0')
  store.setForm('keterangan', '')

  store.display.kecamatanKecelakaan.kode = ''
  store.display.kabupatenKecelakaan.kode = ''
  store.display.tempatKecelakaan.kode = ''

  console.log('kecelakaan ', val)
  store.setForm('lakalantas', val)
  if (parseInt(val) >= 1) {
    store.setForm('tglKecelakaan', date.formatDate(Date.now(), 'YYYY-MM-DD'))
    store.display.tanggal.kecelakaan = date.formatDate(Date.now(), 'DD MMMM YYYY')
  } else {
    store.setForm('tglKecelakaan', '')
    store.setForm('kodekecamatankecelakaan', '')
    store.setForm('kodekabupatenkecelakaan', '')
    store.setForm('kodepropinsikecelakaan', '')
    store.setForm('propinsikecelakaan', '')
    store.setForm('kabupatenkecelakaan', '')
    store.setForm('kecamatankecelakaan', '')
    store.setForm('nosepsuplesi', '')
    store.setForm('suplesi', '0')
    store.setForm('keterangan', '')
  }
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
  store.setForm('tglkejadian', val)
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
  // val is rs2
  store.setForm('sistembayar', val)
  const index = findWithAttr(store.sistembayars, 'rs2', val)
  console.log('sistem bayar dua ', store.sistembayars[index])
  if (index >= 0) {
    store.setForm('kodesistembayar', store.sistembayars[index].rs1)
  }
  console.log('form', store.form)
}
// diagnosa
function setKodeDiagnosa(val) {
  const index = findWithAttr(store.diagnosaAwals, 'kode', val)
  // console.log('index kode', index)
  if (index >= 0) {
    const diag = store.diagnosaAwals[index]
    // console.log('kode diag', diag)
    store.display.diagnosa.nama = diag.nama
    store.setForm('namadiagnosa', diag.nama)
  }
  store.display.diagnosa.kode = val
  store.setForm('kodediagnosa', val)
}
function setNamaDiagnosa(val) {
  const index = findWithAttr(store.diagnosaAwals, 'nama', val)
  if (index >= 0) {
    const diag = store.diagnosaAwals[index]
    // console.log('kode diag', diag)
    store.display.diagnosa.kode = diag.kode
    store.setForm('kodediagnosa', diag.kode)
  }
  store.display.diagnosa.nama = val
  store.setForm('namadiagnosa', val)
}
function findKodeDiagnosa(val) {
  store.paramDiagnosa.kodediagnosa = val
  store.getDiagnosaAwal()
}
function findNamaDiagnosa(val) {
  store.paramDiagnosa.diagnosa = val
  store.getDiagnosaAwal()
}
function clearKodeDiagnosa(val) {
  store.display.diagnosa.kode = null
  store.setForm('kodediagnosa', null)
  store.display.diagnosa.nama = null
  store.setForm('namadiagnosa', null)
}
function clearNamaDiagnosa(val) {
  store.display.diagnosa.kode = null
  store.setForm('kodediagnosa', null)
  store.display.diagnosa.nama = null
  store.setForm('namadiagnosa', null)
}
// jenis kunjungan
function setJenisKunjungan(val) {
  // tujuan kunjungan 0 jika rujukan yang sepnya 0, atau post Mrs atau kontrol
  // tujuan kunjungan 1 jika pasien mau ke penunjang langsung contoh rehab medis
  // tujuan kunjungan 2 khusus untuk form dpjp
  console.log('jenisKun ', val)
  const kunj = findWithAttr(store.jenisKunjungans, 'nilai', val)
  if (kunj >= 0) {
    const jen = store.jenisKunjungans[kunj]
    store.setForm('id_kunjungan', jen.id)
    store.setForm('jenis_kunjungan', val)
  }
  if (val.includes('Rujukan FKTP') || val === 'Rujukan Antar RS') {
    store.display.tujuankunjungan = '0'
    store.setForm('tujuankunjungan', '0') // Normal
    store.setForm('flagprocedure', '')
    store.setForm('kdPenunjang', '')
    store.display.prosedur.kode = ''
    store.setForm('assesmentPel', '4')
    store.display.assesment.kode = '4'
  }
  if (val === 'Rujukan Internal') {
    store.setForm('tujuankunjungan', '2')
    store.setForm('flagprocedure', '')
    store.setForm('kdPenunjang', '')
    store.display.prosedur.kode = ''
    store.display.tujuankunjungan = '2'
    store.setForm('assesmentPel', '4')
    store.display.assesment.kode = '4'
  }
  if (val === 'Kontrol') {
    store.display.prosedur.kode = ''
    store.setForm('flagprocedure', '')
    store.setForm('kdPenunjang', '')
    store.setForm('tujuankunjungan', '0')
    store.display.tujuankunjungan = '0'
    store.setForm('assesmentPel', '4')
    store.display.assesment.kode = '4'
  }
}
// tujuan kunjungan
function setTujuanKunjungan(val) {
  console.log('tujuan kunjungan', val)
  store.setForm('tujuankunjungan', val)
}
// prosedur
function setProsedur(val) {
  store.setForm('flagprocedure', val)
  if (val === 1) {
    store.setForm('assesmentPel', '5')
    store.display.assesment.kode = '5'
  } else {
    delete store.form.assesmentPel
  }
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
  if (refAsalRujukan.value) refAsalRujukan.value.$refs.refAuto.resetValidation()
  if (refFlagKartu.value) refFlagKartu.value.$refs.refAuto.resetValidation()
  if (refDPJP.value) refDPJP.value.$refs.refAuto.resetValidation()
  if (refPoliTujuan.value) refPoliTujuan.value.$refs.refAuto.resetValidation()
  if (refSistemBayar.value) refSistemBayar.value.$refs.refAuto.resetValidation()
  if (refKodeDiagnosa.value) refKodeDiagnosa.value.$refs.refAuto.resetValidation()
  if (refNamaDiagnosa.value) refNamaDiagnosa.value.$refs.refAuto.resetValidation()
  if (refJenisKunjungan.value) refJenisKunjungan.value.$refs.refAuto.resetValidation()
  if (refTujuanKunjungan.value !== null) { refTujuanKunjungan.value.$refs.refAuto.resetValidation() }
  // input
  refNoRujukan.value.$refs.refInput.resetValidation()
  if (refNoSuratKontrol.value) refNoSuratKontrol.value.$refs.refInput.resetValidation()
}
// validasi
let valid = false
function validasi() {
  // ref auto complete
  const asalRujukan = refAsalRujukan.value === null ? true : refAsalRujukan.value.$refs.refAuto.validate()
  const flagKartu = refFlagKartu.value == null ? true : refFlagKartu.value.$refs.refAuto.validate()
  const dpjp = refDPJP.value === null ? true : refDPJP.value.$refs.refAuto.validate()
  // const dpjp = true
  const poliTujuan = refPoliTujuan.value === null ? true : refPoliTujuan.value.$refs.refAuto.validate()
  const sistemBayar = refSistemBayar.value === null ? true : refSistemBayar.value.$refs.refAuto.validate()
  const KodeDiagnosa = refKodeDiagnosa.value === null ? true : refKodeDiagnosa.value.$refs.refAuto.validate()
  const NamaDiagnosa = refNamaDiagnosa.value === null ? true : refNamaDiagnosa.value.$refs.refAuto.validate()
  const JenisKunjungan = refJenisKunjungan.value === null ? true : refJenisKunjungan.value.$refs.refAuto.validate()
  const TujuanKunjungan = refTujuanKunjungan.value === null ? true : refTujuanKunjungan.value.$refs.refAuto.validate()
  // ref input
  const NoSuratKontrol = refNoSuratKontrol.value ? refNoSuratKontrol.value.$refs.refInput.validate() : true
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

function validasiSuratKontrol() {
  refNoSuratKontrol.value.$refs.refInput.validate()
}
// expose function
defineExpose({ resetValidation, validasiSuratKontrol, set, setPoliTujuan, setJenisKunjungan })
</script>
