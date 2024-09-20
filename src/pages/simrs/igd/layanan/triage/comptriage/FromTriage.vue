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
            Kategori D.O.A :
          </div>
          <div class="col-10">
            <q-checkbox
              v-for="(al, i) in store.doak"
              :key="i"
              v-model="store.doax"
              :val="al"
              :label="al"
              color="primary"
              @update:model-value="updateSelection"
              @click="hidenall"
            />
            <!-- <q-checkbox ref="refdoa" size="md" v-model="store.form.doa" label="Tidak Ada Nafas" val="Tidak Ada Nafas" color="primary" @click="hidenall" @update:model-value="updateSelection" />
            <q-checkbox ref="refdoa" size="md" v-model="store.form.doa" label="Tidak Ada Nadi" val="Tidak Ada Nadi" color="primary" @click="hidenall" @update:model-value="updateSelection" />
            <q-checkbox ref="refdoa" size="md" v-model="store.form.doa" label="ECG Flat" val="ECG Flat" color="primary" @click="hidenall" @update:model-value="updateSelection" />
            <q-checkbox ref="refdoa" size="md" v-model="store.form.doa" label="Pupil Medriasis" val="Pupil Medriasis" color="primary" @click="hidenall" @update:model-value="updateSelection" />
            <q-checkbox ref="refdoa" size="md" v-model="store.form.doa" label="Reflek Cahaya Pupil" val="Reflek Cahaya Pupil" color="primary" @click="hidenall" @update:model-value="updateSelection" /> -->
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
          <div v-if="store.form.pasienhamil === 1" class="q-pt-sm">
            <q-separator class="q-my-sm" />
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

            <div class="row q-col-gutter-sm q-pb-sm">
              <div class="col-4">
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
                  @update:model-value="(val) => scorenyeri(val)"
                />
              </div>
              <div class="col-4">
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
                  @update:model-value="(val) => scoreloche(val)"
                />
              </div>
              <div class="col-4">
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
                  @update:model-value="(val) => scoreproteinurin(val)"
                />
              </div>
              <div class="col-4 text-bold q-pt-none q-mt-none">
                Score Nyeri : {{ store.form.scorenyeri }}
              </div>
              <div class="col-4 text-bold q-pt-none q-mt-none">
                Score Lochea : {{ store.form.scorelochea }}
              </div>
              <div class="col-4 text-bold q-pt-none q-mt-none">
                Score Protein Urin : {{ store.form.scoreproteinurin }}
              </div>
            </div>
          </div>
          <q-separator class="q-my-sm" />
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
                :disable="store.form.jalannafas !== 'Bebas' || store.form.sirkulasi === 'Nadi Normal' || store.form.sirkulasi === 'CRT > 2 dtk' || store.form.sirkulasi === 'Akral Dingin'
                  || store.form.sirkulasi === 'Pucat' || store.form.sirkulasi === 'Takikardia' || store.form.sirkulasi === 'Bradikardia' || store.form.sirkulasi === 'Nadi Teraba Lemah'
                  || store.form.sirkulasi === 'Nadi Tidak Teraba' || store.form.sirkulasi === 'Henti Jantung'"
                :options="disability"
                :rules="[val => !!val || 'Harap Diisi terlebih dahulu']"
                @update:model-value="disabilitycekhasilsurve"
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
                :debounce="1000"
                @update:model-value="scorenadi()"
              />
            </div>
            <div class="col-2">
              <q-input
                ref="refpernapasanx"
                v-model="store.form.pernapasanx"
                label="Pernapasan(x/mnt)"
                outlined
                dense
                type="number"
                standout="bg-yellow-3"
                :rules="[val => !!val || 'Harap Diisi terlebih dahulu']"
                :debounce="1000"
                @update:model-value="scorepernapasanx()"
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
                @update:model-value="scoresistole()"
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
                @update:model-value="scorediastole()"
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
                @update:model-value="scoresuhu()"
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
                @update:model-value="scorespo2()"
              />
            </div>
            <div class="col-2 text-bold q-pt-none q-mt-none">
              Score Nadi : {{ store.form.scorenadi }}
            </div>
            <div class="col-2 text-bold q-pt-none q-mt-none">
              Score Pernapasan : {{ store.form.scorepernapasanx }}
            </div>
            <div class="col-2 text-bold q-pt-none q-mt-none">
              Score Sistole : {{ store.form.scoresistole }}
            </div>
            <div class="col-2 text-bold q-pt-none q-mt-none">
              Score Diastole : {{ store.form.scorediastole }}
            </div>
            <div class="col-2 text-bold q-pt-none q-mt-none">
              Score Suhu : {{ store.form.scoresuhu }}
            </div>
            <div class="col-2 text-bold q-pt-none q-mt-none">
              Score SPo2 : {{ store.form.scorespo2 }}
            </div>
          </div>
          <div class="row q-col-gutter-sm q-pb-sm">
            <div class="col-6">
              <q-select
                ref="refkesadaran"
                v-model="store.form.kesadaran"
                label="Kesadaran"
                emit-value
                map-options
                outlined
                standout="bg-yellow-3"
                dense
                transition-show="flip-up"
                transition-hide="flip-down"
                :options="kesadaran"
                :rules="[val => !!val || 'Harap Diisi terlebih dahulu']"
                @update:model-value="(val) => scorekesadaran(val)"
              />
            </div>
            <div class="col-2">
              <q-select
                ref="refeye"
                v-model="store.form.eye"
                label="Eye"
                outlined
                standout="bg-yellow-3"
                dense
                transition-show="flip-up"
                transition-hide="flip-down"
                :options="eye"
                :rules="[val => !!val || 'Harap Diisi terlebih dahulu']"
              />
            </div>
            <div class="col-2">
              <q-select
                ref="refverbal"
                v-model="store.form.verbal"
                label="Verbal"
                outlined
                standout="bg-yellow-3"
                dense
                transition-show="flip-up"
                transition-hide="flip-down"
                :options="verbal"
                :rules="[val => !!val || 'Harap Diisi terlebih dahulu']"
              />
            </div>
            <div class="col-2">
              <q-select
                ref="refmotorik"
                v-model="store.form.motorik"
                label="Motorik"
                outlined
                standout="bg-yellow-3"
                dense
                transition-show="flip-up"
                transition-hide="flip-down"
                :options="motorik"
                :rules="[val => !!val || 'Harap Diisi terlebih dahulu']"
              />
            </div>
            <div class="col-2 text-bold q-pt-none q-mt-none">
              Score Kesadaran : {{ store.form.scorekesadaran }}
            </div>
          </div>
          <div class="row q-col-gutter-sm q-pb-sm">
            <div class="col-6">
              <q-input
                ref="refbb"
                v-model="store.form.bb"
                label="BB/Kg"
                type="number"
                outlined
                standout="bg-yellow-3"
                dense
                :rules="[val => !!val || 'Harap Diisi terlebih dahulu']"
              />
            </div>
            <div class="col-6">
              <q-input
                ref="reftinggibadan"
                v-model="store.form.tinggibadan"
                label="Tinggi Badan/Cm"
                type="number"
                outlined
                standout="bg-yellow-3"
                dense
                :rules="[val => !!val || 'Harap Diisi terlebih dahulu']"
              />
            </div>
          </div>
          <div class="row q-col-gutter-sm q-pb-sm">
            <div class="col-6">
              <q-select
                ref="refgangguanperilaku"
                dense
                v-model="store.form.gangguanperilaku"
                outlined
                standout="bg-yellow-3"
                transition-show="flip-up"
                transition-hide="flip-down"
                :options="gangguanperilaku"
                label="Gangguan Perilaku"
              />
            </div>
            <div class="col-6">
              <q-checkbox
                ref="reffalsetriage"
                size="md"
                v-model="store.form.falsetriage"
                color="primary"
                val="False Triage"
                label="False Triage"
                @update:model-value="updateSelectionxx"
              />
            </div>
          </div>
          <q-separator class="q-my-xs" />
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
import { notifErrVue } from 'src/modules/utils'
import { useTriageIgd } from 'src/stores/simrs/igd/triage'
import { onBeforeMount, ref } from 'vue'
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
const reffalsetriage = ref(['False Triage'])

