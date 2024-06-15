<template>
  <div class="fit row q-pa-xs">
    <div class="col-4 form full-height">
      <q-card class="fit">
        <div class="fit column">
          <div class="col-auto">
            <q-tabs
              v-model="tab"
              dense
              class="bg-primary text-white"
              active-color="yellow-3"
              indicator-color="yellow-3"
              align="justify"
            >
              <q-tab name="nonracikan" label="Non Racik" />
              <q-tab name="racikan" label="Racikan" />
              <q-tab name="template" label="Template" />
            </q-tabs>
          </div>

          <div class="col full-height relative-position">
            <q-tab-panels v-model="tab" animated class="fit absolute">
              <q-tab-panel name="nonracikan" class="fit overflow-hidden q-pa-none">
                <q-form class="full-height column">
                  <div class="col fit scroll">
                    <FormNonRacik :pasien="pasien" :depo="depo" />
                  </div>
                  <div class="absolute-bottom full-width row justify-end q-pa-sm bg-yellow-3">
                    <q-btn
                      label="simpan ke list"
                      type="submit"
                      color="primary"
                    />
                  </div>
                </q-form>
              </q-tab-panel>

              <q-tab-panel name="racikan">
                <div class="text-h6">
                  FORM RACIKAN
                </div>
                Form untuk Racikan.
              </q-tab-panel>

              <q-tab-panel name="template">
                <div class="text-h6">
                  TEMPLATE
                </div>
                Tempat List untuk Template tersimpan.
              </q-tab-panel>
            </q-tab-panels>
          </div>
        </div>
      </q-card>
    </div>
    <div class="col full-height bg-primary q-ml-xs">
      <div class="column full-height flex-center">
        <div class="text-white f-20">
          MAAF ... FITUR INI MASIH ON PROGRESS
        </div>

        <q-btn color="dark" class="q-mt-sm" @click="emits('back')">
          KEMBALI
        </q-btn>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineAsyncComponent, ref } from 'vue'

const FormNonRacik = defineAsyncComponent(() => import('./compTemplate/FormNonRacik.vue'))

defineProps({
  pasien: {
    type: Object,
    default: null
  },
  depo: {
    type: String,
    default: ''
  }
})

const emits = defineEmits(['back'])

const tab = ref('nonracikan')
</script>
