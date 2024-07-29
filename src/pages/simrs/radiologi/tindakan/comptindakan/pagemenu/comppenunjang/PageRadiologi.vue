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
import { useRadiologiPoli } from 'src/stores/simrs/pelayanan/poli/radiologi'
import ListOrder from './compradiologi/ListOrder.vue'
import FormOrder from './compradiologi/FormOrder.vue'
import { onMounted } from 'vue'

const store = useRadiologiPoli()
const props = defineProps({
  pasien: {
    type: Object,
    default: null
  }
})

onMounted(() => {
  store.getRadiologi()
  store.getJenisRadiologi()
  store.getNota(props.pasien)
})
</script>
