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
import { onMounted } from 'vue'
import FormOrder from './comppenunjanglain/FormOrder.vue'
import ListOrder from './comppenunjanglain/ListOrder.vue'
import { usePenunjangLainPoliStore } from 'src/stores/simrs/pelayanan/poli/penunjanglain'

const props = defineProps({
  pasien: {
    type: Object,
    default: null
  }
})

const store = usePenunjangLainPoliStore()

onMounted(() => {
  store.getPenunjangLain()
  store.getNota(props.pasien)
})
</script>
