<template>
  <q-card
    flat
    bordered
    square
    class="full-height"
    style="overflow: hidden;"
  >
    <q-form
      ref="refForm"
      class="full-height"
      @submit="onSubmit"
    >
      <q-card-section class="q-px-md q-py-xs bg-primary text-white">
        <div class="row items-center justify-between">
          <div class="f-12 text-weight-bold">
            Form Triage
          </div>
          <div>
            <q-btn
              flat
              dense
              size="md"
              icon="icon-mat-history"
              @click="historyOpen"
            >
              <q-tooltip class="bg-dark text-white">
                {{ tooltip }}
              </q-tooltip>
            </q-btn>
          </div>
        </div>
      </q-card-section>
      <q-separator />
      <q-card-section
        class="full-height scroll"
      >
        <div
          class="row items-center"
        >
          <div class="col-2">
            Kategori Doa :
          </div>
          <div class="col-10">
            <q-checkbox ref="refdoa" size="md" v-model="store.form.doa" label="Tidak Ada Nafas" val="Tidak Ada Nafas" color="primary" @click="hidenall" />
            <q-checkbox ref="refdoa" size="md" v-model="store.form.doa" label="Tidak Ada Nadi" val="Tidak Ada Nadi" color="primary" @click="hidenall" />
            <q-checkbox ref="refdoa" size="md" v-model="store.form.doa" label="ECG Flat" val="ECG Flat" color="primary" @click="hidenall" />
            <q-checkbox ref="refdoa" size="md" v-model="store.form.doa" label="Pupil Medriasis" val="Pupil Medriasis" color="primary" @click="hidenall" />
            <q-checkbox ref="refdoa" size="md" v-model="store.form.doa" label="Reflek Cahaya Pupil" val="Reflek Cahaya Pupil" color="primary" @click="hidenall" />
          </div>
        </div>
        <q-separator />
        <div v-if="store.hiddenall === 'HIDUP'">
          <div class="row items-center q-pt-sm">
            <div class="col-2">
              Pasien Hamil...??
            </div>
            <div class="col-4">
              <q-option-group
                ref="refpasienhamil"
                v-model="store.form.pasienhamil"
                :options="optionhamil"
                color="primary"
                inline
                dense
                @update:model-value="flagstatus"
              />
            </div>
          </div>
          <q-separator class="q-my-xs" />
          <div v-if="store.form.pasienhamil === 1" class="q-pt-sm">
            <div class="row q-col-gutter-sm">
              <div class="col-6 q-pb-sm">
                <app-input-date
                  ref="refhaid"
                  :model="store.form.haid"
                  mask="date"
                  outlined
                  standout="bg-yellow-3"
                  label="Hari Pertama Haid Terakir"
                  @set-model="val=>store.form.haid=val"
                >
                  <template #append>
                    <q-icon name="event" class="cursor-pointer">
                      <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                        <q-date v-model="date">
                          <div class="row items-center justify-end">
                            <q-btn v-close-popup label="Close" color="primary" flat />
                          </div>
                        </q-date>
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </app-input-date>
              </div>
              <div class="col-6">
                <q-input
                  ref="refgravida"
                  dense
                  v-model="store.form.gravida"
                  outlined
                  standout="bg-yellow-3"
                  label="Gravida"
                  :rules="[val => !!val || 'Harap Diisi terlebih dahulu']"
                />
              </div>
            </div>
            <div class="row q-col-gutter-sm">
              <div class="col-6">
                <q-input
                  ref="refpartus"
                  v-model="store.form.partus"
                  outlined
                  dense
                  standout="bg-yellow-3"
                  label="Partus"
                  :rules="[val => !!val || 'Harap Diisi terlebih dahulu']"
                />
              </div>
              <div class="col-6">
                <q-input
                  ref="refabortus"
                  v-model="store.form.abortus"
                  outlined
                  dense
                  standout="bg-yellow-3"
                  label="Abortus"
                  :rules="[val => !!val || 'Harap Diisi terlebih dahulu']"
                />
              </div>
            </div>
            <q-separator class="q-my-xs" />
          </div>
          <div class="q-pt-sm">
            <div class="row q-col-gutter-sm q-pb-sm">
              <div class="col-6">
                <q-select
                  ref="refjalannafas"
                  v-model="store.form.jalannafas"
                  label="Jalan Nafas"
                  outlined
                  dense
                  transition-show="flip-up"
                  transition-hide="flip-down"
                  standout="bg-yellow-3"
                  fill-input
                  :options="jalannafas"
                  :rules="[val => !!val || 'Harap Diisi terlebih dahulu']"
                  @update:model-value="cekjalannafas"
                />
              </div>
              <div class="col-6">
                <q-select
                  ref="refpernapasan"
                  v-model="store.form.pernapasan"
                  label="Pernapasan"
                  outlined
                  dense
                  transition-show="flip-up"
                  transition-hide="flip-down"
                  standout="bg-yellow-3"
                  fill-input
                  :disable="store.form.jalannafas !== 'Bebas'"
                  :options="pernapasan"
                  :rules="[val => !!val || 'Harap Diisi terlebih dahulu']"
                  @update:model-value="ceksirkulasi"
                />
              </div>
            </div>
            <div class="row q-col-gutter-sm">
              <div class="col-6">
                <q-select
                  ref="refsirkulasi"
                  v-model="store.form.sirkulasi"
                  label="Sirkulasi"
                  outlined
                  dense
                  transition-show="flip-up"
                  transition-hide="flip-down"
                  standout="bg-yellow-3"
                  fill-input
                  :disable="store.form.jalannafas !== 'Bebas' || store.form.pernapasan !== 'Normal'"
                  :options="sirkulasi"
                  :rules="[val => !!val || 'Harap Diisi terlebih dahulu']"
                  @update:model-value="cekdisability"
                />
              </div>
              <div class="col-6">
                <q-select
                  ref="refdisability"
                  v-model="store.form.disability"
                  label="Disability"
                  outlined
                  dense
                  transition-show="flip-up"
                  transition-hide="flip-down"
                  standout="bg-yellow-3"
                  fill-input
                  :disable="store.form.jalannafas !== 'Bebas' || store.form.pernapasan !== 'Normal' || store.form.sirkulasi === 'Akral Dingin'
                    || store.form.sirkulasi === 'Nadi Tidak Terabah' || store.form.sirkulasi === 'Henti Jantung'"
                  :options="disability"
                  :rules="[val => !!val || 'Harap Diisi terlebih dahulu']"
                />
              </div>
            </div>
            <q-separator class="q-my-xs" />
          </div>
          <div class="q-pt-sm">
            <div class="row q-col-gutter-sm q-pb-sm">
              <div class="col-2">
                <q-input
                  ref="refnadi"
                  v-model="store.form.nadi"
                  label="Nadi(x/mnt)"
                  outlined
                  dense
                  type="number"
                  standout="bg-yellow-3"
                  :rules="[val => !!val || 'Harap Diisi terlebih dahulu']"
                  :disable="store.form.jalannafas !== 'Bebas' || store.form.pernapasan !== 'Normal' || store.form.sirkulasi === 'Akral Dingin'
                    || store.form.sirkulasi === 'Nadi Tidak Terabah' || store.form.sirkulasi === 'Henti Jantung'"
                  :debounce="1000"
                  @update:model-value="scorenadi()"
                />
              </div>
              <div class="col-2">
                <q-input
                  ref="refpernapasanx"
                  v-model="store.form.pernapasanx"
                  label="Pernapsan(x/mnt)"
                  outlined
                  dense
                  type="number"
                  standout="bg-yellow-3"
                  :rules="[val => !!val || 'Harap Diisi terlebih dahulu']"
                  :disable="store.form.jalannafas !== 'Bebas' || store.form.pernapasan !== 'Normal' || store.form.sirkulasi === 'Akral Dingin'
                    || store.form.sirkulasi === 'Nadi Tidak Terabah' || store.form.sirkulasi === 'Henti Jantung'"
                />
              </div>
              <div class="col-2">
                <q-input
                  ref="refsistole"
                  v-model="store.form.sistole"
                  label="Sistole(mmHg)"
                  outlined
                  dense
                  type="number"
                  standout="bg-yellow-3"
                  :rules="[val => !!val || 'Harap Diisi terlebih dahulu']"
                  :disable="store.form.jalannafas !== 'Bebas' || store.form.pernapasan !== 'Normal' || store.form.sirkulasi === 'Akral Dingin'
                    || store.form.sirkulasi === 'Nadi Tidak Terabah' || store.form.sirkulasi === 'Henti Jantung'"
                />
              </div>
              <div class="col-2">
                <q-input
                  ref="refdiastole"
                  v-model="store.form.diastole"
                  label="Diastole(mmHg)"
                  outlined
                  dense
                  type="number"
                  standout="bg-yellow-3"
                  :rules="[val => !!val || 'Harap Diisi terlebih dahulu']"
                  :disable="store.form.jalannafas !== 'Bebas' || store.form.pernapasan !== 'Normal' || store.form.sirkulasi === 'Akral Dingin'
                    || store.form.sirkulasi === 'Nadi Tidak Terabah' || store.form.sirkulasi === 'Henti Jantung'"
                />
              </div>
              <div class="col-2">
                <q-input
                  ref="refsuhu"
                  v-model="store.form.suhu"
                  label="Suhu"
                  outlined
                  dense
                  type="number"
                  standout="bg-yellow-3"
                  :rules="[val => !!val || 'Harap Diisi terlebih dahulu']"
                  :disable="store.form.jalannafas !== 'Bebas' || store.form.pernapasan !== 'Normal' || store.form.sirkulasi === 'Akral Dingin'
                    || store.form.sirkulasi === 'Nadi Tidak Terabah' || store.form.sirkulasi === 'Henti Jantung'"
                />
              </div>
              <div class="col-2">
                <q-input
                  ref="refspo2"
                  v-model="store.form.spo2"
                  label="SPo2(%)"
                  outlined
                  dense
                  type="number"
                  standout="bg-yellow-3"
                  :rules="[val => !!val || 'Harap Diisi terlebih dahulu']"
                  :disable="store.form.jalannafas !== 'Bebas' || store.form.pernapasan !== 'Normal' || store.form.sirkulasi === 'Akral Dingin'
                    || store.form.sirkulasi === 'Nadi Tidak Terabah' || store.form.sirkulasi === 'Henti Jantung'"
                />
              </div>
            </div>
            <div class="row q-col-gutter-sm q-pb-sm">
              <div class="col-6">
                <q-select
                  ref="refkesadaran"
                  v-model="store.form.kesadaran"
                  label="Kesadaran"
                  outlined
                  standout="bg-yellow-3"
                  dense
                  transition-show="flip-up"
                  transition-hide="flip-down"
                  :options="kesadaran"
                  :rules="[val => !!val || 'Harap Diisi terlebih dahulu']"
                  :disable="store.form.jalannafas !== 'Bebas' || store.form.pernapasan !== 'Normal' || store.form.sirkulasi === 'Akral Dingin'
                    || store.form.sirkulasi === 'Nadi Tidak Terabah' || store.form.sirkulasi === 'Henti Jantung'"
                />
              </div>
              <div class="col-6">
                <q-select
                  ref="refgsc"
                  v-model="store.form.gcs"
                  label="GCS"
                  outlined
                  standout="bg-yellow-3"
                  dense
                  transition-show="flip-up"
                  transition-hide="flip-down"
                  :options="gcs"
                  :rules="[val => !!val || 'Harap Diisi terlebih dahulu']"
                  :disable="store.form.jalannafas !== 'Bebas' || store.form.pernapasan !== 'Normal' || store.form.sirkulasi === 'Akral Dingin'
                    || store.form.sirkulasi === 'Nadi Tidak Terabah' || store.form.sirkulasi === 'Henti Jantung'"
                />
              </div>
            </div>
            <div class="row q-col-gutter-sm q-pb-sm">
              <div class="col-6">
                <q-input
                  ref="refbb"
                  v-model="store.form.bb"
                  label="BB/Kg"
                  outlined
                  standout="bg-yellow-3"
                  dense
                  :rules="[val => !!val || 'Harap Diisi terlebih dahulu']"
                  :disable="store.form.jalannafas !== 'Bebas' || store.form.pernapasan !== 'Normal' || store.form.sirkulasi === 'Akral Dingin'
                    || store.form.sirkulasi === 'Nadi Tidak Terabah' || store.form.sirkulasi === 'Henti Jantung'"
                />
              </div>
              <div class="col-6">
                <q-input
                  ref="reftinggibadan"
                  v-model="store.form.tinggibadan"
                  label="Tinggi Badan/Cm"
                  outlined
                  standout="bg-yellow-3"
                  dense
                  :rules="[val => !!val || 'Harap Diisi terlebih dahulu']"
                  :disable="store.form.jalannafas !== 'Bebas' || store.form.pernapasan !== 'Normal' || store.form.sirkulasi === 'Akral Dingin'
                    || store.form.sirkulasi === 'Nadi Tidak Terabah' || store.form.sirkulasi === 'Henti Jantung'"
                />
              </div>
            </div>
            <q-separator class="q-my-xs" />
          </div>
          <div v-if="store.form.pasienhamil === 1" class="q-pt-sm">
            <div class="row q-col-gutter-sm q-pb-sm">
              <div class="col-6">
                <q-select
                  ref="refnyeri"
                  v-model="store.form.nyeri"
                  label="Nyeri"
                  outlined
                  standout="bg-yellow-3"
                  dense
                  transition-show="flip-up"
                  transition-hide="flip-down"
                  :options="nyeri"
                  :rules="[val => !!val || 'Harap Diisi terlebih dahulu']"
                />
              </div>
              <div class="col-6">
                <q-select
                  ref="reflochea"
                  v-model="store.form.lochea"
                  label="Lochea"
                  outlined
                  standout="bg-yellow-3"
                  dense
                  transition-show="flip-up"
                  transition-hide="flip-down"
                  :options="lochea"
                  :rules="[val => !!val || 'Harap Diisi terlebih dahulu']"
                />
              </div>
            </div>
            <div class="row q-col-gutter-sm q-pb-sm">
              <div class="col-12">
                <q-select
                  ref="refproteinurin"
                  v-model="store.form.proteinurin"
                  label="Protein Urin"
                  outlined
                  standout="bg-yellow-3"
                  dense
                  transition-show="flip-up"
                  transition-hide="flip-down"
                  :options="proteinurin"
                  :rules="[val => !!val || 'Harap Diisi terlebih dahulu']"
                />
              </div>
            </div>
            <q-separator class="q-my-xs" />
          </div>
        </div>
        <div
          class="text-right q-mt-md"
          style="margin-bottom: 50px;"
        >
          <app-btn
            color="primary"
            label="Simpan Triage"
            tooltip="Simpan Data"
            type="submit"
            tip
            :loading="store.loadingForm"
          />
        </div>
      </q-card-section>
    </q-form>
  </q-card>
