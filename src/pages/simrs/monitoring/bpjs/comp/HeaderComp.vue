<template>
  <div class="row items-center justify-between">
    <div class="row items-center">
      <div class="text-white">
        <q-input
          dense
          outlined
          dark
          color="white"
          placeholder="Pencarian..."
          clearable
          clear-icon="icon-mat-close"
        />
      </div>
    </div>
    <div>
      <q-btn
        flat
        :color="textColor"
        :icon="!fullscreen?'icon-mat-open_in_full':'icon-mat-close_fullscreen'"
        size="xs"
        padding="xs"
        @click="emits('setFullscreen')"
      >
        <q-tooltip
          class="primary"
          :offset="[10, 10]"
        >
          Fullscreen
        </q-tooltip>
      </q-btn>
    </div>
  </div>
</template>

<script setup>
import { dateDbFormat } from 'src/modules/formatter'
const emits = defineEmits(['setFullscreen', 'setTanggal', 'setSearch', 'setRow'])
defineProps({
  color: {
    type: String,
    default: 'bg-primary'
  },
  textColor: {
    type: String,
    default: 'white'
  },
  search: {
    type: String,
    default: ''
  },
  perPage: { type: Number, default: 10 },
  tanggal: {
    type: String,
    default: dateDbFormat(new Date())
  },
  fullscreen: { type: Boolean, default: false }
})

</script>
