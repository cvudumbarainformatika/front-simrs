<template>
  <q-dialog
    persistent
    maximized
    transition-show="slide-left"
    transition-hide="fade"
    @before-show="emits('clear')"
  >
    <q-card flat>
      <q-bar class="bg-primary text-white">
        <div class="f-12">
          {{ title }}
        </div>
        <q-space />

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

      <q-card-section class="q-pa-none">
        <slot />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
// import { ref } from 'vue'

// const maximizedToggle = ref(true)
const emits = defineEmits(['close', 'clear'])
defineProps({
  title: { type: String, default: '' }
})
</script>
