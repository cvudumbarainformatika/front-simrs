<template>
  <q-form ref="myForm">
    <q-card-section>
      <div class="text-bold">
        PERSETUJUAN {{ menu?.title }}
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
            @update:model-value="cekHubunganPasien"
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

          <!-- Diagnosis -->

          <q-input
            v-model="store.form.indikasi"
            label="Pengertian"
            outlined
            standout="bg-yellow-3"
            rows="3"
            type="textarea"
            class="col-12"
          />

          <!-- <div class="text-bold">
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
          </div> -->

          <!-- <q-input
            v-model="store.form.tujuanLain"
            label="Tujuan"
            outlined
            standout="bg-yellow-3"
            rows="3"
            type="textarea"
            class="col-12"
          /> -->
          <!-- <q-input
            v-model="store.form.tatacara"
            label="Tata Cara"
            outlined
            standout="bg-yellow-3"
            rows="3"
            type="textarea"
            class="col-12"
          /> -->

          <!-- <div class="text-bold">
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
          </div> -->

          <!-- <q-input
            v-model="store.form.resikoLain"
            label="Resiko"
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
          /> -->
          <!-- <div class="col-12 flex items-center">
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
          /> -->

          <!-- <div class="col-12 flex items-center">
            <div>Apakah Pasien / Keluarga Setuju ? : </div>
            <q-radio class="q-ml-sm" size="md" v-model="store.form.setuju" v-for="aa in store.iyaTidaks" :key="aa" :label="aa" :val="aa" />
          </div> -->

          <app-input-simrs
            v-model="store.form.saksiPasien"
            label="Nama Saksi Pasien" class="col-6"
            :valid="{required:false}"
          />

          <!-- Tanda Tangan -->

          <!-- <div class="col-12">
            <q-separator class="q-my-md" />
            <div class="row q-col-gutter-sm">
              <div class="col-6" bordered style="min-height: 150px; border: 1px solid #ccc;">
                <div class="column full-height flex-center relative-position q-pa-sm">
                  <div v-if="!store.form.ttdYgMenyatakan" class="absolute-center">
                    Ttd yg Menyatakan
                  </div>
                  <TtdWacom
                    uuid="ttd-yg-menyatakan" :ttd-name="store.form.nama ?? 'yg menyatakan'"
                    @signature:ttd-yg-menyatakan="(val)=> {
                      // console.log('ttd yg menyatakan',val);
                      store.form.ttdYgMenyatakan = val
                    }"
                  />
                </div>
              </div>
              <div class="col-6" bordered style="min-height: 150px; border: 1px solid #ccc;">
                <div class="column full-height flex-center relative-position q-pa-sm">
                  <div v-if="!store.form.ttdSaksiPasien" class="absolute-center">
                    Ttd Saksi Pasien
                  </div>
                  <TtdWacom
                    uuid="ttd-saksi-pasien" :ttd-name="store.form.saksiPasien ?? 'saksi pasien'"
                    @signature:ttd-saksi-pasien="(val)=> {
                      console.log('ttd-saksi-pasien',val);
                      store.form.ttdSaksiPasien = val
                    }"
                  />
                </div>
              </div>
              <div class="col-6" bordered style="min-height: 150px; border: 1px solid #ccc;">
                <div class="column full-height flex-center relative-position q-pa-sm">
                  <div v-if="!store.form.ttdDokter" class="absolute-center">
                    Ttd Dokter
                  </div>
                  <TtdWacom
                    uuid="ttd-dokter" :ttd-name="store.form.pelaksana ?? 'nama dokter'"
                    @signature:ttd-dokter="(val)=> {
                      console.log('ttd-dokter',val);
                      store.form.ttdDokter = val
                    }"
                  />
                </div>
              </div>
              <div class="col-6" bordered style="min-height: 150px; border: 1px solid #ccc;">
                <div class="column full-height flex-center relative-position q-pa-sm">
                  <div v-if="!store.form.ttdPetugas" class="absolute-center">
                    Ttd Saksi RS
                  </div>
                  <TtdWacom
                    uuid="ttd-saksi-rs" :ttd-name="store.form.pengedukasi ?? 'nama saksi rs'"
                    @signature:ttd-saksi-rs="(val)=> {
                      console.log('ttd-saksi-rs',val);
                      store.form.ttdPetugas = val
                    }"
                  />
                </div>
              </div>
            </div>
          </div> -->

          <div class="col-12">
            <q-separator class="q-my-md" />
            <div class="row q-col-gutter-sm">
              <div class="col-6" bordered style="min-height: 150px; border: 1px solid #ccc;">
                <div class="column full-height flex-center relative-position q-pa-sm">
                  <div v-if="!store.form.ttdYgMenyatakan" class="absolute-center">
                    Ttd yg Menyatakan
                  </div>
                  <TtdWacom
                    uuid="ttd-yg-menyatakan" :ttd-name="store.form.nama ?? 'yg menyatakan'"
                    @signature:ttd-yg-menyatakan="(val)=> {
                      // console.log('ttd yg menyatakan',val);
                      store.form.ttdYgMenyatakan = val
                    }"
                  />
                </div>
              </div>
              <div class="col-6" bordered style="min-height: 150px; border: 1px solid #ccc;">
                <div class="column full-height flex-center relative-position q-pa-sm">
                  <div v-if="!store.form.ttdSaksiPasien" class="absolute-center">
                    Ttd Saksi Pasien
                  </div>
                  <TtdWacom
                    uuid="ttd-saksi-pasien" :ttd-name="store.form.saksiPasien ?? 'saksi pasien'"
                    @signature:ttd-saksi-pasien="(val)=> {
                      // console.log('ttd-saksi-pasien',val);
                      store.form.ttdSaksiPasien = val
                    }"
                  />
                </div>
              </div>
              <div class="col-6" bordered style="min-height: 150px; border: 1px solid #ccc;">
                <div class="column full-height flex-center relative-position q-pa-sm">
                  <div v-if="!store.form.ttdDokter" class="absolute-center">
                    Ttd Dokter
                  </div>
                  <TtdWacom
                    uuid="ttd-dokter" :ttd-name="store.form.pelaksana ?? 'nama dokter'"
                    @signature:ttd-dokter="(val)=> {
                      // console.log('ttd-dokter',val);
                      store.form.ttdDokter = val
                    }"
                  />
                </div>
              </div>
              <div class="col-6" bordered style="min-height: 150px; border: 1px solid #ccc;">
                <div class="column full-height flex-center relative-position q-pa-sm">
                  <div v-if="!store.form.ttdPetugas" class="absolute-center">
                    Ttd Saksi RS
                  </div>
                  <TtdWacom
                    uuid="ttd-saksi-rs" :ttd-name="store.form.pengedukasi ?? 'nama saksi rs'"
                    @signature:ttd-saksi-rs="(val)=> {
                      // console.log('ttd-saksi-rs',val);
                      store.form.ttdPetugas = val
                    }"
                  />
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
        type="button"
        color="primary"
        class="q-mb-xl"
        @click="onSubmit"
      />
    </q-card-actions>
  </q-form>
