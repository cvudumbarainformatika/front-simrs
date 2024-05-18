<template>
  <div class="full-height full-width">
    <div class="row full-height">
      <q-card
        flat
        bordered
        square
        class="col-6 full-height"
      >
        <FormOrder :pasien="props.pasien" />
      </q-card>
      <q-card
        flat
        bordered
        square
        class="col-6 full-height"
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
import FormOrder from './comp/FormOrder.vue'
import ListPemeriksaans from './comp/ListPemeriksaans.vue'

const props = defineProps({
  pasien: {
    type: Object,
    default: null
  }
})
</script>
