<template>
  <q-toolbar>
    <q-btn
      flat
      dense
      icon="icon-mat-sort"
      @click="emits('toggleLeftDrawer')"
    />
    <q-toolbar-title class="f-14">
      <div class="row items-center q-gutter-md">
        <q-badge
          outline
          color="yellow"
        >
          DPJP  ||  {{ pasien ? pasien.dokter===null||pasien.dokter===''?'...':pasien.dokter : '-' }}
        </q-badge>
        <q-badge
          outline
          color="orange"
        >
          {{ pasien?.poli??'---' }}
        </q-badge>
      </div>
    </q-toolbar-title>

    <div>
      <q-btn
        label="selesaikan layanan"
        color="negative"
        class="q-mr-lg q-px-lg"
        dense
      />
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
    </div>
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
