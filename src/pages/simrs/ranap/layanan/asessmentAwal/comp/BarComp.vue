<template>
  <q-bar class="bg-dark text-white">
    <div class="f-12">
      {{ title }}
    </div>
    <q-space />
    <div class="q-gutter-sm">
      <q-btn dense flat icon="icon-mat-open_in_full">
        <q-tooltip>Full Screen</q-tooltip>
      </q-btn>
    </div>
  </q-bar>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    default: 'Form Anamnesis / Pengkajian Awal'
  }
})
</script>
