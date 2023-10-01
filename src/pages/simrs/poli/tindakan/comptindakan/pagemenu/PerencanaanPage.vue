<template>
  <div
    class="full-height q-pa-sm"
  >
    <div class="row q-col-gutter-x-xs full-height">
      <div class="col-6 full-height">
        <PlanningPage
          :key="props.pasien"
          :pasien="props.pasien"
        />
      </div>
      <div class="col-6 full-height">
        {{ props?.pasien }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { usePerencanaanPoliStore } from 'src/stores/simrs/pelayanan/poli/perencanaan'
import PlanningPage from './compperencanaan/PlanningPage.vue'
import { onMounted } from 'vue'

const store = usePerencanaanPoliStore()
const props = defineProps({
  pasien: {
    type: Object,
    default: null
  }
})

onMounted(() => {
  store.getMasterPlanning()
  store.getMasterPoli()
})
</script>
