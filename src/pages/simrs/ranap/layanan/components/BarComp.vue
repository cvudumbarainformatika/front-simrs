<template>
  <div :class="`${bgColor} ${textColor}`" @mouseover="emits('hover')" @mouseleave="emits('leave')">
    <div class="flex justify-between items-center q-px-md" :class="btnFull? 'q-py-xs' : 'q-py-sm'">
      <div class="kiri">
        <div class="f-12 text-weight-bold">
          {{ title }}
        </div>
      </div>
      <div class="kanan">
        <div class="flex q-gutter-sm">
          <div>
            <slot name="other" />
          </div>
          <q-btn size="sm" v-if="btnFull" dense flat :icon="!fullpage? btnFullIcon : 'icon-mat-close_fullscreen'" @click="emits('full')">
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
      </div>
    </div>

    <!-- <q-space /> -->
  </div>
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

const emits = defineEmits(['full', 'min', 'hover', 'leave'])
</script>
