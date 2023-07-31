<template>
  <q-dialog
    persistent
    :maximized="true"
    transition-show="slide-left"
    transition-hide="slide-right"
  >
    <q-card class="">
      <q-bar
        class="fixed-top bg-primary text-white z-top"
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

      <q-card-section
        class="bg-secondary fixed-top z-top"
        style="height: 100px; margin-top: 30px;"
      >
        <div class="text-h6">
          Alert
        </div>
      </q-card-section>

      <q-card-section
        class="scroll"
        style="padding-top: 140px;"
      >
        sgfds
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
defineProps({
  pasien: {
    type: Object,
    default: null
  }
})
</script>