</template>

<script setup>
// eslint-disable-next-line no-unused-vars
import { notifErrVue } from 'src/modules/utils'
import { useConcernOperasiInvasifRanapStore } from 'src/stores/simrs/ranap/concernoperasiinvasif'
import { defineAsyncComponent, onMounted, ref, watch } from 'vue'

const store = useConcernOperasiInvasifRanapStore()

const TtdWacom = defineAsyncComponent(() => {
  return import('src/components/~static/TtdWacomStu540.vue')
})

// const wacomRef = ref(null)
onMounted(() => {
  store.initReset(props?.pasien, 'Colonoscopy')
  cekHubunganPasien()
})

const props = defineProps({
  pasien: {
    type: Object,
    default: null
  },
  menu: {
    type: Object,
    default: null
  }
})

const myForm = ref(null)
const wacomRef1 = ref(null)

const cekHubunganPasien = () => {
  const pasien = props.pasien
  const val = store.form.hubunganDgPasien
  if (val === 'Diri Sendiri') {
    store.form.nama = pasien?.nama
    store.form.noKtp = pasien?.nktp
    store.form.tglLahir = pasien?.tgllahir
    store.form.alamat = pasien?.alamat
    store.form.telepon = pasien?.nohp
    store.form.lp = pasien?.kelamin
  }
  else {
    store.form.nama = null
    store.form.noKtp = null
    store.form.tglLahir = null
    store.form.alamat = null
    store.form.telepon = null
    store.form.lp = null
  }
}

// function onSubmit () {
//   // console.log('onSubmit', store.form)
//   myForm.value.validate().then(success => {
//     if (success) {
//       // yay, models are correct
//       console.log('success')
//       store.saveData(props?.pasien, props?.menu?.name)
//     }
//     else {
//       // oh no, user has filled in
//       // at least one invalid value
//       console.log('failed')
//       // formRef.value?.refInputKu.focus()
//       // scrollToElement(formRef.value?.refInputKu.$el)
//       notifErrVue('Mohon Lengkapi Data Terlebih Dahulu')
//     }
//   })
// }

function onSubmit () {
  store.saveData(props?.pasien, props?.menu?.name)
}

watch(() => wacomRef1.value, (newVal, oldVal) => {
  console.log('wacomRef1 new', newVal?.cImage)
  console.log('wacomRef1 old', oldVal?.cImage)
}, { deep: true })

</script>
