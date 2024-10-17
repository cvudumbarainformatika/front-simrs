<template>
  <q-bar :class="`${bgColor} ${textColor}`">
    <div class="f-12 text-weight-bold">
      {{ title }}
    </div>
    <q-space />
    <div class="q-gutter-sm">
      <q-btn v-if="btnFull" dense flat :icon="!fullpage? btnFullIcon : 'icon-mat-close_fullscreen'" @click="emits('full')">
        <q-tooltip v-if="!fullpage">
          Full Screen
        </q-tooltip>
        <q-tooltip v-else>
          Minimal Page
        </q-tooltip>
      </q-btn>
      <q-btn v-if="btnMin" dense flat :icon="!minimize? btnMin : 'icon-mat-expand_less'" @click="emits('min')">
        <q-tooltip v-if="!fullpage">
          Sembunyikan
        </q-tooltip>
        <q-tooltip v-else>
          Perlihatkan
        </q-tooltip>
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
  },
  btnFullIcon: {
    type: String,
    default: 'icon-mat-fullscreen'
  },
  fullpage: {
    type: Boolean,
    default: false
  },
  btnMin: {
    type: String,
    default: null
  },
  minimize: {
    type: Boolean,
    default: false
  }
})

const emits = defineEmits(['full', 'min'])
</script>
