<template>
  <q-toolbar>
    <q-btn
      flat
      dense
      icon="icon-mat-sort"
      @click="emits('toggleLeftDrawer')"
    />
    <q-toolbar-title class="f-14">
      DPJP  ||  {{ pasien ? pasien.dokter===null||pasien.dokter===''?'...':pasien.dokter : '-' }}
    </q-toolbar-title>

    <q-btn
      v-close-popup
      dense
      flat
      icon="icon-mat-close"
    >
      <q-tooltip class="bg-white text-primary">
        Close
      </q-tooltip>
    </q-btn>
  </q-toolbar>
</template>

<script setup>
const emits = defineEmits(['toggleLeftDrawer'])
defineProps({
  pasien: {
    type: Object,
    default: null
  }
})
</script>