</template>

<script setup>
import { useQuasar } from 'quasar'
import { notifErr } from 'src/modules/utils'
import { useTriageIgd } from 'src/stores/simrs/igd/triage'
import { ref } from 'vue'
const store = useTriageIgd()
const emits = defineEmits(['openHistory'])

// eslint-disable-next-line no-unused-vars
const $q = useQuasar()

const refForm = ref(null)
const refgravida = ref(null)
const refhaid = ref(null)
const refpartus = ref(null)
const refabortus = ref(null)
const refjalannafas = ref(null)
const refpernapasan = ref(false)

const jalannafas = ref(['Bebas', 'Ancaman', 'Sumbatan'])
const pernapasan = ref(['Normal', 'Sumbatan Parsial', 'Trakipnone'])
const sirkulasi = ref(['Nadi Normal ', 'CTR > 2 dtk', 'Akral Dingin', 'Pucat', 'Takikardia', 'Brakikardia', 'Nadi Terabah Lemah', 'Nadi Tidak Terabah', 'Henti Jantung'])
const disability = ref(['Disability Normal', 'Hemiplegi', 'Hemiparesis', 'Gelisah', 'GCS 8 - 12', 'Tidak Ada Respon', 'Kejang', 'CGS < 8'])
const kesadaran = ref(['Alert', 'Verbal', 'Pain', 'Unrespon'])
const gcs = ref(['Eye', 'Verbal', 'Motorik'])
const nyeri = ref(['Normal', 'Abnormal'])
const lochea = ref(['Normal', 'Abnormal', 'NA'])
const proteinurin = ref(['+', '++>', 'NA'])

