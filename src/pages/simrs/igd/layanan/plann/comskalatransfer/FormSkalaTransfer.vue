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
                Form Skala Transfer
              </div>
              <div>
                <q-btn
                  flat
                  dense
                  size="md"
                  icon="icon-mat-history"
                >
                  <q-tooltip class="bg-dark text-white">
                    {{ tooltip }}
                  </q-tooltip>
                </q-btn>
              </div>
            </div>
          </q-card-section>
          <q-card-section class="col full-height scroll">
            <q-card class="q-px-md q-py-md">
              <div class="row q-mb-sm">
                <div class="col-6 q-pr-sm">
                  <q-select
                    v-model="store.form.haemodinamik"
                    label="Haemodinamik"
                    dense
                    outlined
                    :options="optionsHaemodinamik"
                    @update:model-value="(val) => pilihhaemodinamik(val)"
                    :rules="[val => !!val || 'Harap Diisi terlebih dahulu']"
                  />
                </div>
                <div class="col-6">
                  <q-select
                    v-model="store.form.cardio"
                    label="Cardio"
                    dense
                    outlined
                    :options="optionscardio"
                    @update:model-value="(val) => pilihcardio(val)"
                    :rules="[val => !!val || 'Harap Diisi terlebih dahulu']"
                  />
                </div>
              </div>
              <div class="row q-mb-sm">
                <div class="col-6 q-pr-sm">
                  <q-select
                    v-model="store.form.ecgmonitor"
                    label="ECG Monitor"
                    dense
                    outlined
                    :options="optionsecgmonitor"
                    @update:model-value="(val) => pilihecgmonitor(val)"
                    :rules="[val => !!val || 'Harap Diisi terlebih dahulu']"
                  />
                </div>
                <div class="col-6">
                  <q-select
                    v-model="store.form.intravenusline"
                    label="Intravenusline"
                    dense
                    outlined
                    :options="optionintravenusline"
                    @update:model-value="(val) => pilihintravenusline(val)"
                    :rules="[val => !!val || 'Harap Diisi terlebih dahulu']"
                  />
                </div>
              </div>
              <div class="row q-mb-sm">
                <div class="col-6 q-pr-sm">
                  <q-select
                    v-model="store.form.provesionalpacemaker"
                    label="Provesional Pacemaker"
                    dense
                    outlined
                    :options="optionprovesionalpacameker"
                    @update:model-value="(val) => pilihprovesionalpacemaker(val)"
                    :rules="[val => !!val || 'Harap Diisi terlebih dahulu']"
                  />
                </div>
                <div class="col-6">
                  <q-select
                    v-model="store.form.respirasi"
                    label="Respirasi"
                    dense
                    outlined
                    :options="optioninRespirasi"
                    @update:model-value="(val) => pilihrespirasi(val)"
                    :rules="[val => !!val || 'Harap Diisi terlebih dahulu']"
                  />
                </div>
              </div>
              <div class="row q-mb-sm">
                <div class="col-6 q-pr-sm">
                  <q-select
                    label="Airways"
                    v-model="store.form.airways"
                    dense
                    outlined
                    :options="optionaitways"
                    @update:model-value="(val) => pilihairways(val)"
                    :rules="[val => !!val || 'Harap Diisi terlebih dahulu']"
                  />
                </div>
                <div class="col-6">
                  <q-select
                    label="Respiratory Support"
                    v-model="store.form.respritarorysupport"
                    dense
                    outlined
                    :options="optioninRespiratory"
                    @update:model-value="(val) => pilihrespiratory(val)"
                    :rules="[val => !!val || 'Harap Diisi terlebih dahulu']"
                  />
                </div>
              </div>
              <div class="row q-mb-sm">
                <div class="col-6 q-pr-sm">
                  <q-select
                    label="Kesadaran"
                    v-model="store.form.kesadaran"
                    dense
                    outlined
                    :options="optionkesadaran"
                    @update:model-value="(val) => pilihkesadaran(val)"
                    :rules="[val => !!val || 'Harap Diisi terlebih dahulu']"
                  />
                </div>
                <div class="col-6">
                  <q-select
                    label="Prematuritas"
                    v-model="store.form.prematurias"
                    dense
                    outlined
                    :options="optioninprematuritas"
                    @update:model-value="(val) => pilihprematurias(val)"
                    :rules="[val => !!val || 'Harap Diisi terlebih dahulu']"
                  />
                </div>
              </div>
              <div class="row q-mb-sm">
                <div class="col-6 q-pr-sm">
                  <q-select
                    label="Lanjut Usia"
                    v-model="store.form.lanjutusia"
                    dense
                    outlined
                    :options="optionLanjutusia"
                    @update:model-value="(val) => pilihlanjutusia(val)"
                    :rules="[val => !!val || 'Harap Diisi terlebih dahulu']"
                  />
                </div>
                <div class="col-6">
                  Total Score Skala Transfer = {{ store.form.scoretotal }} || Derajat Pasien = {{ store.form.drajattransfer }}
                </div>
              </div>
            </q-card>
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
      </q-card>
    </div>
  </div>
