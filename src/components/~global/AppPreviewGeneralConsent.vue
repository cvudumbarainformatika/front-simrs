<template>
  <q-dialog
    persistent
    :maximized="maximizedToggle"
    transition-show="slide-left"
    transition-hide="slide-right"
  >
    <q-card flat>
      <q-bar>
        <div>📝 Preview General Consent Pasien</div>
        <q-space />

        <q-btn
          dense
          flat
          icon="icon-mat-minimize"
          :disable="!maximizedToggle"
          @click="maximizedToggle = false"
        >
          <q-tooltip
            v-if="maximizedToggle"
            class="bg-white text-primary"
          >
            Minimize
          </q-tooltip>
        </q-btn>
        <q-btn
          dense
          flat
          icon="icon-mat-crop_square"
          :disable="maximizedToggle"
          @click="maximizedToggle = true"
        >
          <q-tooltip
            v-if="!maximizedToggle"
            class="bg-white text-primary"
          >
            Maximize
          </q-tooltip>
        </q-btn>
        <q-btn
          v-close-popup
          dense
          flat
          icon="icon-mat-close"
          @click="emits('close')"
        >
          <q-tooltip class="bg-white text-primary">
            Close
          </q-tooltip>
        </q-btn>
      </q-bar>

      <q-card-section>
        PREVIEW GENERAL CONSENT
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
</script>