const optionhamil = ref([
  { label: 'Iya', value: 1 },
  { label: 'Tidak', value: 0 }
])

function flagstatus (val) {
  console.log('asasasa', props.pasien.kelamin)
  resetscore()

  if (val === 0) {
    clearhamil()
  }
  else {
    if (props.pasien.kelamin === 'Laki-laki') {
      notifErr('Pasien Laki-laki Tidak Bisa Hamil')
    }
    else {
      store.formattanggal()
      store.pasienhamil = val
    }
  }
}

function resetscore () {
  store.form.nadi = ''
  store.form.pernapasanx = ''
  store.form.sistole = ''
  store.form.diastole = ''
  store.form.suhu = ''
  store.form.spo2 = ''
  store.form.kesadaran = ''
  store.form.gcs = ''

  store.form.nyeri = ''
  store.form.lhocea = ''
  store.form.proteinurin = ''
}
function hidenall () {
  if (store.form.doa.length > 0) {
    store.hiddenall = 'MATI'
    tutupall()
  }
  else {
    store.hiddenall = 'HIDUP'
    delete store.form.doa
    store.form.doa = []
    store.form.pasienhamil = 0
  }
}

function tutupall () {
  clearhamil()
  kuis1()
}

function clearhamil () {
  delete store.form.haid
  delete store.form.gravida
  delete store.form.partus
  delete store.form.abortus
  delete store.form.nyeri
  delete store.form.lochea
  delete store.form.proteinurin
}