const jalannafas = ref(['Bebas', 'Ancaman', 'Sumbatan'])
const pernapasan = ref(['Normal', 'Sumbatan Parsial', 'Trakipnone', 'Sianosis', 'Bradipnoe', 'Henti Nafas'])
const sirkulasi = ref(['Nadi Normal ', 'CRT > 2 dtk', 'Akral Dingin', 'Pucat', 'Takikardia', 'Bradikardia', 'Nadi Teraba Lemah', 'Nadi Tidak Teraba', 'Henti Jantung'])
const disability = ref(['Disability Normal', 'Hemiplegi', 'Hemiparesis', 'Gelisah', 'GCS 8 - 12', 'Tidak Ada Respon', 'Kejang', 'GCS < 8'])
const kesadaran = ref(['Alert', 'Verbal', 'Pain', 'Unrespon'])
// const gcs = ref(['Eye', 'Verbal', 'Motorik'])
const nyeri = ref(['Normal', 'Abnormal'])
const lochea = ref(['Normal', 'Abnormal', 'NA'])
const proteinurin = ref(['+', '++>', 'NA'])
const gangguanperilaku = ref(['Tidak Terganggu', 'Tidak Membahayakan', 'Ada Gangguan', 'Membahayakan Diri Sendiri/Orang Lain'])

const eye = ref([1, 2, 3, 4])
const verbal = ref([1, 2, 3, 4, 5])
const motorik = ref([1, 2, 3, 4, 6])
const refpernapasan = ref(false)

const optionhamil = ref([
  { label: 'Iya', value: 1 },
  { label: 'Tidak', value: 0 }
])

