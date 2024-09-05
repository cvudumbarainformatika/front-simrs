<template>
  <q-bar :class="`${bgColor} ${textColor}`">
    <div class="f-12 text-weight-bold">
      {{ title }}
    </div>
    <q-space />
    <div class="q-gutter-sm">
      <q-btn v-if="btnFull" dense flat icon="icon-mat-open_in_full" @click="emits('full')">
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
  },
  bgColor: {
    type: String,
    default: 'bg-dark'
  },
  textColor: {
    type: String,
    default: 'text-white'
  },
  btnFull: {
    type: Boolean,
    default: true
  }
})

const emits = defineEmits(['full'])
</script>
