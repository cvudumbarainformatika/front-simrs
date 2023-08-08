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
                class="col-auto full-height scroll"
                style="width:300px"
              >
                <ListMenu :menus="menus" />
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
          </q-card>
        </div>
      </q-card>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import HeaderPage from './comptindakan/HeaderPage.vue'
import ListMenu from './comptindakan/ListMenu.vue'
// const splitterModel = ref(150)
const refDialog = ref()
// const menu = ref('anamnesis')
const menus = ref([
  { name: 'anamnesis', label: 'Anamnesis', icon: 'icon-mat-medical_information' },
  { name: 'pemeriksaan', label: 'Pemeriksaan Fisik', icon: 'icon-my-stethoscope' },
  { name: 'diagnosis', label: 'Diagnosis (ICD)', icon: 'icon-mat-analytics' },
  { name: 'penandaan', label: 'Penandaan Gambar', icon: 'icon-mat-palette' },
  { name: 'penunjang', label: 'Penunjang', icon: 'icon-mat-published_with_changes' },
  { name: 'perencanaan', label: 'Perencanaan', icon: 'icon-mat-today' },
  { name: 'resep', label: 'E-Resep', icon: 'icon-mat-receipt' },
  { name: 'penerbitan', label: 'Penerbitan Surat', icon: 'icon-mat-description' }
])
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
