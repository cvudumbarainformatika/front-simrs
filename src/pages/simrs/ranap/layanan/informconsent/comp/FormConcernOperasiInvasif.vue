<template>
  <div class="fit">
    <!-- <div class="full-height bg-white absolute-top z-top" style="width: 70%;">
      <preview-page />
    </div> -->
    <q-splitter
      v-model="splitterModel"
      :limits="[0, 100]"
      before-class="overflow-hidden"
      after-class="overflow-hidden"
      class="fit"
    >
      <template #before>
        <div class="full-height q-pa-lg scroll-y">
          <div class="text-h6">
            {{ menu?.label }}
          </div>
          <div>{{ menu?.desc }}</div>

          <q-card flat class="q-mt-md full-width">
            <q-form @submit="onSubmit">
              <q-card-section>
                <div class="text-bold">
                  PEMBERIAN EDUKASI PEMBERITAHUAN INFORMASI  OPERASI/TINDAKAN INVASIF DAN PERSETUJUAN / PENOLAKAN TINDAKAN
                </div>
                <q-separator class="q-my-md" />
                <div class="row full-width">
                  <div class="row q-col-gutter-sm">
                    <app-input-date
                      :model="store.form.tanggal"
                      label="Tanggal"
                      icon="icon-mat-event"
                      outlined
                      @set-model="val=>store.form.tanggal=val"
                      :autofocus="true"
                      class="col-4"
                    />
                    <app-autocomplete-new
                      ref="refPerawat"
                      :model="store.form.kdDokter"
                      label="Pelaksana Tindakan"
                      autocomplete="nama"
                      option-value="kdpegsimrs"
                      option-label="nama"
                      outlined
                      :source="store.dokters"
                      class="col-8"
                      @on-select="(val)=> {
                        store.form.kdDokter = val
                        store.form.pelaksana = store.dokters?.find(item => item.kdpegsimrs === val)?.nama
                      }"
                      @clear="()=> {
                        store.form.kdDokter = null
                        store.form.pelaksana = null
                      }"
                    />
                    <app-autocomplete-new
                      ref="refPerawat"
                      :model="store.form.kdPetugas"
                      label="Pemberi Informasi"
                      autocomplete="nama"
                      option-value="kdpegsimrs"
                      option-label="nama"
                      outlined
                      :source="store.nonNakes"
                      class="col-6"
                      @on-select="(val)=> {
                        store.form.kdPetugas = val
                        store.form.pengedukasi = store.nonNakes?.find(item => item?.kdpegsimrs === val)?.nama
                      }"
                      @clear="()=> {
                        store.form.kdPetugas = null
                        store.form.pengedukasi = null
                      }"
                    />

                    <q-select
                      label="Pilih Penerima Informasi / Pemberi Persetujuan"
                      outlined
                      standout="bg-yellow-3"
                      dense
                      class="col-6"
                      :options="store.hubunganDgPasiens"
                      v-model="store.form.hubunganDgPasien"
                      @update:model-value="(val) => {
                        console.log(val);
                        if (val === 'Diri Sendiri') {
                          store.form.nama = pasien?.nama
                          store.form.noKtp = pasien?.nktp
                          store.form.tglLahir = pasien?.tgllahir
                          store.form.alamat = pasien?.alamat
                          store.form.telepon = pasien?.nohp
                        } else {
                          store.form.nama = null
                          store.form.noKtp = null
                          store.form.tglLahir = null
                          store.form.alamat = null
                          store.form.telepon = null
                        }

                      }"
                    />
                    <app-input-simrs
                      v-if="store.form.hubunganDgPasien === 'Keluarga'" v-model="store.form.keluarga"
                      label="Jelaskan Hubungan Keluarga dengan Pasien" class="col-12"
                    />
                    <app-input-simrs
                      v-model="store.form.nama"
                      label="Nama Penerima Informasi / Pemberi Persetujuan" class="col-8"
                    />
                    <div class="col-4">
                      <q-radio class="q-ml-sm" size="md" v-model="store.form.lp" v-for="aa in store.jekels" :key="aa" :label="aa?.label" :val="aa?.value" />
                    </div>
                    <app-input-simrs
                      v-model="store.form.noKtp"
                      label="Nik/SIM/PASSPORT" class="col-4"
                    />
                    <app-input-date
                      :model="store.form.tglLahir"
                      label="Tanggal Lahir"
                      icon="icon-mat-event"
                      outlined
                      @set-model="val=>store.form.tglLahir=val"
                      :autofocus="false"
                      class="col-4"
                    />
                    <app-input-simrs
                      v-model="store.form.telepon"
                      label="No Telp / Hp" class="col-4"
                    />
                    <q-input
                      v-model="store.form.alamat"
                      label="Alamat"
                      outlined
                      standout="bg-yellow-3"
                      rows="3"
                      type="textarea"
                      class="col-12"
                    />
                    <div class="text-bold">
                      Pilih Diagnosis Dibawah
                    </div>
                    <div class="col-12">
                      <q-list separator bordered>
                        <q-item v-for="item in pasien?.diagnosamedis" :key="item" tag="label" v-ripple>
                          <q-item-section avatar>
                            <q-checkbox dense v-model="store.form.diagnosis" :val="item" color="teal" />
                          </q-item-section>
                          <q-item-section>
                            <q-item-label>{{ item?.masterdiagnosa?.rs4 }}</q-item-label>
                          </q-item-section>
                        </q-item>
                      </q-list>
                    </div>
                    <app-input-simrs
                      v-model="store.form.dasarDiagnosis"
                      label="Dasar Diagnosis" class="col-12"
                      :valid="{required:false}"
                    />
                    <q-input
                      v-model="store.form.tindakanMedis"
                      label="Tindakan Medis"
                      outlined
                      standout="bg-yellow-3"
                      rows="3"
                      type="textarea"
                      class="col-12"
                    />
                    <q-input
                      v-model="store.form.indikasi"
                      label="Indikasi"
                      outlined
                      standout="bg-yellow-3"
                      rows="3"
                      type="textarea"
                      class="col-12"
                    />

                    <div class="text-bold">
                      Pilih Tujuan Tindakan
                    </div>
                    <div class="col-12">
                      <q-list separator bordered>
                        <q-item v-for="item in store.tujuans" :key="item" tag="label" v-ripple>
                          <q-item-section avatar>
                            <q-checkbox dense v-model="store.form.tujuan" :val="item" color="teal" />
                          </q-item-section>
                          <q-item-section>
                            <q-item-label>{{ item }}</q-item-label>
                          </q-item-section>
                        </q-item>
                      </q-list>
                    </div>

                    <q-input
                      v-if="store.form.tujuan.includes('Lain-lain')"
                      v-model="store.form.tujuanLain"
                      label="Lain-lain "
                      outlined
                      standout="bg-yellow-3"
                      rows="3"
                      type="textarea"
                      class="col-12"
                    />
                    <q-input
                      v-model="store.form.tatacara"
                      label="Tata Cara"
                      outlined
                      standout="bg-yellow-3"
                      rows="3"
                      type="textarea"
                      class="col-12"
                    />

                    <div class="text-bold">
                      Pilih Resiko Tindakan
                    </div>
                    <div class="col-12">
                      <q-list separator bordered>
                        <q-item v-for="item in store.resikos" :key="item" tag="label" v-ripple>
                          <q-item-section avatar>
                            <q-checkbox dense v-model="store.form.resiko" :val="item" color="teal" />
                          </q-item-section>
                          <q-item-section>
                            <q-item-label>{{ item }}</q-item-label>
                          </q-item-section>
                        </q-item>
                      </q-list>
                    </div>

                    <q-input
                      v-if="store.form.resiko.includes('Lain-lain')"
                      v-model="store.form.resikoLain"
                      label="Resiko Lain-lain"
                      outlined
                      standout="bg-yellow-3"
                      rows="3"
                      type="textarea"
                      class="col-12"
                    />
                    <q-input
                      v-model="store.form.komplikasi"
                      label="Komplikasi"
                      outlined
                      standout="bg-yellow-3"
                      rows="3"
                      type="textarea"
                      class="col-12"
                    />
                    <div class="col-12 flex items-center">
                      <div>Prognosis : </div>
                      <q-checkbox class="q-ml-sm" size="md" v-model="store.form.prognosis" v-for="aa in store.prognosis" :key="aa" :label="aa" :val="aa" />
                    </div>

                    <q-input
                      v-model="store.form.alternatif"
                      label="Alternatif Tindakan"
                      outlined
                      standout="bg-yellow-3"
                      rows="3"
                      type="textarea"
                      class="col-12"
                    />

                    <div class="col-12 flex items-center">
                      <div>Apakah Pasien / Keluarga Setuju ? : </div>
                      <q-radio class="q-ml-sm" size="md" v-model="store.form.setuju" v-for="aa in store.iyaTidaks" :key="aa" :label="aa" :val="aa" />
                    </div>

                    <div class="col-12">
                      <div class="row q-col-gutter-sm">
                        <div class="col-6" bordered style="min-height: 150px; border: 1px solid #ccc;">
                          <div class="column full-height flex-center">
                            <!-- <div>Ttd yg Menyatakan</div>
                            <q-btn label="Tanda Tangan" color="dark" class="q-mt-sm" /> -->
                            <TtdWacom uuid="ttd-yg-menyatakan" ttd-name="nama yg menyatakan" />
                          </div>
                        </div>
                        <div class="col-6" bordered style="min-height: 150px; border: 1px solid #ccc;">
                          <div class="column full-height flex-center">
                            <!-- <div>Ttd Saksi Pasien</div>
                            <q-btn label="Tanda Tangan" color="dark" class="q-mt-sm" /> -->
                            <TtdWacom uuid="ttd-saksi-pasien" ttd-name="nama saksi pasien" />
                          </div>
                        </div>
                        <div class="col-6" bordered style="min-height: 150px; border: 1px solid #ccc;">
                          <div class="column full-height flex-center">
                            <!-- <div>Ttd Dokter</div>
                            <q-btn label="Tanda Tangan" color="dark" class="q-mt-sm" /> -->
                            <TtdWacom uuid="ttd-dokter" ttd-name="nama dokter" />
                          </div>
                        </div>
                        <div class="col-6" bordered style="min-height: 150px; border: 1px solid #ccc;">
                          <div class="column full-height flex-center">
                            <!-- <div>Ttd Saksi RS</div>
                            <q-btn label="Tanda Tangan" color="dark" class="q-mt-sm" /> -->
                            <TtdWacom uuid="ttd-saksi-rs" ttd-name="nama saksi rs" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </q-card-section>

              <q-card-actions align="right" class="q-pa-md ">
                <q-btn
                  :loading="store.loadingForm"
                  :disable="store.loadingForm"
                  label="Simpan Inform Concern"
                  type="submit"
                  color="primary"
                  class="q-mb-xl"
                />
              </q-card-actions>
            </q-form>
          </q-card>
        </div>
      </template>

      <template #after>
        <div class="column fit">
          list
          {{ pasien }}
        </div>
      </template>
    </q-splitter>
  </div>
