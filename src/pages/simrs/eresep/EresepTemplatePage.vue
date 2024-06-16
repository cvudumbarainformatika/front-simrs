<template>
  <div class="fit row q-pa-xs">
    <div class="col-4 form full-height">
      <q-card class="fit">
        <div class="fit column">
          <div class="col-auto">
            <q-tabs
              v-model="tab"
              dense
              class="bg-primary text-grey-5 shadow-2"
              active-color="yellow-3"
              indicator-color="yellow-3"
              narrow-indicator
              switch-indicator
              align="justify"
              :breakpoint="0"
            >
              <q-tab name="nonracikan" label="Non Racik" />
              <q-tab name="racikan" label="Racikan" />
              <q-tab name="template" label="Template" />
            </q-tabs>
          </div>

          <div class="col full-height relative-position">
            <q-tab-panels v-model="tab" animated class="fit absolute">
              <q-tab-panel name="nonracikan" class="fit overflow-hidden q-pa-none">
                <q-form ref="formRef" @submit="simpanNonRacikan" class="full-height column">
                  <div class="col fit">
                    <FormNonRacik :pasien="pasien" :depo="depo" :is-reset="isReset" @reset-done="isReset = false" />
                  </div>
                  <div class="absolute-bottom full-width row justify-between q-pa-sm bg-primary">
                    <q-btn
                      label="Reset"
                      type="button"
                      color="dark"
                      class="q-px-md"
                      dense
                      @click="resetChild"
                    />
                    <q-btn
                      label="simpan ke list"
                      type="submit"
                      color="white"
                      text-color="primary"
                      class="q-px-md"
                      dense
                    />
                  </div>
                </q-form>
              </q-tab-panel>

              <q-tab-panel name="racikan" class="fit overflow-hidden q-pa-none">
                <q-form ref="formRefRacikan" class="fit column">
                  <div class="col fit scroll">
                    <FormRacikan />
                  </div>
                  <div class="absolute-bottom full-width row justify-between q-pa-sm bg-teal">
                    <q-btn
                      label="Reset"
                      type="button"
                      color="dark"
                      class="q-px-md"
                      dense
                    />
                    <q-btn
                      label="simpan ke list"
                      type="submit"
                      color="white"
                      text-color="teal"
                      class="q-px-md"
                      dense
                    />
                  </div>
                </q-form>
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
    <q-card class="col fit q-ml-xs">
      <div class="column fit">
        <ListDetilObatTemplate @back="emits('back')" />
      </div>
    </q-card>
  </div>
</template>

<script setup>
import { useTemplateEResepStore } from 'src/stores/simrs/farmasi/permintaanresep/templateeresep'
import { defineAsyncComponent, onMounted, ref } from 'vue'

const FormNonRacik = defineAsyncComponent(() => import('./compTemplate/FormNonRacik.vue'))
const FormRacikan = defineAsyncComponent(() => import('./compTemplate/FormRacikan.vue'))
const ListDetilObatTemplate = defineAsyncComponent(() => import('./compTemplate/ListDetilObatTemplate.vue'))
const store = useTemplateEResepStore()
const formRef = ref(null)
const isReset = ref(false)

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

// eslint-disable-next-line no-unused-vars
const emits = defineEmits(['back'])

const tab = ref('nonracikan')

onMounted(() => {
  store.initItems()
  console.log(store.items)
})

const simpanNonRacikan = () => {
  // console.log('simpan non racikan', store.form)
  store.form.racikan = false
  store.saveListItems()
    .then(() => {
      resetChild()
    })

  // resetChild()
}

function resetChild () {
  formRef.value.reset()
  formRef.value.resetValidation()
  setTimeout(() => {
    isReset.value = true
  }, 100)
}
</script>
