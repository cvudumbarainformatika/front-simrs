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
          :tujuanambulan="store.tujuanambulan"
          :perawat="store.perawat"
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
import FormOrder from './comp/FormOrder.vue'
import ListOrder from './comp/ListOrder.vue'
import { useBankDarahStore } from 'src/stores/simrs/igd/bankdarah'

const store = useBankDarahStore()
const props = defineProps({
  pasien: {
    type: Object,
    default: null
  }
})

onMounted(() => {
  store.getNota(props?.pasien)
})

</script>
