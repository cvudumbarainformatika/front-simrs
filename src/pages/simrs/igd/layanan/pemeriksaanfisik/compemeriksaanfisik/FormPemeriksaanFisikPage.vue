<template>
  <div class="fit column absolute">
    <div class="col full-height ">
      <q-card
        flat
        bordered
        square
        class="full-height "
        style="overflow: hidden;"
      >
        <q-form
          ref="refForm"
          @submit="onSubmit"
          class="column full-height"
        >
          <q-card-section class="q-px-md q-py-xs bg-primary text-white col-auto full-width">
            <div class="row items-center justify-between">
              <div class="f-12 text-weight-bold">
                Form Pemeriksaan Fisik
              </div>
              <div>
                <q-btn
                  flat
                  dense
                  size="md"
                  icon="icon-mat-history"
                >
                  <q-tooltip class="bg-dark text-white" />
                </q-btn>
              </div>
            </div>
          </q-card-section>
          <q-card-section class="col full-height scroll">
            <div class="row q-col-gutter-sm ">
              <div class="col-12 text-bold">
                Pemeriksaan Psikologis, Sosial Ekonomi, Spiritual
              </div>
              <div class="col-6">
                <q-select
                  v-model="store.form.statuspsikologi"
                  transition-show="flip-up"
                  transition-hide="flip-down"
                  label="Status Psikologis"
                  dense
                  outlined
                  :options="options"
                />
              </div>
              <div class="col-6" v-if="store.form.statuspsikologi === 'Lain-lain'">
                <q-input
                  v-model="store.form.sebutkanstatuspsikologis"
                  transition-show="flip-up"
                  transition-hide="flip-down"
                  label="Sebutkan" dense
                />
              </div>
              <div class="col-6">
                <q-select v-model="store.form.sosial" label="Sosial" dense outlined :options="optionssosial" />
              </div>
              <div class="col-6">
                <q-input
                  v-model="store.form.ekonomi"
                  label="Ekonomi"
                  outlined
                  dense
                />
              </div>
              <div class="col-6">
                <q-select v-model="store.form.spiritual" label="Spiritual" dense outlined :options="optionsspiritual" />
              </div>
              <div class="col-6">
                <q-select v-model="store.form.kepercayaan" label="Nilai-nilai Kepercayaan & Budaya Yang Diyakini" dense outlined :options="optionskepercayaan" />
              </div>
              <div class="col-6" v-if="store.form.kepercayaan === 'Ya'">
                <q-input
                  v-model="store.form.sebutkankepercayaan"
                  label="Sebutkan" dense
                />
              </div>
              <div class="col-12 text-bold">
                <q-separator class="q-my-xs " />
                Pemeriksaan Pupil
              </div>
              <div class="col-6">
                <q-select v-model="store.form.keadaanpupil" dense outlined label="Keadaan Pupil" :options="optionspupil" />
              </div>
              <div class="col-12">
                - Reflek Cahaya
              </div>
              <div class="col-6">
                <q-select v-model="store.form.reflekmatakirikecahaya" label="Mata Kiri" dense outlined :options="optionsyreflekcahaya" />
              </div>
              <div class="col-6">
                <q-select v-model="store.form.reflekmatakanankecahaya" label="Mata Kanan" dense outlined :options="optionsyreflekcahaya" />
              </div>
              <div class="col-12">
                - Diameter (mm)
              </div>
              <div class="col-6">
                <q-input mask="##.#" v-model="store.form.diamterkiri" label="Diameter Kiri" dense outlined />
              </div>
              <div class="col-6">
                <q-input mask="##.#" v-model="store.form.diamterkanan" label="Diameter Kanan" dense outlined />
              </div>
              <div class="col-12 text-bold">
                <q-separator class="q-my-xs " />
                Anatomi
              </div>
              <div class="col-3 q-pa-md">
                <q-input type="textarea" v-model="store.form.anatomikepala" label="Kepala" outlined clearable />
              </div>
              <div class="col-3 q-pa-md">
                <q-input type="textarea" v-model="store.form.anatomileher" label="Leher" outlined clearable />
              </div>
              <div class="col-3 q-pa-md">
                <q-input type="textarea" v-model="store.form.anatomidada" label="Dada" outlined clearable />
              </div>
              <div class="col-3 q-pa-md">
                <q-input type="textarea" v-model="store.form.anatomipunggung" label="Punggung" outlined clearable />
              </div>
              <div class="col-3 q-pa-md">
                <q-input type="textarea" v-model="store.form.anatomiperut" label="Perut" outlined clearable />
              </div>
              <div class="col-3 q-pa-md">
                <q-input type="textarea" v-model="store.form.anatomitangan" label="Tangan" outlined clearable />
              </div>
              <div class="col-3 q-pa-md">
                <q-input type="textarea" v-model="store.form.anatomikaki" label="Kaki" outlined clearable />
              </div>
              <div class="col-3 q-pa-md">
                <q-input type="textarea" v-model="store.form.anatomineurologis" label="Status Neurologis" outlined clearable />
              </div>
              <div class="col-3 q-pa-md">
                <q-input type="textarea" v-model="store.form.anatomigenital" label="Genital" outlined clearable />
              </div>
            </div>
            <q-separator class="q-my-md" />
            <div
              class="text-right q-mt-md"
              style="margin-bottom: 50px;"
            >
              <app-btn
                color="primary"
                label="Simpan"
                tooltip="Simpan Data"
                type="submit"
                tip
                :loading="store.loadingForm"
              />
            </div>
          </q-card-section>
        </q-form>
        <div style="margin-bottom: 100px;" />
      </q-card>
    </div>
  </div>
</template>
<script setup>
import { usePemeriksaanfisikStore } from 'src/stores/simrs/igd/pemeriksaanfisik'
import { ref } from 'vue'

const refForm = ref()
const options = ref(['Tidak Ada Kelainan', 'Cemas', 'Takut', 'Marah', 'Sedih', 'Lain-lain'])
const optionssosial = ref(['Menarik Diri', 'Komunikasi Baik'])
const optionsspiritual = ref(['Perlu Bantuan', 'Tidak Perlu Bantuan'])
const optionskepercayaan = ref(['Tidak', 'Ya'])
const optionspupil = ref(['Isokor', 'Anisokor', 'Medriasis', 'Miosis', 'Pin Poin'])
const optionsyreflekcahaya = ref(['Positif', 'Negativ'])
const store = usePemeriksaanfisikStore()

const props = defineProps({
  pasien: {
    type: Object,
    default: null
  },
  tooltip: {
    type: String,
    default: 'History Pasien'
  }
})

function onSubmit () {
  store.saveData(props.pasien).then(() => {
    refForm.value.resetValidation()
  })
}

</script>