function flagstatus (val) {
  console.log('asasasa', props.pasien.kelamin)
  resetscore()
  if (props.pasien.kelamin === 'Laki-laki') {
    store.form.pasienhamil = 0
    notifErrVue('Pasien Laki-laki Tidak Bisa Hamil', undefined)
  }
  else {
    if (val === 0) {
      clearhamil()
    }
    else {
      store.formattanggal()
      store.form.pasienhamil = val
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
  store.form.eye = ''
  store.form.verbal = ''
  store.form.motorik = ''

  store.form.nyeri = ''
  store.form.lochea = ''
  store.form.proteinurin = ''
}
function hidenall () {
  // store.setForm('doa', val.join(', '))
  if (store.form.doa.length > 0) {
    store.hiddenall = 'MATI'
    tutupall()
  }
  else {
    store.hiddenall = 'HIDUP'
    store.form.doa = null
    // store.form.doa = []
    store.form.pasienhamil = 0
  }
}

function tutupall () {
  clearhamil()
  kuis1()
}

function clearhamil () {
  // delete store.form.haid
  // delete store.form.gravida
  // delete store.form.partus
  // delete store.form.abortus
  // delete store.form.nyeri
  // delete store.form.lochea
  // delete store.form.proteinurin

  store.form.haid = null
  store.form.gravida = null
  store.form.partus = null
  store.form.abortus = null
  store.form.nyeri = null
  store.form.lochea = null
  store.form.proteinurin = null
}

function kuis1 () {
  // delete store.form.pasienhamil
  // delete store.form.jalannafas
  // delete store.form.pernapasan
  // delete store.form.sirkulasi
  // delete store.form.disability

  // delete store.form.nadi
  // delete store.form.pernapasanx
  // delete store.form.sistole
  // delete store.form.diastole
  // delete store.form.suhu
  // delete store.form.spo2
  // delete store.form.bb
  // delete store.form.tinggibadan
  // delete store.form.kesadaran
  // delete store.form.eye
  // delete store.form.verbal
  // delete store.form.motorik

  store.form.pasienhamil = null
  store.form.jalannafas = null
  store.form.pernapasan = null
  store.form.sirkulasi = null
  store.form.disability = null

  store.form.nadi = 0
  store.form.pernapasanx = 0
  store.form.sistole = 0
  store.form.diastole = 0
  store.form.suhu = 0
  store.form.spo2 = 0
  store.form.bb = 0
  store.form.tinggibadan = 0
  store.form.kesadaran = null
  store.form.eye = 0
  store.form.verbal = 0
  store.form.motorik = 0
}

function cekjalannafas (val) {
  store.form.pernapasan = null
  store.form.sirkulasi = null
  store.form.disability = null
  if (val === 'Sumbatan') {
    store.form.hasilprimarysurve = 'Resusitasi'
  }
  else if (val === 'Ancaman') {
    store.form.hasilprimarysurve = 'P1'
  }
  else {
    store.form.hasilprimarysurve = 0
  }
}

function ceksirkulasi (val) {
  store.form.sirkulasi = null
  store.form.disability = null

  if (val === 'Henti Nafas' || val === 'Bradipnoe' || val === 'Sianosis') {
    store.form.hasilprimarysurve = 'Resusitasi'
  }
  else if (val === 'Trakipnoe' || val === 'Sumbatan Parsial') {
    store.form.hasilprimarysurve = 'P1'
  }
  else {
    store.form.hasilprimarysurve = 0
  }
}

function cekdisability (val) {
  store.form.disability = null

  if (val === 'Henti Jantung' || val === 'Nadi Tidak Teraba' || val === 'Akral Dingin') {
    store.form.hasilprimarysurve = 'Resusitasi'
  }
  else if (val === 'Nadi Teraba Lemah' || val === 'Bradikardia' || val === 'Takikardia' || val === 'CRT > 2 dtk') {
    store.form.hasilprimarysurve = 'P1'
  }
  else {
    store.form.hasilprimarysurve = ''
  }
}

function disabilitycekhasilsurve (val) {
  if (val === 'Tidak Ada Respon' || val === 'Kejang' || val === 'GCS < 8') {
    store.form.hasilprimarysurve = 'Resusitasi'
  }
  else if (val === 'Hemiplegi' || val === 'Hemiparesis' || val === 'Gelisah' || val === 'GCS 8 - 12') {
    store.form.hasilprimarysurve = 'P1'
  }
  else {
    store.form.hasilprimarysurve = 0
  }
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
  const totalscore = ref(parseInt(store.form.scorenadi) + parseInt(store.form.scorepernapasanx) + parseInt(store.form.scoresistole) +
  parseInt(store.form.scorediastole) + parseInt(store.form.scoresuhu) + parseInt(store.form.scorespo2) + parseInt(store.form.scorekesadaran))

  store.form.totalscore = totalscore.value

  const hasilsecondsurvex = ref('')

  if (totalscore.value >= 7) {
    hasilsecondsurvex.value = 'Resusitasi'
  }
  else if (totalscore.value >= 5 && totalscore.value <= 6) {
    hasilsecondsurvex.value = 'P1'
  }
  else if (totalscore.value >= 2 && totalscore.value <= 4) {
    hasilsecondsurvex.value = 'P2'
  }
  else if (totalscore.value >= 0 && totalscore.value <= 1) {
    hasilsecondsurvex.value = 'P3'
  }

  if (store.form.falsetriage === true) {
    store.form.kategoritriage = 'False Triage'
  }
  else {
    if (store.form.hasilprimarysurve === 'Resusitasi') {
      store.form.kategoritriage = 'Resusitasi'
    }
    else if (store.form.hasilprimarysurve === 'P1' && hasilsecondsurvex.value === 'Resusitasi') {
      store.form.kategoritriage = 'P1'
    }
    else if (store.form.hasilprimarysurve === 'P1') {
      store.form.kategoritriage = 'P1'
    }
    else {
      store.form.kategoritriage = hasilsecondsurvex.value
    }
  }

  store.saveData(props.pasien, hasilsecondsurvex.value).then(() => {
    refForm.value.resetValidation()
  })
}

// function kategoritriage () {
//   const totalscore = parseInt(store.form.scorenadi) + parseInt(store.form.scorepernapasanx) + parseInt(store.form.scoresistole) +
//   parseInt(store.form.scorediastole) + parseInt(store.form.scoresuhu) + parseInt(store.form.scorespo2) + parseInt(store.form.scorekesadaran)

//   store.form.totalscore = totalscore

//   if (totalscore > 7) {
//     store.form.hasilsecondsurve = 'Resusitasi'
//   }
//   else if (totalscore >= 4 && totalscore <= 5) {
//     store.form.hasilsecondsurve = 'P1'
//   }
//   else if (totalscore >= 2 && totalscore <= 3) {
//     store.form.hasilsecondsurve = 'P2'
//   }
//   else if (totalscore >= 0 && totalscore <= 1) {
//     store.form.hasilsecondsurve = 'P3'
//   }

//   if (store.form.hasilprimarysurve === 'Resusitasi') {
//     store.form.kategoritriage = 'Resusitasi'
//   }
//   else if (store.form.hasilprimarysurve === 'P1' && store.form.hasilsecondsurve === 'Resusitasi') {
//     store.form.kategoritriage = 'P1'
//   }
//   else if (store.form.hasilprimarysurve === 'P1') {
//     store.form.kategoritriage = 'P1'
//   }
//   else {
//     store.form.hasilsecondsurve = store.form.kategoritriage
//   }
// }

function scorepernapasanx () {
  const umurleng = props.pasien?.usia.split(' ')
  const umur = parseInt(umurleng[0])
  const umurbln = parseInt(umurleng[2])

  if (store.form.pasienhamil === 1) {
    if (store.form.pernapasanx >= 1 && store.form.pernapasanx < 12) {
      store.form.scorepernapasanx = 3
    }
    else if (store.form.pernapasanx >= 12 && store.form.pernapasanx <= 20) {
      store.form.scorepernapasanx = 0
    }
    else if (store.form.pernapasanx >= 21 && store.form.pernapasanx <= 25) {
      store.form.scorepernapasanx = 2
    }
    else if (store.form.pernapasanx > 25) {
      store.form.scorepernapasanx = 3
    }
  }
  else {
    if (umur === 0 && umurbln >= 0 && umurbln <= 3) {
      if (store.form.pernapasanx >= 1 && store.form.pernapasanx < 15) {
        store.form.scorepernapasanx = 3
      }
      else if (store.form.pernapasanx >= 15 && store.form.pernapasanx < 20) {
        store.form.scorepernapasanx = 2
      }
      else if (store.form.pernapasanx >= 20 && store.form.pernapasanx < 30) {
        store.form.scorepernapasanx = 1
      }
      else if (store.form.pernapasanx >= 30 && store.form.pernapasanx <= 60) {
        store.form.scorepernapasanx = 0
      }
      else if (store.form.pernapasanx > 60 && store.form.pernapasanx <= 70) {
        store.form.scorepernapasanx = 1
      }
      else if (store.form.pernapasanx > 70 && store.form.pernapasanx <= 80) {
        store.form.scorepernapasanx = 2
      }
      else if (store.form.pernapasanx > 80) {
        store.form.scorepernapasanx = 3
      }
    }
    else if (umur === 0 && umurbln >= 4 && umurbln <= 11) {
      if (store.form.pernapasanx >= 1 && store.form.pernapasanx < 15) {
        store.form.scorepernapasanx = 3
      }
      else if (store.form.pernapasanx >= 15 && store.form.pernapasanx < 30) {
        store.form.scorepernapasanx = 1
      }
      else if (store.form.pernapasanx >= 30 && store.form.pernapasanx <= 50) {
        store.form.scorepernapasanx = 0
      }
      else if (store.form.pernapasanx >= 50 && store.form.pernapasanx <= 60) {
        store.form.scorepernapasanx = 1
      }
      else if (store.form.pernapasanx > 60 && store.form.pernapasanx <= 70) {
        store.form.scorepernapasanx = 2
      }
      else if (store.form.pernapasanx > 70) {
        store.form.scorepernapasanx = 3
      }
    }
    else if (umur >= 1 && umur <= 4) {
      if (store.form.pernapasanx >= 1 && store.form.pernapasanx < 15) {
        store.form.scorepernapasanx = 3
      }
      else if (store.form.pernapasanx >= 15 && store.form.pernapasanx < 20) {
        store.form.scorepernapasanx = 1
      }
      else if (store.form.pernapasanx >= 20 && store.form.pernapasanx <= 40) {
        store.form.scorepernapasanx = 0
      }
      else if (store.form.pernapasanx > 40 && store.form.pernapasanx <= 50) {
        store.form.scorepernapasanx = 1
      }
      else if (store.form.pernapasanx > 50 && store.form.pernapasanx <= 60) {
        store.form.scorepernapasanx = 2
      }
      else if (store.form.pernapasanx > 60) {
        store.form.scorepernapasanx = 3
      }
    }
    else if (umur >= 5 && umur <= 11) {
      if (store.form.pernapasanx >= 1 && store.form.pernapasanx < 10) {
        store.form.scorepernapasanx = 3
      }
      else if (store.form.pernapasanx >= 10 && store.form.pernapasanx < 15) {
        store.form.scorepernapasanx = 1
      }
      else if (store.form.pernapasanx >= 15 && store.form.pernapasanx <= 30) {
        store.form.scorepernapasanx = 0
      }
      else if (store.form.pernapasanx > 30 && store.form.pernapasanx <= 40) {
        store.form.scorepernapasanx = 1
      }
      else if (store.form.pernapasanx > 40 && store.form.pernapasanx <= 50) {
        store.form.scorepernapasanx = 2
      }
      else if (store.form.pernapasanx > 50) {
        store.form.scorepernapasanx = 3
      }
    }
    else if (umur >= 12 && umur <= 17) {
      if (store.form.pernapasanx >= 1 && store.form.pernapasanx < 10) {
        store.form.scorepernapasanx = 3
      }
      else if (store.form.pernapasanx >= 10 && store.form.pernapasanx < 15) {
        store.form.scorepernapasanx = 1
      }
      else if (store.form.pernapasanx >= 15 && store.form.pernapasanx <= 20) {
        store.form.scorepernapasanx = 0
      }
      else if (store.form.pernapasanx > 20 && store.form.pernapasanx <= 25) {
        store.form.scorepernapasanx = 1
      }
      else if (store.form.pernapasanx > 25 && store.form.pernapasanx <= 30) {
        store.form.scorepernapasanx = 2
      }
      else if (store.form.pernapasanx > 30) {
        store.form.scorepernapasanx = 3
      }
    }
    else if (umur > 17) {
      if (store.form.pernapasanx >= 1 && store.form.pernapasanx <= 8) {
        store.form.scorepernapasanx = 3
      }
      else if (store.form.pernapasanx >= 9 && store.form.pernapasanx <= 11) {
        store.form.scorepernapasanx = 1
      }
      else if (store.form.pernapasanx >= 12 && store.form.pernapasanx <= 20) {
        store.form.scorepernapasanx = 0
      }
      else if (store.form.pernapasanx >= 21 && store.form.pernapasanx <= 24) {
        store.form.scorepernapasanx = 2
      }
      else if (store.form.pernapasanx >= 25) {
        store.form.scorepernapasanx = 3
      }
    }
  }
}

function scorespo2 () {
  const umurleng = props.pasien?.usia.split(' ')
  const umur = parseInt(umurleng[0])
  const umurbln = parseInt(umurleng[2])

  if (store.form.pasienhamil === 1) {
    if (store.form.spo2 >= 1 && store.form.spo2 < 92) {
      store.form.scorespo2 = 3
    }
    else if (store.form.spo2 >= 92 && store.form.spo2 <= 95) {
      store.form.scorespo2 = 2
    }
    else if (store.form.spo2 > 95) {
      store.form.scorespo2 = 0
    }
  }
  else {
    if (umur === 0 && umurbln >= 0 && umurbln <= 3) {
      if (store.form.spo2 >= 1 && store.form.spo2 <= 85) {
        store.form.scorespo2 = 3
      }
      else if (store.form.spo2 >= 86 && store.form.spo2 <= 89) {
        store.form.scorespo2 = 2
      }
      else if (store.form.spo2 >= 90 && store.form.spo2 <= 93) {
        store.form.scorespo2 = 1
      }
      else if (store.form.spo2 >= 94) {
        store.form.scorespo2 = 0
      }
    }
    else if (umur === 0 && umurbln >= 4 && umurbln <= 11) {
      if (store.form.spo2 >= 1 && store.form.spo2 <= 85) {
        store.form.scorespo2 = 3
      }
      else if (store.form.spo2 >= 86 && store.form.spo2 <= 89) {
        store.form.scorespo2 = 2
      }
      else if (store.form.spo2 >= 90 && store.form.spo2 <= 93) {
        store.form.scorespo2 = 1
      }
      else if (store.form.spo2 >= 94) {
        store.form.scorespo2 = 0
      }
    }
    else if (umur >= 1 && umur <= 4) {
      if (store.form.spo2 >= 1 && store.form.spo2 <= 85) {
        store.form.scorespo2 = 3
      }
      else if (store.form.spo2 >= 86 && store.form.spo2 <= 89) {
        store.form.scorespo2 = 2
      }
      else if (store.form.spo2 >= 90 && store.form.spo2 <= 93) {
        store.form.scorespo2 = 1
      }
      else if (store.form.spo2 >= 94) {
        store.form.scorespo2 = 0
      }
    }
    else if (umur >= 5 && umur <= 11) {
      if (store.form.spo2 >= 1 && store.form.spo2 <= 85) {
        store.form.scorespo2 = 3
      }
      else if (store.form.spo2 >= 86 && store.form.spo2 <= 89) {
        store.form.scorespo2 = 2
      }
      else if (store.form.spo2 >= 90 && store.form.spo2 <= 93) {
        store.form.scorespo2 = 1
      }
      else if (store.form.spo2 >= 94) {
        store.form.scorespo2 = 0
      }
    }
    else if (umur >= 12 && umur <= 17) {
      if (store.form.spo2 >= 1 && store.form.spo2 <= 85) {
        store.form.scorespo2 = 3
      }
      else if (store.form.spo2 >= 86 && store.form.spo2 <= 89) {
        store.form.scorespo2 = 2
      }
      else if (store.form.spo2 >= 90 && store.form.spo2 <= 93) {
        store.form.scorespo2 = 1
      }
      else if (store.form.spo2 >= 94) {
        store.form.scorespo2 = 0
      }
    }
    else if (umur > 17) {
      if (store.form.spo2 >= 1 && store.form.spo2 <= 91) {
        store.form.scorespo2 = 3
      }
      else if (store.form.spo2 >= 92 && store.form.spo2 <= 93) {
        store.form.scorespo2 = 2
      }
      else if (store.form.spo2 >= 94 && store.form.spo2 <= 95) {
        store.form.scorespo2 = 1
      }
      else if (store.form.spo2 >= 96) {
        store.form.scorespo2 = 0
      }
    }
  }
}

function scoresistole () {
  const umurleng = props.pasien?.usia.split(' ')
  const umur = parseInt(umurleng[0])
  // const umurbln = parseInt(umurleng[2])

  if (store.form.pasienhamil === 1) {
    if (store.form.sistole < 90) {
      store.form.scoresistole = 3
    }
    else if (store.form.sistole >= 90 && store.form.sistole <= 140) {
      store.form.scoresistole = 0
    }
    else if (store.form.sistole >= 141 && store.form.sistole <= 150) {
      store.form.scoresistole = 1
    }
    else if (store.form.sistole >= 151 && store.form.sistole <= 160) {
      store.form.scoresistole = 2
    }
    else if (store.form.sistole > 160) {
      store.form.scoresistole = 3
    }
  }
  else {
    if (umur >= 1 && umur <= 4) {
      if (store.form.sistole < 70) {
        store.form.scoresistole = 3
      }
      else if (store.form.sistole < 80) {
        store.form.scoresistole = 2
      }
      else if (store.form.sistole < 90) {
        store.form.scoresistole = 1
      }
      else if (store.form.sistole >= 90 && store.form.sistole <= 110) {
        store.form.scoresistole = 0
      }
      else if (store.form.sistole > 110 && store.form.sistole <= 120) {
        store.form.scoresistole = 1
      }
      else if (store.form.sistole > 120 && store.form.sistole <= 130) {
        store.form.scoresistole = 2
      }
      else if (store.form.sistole > 130) {
        store.form.scoresistole = 3
      }
    }
    else if (umur >= 5 && umur <= 11) {
      if (store.form.sistole < 80) {
        store.form.scoresistole = 3
      }
      else if (store.form.sistole < 90) {
        store.form.scoresistole = 1
      }
      else if (store.form.sistole >= 90 && store.form.sistole <= 120) {
        store.form.scoresistole = 0
      }
      else if (store.form.sistole > 120 && store.form.sistole <= 130) {
        store.form.scoresistole = 1
      }
      else if (store.form.sistole > 130 && store.form.sistole <= 140) {
        store.form.scoresistole = 2
      }
      else if (store.form.sistole > 140) {
        store.form.scoresistole = 3
      }
    }
    else if (umur >= 12 && umur <= 17) {
      if (store.form.sistole < 90) {
        store.form.scoresistole = 3
      }
      else if (store.form.sistole < 110) {
        store.form.scoresistole = 1
      }
      else if (store.form.sistole >= 110 && store.form.sistole <= 120) {
        store.form.scoresistole = 0
      }
      else if (store.form.sistole > 120 && store.form.sistole <= 130) {
        store.form.scoresistole = 1
      }
      else if (store.form.sistole > 130 && store.form.sistole <= 150) {
        store.form.scoresistole = 2
      }
      else if (store.form.sistole > 150) {
        store.form.scoresistole = 3
      }
    }
    else if (umur > 17) {
      if (store.form.sistole <= 90) {
        store.form.scoresistole = 3
      }
      else if (store.form.sistole >= 91 && store.form.sistole <= 100) {
        store.form.scoresistole = 2
      }
      else if (store.form.sistole >= 101 && store.form.sistole <= 110) {
        store.form.scoresistole = 1
      }
      else if (store.form.sistole >= 111 && store.form.sistole <= 219) {
        store.form.scoresistole = 0
      }
    }
  }
}

function scorediastole () {
  // const umurleng = props.pasien?.usia.split(' ')
  // const umur = parseInt(umurleng[0])
  // const umurbln = parseInt(umurleng[2])

  if (store.form.pasienhamil === 1) {
    if (store.form.diastole >= 60 && store.form.diastole <= 90) {
      store.form.scorediastole = 0
    }
    else if (store.form.diastole >= 91 && store.form.diastole <= 100) {
      store.form.scorediastole = 1
    }
    else if (store.form.diastole >= 101 && store.form.diastole <= 110) {
      store.form.scorediastole = 2
    }
    else if (store.form.diastole > 110) {
      store.form.scorediastole = 3
    }
    else {
      store.form.scorediastole = 0
    }
  }
  else {
    store.form.scorediastole = 0
  }
}

function scoresuhu () {
  const umurleng = props.pasien?.usia.split(' ')
  const umur = parseInt(umurleng[0])
  // const umurbln = parseInt(umurleng[2])

  if (store.form.pasienhamil === 1) {
    if (store.form.suhu >= 1 && store.form.suhu < 36) {
      store.form.scoresuhu = 3
    }
    else if (store.form.suhu >= 36.1 && store.form.suhu <= 37.2) {
      store.form.scoresuhu = 0
    }
    else if (store.form.suhu >= 37.3 && store.form.suhu <= 37.7) {
      store.form.scoresuhu = 2
    }
    else if (store.form.suhu > 37.7) {
      store.form.scoresuhu = 3
    }
  }
  else if (umur > 17) {
    if (store.form.suhu >= 1 && store.form.suhu < 35) {
      store.form.scoresuhu = 3
    }
    else if (store.form.suhu >= 35.1 && store.form.suhu <= 36) {
      store.form.scoresuhu = 1
    }
    else if (store.form.suhu >= 36.1 && store.form.suhu <= 38) {
      store.form.scoresuhu = 0
    }
    else if (store.form.suhu >= 38.1 && store.form.suhu <= 39) {
      store.form.scoresuhu = 1
    }
    else if (store.form.suhu >= 39.1) {
      store.form.scoresuhu = 2
    }
  }
}

function scorenadi () {
  const umurleng = props.pasien?.usia.split(' ')
  const umur = parseInt(umurleng[0])
  const umurbln = parseInt(umurleng[2])

  if (store.form.pasienhamil === 1) {
    if (store.form.nadi < 50) {
      store.form.scorenadi = 3
    }
    else if (store.form.nadi >= 50 && store.form.nadi <= 60) {
      store.form.scorenadi = 2
    }
    else if (store.form.nadi >= 61 && store.form.nadi <= 100) {
      store.form.scorenadi = 0
    }
    else if (store.form.nadi >= 101 && store.form.nadi <= 110) {
      store.form.scorenadi = 1
    }
    else if (store.form.nadi >= 111 && store.form.nadi <= 120) {
      store.form.scorenadi = 2
    }
    else if (store.form.nadi > 120) {
      store.form.scorenadi = 3
    }
  }
  else if (umur === 0 && umurbln >= 0 && umurbln <= 3) {
    if (store.form.nadi < 80) {
      store.form.scorenadi = 3
    }
    else if (store.form.nadi < 90) {
      store.form.scorenadi = 2
    }
    else if (store.form.nadi < 110) {
      store.form.scorenadi = 1
    }
    else if (store.form.nadi >= 110 && store.form.nadi <= 150) {
      store.form.scorenadi = 0
    }
    else if (store.form.nadi > 150 && store.form.nadi <= 180) {
      store.form.scorenadi = 1
    }
    else if (store.form.nadi > 180 && store.form.nadi <= 190) {
      store.form.scorenadi = 2
    }
    else if (store.form.nadi > 190) {
      store.form.scorenadi = 3
    }
  }
  else if (umur === 0 && umurbln >= 4 && umurbln <= 11) {
    if (store.form.nadi < 70) {
      store.form.scorenadi = 3
    }
    else if (store.form.nadi < 100) {
      store.form.scorenadi = 1
    }
    else if (store.form.nadi >= 100 && store.form.nadi <= 150) {
      store.form.scorenadi = 0
    }
    else if (store.form.nadi > 150 && store.form.nadi <= 170) {
      store.form.scorenadi = 1
    }
    else if (store.form.nadi > 170 && store.form.nadi <= 180) {
      store.form.scorenadi = 2
    }
    else if (store.form.nadi > 180) {
      store.form.scorenadi = 3
    }
  }
  else if (umur >= 1 && umur <= 4) {
    if (store.form.nadi < 60) {
      store.form.scorenadi = 3
    }
    else if (store.form.nadi < 80) {
      store.form.scorenadi = 1
    }
    else if (store.form.nadi >= 80 && store.form.nadi <= 130) {
      store.form.scorenadi = 0
    }
    else if (store.form.nadi > 130 && store.form.nadi <= 150) {
      store.form.scorenadi = 1
    }
    else if (store.form.nadi > 150 && store.form.nadi <= 170) {
      store.form.scorenadi = 2
    }
    else if (store.form.nadi > 170) {
      store.form.scorenadi = 3
    }
  }
  else if (umur >= 5 && umur <= 11) {
    if (store.form.nadi < 50) {
      store.form.scorenadi = 3
    }
    else if (store.form.nadi < 70) {
      store.form.scorenadi = 1
    }
    else if (store.form.nadi >= 70 && store.form.nadi <= 110) {
      store.form.scorenadi = 0
    }
    else if (store.form.nadi > 110 && store.form.nadi <= 130) {
      store.form.scorenadi = 1
    }
    else if (store.form.nadi > 130 && store.form.nadi <= 150) {
      store.form.scorenadi = 2
    }
    else if (store.form.nadi > 150) {
      store.form.scorenadi = 3
    }
  }
  else if (umur >= 12 && umur <= 17) {
    if (store.form.nadi < 40) {
      store.form.scorenadi = 3
    }
    else if (store.form.nadi < 60) {
      store.form.scorenadi = 1
    }
    else if (store.form.nadi >= 60 && store.form.nadi <= 100) {
      store.form.scorenadi = 0
    }
    else if (store.form.nadi > 100 && store.form.nadi <= 120) {
      store.form.scorenadi = 1
    }
    else if (store.form.nadi > 120 && store.form.nadi <= 140) {
      store.form.scorenadi = 2
    }
    else if (store.form.nadi > 140) {
      store.form.scorenadi = 3
    }
  }
  else if (umur > 17) {
    if (store.form.nadi <= 40) {
      store.form.scorenadi = 3
    }
    else if (store.form.nadi >= 41 && store.form.nadi <= 50) {
      store.form.scorenadi = 1
    }
    else if (store.form.nadi >= 51 && store.form.nadi <= 90) {
      store.form.scorenadi = 0
    }
    else if (store.form.nadi >= 91 && store.form.nadi <= 110) {
      store.form.scorenadi = 1
    }
    else if (store.form.nadi >= 111 && store.form.nadi <= 130) {
      store.form.scorenadi = 2
    }
    else if (store.form.nadi > 131) {
      store.form.scorenadi = 3
    }
  }
}

function scorekesadaran (val) {
  const umurleng = props.pasien?.usia.split(' ')
  const umur = parseInt(umurleng[0])
  const umurbln = parseInt(umurleng[2])

  if (store.form.pasienhamil === 1) {
    if (val === 'Alert') {
      store.form.scorekesadaran = 0
    }
    else {
      store.form.scorekesadaran = 3
    }
  }
  else {
    if (umur === 0 && umurbln >= 0 && umurbln <= 3) {
      if (val === 'Alert') {
        store.form.scorekesadaran = 0
      }
      else if (val === 'Verbal') {
        store.form.scorekesadaran = 1
      }
      else {
        store.form.scorekesadaran = 3
      }
    }
    else if (umur === 0 && umurbln >= 4 && umurbln <= 11) {
      if (val === 'Alert') {
        store.form.scorekesadaran = 0
      }
      else if (val === 'Verbal') {
        store.form.scorekesadaran = 1
      }
      else {
        store.form.scorekesadaran = 3
      }
    }
    else if (umur >= 1 && umur <= 4) {
      if (val === 'Alert') {
        store.form.scorekesadaran = 0
      }
      else if (val === 'Verbal') {
        store.form.scorekesadaran = 1
      }
      else {
        store.form.scorekesadaran = 3
      }
    }
    else if (umur >= 5 && umur <= 11) {
      if (val === 'Alert') {
        store.form.scorekesadaran = 0
      }
      else if (val === 'Verbal') {
        store.form.scorekesadaran = 1
      }
      else {
        store.form.scorekesadaran = 3
      }
    }
    else if (umur >= 12 && umur <= 17) {
      if (val === 'Alert') {
        store.form.scorekesadaran = 0
      }
      else if (val === 'Verbal') {
        store.form.scorekesadaran = 1
      }
      else {
        store.form.scorekesadaran = 3
      }
    }
    else if (umur > 17) {
      if (val === 'Alert') {
        store.form.scorekesadaran = 0
      }
      else {
        store.form.scorekesadaran = 3
      }
    }
  }
}

function scorenyeri (val) {
  if (val === 'Normal') {
    store.form.scorenyeri = 0
  }
  else {
    store.form.scorenyeri = 3
  }
}

function scoreloche (val) {
  if (val === 'Abnormal') {
    store.form.scorelochea = 3
  }
  else {
    store.form.scorelochea = 0
  }
}

function scoreproteinurin (val) {
  if (val === 'NA') {
    store.form.scoreproteinurin = 0
  }
  else if (val === '+') {
    store.form.scoreproteinurin = 2
  }
  else {
    store.form.scoreproteinurin = 3
  }
}

function updateSelection (val) {
  // console.log(val.join(','))
  store.setForm('doa', val.join(', '))
}

function updateSelectionxx (val) {
  // console.log('sasasasas', val)
  store.setForm('falsetriage', val)
}

function historyOpen () {
  emits('openHistory')
  // store.getHistory(props.pasien?.norm)
}
store.formattanggal()

onBeforeMount(() => {
  store.form.falsetriage = false
  store.form.pasienhamil = 0
  store.doax = []
  store.hiddenall = 'HIDUP'
})

</script>
