<template>
  <q-dialog
    persistent
    maximized
    transition-show="slide-left"
    transition-hide="fade"
    @before-show="emits('show')"
    @before-hide="emits('hide')"
  >
    <q-card
      flat
      class="fit"
      style="overflow: hidden;"
    >
      <div class="fit column">
        <q-bar class="col-auto bg-primary text-white q-py-sm">
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

        <div class="col fit column">
          <div class="col full-height scroll">
            <slot />
          </div>
        </div>
      </div>
    </q-card>
  </q-dialog>
</template>

<script setup>
// import { ref } from 'vue'

// const maximizedToggle = ref(true)
const emits = defineEmits(['close', 'show', 'hide'])
defineProps({
  title: { type: String, default: '' }
})
</script>
