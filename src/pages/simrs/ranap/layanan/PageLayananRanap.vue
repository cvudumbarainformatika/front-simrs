<template>
  <q-dialog
    ref="refDialog"
    persistent
    :maximized="true"
    transition-show="slide-left"
    transition-hide="slide-right"
  >
    <q-card
      square
      flat
      class="container-no-header"
    >
      <q-layout
        view="lHr Lpr lFf"
        container
        class="shadow-2 rounded-borders z-top"
      >
        <q-header
          elevated
          class="bg-primary"
        >
          <HeaderLayout
            :pasien="pasien"
          />
        </q-header>
      </q-layout>
    </q-card>
  </q-dialog>
</template>

<script setup>
import HeaderLayout from './layoutcomp/HeaderLayout.vue'

defineProps({
  pasien: {
    type: Object,
    default: null
  }
})
</script>
