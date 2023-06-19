<template>
  <q-dialog>
    <app-card
      class="my-card"
      title="Form Obat Baru"
      desc="Input data Obat Baru"
    >
      <template #content>
        <q-form
          ref="formReff"
          @submit="onSubmit"
          @reset="onReset"
        >
          <!-- bentuk nama Obat -->
          <div class="row q-col-gutter-md q-mb-md">
            <div class="col-md-6 col-xs-12">
              Nama Obat :
            </div>
            <div class="col-md-6 col-xs-12">
              {{ store.form.nama_obat ? store.form.nama_obat:'belum terbetuk nama obat' }}
            </div>
          </div>
          <!-- nama barang dan kelompok napza -->
          <div class="row q-col-gutter-md q-mb-xs">
            <div class="col-md-6 col-xs-12">
              <app-input
                v-model="store.form.nama"
                valid
                label="Nama Barang"
                :filled="false"
                autofocus
              />
            </div>
            <div class="col-md-6 col-xs-12">
              <app-input
                v-model="store.form.nama"
                valid
                label="Kelompok Napza"
                :filled="false"
                autofocus
              />
            </div>
          </div>
          <!-- merk dan kandungan -->
          <div class="row q-col-gutter-md q-mb-xs">
            <div class="col-md-6 col-xs-12">
              <app-input
                v-model="store.form.kd_obat"
                valid
                label="Merk"
                :filled="false"
              />
            </div>
            <div class="col-md-6 col-xs-12">
              <app-autocomplete-debounce-input
                v-model="store.form.kandungan"
                autocomplete="nama"
                option-label="nama"
                option-value="nama"
                valid
                label="Kandungan"
                autofocus
                :source="store.kandungans"
                :loading="store.loadingKandungan"
                @buang="cariKandungan"
              />
            </div>
          </div>
          <!-- jenis perbekalan dan bentuk sediaan -->
          <div class="row q-col-gutter-md q-mb-xs">
            <div class="col-md-6 col-xs-12">
              <app-autocomplete-debounce-input
                v-model="store.form.jenis_perbekalan"
                autocomplete="jenisperbekalan"
                option-label="jenisperbekalan"
                option-value="jenisperbekalan"
                valid
                label="Jenis Perbekalan"
                autofocus
                :source="store.jenisPerbekalans"
                :loading="store.loadingJenisPerbekalan"
                @buang="cariJenisPerbekalan"
              />
            </div>
            <div class="col-md-6 col-xs-12">
              <app-autocomplete-debounce-input
                v-model="store.form.bentuk_sediaan"
                autocomplete="bentuksediaan"
                option-label="bentuksediaan"
                option-value="bentuksediaan"
                valid
                label="Bentuk Sediaan"
                autofocus
                :source="store.bentukSediaans"
                :loading="store.loadingBentukSediaan"
                @buang="cariBentukSediaan"
              />
            </div>
          </div>
          <!-- Kode 108 dan Kode 50 -->
          <div class="row q-col-gutter-md q-mb-xs">
            <div class="col-md-6 col-xs-12">
              <app-input
                v-model="store.form.kd_obat"
                valid
                label="Kode 108"
                :filled="false"
              />
            </div>
            <div class="col-md-6 col-xs-12">
              <app-input
                v-model="store.form.nama"
                valid
                label="Kode 50"
                :filled="false"
                autofocus
              />
            </div>
          </div>
          <!-- Satuan dan satuan besar -->
          <div class="row q-col-gutter-md q-mb-xs">
            <div class="col-md-6 col-xs-12">
              <app-input
                v-model="store.form.kd_obat"
                valid
                label="Satuan"
                :filled="false"
              />
            </div>
            <div class="col-md-6 col-xs-12">
              <app-input
                v-model="store.form.nama"
                valid
                label="Satuan besar"
                :filled="false"
                autofocus
              />
            </div>
          </div>
          <!-- Kelompok penyimpanan dan Kelompok RKO -->
          <div class="row q-col-gutter-md q-mb-xs">
            <div class="col-md-6 col-xs-12">
              <app-input
                v-model="store.form.kd_obat"
                valid
                label="Kelompok Penyimpanan"
                :filled="false"
              />
            </div>
            <div class="col-md-6 col-xs-12">
              <app-input
                v-model="store.form.nama"
                valid
                label="Kelompok RKO"
                :filled="false"
                autofocus
              />
            </div>
          </div>
          <!-- Status Generik dan Status Forkit -->
          <div class="row q-col-gutter-md q-mb-xs">
            <div class="col-md-6 col-xs-12">
              <app-input
                v-model="store.form.kd_obat"
                valid
                label="Status Generik"
                :filled="false"
              />
            </div>
            <div class="col-md-6 col-xs-12">
              <app-input
                v-model="store.form.nama"
                valid
                label="Status Forkit"
                :filled="false"
                autofocus
              />
            </div>
          </div>
          <!-- Status fornas dan Kekuatan Dosis -->
          <div class="row q-col-gutter-md q-mb-xs">
            <div class="col-md-6 col-xs-12">
              <app-input
                v-model="store.form.kd_obat"
                valid
                label="Status Fornas"
                :filled="false"
              />
            </div>
            <div class="col-md-6 col-xs-12">
              <app-autocomplete-debounce-input
                v-model="store.form.kekuatan_dosis"
                autocomplete="kekuatandosis"
                option-label="kekuatandosis"
                option-value="kekuatandosis"
                valid
                label="Kekuatan Dosis"
                autofocus
                :source="store.kekuatanDosiss"
                :loading="store.loadingKekuatanDosis"
                @buang="cariKekuatanDosis"
              />
            </div>
          </div>
          <!-- Volume Sediaan dan Kelas Terapi -->
          <div class="row q-col-gutter-md q-mb-xs">
            <div class="col-md-6 col-xs-12">
              <app-autocomplete-debounce-input
                v-model="store.form.volumesediaan"
                autocomplete="volumesediaan"
                option-label="volumesediaan"
                option-value="volumesediaan"
                valid
                label="Volume Sediaan"
                autofocus
                :source="store.volumeSediaans"
                :loading="store.loadingVolumeSediaan"
                @buang="cariVolumeSediaan"
              />
            </div>
            <div class="col-md-6 col-xs-12">
              <app-input
                v-model="store.form.nama"
                valid
                label="Kelas Terapi"
                :filled="false"
                autofocus
              />
            </div>
          </div>
          <!-- Nilai KDN dan Sertifikat KDN -->
          <div class="row q-col-gutter-md q-mb-xs">
            <div class="col-md-6 col-xs-12">
              <app-input
                v-model="store.form.kd_obat"
                valid
                label="Nilai KDN"
                :filled="false"
              />
            </div>
            <div class="col-md-6 col-xs-12">
              <app-input
                v-model="store.form.nama"
                valid
                label="Sertifikat KDN"
                :filled="false"
                autofocus
              />
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
      </template>
    </app-card>
  </q-dialog>
</template>

<script setup>
import { useMasterObatForm } from 'src/stores/simrs/master/farmasi/obat/form'
import { ref } from 'vue'
const store = useMasterObatForm()
const formReff = ref(null)

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

// simpan
const onSubmit = () => {
  console.log('simpan', store.form)
  // store.saveForm().then(() => {
  //   if (formReff.value != null) { formReff.value.resetValidation() }
  // })
}
const onReset = () => {
  formReff.value.resetValidation()
  store.setOpen()
}
</script>
