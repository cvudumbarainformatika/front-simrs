<template>
  <div class="full-height full-width">
    <div class="row full-height">
      <q-card
        flat
        bordered
        square
        class="col-5 full-height"
      >
        {{ props.pasien }}
      </q-card>
      <q-card
        flat
        bordered
        square
        class="col-7 full-height"
      >
        List Pemeriksaan & Hasil Radiologi
      </q-card>
    </div>
  </div>
</template>
<script setup>
const props = defineProps({
  pasien: {
    type: Object,
    default: null
  }
})
</script>
