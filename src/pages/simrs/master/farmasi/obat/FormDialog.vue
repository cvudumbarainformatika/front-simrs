<template>
  <q-dialog>
    <q-card
      class="lebar"
    >
      <q-card-section>
        <div class="f-14 text-weight-bold">
          Form Obat Baru
        </div>
        <div class="title-desc">
          Input data Obat Baru
        </div>
      </q-card-section>
      <q-separator />
      <q-card-section>
        <q-form
          @submit="onSubmit"
          @reset="onReset"
        >
          <!-- Baru row kiri dulu terus kanan -->
          <div class="row q-col-gutter-md q-mb-md">
            <!-- Row kiri -->
            <div class="col-md-6 col-xs-12">
              <!-- Nama Obat text only -->
              <div class="row q-mb-xs">
                Nama Obat :
              </div>
              <!-- Jenis Perbekalan -->
              <div
                :key="store.form.jenis_perbekalan"
                class="row items-center justify-between q-mb-xs"
              >
                <app-autocomplete-debounce-input
                  :model="store.form.jenis_perbekalan"
                  style="width:90%"
                  autocomplete="jenisperbekalan"
                  option-label="jenisperbekalan"
                  option-value="jenisperbekalan"
                  valid
                  label="Jenis Perbekalan"
                  autofocus
                  :source="store.jenisPerbekalans"
                  :loading="store.loadingJenisPerbekalan"
                  @buang="cariJenisPerbekalan"
                  @on-select="jenisPerbekalanSelected"
                  @clear="jenisPerbekalanCleared"
                  @on-enter="scJenisPerbekalan"
                />
                <q-icon
                  size="16px"
                  name="icon-mat-help_outline"
                  color="info"
                  class="cursor-pointer"
                >
                  <q-tooltip
                    anchor="top middle"
                    self="bottom middle"
                    :offset="[10, 10]"
                  >
                    <strong>Untuk Masukkan data ?</strong> <br>
                    <em>ketik data yang akan di input</em><br>
                    <em>contoh</em><br>
                    <strong>RSUD</strong><br>
                    <em>Lalu tekan Enter </em>
                  </q-tooltip>
                </q-icon>
              </div>
              <!-- Nama barang -->
              <div class="row q-mb-xs">
                <div class="col-12">
                  <app-input
                    v-model="store.form.nama"
                    valid
                    label="Nama Barang"
                    :filled="false"
                    autofocus
                    @update:model-value="setNama"
                  />
                </div>
              </div>
              <!-- Merk -->
              <div
                :key="store.form.merk"
                class="row items-center justify-between q-mb-xs"
              >
                <app-autocomplete-debounce-input
                  style="width:90%"
                  :model="store.form.merk"
                  autocomplete="merk"
                  option-label="merk"
                  option-value="merk"
                  valid
                  label="Merk"
                  autofocus
                  :source="store.merks"
                  :loading="store.loadingMerk"
                  @buang="cariMerk"
                  @on-select="merkSelected"
                  @clear="merkCleared"
                  @on-enter="scMerk"
                />
                <q-icon
                  size="16px"
                  name="icon-mat-help_outline"
                  color="info"
                  class="cursor-pointer"
                >
                  <q-tooltip
                    anchor="top middle"
                    self="bottom middle"
                    :offset="[10, 10]"
                  >
                    <strong>Untuk Masukkan data ?</strong> <br>
                    <em>ketik data yang akan di input</em><br>
                    <em>contoh</em><br>
                    <strong>RSUD</strong><br>
                    <em>Lalu tekan Enter </em>
                  </q-tooltip>
                </q-icon>
              </div>
              <!-- Kekuatan Dosis -->
              <div
                :key="store.form.kekuatan_dosis"
                class="row items-center justify-between q-mb-xs"
              >
                <app-autocomplete-debounce-input
                  :model="store.form.kekuatan_dosis"
                  style="width:90%"
                  autocomplete="kekuatandosis"
                  option-label="kekuatandosis"
                  option-value="kekuatandosis"
                  valid
                  label="Kekuatan Dosis"
                  autofocus
                  :source="store.kekuatanDosiss"
                  :loading="store.loadingKekuatanDosis"
                  @buang="cariKekuatanDosis"
                  @on-select="kekuatanDosisSelected"
                  @clear="kekuatanDosisCleared"
                  @on-enter="store.simpanCepatKekuatanDosis"
                />
                <q-icon
                  size="16px"
                  name="icon-mat-help_outline"
                  color="info"
                  class="cursor-pointer"
                >
                  <q-tooltip
                    anchor="top middle"
                    self="bottom middle"
                    :offset="[10, 10]"
                  >
                    <strong>Untuk Masukkan data ?</strong> <br>
                    <em>ketik data yang akan di input</em><br>
                    <em>contoh</em><br>
                    <strong>RSUD</strong><br>
                    <em>Lalu tekan Enter </em>
                  </q-tooltip>
                </q-icon>
              </div>
              <!-- Volume Sediaan -->
              <div
                :key="store.form.volumesediaan"
                class="row items-center justify-between q-mb-xs"
              >
                <app-autocomplete-debounce-input
                  v-model="store.form.volumesediaan"
                  style="width:90%"
                  autocomplete="volumesediaan"
                  option-label="volumesediaan"
                  option-value="volumesediaan"
                  valid
                  label="Volume Sediaan"
                  autofocus
                  :source="store.volumeSediaans"
                  :loading="store.loadingVolumeSediaan"
                  @buang="cariVolumeSediaan"
                  @on-select="volumeSediaanSelected"
                  @clear="volumeSediaanCleared"
                  @on-enter="scVolumeSediaan"
                />
                <q-icon
                  size="16px"
                  name="icon-mat-help_outline"
                  color="info"
                  class="cursor-pointer"
                >
                  <q-tooltip
                    anchor="top middle"
                    self="bottom middle"
                    :offset="[10, 10]"
                  >
                    <strong>Untuk Masukkan data ?</strong> <br>
                    <em>ketik data yang akan di input</em><br>
                    <em>contoh</em><br>
                    <strong>RSUD</strong><br>
                    <em>Lalu tekan Enter </em>
                  </q-tooltip>
                </q-icon>
              </div>
              <!-- Bentuk Sediaan -->
              <div
                :key="store.form.bentuk_sediaan"
                class="row items-center justify-between q-mb-xs"
              >
                <app-autocomplete-debounce-input
                  :model="store.form.bentuk_sediaan"
                  style="width:90%"
                  autocomplete="bentuksediaan"
                  option-label="bentuksediaan"
                  option-value="bentuksediaan"
                  valid
                  label="Bentuk Sediaan"
                  autofocus
                  :source="store.bentukSediaans"
                  :loading="store.loadingBentukSediaan"
                  @buang="cariBentukSediaan"
                  @on-select="bentukSediaanSelected"
                  @clear="bentukSediaanCleared"
                  @on-enter="scBentukSediaan"
                />
                <q-icon
                  size="16px"
                  name="icon-mat-help_outline"
                  color="info"
                  class="cursor-pointer"
                >
                  <q-tooltip
                    anchor="top middle"
                    self="bottom middle"
                    :offset="[10, 10]"
                  >
                    <strong>Untuk Masukkan data ?</strong> <br>
                    <em>ketik data yang akan di input</em><br>
                    <em>contoh</em><br>
                    <strong>RSUD</strong><br>
                    <em>Lalu tekan Enter </em>
                  </q-tooltip>
                </q-icon>
              </div>
              <!-- kelompok Penyimpanan -->
              <div
                :key="store.form.kelompok_penyimpanan"
                class="row items-center justify-between q-mb-xs"
              >
                <app-autocomplete-debounce-input
                  v-model="store.form.kelompok_penyimpanan"
                  style="width:90%"
                  autocomplete="kelompokpenyimpanan"
                  option-label="kelompokpenyimpanan"
                  option-value="kelompokpenyimpanan"
                  valid
                  label="Kelompok Penyimpanan"
                  autofocus
                  :source="store.kelompokPenyimpanans"
                  :loading="store.loadingKelompokPenyimpanan"
                  @buang="cariKelompokPenyimpanan"
                  @on-enter="scKelompokPenyimpanan"
                />
                <q-icon
                  size="16px"
                  name="icon-mat-help_outline"
                  color="info"
                  class="cursor-pointer"
                >
                  <q-tooltip
                    anchor="top middle"
                    self="bottom middle"
                    :offset="[10, 10]"
                  >
                    <strong>Untuk Masukkan data ?</strong> <br>
                    <em>ketik data yang akan di input</em><br>
                    <em>contoh</em><br>
                    <strong>RSUD</strong><br>
                    <em>Lalu tekan Enter </em>
                  </q-tooltip>
                </q-icon>
              </div>
              <!-- Kelompok RKO -->
              <div class="row q-mb-xs">
                <div class="col-12">
                  <app-autocomplete-debounce-input
                    v-model="store.form.kelompok_rko"
                    autocomplete="rs2"
                    option-label="rs2"
                    option-value="rs2"
                    valid
                    label="Kelompok RKO"
                    autofocus
                    :source="store.kelompokRKOs"
                    :loading="store.loadingKelompokRKO"
                    @buang="cariKelompokRKO"
                  />
                </div>
              </div>
              <!-- Jenis Produk -->
              <div
                :key="store.form.kelas_terapi"
                class="row items-center justify-between q-mb-xs"
              >
                <app-autocomplete-debounce-input
                  v-model="store.form.kelas_terapi"
                  style="width:90%"
                  autocomplete="jenisproduk"
                  option-label="jenisproduk"
                  option-value="jenisproduk"
                  valid
                  label="Jenis Produk"
                  autofocus
                  :source="store.jenisProduks"
                  :loading="store.loadingJenisProduk"
                  @buang="cariJenisProduk"
                  @on-enter="scJenisProduk"
                />
                <q-icon
                  size="16px"
                  name="icon-mat-help_outline"
                  color="info"
                  class="cursor-pointer"
                >
                  <q-tooltip
                    anchor="top middle"
                    self="bottom middle"
                    :offset="[10, 10]"
                  >
                    <strong>Untuk Masukkan data ?</strong> <br>
                    <em>ketik data yang akan di input</em><br>
                    <em>contoh</em><br>
                    <strong>RSUD</strong><br>
                    <em>Lalu tekan Enter </em>
                  </q-tooltip>
                </q-icon>
              </div>
              <!-- Kandungan / nama generik -->
              <div
                :key="store.form.kandungan"
                class="row items-center justify-between q-mb-xs"
              >
                <app-autocomplete-debounce-input
                  v-model="store.form.kandungan"
                  style="width:90%"
                  autocomplete="nama"
                  option-label="nama"
                  option-value="nama"
                  valid
                  label="Kandungan / Nama Generik"
                  autofocus
                  :source="store.kandungans"
                  :loading="store.loadingKandungan"
                  @buang="cariKandungan"
                  @on-enter="scKandungan"
                />
                <q-icon
                  size="16px"
                  name="icon-mat-help_outline"
                  color="info"
                  class="cursor-pointer"
                >
                  <q-tooltip
                    anchor="top middle"
                    self="bottom middle"
                    :offset="[10, 10]"
                  >
                    <strong>Untuk Masukkan data ?</strong> <br>
                    <em>ketik data yang akan di input</em><br>
                    <em>contoh</em><br>
                    <strong>RSUD</strong><br>
                    <em>Lalu tekan Enter </em>
                  </q-tooltip>
                </q-icon>
              </div>
            </div>
            <!-- Row Kanan -->
            <div class="col-md-6 col-xs-12">
              <!-- nama Obat  -->
              <div class="row q-mb-xs text-weight-bold text-red">
                {{ store.form.nama_obat ? store.form.nama_obat:'belum terbetuk nama obat' }}
              </div>
              <!-- kelompok Napza -->
              <div class="row q-mb-xs">
                <div class="col-12">
                  <app-autocomplete-debounce-input
                    v-model="store.form.kelompok_psikotropika"
                    autocomplete="nama"
                    option-label="nama"
                    option-value="value"
                    valid
                    label="Kelompok Nppza / Psikotropika"
                    autofocus
                    :source="store.optionNapzas"
                  />
                </div>
              </div>
              <!-- sistem bayar -->
              <div class="row q-mb-xs">
                <div class="col-12">
                  <app-autocomplete-debounce-input
                    v-model="store.form.sistembayar"
                    autocomplete="nama"
                    option-label="nama"
                    option-value="nama"
                    valid
                    label="Sistem Bayar"
                    autofocus
                    :source="store.optionSistemBayars"
                  />
                </div>
              </div>
              <!-- Kode 108 -->
              <div class="row q-mb-xs">
                <div class="col-12">
                  <app-autocomplete-debounce-input
                    v-model="store.form.kode108"
                    autocomplete="uraian"
                    option-label="uraian"
                    option-value="kode"
                    valid
                    label="Kode 108"
                    autofocus
                    :source="store.kodeBelanjas"
                    :loading="store.loadingKodeBelanja"
                    @buang="cariKodeBelanja"
                    @on-select="kodeBelanjaDipilih"
                  />
                </div>
              </div>
              <!-- Satuan Besar -->
              <div
                :key="store.form.satuan_b"
                class="row items-center justify-between q-mb-xs"
              >
                <app-autocomplete-debounce-input
                  v-model="store.form.satuan_b"
                  style="width:90%"
                  autocomplete="nama"
                  option-label="nama"
                  option-value="nama"
                  valid
                  label="Satuan Besar"
                  autofocus
                  :source="store.satuanBs"
                  :loading="store.loadingSatuanB"
                  @buang="cariSatuanB"
                  @on-enter="scSatuanBes"
                />
                <q-icon
                  size="16px"
                  name="icon-mat-help_outline"
                  color="info"
                  class="cursor-pointer"
                >
                  <q-tooltip
                    anchor="top middle"
                    self="bottom middle"
                    :offset="[10, 10]"
                  >
                    <strong>Untuk Masukkan data ?</strong> <br>
                    <em>ketik data yang akan di input</em><br>
                    <em>contoh</em><br>
                    <strong>RSUD</strong><br>
                    <em>Lalu tekan Enter </em>
                  </q-tooltip>
                </q-icon>
              </div>
              <!-- Satuan Kecil -->
              <div
                :key="store.form.satuan_k"
                class="row items-center justify-between q-mb-xs"
              >
                <app-autocomplete-debounce-input
                  v-model="store.form.satuan_k"
                  style="width:90%"
                  autocomplete="nama"
                  option-label="nama"
                  option-value="nama"
                  valid
                  label="Satuan Kecil"
                  autofocus
                  :source="store.satuanKs"
                  :loading="store.loadingSatuanK"
                  @buang="cariSatuanK"
                  @on-enter="scSatuanKec"
                />
                <q-icon
                  size="16px"
                  name="icon-mat-help_outline"
                  color="info"
                  class="cursor-pointer"
                >
                  <q-tooltip
                    anchor="top middle"
                    self="bottom middle"
                    :offset="[10, 10]"
                  >
                    <strong>Untuk Masukkan data ?</strong> <br>
                    <em>ketik data yang akan di input</em><br>
                    <em>contoh</em><br>
                    <strong>RSUD</strong><br>
                    <em>Lalu tekan Enter </em>
                  </q-tooltip>
                </q-icon>
              </div>
              <!-- Status Generik -->
              <div class="row q-mb-xs">
                <div class="col-12">
                  <app-autocomplete-debounce-input
                    v-model="store.form.status_generik"
                    autocomplete="nama"
                    option-label="nama"
                    option-value="value"
                    valid
                    label="Status Generik"
                    autofocus
                    :source="store.optionStatusGeneriks"
                  />
                </div>
              </div>
              <!-- Status Fornas -->
              <div class="row q-mb-xs">
                <div class="col-12">
                  <app-autocomplete-debounce-input
                    v-model="store.form.status_fornas"
                    autocomplete="nama"
                    option-label="nama"
                    option-value="value"
                    valid
                    label="Status Fornas"
                    autofocus
                    :source="store.optionStatusFornases"
                  />
                </div>
              </div>
              <!-- Status forkit -->
              <div class="row q-mb-xs">
                <div class="col-12">
                  <app-autocomplete-debounce-input
                    v-model="store.form.status_forkid"
                    autocomplete="nama"
                    option-label="nama"
                    option-value="value"
                    valid
                    label="Status Forkit"
                    autofocus
                    :source="store.optionStatusForkits"
                  />
                </div>
              </div>
              <!-- Nilai TKDN -->
              <div class="row q-mb-xs">
                <div class="col-12">
                  <app-input
                    v-model="store.form.nilai_kdn"
                    valid
                    label="Nilai TKDN"
                    :filled="false"
                  />
                </div>
              </div>
              <!-- Sertifukan tkdn -->
              <div class="row q-mb-xs">
                <div class="col-12">
                  <app-input
                    v-model="store.form.sertifikatkdn"
                    valid
                    label="Sertifikat TKDN"
                    :filled="false"
                    autofocus
                  />
                </div>
              </div>
            </div>
          </div>
          <!-- kelas terapi -->
          <div class="row q-col-gutter-md q-mb-md">
            <div class="col-6">
              <div
                :key="store.temp.kelas_terapi"
                class="row items-center justify-between q-mb-xs"
              >
                <app-autocomplete-debounce-input
                  ref="refKelasTerapi"
                  v-model="store.temp.kelas_terapi"
                  style="width:90%"
                  autocomplete="kelasterapi"
                  option-label="kelasterapi"
                  option-value="kelasterapi"
                  valid
                  label="Pilih kelas terapi"
                  autofocus
                  :source="store.kelasTerapis"
                  :loading="store.loadingKelasTerapi"
                  @buang="cariKelasTerapi"
                  @on-enter="scKelasTerapi"
                  @on-select="kelasTerapiSelected"
                />
                <q-icon
                  size="16px"
                  name="icon-mat-help_outline"
                  color="info"
                  class="cursor-pointer"
                >
                  <q-tooltip
                    anchor="top middle"
                    self="bottom middle"
                    :offset="[10, 10]"
                  >
                    <strong>Untuk Masukkan data ?</strong> <br>
                    <em>ketik data yang akan di input</em><br>
                    <em>contoh</em><br>
                    <strong>RSUD</strong><br>
                    <em>Lalu tekan Enter </em>
                  </q-tooltip>
                </q-icon>
              </div>
            </div>
            <div class="col-6">
              <div v-if="!store.form.kelasterapis.length">
                belum ada kelas terapi
              </div>
              <div v-if="store.form.kelasterapis.length">
                <div
                  v-for="(ter,i) in store.form.kelasterapis"
                  :key="i"
                  class="row justify-between items-center"
                >
                  <div>
                    {{ ter.kelasterapi }}
                  </div>
                  <div>
                    <q-icon
                      size="16px"
                      name="icon-mat-cancel"
                      color="negative"
                      class="cursor-pointer"
                      @click="hapusTerapi(i)"
                    >
                      <q-tooltip
                        anchor="top middle"
                        self="bottom middle"
                        :offset="[10, 10]"
                      >
                        Hapus
                      </q-tooltip>
                    </q-icon>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="row q-col-gutter-md" />
          <q-separator class="q-my-md" />
          <div class="text-right">
            <app-btn
              type="reset"
              color="dark"
              label="Cancel"
              class="q-mr-md"
            />
            <app-btn
              label="Simpan"
              :loading="store.loading"
            />
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { Dialog } from 'quasar'
import { findWithAttr } from 'src/modules/utils'
import { useMasterObatForm } from 'src/stores/simrs/master/farmasi/obat/form'
import { ref } from 'vue'

