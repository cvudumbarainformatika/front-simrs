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
              v-model="store.form.hamiltidak"
              :options="optionhamil"
              color="primary"
              inline
              dense
              @update:model-value="flagstatus"
            />
          </div>
        </div>
        <q-separator class="q-my-xs" />
        <div v-if="store.pasienhamil === 1">
          <div class="row q-col-gutter-sm">
            <div class="col-6">
              <app-input
                v-model="store.form.haid"
                outlined
                standout="bg-yellow-3"
                label="Hari Pertama Haid Terakir"
                :rules="[val => !!val || 'Harap Diisi terlebih dahulu']"
              />
            </div>
            <div class="col-6">
              <app-input
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
              <app-input
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

const optionhamil = ref([
  { label: 'Iya', value: 1 },
  { label: 'Tidak', value: 0 }
])

function flagstatus (val) {
  store.pasienhamil = val
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

</script>
