<template>
  <q-card
    flat
    bordered
    square
    class="full-height"
    style="overflow: hidden;"
  >
    <q-form
      ref="refFormTriage"
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
        <div class="row items-center">
          <div class="col-8">
            Pasien Hamil...??
          </div>
          <div class="col-4">
            <q-option-group
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
              <app-input
                ref="refgravida"
                v-model="store.form.gravida"
                outlined
                standout="bg-yellow-3"
                label="Gravida"
              />
            </div>
          </div>
          <div class="row q-col-gutter-sm">
            <div class="col-6">
              <app-input
                ref="refpartus"
                v-model="store.form.partus"
                outlined
                standout="bg-yellow-3"
                label="Partus"
                :rules="[val => !!val || 'Harap Diisi terlebih dahulu']"
              />
            </div>
            <div class="col-6">
              <app-input
                v-model="store.form.abortus"
                outlined
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
                v-model="store.form.jalannafas"
                label="Jalan Nafas"
                outlined
                dense
                transition-show="flip-up"
                transition-hide="flip-down"
                standout="bg-yellow-3"
                fill-input
                :options="jalannafas"
              />
            </div>
            <div class="col-6">
              <q-select
                v-model="store.form.pernapasan"
                label="Pernapasan"
                outlined
                dense
                transition-show="flip-up"
                transition-hide="flip-down"
                standout="bg-yellow-3"
                fill-input
                :options="pernapasan"
              />
            </div>
          </div>
          <div class="row q-col-gutter-sm">
            <div class="col-6">
              <q-select
                v-model="store.form.sirkulasi"
                label="Sirkulasi"
                outlined
                dense
                transition-show="flip-up"
                transition-hide="flip-down"
                standout="bg-yellow-3"
                fill-input
                :options="sirkulasi"
              />
            </div>
            <div class="col-6">
              <q-select
                v-model="store.form.disability"
                label="Disability"
                outlined
                dense
                transition-show="flip-up"
                transition-hide="flip-down"
                standout="bg-yellow-3"
                fill-input
                :options="disability"
              />
            </div>
          </div>
          <q-separator class="q-my-xs" />
        </div>
        <div class="q-pt-sm">
          <div class="row q-col-gutter-sm q-pb-sm">
            <div class="col-2">
              <app-input
                label="Nadi(x/mnt)"
                outlined
                standout="bg-yellow-3"
              />
            </div>
            <div class="col-2">
              <app-input
                label="Pernapsan(x/mnt)"
                outlined
                standout="bg-yellow-3"
              />
            </div>
            <div class="col-2">
              <app-input
                label="Sistole(mmHg)"
                outlined
                standout="bg-yellow-3"
              />
            </div>
            <div class="col-2">
              <app-input
                label="Diastole(mmHg)"
                outlined
                standout="bg-yellow-3"
              />
            </div>
            <div class="col-2">
              <app-input
                label="Suhu"
                outlined
                standout="bg-yellow-3"
              />
            </div>
            <div class="col-2">
              <app-input
                label="SPo2(%)"
                outlined
                standout="bg-yellow-3"
              />
            </div>
          </div>
          <div class="row q-col-gutter-sm q-pb-sm">
            <div class="col-2">
              <app-input
                label="Nadi(Skor)"
                outlined
                standout="bg-yellow-3"
                disable
              />
            </div>
            <div class="col-2">
              <app-input
                label="Pernapasan(Skor)"
                outlined
                standout="bg-yellow-3"
                disable
              />
            </div>
            <div class="col-2">
              <app-input
                label="Sistole(Skor)"
                outlined
                standout="bg-yellow-3"
                disable
              />
            </div>
            <div class="col-2">
              <app-input
                label="Diastole(Skor)"
                outlined
                standout="bg-yellow-3"
                disable
              />
            </div>
            <div class="col-2">
              <app-input
                label="Suhu(Skor)"
                outlined
                standout="bg-yellow-3"
                disable
              />
            </div>
            <div class="col-2">
              <app-input
                label="SPo2(Skor)"
                outlined
                standout="bg-yellow-3"
                disable
              />
            </div>
          </div>
          <div class="row q-col-gutter-sm q-pb-sm">
            <div class="col-5">
              <q-select
                label="Kesadaran"
                outlined
                standout="bg-yellow-3"
                dense
                transition-show="flip-up"
                transition-hide="flip-down"
                :options="kesadaran"
              />
            </div>
            <div class="col-2">
              <app-input
                label="Kesadaran(Skor)"
                outlined
                standout="bg-yellow-3"
                disable
              />
            </div>
          </div>
          <div class="row q-col-gutter-sm q-pb-sm">
            <div class="col-12">
              <q-select
                label="GCS"
                outlined
                standout="bg-yellow-3"
                dense
                transition-show="flip-up"
                transition-hide="flip-down"
                :options="gcs"
              />
            </div>
          </div>
          <q-separator class="q-my-xs" />
        </div>
        <div v-if="store.form.pasienhamil === 1" class="q-pt-sm">
          <div class="row q-col-gutter-sm q-pb-sm">
            <div class="col-6">
              <q-select
                label="Nyeri"
                outlined
                standout="bg-yellow-3"
                dense
                transition-show="flip-up"
                transition-hide="flip-down"
                :options="nyeri"
              />
            </div>
            <div class="col-6">
              <q-select
                label="Lochea"
                outlined
                standout="bg-yellow-3"
                dense
                transition-show="flip-up"
                transition-hide="flip-down"
                :options="lochea"
              />
            </div>
          </div>
          <div class="row q-col-gutter-sm q-pb-sm">
            <div class="col-12">
              <q-select
                label="Protein Urin"
                outlined
                standout="bg-yellow-3"
                dense
                transition-show="flip-up"
                transition-hide="flip-down"
                :options="proteinurin"
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
import { useTriageIgd } from 'src/stores/simrs/igd/triage'
import { ref } from 'vue'
const store = useTriageIgd()
const emits = defineEmits(['openHistory'])

const refForm = ref()

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
  store.pasienhamil = val
  // if (val !== 1) {

  // }
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
  alert('sasa')
  store.saveData(props.pasien).then(() => {
    refForm.value.resetValidation()
  })
}

function historyOpen () {
  emits('openHistory')
  // store.getHistory(props.pasien?.norm)
}

// eslint-disable-next-line no-unused-vars
function updateSelection (val) {
  // console.log(val.join(','))
  store.setForm('riwayatalergi', val.join(', '))
}

store.formattanggal()

</script>