const refKelasTerapi = ref(null)
const store = useMasterObatForm()
// simpan cepat start --
function scKelompokPenyimpanan(val) {
  myDialog(store.simpanCepatKelompokPenyimpanan, val, 'Kelompok Penyimpanan')
}
function scSatuanKec(val) {
  myDialog(store.simpanCepatSatuanKec, val, 'Satuan Kecil')
}
function scSatuanBes(val) {
  myDialog(store.simpanCepatSatuanBes, val, 'Satuan Besar')
}
function scBentukSediaan(val) {
  myDialog(store.simpanCepatBentukSediaan, val, 'Bentuk Sediaan')
}
function scJenisPerbekalan(val) {
  myDialog(store.simpanCepatJenisPerbekalan, val, 'Jenis Perbekalan')
}
function scKandungan(val) {
  myDialog(store.simpanCepatKandungan, val, 'Kandungan / Nama Generik')
}
function scMerk(val) {
  myDialog(store.simpanCepatMerk, val, 'Merk')
}
function scVolumeSediaan(val) {
  myDialog(store.simpanCepatVolumeSediaan, val, 'Volume Sediaan')
}
function scKelasTerapi(val) {
  myDialog(store.simpanCepatKelasTerapi, val, 'Kelas Terapi')
}
function scJenisProduk(val) {
  myDialog(store.simpanCepatJenisProduk, val, 'Jenis Produk')
}
// simpan cepat end --
// set nama obat start---
function setNama(val) {
  if (!val.length) {
    store.deleteNamaObat('nama')
    store.setFormNamaObat()
    return
  }
  store.setNamaObat('nama', val)
  store.setFormNamaObat()
}
function jenisPerbekalanSelected(val) {
  store.setForm('jenis_perbekalan', val)
  store.setFormNamaObat()
}
function jenisPerbekalanCleared() {
  store.setFormNamaObat()
  store.deleteForm('jenis_perbekalan')
}
function merkSelected(val) {
  store.setForm('merk', val)
  store.setNamaObat('merk', val)
  store.setFormNamaObat()
}
function merkCleared() {
  // console.log('merk cleared', val)
  store.deleteForm('merk')
  store.deleteNamaObat('merk')
  store.setFormNamaObat()
}
function bentukSediaanSelected(val) {
  store.setForm('bentuk_sediaan', val)
  store.setNamaObat('bentukSediaan', val)
  store.setFormNamaObat()
}
function bentukSediaanCleared() {
  // console.log('bentukSediaan cleared', val)
  store.deleteNamaObat('bentukSediaan')
  store.deleteForm('bentuk_sediaan')
  store.setFormNamaObat()
}
function kekuatanDosisSelected(val) {
  // console.log('kekuatan dosis', val)
  store.setForm('kekuatan_dosis', val)
  store.setNamaObat('kekuatanDosis', val)
  store.setFormNamaObat()
}
function kekuatanDosisCleared() {
  store.deleteNamaObat('kekuatanDosis')
  store.deleteForm('kekuatan_dosis')
  store.setFormNamaObat()
}
function volumeSediaanSelected(val) {
  store.setForm('volumesediaan', val)
  store.setNamaObat('volumeSediaan', val)
  store.setFormNamaObat()
}
function volumeSediaanCleared() {
  store.deleteNamaObat('volumeSediaan')
  store.deleteForm('volumesediaan')
  store.setFormNamaObat()
}
// set nama obat end---
// cari start----
// cari jenis Produk
function cariJenisProduk(val) {
  // console.log('cari kandungan ', val)
  store.getJenisProduk(val)
}
// cari kandungan
function cariKandungan(val) {
  // console.log('cari kandungan ', val)
  store.getKandungan(val)
}