function kuis1 () {
  delete store.form.pasienhamil
  delete store.form.jalannafas
  delete store.form.pernapasan
  delete store.form.sirkulasi
  delete store.form.disability
  delete store.form.nadi
  delete store.form.pernapasanx
  delete store.form.sistole
  delete store.form.diastole
  delete store.form.suhu
  delete store.form.spo2
  delete store.form.bb
  delete store.form.tinggibadan
  delete store.form.kesadaran
  delete store.form.gsc
}

function cekjalannafas () {
  delete store.form.pernapasan
  delete store.form.sirkulasi
  delete store.form.disability
}

function ceksirkulasi () {
  delete store.form.sirkulasi
  delete store.form.disability
}

function cekdisability () {
  delete store.form.disability
}

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
  if (store.form.pasienhamil === 1) {
    store.saveData(props.pasien).then(() => {
      refForm.value.resetValidation()
    })
  }
  else {
    clearhamil()
    store.saveData(props.pasien).then(() => {
      refForm.value.resetValidation()
    })
  }
}

function scorenadi () {
  const umurleng = props.pasien?.usia.split(' ')
  const umur = parseInt(umurleng[0])
  if (store.form.pasienhamil === 1) {
    console.log('pasienx', umur)
  }
  else {
    if (umur > 17) {
      console.log('pasien', umur)
    }
  }
}

function historyOpen () {
  emits('openHistory')
  // store.getHistory(props.pasien?.norm)
}
store.formattanggal()

</script>