</template>
<script setup>
import html2pdf from 'html2pdf.js'
import { useConcernOperasiInvasifRanapStore } from 'src/stores/simrs/ranap/concernoperasiinvasif'
import { defineAsyncComponent, onMounted, ref } from 'vue'

const store = useConcernOperasiInvasifRanapStore()

// eslint-disable-next-line no-unused-vars
const PreviewPage = defineAsyncComponent(() => {
  return import('./concernoperasi/PreviewPage.vue')
})

const TtdWacom = defineAsyncComponent(() => {
  return import('src/components/~static/TtdWacomStu540.vue')
})
onMounted(() => {
  store.initReset()
})

defineProps({
  pasien: {
    type: Object,
    default: null
  },
  menu: {
    type: Object,
    default: null
  }
})

const splitterModel = ref(70)

function onSubmit () {
  console.log(store.form)
}

// eslint-disable-next-line no-unused-vars
const exportPdf = () => {
  const concern = document.getElementById('inform-wrapper')

  const pdfConfig = {
    margin: 0,
    filename: 'inform-consent.pdf',
    image: {
      type: 'jpeg',
      quality: 0.98
    },
    html2canvas: {
      scale: 2,
      logging: true,
      dpi: 192,
      letterRendering: true
    },
    jsPDF: {
      unit: 'mm', // mm | pt | in
      format: 'letter', // a4 | letter
      orientation: 'portrait' // landscape | portrait
    }
  }

  html2pdf().set(pdfConfig).from(concern).save()
}
</script>

<style lang="scss" scoped>
#inform-wrapper {
  width: 210mm;
  margin-left: auto;
}

.edit-off {
  /*
      DIN A4 standard, paper size. commonly uses for printing
      For letter uses width:8.15in; height:11in
  */
  height: 297mm !important;
}
</style>
