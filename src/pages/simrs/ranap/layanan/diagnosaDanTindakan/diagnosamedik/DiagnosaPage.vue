<template>
  <div class="row fit">
    <div class="col fit">
      <div class="full-height row q-col-gutter-x-xs">
        <div class=" full-height" :class="full ? 'col-12' : 'col-6'">
          <q-card flat bordered class="column fit" style="overflow: hidden;">
            <div class="col-auto">
              <BarComp title="Form Diagnosa Medik" bg-color="bg-primary" text-color="text-white" @full="full = !full" />
            </div>
            <q-card-section class="col full-height scroll">
              <FormDiagnosa ref="formRef" :pasien="pasien" :kasus="kasus" @save-pemeriksaan="simpanDiagnosa" />
            </q-card-section>
          </q-card>
        </div>
        <div v-if="!full" class="full-height" :class="full ? 'col-0' : 'col-6'">
          <q-card flat bordered class="fit column bg-transparent">
            <div class="col-auto">
              <BarComp title="List Diagnosa" bg-color="bg-dark" text-color="text-white" :btn-full="false" />
            </div>
            <div class="col full-height scroll">
              <!-- <ListPemeriksaanUmum :pasien="pasien" :kasus="kasus" /> -->
              <!-- {{ props.nakes }} -->
              <ListDiagnosa :pasien="pasien" :kasus="kasus" />
            </div>
          </q-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useDiagnosaStore } from 'src/stores/simrs/ranap/diagnosa'
import { defineAsyncComponent, ref } from 'vue'

const BarComp = defineAsyncComponent(() => import('src/pages/simrs/ranap/layanan/components/BarComp.vue'))
const FormDiagnosa = defineAsyncComponent(() => import('./comp/FormDiagnosa.vue'))
const ListDiagnosa = defineAsyncComponent(() => import('./comp/ListDiagnosa.vue'))

const props = defineProps({
  pasien: {
    type: Object,
    default: () => null
  },
  kasus: {
    type: Object,
    default: () => null
  },
  nakes: {
    type: String,
    default: null
  }
})

const full = ref(false)
const store = useDiagnosaStore()
const simpanDiagnosa = () => {
  store.simpanDiagnosa(props?.pasien)
    .then(() => {
      console.log('ok', props?.pasien)
    })
}
</script>