// cari jenis perbekalan
function cariJenisPerbekalan(val) {
  // console.log('cari kandungan ', val)
  store.getJenisPerbekalan(val)
}

// cari bentuk Sediaan
function cariBentukSediaan(val) {
  // console.log('cari kandungan ', val)
  store.getBetukSediaan(val)
}

// cari kekuatan dosis
function cariKekuatanDosis(val) {
  // console.log('cari kandungan ', val)
  store.getKekuatanDosis(val)
}

// cari Volume Sediaan
function cariVolumeSediaan(val) {
  // console.log('cari kandungan ', val)
  store.getVolumeSediaan(val)
}

// cari Satuan Besar
function cariSatuanB(val) {
  // console.log('cari kandungan ', val)
  store.getSatuanBes(val)
}

// cari Satuan Kecil
function cariSatuanK(val) {
  // console.log('cari kandungan ', val)
  store.getSatuanKec(val)
}

// cari Satuan Merk
function cariMerk(val) {
  // console.log('cari kandungan ', val)
  // store.getMerk(val)
}

// cari Satuan kelompok penyimpanan
function cariKelompokPenyimpanan(val) {
  // console.log('cari kandungan ', val)
  // store.getMerk(val)
}

// cari Satuan kelompok RKO
function cariKelompokRKO(val) {
  // console.log('cari kandungan ', val)
  store.getKelompokRKO(val)
}

