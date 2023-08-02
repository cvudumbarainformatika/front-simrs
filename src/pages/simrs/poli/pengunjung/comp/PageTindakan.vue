<template>
  <q-dialog
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
      <div class="my-flex-1 q-card q-card--flat no-shadow no-border-radius scroll">
        <div class="container-no-header bg-yellow full-height">
          <div class="header-content bg-negative">
            Header
          </div>
          <div class="my-flex-1 q-card q-card--flat no-shadow no-border-radius scroll">
            <div>ataaas</div>
            <div
              v-for="n in 100"
              :key="n"
            >
              sadas
            </div>
            <div class="q-pb-xl">
              bawaaah
            </div>
          </div>
        </div>
      </div>
    </q-card>
  </q-dialog>
</template>

<script setup>
// import { ref } from 'vue'
import HeaderPage from './comptindakan/HeaderPage.vue'
// const tab = ref('mails')
// const innerTab = ref('innerMails')
// const splitterModel = ref(10)
defineProps({
  pasien: {
    type: Object,
    default: null
  }
})
</script>
