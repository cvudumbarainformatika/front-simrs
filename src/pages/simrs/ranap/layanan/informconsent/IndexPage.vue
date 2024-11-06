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
                style="justify-content: initial"
              >
                <q-tab v-for="menu in menus" :key="menu.name" :name="menu?.name" :icon="menu?.icon" :label="menu?.label" />
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

defineProps({
  pasien: {
    type: Object,
    default: null
  }
})

const splitterModel = ref(15)

const innerTab = ref(null)

onMounted(() => {
  innerTab.value = menus.value[0].name
  Promise.all([
    // pengunjungRanap.getNakes(),
    // store.getRuangKonsulDokter()
    // store.initReset()
  ])
})

const menus = ref([
  {
    name: 'OperasiInvasifPage',
    label: 'SPT Operasi Invasif',
    desc: 'Surat Persetujuan Tindakan Operasi Invasif',
    icon: 'icon-my-file_sign',
    nakes: ['1', '2', '3'],
    comp: shallowRef(defineAsyncComponent(() => import('./comp/FormConcernOperasiInvasif.vue')))
  },
  {
    name: 'SedasiPage',
    label: 'SP Anestesi Sedasi',
    desc: 'Surat Persetujuan Anestesi Sedasi',
    icon: 'icon-fa-file-regular',
    nakes: ['1', '2', '3'],
    comp: shallowRef(defineAsyncComponent(() => import('./comp/FormConcernOperasiInvasif.vue')))
  }

])

</script>
