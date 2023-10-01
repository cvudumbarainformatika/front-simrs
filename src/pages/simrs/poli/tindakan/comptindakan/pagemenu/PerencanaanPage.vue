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
        {{ masterPlann }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { usePerencanaanPoliStore } from 'src/stores/simrs/pelayanan/poli/perencanaan'
import PlanningPage from './compperencanaan/PlanningPage.vue'
import { computed, onMounted } from 'vue'

const store = usePerencanaanPoliStore()
const props = defineProps({
  pasien: {
    type: Object,
    default: null
  }
})

const masterPlann = computed(() => {
  const arr = store?.plannings
  const plans = arr?.length
    ? arr.map(x => {
      const obj = {
        label: x?.keterangan,
        value: x?.planing
      }
      return obj
    }) : []
  return plans
})

onMounted(() => {
  store.getMasterPlanning()
})
</script>