</template>
<script setup>

import { useSkalaTransfer } from 'src/stores/simrs/igd/skalatransfer'
import { ref } from 'vue'

const store = useSkalaTransfer()
const refForm = ref()
const optionsHaemodinamik = ref(['Stabil', 'Moderat (dengan terapi darah < 15 ml/mnt)', 'Unstable (dengan terapi darah > 15 ml/mnt dan atau terapi motropic)'])
const optionscardio = ref(['Aritmia Tidak Ada', 'Aritmia (tidak serius) atau IMA onset > 48 jam)', 'Aritmia (buruk) atau IMA onset < 48 jam'])
const optionsecgmonitor = ref(['Tidak perlu', 'Perlu', 'Sangat dibutuhkan'])
const optionintravenusline = ref(['Tidak', 'Iya', 'Terpasang CVC'])
const optionprovesionalpacameker = ref(['Tidak', 'Iya/Non Invasif', 'Endocavity'])
const optioninRespirasi = ref(['Antara 10-14 x/mnt', 'Antara 15-35 x/mnt', 'Abnoe/< 10 x/mnt/> 35 x/mnt'])

const optionaitways = ref(['Tanpa Alat', 'Mayo Tube', 'Intubasi'])
const optioninRespiratory = ref(['Tidak', 'Terapy O2', 'Ventilasi Mekanik'])

const optionkesadaran = ref(['GCS = 15', 'GCS 8-14', 'GCS < 8'])
const optioninprematuritas = ref(['Bayi baru lahir dengan BB > 2000 gr', 'Bayi baru lahir dengan BB antara 1200 - 2000 gr', 'Bayi baru lahir dengan BB < 1200 gr'])

const optionLanjutusia = ref(['Usia <= 60 tahun', 'Usia > 60 tahun', 'Usia > 60 tahun dengan Dellirium'])

const props = defineProps({
  pasien: {
    type: Object,
    default: null
  },
  ruangranap: {
    type: Object,
    default: null
  },
  triage: {
    type: Object,
    default: null
  },
  tooltip: {
    type: String,
    default: 'History Pasien'
  }
})

function pilihhaemodinamik (val) {
  console.log('val', val)
  if (val === 'Moderat (dengan terapi darah < 15 ml/mnt)') {
    store.form.scorehaemodinamik = 1
  }
  else if (val === 'Unstable (dengan terapi darah > 15 ml/mnt dan atau terapi motropic)') {
    store.form.scorehaemodinamik = 2
  }
  else {
    store.form.scorehaemodinamik = 0
  }
  hitungscore()
}
function pilihcardio (val) {
  if (val === 'Aritmia (tidak serius) atau IMA onset > 48 jam)') {
    store.form.scorecardio = 1
  }
  else if (val === 'Aritmia (buruk) atau IMA onset < 48 jam') {
    store.form.scorecardio = 2
  }
  else {
    store.form.scorecardio = 0
  }
  hitungscore()
}
function pilihecgmonitor (val) {
  if (val === 'Perlu') {
    store.form.scoreecgmonitor = 1
  }
  else if (val === 'Sangat dibutuhkan') {
    store.form.scoreecgmonitor = 2
  }
  else {
    store.form.scoreecgmonitor = 0
  }
  hitungscore()
}

