<template>
  <q-dialog
    persistent
    :maximized="maximizedToggle"
    transition-show="slide-left"
    transition-hide="fade"
  >
    <q-card
      flat
      class="full-height"
    >
      <div class="fit column">
        <q-bar class="col-auto">
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

        <q-card-section class="col full-height scroll">
          <slot />
        </q-card-section>
      </div>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref } from 'vue'

const maximizedToggle = ref(true)
const emits = defineEmits(['close'])
</script>
