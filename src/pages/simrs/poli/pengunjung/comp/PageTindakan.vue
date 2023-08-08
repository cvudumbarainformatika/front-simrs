<template>
  <q-dialog
    ref="refDialog"
    persistent
    :maximized="true"
    transition-show="slide-left"
    transition-hide="slide-right"
  >
    <q-card class="container-no-header">
      <div class="header bg-primary text-white">
        <q-bar
          class=""
          style="z-index:100;"
        >
          <div class="f-12">
            Tindakan Pasien
          </div>
          <q-space />

          <q-btn
            v-close-popup
            dense
            flat
            icon="icon-mat-close"
          >
            <q-tooltip class="bg-white text-primary">
              Close
            </q-tooltip>
          </q-btn>
        </q-bar>
        <!-- DATA PASIEN -->
        <HeaderPage
          :key="pasien"
          :pasien="pasien"
        />
      </div>
      <div class="footer absolute-bottom bg-primary text-white z-top q-pa-sm">
        Footer Page
      </div>
      <q-card class="my-flex-1 scroll">
        <div class="container-no-header bg-grey full-height">
          <div class="header-content">
            <!-- <q-toolbar
              style="padding:0 !important"
              class="bg-primary text-white"
            >
              <q-tabs
                v-model="tab"
                shrink
              >
                <q-tab
                  v-for="(tt, i) in tabs"
                  :key="i"
                  :name="tt.name"
                  :label="tt.label"
                  no-caps
                />
              </q-tabs>
            </q-toolbar> -->
            <div class="row no-wrap shadow-1">
              <q-toolbar
                class="col-8"
              >
                <q-btn
                  flat
                  round
                  dense
                  icon="icon-mat-menu"
                />
                <q-toolbar-title>Title</q-toolbar-title>
                <q-btn
                  flat
                  round
                  dense
                  icon="icon-mat-search"
                />
              </q-toolbar>
              <q-toolbar class="col-4 bg-primary text-white">
                <q-space />
                <q-btn
                  flat
                  round
                  dense
                  icon="icon-mat-dvr"
                  class="q-mr-sm"
                />
                <q-btn
                  flat
                  round
                  dense
                  icon="icon-mat-open_in_full"
                />
              </q-toolbar>
            </div>
          </div>
          <q-card
            id="contentPage"
            flat
            square
            class="my-flex-1 scroll"
          >
            <div class="row full-height">
              <div
                class="col-auto full-height bg-yellow scroll"
                style="width:300px"
              >
                <div
                  v-for="n in 200"
                  :key="n"
                  class="q-my-md"
                >
                  {{ n }}. Lorem
                </div>
              </div>
              <div class="col full-height bg-red scroll">
                <div
                  v-for="n in 200"
                  :key="n"
                  class="q-my-md"
                >
                  {{ n }}. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla ullam. In, libero.
                </div>
              </div>
            </div>
            <!-- <q-splitter
              v-model="splitterModel"
              unit="px"
              style="height: 500px"
            >
              <template #before>
                <div class="q-pa-md">
                  <div class="text-h4 q-mb-md">
                    Before
                  </div>
                  <div
                    v-for="n in 20"
                    :key="n"
                    class="q-my-md"
                  >
                    {{ n }}. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla ullam. In, libero.
                  </div>
                </div>
              </template>

              <template #after>
                <div class="q-pa-md">
                  <div class="text-h4 q-mb-md">
                    After
                  </div>
                  <div
                    v-for="n in 20"
                    :key="n"
                    class="q-my-md"
                  >
                    {{ n }}. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla ullam. In, libero.
                  </div>
                </div>
              </template>
            </q-splitter> -->
          </q-card>
        </div>
      </q-card>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import HeaderPage from './comptindakan/HeaderPage.vue'
// const splitterModel = ref(150)
const refDialog = ref()
// const tab = ref('anamnesis')
// const tabs = ref([
//   { name: 'anamnesis', label: 'Anamnesis' },
//   { name: 'pemeriksaan', label: 'Pemeriksaan Fisik' }
// ])
// const innerTab = ref('innerMails')
// const splitterModel = ref(10)
defineProps({
  pasien: {
    type: Object,
    default: null
  }
})

onMounted(() => {
  // console.log('ref', refCard.value)
})
</script>
