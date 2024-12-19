<template>
  <div
    class="full-height q-pa-sm"
  >
    <div class="row q-col-gutter-x-xs full-height">
      <div class="col-6 full-height">
        <ListResepPage
          :key="props.pasien"
          :pasien="props.pasien"
          :loadingaja="loadingaja"
        />
      </div>
      <div class="col-6 full-height">
        <ListPemakaianObatPage
          :key="props.pasien"
          :pasien="props.pasien"
          :loadingaja="loadingaja"
        />
      </div>
    </div>
  </div>
</template>
<script setup>
// import { usePemakaianObatStore } from 'src/stores/simrs/igd/pemakaianobat'
import ListResepPage from './pemakaianobat/ListResepPage.vue'
import ListPemakaianObatPage from './pemakaianobat/ListPemakaianObatPage.vue'

// const store = usePemakaianObatStore()

const props = defineProps({
  pasien: {
    type: Object,
    default: null
  },
  loadingaja: {
    type: Boolean,
    default: false
  }
})
</script>
