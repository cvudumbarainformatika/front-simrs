<template>
  <div class="full-height full-width">
    <div class="row full-height">
      <q-card
        flat
        bordered
        square
        class="col-6 full-height"
      >
        <FormOrder
          :key="props.pasien"
          :pasien="props.pasien"
        />
      </q-card>
      <q-card
        flat
        bordered
        square
        class="col-6 full-height"
      >
        <ListOrder :pasien="props.pasien" />
      </q-card>
    </div>
  </div>
</template>

<script setup>
import { useDietPoli } from 'src/stores/simrs/pelayanan/poli/diet'
import FormOrder from './compdiet/FormOrder.vue'
import ListOrder from './compdiet/ListOrder.vue'
import { onMounted } from 'vue'

const store = useDietPoli()
const props = defineProps({
  pasien: {
    type: Object,
    default: null
  }
})

onMounted(() => store.getDiet(props?.pasien))

</script>
