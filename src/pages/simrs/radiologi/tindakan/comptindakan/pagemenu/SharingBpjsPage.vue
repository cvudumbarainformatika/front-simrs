<template>
  <div
    class="full-height q-pa-sm"
  >
    <div class="row q-col-gutter-x-xs full-height">
      <div class="col-8 full-height">
        <component
          :is="form"
          :key="props.pasien"
          :pasien="props.pasien"
        />
      </div>
      <div class="col-4 full-height">
        <component
          :is="list"
          :key="props.pasien"
          :pasien="props.pasien"
        />
      </div>
    </div>
  </div>
</template>
<script setup>
import { defineAsyncComponent, onMounted } from 'vue'
import { usePoliSharingStore } from 'src/stores/simrs/pelayanan/poli/sharing'

const store = usePoliSharingStore()
const props = defineProps({
  pasien: {
    type: Object,
    default: null
  }
})
const form = defineAsyncComponent(() => import('./compsharing/FormPage.vue'))
const list = defineAsyncComponent(() => import('./compsharing/ListPage.vue'))
onMounted(() => {
  store.getMasterSharing()
  store.initForm(props?.pasien)
})
</script>