function pilihintravenusline (val) {
  if (val === 'Iya') {
    store.form.scoreintravenusline = 1
  }
  else if (val === 'Terpasang CVC') {
    store.form.scoreintravenusline = 2
  }
  else {
    store.form.scoreintravenusline = 0
  }
  hitungscore()
}

function pilihprovesionalpacemaker (val) {
  if (val === 'Iya/Non Invasif') {
    store.form.scoreprovesionalpacemaker = 1
  }
  else if (val === 'Endocavity') {
    store.form.scoreprovesionalpacemaker = 2
  }
  else {
    store.form.scoreprovesionalpacemaker = 0
  }
  hitungscore()
}

function pilihrespirasi (val) {
  if (val === 'Antara 15-35 x/mnt') {
    store.form.scorerespirasi = 1
  }
  else if (val === 'Abnoe/< 10 x/mnt/> 35 x/mnt') {
    store.form.scorerespirasi = 2
  }
  else {
    store.form.scorerespirasi = 0
  }
  hitungscore()
}

function pilihairways (val) {
  if (val === 'Mayo Tube') {
    store.form.scoreairways = 1
  }
  else if (val === 'Intubasi') {
    store.form.scoreairways = 2
  }
  else {
    store.form.scoreairways = 0
  }
  hitungscore()
}

function pilihrespiratory (val) {
  if (val === 'Terapy O2') {
    store.form.scorerespiratorysupport = 1
  }
  else if (val === 'Ventilasi Mekanik') {
    store.form.scorerespiratorysupport = 2
  }
  else {
    store.form.scorerespiratorysupport = 0
  }
  hitungscore()
}

function pilihkesadaran (val) {
  if (val === 'GCS 8-14') {
    store.form.scorekesadaran = 1
  }
  else if (val === 'GCS < 8') {
    store.form.scorekesadaran = 2
  }
  else {
    store.form.scorekesadaran = 0
  }
  hitungscore()
}

function pilihprematurias (val) {
  if (val === 'Bayi baru lahir dengan BB antara 1200 - 2000 gr') {
    store.form.scoreprematurias = 1
  }
  else if (val === 'Bayi baru lahir dengan BB < 1200 gr') {
    store.form.scoreprematurias = 2
  }
  else {
    store.form.scoreprematurias = 0
  }
  hitungscore()
}

function pilihlanjutusia (val) {
  if (val === 'Usia > 60 tahun') {
    store.form.scorelanjutusia = 1
  }
  else if (val === 'Usia > 60 tahun dengan Dellirium') {
    store.form.scorelanjutusia = 2
  }
  else {
    store.form.scorelanjutusia = 0
  }
  hitungscore()
}

function hitungscore () {
  store.form.scoretotal = parseInt(store.form.scorehaemodinamik) + parseInt(store.form.scorecardio) + parseInt(store.form.scoreecgmonitor) + parseInt(store.form.scoreintravenusline) + parseInt(store.form.scoreprovesionalpacemaker) +
                          parseInt(store.form.scorerespirasi) + parseInt(store.form.scoreairways) + parseInt(store.form.scorerespiratorysupport) + parseInt(store.form.scorekesadaran) +
                           parseInt(store.form.scoreprematurias) + parseInt(store.form.scorelanjutusia)
  if (store.form.scoretotal >= 0 && store.form.scoretotal < 2) {
    store.form.drajattransfer = '0'
  }
  else if (store.form.scoretotal === 2) {
    store.form.drajattransfer = '0, 5'
  }
  else if (store.form.scoretotal >= 3 && store.form.scoretotal <= 5) {
    store.form.drajattransfer = '1'
  }
  else if (store.form.scoretotal >= 6 && store.form.scoretotal <= 8) {
    store.form.drajattransfer = '2'
  }
  else if (store.form.scoretotal >= 9) {
    store.form.drajattransfer = '3'
  }
}

function onSubmit () {
  // console.log(props.pasien)
  store.savePlan(props.pasien).then(() => {
    refForm.value.resetValidation()
  })
}
</script>
