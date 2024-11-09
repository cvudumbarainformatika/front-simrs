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
                v-model="store.menuTab"
                vertical
                class="text-dark bg-white shadow-1 bo"
                active-color="orange-10"
                active-bg-color="indigo-1"
                no-caps
                align="left"
                style="justify-content: left"
                @update:model-value="(val)=> store.initReset(pasien)"
              >
                <q-tab v-for="menu in menus" :key="menu.name" :name="menu?.name" :label="menu?.label" />
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
                v-model="store.menuTab"
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
import { useConcernOperasiInvasifRanapStore } from 'src/stores/simrs/ranap/concernoperasiinvasif'
import { defineAsyncComponent, onMounted, ref, shallowRef } from 'vue'

const menus = ref([
  {
    name: 'OperasiInvasif',
    label: 'SPT Operasi Invasif',
    title: 'OPERASI / TINDAKAN INVASIF',
    desc: 'Surat Persetujuan Tindakan Operasi Invasif',
    icon: 'icon-my-file_sign',
    nakes: ['1', '2', '3'],
    comp: shallowRef(defineAsyncComponent(() => import('./comp/PageConcern.vue')))
  },
  {
    name: 'Sedasi',
    label: 'SP Anestesi Sedasi',
    title: 'TINDAKAN ANESTESI/SEDASI',
    desc: 'Surat Persetujuan Anestesi Sedasi',
    icon: 'icon-fa-file-regular',
    nakes: ['1', '2', '3'],
    comp: shallowRef(defineAsyncComponent(() => import('./comp/PageConcern.vue')))
  },
  {
    name: 'Colonoscopy',
    label: 'SPT Colonoscopy',
    title: 'TINDAKAN COLONOSCOPY',
    desc: 'Surat Persetujuan Tindakan Colonoscopy',
    icon: 'icon-fa-file-regular',
    nakes: ['1', '2', '3'],
    comp: shallowRef(defineAsyncComponent(() => import('./comp/PageConcern.vue')))
  }

])

defineProps({
  pasien: {
    type: Object,
    default: null
  }
})

const store = useConcernOperasiInvasifRanapStore()

const splitterModel = ref(15)

// const innerTab = ref(menus.value[0].name)

onMounted(() => {
  // innerTab.value = menus.value[0].name
  store.menuTab = menus.value[0].name
  store.item = null
  Promise.all([
    // pengunjungRanap.getNakes(),
    // store.getRuangKonsulDokter()
    // store.initReset()
  ])
})

</script>
