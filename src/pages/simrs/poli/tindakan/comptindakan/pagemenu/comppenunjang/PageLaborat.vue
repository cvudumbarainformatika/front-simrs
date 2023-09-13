<template>
  <div class="full-height full-width">
    <div class="row full-height">
      <q-card
        flat
        bordered
        square
        class="col-7 full-height"
      >
        <FormOrder :pasien="props.pasien" />
      </q-card>
      <q-card
        flat
        bordered
        square
        class="col-5 full-height"
      >
        <ListPemeriksaans
          :key="props.pasien"
          :pasien="props.pasien"
        />
      </q-card>
    </div>
  </div>
</template>
<script setup>
import FormOrder from './complaborat/FormOrder.vue'
// import DaftarPemeriksaan from './complaborat/DaftarPemeriksaan.vue'
import ListPemeriksaans from './complaborat/ListPemeriksaans.vue'
// import { usePenunjangPoli } from 'src/stores/simrs/pelayanan/poli/penunjang'

// const store = usePenunjangPoli()

const props = defineProps({
  pasien: {
    type: Object,
    default: null
  }
})
</script>
