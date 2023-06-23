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
          <!-- merk dan kandungan -->
          <div class="row q-col-gutter-md q-mb-xs">
            <div class="col-md-6 col-xs-12">
              <app-autocomplete-debounce-input
                v-model="store.form.merk"
                autocomplete="merk"
                option-label="merk"
                option-value="merk"
                valid
                label="Merk"
                autofocus
                :source="store.merks"
                :loading="store.loadingMerk"
                @buang="cariMerk"
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
          <div class="row q-col-gutter-md q-mb-xs items-center">
            <div class="col-md-6 col-xs-12">
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
            <div class="col-md-6 col-xs-12">
              <app-input
                v-if="store.form.uraian50"
                v-model="store.form.uraian50"
                disable
                label="Kode 50"
                :filled="false"
              />
              {{ store.form.uraian50?'':'pilih kode 108' }}
            </div>
          </div>
          <!-- Satuan dan satuan besar -->
          <div class="row q-col-gutter-md q-mb-xs">
            <div class="col-md-6 col-xs-12">
              <app-autocomplete-debounce-input
                v-model="store.form.satuan_b"
                autocomplete="nama"
                option-label="nama"
                option-value="nama"
                valid
                label="Satuan Besar"
                autofocus
                :source="store.satuanBs"
                :loading="store.loadingSatuanB"
                @buang="cariSatuanB"
              />
            </div>
            <div class="col-md-6 col-xs-12">
              <app-autocomplete-debounce-input
                v-model="store.form.satuan_k"
                autocomplete="nama"
                option-label="nama"
                option-value="nama"
                valid
                label="Satuan Kecil"
                autofocus
                :source="store.satuanKs"
                :loading="store.loadingSatuanK"
                @buang="cariSatuanK"
              />
            </div>
          </div>
          <!-- Kelompok penyimpanan dan Kelompok RKO -->
          <div class="row q-col-gutter-md q-mb-xs">
            <div class="col-md-6 col-xs-12">
              <app-autocomplete-debounce-input
                v-model="store.form.kelompok_penyimpanan"
                autocomplete="kelompokpenyimpanan"
                option-label="kelompokpenyimpanan"
                option-value="kelompokpenyimpanan"
                valid
                label="Kelompok Penyimpanan"
                autofocus
                :source="store.kelompokPenyimpanans"
                :loading="store.loadingKelompokPenyimpanan"
                @buang="cariKelompokPenyimpanan"
              />
            </div>
            <div class="col-md-6 col-xs-12">
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
          <!-- Status Generik dan Status Forkit -->
          <div class="row q-col-gutter-md q-mb-xs">
            <div class="col-md-6 col-xs-12">
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
            <div class="col-md-6 col-xs-12">
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
          <!-- Status fornas dan Kekuatan Dosis -->
          <div class="row q-col-gutter-md q-mb-xs">
            <div class="col-md-6 col-xs-12">
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
              <app-autocomplete-debounce-input
                v-model="store.form.kelas_terapi"
                autocomplete="kelasterapi"
                option-label="kelasterapi"
                option-value="kelasterapi"
                valid
                label="Kelas Terapi"
                autofocus
                :source="store.kelasTerapis"
                :loading="store.loadingKelasTerapi"
                @buang="cariKelasTerapi"
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
import { findWithAttr } from 'src/modules/utils'
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
