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
        <!-- <div class="">
          <div class="row q-col-gutter-md q-mb-md">
            <div class="col-12">
              <q-input
                v-model="store.form.keluhanutama"
                outlined
                autogrow
                stack-label
                standout="bg-yellow-3"
                label="Keluhan Utama"
                :rules="[val => !!val || 'Harap Diisi terlebih dahulu']"
                hide-bottom-space
              />
            </div>
          </div>
          <div class="row q-col-gutter-md q-mb-md">
            <div class="col-12">
              <q-input
                v-model="store.form.riwayatpenyakitsekarang"
                outlined
                autogrow
                standout="bg-yellow-3"
                label="Riwaya Penyakit Sekarang"
                stack-label
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
        </div> -->

        <div class="row q-col-gutter-sm">
          <q-input
            v-model="store.form.keluhanutama"
            outlined
            autogrow
            stack-label
            standout="bg-yellow-3"
            label="Keluhan Utama"
            :rules="[val => !!val || 'Harap Diisi terlebih dahulu']"
            hide-bottom-space
            style="width:100%"
          />
          <q-input
            v-model="store.form.riwayatpenyakitsekarang"
            outlined
            autogrow
            standout="bg-yellow-3"
            label="Riwaya Penyakit Sekarang"
            stack-label
            style="width:50%"
          />
          <q-input
            v-model="store.form.riwayatpenyakit"
            outlined
            autogrow
            standout="bg-yellow-3"
            label="Riwayat Penyakit (Dahulu)"
            stack-label
            style="width:50%"
          />
          <q-input
            v-model="store.form.riwayatpengobatan"
            outlined
            autogrow
            standout="bg-yellow-3"
            style="width:50%"
            label="Riwayat Pengobatan"
            stack-label
          />
          <q-input
            v-model="store.form.riwayatpenyakitkeluarga"
            outlined
            autogrow
            standout="bg-yellow-3"
            style="width:50%"
            label="Riwayat Penyakit Keluarga"
            stack-label
          />
          <div class="col-12">
            <div class="text-weight-bold">
              Riwayat Alergi
            </div>
            <div class="text-grey-8 f-10">
              Riwayat alergi yang pernah dialami
              oleh pasien
            </div>
            <q-separator class="q-my-sm" />
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
              class="q-mb-sm hidden"
              autogrow
            />
            <q-input
              v-model="store.form.keteranganalergi"
              outlined
              autogrow
              label="Keterangan Alergi"
              stack-label
              standout="bg-yellow-3"
            />
          </div>
          <div class="col-12 q-mt-xs">
            <div class="text-weight-bold">
              Skreening Gizi
            </div>
            <q-separator class="q-my-xs" />
            <div class="row items-center">
              <div class="col-8">
                Apakah Ada Penurunan Berat badan yang tidak diinginkan selama 6 Bulan terakhir ?
              </div>
              <div class="col-4">
                <q-option-group
                  v-model="store.form.skreeninggizi"
                  :options="optionSkreening"
                  color="primary"
                  inline
                  dense
                />
              </div>
            </div>
          </div>
          <div class="col-12 q-mt-xs">
            <q-separator class="q-my-xs" />
            <div class="row items-center">
              <div class="col-8">
                Apakah Asupan Makan berkurang karena tidak nafsu makan ?
              </div>
              <div class="col-4">
                <q-option-group
                  v-model="store.form.skreeninggizi"
                  :options="optionAsupanMakan"
                  color="primary"
                  inline
                  dense
                />
              </div>
            </div>
          </div>
          <div class="col-12">
            <q-separator class="q-my-xs" />
            <div class="row items-center q-col-gutter-sm">
              <div class="col-2">
                Kondisi Khusus :
              </div>
              <div class="col-8">
                <q-input
                  v-model="store.form.kondisikhusus"
                  outlined
                  dense
                  standout="bg-yellow-3"
                  label="Kondisi Khusus"
                  stack-label
                />
              </div>
              <div class="col-2">
                <q-input
                  v-model="store.form.skor"
                  outlined
                  dense
                  standout="bg-yellow-3"
                  label="Skor"
                  stack-label
                />
              </div>
            </div>
          </div>
        </div>
        <q-separator class="q-my-md" />
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

const optionSkreening = ref([
  { label: 'Iya (1)', value: 1 },
  { label: 'Tidak (0)', value: 0 }
])
const optionAsupanMakan = ref([
  { label: 'Iya (1)', value: 1 },
  { label: 'Tidak (0)', value: 0 }
])

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

// eslint-disable-next-line no-unused-vars
function updateSelection(val) {
  // console.log(val.join(','))
  store.setForm('riwayatalergi', val.join(', '))
}
</script>
