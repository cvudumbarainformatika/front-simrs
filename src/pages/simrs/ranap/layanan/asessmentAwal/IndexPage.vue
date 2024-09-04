<template>
  <div class="fit q-pa-xs">
    <div class="content columm fit ">
      <div class="col-auto">
        <q-tabs
          v-model="tab"
          dense
          no-caps
          inline-label
          align="left"
          class=" bg-grey-4 shadow-2 text-grey-8"
          active-color="accent"
        >
          <q-tab v-for="tb in tabs" :key="tb.name" :ripple="false" :name="tb?.name" :icon="tb?.icon" :label="tb?.label" />
        </q-tabs>
      </div>
      <div class="col full-height scroll">
        <q-tab-panels v-model="tab" animated class="bg-transparent q-pa-none">
          <q-tab-panel name="asessmentawalmedis">
            <AsesmentAwalMedis :pasien="props.pasien" />
          </q-tab-panel>

          <q-tab-panel name="asessmentawalkeperawatan" class="q-py-xs q-px-none">
            <AsesmentAwalKeperawatan :pasien="props.pasien" />
          </q-tab-panel>
        </q-tab-panels>
      </div>
      <!-- <div class="absolute-bottom bg-dark text-white">
        Footer
      </div> -->
    </div>
  </div>
</template>

<script setup>
import { defineAsyncComponent, ref } from 'vue'

const AsesmentAwalKeperawatan = defineAsyncComponent(() => import('./AsesmentAwalKeperawatan.vue'))
const AsesmentAwalMedis = defineAsyncComponent(() => import('./AsesmentAwalMedis.vue'))

const props = defineProps({
  pasien: {
    type: Object,
    default: null
  }
})

const tab = ref('asessmentawalkeperawatan')

const tabs = [
  { label: 'Asesment Awal Medis', name: 'asessmentawalmedis', icon: 'icon-mat-note_alt' },
  { label: 'Asesment Awal Keperawatan', name: 'asessmentawalkeperawatan', icon: 'icon-mat-note_alt' }
]
</script>
