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
    >
      {{ pasien }}
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
