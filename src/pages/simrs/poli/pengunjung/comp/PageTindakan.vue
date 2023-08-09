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
                  :icon="menu.icon"
                />
                <q-toolbar-title>{{ menu.label }}</q-toolbar-title>
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
                style="width:250px; border-right: 1px solid rgba(128, 128, 128, 0.577);"
              >
                <ListMenu
                  :menus="menus"
                  :menu="menu"
                  @menu-click="(val)=> menu=val"
                />
              </div>
              <div class="col full-height scroll">
                <TindakanContent :tab="menu.name" />
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
import TindakanContent from './comptindakan/TindakanContent.vue'
// const splitterModel = ref(150)
const refDialog = ref()
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
const menu = ref(menus.value[0])
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