// cari Kelas Terapi
function cariKelasTerapi(val) {
  // console.log('cari kandungan ', val)
  // store.getKelompokRKO(val)
}

// cari Kode Belanja
function cariKodeBelanja(val) {
  // console.log('cari kandungan ', val)
  // store.getMerk(val)
}
// cari end----

// Kelas terapi Dipilih
function kelasTerapiSelected(val) {
  console.log('kelas terapi dipilih val ', val)
  console.log('kelas terapi dipilih ', refKelasTerapi.value.$refs.refAuto)
  if (val !== null) {
    store.pushKelasTerapi(val)
  }
  store.temp.kelas_terapi = null
  refKelasTerapi.value.$refs.refAuto.updateInputValue('')
}
// Satuan Belanja Dipilih
function kodeBelanjaDipilih(val) {
  // console.log('kode belanja dipilih ', val)
  const index = findWithAttr(store.kodeBelanjas, 'kode', val)
  // console.log('kode belanja dipilih ', index)
  if (index >= 0) {
    const temp = store.kodeBelanjas[index]
    store.setForm('uraian108', temp.uraian)
    store.setForm('uraian50', temp.uraianB)
    store.setForm('kode50', temp.kodeB)
    // console.log('kode', temp)
  }
  // store.getMerk(val)
}

// hapus Kelas terapi
function hapusTerapi(val) {
  console.log('hapus', val)
  store.removeKelasTerapi(val)
}

// dialog
function myDialog(func, val, anu) {
  Dialog.create({
    title: 'Konfirmasi',
    message: `apakah anda akan menyimpan <strong>${anu} : <span style="color: red;" >${val}</span></strong> ?`,
    html: true,
    ok: {
      label: 'Simpan',
      push: true,
      color: 'primary',
      'no-caps': true
    },
    cancel: {
      label: 'Batal',
      color: 'dark',
      push: true,
      'no-caps': true
    }
  })
    .onOk((a) => {
      func(val)
    })
}
// trial function
// function coba(val) {
//   console.log('coba anu', val)
// }
// simpan
const onSubmit = () => {
  console.log('simpan', store.form)
  store.saveForm()
}
const onReset = () => {
  store.setOpen()
  // myDialog(coba, 'anu coab')
}
</script>
<style lang="scss" scoped>
.lebar{
  max-width:80vw;
  width:60vw;
}
</style>
