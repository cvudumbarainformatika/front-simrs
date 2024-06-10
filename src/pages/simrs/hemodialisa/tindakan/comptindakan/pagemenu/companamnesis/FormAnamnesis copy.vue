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
            Form Anamnesis
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
                History Pasien
              </q-tooltip>
            </q-btn>
          </div>
        </div>
      </q-card-section>
      <q-separator />
      <q-card-section
        class="full-height scroll"
      >
        <div class="">
          <div class="row q-col-gutter-md q-mb-md">
            <div class="col-4">
              <div class="text-weight-bold">
                Keluhan Utama
              </div>
              <div class="text-grey-8 f-10">
                Keluhan yang menjadi alasan utama
                pasien
              </div>
            </div>
            <div class="col-8">
              <q-input
                v-model="store.form.keluhanutama"
                outlined
                autogrow
                standout="bg-yellow-3"
                :rules="[val => !!val || 'Harap Diisi terlebih dahulu']"
                hide-bottom-space
              />
            </div>
          </div>
          <div class="row q-col-gutter-md q-mb-md">
            <div class="col-4">
              <div class="text-weight-bold">
                Riwayat Penyakit (Sekarang)
              </div>
              <div class="text-grey-8 f-10">
                penyakit yang diderita oleh pasien
              </div>
            </div>
            <div class="col-8">
              <q-input
                v-model="store.form.riwayatpenyakitsekarang"
                outlined
                autogrow
                standout="bg-yellow-3"
              />
            </div>
          </div>
          <div class="row q-col-gutter-md q-mb-md">
            <div class="col-4">
              <div class="text-weight-bold">
                Riwayat Penyakit
              </div>
              <div class="text-grey-8 f-10">
                Riwayat penyakit yang pernah diderita
                oleh pasien
              </div>
            </div>
            <div class="col-8">
              <q-input
                v-model="store.form.riwayatpenyakit"
                outlined
                autogrow
                standout="bg-yellow-3"
              />
            </div>
          </div>
          <div class="row q-col-gutter-md q-mb-md">
            <div class="col-4">
              <div class="text-weight-bold">
                Riwayat Alergi
              </div>
              <div class="text-grey-8 f-10">
                Riwayat alergi yang pernah dialami
                oleh pasien
              </div>
            </div>
            <div class="col-8">
              <!-- <q-radio
                v-for="(al, i) in store.alergis"
                :key="i"
                v-model="store.form.riwayatalergi"
                :val="al"
                :label="al"
              /> -->
              <q-checkbox
                v-for="(al, i) in store.alergis"
                :key="i"
                v-model="store.selection"
                :val="al"
                :label="al"
                color="primary"
                @update:model-value="updateSelection"
              />
              <q-input
                v-model="store.form.riwayatalergi"
                outlined
                label="Riwayat"
                standout="bg-yellow-3"
                readonly
                class="q-mb-sm"
              />
              <q-input
                v-model="store.form.keteranganalergi"
                outlined
                autogrow
                label="Keterangan"
                standout="bg-yellow-3"
              />
            </div>
          </div>
          <div class="row q-col-gutter-md q-mb-md">
            <div class="col-4">
              <div class="text-weight-bold">
                Riwayat Pengobatan
              </div>
              <div class="text-grey-8 f-10">
                Riwayat obat-obatan yang pernah
                dikonsumsi oleh pasien
              </div>
            </div>
            <div class="col-8">
              <q-input
                v-model="store.form.riwayatpengobatan"
                outlined
                autogrow
                standout="bg-yellow-3"
              />
            </div>
          </div>
        </div>
        <!-- </q-card-section> -->
        <q-separator />
        <!-- <q-card-actions
        align="right"
        class="q-mt-lg"
      > -->
        <div
          class="text-right q-mt-md"
          style="margin-bottom: 50px;"
        >
          <app-btn
            color="primary"
            label="Simpan Anamnesis"
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
import { useAnamnesis } from 'src/stores/simrs/pelayanan/poli/anamnesis'
import { ref } from 'vue'
const store = useAnamnesis()
const emits = defineEmits(['openHistory'])

const refForm = ref()
const props = defineProps({
  pasien: {
    type: Object,
    default: null
  }
})
function onSubmit() {
  store.saveData(props.pasien).then(() => {
    refForm.value.resetValidation()
  })
}

function historyOpen() {
  emits('openHistory')
  store.getHistory(props.pasien?.norm)
}

function updateSelection(val) {
  // console.log(val.join(','))
  store.setForm('riwayatalergi', val.join(', '))
}
</script>
