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
          class=" bg-white shadow-2 text-grey-8"
          active-color="orange-3"
          active-bg-color="primary"
        >
          <q-tab v-for="tb in tabs" :key="tb.name" :ripple="true" :name="tb?.name">
            <template #default>
              <div class="row q-gutter-x-sm items-center q-px-sm">
                <q-icon :name="tb?.icon" size="20px" />
                <div>{{ tb?.label }}</div>
              </div>
            </template>
          </q-tab>
        </q-tabs>
      </div>
      <div class="col full-height scroll">
        <q-tab-panels v-model="tab" animated class="bg-transparent q-pa-none fit">
          <!-- PANEL -->
          <q-tab-panel name="umum" class="q-py-xs q-px-none">
            <PemeriksaanUmumPage :pasien="props?.pasien" />
          </q-tab-panel>

          <q-tab-panel name="fisik" class="q-py-xs q-px-none">
            <PemeriksaaFisikPage :pasien="props?.pasien" />
          </q-tab-panel>
          <!-- END PANEL -->
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

const props = defineProps({
  pasien: {
    type: Object,
    default: null
  }
})

const PemeriksaanUmumPage = defineAsyncComponent(() => import('./comp/PemeriksaanUmumPage.vue'))
const PemeriksaaFisikPage = defineAsyncComponent(() => import('./comp/PemeriksaanFisikPage.vue'))

const tab = ref('umum')

const tabs = [
  { label: 'Umum', name: 'umum', icon: 'icon-my-stethoscope' },
  { label: 'Fisik', name: 'fisik', icon: 'icon-my-stethoscope' }
  // { label: 'Anatomy', name: 'anatomy', icon: 'icon-my-stethoscope' }
]
</script>
