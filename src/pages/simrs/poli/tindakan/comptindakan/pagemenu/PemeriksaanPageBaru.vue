<template>
  <q-card
    flat
    class="column full-height bg-grey-4 shadow-1"
  >
    <!-- <div
      class="col-auto bg-white"
      style="border-bottom: 1px solid grey;"
    >
      <HeaderComp />
    </div> -->
    <div class="col full-height full-width relative-position">
      <div
        class="absolute-left full-height bg-white"
        style="width:33%;"
      >
        {{ store.templateActive }}
      </div>
      <div
        class="absolute-right full-height bg-white"
        style="width:33%;"
      >
        dsfs
      </div>
      <div
        style="width: 33%;"
        class="absolute-center full-height"
      >
        <CanvasComp
          :key="props?.pasien"
          :pasien="props?.pasien"
        />
      </div>
    </div>
  </q-card>
</template>

<script setup>
// import HeaderComp from './comppemeriksaanbaru/HeaderComp.vue'
import { usePemeriksaanFisik } from 'src/stores/simrs/pelayanan/poli/pemeriksaanfisik'
import CanvasComp from './comppemeriksaanbaru/CanvasComp.vue'

const store = usePemeriksaanFisik()

const props = defineProps({
  pasien: {
    type: Object,
    default: null
  }
})
</script>
