<template>
  <q-page class="fit absolute column">
    <div class="fit">
      <q-splitter
        v-model="splitterModel"
        :limits="[0, 100]"
        before-class="overflow-hidden"
        after-class="overflow-hidden"
        class="fit"
      >
        <template #before>
          <div class="column fit bg-indigo-1">
            <!-- <div class="col-auto q-pa-md">
              <div class="text-h5 text-bold text-center">
                RKD
              </div>
            </div> -->
            <div class="col full-height scroll">
              <q-tabs
                v-model="innerTab"
                vertical
                class="text-dark bg-white shadow-1 bo"
                active-color="orange-10"
                active-bg-color="indigo-1"
                no-caps
                align="left"
                inline-label
              >
                <q-tab v-for="menu in menus" :key="menu.name" :name="menu?.name" style="justify-content: left; border-bottom: 1px solid #e0e0e0; padding-left: 10px;">
                  <div class="text-bold">
                    {{ menu?.label }}
                  </div>
                </q-tab>
              </q-tabs>
            </div>
          </div>
        </template>

        <template #after>
          <div class="column fit">
            <!-- <div class="col-auto full-width">
              <q-card class="row justify-between items-center q-pa-sm shadow-2 bg-indigo-1">
                <div><b>LEMBAR KONSUL</b></div>
                <q-btn icon="icon-mat-close" flat dense size="sm" color="dark" />
              </q-card>
            </div> -->
            <div class="col fit">
              <q-tab-panels
                v-model="innerTab"
                animated
                swipeable
                vertical
                transition-prev="jump-up"
                transition-next="jump-up"
                class="bg-indigo-1 fit"
              >
                <q-tab-panel v-for="menu in menus" :key="menu.name" :name="menu?.name" class="fit q-pa-none">
                  <component :is="menu?.comp" :pasien="pasien" :menu="menu" />
                </q-tab-panel>
              </q-tab-panels>
            </div>
          </div>
        </template>
      </q-splitter>
    </div>
  </q-page>
</template>

<script setup>
// eslint-disable-next-line no-unused-vars
import { defineAsyncComponent, onMounted, ref, shallowRef } from 'vue'

const menus = ref([
  {
    name: 'cppt-page',
    label: 'CPPT & EWS',
    title: 'CPPT PASIEN',
    desc: 'Catatan Perkembangan Pasien Terintegrasi',
    icon: 'icon-my-file_sign',
    nakes: ['1', '2', '3'],
    comp: shallowRef(defineAsyncComponent(() => import('./cppt/IndexPage.vue')))
  },
  {
    name: 'resume-page',
    label: 'Resume Medis',
    title: 'RESUME MEDIS ( MEDICAL DISCHARGE SUMMARY )',
    desc: 'Resume Medis Pasien',
    icon: 'icon-my-file_sign',
    nakes: ['1', '2', '3'],
    comp: shallowRef(defineAsyncComponent(() => import('./resume/IndexPage.vue')))
  },
  {
    name: 'summary-page',
    label: 'Discharge Summary',
    title: 'DISCHARGE SUMMARY',
    desc: 'Ringkasan Pulang Pasien',
    icon: 'icon-my-file_sign',
    nakes: ['1', '2', '3'],
    comp: shallowRef(defineAsyncComponent(() => import('./dischargeplanning/IndexPage.vue')))
  }

])

const props = defineProps({
  pasien: {
    type: Object,
    default: null
  }
})

const splitterModel = ref(18)

const innerTab = ref(menus.value[0].name)

onMounted(() => {
  console.log('pasien', props?.pasien)
  innerTab.value = menus.value[0].name
  Promise.all([
    // pengunjungRanap.getNakes(),
    // store.getRuangKonsulDokter()
    // store.initReset()
  ])
})

</script>
