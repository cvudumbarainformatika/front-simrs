<template>
  <div
    class="full-height q-pa-sm"
  >
    <div class="row q-col-gutter-x-xs full-height">
      <div class="col-6 full-height">
        <FormOrder
          :key="props.pasien"
          :pasien="props.pasien"
        />
      </div>
      <div class="col-6 full-height">
        <ListOrder :pasien="props.pasien" />
      </div>
    </div>
  </div>
</template>

<script setup>
import FormOrder from './comp/FormOrder.vue'
import ListOrder from './comp/ListOrder.vue'
import { onMounted } from 'vue'
import { useOperasiIgd } from 'src/stores/simrs/igd/operasi'

const store = useOperasiIgd()
const props = defineProps({
  pasien: {
    type: Object,
    default: null
  }
})

onMounted(() => {
  store.initReset()
  store.getNota(props?.pasien)
})

</script>
