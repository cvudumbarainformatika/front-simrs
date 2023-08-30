<template>
  <div class="full-height full-width">
    <div class="row full-height">
      <q-card
        flat
        bordered
        square
        class="col-5 full-height"
      >
        <DaftarPemeriksaan />
      </q-card>
      <q-card
        flat
        bordered
        square
        class="col-7 full-height"
      >
        <ListOrder :pasien="props.pasien" />
      </q-card>
    </div>
  </div>
</template>
<script setup>
import DaftarPemeriksaan from './compradiologi/DaftarPemeriksaan.vue'
import ListOrder from './compradiologi/ListOrder.vue'
const props = defineProps({
  pasien: {
    type: Object,
    default: null
  }
})
</script>
